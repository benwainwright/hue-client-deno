import { LightResponse } from "./light-response.ts";

export type NewLightsResponse = {
  [K in string]: K extends "lastscan" ? string : LightResponse;
};
