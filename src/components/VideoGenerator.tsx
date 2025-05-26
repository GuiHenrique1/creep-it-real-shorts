
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoStyle, StoryStructure } from "@/types/video";
import { Play, Download, Wand2, RefreshCw } from "lucide-react";
import StoryPreview from "./StoryPreview";
import VideoPreview from "./VideoPreview";
import { generateHorrorStory, generateHashtags } from "@/utils/storyGenerator";
import { useVideoGeneration } from "@/hooks/useVideoGeneration";
import { toast } from "sonner";

interface VideoGeneratorProps {
  selectedStyle: VideoStyle;
  isGenerating: boolean;
  setIsGenerating: (generating: boolean) => void;
}

const VideoGenerator = ({ selectedStyle, isGenerating, setIsGenerating }: VideoGeneratorProps) => {
  const [currentStory, setCurrentStory] = useState<StoryStructure | null>(null);
  const [currentHashtags, setCurrentHashtags] = useState<string[]>([]);
  
  const { 
    isGenerating: isGeneratingVideo, 
    generatedVideo, 
    generateVideo, 
    downloadVideo 
  } = useVideoGeneration();

  const handleGenerateStory = async () => {
    setIsGenerating(true);
    try {
      const story = await generateHorrorStory();
      const hashtags = generateHashtags();
      
      setCurrentStory(story);
      setCurrentHashtags(hashtags);
      
      toast.success("História de terror gerada com sucesso!");
    } catch (error) {
      toast.error("Falha ao gerar história. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVideo = async () => {
    if (!currentStory) return;
    
    try {
      await generateVideo(currentStory, selectedStyle);
    } catch (error) {
      // Erro já tratado no hook
    }
  };

  const handleDownloadVideo = () => {
    if (generatedVideo) {
      downloadVideo(generatedVideo.url, `horror-video-${Date.now()}.mp4`);
    } else {
      toast.error("Nenhum vídeo disponível para download");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Wand2 className="w-6 h-6 text-red-400" />
            Geração de Vídeo de Terror
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-4">
            <Button 
              onClick={handleGenerateStory}
              disabled={isGenerating || isGeneratingVideo}
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              {isGenerating ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Wand2 className="w-4 h-4 mr-2" />
              )}
              Gerar Nova História
            </Button>
            
            {currentStory && (
              <Button 
                onClick={handleGenerateVideo}
                disabled={isGenerating || isGeneratingVideo || !currentStory}
                variant="outline"
                className="border-red-500 text-red-400 hover:bg-red-500 hover:text-white"
              >
                {isGeneratingVideo ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Play className="w-4 h-4 mr-2" />
                )}
                {isGeneratingVideo ? 'Gerando Vídeo...' : 'Gerar Vídeo'}
              </Button>
            )}
            
            {generatedVideo && (
              <Button 
                onClick={handleDownloadVideo}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Vídeo
              </Button>
            )}
          </div>

          {isGeneratingVideo && (
            <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-5 h-5 text-red-400 animate-spin" />
                <div>
                  <p className="text-white font-semibold">Gerando seu vídeo de terror...</p>
                  <p className="text-gray-400 text-sm">Isso pode levar alguns minutos. Por favor, aguarde.</p>
                </div>
              </div>
            </div>
          )}

          {generatedVideo && (
            <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                <div>
                  <p className="text-green-400 font-semibold">Vídeo gerado com sucesso!</p>
                  <p className="text-gray-300 text-sm">
                    Duração: {Math.floor(generatedVideo.duration / 60)}:{(generatedVideo.duration % 60).toString().padStart(2, '0')} | 
                    Resolução: {generatedVideo.resolution} | 
                    Tamanho: {generatedVideo.size}
                  </p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {currentStory && (
        <Tabs defaultValue="story" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800 border-gray-700">
            <TabsTrigger value="story" className="data-[state=active]:bg-red-600">
              Prévia da História
            </TabsTrigger>
            <TabsTrigger value="video" className="data-[state=active]:bg-red-600">
              Prévia do Vídeo
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-red-600">
              Configurações de Exportação
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
              generated={!!generatedVideo}
              videoUrl={generatedVideo?.url}
            />
          </TabsContent>
          
          <TabsContent value="settings" className="mt-6">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">Configurações de Exportação</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-gray-300">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold text-red-400">Formato do Vídeo:</h4>
                    <p>Vertical 9:16 (1080x1920)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Duração:</h4>
                    <p>Até 3 minutos (otimizado para TikTok)</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Áudio:</h4>
                    <p>48kHz estéreo com voz + fundo</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-red-400">Legendas:</h4>
                    <p>Auto-sincronizadas com estilo de terror</p>
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
