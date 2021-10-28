import { denock } from "https://deno.land/x/denock/mod.ts";
import {
  assertThrowsAsync,
} from "https://deno.land/std@0.110.0/testing/asserts.ts";

import { LocalHueClient } from "./local-hue-client.ts";

Deno.test("the hue client rejects the promise if an error is return from the username request", () => {
  denock({
    method: "POST",
    protocol: "http",
    host: "123.123.123.123",
    path: "/api",
    requestBody: `{"devicetype":"foo-type"}`,
    replyStatus: 200,
    responseBody: [
      {
        error: {
          type: 5,
          address: "foo",
          description: "bar",
        },
      },
    ],
  });

  const client = new LocalHueClient("123.123.123.123", "foo-type");

  assertThrowsAsync(() => client.post("/foo-bar", {}));
});
