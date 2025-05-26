
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StyleSelector from "@/components/StyleSelector";
import VideoGenerator from "@/components/VideoGenerator";
import { VideoStyle } from "@/types/video";

const Index = () => {
  const [selectedStyle, setSelectedStyle] = useState<VideoStyle | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleStyleSelect = (style: VideoStyle) => {
    setSelectedStyle(style);
  };

  const handleBackToStyles = () => {
    setSelectedStyle(null);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-red-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            Horror Video Generator
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Automatic video generator specialized in dark, horror, and supernatural storytelling for TikTok. 
            Create spine-chilling videos with AI-generated scripts, atmospheric visuals, and haunting audio.
          </p>
        </header>

        {!selectedStyle ? (
          <StyleSelector onStyleSelect={handleStyleSelect} />
        ) : (
          <div>
            <div className="flex items-center justify-between mb-8">
              <Button 
                onClick={handleBackToStyles}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                ← Back to Styles
              </Button>
              <div className="text-center">
                <h2 className="text-2xl font-bold text-red-400">
                  Style: {selectedStyle.name}
                </h2>
                <p className="text-gray-400">{selectedStyle.description}</p>
              </div>
            </div>
            
            <VideoGenerator 
              selectedStyle={selectedStyle} 
              isGenerating={isGenerating}
              setIsGenerating={setIsGenerating}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
