
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { VideoStyle } from "@/types/video";
import { Eye, Film, Volume2 } from "lucide-react";

const styles: VideoStyle[] = [
  {
    id: "dark-disturbing",
    name: "Dark & Disturbing",
    description: "Intense horror with glitch effects and jumpscares",
    features: [
      "Fast cuts & glitch effects",
      "Sound stingers & static noise",
      "VHS distortion effects",
      "Subtle jumpscares",
      "Creepy visual overlays"
    ],
    visualStyle: {
      transitions: "Fast cuts with glitch transitions",
      effects: ["VHS grain", "Static noise", "Color distortion", "Screen tears"],
      colorScheme: "High contrast red/black with desaturated tones",
      textStyle: "Glitchy red text with corruption effects"
    },
    audioStyle: {
      music: "Aggressive industrial horror soundtrack",
      effects: ["Static bursts", "Metallic screeches", "Sudden silence breaks"],
      voiceProcessing: "Deep, distorted with reverb and occasional glitching"
    }
  },
  {
    id: "cinematic-horror",
    name: "Cinematic Horror",
    description: "Film-quality atmospheric horror with smooth suspense",
    features: [
      "Smooth cinematic transitions",
      "Immersive suspense soundtrack",
      "Film grain & slow zooms",
      "Atmospheric lighting",
      "Intense tension building"
    ],
    visualStyle: {
      transitions: "Smooth fades and cinematic wipes",
      effects: ["Film grain", "Lens flares", "Depth of field", "Color grading"],
      colorScheme: "Muted blues and oranges with deep shadows",
      textStyle: "Elegant serif font with cinematic timing"
    },
    audioStyle: {
      music: "Orchestral horror score with crescendos",
      effects: ["Ambient drones", "Distant echoes", "Orchestral stingers"],
      voiceProcessing: "Professional narration with spatial audio"
    }
  },
  {
    id: "minimalist-suspense",
    name: "Minimalist Suspense",
    description: "Psychological horror focusing on pure tension",
    features: [
      "Clean, focused narration",
      "Eerie background imagery",
      "Slow pans & minimal cuts",
      "Subtle sound design",
      "Psychological tension"
    ],
    visualStyle: {
      transitions: "Slow dissolves and gentle pans",
      effects: ["Subtle vignetting", "Soft shadows", "Minimal color correction"],
      colorScheme: "Monochromatic with selective color highlights",
      textStyle: "Clean sans-serif with fade animations"
    },
    audioStyle: {
      music: "Minimal ambient soundscape",
      effects: ["Whispers", "Footsteps", "Breathing", "Subtle environmental"],
      voiceProcessing: "Clear, intimate delivery with natural reverb"
    }
  }
];

interface StyleSelectorProps {
  onStyleSelect: (style: VideoStyle) => void;
}

const StyleSelector = ({ onStyleSelect }: StyleSelectorProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {styles.map((style) => (
        <Card 
          key={style.id} 
          className="bg-gray-800/50 border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/20"
        >
          <CardHeader>
            <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
              {style.id === "dark-disturbing" && <Eye className="w-6 h-6" />}
              {style.id === "cinematic-horror" && <Film className="w-6 h-6" />}
              {style.id === "minimalist-suspense" && <Volume2 className="w-6 h-6" />}
              {style.name}
            </CardTitle>
            <CardDescription className="text-gray-300">
              {style.description}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-white mb-2">Key Features:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {style.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-red-400 mt-1">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-red-300 text-sm">Visual Style:</h5>
                <p className="text-xs text-gray-400">{style.visualStyle.transitions}</p>
              </div>
              <div>
                <h5 className="font-medium text-red-300 text-sm">Audio Style:</h5>
                <p className="text-xs text-gray-400">{style.audioStyle.music}</p>
              </div>
            </div>
            
            <Button 
              onClick={() => onStyleSelect(style)}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3"
            >
              Select This Style
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default StyleSelector;
