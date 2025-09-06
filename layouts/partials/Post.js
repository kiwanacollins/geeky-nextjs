import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaRegCalendar, FaUserAlt } from "react-icons/fa";
import { HiClock } from "react-icons/hi";

const Post = ({ post, featured = false, className = "" }) => {
  const { summary_length, blog_folder } = config.settings;
  const { meta_author } = config.metadata;
  const author = post.frontmatter.author ? post.frontmatter.author : meta_author;
  
  // Calculate reading time (rough estimate)
  const readingTime = Math.ceil(post.content.split(' ').length / 200);
  
  // Check if post is breaking news or urgent
  const isBreaking = post.frontmatter.breaking_news || post.frontmatter.urgent;

  return (
    <article className={`post group ${className}`}>
      <div className="relative overflow-hidden rounded-lg">
        {/* Featured image with 16:9 aspect ratio */}
        {post.frontmatter.image && (
          <div className="relative aspect-video overflow-hidden">
            <ImageFallback
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={post.frontmatter.image}
              alt={post.frontmatter.title}
              width={featured ? 800 : 500}
              height={featured ? 450 : 280}
            />
            
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        )}

        {/* Category badges */}
        <div className="absolute top-3 left-3 z-10">
          <div className="flex flex-wrap gap-2">
            {isBreaking && (
              <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-urgent rounded-full animate-pulse">
                BREAKING
              </span>
            )}
            {post.frontmatter.categories.slice(0, 2).map((category, index) => (
              <Link
                key={`category-${index}`}
                href={`/categories/${category.replace(" ", "-")}`}
                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white bg-black/70 hover:bg-primary rounded-full transition-colors duration-200"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>

        {/* Featured badge */}
        {featured && (
          <div className="absolute top-3 right-3 z-10">
            <span className="inline-flex items-center px-3 py-1 text-xs font-bold text-white bg-secondary rounded-full">
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-4 space-y-3">
        {/* Title */}
        <h3 className={`font-bold leading-tight ${featured ? 'text-xl md:text-2xl' : 'text-lg'}`}>
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="text-dark dark:text-darkmode-dark hover:text-primary dark:hover:text-darkmode-primary transition-colors duration-200"
          >
            {post.frontmatter.title}
          </Link>
        </h3>

        {/* Meta information */}
        <div className="flex items-center justify-between text-sm text-light dark:text-darkmode-light">
          <div className="flex items-center space-x-4">
            <Link
              href="/about"
              className="inline-flex items-center hover:text-primary dark:hover:text-darkmode-primary transition-colors duration-200"
            >
              <FaUserAlt className="mr-1.5 text-xs" />
              <span className="font-medium">{author}</span>
            </Link>
            
            <span className="inline-flex items-center">
              <FaRegCalendar className="mr-1.5 text-xs" />
              {dateFormat(post.frontmatter.date)}
            </span>
          </div>

          <span className="inline-flex items-center text-xs">
            <HiClock className="mr-1" />
            {readingTime} min read
          </span>
        </div>

        {/* Excerpt */}
        <p className="text-default dark:text-darkmode-default line-clamp-3">
          {post.content.slice(0, Number(summary_length)).replace(/#+\s/g, '')}...
        </p>

        {/* Read more button */}
        <div className="pt-2">
          <Link
            href={`/${blog_folder}/${post.slug}`}
            className="inline-flex items-center text-sm font-medium text-primary dark:text-darkmode-primary hover:text-dark dark:hover:text-darkmode-dark transition-colors duration-200 group"
          >
            Read More
            <svg
              className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default Post;
