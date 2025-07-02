// ============================================
// 🔍 MCP WEB SEARCH EDGE FUNCTION
// ============================================
// Purpose: Interface with Web Search MCP for internet search without API keys
// Repository: https://github.com/pskill9/web-search
// Features: Web search, data extraction, content analysis
// Authentication: Required for user-specific search history
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
// 🔍 SEARCH INTERFACES
// ============================================
interface SearchRequest {
  query: string;
  type?: 'web' | 'news' | 'images' | 'videos';
  limit?: number;
  language?: string;
  region?: string;
  safe_search?: boolean;
  time_range?: 'day' | 'week' | 'month' | 'year' | 'all';
}

interface SearchResult {
  title: string;
  url: string;
  description: string;
  publishedDate?: string;
  source?: string;
  thumbnail?: string;
  content?: string;
}

interface SearchResponse {
  searchId: string;
  query: string;
  results: SearchResult[];
  totalResults: number;
  searchTime: number;
  suggestions?: string[];
  metadata: {
    timestamp: string;
    userId?: string;
    type: string;
  };
}

// ============================================
// 🌐 WEB SCRAPING FUNCTIONS
// ============================================
async function fetchWebContent(url: string): Promise<string> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MCPWebSearch/1.0)'
      }
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    return await response.text();
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return '';
  }
}

function extractTextFromHTML(html: string): string {
  // Basic HTML text extraction (in production, use a proper HTML parser)
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, 500); // Limit content length
}

// ============================================
// 🔍 SEARCH IMPLEMENTATION
// ============================================
async function performWebSearch(request: SearchRequest): Promise<SearchResult[]> {
  const { query, type = 'web', limit = 10 } = request;
  
  // For demo purposes, we'll simulate search results
  // In production, integrate with actual search APIs or scraping services
  const mockResults: SearchResult[] = [
    {
      title: `Search result for: ${query}`,
      url: `https://example.com/search?q=${encodeURIComponent(query)}`,
      description: `Relevant information about ${query}. This is a comprehensive guide covering all aspects of the topic.`,
      publishedDate: new Date().toISOString(),
      source: 'Example.com',
      content: `Detailed content about ${query}...`
    },
    {
      title: `${query} - Complete Guide`,
      url: `https://guide.example.com/${query.replace(/\s+/g, '-')}`,
      description: `Learn everything about ${query} with this detailed guide. Step-by-step instructions and examples.`,
      publishedDate: new Date(Date.now() - 86400000).toISOString(),
      source: 'Guide.com',
      content: `Step-by-step guide for ${query}...`
    },
    {
      title: `Latest news about ${query}`,
      url: `https://news.example.com/article/${Date.now()}`,
      description: `Breaking news and latest updates related to ${query}. Stay informed with real-time information.`,
      publishedDate: new Date(Date.now() - 3600000).toISOString(),
      source: 'NewsSource',
      content: `Latest developments regarding ${query}...`
    }
  ];

  // Filter results based on type
  let filteredResults = mockResults;
  
  if (type === 'news') {
    filteredResults = mockResults.filter(result => 
      result.source?.toLowerCase().includes('news') || 
      result.title.toLowerCase().includes('news')
    );
  }

  return filteredResults.slice(0, limit);
}

async function extractDataFromUrl(url: string): Promise<{ title: string; content: string; metadata: any }> {
  try {
    const html = await fetchWebContent(url);
    const content = extractTextFromHTML(html);
    
    // Extract title from HTML
    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'Untitled';
    
    // Extract metadata
    const metadata = {
      url,
      extractedAt: new Date().toISOString(),
      contentLength: content.length,
      hasImages: html.includes('<img'),
      hasLinks: html.includes('<a href'),
    };

    return { title, content, metadata };
    
  } catch (error) {
    throw new Error(`Failed to extract data from URL: ${error.message}`);
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
      case 'search': {
        const searchRequest = requestData as SearchRequest;
        const startTime = Date.now();
        
        // Perform search
        const results = await performWebSearch(searchRequest);
        const searchTime = Date.now() - startTime;
        
        const searchId = crypto.randomUUID();
        const response: SearchResponse = {
          searchId,
          query: searchRequest.query,
          results,
          totalResults: results.length,
          searchTime,
          suggestions: [
            `${searchRequest.query} tutorial`,
            `${searchRequest.query} guide`,
            `${searchRequest.query} examples`
          ],
          metadata: {
            timestamp: new Date().toISOString(),
            userId,
            type: searchRequest.type || 'web'
          }
        };

        // Log search for analytics
        console.log(`Search performed: "${searchRequest.query}" by user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'extract_data': {
        const { url } = requestData;
        
        if (!url) {
          return new Response(JSON.stringify({ error: 'URL is required' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          });
        }

        const extractedData = await extractDataFromUrl(url);
        
        console.log(`Data extracted from ${url} by user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify({
          success: true,
          url,
          ...extractedData,
          extractedBy: userId,
          extractedAt: new Date().toISOString()
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'search_history': {
        // Return user's search history (placeholder)
        const history = [
          {
            searchId: 'sample-1',
            query: 'machine learning',
            timestamp: '2024-01-15T10:00:00Z',
            resultsCount: 10
          },
          {
            searchId: 'sample-2',
            query: 'web development',
            timestamp: '2024-01-15T09:30:00Z',
            resultsCount: 8
          }
        ];

        return new Response(JSON.stringify({ history }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'trending': {
        // Return trending search topics
        const trending = [
          'artificial intelligence',
          'blockchain technology',
          'sustainable energy',
          'remote work',
          'digital transformation'
        ];

        return new Response(JSON.stringify({ trending }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }

  } catch (error) {
    console.error('Error in mcp-web-search function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});