import Post from "@partials/Post";
import Link from "next/link";
import { useMemo } from "react";
import { HiCalendar, HiTrendingUp } from "react-icons/hi";

const WeeklySection = ({ 
  posts = [], 
  title = "This Week", 
  showTrending = true,
  maxPosts = 6,
  className = ""
}) => {
  // Group posts by week
  const weeklyPosts = useMemo(() => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    
    return posts
      .filter(post => {
        const postDate = new Date(post.frontmatter.date);
        return postDate >= oneWeekAgo && postDate <= now;
      })
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
      .slice(0, maxPosts);
  }, [posts, maxPosts]);

  // Get trending posts (posts with most views/engagement - simulated for now)
  const trendingPosts = useMemo(() => {
    return posts
      .filter(post => post.frontmatter.featured || post.frontmatter.trending)
      .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date))
      .slice(0, 3);
  }, [posts]);

  if (weeklyPosts.length === 0) {
    return null;
  }

  return (
    <section className={`weekly-section ${className}`}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-full">
              <HiCalendar className="text-white text-xl" />
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-dark dark:text-darkmode-dark">
                {title}
              </h2>
              <p className="text-light dark:text-darkmode-light">
                Latest updates from the past 7 days
              </p>
            </div>
          </div>

          {/* View All Link */}
          <div className="hidden md:block">
            <Link
              href="/posts"
              className="inline-flex items-center space-x-2 text-primary dark:text-darkmode-primary hover:text-dark dark:hover:text-darkmode-dark transition-colors duration-200 font-medium"
            >
              <span>View All</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {weeklyPosts.map((post, index) => {
            const isFeatured = index === 0; // First post is featured
            return (
              <div 
                key={post.slug} 
                className={isFeatured ? "md:col-span-2 lg:col-span-2" : ""}
              >
                <Post 
                  post={post} 
                  featured={isFeatured}
                  className="h-full"
                />
              </div>
            );
          })}
        </div>

        {/* Trending Section */}
        {showTrending && trendingPosts.length > 0 && (
          <div className="border-t border-border dark:border-darkmode-border pt-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="flex items-center justify-center w-8 h-8 bg-secondary rounded-full">
                <HiTrendingUp className="text-white text-lg" />
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-darkmode-dark">
                Trending Now
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trendingPosts.map((post, index) => (
                <div 
                  key={`trending-${post.slug}`}
                  className="flex items-center space-x-3 p-4 bg-theme-light dark:bg-darkmode-theme-light rounded-lg hover:bg-white dark:hover:bg-darkmode-body transition-colors duration-200"
                >
                  <div className="flex items-center justify-center w-8 h-8 bg-primary text-white rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-dark dark:text-darkmode-dark line-clamp-2">
                      <Link 
                        href={`/posts/${post.slug}`}
                        className="hover:text-primary dark:hover:text-darkmode-primary transition-colors duration-200"
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h4>
                    <p className="text-xs text-light dark:text-darkmode-light mt-1">
                      {post.frontmatter.categories?.[0]}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile View All Button */}
        <div className="text-center mt-8 md:hidden">
          <Link
            href="/posts"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-dark transition-colors duration-200 font-medium"
          >
            <span>View All Posts</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default WeeklySection;