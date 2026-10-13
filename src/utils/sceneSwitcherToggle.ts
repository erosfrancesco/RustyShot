import { Scene, KeyboardInfo, EventState } from '@babylonjs/core';
import { SceneSwitcher } from '../ui/SceneSwitcher';
import { Game } from '../core/Game';

/** Config for the scene switcher toggle behavior. */
export interface SceneSwitcherToggleConfig {
  /** Key to toggle visibility (default: 'w') */
  key?: string;
  /** Initial visibility state (default: true) */
  initiallyVisible?: boolean;
}

/**
 * Attaches a keyboard listener to toggle SceneSwitcher visibility.
 * Returns a cleanup function to remove the listener.
 */
export function attachSceneSwitcherToggle(
  scene: Scene,
  game: Game,
  getSwitcher: () => SceneSwitcher | undefined,
  setSwitcher: (s: SceneSwitcher) => void,
  config: SceneSwitcherToggleConfig = {}
): () => void {
  const key = config.key ?? 'w';
  let visible = config.initiallyVisible ?? true;

  const handler = (kbInfo: KeyboardInfo, _eventState: EventState) => {
    if (kbInfo.type === 1 && kbInfo.event.key === key) {
      visible = !visible;
      const switcher = getSwitcher();
      if (switcher) {
        switcher.setVisible(visible);
      }
    }
  };

  scene.onKeyboardObservable.add(handler);

  // Create and store initial switcher
  const switcher = new SceneSwitcher(game, scene);
  switcher.setVisible(visible);
  setSwitcher(switcher);

  return () => {
    scene.onKeyboardObservable.removeCallback(handler);
    switcher?.dispose();
  };
}