"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { milestoneZ } from "@/lib/layout";

/**
 * Drives the camera through a universe's timeline. Not used in the hallway
 * or finale scenes, which use bounded OrbitControls instead — this rig owns
 * the camera outright so it can guide the walk without fighting user input.
 */
export default function CameraRig({ milestoneIndex }: { milestoneIndex: number }) {
  const { camera, pointer } = useThree();
  const lookAt = useRef(new THREE.Vector3(0, 1.3, 0));
  const targetPos = useRef(new THREE.Vector3(0, 2.3, 6));

  useFrame((_, delta) => {
    const z = milestoneZ(milestoneIndex);

    targetPos.current.set(
      pointer.x * 0.5,
      2.3 + pointer.y * 0.15,
      z + 6.5
    );
    lookAt.current.set(pointer.x * 0.8, 1.3, z - 1.5);

    const dampT = 1 - Math.pow(0.001, delta);
    camera.position.lerp(targetPos.current, dampT);

    const currentLookAt = new THREE.Vector3();
    camera.getWorldDirection(currentLookAt);
    const desired = lookAt.current.clone().sub(camera.position).normalize();
    const blended = currentLookAt.lerp(desired, dampT).normalize();
    const lookTarget = camera.position.clone().add(blended);
    camera.lookAt(lookTarget);
  });

  return null;
}
