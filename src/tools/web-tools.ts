import { z } from 'zod';
import { UnifiedTool } from './registry.js';
import { executeGeminiCLI } from '../utils/geminiExecutor.js';
import { ERROR_MESSAGES, STATUS_MESSAGES } from '../constants.js';

// Web Search Tool - Leverages Gemini's google_web_search
const webSearchArgsSchema = z.object({
  query: z.string().min(1).describe("Search query. Gemini will use google_web_search tool to find current information and return a processed summary with citations."),
  model: z.string().optional().describe("Optional model to use (default: gemini-3-flash-preview)"),
});

export const webSearchTool: UnifiedTool = {
  name: "web-search",
  description: "Search the web using Gemini's google_web_search tool. Returns AI-processed summaries with citations, not raw search results. Perfect for: latest documentation, current events, API updates, tutorials, package info.",
  zodSchema: webSearchArgsSchema,
  prompt: {
    description: "Use Gemini to search the web and get AI-summarized results with source citations. Ideal when you need current information beyond your knowledge cutoff.",
  },
  category: 'gemini',
  execute: async (args, onProgress) => {
    const { query, model } = args;

    if (!query || typeof query !== 'string' || !query.trim()) {
      throw new Error(ERROR_MESSAGES.NO_PROMPT_PROVIDED);
    }

    // Craft prompt that encourages Gemini to use web search
    const prompt = `Search the web for: ${query}

Please use the google_web_search tool to find the most current and relevant information. Provide a comprehensive summary with citations.`;

    const result = await executeGeminiCLI(
      prompt,
      model as string | undefined,
      false, // no sandbox for web search
      false, // no changeMode
      onProgress
    );

    return `${STATUS_MESSAGES.GEMINI_RESPONSE}\n\n${result}`;
  }
};

// Web Fetch Tool - Leverages Gemini's web_fetch
const webFetchArgsSchema = z.object({
  urls: z.union([z.string(), z.array(z.string())]).describe("One or more URLs to fetch and analyze (http:// or https://). Can be a single URL string or array of URLs."),
  instruction: z.string().describe("What to do with the fetched content (e.g., 'summarize key points', 'compare these APIs', 'extract code examples')"),
  model: z.string().optional().describe("Optional model to use (default: gemini-3-flash-preview)"),
});

export const webFetchTool: UnifiedTool = {
  name: "web-fetch",
  description: "Fetch and process web content using Gemini's web_fetch tool. Handles 1-20 URLs. Perfect for: fetching latest API docs, comparing documentation, extracting code examples, summarizing articles/blogs.",
  zodSchema: webFetchArgsSchema,
  prompt: {
    description: "Use Gemini to fetch URLs and process their content according to your instructions. Gemini handles the fetching and gives you processed, relevant information.",
  },
  category: 'gemini',
  execute: async (args, onProgress) => {
    const { urls, instruction, model } = args;

    if (!urls) {
      throw new Error("URLs are required");
    }

    if (!instruction || typeof instruction !== 'string' || !instruction.trim()) {
      throw new Error("Instruction is required");
    }

    // Convert to array if single URL
    const urlArray = Array.isArray(urls) ? urls : [urls];

    // Validate URLs
    for (const url of urlArray) {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        throw new Error(`Invalid URL: ${url}. URLs must start with http:// or https://`);
      }
    }

    if (urlArray.length > 20) {
      throw new Error("Maximum 20 URLs allowed per request");
    }

    // Craft prompt that uses web_fetch
    const urlList = urlArray.join(', ');
    const prompt = `Please use the web_fetch tool to fetch and analyze the following URL${urlArray.length > 1 ? 's' : ''}: ${urlList}

Task: ${instruction}

Provide detailed, relevant information based on the fetched content.`;

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
