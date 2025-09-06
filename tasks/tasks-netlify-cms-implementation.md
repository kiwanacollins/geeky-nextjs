# Tasks: Netlify CMS Implementation for Geeky Next.js Blog
## Inspired by Exclusive.co.ug Features

## Relevant Files

- `public/admin/index.html` - Netlify CMS admin interface entry point
- `public/admin/config.yml` - Netlify CMS configuration file defining content structure and collections
- `public/admin/preview-templates.js` - Preview templates for live editing within CMS
- `public/admin/preview-styles.css` - Custom styles for CMS preview matching site design
- `netlify.toml` - Updated Netlify configuration for CMS integration and build settings
- `package.json` - Updated dependencies for Netlify CMS
- `next.config.js` - Updated Next.js configuration for CMS static file handling
- `content/posts/*.md` - Blog post markdown files (managed by CMS)
- `content/breaking-news/*.md` - Breaking news posts (new feature from exclusive.co.ug)
- `content/entertainment/*.md` - Entertainment category posts (new feature)
- `content/about.md` - About page (managed by CMS)
- `content/contact.md` - Contact page (managed by CMS)
- `content/elements.md` - Elements page (managed by CMS)
- `content/_index.md` - Homepage content with hero section (managed by CMS)
- `config/config.json` - Site configuration with weekly sections (managed by CMS)
- `config/menu.json` - Navigation menu configuration (managed by CMS)
- `config/social.json` - Social media links with newsletter subscription (managed by CMS)
- `config/theme.json` - Theme colors and fonts (managed by CMS)
- `config/categories.json` - Category configuration for news sections (new)
- `layouts/partials/Header.js` - Updated header with breaking news banner and enhanced navigation
- `layouts/partials/BreakingNews.js` - Breaking news ticker component (new)
- `layouts/partials/CategoryNav.js` - Category navigation component (new)
- `layouts/WeeklySection.js` - Weekly posts section component (new feature)
- `layouts/BreakingNews.js` - Breaking news banner component (new feature)
- `layouts/CategoryFilter.js` - Category filtering component (new feature)
- `layouts/components/PostCard.js` - Enhanced post card with larger images and badges (updated)
- `layouts/components/AuthorByline.js` - Author byline component with social links (new)
- `layouts/components/LoadMore.js` - Load more pagination component (new)
- `layouts/components/NewsletterBanner.js` - Enhanced newsletter subscription (updated)
- `styles/exclusive-theme.scss` - New stylesheet for Exclusive.co.ug inspired design
- `styles/breaking-news.scss` - Styles for breaking news components
- `styles/mobile-navigation.scss` - Mobile-first navigation styles

### Notes

- Unit tests should typically be placed alongside the code files they are testing (e.g., `MyComponent.tsx` and `MyComponent.test.tsx` in the same directory).
- Use `npx jest [optional/path/to/test/file]` to run tests. Running without a path executes all tests found by the Jest configuration.
- **New Features Inspired by Exclusive.co.ug:**
  - Breaking news banner with urgent news updates
  - Weekly content sections ("This Week" organization)
  - Multiple category filtering (News, Gossip, Lifestyle, Music, Relationships, Events)
  - Enhanced newsletter subscription with social media integration
  - Author bylines with social media links
  - Publication date prominence
  - Large featured images with overlay text
  - Related articles suggestions
  - Load more functionality for infinite scroll
  - Category-based content organization

## Features Analysis from Exclusive.co.ug

### **Layout & Design Features:**
1. **Breaking News Banner** - Prominent urgent news section at top
2. **Large Featured Images** - Hero-style images for main articles
3. **Weekly Content Organization** - "This Week" sections for recent content
4. **Category Badges** - Clear category labeling on posts
5. **Author Bylines** - Prominent author names and links
6. **Date Prominence** - Clear publication dates on all posts
7. **Social Media Integration** - Facebook, Twitter, Instagram, YouTube links
8. **Newsletter Subscription** - Email subscription with social media
9. **Load More Button** - Pagination with "Load More" functionality
10. **Mobile-First Design** - Responsive layout optimized for mobile

