import { z } from 'zod';
import { UnifiedTool } from './registry.js';
import { executeGeminiCLI } from '../utils/geminiExecutor.js';
import { ERROR_MESSAGES, STATUS_MESSAGES } from '../constants.js';

// Codebase Analysis Tool - Optimized for large codebase analysis
const codebaseAnalysisArgsSchema = z.object({
  paths: z.union([z.string(), z.array(z.string())]).describe("File or directory paths to analyze. Use @ syntax: '@src/', '@package.json', '@./'. Can be single path or array of paths."),
  question: z.string().describe("What you want to know about the codebase (e.g., 'explain the architecture', 'find all API endpoints', 'summarize the auth flow')"),
  model: z.string().optional().describe("Optional model to use (default: gemini-3-flash-preview)"),
});

export const codebaseAnalysisTool: UnifiedTool = {
  name: "analyze-codebase",
  description: "Analyze large codebases using Gemini's 2M+ token context window. Handles entire directories, multiple files, or whole projects. Perfect for: understanding architecture, finding patterns, analyzing dependencies, code review.",
  zodSchema: codebaseAnalysisArgsSchema,
  prompt: {
    description: "Use Gemini to analyze entire codebases or large files that would exceed Claude's context. Gemini reads all files and provides comprehensive analysis.",
  },
  category: 'gemini',
  execute: async (args, onProgress) => {
    const { paths, question, model } = args;

    if (!paths) {
      throw new Error("Paths are required");
    }

    if (!question || typeof question !== 'string' || !question.trim()) {
      throw new Error(ERROR_MESSAGES.NO_PROMPT_PROVIDED);
    }

    // Convert to array if single path
    const pathArray = Array.isArray(paths) ? paths : [paths];

    // Ensure paths use @ syntax
    const formattedPaths = pathArray.map(p => {
      const trimmed = p.trim();
      return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
    });

    // Build comprehensive prompt
    const pathsList = formattedPaths.join(' ');
    const prompt = `${pathsList}

Analyze the above codebase and answer the following:

${question}

Please provide a comprehensive analysis with specific file references, code examples where relevant, and clear explanations.`;

    const result = await executeGeminiCLI(
      prompt,
      model as string | undefined,
      false, // no sandbox
      false, // no changeMode
      onProgress
    );

    return `${STATUS_MESSAGES.GEMINI_RESPONSE}\n\n${result}`;
  }
};

// Implementation Verification Tool
const implementationVerificationArgsSchema = z.object({
  paths: z.union([z.string(), z.array(z.string())]).describe("Directories/files to search in. Use @ syntax: '@src/', '@lib/', '@./'. Can be single path or array."),
  feature: z.string().describe("Feature or pattern to check for (e.g., 'JWT authentication', 'dark mode', 'rate limiting', 'WebSocket connections', 'Redis caching')"),
  details: z.string().optional().describe("Optional: Specific aspects to verify (e.g., 'Show me the middleware functions', 'List all endpoints', 'Check error handling')"),
  model: z.string().optional().describe("Optional model to use (default: gemini-3-flash-preview)"),
});

export const implementationVerificationTool: UnifiedTool = {
  name: "verify-implementation",
  description: "Verify if features, patterns, or security measures are implemented in a codebase. Uses Gemini's large context to search entire project. Returns specific files, functions, and implementation details.",
  zodSchema: implementationVerificationArgsSchema,
  prompt: {
    description: "Check if specific features, coding patterns, or security measures exist in your codebase. Gemini searches through all files and provides detailed findings with file paths.",
  },
  category: 'gemini',
  execute: async (args, onProgress) => {
    const { paths, feature, details, model } = args;

    if (!paths) {
      throw new Error("Paths are required");
    }

    if (!feature || typeof feature !== 'string' || !feature.trim()) {
      throw new Error("Feature to verify is required");
    }

    // Convert to array if single path
    const pathArray = Array.isArray(paths) ? paths : [paths];

    // Ensure paths use @ syntax
    const formattedPaths = pathArray.map(p => {
      const trimmed = p.trim();
      return trimmed.startsWith('@') ? trimmed : `@${trimmed}`;
    });

    // Build verification prompt
    const pathsList = formattedPaths.join(' ');
    const detailsSection = details ? `\n\nSpecific aspects to check: ${details}` : '';

    const prompt = `${pathsList}

TASK: Verify if the following feature/pattern is implemented in the codebase:
"${feature}"${detailsSection}

Please provide:
1. YES/NO answer with confidence level
2. If YES:
   - List all relevant files with exact paths
   - Show specific functions, classes, or components involved
   - Provide code snippets demonstrating the implementation
   - Explain how it's implemented
3. If NO or PARTIAL:
   - Explain what's missing
   - Suggest what would be needed for full implementation

Be specific and thorough. Include file paths and line numbers where possible.`;

    const result = await executeGeminiCLI(
      prompt,
      model as string | undefined,
      false, // no sandbox
      false, // no changeMode
      onProgress
    );

    return `${STATUS_MESSAGES.GEMINI_RESPONSE}\n\n${result}`;
  }
};
