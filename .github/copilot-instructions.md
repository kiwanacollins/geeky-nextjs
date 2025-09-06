# Geeky NextJS Blog Template - AI Coding Instructions

## Project Architecture

This is a **static blog template** built with Next.js 13.x, using a content-first approach with markdown files and JSON generation for performance.

### Core Data Flow
1. **Content parsing**: Markdown files in `content/` → JSON generation via `lib/jsonGenerator.js` 
2. **Build process**: `npm run dev/build` runs JSON generator BEFORE Next.js builds
3. **Static generation**: Uses `getStaticProps`/`getStaticPaths` for all content pages

### Key Directories
- `config/` - Site configuration (theme, settings, menu) 
- `content/` - Markdown content files (posts, pages)
- `layouts/` - Page layout components with conditional rendering
- `lib/` - Content parsing and utility functions
- `pages/` - Next.js routing (uses `[regular].js` for dynamic content routing)

## Critical Build Dependencies

### Pre-build JSON Generation
**ALWAYS** run `node lib/jsonGenerator.js` before development/build:
```bash
npm run dev    # Runs JSON generator + next dev
npm run build  # Runs JSON generator + next build
```

The JSON generator creates `.json/posts.json` from markdown files, which is consumed by React Context (`context/state.js`).

### Content Architecture
- **Blog posts**: `content/posts/*.md` → routed via `pages/posts/[single].js`
- **Regular pages**: `content/*.md` → routed via `pages/[regular].js` 
- **Page layouts**: Determined by frontmatter `layout` field (about, contact, 404, default)

## Development Patterns

### Content Parsing Pattern
Files are parsed in `lib/contentParser.js` using:
- `getSinglePage(folder)` - Get all markdown files from a folder
- `getRegularPage(slug)` - Get specific page by slug
- `getListPage(filePath)` - Get list/index pages

### Layout Component Pattern
`layouts/Baseof.js` provides the base layout wrapper. Page-specific layouts in `layouts/` conditionally render based on frontmatter:

```javascript
// pages/[regular].js routing logic
{layout === "404" ? (
  <NotFound data={data} />
) : layout === "about" ? (
  <About data={data} />
) : layout === "contact" ? (
  <Contact data={data} />
) : (
  <Default data={data} />
)}
```

### MDX Integration
- Uses `next-mdx-remote` for content rendering
- Custom shortcodes in `layouts/shortcodes/` (Button, Accordion, Video, etc.)
- Configured with rehype-slug and remark-gfm plugins

## Configuration System

### Theme Configuration
- `config/theme.json` - Typography scale, colors, font families
- `tailwind.config.js` - Dynamically generates Tailwind config from theme.json
- CSS custom properties used for dark/light mode theming

### Site Configuration
- `config/config.json` - Site metadata, pagination, widgets, Disqus settings
- `config/menu.json` - Navigation structure
- `config/social.json` - Social media links

## Search Implementation
Client-side search in `pages/search.js`:
- Uses React Context to access pre-generated posts JSON
- Searches title, categories, and content using `slugify` utility
- No external search service required

## Styling Architecture
- **SCSS base**: `styles/` directory with component-based organization
- **Tailwind integration**: Extensive use of Tailwind classes with custom theme
- **Dark mode**: Uses `next-themes` with class-based switching

## Testing & Development

### Local Development
```bash
npm install        # Install dependencies
npm run dev       # Start development (includes JSON generation)
```

### Production Build
```bash
npm run build     # Build for production
npm run export    # Generate static export
```

## Common Modifications

### Adding New Content Types
1. Create markdown files in `content/`
2. Update `lib/jsonGenerator.js` if needed for new content types
3. Add routing in `pages/` if different from existing patterns

### Adding Custom Shortcodes
1. Create component in `layouts/shortcodes/`
2. Export from `layouts/shortcodes/all.js`
3. Component automatically available in MDX content

### Theme Customization
1. Modify `config/theme.json` for design tokens
2. `tailwind.config.js` automatically reflects changes
3. SCSS files in `styles/` for custom styling

## File Naming Conventions
- Markdown files starting with `_` (e.g., `_index.md`) are treated as index/list pages
- Regular content files are filtered to exclude those starting with `_`
- Draft posts are excluded via frontmatter `draft: true`