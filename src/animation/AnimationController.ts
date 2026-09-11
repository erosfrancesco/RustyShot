import { AnimationGroup } from '@babylonjs/core';

export class AnimationController {
  private readonly animations = new Map<string, AnimationGroup>();

  constructor(_scene: unknown) {}

  registerAnimation(name: string, animation: AnimationGroup): void {
    this.animations.set(name, animation);
  }

  play(name: string, loop = true): void {
    const animation = this.animations.get(name);
    if (!animation) {return;}
    animation.play(loop);
  }

  stop(name: string): void {
    const animation = this.animations.get(name);
    if (!animation) {return;}
    animation.stop();
  }

  stopAll(): void {
    for (const animation of this.animations.values()) {
      animation.stop();
    }
  }
}
