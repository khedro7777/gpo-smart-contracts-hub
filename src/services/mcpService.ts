
import { MCPMessage, MCPResource, MCPTool, MCPClient, MCPServer } from '@/types/mcp';
import { MCPHandlers } from './mcp/mcpHandlers';
import { EnhancedHandlers } from './mcp/enhancedHandlers';
import { ToolsService } from './mcp/toolsService';

class MCPService {
  private clients: Map<string, MCPClient> = new Map();
  private servers: Map<string, MCPServer> = new Map();
  private messageHandlers: Map<string, (message: MCPMessage) => Promise<any>> = new Map();
  private resources: Map<string, MCPResource> = new Map();
  private tools: Map<string, MCPTool> = new Map();
  
  private handlers: MCPHandlers;
  private enhancedHandlers: EnhancedHandlers;
  private toolsService: ToolsService;

  constructor() {
    this.handlers = new MCPHandlers();
    this.enhancedHandlers = new EnhancedHandlers();
    this.toolsService = new ToolsService();
    this.initializeDefaultHandlers();
  }

  private initializeDefaultHandlers() {
    // Initialize resource handlers
    this.messageHandlers.set('resources/list', this.handlers.handleListResources.bind(this.handlers));
    this.messageHandlers.set('resources/read', this.handlers.handleReadResource.bind(this.handlers));
    
    // Initialize tool handlers
    this.messageHandlers.set('tools/list', this.handlers.handleListTools.bind(this.handlers));
    this.messageHandlers.set('tools/call', this.handleCallTool.bind(this));
    
    // Initialize GPO-specific handlers
    this.messageHandlers.set('gpo/groups/list', this.handlers.handleListGroups.bind(this.handlers));
    this.messageHandlers.set('gpo/groups/create', this.handlers.handleCreateGroup.bind(this.handlers));
    this.messageHandlers.set('gpo/contracts/analyze', this.handlers.handleAnalyzeContract.bind(this.handlers));
    this.messageHandlers.set('gpo/suppliers/recommend', this.handlers.handleRecommendSuppliers.bind(this.handlers));
    
    // Enhanced handlers
    this.messageHandlers.set('gpo/freelancers/match', this.enhancedHandlers.handleMatchFreelancers.bind(this.enhancedHandlers));
    this.messageHandlers.set('gpo/invoices/generate', this.enhancedHandlers.handleGenerateInvoice.bind(this.enhancedHandlers));
    this.messageHandlers.set('gpo/voting/create', this.enhancedHandlers.handleCreateVote.bind(this.enhancedHandlers));
    this.messageHandlers.set('gpo/negotiations/assist', this.enhancedHandlers.handleNegotiationAssist.bind(this.enhancedHandlers));
    this.messageHandlers.set('gpo/arbitration/assess', this.enhancedHandlers.handleArbitrationAssess.bind(this.enhancedHandlers));
    this.messageHandlers.set('gpo/companies/incorporate', this.enhancedHandlers.handleCompanyIncorporation.bind(this.enhancedHandlers));
    this.messageHandlers.set('gpo/documents/verify', this.enhancedHandlers.handleDocumentVerification.bind(this.enhancedHandlers));
  }

  async handleMessage(message: MCPMessage): Promise<MCPMessage> {
    try {
      const handler = this.messageHandlers.get(message.method || '');
      if (!handler) {
        throw new Error(`Unknown method: ${message.method}`);
      }

      const result = await handler(message);
      return {
        id: message.id,
        type: 'response',
        result
      };
    } catch (error) {
      return {
        id: message.id,
        type: 'response',
        error: {
          code: -1,
          message: error instanceof Error ? error.message : 'Unknown error'
        }
      };
    }
  }

  private async handleCallTool(message: MCPMessage): Promise<any> {
    const toolName = message.params?.name;
    const args = message.params?.arguments || {};
    
    switch (toolName) {
      case 'analyze_market':
        return this.toolsService.analyzeMarket(args);
      case 'optimize_procurement':
        return this.toolsService.optimizeProcurement(args);
      case 'predict_demand':
        return this.toolsService.predictDemand(args);
      case 'assess_risks':
        return this.toolsService.assessRisks(args);
      case 'generate_contract_terms':
        return this.toolsService.generateContractTerms(args);
      case 'calculate_pricing':
        return this.toolsService.calculatePricing(args);
      case 'match_suppliers':
        return this.toolsService.matchSuppliers(args);
      case 'forecast_trends':
        return this.toolsService.forecastTrends(args);
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }
  }

  registerTool(tool: MCPTool) {
    this.tools.set(tool.name, tool);
  }

  registerResource(resource: MCPResource) {
    this.resources.set(resource.uri, resource);
  }
}

export const mcpService = new MCPService();
