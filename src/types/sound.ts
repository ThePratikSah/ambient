export interface Sound {
  id: string;
  title: string;
  icon: string;
  audio: string;
}

export interface SoundState {
  playing: boolean;
  volume: number;
}
