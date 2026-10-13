import { Game } from '../core/Game';
import { AdvancedDynamicTexture, Button, StackPanel, Control } from '@babylonjs/gui';
import { Scene } from '@babylonjs/core';
import { SceneType } from '../core/Scene';
import { GameEvents } from '../core/Events';

/** UI component for switching between game scenes. */
export class SceneSwitcher {
  private readonly texture: AdvancedDynamicTexture;
  private readonly panel: StackPanel;
  private readonly buttons = new Map<SceneType, Button>();
  private readonly game: Game;

  constructor(game: Game, scene: Scene) {
    this.game = game;
    this.texture = AdvancedDynamicTexture.CreateFullscreenUI('SceneSwitcher', true, scene);
    this.panel = new StackPanel('sceneSwitcherPanel');
    this.panel.width = '220px';
    this.panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.panel.paddingTop = '10px';
    this.panel.paddingRight = '10px';
    this.panel.isVertical = true;
    this.panel.spacing = 8;

    this.createButtons();
    this.updateActiveHighlight();
    this.texture.addControl(this.panel);

    // Listen for scene changes to update highlight
    this.game.getEventBus().on(GameEvents.StateChange, () => {
      this.updateActiveHighlight();
    });
  }

  private createButtons(): void {
    // Get available scenes from the game
    const sceneTypes: SceneType[] = ['main', 'asset-manager'];
    const labels: Record<SceneType, string> = {
      'main': 'Main Viewer',
      'asset-manager': 'Asset Manager',
    };
    const shortcuts: Record<SceneType, string> = {
      'main': '1',
      'asset-manager': '2',
    };

    for (const type of sceneTypes) {
      const sceneInstance = this.game.getSceneInstance(type);
      if (!sceneInstance) continue; // Skip scenes not loaded

      const label = labels[type];
      const shortcut = shortcuts[type];

      const btn = Button.CreateSimpleButton(`switch-${type}`, `${label}  (${shortcut})`);
      btn.width = '200px';
      btn.height = '40px';
      btn.color = 'white';
      btn.background = '#1b4332'; // Default inactive color
      btn.cornerRadius = 6;
      btn.fontSize = 14;
      btn.fontFamily = 'Segoe UI, sans-serif';
      btn.onPointerUpObservable.add(() => {
        this.game.switchScene(type);
      });
      this.buttons.set(type, btn);
      this.panel.addControl(btn);
    }
  }

  private updateActiveHighlight(): void {
    const activeScene = this.game.getActiveScene();
    if (!activeScene) return;

    // Find which scene type is active
    for (const [type, button] of this.buttons) {
      const sceneInstance = this.game.getSceneInstance(type);
      const isActive = sceneInstance === activeScene;
      button.background = isActive ? '#4a9c6e' : '#1b4332'; // Lighter green for active
    }
  }

  setVisible(visible: boolean): void {
    this.panel.isVisible = visible;
  }

  dispose(): void {
    this.panel.dispose();
    this.texture.dispose();
  }
}