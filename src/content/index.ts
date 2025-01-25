import { State } from "../lib/types";
import { atmosphere } from "./atmosphere";
import { controls } from "./controls";
import { cube } from "./cube";
import { ground } from "./ground";
import { sky } from "./sky";

export const state: State = {
  cube,
  controls,
  ground,
  sky,
  atmosphere,
};
