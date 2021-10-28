import { Light } from "../resources.ts";

export interface HueBridge {
  username: string | undefined;
  lights: () => Promise<Light[]>;
}
