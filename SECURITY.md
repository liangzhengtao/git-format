# Security Policy

## Reporting a Vulnerability

If you discover a security vulnerability, please report it responsibly:

1. **Do NOT** open a public GitHub issue
2. Email the maintainer privately or use GitHub's private vulnerability reporting
3. We will respond within 48 hours

## Security Design

- **No network requests**: git-format only reads local git state
- **No external dependencies**: Uses only built-in Node.js modules
- **No data collection**: Nothing leaves your machine
