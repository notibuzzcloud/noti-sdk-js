# Publishing Guide

This guide explains how to publish `@notibuzz/noti-sdk-js` to npm and GitHub.

## Prerequisites

1. Have an account on [npm](https://www.npmjs.com/)
2. Have an account on [GitHub](https://github.com/)
3. Have access to the `notibuzzcloud/noti-sdk-js` repository

## Preparation

### 1. Verify package.json

Make sure `package.json` has:
- ✅ Unique name on npm
- ✅ Correct version
- ✅ Clear description
- ✅ Relevant keywords
- ✅ Correct repository URL
- ✅ License specified

### 2. Build the project

```bash
npm run clean
npm run build
```

This will generate files in `dist/`.

### 3. Verify included files

The `.npmignore` file controls which files are included in the npm package. By default, only:
- `dist/` (compiled files)
- `README.md`
- `LICENSE`

## Publish to npm

### First publication

1. **Login to npm:**
```bash
npm login
```

2. **Verify you're authenticated:**
```bash
npm whoami
```

3. **Publish:**
```bash
npm publish --access public
```

> Note: `--access public` is required for scoped packages or if you want to ensure it's public.

### Future updates

1. **Update version in package.json:**
```bash
# Patch version (0.1.0 -> 0.1.1)
npm version patch

# Minor version (0.1.0 -> 0.2.0)
npm version minor

# Major version (0.1.0 -> 1.0.1)
npm version major
```

2. **Update CHANGELOG.md** with the changes

3. **Build and publish:**
```bash
npm run build
npm publish
```

> Note: The `prepublishOnly` script will run automatically before publishing, cleaning and building the project.

## Publish to GitHub

### Create repository

1. Go to [GitHub](https://github.com/new)
2. Create a new repository named `noti-sdk-js`
3. Don't initialize with README, .gitignore or LICENSE (we already have them)

### Configure Git

```bash
# If you don't have the repository initialized yet
git init

# Add remote
git remote add origin https://github.com/notibuzzcloud/noti-sdk-js.git

# Add files
git add .

# Initial commit
git commit -m "Initial commit: @notibuzz/noti-sdk-js v1.0.0"

# Push to GitHub
git branch -M main
git push -u origin main
```

### Create release on GitHub

1. Go to your repository on GitHub
2. Click "Releases" → "Create a new release"
3. Tag: `v1.0.0`
4. Title: `v1.0.0 - Initial Release`
5. Description: Copy content from CHANGELOG.md
6. Publish release

## Verification

### Verify on npm

```bash
npm view @notibuzz/noti-sdk-js
```

Or visit: https://www.npmjs.com/package/@notibuzz/noti-sdk-js

### Verify installation

```bash
npm install @notibuzz/noti-sdk-js
```

Then in a test project:

```typescript
import { configureClient, sendMessage } from '@notibuzz/noti-sdk-js'
// Should work without errors
```

## Checklist before publishing

- [ ] `package.json` has correct information
- [ ] Version updated
- [ ] `README.md` is complete and updated
- [ ] `LICENSE` is present
- [ ] `.npmignore` is configured correctly
- [ ] `CHANGELOG.md` is updated
- [ ] Code compiles without errors (`npm run build`)
- [ ] Tests pass (if any)
- [ ] Examples work correctly
- [ ] Documentation is complete

## Useful commands

```bash
# See which files will be included in the package
npm pack --dry-run

# Test the package locally before publishing
npm pack
npm install ./notibuzz-noti-sdk-js-1.0.1.tgz

# Unpublish (only within 72 hours)
npm unpublish @notibuzz/noti-sdk-js@1.0.1
```

## Important notes

- ⚠️ **Don't publish versions with errors**: Once published, you cannot delete a version after 72 hours
- ⚠️ **Use semantic versions**: Follow [Semantic Versioning](https://semver.org/)
- ⚠️ **Update CHANGELOG**: Keep a record of changes
- ⚠️ **Test before publishing**: Always test the package locally
