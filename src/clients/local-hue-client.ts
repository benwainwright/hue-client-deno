import { Client } from "../types/client.ts";
import {
  HttpMethod,
  isError,
  UsernameRequestType,
  UsernameResponseType,
} from "../types/mod.ts";

export const DEFAULT_DEVICE_TYPE = "hue-client";

export class LocalHueClient implements Client {
  private deviceType: string;
  public constructor(
    private ip: string,
    deviceType?: string,
    private username?: string,
  ) {
    this.deviceType = deviceType ?? DEFAULT_DEVICE_TYPE;
  }

  private async makeRequest<T, R>(
    method: HttpMethod,
    path: string,
    body?: T,
  ): Promise<R> {
    const options = body ? { method, body: JSON.stringify(body) } : { method };

    const response = await fetch(
      `http://${this.ip}/api${path}`,
      options,
    );

    const data = await response.json();

    if (isError(data)) {
      const [
        {
          error: { type, address, description },
        },
      ] = data;
      const addressString = address ? `:${address}` : ``;
      throw new Error(
        `Gateway returned error response [${type}${addressString}]: ${description}`,
      );
    }

    return data;
  }

  public async getUsername() {
    if (!this.username) {
      const response = await this.makeRequest<
        UsernameRequestType,
        UsernameResponseType
      >("POST", "", {
        devicetype: this.deviceType,
      });

      const [
        {
          success: { username },
        },
      ] = response;

      this.username = username;
    }
    return this.username;
  }

  private async makeAuthenticatedRequest<T = never, R = never>(
    method: HttpMethod,
    path: string,
    body?: T,
  ) {
    return await this.makeRequest<T, R>(
      method,
      `/${await this.getUsername()}${path}`,
      body,
    );
  }

  async get<R>(path: string) {
    return await this.makeAuthenticatedRequest<R>("GET", path);
  }

  async post<T, R>(path: string, data: T) {
    return await this.makeAuthenticatedRequest<T, R>("POST", path, data);
  }

  async put<T, R>(path: string, data: T) {
    return await this.makeAuthenticatedRequest<T, R>("PUT", path, data);
  }
}
