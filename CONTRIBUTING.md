# Contributing to Gemini as MCP

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/gemini-as-mcp.git
   cd gemini-as-mcp
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Build the project**
   ```bash
   npm run build
   ```

## Development Workflow

### Making Changes

1. **Create a new branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Edit TypeScript files in `src/`
   - Follow existing code style and patterns
   - Add comments for complex logic

3. **Build and test locally**
   ```bash
   npm run build
   npm start  # Test the MCP server
   ```

4. **Commit your changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Convention

Follow [Conventional Commits](https://www.conventionalcommits.org/):
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

### Pull Request Process

1. **Push your branch**
   ```bash
   git push origin feature/your-feature-name
   ```

2. **Open a Pull Request** on GitHub
   - Provide a clear description of changes
   - Reference any related issues
   - Ensure all checks pass

3. **Address review feedback**
   - Make requested changes
   - Push updates to your branch
   - The PR will automatically update

## Code Guidelines

### TypeScript

- Use TypeScript strict mode
- Provide type annotations where types can't be inferred
- Avoid `any` types when possible

### Project Structure

```
src/
├── index.ts              # MCP server entry point
├── constants.ts          # Constants and types
├── tools/
│   ├── registry.ts      # Unified tool registry
│   ├── index.ts         # Tool registration
│   └── *.tool.ts        # Individual tool implementations
└── utils/
    ├── geminiExecutor.ts    # Gemini CLI execution
    ├── commandExecutor.ts   # Shell command execution
    └── logger.ts            # Logging utilities
```

### Adding New Tools

See [`CLAUDE.md`](CLAUDE.md#adding-new-tools) for detailed instructions on adding new MCP tools.

## Testing

Currently, the project uses placeholder tests:
```bash
npm test
```

We welcome contributions to improve test coverage!

## Documentation

- Update `README.md` for user-facing changes
- Update `CLAUDE.md` for developer/architecture changes
- Add examples to `docs/` for new features

## Release Process

**For maintainers only**: See [`RELEASE.md`](RELEASE.md) for the automated release process.

To create a new release:
```bash
npm run release
```

## Questions?

- Open an [issue](https://github.com/baljinnyamday/gemini-as-mcp/issues) for bugs or feature requests
- Check existing issues before creating new ones
- Be respectful and constructive in discussions

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
