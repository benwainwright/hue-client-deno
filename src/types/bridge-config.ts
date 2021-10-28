import { IpAddress } from "./ip-address.ts";
import { MacAddress } from "./mac-address.ts";
import { UpdateableBridgeConfig } from "./updateable-bridge-config.ts";

export type BridgeConfig = UpdateableBridgeConfig & {
  ipaddress: IpAddress;
  mac: MacAddress;
  netmask: IpAddress;
  gateway: IpAddress;
  proxyaddress: string;
  proxyport: number;
  UTC: string;
  whitelist: {
    [key: string]: {
      "last use date": string;
      "create date": string;
      name: string;
    };
  };
  swversion: string;
  swupdate: {
    updatestate: number;
    url: string;
    text: string;
    notify: boolean;
  };
};
