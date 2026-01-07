import { z } from 'zod';
import { UnifiedTool } from './registry.js';
import { executeGeminiCLI, processChangeModeOutput } from '../utils/geminiExecutor.js';
import { 
  ERROR_MESSAGES, 
  STATUS_MESSAGES
} from '../constants.js';

const askGeminiArgsSchema = z.object({
  prompt: z.string().min(1).describe("Analysis request. Supports: 1) @ syntax for files/dirs (e.g., '@src/' or '@file.js'), 2) Web search ('search for latest React 19 features'), 3) URL fetching ('summarize https://example.com'), 4) Code execution in sandbox mode, 5) General questions. Gemini automatically uses web_search and web_fetch tools when needed."),
  model: z.string().optional().describe("Optional model to use (e.g., 'gemini-2.5-flash'). If not specified, uses the default model (gemini-2.5-pro)."),
  sandbox: z.boolean().default(false).describe("Use sandbox mode (-s flag) to safely test code changes, execute scripts, or run potentially risky operations in an isolated environment"),
  changeMode: z.boolean().default(false).describe("Enable structured change mode - formats prompts to prevent tool errors and returns structured edit suggestions that Claude can apply directly"),
  chunkIndex: z.union([z.number(), z.string()]).optional().describe("Which chunk to return (1-based)"),
  chunkCacheKey: z.string().optional().describe("Optional cache key for continuation"),
});

export const askGeminiTool: UnifiedTool = {
  name: "ask-gemini",
  description: "Ask Gemini with massive 2M+ token context. Automatically uses built-in tools: web search, URL fetching, file analysis via @ syntax. Supports sandbox mode for code execution and changeMode for structured edits.",
  zodSchema: askGeminiArgsSchema,
  prompt: {
    description: "Execute Gemini CLI with your prompt. Gemini automatically uses web_search for current info, web_fetch for URLs, and processes files via @ syntax. Ideal for: large codebase analysis, fetching latest docs/APIs, web research, and code execution.",
  },
  category: 'gemini',
  execute: async (args, onProgress) => {
    const { prompt, model, sandbox, changeMode, chunkIndex, chunkCacheKey } = args; if (!prompt?.trim()) { throw new Error(ERROR_MESSAGES.NO_PROMPT_PROVIDED); }
  
    if (changeMode && chunkIndex && chunkCacheKey) {
      return processChangeModeOutput(
        '', // empty for cache...
        chunkIndex as number,
        chunkCacheKey as string,
        prompt as string
      );
    }
    
    const result = await executeGeminiCLI(
      prompt as string,
      model as string | undefined,
      !!sandbox,
      !!changeMode,
      onProgress
    );
    
    if (changeMode) {
      return processChangeModeOutput(
        result,
        args.chunkIndex as number | undefined,
        undefined,
        prompt as string
      );
    }
    return `${STATUS_MESSAGES.GEMINI_RESPONSE}\n${result}`; // changeMode false
  }
};