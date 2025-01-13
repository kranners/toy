import { world } from "./content";
import { init, systems, update } from "./systems";
import { renderer } from "./systems/render";

export type Entity = number;

export type Component = Record<string, unknown>;

export type World = Record<Entity, Component[]>;

export type System = {
  update: (world: World) => void;
  init?: (world: World) => void;
}

export type Predicate<C extends Component> = (component: Component) => component is C;

export function query<C extends Component>(world: World, predicate: Predicate<C>): C[] {
  const components = Object.values(world).flat();
  return components.filter(predicate);
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

init(systems, world);

renderer.setAnimationLoop(() => {
  update(systems, world);
});

