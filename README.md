
# Gemini as MCP

<div align="center">

[![GitHub Release](https://img.shields.io/github/v/release/baljinnyamday/gemini-as-mcp?logo=github&label=GitHub)](https://github.com/baljinnyamday/gemini-as-mcp/releases)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Open Source](https://img.shields.io/badge/Open%20Source-❤️-red.svg)](https://github.com/baljinnyamday/gemini-as-mcp)

</div>

## TLDR: [![Claude](https://img.shields.io/badge/Claude-D97757?logo=claude&logoColor=fff)](#) + [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-886FBF?logo=googlegemini&logoColor=fff)](#)

**Goal**: Supercharge Claude Code with Gemini's 2M+ token context and built-in tools for:
- 🔍 **Web Search** - Get latest docs, APIs, tutorials (via `google_web_search`)
- 🌐 **URL Fetching** - Process documentation, blogs, articles (via `web_fetch`)
- 📂 **Large Codebase Analysis** - Analyze entire projects that exceed Claude's context
- ✅ **Implementation Verification** - Check if features/patterns exist in your code
- 🛠️ **Code Execution** - Safely run and test code in sandbox mode

## Prerequisites

Before using this tool, ensure you have:

1. **[Node.js](https://nodejs.org/)** (v16.0.0 or higher)
2. **[Google Gemini CLI](https://github.com/google-gemini/gemini-cli)** installed and configured


### One-Line Setup

```bash
claude mcp add gemini-as-mcp -- npx -y gemini-as-mcp
```

### Verify Installation

Type `/mcp` inside Claude Code to verify the gemini-as-mcp MCP is active.

---

### Alternative: Import from Claude Desktop

If you already have it configured in Claude Desktop:

1. Add to your Claude Desktop config:
```json
"gemini-as-mcp": {
  "command": "npx",
  "args": ["-y", "gemini-as-mcp"]
}
```

2. Import to Claude Code:
```bash
claude mcp add-from-claude-desktop
```

## Configuration

Register the MCP server with your MCP client:

### For NPX Usage (Recommended)

Add this configuration to your Claude Desktop config file:

```json
{
  "mcpServers": {
    "gemini-as-mcp": {
      "command": "npx",
      "args": ["-y", "gemini-as-mcp"]
    }
  }
}
```

### For Global Installation

If you installed globally, use this configuration instead:

```json
{
  "mcpServers": {
    "gemini-as-mcp": {
      "command": "gemini-as-mcp"
    }
  }
}
```

**Configuration File Locations:**

- **Claude Desktop**:
  - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
  - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
  - **Linux**: `~/.config/claude/claude_desktop_config.json`

After updating the configuration, restart your terminal session.

## 🤖 Available Models

This MCP server supports both Gemini 3 (preview) and Gemini 2.5 (stable) models:

### Gemini 3 (Preview - Recommended)
- **`gemini-3-flash-preview`** (default) - Pro-level intelligence at Flash speed and pricing. Best balance for most use cases.
- **`gemini-3-pro-preview`** - Most advanced reasoning model for complex problems requiring deep analysis.

### Gemini 2.5 (Stable)
- **`gemini-2.5-pro`** - Stable production model with strong reasoning capabilities.
- **`gemini-2.5-flash`** - Faster, more cost-effective model for simpler tasks.

All tools accept an optional `model` parameter to override the default (`gemini-3-flash-preview`).

## 🚀 Available Tools

This MCP server provides specialized tools that leverage Gemini's capabilities. Claude Code can use these tools naturally through conversation.

### 1. 🔍 `web-search` - Search the Web via Gemini

Search the web and get AI-processed summaries with citations. Perfect for getting current information beyond Claude's knowledge cutoff.

**Use Cases:**
- Latest package versions and breaking changes
- Current API documentation
- Recent tutorials and best practices
- Technology news and updates

**Example Prompts for Claude:**
```
"Search the web for React 19 breaking changes"
"Find the latest Next.js App Router documentation"
"What are the new features in TypeScript 5.5?"
```

**Parameters:**
- `query` (required): Your search query
- `model` (optional): Model to use (default: `gemini-3-flash-preview`)

---

### 2. 🌐 `web-fetch` - Fetch and Process URLs

Fetch content from URLs and have Gemini process it according to your instructions. Handles 1-20 URLs per request.

**Use Cases:**
- Fetching and summarizing documentation
- Comparing multiple API references
- Extracting code examples from blogs
- Analyzing articles and tutorials

**Example Prompts for Claude:**
```
"Fetch https://nextjs.org/docs/app and explain the new routing system"
"Compare the APIs at [url1] and [url2]"
"Extract all code examples from https://example.com/tutorial"
```

**Parameters:**
- `urls` (required): Single URL or array of URLs
- `instruction` (required): What to do with the content
- `model` (optional): Model to use (default: `gemini-3-flash-preview`)

---

### 3. 📂 `analyze-codebase` - Large Codebase Analysis

Analyze entire codebases using Gemini's 2M+ token context window. Perfect for projects that exceed Claude's context limits.

**Use Cases:**
- Understanding project architecture
- Finding patterns across codebase
- Analyzing all API endpoints
- Reviewing entire feature implementations

**Example Prompts for Claude:**
```
"Analyze @src/ and explain the authentication flow"
"Review @./ and summarize the project structure"
"Find all API endpoints in @backend/ and @routes/"
```

**Parameters:**
- `paths` (required): File/directory paths with `@` syntax
- `question` (required): What you want to know
- `model` (optional): Model to use (default: `gemini-3-flash-preview`)

**@ Syntax Examples:**
- `@src/` - Entire src directory
- `@package.json` - Single file
- `@./` - Current directory and subdirectories
- `@src/ @tests/` - Multiple directories

---

### 4. ✅ `verify-implementation` - Check Feature Implementation

Verify if specific features, patterns, or security measures are implemented in your codebase. Returns detailed findings with file paths.

**Use Cases:**
- Check if authentication is implemented
- Verify error handling exists
- Find security measures
- Locate specific patterns (e.g., WebSocket usage)

**Example Prompts for Claude:**
```
"Check if JWT authentication is implemented in @src/"
"Verify rate limiting exists in @api/ @middleware/"
"Is Redis caching implemented? Check @services/"
"Find all WebSocket connections in @src/"
```

**Parameters:**
- `paths` (required): Directories to search with `@` syntax
- `feature` (required): Feature/pattern to check for
- `details` (optional): Specific aspects to verify
- `model` (optional): Model to use (default: `gemini-3-flash-preview`)

---

### 5. 🛠️ `ask-gemini` - General Purpose Gemini Query

The most flexible tool - automatically uses Gemini's built-in tools (`web_search`, `web_fetch`, file analysis) as needed.

**Capabilities:**
- File/directory analysis via `@` syntax
- Automatic web search for current info
- Automatic URL fetching
- Code execution in sandbox mode
- Structured code edits (changeMode)

**Example Prompts for Claude:**
```
"Ask Gemini to analyze @src/auth.js and suggest improvements"
"Use Gemini to search for the latest React hooks best practices"
"Have Gemini explain this codebase @./"
```

**Parameters:**
- `prompt` (required): Your request (supports `@syntax`, URLs, search queries)
- `model` (optional): Model to use (default: `gemini-3-flash-preview`)
- `sandbox` (optional): Run in sandbox mode (default: false)
- `changeMode` (optional): Return structured edits (default: false)

---

## ⚙️ How It Works

**Auto-Approval Mode**: This MCP server runs Gemini CLI with the `--yolo` flag, which means:
- ✅ **No confirmation dialogs** - All tool calls are automatically approved
- ✅ **Faster execution** - No waiting for user input during operations
- ✅ **Streamlined workflow** - Gemini can use its built-in tools (`google_web_search`, `web_fetch`, file operations) without interruption

This allows Gemini to seamlessly leverage its powerful built-in capabilities while working through Claude Code.

---

## 💡 Usage Tips

### When to Use Each Tool

**Use `web-search` when:**
- You need current information (latest docs, packages, APIs)
- You want AI-processed summaries with citations
- Claude's knowledge cutoff is limiting

**Use `web-fetch` when:**
- You have specific URLs to analyze
- You need to compare documentation
- You want to extract information from web pages

**Use `analyze-codebase` when:**
- Your codebase exceeds Claude's context
- You need to understand entire project structure
- You're looking for patterns across many files

**Use `verify-implementation` when:**
- You need to check if features exist
- You're auditing security measures
- You want to find specific patterns

**Use `ask-gemini` when:**
- You want Gemini to decide which tools to use
- You have a complex multi-part request
- You need flexibility

---

## 📝 Example Workflows

### Workflow 1: Learning a New Library
```
1. Claude: "Search the web for Drizzle ORM latest version"
2. Claude: "Fetch https://orm.drizzle.team/docs and explain core concepts"
3. Claude: "Analyze @src/db/ and suggest how to integrate Drizzle"
```

### Workflow 2: Codebase Audit
```
1. Claude: "Verify if authentication is implemented in @src/"
2. Claude: "Check if error handling exists in @api/"
3. Claude: "Analyze @src/ for security vulnerabilities"
```

### Workflow 3: Feature Implementation
```
1. Claude: "Search the web for Next.js 14 server actions best practices"
2. Claude: "Verify if server actions are used in @app/"
3. Claude: "Analyze @app/ and suggest where to add server actions"
```

## Attribution

This project is a fork of [gemini-mcp-tool](https://github.com/jamubc/gemini-mcp-tool) by jamubc. The original project provided the foundation for integrating Google's Gemini CLI with the Model Context Protocol. This fork maintains the core functionality while diverging in direction and implementation to explore new capabilities and use cases.

This is a simple Model Context Protocol (MCP) server that allows AI assistants to interact with the [Gemini CLI](https://github.com/google-gemini/gemini-cli). It enables the AI to leverage the power of Gemini's massive token window for large analysis, especially with large files and codebases using the `@` syntax for direction.

- Ask gemini natural questions, through claude or Brainstorm new ideas in a party of 3!

## Contributing

Contributions are welcome! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details on how to submit pull requests, report issues, and contribute to the project.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

**Disclaimer:** This is an unofficial, third-party tool and is not affiliated with, endorsed, or sponsored by Google.
