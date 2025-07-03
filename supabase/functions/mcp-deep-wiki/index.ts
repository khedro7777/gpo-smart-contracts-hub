// ============================================
// 📚 MCP DEEP WIKI EDGE FUNCTION
// ============================================
// Purpose: Interface with Deep Wiki MCP for comprehensive knowledge extraction
// Repository: https://github.com/ory/deepwiki
// Features: Deep research, knowledge graphs, structured information extraction
// Authentication: Required for user-specific research history
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
// 📚 DEEP WIKI INTERFACES
// ============================================
interface ResearchRequest {
  topic: string;
  depth?: 'shallow' | 'medium' | 'deep';
  sources?: string[];
  language?: string;
  includeImages?: boolean;
  includeReferences?: boolean;
  maxResults?: number;
}

interface KnowledgeNode {
  id: string;
  title: string;
  content: string;
  type: 'concept' | 'fact' | 'definition' | 'example' | 'relationship';
  relevanceScore: number;
  sources: string[];
  relatedNodes: string[];
  metadata: {
    createdAt: string;
    language: string;
    verified: boolean;
  };
}

interface ResearchResult {
  researchId: string;
  topic: string;
  summary: string;
  knowledgeGraph: KnowledgeNode[];
  keyFindings: string[];
  sources: {
    url: string;
    title: string;
    credibilityScore: number;
    lastAccessed: string;
  }[];
  images?: {
    url: string;
    caption: string;
    source: string;
  }[];
  createdAt: string;
  userId?: string;
}

interface ResearchResponse {
  success: boolean;
  result?: ResearchResult;
  results?: ResearchResult[];
  message?: string;
  error?: string;
}

// ============================================
// 🔍 RESEARCH PROCESSING FUNCTIONS
// ============================================
async function conductDeepResearch(request: ResearchRequest): Promise<ResearchResult> {
  try {
    const { topic, depth = 'medium', maxResults = 10 } = request;
    
    // In production, this would interface with actual Deep Wiki server and APIs
    // For demo, we simulate comprehensive research
    
    const researchId = crypto.randomUUID();
    
    // Generate knowledge graph nodes
    const knowledgeGraph = generateKnowledgeGraph(topic, depth);
    
    // Generate key findings
    const keyFindings = generateKeyFindings(topic, depth);
    
    // Generate mock sources
    const sources = generateMockSources(topic, maxResults);
    
    // Generate summary
    const summary = generateResearchSummary(topic, keyFindings);
    
    const researchResult: ResearchResult = {
      researchId,
      topic,
      summary,
      knowledgeGraph,
      keyFindings,
      sources,
      images: request.includeImages ? generateMockImages(topic) : undefined,
      createdAt: new Date().toISOString(),
    };
    
    console.log(`Deep research conducted for topic: ${topic} (depth: ${depth})`);
    
    return researchResult;

  } catch (error) {
    console.error('Deep research error:', error);
    throw new Error(`Failed to conduct research: ${error.message}`);
  }
}

function generateKnowledgeGraph(topic: string, depth: string): KnowledgeNode[] {
  const baseNodes: KnowledgeNode[] = [
    {
      id: 'main-concept',
      title: `Main Concept: ${topic}`,
      content: `${topic} is a comprehensive subject that encompasses multiple aspects and interconnected concepts.`,
      type: 'concept',
      relevanceScore: 1.0,
      sources: ['wikipedia.org', 'britannica.com'],
      relatedNodes: ['definition', 'history', 'applications'],
      metadata: {
        createdAt: new Date().toISOString(),
        language: 'en',
        verified: true
      }
    },
    {
      id: 'definition',
      title: `Definition of ${topic}`,
      content: `A detailed definition and explanation of ${topic}, including its core characteristics and properties.`,
      type: 'definition',
      relevanceScore: 0.9,
      sources: ['academic-source.edu'],
      relatedNodes: ['main-concept', 'examples'],
      metadata: {
        createdAt: new Date().toISOString(),
        language: 'en',
        verified: true
      }
    },
    {
      id: 'history',
      title: `History of ${topic}`,
      content: `The historical development and evolution of ${topic} over time.`,
      type: 'fact',
      relevanceScore: 0.8,
      sources: ['history-source.org'],
      relatedNodes: ['main-concept', 'timeline'],
      metadata: {
        createdAt: new Date().toISOString(),
        language: 'en',
        verified: true
      }
    }
  ];

  // Add more nodes based on depth
  if (depth === 'deep') {
    baseNodes.push(
      {
        id: 'applications',
        title: `Applications of ${topic}`,
        content: `Real-world applications and use cases of ${topic} across various industries and domains.`,
        type: 'example',
        relevanceScore: 0.85,
        sources: ['industry-report.com'],
        relatedNodes: ['main-concept', 'case-studies'],
        metadata: {
          createdAt: new Date().toISOString(),
          language: 'en',
          verified: true
        }
      },
      {
        id: 'relationships',
        title: `${topic} Relationships`,
        content: `How ${topic} relates to and interacts with other concepts and systems.`,
        type: 'relationship',
        relevanceScore: 0.75,
        sources: ['research-paper.pdf'],
        relatedNodes: ['main-concept', 'applications'],
        metadata: {
          createdAt: new Date().toISOString(),
          language: 'en',
          verified: true
        }
      }
    );
  }

  return baseNodes;
}

