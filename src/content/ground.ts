import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { Component } from "..";
import { ColliderDesc } from "@dimforge/rapier3d";

const geometry = new PlaneGeometry(10, 10);
const material = new MeshBasicMaterial({ color: 0xffff00, side: DoubleSide });
const object3d = new Mesh(geometry, material);

// const desc = ColliderDesc.cuboid(10.0, 0.1, 10.0);

export const ground: Component[] = [
  {
    object3d,
    // desc,
  },
];
