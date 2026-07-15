export interface DialogueChoice {
  label: string;
  response?: string;
}

export interface DialogueLine {
  speaker: string;
  text: string;
  portrait?: string;
  choices?: DialogueChoice[];
}

export interface DialogueSequence {
  id: string;
  lines: DialogueLine[];
}
