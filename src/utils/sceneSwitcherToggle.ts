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
 * Call createSwitcher() in onEnter() and disposeSwitcher() in onExit().
 */
export function createSceneSwitcherToggle(
  scene: Scene,
  game: Game,
  config: SceneSwitcherToggleConfig = {}
): {
  createSwitcher: (setSwitcher: (s: SceneSwitcher) => void) => SceneSwitcher;
  disposeSwitcher: (getSwitcher: () => SceneSwitcher | undefined) => void;
  toggleVisibility: () => void;
} {
  const key = config.key ?? 'w';
  let visible = config.initiallyVisible ?? true;
  let currentSwitcher: SceneSwitcher | null = null;

  const handler = (kbInfo: KeyboardInfo, _eventState: EventState) => {
    if (kbInfo.type === 1 && kbInfo.event.key === key) {
      visible = !visible;
      if (currentSwitcher) {
        currentSwitcher.setVisible(visible);
      }
    }
  };

  scene.onKeyboardObservable.add(handler);

  return {
    createSwitcher(setSwitcher: (s: SceneSwitcher) => void): SceneSwitcher {
      currentSwitcher = new SceneSwitcher(game, scene);
      currentSwitcher.setVisible(visible);
      setSwitcher(currentSwitcher);
      return currentSwitcher;
    },

    disposeSwitcher(getSwitcher: () => SceneSwitcher | undefined): void {
      scene.onKeyboardObservable.removeCallback(handler);
      const switcher = getSwitcher();
      if (switcher) {
        switcher.dispose();
      }
      currentSwitcher = null;
    },

    toggleVisibility(): void {
      visible = !visible;
      if (currentSwitcher) {
        currentSwitcher.setVisible(visible);
      }
    },
  };
}