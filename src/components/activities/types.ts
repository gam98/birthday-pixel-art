export interface ActivityComponentProps {
  onComplete: () => void;
  onSound?: (key: 'ui-click' | 'activity-success' | 'pool-shot') => void;
}
