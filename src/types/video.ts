
export interface VideoStyle {
  id: string;
  name: string;
  description: string;
  features: string[];
  visualStyle: {
    transitions: string;
    effects: string[];
    colorScheme: string;
    textStyle: string;
  };
  audioStyle: {
    music: string;
    effects: string[];
    voiceProcessing: string;
  };
}

export interface StoryStructure {
  hook: string;
  buildUp: string[];
  climax: string;
  ending: string;
}

export interface VideoProject {
  id: string;
  title: string;
  story: StoryStructure;
  style: VideoStyle;
  hashtags: string[];
  createdAt: Date;
}
