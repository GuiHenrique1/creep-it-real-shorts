
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { story, style } = await req.json()
    const runwayApiKey = Deno.env.get('RUNWAY_ML_API_KEY')

    if (!runwayApiKey) {
      throw new Error('Runway ML API key não configurada')
    }

    console.log('Generating video with story:', story.hook)
    console.log('Using style:', style.name)

    // Criar prompt para geração de vídeo baseado na história
    const videoPrompt = `${story.hook} ${story.buildUp.join(' ')} ${style.visualStyle.colorScheme} ${style.visualStyle.effects.join(' ')}`
    
    console.log('Video prompt:', videoPrompt)

    // Chamar API do Runway ML para gerar vídeo
    const runwayResponse = await fetch('https://api.runwayml.com/v1/image_to_video', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${runwayApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gen3a_turbo',
        prompt_image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=1024&h=1024', // Imagem base para horror
        prompt_text: videoPrompt,
        duration: 10, // 10 segundos
        ratio: '9:16', // Formato vertical para TikTok
        watermark: false
      })
    })

    if (!runwayResponse.ok) {
      const error = await runwayResponse.text()
      console.error('Runway ML API error:', error)
      throw new Error(`Erro na API do Runway ML: ${runwayResponse.status}`)
    }

    const runwayData = await runwayResponse.json()
    console.log('Runway ML response:', runwayData)

    // Aguardar processamento do vídeo
    let videoStatus = 'processing'
    let videoUrl = null
    let attempts = 0
    const maxAttempts = 30 // 5 minutos máximo

    while (videoStatus === 'processing' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 10000)) // Aguardar 10 segundos
      
      const statusResponse = await fetch(`https://api.runwayml.com/v1/tasks/${runwayData.id}`, {
        headers: {
          'Authorization': `Bearer ${runwayApiKey}`,
        }
      })

      if (statusResponse.ok) {
        const statusData = await statusResponse.json()
        videoStatus = statusData.status
        
        if (videoStatus === 'succeeded') {
          videoUrl = statusData.output?.[0]
          break
        } else if (videoStatus === 'failed') {
          throw new Error('Falha na geração do vídeo pelo Runway ML')
        }
      }
      
      attempts++
    }

    if (!videoUrl) {
      throw new Error('Timeout na geração do vídeo - tente novamente')
    }

    const videoData = {
      url: videoUrl,
      duration: 10,
      format: "mp4",
      resolution: "1080x1920",
      size: "~25MB",
      thumbnailUrl: videoUrl.replace('.mp4', '_thumbnail.jpg')
    }

    console.log('Video generated successfully:', videoData)

    return new Response(
      JSON.stringify({ 
        success: true, 
        video: videoData,
        message: "Vídeo de terror gerado com sucesso!" 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error generating video:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'Erro ao gerar vídeo: ' + error.message 
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})
