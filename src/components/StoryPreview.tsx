
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StoryStructure, VideoStyle } from "@/types/video";
import { Hash, Eye, Zap, Target } from "lucide-react";

interface StoryPreviewProps {
  story: StoryStructure;
  hashtags: string[];
  style: VideoStyle;
}

const StoryPreview = ({ story, hashtags, style }: StoryPreviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Hook / Opening
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">{story.hook}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <Zap className="w-5 h-5" />
              Build-up & Suspense
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {story.buildUp.map((segment, index) => (
              <div key={index} className="border-l-2 border-orange-500 pl-4">
                <p className="text-gray-300 leading-relaxed">{segment}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-red-900 border-2">
          <CardHeader>
            <CardTitle className="text-red-500 flex items-center gap-2">
              <Target className="w-5 h-5" />
              Climax (Peak Horror)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed font-medium">{story.climax}</p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-purple-700">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Hash className="w-5 h-5" />
              Ending & Twist
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-lg leading-relaxed">{story.ending}</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400">Style Elements</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Visual Effects:</h4>
              <div className="flex flex-wrap gap-1">
                {style.visualStyle.effects.map((effect, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Audio Effects:</h4>
              <div className="flex flex-wrap gap-1">
                {style.audioStyle.effects.map((effect, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {effect}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Voice Processing:</h4>
              <p className="text-sm text-gray-400">{style.audioStyle.voiceProcessing}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400">Hashtags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {hashtags.map((tag, index) => (
                <Badge key={index} className="bg-green-600/20 text-green-400 border-green-600">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Copy these hashtags when uploading to TikTok for maximum reach
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-yellow-400">Video Stats</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Estimated Duration:</span>
              <span className="text-white">2:30 - 2:45</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Word Count:</span>
              <span className="text-white">~350 words</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Reading Speed:</span>
              <span className="text-white">Slow & dramatic</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Horror Intensity:</span>
              <span className="text-red-400">High</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StoryPreview;
