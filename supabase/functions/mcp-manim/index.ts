// ============================================
// 🎬 MCP MANIM EDGE FUNCTION
// ============================================
// Purpose: Interface with Manim MCP for educational video generation
// Repository: https://github.com/abhiemj/manim-mcp-server
// Features: Mathematical animations, educational content, code visualization
// Authentication: Required for user-specific video management
// ============================================

import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

// ============================================
// 🔧 CONFIGURATION
// ============================================
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// ============================================
// 🎬 MANIM INTERFACES
// ============================================
interface AnimationRequest {
  type: 'mathematical' | 'geometric' | 'graph' | 'text' | 'code';
  content: string;
  title?: string;
  duration?: number;
  quality?: 'low' | 'medium' | 'high';
  format?: 'mp4' | 'gif' | 'webm';
  settings?: {
    backgroundColor?: string;
    textColor?: string;
    frameRate?: number;
    resolution?: string;
  };
}

interface AnimationVideo {
  id: string;
  title: string;
  type: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoUrl?: string;
  thumbnailUrl?: string;
  duration?: number;
  createdAt: string;
  userId?: string;
  settings: any;
  progress?: number;
}

interface AnimationResponse {
  success: boolean;
  video?: AnimationVideo;
  videos?: AnimationVideo[];
  message?: string;
  error?: string;
}

// ============================================
// 🎨 MANIM PROCESSING FUNCTIONS
// ============================================
async function generateManimAnimation(request: AnimationRequest): Promise<{ videoId: string; videoUrl: string }> {
  try {
    // In production, this would interface with actual Manim server
    // For demo, we simulate the animation generation process
    
    const videoId = crypto.randomUUID();
    const animationScript = generateManimScript(request);
    
    console.log(`Generated Manim script for ${request.type}:`, animationScript);
    
    // Simulate processing time based on quality
    const processingTime = request.quality === 'high' ? 30000 : 
                          request.quality === 'medium' ? 20000 : 10000;
    
    // Mock video URL (in production, this would be the actual rendered video)
    const videoUrl = `https://example.com/animations/${videoId}.${request.format || 'mp4'}`;
    
    console.log(`Mock animation generated: ${videoId} -> ${videoUrl}`);
    
    return {
      videoId,
      videoUrl
    };

  } catch (error) {
    console.error('Manim generation error:', error);
    throw new Error(`Failed to generate animation: ${error.message}`);
  }
}

function generateManimScript(request: AnimationRequest): string {
  const { type, content, settings } = request;
  
  switch (type) {
    case 'mathematical':
      return `
from manim import *

class MathAnimation(Scene):
    def construct(self):
        # Mathematical expression: ${content}
        equation = MathTex("${content}")
        equation.set_color(${settings?.textColor || 'WHITE'})
        
        self.play(Write(equation))
        self.wait(2)
        
        # Transform or animate the equation
        self.play(equation.animate.scale(1.5))
        self.wait(1)
        self.play(equation.animate.scale(1))
        self.wait(2)
`;

    case 'geometric':
      return `
from manim import *

class GeometricAnimation(Scene):
    def construct(self):
        # Geometric content: ${content}
        shapes = VGroup()
        
        circle = Circle(color=BLUE)
        square = Square(color=RED)
        triangle = Triangle(color=GREEN)
        
        shapes.add(circle, square, triangle)
        shapes.arrange(RIGHT, buff=1)
        
        self.play(Create(shapes))
        self.wait(2)
        
        self.play(shapes.animate.rotate(PI/4))
        self.wait(2)
`;

    case 'graph':
      return `
from manim import *

class GraphAnimation(Scene):
    def construct(self):
        # Graph visualization: ${content}
        axes = Axes(
            x_range=[-3, 3, 1],
            y_range=[-2, 2, 1],
            tips=False
        )
        
        graph = axes.plot(lambda x: x**2, color=BLUE)
        
        self.play(Create(axes))
        self.wait(1)
        self.play(Create(graph))
        self.wait(2)
`;

    case 'text':
      return `
from manim import *

class TextAnimation(Scene):
    def construct(self):
        # Text content: ${content}
        text = Text("${content}")
        text.set_color(${settings?.textColor || 'WHITE'})
        
        self.play(Write(text))
        self.wait(2)
        
        self.play(text.animate.to_edge(UP))
        self.wait(1)
`;

    case 'code':
      return `
from manim import *

class CodeAnimation(Scene):
    def construct(self):
        # Code visualization: ${content}
        code = Code(
            code="""${content}""",
            language="python",
            font="Monospace"
        )
        
        self.play(Create(code))
        self.wait(3)
        
        # Highlight specific lines
        self.play(code.animate.highlight_lines(1))
        self.wait(2)
`;

    default:
      return `
from manim import *

class DefaultAnimation(Scene):
    def construct(self):
        text = Text("${content}")
        self.play(Write(text))
        self.wait(2)
`;
  }
}