### **Content Structure Features:**
1. **Multiple Categories** - News, Gossip, Lifestyle, Music, Relationships, Events
2. **Breaking News Priority** - Urgent content flagging system
3. **Entertainment Focus** - Celebrity and entertainment content
4. **Social Media Embeds** - Integration with social platforms
5. **Image-Heavy Content** - Large, engaging featured images
6. **Short Excerpts** - Brief content previews
7. **Related Content** - Article suggestions and cross-linking
8. **Author Profiles** - Individual author pages and bios

## Detailed Design Implementation Plan

### **0.0 Design System & Layout Transformation Tasks Breakdown:**

#### **Header/Navbar Updates (Tasks 0.1-0.7):**
- **Breaking News Banner** - Red/urgent banner above main nav for breaking stories
- **Category Navigation** - Horizontal menu with News, Gossip, Lifestyle, Music, Relationships, Events
- **Enhanced Search** - Prominent search icon with autocomplete functionality
- **Social Media Header** - Facebook, Twitter, Instagram, YouTube icons in header
- **Mobile Menu** - Hamburger navigation optimized for mobile-first experience
- **Newsletter Integration** - Subscribe prompt in header area for email collection
- **Responsive Typography** - Mobile-optimized font sizes and spacing

#### **Content Layout Updates (Tasks 0.8-0.16):**
- **Hero Section Redesign** - Large featured image with overlay text and category badges
- **Weekly Content Sections** - "This Week" organized content blocks with visual separators
- **Post Card Enhancement** - Larger featured images (16:9 ratio), category badges, author bylines
- **Author Byline Component** - Author photo, name, social links, publication date
- **Load More Pagination** - Replace traditional pagination with "Load More" button
- **Enhanced Sidebar** - Newsletter signup, trending stories, social feed integration
- **Color Scheme Application** - Exclusive.co.ug inspired colors (likely red accents, dark/light mode)
- **Mobile-First Testing** - Ensure all components work perfectly on mobile devices

## Tasks

- [ ] 0.0 Design System & Layout Transformation (Pre-CMS Implementation)
  - [ ] 0.1 Update navbar design to match Exclusive.co.ug style with breaking news banner
  - [ ] 0.2 Add category navigation menu (News, Gossip, Lifestyle, Music, Relationships, Events)
  - [ ] 0.3 Implement search functionality with prominent search icon
  - [ ] 0.4 Add social media icons to header (Facebook, Twitter, Instagram, YouTube)
  - [ ] 0.5 Create responsive mobile menu with hamburger navigation
  - [ ] 0.6 Add newsletter subscription prompt in header area
  - [ ] 0.7 Implement breaking news ticker/banner component
  - [ ] 0.8 Update main content layout for news/entertainment style
  - [ ] 0.9 Redesign homepage hero section with large featured image
  - [ ] 0.10 Create weekly content sections ("This Week" layout)
  - [ ] 0.11 Update post card design with larger images and category badges
  - [ ] 0.12 Implement author byline component with social links
  - [ ] 0.13 Add "Load More" pagination component
  - [ ] 0.14 Update sidebar with enhanced newsletter and social integration
  - [ ] 0.15 Apply Exclusive.co.ug color scheme and typography
  - [ ] 0.16 Test responsive design across all device sizes

- [ ] 1.0 Setup Netlify CMS Core Infrastructure
  - [ ] 1.1 Install netlify-cms-app package and dependencies
  - [ ] 1.2 Create `/public/admin/` directory structure
  - [ ] 1.3 Create basic admin index.html file for CMS entry point
  - [ ] 1.4 Update next.config.js to handle admin routes properly
  - [ ] 1.5 Add CMS-specific scripts to package.json

