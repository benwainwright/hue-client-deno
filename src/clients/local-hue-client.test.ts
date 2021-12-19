import { beforeEach, test } from "https://deno.land/x/hooked@v0.1.0/mod.ts";
import { mockFetch, unMockFetch } from "https://deno.land/x/metch/mod.ts";

import {
  assertEquals,
  assertThrowsAsync,
} from "https://deno.land/std@0.110.0/testing/asserts.ts";

import { DEFAULT_DEVICE_TYPE, LocalHueClient } from "./local-hue-client.ts";

const methods = [
  "POST",
  "GET",
  "PUT",
];

const defaultDeNockSettings: Omit<DenockOptions, "method" | "responseBody"> = {
  protocol: "http",
  host: "123.123.123.123",
  replyStatus: 200,
};

type IndexableClient = {
  [method: string]: (
    path: string,
    data?: Record<string, unknown>,
  ) => Promise<unknown>;
};

beforeEach(() => {
});

methods.forEach((method) => {
  test(`when making a '${method}' request, the hue client rejects the promise if an error is return from the username request`, () => {
    denock({
      method: "POST",
      path: "/api",
      requestBody: `{"devicetype":"foo-type"}`,
      responseBody: [
        {
          error: {
            type: 5,
            address: "foo",
            description: "bar",
          },
        },
      ],
      ...defaultDeNockSettings,
    });

    const client = new LocalHueClient(
      "123.123.123.123",
      "foo-type",
    ) as unknown as IndexableClient;

    assertThrowsAsync(() => client[method.toLowerCase()]("/foo-bar"));
  });

  // Deno.test(`if a username is passed into the constructor, '${method}' requests are made without generating a new username`, async () => {
  //   const testUsername = "foo-username";

  //   denock({
  //     method,
  //     path: `/api/${testUsername}/foo-bar`,
  //     responseBody: { foo: "bar" },
  //     ...defaultDeNockSettings,
  //   });

  //   const client = new LocalHueClient(
  //     "123.123.123.123",
  //     "foo-type",
  //     testUsername,
  //   ) as unknown as IndexableClient;

  //   const actual = await client[method.toLowerCase()]("/foo-bar");

  //   assertEquals(actual, { foo: "bar" });
  // });

  // Deno.test(`if no devicetype is passed into the constructor, '${method}' requests use the default one for the username request`, async () => {
  //   const testUsername = "foo-username";

  //   denock({
  //     method: "POST",
  //     path: `/api`,
  //     requestBody: `{"devicetype":"${DEFAULT_DEVICE_TYPE}"}`,
  //     responseBody: [
  //       {
  //         success: {
  //           username: testUsername,
  //         },
  //       },
  //     ],
  //     ...defaultDeNockSettings,
  //   });

  //   denock({
  //     method,
  //     path: `/api/${testUsername}/foo-bar`,
  //     responseBody: { foo: "bar" },
  //     ...defaultDeNockSettings,
  //   });

  //   const client = new LocalHueClient(
  //     "123.123.123.123",
  //   ) as unknown as IndexableClient;

  //   const actual = await client[method.toLowerCase()]("/foo-bar");

  //   assertEquals(actual, { foo: "bar" });
  // });

  // Deno.test(`if no username is passed in, '${method}' requests get one from the bridge before making a request`, async () => {
  //   const testUsername = "foo-username";

  //   denock({
  //     method: "POST",
  //     path: `/api`,
  //     requestBody: `{"devicetype":"foo-type"}`,
  //     responseBody: [
  //       {
  //         success: {
  //           username: testUsername,
  //         },
  //       },
  //     ],
  //     ...defaultDeNockSettings,
  //   });

  //   denock({
  //     method,
  //     path: `/api/${testUsername}/foo-bar`,
  //     responseBody: { foo: "bar" },
  //     ...defaultDeNockSettings,
  //   });

  //   const client = new LocalHueClient(
  //     "123.123.123.123",
  //   ) as unknown as IndexableClient;

  //   const actual = await client[method.toLowerCase()]("/foo-bar");

  //   assertEquals(actual, { foo: "bar" });
  // });
});
