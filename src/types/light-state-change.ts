import { LightState } from "./light-state.ts";

export type LightStateChange = Partial<
  Omit<LightState, "reachable" | "colormode" | "effect">
>;
