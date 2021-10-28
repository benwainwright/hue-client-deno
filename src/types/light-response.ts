import { LightCapabilities } from "./light-capabilities.ts";
import { LightConfig } from "./light-config.ts";
import { LightState } from "./light-state.ts";
import { LightSwUpdate } from "./light-sw-update.ts";

export interface LightResponse {
  state: LightState;
  swupdate: LightSwUpdate;
  type: string;
  name: string;
  modelid: string;
  manufacturername: string;
  productname: string;
  capabilities: LightCapabilities;
  config: LightConfig;
  uniqueid: string;
  swversion: string;
  swconfigid: string;
  productid: string;
}
