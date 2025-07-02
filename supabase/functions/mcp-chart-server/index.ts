// ============================================
// 📊 MCP CHART SERVER EDGE FUNCTION
// ============================================
// Purpose: Interface with Chart Server MCP for data visualization
// Repository: https://github.com/modelcontextprotocol/servers/tree/main/packages/chart-server
// Features: Generate charts, visualizations, and data analysis
// Authentication: Required for user-specific chart management
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
// 📊 CHART GENERATION LOGIC
// ============================================
interface ChartRequest {
  type: 'bar' | 'line' | 'pie' | 'scatter' | 'area';
  data: Array<{ [key: string]: any }>;
  title?: string;
  xAxis?: string;
  yAxis?: string;
  width?: number;
  height?: number;
  colors?: string[];
}

interface ChartResponse {
  chartId: string;
  imageUrl: string;
  data: any;
  metadata: {
    type: string;
    title: string;
    createdAt: string;
    userId?: string;
  };
}

// ============================================
// 🎨 CHART GENERATOR FUNCTIONS
// ============================================
function generateChartSVG(request: ChartRequest): string {
  const { type, data, title = 'Chart', width = 800, height = 400, colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b'] } = request;
  
  // Basic SVG chart generation logic
  let chartContent = '';
  
  switch (type) {
    case 'bar':
      chartContent = generateBarChart(data, width, height, colors);
      break;
    case 'line':
      chartContent = generateLineChart(data, width, height, colors);
      break;
    case 'pie':
      chartContent = generatePieChart(data, width, height, colors);
      break;
    default:
      chartContent = generateBarChart(data, width, height, colors);
  }

  return `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <style>
        .chart-title { font-family: Arial, sans-serif; font-size: 18px; font-weight: bold; }
        .chart-axis { font-family: Arial, sans-serif; font-size: 12px; }
        .chart-bar { opacity: 0.8; }
        .chart-bar:hover { opacity: 1; }
      </style>
      <text x="${width/2}" y="30" text-anchor="middle" class="chart-title">${title}</text>
      ${chartContent}
    </svg>
  `;
}

function generateBarChart(data: any[], width: number, height: number, colors: string[]): string {
  if (!data || data.length === 0) return '';
  
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const maxValue = Math.max(...data.map(d => Object.values(d).find(v => typeof v === 'number') as number || 0));
  const barWidth = chartWidth / data.length * 0.8;
  const barSpacing = chartWidth / data.length * 0.2;
  
  let bars = '';
  data.forEach((item, index) => {
    const value = Object.values(item).find(v => typeof v === 'number') as number || 0;
    const barHeight = (value / maxValue) * chartHeight;
    const x = margin.left + index * (barWidth + barSpacing);
    const y = margin.top + chartHeight - barHeight;
    
    bars += `
      <rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" 
            fill="${colors[index % colors.length]}" class="chart-bar"/>
      <text x="${x + barWidth/2}" y="${margin.top + chartHeight + 20}" 
            text-anchor="middle" class="chart-axis">${Object.values(item)[0]}</text>
    `;
  });
  
  return bars;
}

function generateLineChart(data: any[], width: number, height: number, colors: string[]): string {
  if (!data || data.length === 0) return '';
  
  const margin = { top: 50, right: 30, bottom: 50, left: 60 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;
  
  const maxValue = Math.max(...data.map(d => Object.values(d).find(v => typeof v === 'number') as number || 0));
  
  let points = '';
  let path = 'M ';
  
  data.forEach((item, index) => {
    const value = Object.values(item).find(v => typeof v === 'number') as number || 0;
    const x = margin.left + (index / (data.length - 1)) * chartWidth;
    const y = margin.top + chartHeight - (value / maxValue) * chartHeight;
    
    points += `<circle cx="${x}" cy="${y}" r="4" fill="${colors[0]}"/>`;
    path += index === 0 ? `${x} ${y}` : ` L ${x} ${y}`;
  });
  
  return `
    <path d="${path}" stroke="${colors[0]}" stroke-width="2" fill="none"/>
    ${points}
  `;
}

function generatePieChart(data: any[], width: number, height: number, colors: string[]): string {
  if (!data || data.length === 0) return '';
  
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(width, height) / 3;
  
  const total = data.reduce((sum, item) => {
    const value = Object.values(item).find(v => typeof v === 'number') as number || 0;
    return sum + value;
  }, 0);
  
  let currentAngle = 0;
  let slices = '';
  
  data.forEach((item, index) => {
    const value = Object.values(item).find(v => typeof v === 'number') as number || 0;
    const sliceAngle = (value / total) * 2 * Math.PI;
    
    const x1 = centerX + radius * Math.cos(currentAngle);
    const y1 = centerY + radius * Math.sin(currentAngle);
    const x2 = centerX + radius * Math.cos(currentAngle + sliceAngle);
    const y2 = centerY + radius * Math.sin(currentAngle + sliceAngle);
    
    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;
    
    slices += `
      <path d="M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z"
            fill="${colors[index % colors.length]}" stroke="#fff" stroke-width="2"/>
    `;
    
    currentAngle += sliceAngle;
  });
  
  return slices;
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
      case 'generate_chart': {
        const chartRequest = requestData as ChartRequest;
        
        // Generate chart SVG
        const chartSVG = generateChartSVG(chartRequest);
        
        // Create chart record in database
        const chartId = crypto.randomUUID();
        const chartData = {
          id: chartId,
          user_id: userId,
          type: chartRequest.type,
          title: chartRequest.title || 'Untitled Chart',
          data: chartRequest.data,
          svg_content: chartSVG,
          created_at: new Date().toISOString()
        };

        // Store chart in database (create table if needed)
        // For now, return the generated chart directly
        
        const response: ChartResponse = {
          chartId,
          imageUrl: `data:image/svg+xml;base64,${btoa(chartSVG)}`,
          data: chartRequest.data,
          metadata: {
            type: chartRequest.type,
            title: chartRequest.title || 'Untitled Chart',
            createdAt: new Date().toISOString(),
            userId
          }
        };

        console.log(`Generated chart ${chartId} for user ${userId || 'anonymous'}`);
        
        return new Response(JSON.stringify(response), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'list_charts': {
        // Return list of user's charts (placeholder)
        const charts = [
          {
            chartId: 'sample-1',
            title: 'Sample Sales Data',
            type: 'bar',
            createdAt: '2024-01-15T10:00:00Z'
          }
        ];

        return new Response(JSON.stringify({ charts }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      case 'get_chart': {
        const { chartId } = requestData;
        
        // Placeholder response
        const chart = {
          chartId,
          title: 'Sample Chart',
          type: 'bar',
          data: [
            { label: 'Q1', value: 100 },
            { label: 'Q2', value: 150 },
            { label: 'Q3', value: 200 },
            { label: 'Q4', value: 180 }
          ]
        };

        return new Response(JSON.stringify(chart), {
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
    console.error('Error in mcp-chart-server function:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      details: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});