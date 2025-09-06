import { useState } from "react";
import { HiChevronDown } from "react-icons/hi";
import { ImSpinner2 } from "react-icons/im";

const LoadMore = ({ 
  onLoadMore, 
  hasMore = true, 
  loading = false,
  loadedCount = 0,
  totalCount = 0,
  className = "",
  variant = "default" // "default", "minimal", "compact"
}) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async () => {
    if (loading || !hasMore) return;
    
    setIsClicked(true);
    await onLoadMore();
    
    // Reset click state after a short delay for visual feedback
    setTimeout(() => setIsClicked(false), 300);
  };

  if (!hasMore && loadedCount === 0) {
    return null;
  }

  const variants = {
    default: {
      container: "flex flex-col items-center space-y-4 py-8",
      button: "inline-flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-lg hover:bg-dark transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 font-medium text-lg",
      stats: "text-center text-sm text-light dark:text-darkmode-light"
    },
    minimal: {
      container: "flex justify-center py-6",
      button: "inline-flex items-center space-x-2 px-6 py-2 text-primary dark:text-darkmode-primary border border-primary dark:border-darkmode-primary rounded-md hover:bg-primary hover:text-white dark:hover:bg-darkmode-primary dark:hover:text-darkmode-body transition-colors duration-200",
      stats: "hidden"
    },
    compact: {
      container: "flex items-center justify-center space-x-4 py-4",
      button: "inline-flex items-center space-x-2 px-4 py-2 bg-theme-light dark:bg-darkmode-theme-light text-dark dark:text-darkmode-dark rounded-md hover:bg-primary hover:text-white transition-colors duration-200 text-sm",
      stats: "text-xs text-light dark:text-darkmode-light"
    }
  };

  const style = variants[variant];

  return (
    <div className={`load-more ${style.container} ${className}`}>
      {/* Loading Stats */}
      {totalCount > 0 && (
        <div className={style.stats}>
          <p>
            Showing <span className="font-medium text-dark dark:text-darkmode-dark">{loadedCount}</span> of{" "}
            <span className="font-medium text-dark dark:text-darkmode-dark">{totalCount}</span> posts
          </p>
          {hasMore && (
            <div className="w-full bg-border dark:bg-darkmode-border rounded-full h-1 mt-2 overflow-hidden">
              <div 
                className="h-full bg-primary dark:bg-darkmode-primary transition-all duration-500 ease-out"
                style={{ 
                  width: `${Math.min((loadedCount / totalCount) * 100, 100)}%` 
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* Load More Button */}
      {hasMore ? (
        <button
          onClick={handleClick}
          disabled={loading}
          className={`${style.button} ${
            isClicked ? "scale-95" : ""
          } ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          aria-label="Load more posts"
        >
          {loading ? (
            <>
              <ImSpinner2 className="animate-spin text-xl" />
              <span>Loading...</span>
            </>
          ) : (
            <>
              <span>Load More</span>
              <HiChevronDown className={`text-xl transition-transform duration-200 ${isClicked ? "rotate-180" : ""}`} />
            </>
          )}
        </button>
      ) : (
        <div className="text-center py-4">
          <div className="inline-flex items-center space-x-2 px-6 py-3 bg-theme-light dark:bg-darkmode-theme-light rounded-lg">
            <svg 
              className="w-5 h-5 text-success dark:text-darkmode-success" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-dark dark:text-darkmode-dark font-medium">
              All posts loaded
            </span>
          </div>
          {totalCount > 0 && (
            <p className="text-sm text-light dark:text-darkmode-light mt-2">
              You&apos;ve seen all {totalCount} posts
            </p>
          )}
        </div>
      )}

      {/* Intersection Observer Target for Auto-Loading */}
      <div 
        id="load-more-trigger" 
        className="h-px w-full" 
        aria-hidden="true"
      />
    </div>
  );
};

export default LoadMore;