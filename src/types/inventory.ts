export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'memory' | 'key' | 'special';
}
