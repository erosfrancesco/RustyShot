import { Scene, Vector3 } from '@babylonjs/core';

export class HitDetection {
  static raycastFromCamera(scene: Scene, distance = 1000): { point: Vector3; hit: boolean } {
    const ray = (scene as any).createPickingRay(0, 0, scene.activeCamera as any, scene, true) as any;
    const hit = scene.pickWithRay(ray);

    if (hit?.hit && hit.pickedPoint) {
      return {
        point: hit.pickedPoint.clone(),
        hit: true,
      };
    }

    const direction = ray.direction.scale(distance);
    const endPoint = ray.origin.add(direction);

    return {
      point: endPoint,
      hit: false,
    };
  }

  static checkSphereCollision(
    positionA: Vector3,
    radiusA: number,
    positionB: Vector3,
    radiusB: number,
  ): boolean {
    const distance = Vector3.Distance(positionA, positionB);
    return distance <= radiusA + radiusB;
  }
}
