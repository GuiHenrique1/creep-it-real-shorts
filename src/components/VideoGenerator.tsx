
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoStyle, StoryStructure } from "@/types/video";
import { Play, Download, Wand2, RefreshCw } from "lucide-react";
import StoryPreview from "./StoryPreview";
import VideoPreview from "./VideoPreview";
import { generateHorrorStory, generateHashtags } from "@/utils/storyGenerator";
import { toast } from "sonner";

interface VideoGeneratorProps {
  selectedStyle: VideoStyle;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const VideoGenerator = ({ selectedStyle, isGenerating, setIsGenerating }: VideoGeneratorProps) => {
  const [currentStory, setCurrentStory] = useState<StoryStructure | null>(null);
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([]);
  const [videoGenerated, setVideoGenerated] = useState(false);

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const story = await generateHorrorStory();
      const hashtags = generateHashtags();
      
      setCurrentStory(story);
      setCurrentHashtags(hashtags);
      
      toast.success("Horror story generated successfully!");
    } catch (error) {
      toast.error("Failed to generate story. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!currentStory) return;
    
    setIsGenerating(true);
    try {
      // Simulate video generation process
      await new Promise(resolve => setTimeout(resolve, 3000));
      setVideoGenerated(true);
      toast.success("Video generated successfully! Ready for download.");
    } catch (error) {
      toast.error("Failed to generate video. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadVideo = () => {
    toast.success("Video download started! (Demo mode)");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-red-400" />
            Horror Video Generation
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleGenerateStory}
              disabled={isGenerating}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4 mr-2" />
              )}
              Generate New Story
            </Button>
            
            {currentStory && (
              <Button 
                onClick={handleGenerateVideo}
                disabled={isGenerating || !currentStory}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                {isGenerating ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                Generate Video
              </Button>
            )}
            
            {videoGenerated && (
              <Button 
                onClick={handleDownloadVideo}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Video
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {currentStory && (
        <Tabs defaultValue="story" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="story" className="data-[state=active]:bg-red-600">
              Story Preview
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-red-600">
              Video Preview
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
              Export Settings
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="story" className="mt-6">
            <StoryPreview 
              story={currentStory} 
              hashtags={currentHashtags}
              style={selectedStyle}
            />
          </TabsContent>
          
          <TabsContent value="video" className="mt-6">
            <VideoPreview 
              story={currentStory}
              style={selectedStyle}
              generated={videoGenerated}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Export Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-400">Video Format:</h4>
                    <p>Vertical 9:16 (1080x1920)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Duration:</h4>
                    <p>Up to 3 minutes (TikTok optimized)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Audio:</h4>
                    <p>48kHz stereo with voice + background</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Subtitles:</h4>
                    <p>Auto-synced with horror styling</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default VideoGenerator;
