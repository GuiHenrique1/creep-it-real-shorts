
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { StoryStructure, VideoStyle } from '@/types/video';
import { toast } from 'sonner';

interface GeneratedVideo {
  url: string;
  duration: number;
  format: string;
  resolution: string;
  size: string;
  thumbnailUrl: string;
}

export const useVideoGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideo, setGeneratedVideo] = useState<GeneratedVideo | null>(null);

  const generateVideo = async (story: StoryStructure, style: VideoStyle) => {
    setIsGenerating(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-horror-video', {
        body: { story, style }
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data.success) {
        setGeneratedVideo(data.video);
        toast.success(data.message);
        return data.video;
      } else {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error('Error generating video:', error);
      toast.error('Erro ao gerar vídeo: ' + (error as Error).message);
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadVideo = async (videoUrl: string, filename: string = 'horror-video.mp4') => {
    try {
      const response = await fetch(videoUrl);
      const blob = await response.blob();
      
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('Download iniciado!');
    } catch (error) {
      console.error('Error downloading video:', error);
      toast.error('Erro ao fazer download do vídeo');
    }
  };

  return {
    isGenerating,
    generatedVideo,
    generateVideo,
    downloadVideo,
    setGeneratedVideo
  };
};
