# AI Docs Assistant

> **Auto-generate beautiful, always-up-to-date documentation from your codebase**

[![CI/CD Pipeline](https://github.com/your-org/docs-assistant/workflows/CI%2FCD%20Pipeline/badge.svg)](https://github.com/your-org/docs-assistant/actions)
[![Coverage Status](https://coveralls.io/repos/github/your-org/docs-assistant/badge.svg?branch=main)](https://coveralls.io/github/your-org/docs-assistant?branch=main)
[![npm version](https://badge.fury.io/js/docs-assistant.svg)](https://badge.fury.io/js/docs-assistant)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

AI Docs Assistant automatically analyzes your code across multiple languages and generates comprehensive documentation that stays synchronized with your codebase. No more stale docs, no more manual maintenance.

## ✨ Features

- **🔄 Auto-Sync**: Documentation automatically updates when your code changes
- **🌍 Multi-Language**: Supports JavaScript, Python, Java, Go, TypeScript, and more
- **📊 Smart Analysis**: Extracts function signatures, parameters, return types, and complexity metrics
- **🗺️ Dependency Mapping**: Visualizes imports, exports, and file relationships
- **📝 Multiple Formats**: Export to Markdown, HTML, JSON
- **🚀 CI/CD Ready**: GitHub Action integration for seamless workflow automation
- **🔒 Privacy First**: Works locally without requiring API keys
- **⚡ Lightweight**: Minimal configuration, maximum results
- **🧪 Well Tested**: 95%+ test coverage with unit, integration, and e2e tests

## 🚀 Quick Start

### Installation

```bash
npm install -g docgen
# or use npx for one-time usage
npx docgen --help
```

### Basic Usage

```bash
# Generate docs for current directory
docgen src/

# With custom output directory
docgen src/ --output ./documentation

# Export to HTML
docgen src/ --format html

# Generate for specific file types
docgen src/ --include "**/*.{js,ts,py}"
```

### Programmatic Usage

```javascript
const { Parser, Analyzer, DocumentationGenerator } = require('docgen');

async function generateDocs() {
  const parser = new Parser();
  const analyzer = new Analyzer();
  const generator = new DocumentationGenerator({ format: 'markdown' });
  
  const files = await parser.parseDirectory('./src');
  const analysis = analyzer.analyze(files);
  const docs = await generator.generate(analysis, files);
  
  console.log(docs.content);
}
```

## 🛠️ Configuration

Create `ai-docs.config.js` in your project root:

```javascript
module.exports = {
  include: ['src/**/*.js', 'lib/**/*.py'],
  exclude: ['node_modules', '*.test.js', '**/__tests__/**'],
  output: {
    mode: 'per-file', // or 'single-file'
    path: './docs'
  },
  format: 'markdown', // 'html', 'json'
  features: {
    complexity: true,
    dependencies: true,
    todos: true,
    metrics: true
  }
}
```

## 📊 Example Output

### Function Analysis
```markdown
## `calculateTotal(items, tax)`

**Purpose**: Calculates the total price including tax for a list of items

**Parameters**:
- `items` (Array<Object>): List of items with price property
- `tax` (number): Tax rate (0-1)

**Returns**: `number` - Total price including tax

**Complexity**: O(n) - Linear time based on items array length

**Dependencies**: `formatCurrency()`, `validateItems()`

**Location**: Line 45 in `src/utils/pricing.js`
```

## 🧪 Testing

This project maintains high code quality with comprehensive testing:

### Test Structure
- `tests/unit/` – Unit tests for individual components
- `tests/integration/` – Integration tests for CLI and workflows
- `tests/e2e/` – End-to-end tests for complete scenarios
- `tests/fixtures/` – Sample code files for testing

### Running Tests

```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test suites
npm run test:unit
npm run test:integration
npm run test:e2e

# Watch mode for development
npm run test:watch

# Debug tests
npm run test:debug
```

### Test Coverage

We maintain >75% test coverage across all modules:
- **Statements**: 85%+
- **Branches**: 80%+
- **Functions**: 90%+
- **Lines**: 85%+

## 🏗️ Architecture

The tool follows a modular architecture:

```
src/
├── parser.js          # File parsing and language detection
├── analyzer.js        # Code analysis and metrics
├── generator.js       # Documentation generation
├── core/
│   └── languageAgnosticEngine.js  # Multi-language parsing
├── analysis/
│   └── complexityAnalyzer.js      # Complexity calculations
└── integration/
    └── commentTodoIntegration.js  # TODO/FIXME extraction
```

## 🚀 CI/CD Integration

### GitHub Actions

Add to `.github/workflows/docs.yml`:

```yaml
name: Generate Documentation
on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  docs:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run cli -- src/ --output ./docs --format markdown
      - uses: actions/upload-artifact@v3
        with:
          name: documentation
          path: docs/
```

## 🔧 Development

### Prerequisites
- Node.js 16+
- npm 8+

### Setup

```bash
# Clone the repository
git clone https://github.com/your-org/docs-assistant.git
cd docs-assistant

# Install dependencies
npm install

# Run tests
npm test

# Start development
npm run test:watch
```

### Code Quality

We enforce code quality through:
- **ESLint**: Code linting and style enforcement
- **Jest**: Comprehensive testing framework
- **Coverage**: Minimum 75% test coverage required
- **CI/CD**: Automated testing on all PRs

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](./CONTRIBUTING.md) for details.

### Quick Contribution Steps
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and add tests
4. Ensure tests pass: `npm test`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

MIT License - see [LICENSE](./LICENSE) for details.

## 🆘 Support

- **Documentation**: [Full documentation](./docs/)
- **Issues**: [GitHub Issues](https://github.com/your-org/docs-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/docs-assistant/discussions)
- **Email**: support@docs-assistant.dev

---

**Made with ❤️ for developers who value good documentation**