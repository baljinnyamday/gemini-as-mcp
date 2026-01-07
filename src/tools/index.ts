// Tool Registry Index - Registers all tools
import { toolRegistry } from './registry.js';
import { askGeminiTool } from './ask-gemini.tool.js';
import { pingTool, helpTool } from './simple-tools.js';
import { brainstormTool } from './brainstorm.tool.js';
import { fetchChunkTool } from './fetch-chunk.tool.js';
import { timeoutTestTool } from './timeout-test.tool.js';
import { webSearchTool, webFetchTool } from './web-tools.js';
import { codebaseAnalysisTool, implementationVerificationTool } from './codebase-tools.js';

toolRegistry.push(
  askGeminiTool,
  webSearchTool,
  webFetchTool,
  codebaseAnalysisTool,
  implementationVerificationTool,
  pingTool,
  helpTool,
  brainstormTool,
  fetchChunkTool,
  timeoutTestTool
);

export * from './registry.js';