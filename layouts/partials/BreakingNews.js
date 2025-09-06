import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { RiFireFill } from "react-icons/ri";

const BreakingNews = ({ breakingNews = [] }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-rotate breaking news items every 5 seconds
  useEffect(() => {
    if (breakingNews.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => 
          prevIndex === breakingNews.length - 1 ? 0 : prevIndex + 1
        );
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [breakingNews.length]);

  if (!isVisible || breakingNews.length === 0) {
    return null;
  }

  const currentNews = breakingNews[currentIndex];

  return (
    <div className="breaking-news bg-urgent border-l-4 border-red-600 relative overflow-hidden">
      <div className="container px-4 py-2 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3 flex-1 min-w-0">
            {/* Breaking news label */}
            <div className="flex items-center space-x-2 bg-red-600 text-white px-3 py-1 rounded-md whitespace-nowrap">
              <RiFireFill className="text-yellow-300 text-sm animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wide">
                Breaking
              </span>
            </div>

            {/* News content */}
            <div className="flex-1 min-w-0">
              {currentNews?.slug ? (
                <Link 
                  href={`/posts/${currentNews.slug}`}
                  className="text-white hover:text-yellow-200 transition-colors duration-200"
                >
                  <span className="text-sm font-medium line-clamp-1 md:line-clamp-none">
                    {currentNews.title}
                  </span>
                </Link>
              ) : (
                <span className="text-white text-sm font-medium line-clamp-1 md:line-clamp-none">
                  {currentNews?.title || "Breaking news updates coming soon..."}
                </span>
              )}
            </div>

            {/* Navigation dots for multiple news items */}
            {breakingNews.length > 1 && (
              <div className="hidden md:flex items-center space-x-1">
                {breakingNews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-2 h-2 rounded-full transition-colors duration-200 ${
                      index === currentIndex ? 'bg-yellow-300' : 'bg-white/50'
                    }`}
                    aria-label={`View breaking news ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={() => setIsVisible(false)}
            className="text-white hover:text-yellow-200 transition-colors duration-200 ml-3 p-1"
            aria-label="Close breaking news banner"
          >
            <AiOutlineClose className="text-sm" />
          </button>
        </div>
      </div>

      {/* Animated background effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600 via-red-500 to-red-600 opacity-90 -z-10"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse -z-10"></div>
    </div>
  );
};

export default BreakingNews;