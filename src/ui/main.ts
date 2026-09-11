import { Game } from '../core/Game';
import { AdvancedDynamicTexture, TextBlock, Rectangle } from '@babylonjs/gui';

export class GameUI {
  private advancedTexture?: AdvancedDynamicTexture;

  constructor(_game: Game) {}

  init(): void {
    this.advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI('UI');
    this.createHealthBar();
    this.createCrosshair();
  }

  private createHealthBar(): void {
    if (!this.advancedTexture) {return;}

    const rect = new Rectangle('healthBar');
    rect.width = '200px';
    rect.height = '20px';
    rect.cornerRadius = 4;
    rect.color = 'white';
    rect.thickness = 2;
    rect.background = 'black';
    rect.horizontalAlignment = Rectangle.HORIZONTAL_ALIGNMENT_LEFT;
    rect.verticalAlignment = Rectangle.VERTICAL_ALIGNMENT_BOTTOM;
    rect.paddingLeft = '20px';
    rect.paddingBottom = '20px';

    const text = new TextBlock('healthText');
    text.text = 'HP: 100 / 100';
    text.color = 'white';
    text.fontSize = 14;
    text.fontFamily = 'Segoe UI, sans-serif';

    rect.addControl(text);
    this.advancedTexture.addControl(rect);
  }

  private createCrosshair(): void {
    if (!this.advancedTexture) {return;}

    const crosshair = new TextBlock('crosshair');
    crosshair.text = '+';
    crosshair.color = 'white';
    crosshair.fontSize = 24;
    crosshair.fontFamily = 'Segoe UI, sans-serif';
    crosshair.horizontalAlignment = TextBlock.HORIZONTAL_ALIGNMENT_CENTER;
    crosshair.verticalAlignment = TextBlock.VERTICAL_ALIGNMENT_CENTER;
    this.advancedTexture.addControl(crosshair);
  }
}
