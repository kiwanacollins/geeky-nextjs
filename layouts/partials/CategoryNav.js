import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";

const CategoryNav = ({ categories = [] }) => {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Default categories if none provided
  const defaultCategories = [
    { name: "All", slug: "", count: 0 },
    { name: "News", slug: "news", count: 0 },
    { name: "Gossip", slug: "gossip", count: 0 },
    { name: "Lifestyle", slug: "lifestyle", count: 0 },
    { name: "Music", slug: "music", count: 0 },
    { name: "Relationships", slug: "relationships", count: 0 },
    { name: "Events", slug: "events", count: 0 },
  ];

  const categoryList = categories.length > 0 ? categories : defaultCategories;
  const currentCategory = router.query.category || "";

  // Handle horizontal scrolling
  const handleScroll = (direction) => {
    const container = document.getElementById("category-nav-container");
    if (container) {
      const scrollAmount = 200;
      const newPosition = direction === "left" 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      container.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });
      setScrollPosition(newPosition);
    }
  };

  // Check scroll boundaries
  useEffect(() => {
    const container = document.getElementById("category-nav-container");
    if (container) {
      const updateScrollButtons = () => {
        setCanScrollLeft(container.scrollLeft > 0);
        setCanScrollRight(
          container.scrollLeft < container.scrollWidth - container.clientWidth
        );
      };

      updateScrollButtons();
      container.addEventListener("scroll", updateScrollButtons);
      
      return () => container.removeEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <div className="category-nav bg-white dark:bg-darkmode-body border-b border-border dark:border-darkmode-border sticky top-0 z-40">
      <div className="container mx-auto px-4">
        <div className="relative flex items-center">
          {/* Left scroll button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-0 z-10 bg-white dark:bg-darkmode-body shadow-md rounded-full p-2 hover:bg-theme-light dark:hover:bg-darkmode-theme-light transition-colors duration-200"
              aria-label="Scroll categories left"
            >
              <HiChevronLeft className="text-lg text-dark dark:text-darkmode-dark" />
            </button>
          )}

          {/* Category navigation container */}
          <div
            id="category-nav-container"
            className="flex items-center space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide py-3 px-8 md:px-12"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categoryList.map((category, index) => {
              const isActive = category.slug === currentCategory;
              const href = category.slug === "" 
                ? "/" 
                : `/categories/${category.slug}`;

              return (
                <Link
                  key={index}
                  href={href}
                  className={`
                    flex items-center space-x-1 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200
                    ${isActive 
                      ? "bg-primary text-white shadow-md" 
                      : "bg-theme-light dark:bg-darkmode-theme-light text-dark dark:text-darkmode-dark hover:bg-primary hover:text-white"
                    }
                  `}
                >
                  <span>{category.name}</span>
                  {category.count > 0 && (
                    <span className={`
                      text-xs px-2 py-1 rounded-full
                      ${isActive 
                        ? "bg-white/20 text-white" 
                        : "bg-light dark:bg-darkmode-border text-muted dark:text-darkmode-light"
                      }
                    `}>
                      {category.count}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* Right scroll button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-0 z-10 bg-white dark:bg-darkmode-body shadow-md rounded-full p-2 hover:bg-theme-light dark:hover:bg-darkmode-theme-light transition-colors duration-200"
              aria-label="Scroll categories right"
            >
              <HiChevronRight className="text-lg text-dark dark:text-darkmode-dark" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;