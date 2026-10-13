import { Game } from '../core/Game';
import { AdvancedDynamicTexture, Button, StackPanel, Control } from '@babylonjs/gui';
import { Scene } from '@babylonjs/core';
import { SceneType } from '../core/Scene';

/** UI component for switching between game scenes. */
export class SceneSwitcher {
  private readonly texture: AdvancedDynamicTexture;
  private readonly panel: StackPanel;

  constructor(private readonly game: Game, private readonly scene: Scene) {
    this.texture = AdvancedDynamicTexture.CreateFullscreenUI('SceneSwitcher', true, this.scene);
    this.panel = new StackPanel('sceneSwitcherPanel');
    this.panel.width = '220px';
    this.panel.horizontalAlignment = Control.HORIZONTAL_ALIGNMENT_RIGHT;
    this.panel.verticalAlignment = Control.VERTICAL_ALIGNMENT_TOP;
    this.panel.paddingTop = '10px';
    this.panel.paddingRight = '10px';
    this.panel.isVertical = true;
    this.panel.spacing = 8;

    this.createButtons();
    this.texture.addControl(this.panel);
  }

  private createButtons(): void {
    const scenes: { type: SceneType; label: string; shortcut: string }[] = [
      { type: 'main', label: 'Main Viewer', shortcut: '1' },
      { type: 'asset-manager', label: 'Asset Manager', shortcut: '2' },
      { type: 'test', label: 'Test Scene', shortcut: '3' },
    ];

    for (const { type, label, shortcut } of scenes) {
      const btn = Button.CreateSimpleButton(`switch-${type}`, `${label}  (${shortcut})`);
      btn.width = '200px';
      btn.height = '40px';
      btn.color = 'white';
      btn.background = type === 'main' ? '#2d6a4f' : '#1b4332';
      btn.cornerRadius = 6;
      btn.fontSize = 14;
      btn.fontFamily = 'Segoe UI, sans-serif';
      btn.onPointerUpObservable.add(() => {
        this.game.switchScene(type);
      });
      this.panel.addControl(btn);
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