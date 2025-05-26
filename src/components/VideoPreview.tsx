
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StoryStructure, VideoStyle } from "@/types/video";
import { Play, Volume2, Eye, FileText } from "lucide-react";

interface VideoPreviewProps {
  story: StoryStructure;
  style: VideoStyle;
  generated: boolean;
}

const VideoPreview = ({ story, style, generated }: VideoPreviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Play className="w-5 h-5 text-red-400" />
            Video Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-[9/16] bg-black rounded-lg relative overflow-hidden">
            {generated ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-900/20 to-purple-900/20">
                <div className="text-center">
                  <Play className="w-16 h-16 text-red-400 mx-auto mb-4" />
                  <p className="text-white font-semibold">Video Generated!</p>
                  <p className="text-gray-400 text-sm">Click to preview</p>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                <div className="text-center">
                  <Eye className="w-12 h-12 text-gray-500 mx-auto mb-2" />
                  <p className="text-gray-500">Video preview will appear here</p>
                </div>
              </div>
            )}
            
            {/* Demo horror elements overlay */}
            <div className="absolute top-4 left-4 right-4">
              <div className="bg-black/70 backdrop-blur-sm rounded p-2">
                <p className="text-red-400 font-bold text-sm">THE HAUNTED RECORDING</p>
              </div>
            </div>
            
            {generated && (
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/70 backdrop-blur-sm rounded p-2">
                  <p className="text-white text-xs leading-tight">
                    "Have you ever heard a voice that shouldn't exist..."
                  </p>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Volume2 className="w-5 h-5" />
              Audio Elements
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Voice Narration:</h4>
              <p className="text-sm text-gray-300">{style.audioStyle.voiceProcessing}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Background Music:</h4>
              <p className="text-sm text-gray-300">{style.audioStyle.music}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Sound Effects:</h4>
              <ul className="text-sm text-gray-300 space-y-1">
                {style.audioStyle.effects.map((effect, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-400 rounded-full"></span>
                    {effect}
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Visual Treatment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-white mb-2">Transition Style:</h4>
              <p className="text-sm text-gray-300">{style.visualStyle.transitions}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Color Scheme:</h4>
              <p className="text-sm text-gray-300">{style.visualStyle.colorScheme}</p>
            </div>
            
            <div>
              <h4 className="font-semibold text-white mb-2">Text Style:</h4>
              <p className="text-sm text-gray-300">{style.visualStyle.textStyle}</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gray-800/50 border-gray-700">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Technical Specs
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Resolution:</span>
              <span className="text-white">1080 x 1920 (9:16)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Frame Rate:</span>
              <span className="text-white">30 FPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Audio Quality:</span>
              <span className="text-white">48kHz Stereo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">File Format:</span>
              <span className="text-white">MP4 (H.264)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">File Size:</span>
              <span className="text-white">~15-25 MB</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VideoPreview;
