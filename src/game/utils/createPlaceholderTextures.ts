import Phaser from 'phaser';

function generateTexture(
  scene: Phaser.Scene,
  key: string,
  width: number,
  height: number,
  draw: (graphics: Phaser.GameObjects.Graphics) => void,
): void {
  if (scene.textures.exists(key)) return;
  const graphics = scene.make.graphics({ x: 0, y: 0 });
  draw(graphics);
  graphics.generateTexture(key, width, height);
  graphics.destroy();
}

export function createPlaceholderTextures(scene: Phaser.Scene): void {
  generateTexture(scene, 'player', 12, 16, (graphics) => {
    graphics.fillStyle(0x4b2b45).fillRect(3, 0, 6, 3);
    graphics.fillStyle(0xf5c6a5).fillRect(2, 3, 8, 5);
    graphics.fillStyle(0x3b2340).fillRect(3, 4, 2, 2).fillRect(8, 4, 1, 2);
    graphics.fillStyle(0xd65d78).fillRect(2, 8, 8, 5);
    graphics.fillStyle(0x71445b).fillRect(1, 13, 4, 3).fillRect(7, 13, 4, 3);
  });

  generateTexture(scene, 'bed', 72, 38, (graphics) => {
    graphics.fillStyle(0x6f4059).fillRect(0, 5, 72, 33);
    graphics.fillStyle(0xf8cfca).fillRect(4, 2, 64, 30);
    graphics.fillStyle(0xffeee5).fillRect(7, 4, 23, 12);
    graphics.fillStyle(0xd9798b).fillRect(33, 6, 32, 23);
    graphics.fillStyle(0xa7546d).fillRect(0, 34, 7, 4).fillRect(65, 34, 7, 4);
  });

  generateTexture(scene, 'desk', 54, 30, (graphics) => {
    graphics.fillStyle(0x8b5746).fillRect(0, 0, 54, 8);
    graphics.fillStyle(0x613b3f).fillRect(3, 8, 6, 22).fillRect(45, 8, 6, 22);
    graphics.fillStyle(0xefc05d).fillRect(31, 2, 14, 4);
  });

  generateTexture(scene, 'gift', 28, 28, (graphics) => {
    graphics.fillStyle(0x5f9f8d).fillRect(2, 7, 24, 21);
    graphics.fillStyle(0xffcf67).fillRect(11, 7, 6, 21).fillRect(0, 5, 28, 6);
    graphics.fillStyle(0xd65d78).fillRect(6, 0, 7, 7).fillRect(16, 0, 7, 7);
  });

  generateTexture(scene, 'door', 34, 58, (graphics) => {
    graphics.fillStyle(0x4b2b45).fillRect(0, 0, 34, 58);
    graphics.fillStyle(0x865668).fillRect(4, 4, 26, 54);
    graphics.fillStyle(0xf4c35f).fillCircle(24, 31, 2);
  });
}