- [ ] 2.0 Configure Content Collections and Schema (Exclusive.co.ug Inspired)
  - [ ] 2.1 Create comprehensive config.yml for Netlify CMS configuration
  - [ ] 2.2 Define blog posts collection with fields: title, date, image, categories, featured, draft, body, author, breaking_news
  - [ ] 2.3 Add breaking news collection for urgent updates with priority field
  - [ ] 2.4 Configure entertainment category collection with subcategories (Music, Gossip, Events, Lifestyle)
  - [ ] 2.5 Set up weekly content organization with automatic date grouping
  - [ ] 2.6 Configure pages collection for static pages (about, contact, elements, homepage)
  - [ ] 2.7 Set up config collection for site settings (config.json with newsletter, social, categories)
  - [ ] 2.8 Configure menu collection for navigation management (menu.json)
  - [ ] 2.9 Set up social collection for social media links with newsletter integration (social.json)
  - [ ] 2.10 Configure theme collection for colors and fonts (theme.json)
  - [ ] 2.11 Add categories collection for dynamic category management (News, Gossip, Music, etc.)
  - [ ] 2.12 Configure media library for image uploads to /public/images/
  - [ ] 2.13 Define editorial workflow for draft/published states and review process
  - [ ] 2.14 Set up proper slug generation and file naming patterns
  - [ ] 2.15 Add author management collection with bio and social links

- [ ] 3.0 Implement Authentication and Access Control
  - [ ] 3.1 Set up Netlify Identity service in Netlify dashboard
  - [ ] 3.2 Add Identity widget to admin interface
  - [ ] 3.3 Configure authentication backend in config.yml
  - [ ] 3.4 Create admin user invitation system
  - [ ] 3.5 Test login/logout functionality
  - [ ] 3.6 Set up role-based access if needed

- [ ] 4.0 Create Custom Preview Templates (Exclusive.co.ug Style)
  - [ ] 4.1 Create preview template for blog posts matching PostSingle layout with large featured images
  - [ ] 4.2 Create preview template for breaking news with urgent styling and priority indicators
  - [ ] 4.3 Create preview template for About page with education/experience sections
  - [ ] 4.4 Create preview template for Contact page with form and address display
  - [ ] 4.5 Create preview template for homepage with hero section, breaking news banner, and weekly sections
  - [ ] 4.6 Add preview for entertainment category pages with subcategory filtering
  - [ ] 4.7 Include all shortcodes (Button, Accordion, Video, Youtube, Tab, Tabs, Notice, Code) in previews
  - [ ] 4.8 Import site styles (Tailwind CSS classes) for accurate preview rendering with Exclusive.co.ug styling
  - [ ] 4.9 Configure preview for multiple categories, featured flags, and breaking news priority
  - [ ] 4.10 Add author byline preview with social media links integration
  - [ ] 4.11 Configure weekly content grouping preview ("This Week" sections)
  - [ ] 4.12 Test live preview functionality across all content types and new components

- [ ] 5.0 Deploy and Test CMS Integration (With Exclusive.co.ug Features)
  - [ ] 5.1 Update netlify.toml with proper build settings and functions configuration
  - [ ] 5.2 Configure Git Gateway for Netlify CMS authentication
  - [ ] 5.3 Deploy to Netlify with CMS enabled and test admin access
  - [ ] 5.4 Test complete content creation workflow (posts, breaking news, entertainment, pages, config changes)
  - [ ] 5.5 Verify Git integration, file commits, and automatic builds
  - [ ] 5.6 Test image upload to /public/images/ and media management for large featured images
  - [ ] 5.7 Test all collections: posts, breaking news, entertainment, pages, config, menu, social, theme, categories, authors
  - [ ] 5.8 Verify frontend displays CMS-managed content correctly with new Exclusive.co.ug styling
  - [ ] 5.9 Test weekly content grouping and "This Week" section functionality
  - [ ] 5.10 Test breaking news banner and priority system
  - [ ] 5.11 Verify category filtering and multiple category assignment
  - [ ] 5.12 Test newsletter subscription integration with social media links
  - [ ] 5.13 Test editorial workflow (draft/review/publish) if enabled
  - [ ] 5.14 Test author bylines and social media integration
  - [ ] 5.15 Create comprehensive documentation for content editors with screenshots and Exclusive.co.ug feature explanations
  - [ ] 5.16 Set up backup procedures and recovery documentation
  - [ ] 5.17 Performance test: ensure CMS doesn't impact site loading speed with new features
  - [ ] 5.18 Test mobile responsiveness of all new features