async function getAnimationStatus(videoId: string): Promise<AnimationVideo> {
  try {
    // In production, check actual rendering status
    // For demo, return mock status
    return {
      id: videoId,
      title: 'Sample Animation',
      type: 'mathematical',
      status: 'completed',
      videoUrl: `https://example.com/animations/${videoId}.mp4`,
      thumbnailUrl: `https://example.com/thumbnails/${videoId}.jpg`,
      duration: 15,
      createdAt: new Date().toISOString(),
      settings: {},
      progress: 100
    };
    
  } catch (error) {
    console.error('Status check error:', error);
    throw new Error(`Failed to get animation status: ${error.message}`);
  }
}

// ============================================
// 🌐 MAIN HANDLER
// ============================================
serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey);
    
    // Get user from auth header
    const authHeader = req.headers.get('authorization');
    let userId = null;
    
    if (authHeader) {
      const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''));
      userId = user?.id;
    }

    const { action, ...requestData } = await req.json();

    switch (action) {
      case 'generate_animation': {
        const animationRequest = requestData as AnimationRequest;
        
        if (!animationRequest.content) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Content is required for animation generation' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Generate animation
        const { videoId, videoUrl } = await generateManimAnimation(animationRequest);
        
        // Create video record
        const animationVideo: AnimationVideo = {
          id: videoId,
          title: animationRequest.title || `${animationRequest.type} Animation`,
          type: animationRequest.type,
          status: 'processing',
          videoUrl,
          thumbnailUrl: `https://example.com/thumbnails/${videoId}.jpg`,
          duration: animationRequest.duration || 15,
          createdAt: new Date().toISOString(),
          userId,
          settings: animationRequest.settings || {},
          progress: 0
        };

        // Store animation metadata in database (create table if needed)
        // For now, return the animation info directly
        
        console.log(`Animation generation started: ${videoId} for user ${userId || 'anonymous'}`);
        
        const response: AnimationResponse = {
          success: true,
          video: animationVideo,
          message: 'Animation generation started successfully'
        };

        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_animation_status': {
        const { videoId } = requestData;
        
        if (!videoId) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Video ID is required' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const animationStatus = await getAnimationStatus(videoId);
        
        console.log(`Animation status checked: ${videoId} by user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify({
          success: true,
          video: animationStatus
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'list_animations': {
        // Return user's animations (placeholder)
        const animations: AnimationVideo[] = [
          {
            id: 'sample-1',
            title: 'Quadratic Function Animation',
            type: 'mathematical',
            status: 'completed',
            videoUrl: 'https://example.com/animations/sample-1.mp4',
            thumbnailUrl: 'https://example.com/thumbnails/sample-1.jpg',
            duration: 20,
            createdAt: '2024-01-15T10:00:00Z',
            userId,
            settings: { quality: 'high', format: 'mp4' },
            progress: 100
          },
          {
            id: 'sample-2',
            title: 'Geometric Shapes',
            type: 'geometric',
            status: 'processing',
            duration: 15,
            createdAt: '2024-01-15T11:30:00Z',
            userId,
            settings: { quality: 'medium', format: 'mp4' },
            progress: 75
          }
        ];

        return new Response(JSON.stringify({
          success: true,
          videos: animations,
          totalVideos: animations.length
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_templates': {
        // Return available animation templates
        const templates = [
          {
            id: 'math-basic',
            name: 'Basic Mathematical Expression',
            type: 'mathematical',
            description: 'Simple mathematical equations and expressions',
            example: 'x^2 + 2x + 1 = (x + 1)^2'
          },
          {
            id: 'geometry-shapes',
            name: 'Geometric Shapes',
            type: 'geometric', 
            description: 'Basic geometric shapes and transformations',
            example: 'Circle, Square, Triangle transformations'
          },
          {
            id: 'graph-functions',
            name: 'Function Graphs',
            type: 'graph',
            description: 'Mathematical function plotting and visualization',
            example: 'f(x) = x^2, f(x) = sin(x)'
          },
          {
            id: 'code-visualization',
            name: 'Code Visualization',
            type: 'code',
            description: 'Programming code step-by-step visualization',
            example: 'def fibonacci(n): ...'
          }
        ];

        return new Response(JSON.stringify({
          success: true,
          templates
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'delete_animation': {
        const { videoId } = requestData;
        
        if (!videoId) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Video ID is required' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Delete animation (placeholder)
        console.log(`Animation deleted: ${videoId} by user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify({
          success: true,
          message: 'Animation deleted successfully'
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ 
          success: false, 
          error: 'Invalid action' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    console.error('Error in mcp-manim function:', error);
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});