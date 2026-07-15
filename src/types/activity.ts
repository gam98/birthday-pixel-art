export type ActivityId = 'burger' | 'iceCream' | 'cinema' | 'pool' | 'memoryGarden';

export interface ActivityDefinition {
  id: ActivityId;
  name: string;
  scene: string;
  icon: string;
  keyPieceId?: string;
}
