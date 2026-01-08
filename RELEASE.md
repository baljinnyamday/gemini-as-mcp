# Release Process

This project uses [`np`](https://github.com/sindresorhus/np) to automate releases.

## Quick Release

```bash
npm run release
```

That's it! `np` will:
1. ✅ Run tests
2. ✅ Bump version (interactive prompt)
3. ✅ Build the project
4. ✅ Create git commit + tag
5. ✅ Push to GitHub
6. ✅ Create GitHub release
7. ✅ Publish to npm

## Version Selection

When you run `npm run release`, you'll see an interactive menu:

```
? Select semver increment or specify new version
  ❯ patch (1.0.2 → 1.0.3)
    minor (1.0.2 → 1.1.0)
    major (1.0.2 → 2.0.0)
    prepatch (1.0.2 → 1.0.3-0)
    preminor (1.0.2 → 1.1.0-0)
    premajor (1.0.2 → 2.0.0-0)
    prerelease (1.0.2 → 1.0.3-0)
    Other (specify)
```

Select the appropriate version bump:
- **patch**: Bug fixes (1.0.2 → 1.0.3)
- **minor**: New features (1.0.2 → 1.1.0)
- **major**: Breaking changes (1.0.2 → 2.0.0)

## Prerequisites

Before your first release, ensure:

1. **GitHub Authentication**: You must be logged in to GitHub CLI
   ```bash
   # Check if logged in
   gh auth status

   # If not logged in
   gh auth login
   ```

2. **npm Authentication**: You must be logged in to npm
   ```bash
   # Check if logged in
   npm whoami

   # If not logged in
   npm login
   ```

3. **Clean Working Directory**: Commit all changes before releasing
   ```bash
   git status  # Should show "nothing to commit"
   ```

4. **On main branch**: `np` only releases from `main` by default
   ```bash
   git checkout main
   git pull origin main
   ```

## Dry Run

To preview what will happen without actually releasing:

```bash
npx np --preview
```

## Skip Steps

If you need to skip certain steps:

```bash
# Skip tests (not recommended)
npx np --no-tests

# Skip 2FA (if you don't have it enabled)
npx np --no-2fa

# Skip GitHub release
npx np --no-release-draft
```

## Troubleshooting

### "Git working directory not clean"
Commit or stash your changes before releasing.

### "Not on branch main"
```bash
git checkout main
git pull origin main
```

### "GitHub CLI not authenticated"
```bash
gh auth login
```

### "npm authentication required"
```bash
npm login
```

## Manual Release (Not Recommended)

If you need to do a manual release:

```bash
# 1. Bump version
npm version patch  # or minor, major

# 2. Build
npm run build

# 3. Push tags
git push --follow-tags

# 4. Create GitHub release
gh release create v1.0.3

# 5. Publish to npm
npm publish
```

But seriously, just use `npm run release` 😄
