import { Engine, System } from "../lib/types";

const handleWindowResize = (engine: Engine) => {
  engine.renderer.setSize(window.innerWidth, window.innerHeight, true);

  engine.camera.aspect = window.innerWidth / window.innerHeight;
  engine.camera.updateProjectionMatrix();

  engine.renderer.render(engine.scene, engine.camera);
}

export const resize: System = {
  init: (_, engine: Engine) => {
    window.addEventListener("resize", () => handleWindowResize(engine));
  }
}