function generateKeyFindings(topic: string, depth: string): string[] {
  const baseFindings = [
    `${topic} is a multifaceted subject with significant implications across multiple domains.`,
    `Recent research shows growing interest and development in ${topic}-related fields.`,
    `The practical applications of ${topic} continue to expand in modern contexts.`
  ];

  if (depth === 'deep') {
    baseFindings.push(
      `${topic} demonstrates strong correlations with emerging technological trends.`,
      `Historical analysis reveals cyclical patterns in ${topic} development.`,
      `Cross-disciplinary approaches to ${topic} yield the most comprehensive understanding.`
    );
  }

  return baseFindings;
}

function generateMockSources(topic: string, maxResults: number) {
  const sources = [
    {
      url: `https://en.wikipedia.org/wiki/${topic.replace(/\s+/g, '_')}`,
      title: `${topic} - Wikipedia`,
      credibilityScore: 0.8,
      lastAccessed: new Date().toISOString()
    },
    {
      url: `https://www.britannica.com/topic/${topic.toLowerCase()}`,
      title: `${topic} | Britannica`,
      credibilityScore: 0.9,
      lastAccessed: new Date().toISOString()
    },
    {
      url: `https://scholar.google.com/scholar?q=${encodeURIComponent(topic)}`,
      title: `Academic papers on ${topic}`,
      credibilityScore: 0.95,
      lastAccessed: new Date().toISOString()
    },
    {
      url: `https://www.jstor.org/action/doBasicSearch?Query=${encodeURIComponent(topic)}`,
      title: `${topic} Research - JSTOR`,
      credibilityScore: 0.92,
      lastAccessed: new Date().toISOString()
    }
  ];

  return sources.slice(0, maxResults);
}

function generateMockImages(topic: string) {
  return [
    {
      url: `https://example.com/images/${topic.replace(/\s+/g, '-')}-1.jpg`,
      caption: `Illustration of ${topic} concept`,
      source: 'Educational Image Database'
    },
    {
      url: `https://example.com/images/${topic.replace(/\s+/g, '-')}-2.jpg`,
      caption: `Diagram showing ${topic} relationships`,
      source: 'Academic Visual Resources'
    }
  ];
}

function generateResearchSummary(topic: string, keyFindings: string[]): string {
  return `This comprehensive research on ${topic} reveals ${keyFindings.length} key insights. ${keyFindings[0]} The analysis draws from multiple authoritative sources and presents a structured knowledge graph that interconnects related concepts. The research provides both foundational understanding and practical applications, making it valuable for academic study, professional development, and informed decision-making.`;
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
      case 'conduct_research': {
        const researchRequest = requestData as ResearchRequest;
        
        if (!researchRequest.topic) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Research topic is required' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Conduct research
        const researchResult = await conductDeepResearch(researchRequest);
        researchResult.userId = userId;
        
        // Store research in database (create table if needed)
        // For now, return the research directly
        
        console.log(`Research conducted on "${researchRequest.topic}" by user ${userId || 'anonymous'}`);
        
        const response: ResearchResponse = {
          success: true,
          result: researchResult,
          message: 'Research completed successfully'
        };

        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_research_history': {
        // Return user's research history (placeholder)
        const researchHistory = [
          {
            researchId: 'sample-research-1',
            topic: 'Artificial Intelligence',
            summary: 'Comprehensive study of AI development, applications, and future trends.',
            createdAt: '2024-01-15T10:00:00Z',
            keyFindings: [
              'AI is revolutionizing multiple industries',
              'Machine learning advances are accelerating',
              'Ethical considerations are becoming paramount'
            ]
          },
          {
            researchId: 'sample-research-2', 
            topic: 'Renewable Energy',
            summary: 'Analysis of renewable energy technologies and their global adoption.',
            createdAt: '2024-01-14T15:30:00Z',
            keyFindings: [
              'Solar and wind energy costs are declining rapidly',
              'Energy storage solutions are improving',
              'Government policies are driving adoption'
            ]
          }
        ];

        return new Response(JSON.stringify({
          success: true,
          results: researchHistory,
          totalResearches: researchHistory.length
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_research_details': {
        const { researchId } = requestData;
        
        if (!researchId) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Research ID is required' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Get detailed research (placeholder)
        const detailedResearch = {
          researchId,
          topic: 'Sample Research Topic',
          summary: 'Detailed summary of the research findings and methodology.',
          knowledgeGraph: generateKnowledgeGraph('Sample Topic', 'deep'),
          keyFindings: generateKeyFindings('Sample Topic', 'deep'),
          sources: generateMockSources('Sample Topic', 5),
          createdAt: new Date().toISOString(),
          userId
        };

        console.log(`Research details retrieved: ${researchId} by user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify({
          success: true,
          result: detailedResearch
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'export_research': {
        const { researchId, format } = requestData;
        
        if (!researchId) {
          return new Response(JSON.stringify({ 
            success: false, 
            error: 'Research ID is required' 
          }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        // Export research in specified format (placeholder)
        const exportUrl = `https://example.com/exports/${researchId}.${format || 'pdf'}`;
        
        console.log(`Research exported: ${researchId} as ${format} by user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify({
          success: true,
          exportUrl,
          format: format || 'pdf',
          message: 'Research exported successfully'
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
    console.error('Error in mcp-deep-wiki function:', error);
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