import config from "@config/config.json";
import ImageFallback from "@layouts/components/ImageFallback";
import dateFormat from "@lib/utils/dateFormat";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaRegCalendar, FaTwitter } from "react-icons/fa";
import { HiClock } from "react-icons/hi";

const AuthorByline = ({ 
  author, 
  date, 
  readingTime,
  showSocial = true,
  size = "default", // "small", "default", "large"
  className = ""
}) => {
  const { meta_author } = config.metadata;
  
  // Use provided author or fallback to meta_author
  const authorName = author?.name || author || meta_author;
  const authorImage = author?.image || "/images/author.png";
  const authorBio = author?.bio || "";
  const authorSocial = author?.social || {};
  
  // Calculate reading time if not provided
  const estimatedReadingTime = readingTime || "5 min";

  const sizeClasses = {
    small: {
      container: "flex items-center space-x-2",
      avatar: "w-8 h-8",
      text: "text-sm",
      name: "text-sm font-medium",
      meta: "text-xs"
    },
    default: {
      container: "flex items-center space-x-3",
      avatar: "w-10 h-10",
      text: "text-sm",
      name: "text-base font-medium",
      meta: "text-sm"
    },
    large: {
      container: "flex items-start space-x-4",
      avatar: "w-16 h-16",
      text: "text-base",
      name: "text-lg font-semibold",
      meta: "text-base"
    }
  };

  const styles = sizeClasses[size];

  return (
    <div className={`author-byline ${styles.container} ${className}`}>
      {/* Author Avatar */}
      <div className="flex-shrink-0">
        <Link href="/about" className="block">
          <ImageFallback
            src={authorImage}
            alt={authorName}
            width={size === "large" ? 64 : size === "small" ? 32 : 40}
            height={size === "large" ? 64 : size === "small" ? 32 : 40}
            className={`${styles.avatar} rounded-full object-cover hover:ring-2 hover:ring-primary transition-all duration-200`}
          />
        </Link>
      </div>

      {/* Author Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center space-x-2 mb-1">
          <Link
            href="/about"
            className={`${styles.name} text-dark dark:text-darkmode-dark hover:text-primary dark:hover:text-darkmode-primary transition-colors duration-200`}
          >
            {authorName}
          </Link>
          
          {/* Social Media Links */}
          {showSocial && authorSocial && (
            <div className="flex items-center space-x-1">
              {authorSocial.facebook && (
                <a
                  href={authorSocial.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light dark:text-darkmode-light hover:text-blue-600 transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FaFacebook className="text-xs" />
                </a>
              )}
              {authorSocial.twitter && (
                <a
                  href={authorSocial.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light dark:text-darkmode-light hover:text-blue-400 transition-colors duration-200"
                  aria-label="Twitter"
                >
                  <FaTwitter className="text-xs" />
                </a>
              )}
              {authorSocial.instagram && (
                <a
                  href={authorSocial.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light dark:text-darkmode-light hover:text-pink-600 transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-xs" />
                </a>
              )}
              {authorSocial.linkedin && (
                <a
                  href={authorSocial.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-light dark:text-darkmode-light hover:text-blue-700 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-xs" />
                </a>
              )}
            </div>
          )}
        </div>

        {/* Meta Information */}
        <div className="flex items-center space-x-3 text-light dark:text-darkmode-light">
          {date && (
            <span className={`inline-flex items-center ${styles.meta}`}>
              <FaRegCalendar className="mr-1.5 text-xs" />
              {dateFormat(date)}
            </span>
          )}
          
          {estimatedReadingTime && (
            <span className={`inline-flex items-center ${styles.meta}`}>
              <HiClock className="mr-1.5 text-xs" />
              {estimatedReadingTime} read
            </span>
          )}
        </div>

        {/* Author Bio (only for large size) */}
        {size === "large" && authorBio && (
          <p className={`mt-2 ${styles.text} text-default dark:text-darkmode-default line-clamp-2`}>
            {authorBio}
          </p>
        )}
      </div>
    </div>
  );
};

export default AuthorByline;