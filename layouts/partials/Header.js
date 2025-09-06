import Logo from "@components/Logo";
import menu from "@config/menu.json";
import socical from "@config/social.json";
import Social from "@layouts/components/Social";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import BreakingNews from "@partials/BreakingNews";
import CategoryNav from "@partials/CategoryNav";
import SearchModal from "@partials/SearchModal";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = ({ breakingNews = [], categories = [] }) => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  // Router
  const router = useRouter();

  //stop scrolling when nav is open
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("menu-open");
    } else {
      document.body.classList.remove("menu-open");
    }
  }, [showMenu]);

  return (
    <>
      {/* Breaking News Banner */}
      <BreakingNews breakingNews={breakingNews} />
      
      <header className="header sticky top-0 z-50 bg-white dark:bg-darkmode-body shadow-sm">
        <nav className="navbar container px-1 sm:px-8">
          <div className="order-0">
            <Logo />
          </div>
          <div className="flex items-center space-x-2 xl:space-x-4">
            <div
              className={`collapse-menu ${
                !showMenu && "translate-x-full"
              } lg:flex lg:translate-x-0`}
            >
              <button
                className="absolute right-6 top-11 lg:hidden z-50"
                onClick={() => setShowMenu(false)}
              >
                <svg className="h-6 w-6 fill-current text-dark dark:text-darkmode-dark" viewBox="0 0 20 20">
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  />
                </svg>
              </button>
              <ul
                id="nav-menu"
                className="navbar-nav w-full md:w-auto md:space-x-1 lg:flex xl:space-x-2"
              >
                {main.map((menu, i) => (
                  <React.Fragment key={`menu-${i}`}>
                    {menu.hasChildren ? (
                      <li className="nav-item nav-dropdown group relative">
                        <span
                          className={`nav-link ${
                            menu.children
                              .map((c) => c.url)
                              .includes(router.asPath) && "active"
                          } inline-flex items-center`}
                        >
                          {menu.name}
                          <svg
                            className="h-4 w-4 fill-current ml-1"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </span>
                        <ul className="nav-dropdown-list hidden transition-all duration-300 group-hover:top-[46px] group-hover:block md:invisible md:absolute md:top-[60px] md:block md:opacity-0 md:group-hover:visible md:group-hover:opacity-100">
                          {menu.children.map((child, i) => (
                            <li
                              className="nav-dropdown-item"
                              key={`children-${i}`}
                            >
                              <Link
                                href={child.url}
                                className={`nav-dropdown-link block ${
                                  router.asPath === child.url && "active"
                                }`}
                              >
                                {child.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    ) : (
                      <li className="nav-item">
                        <Link
                          href={menu.url}
                          className={`nav-link block ${
                            router.asPath === menu.url && "active"
                          }`}
                        >
                          {menu.name}
                        </Link>
                      </li>
                    )}
                  </React.Fragment>
                ))}
              </ul>
              {/* header social */}
              <Social source={socical} className="socials hidden lg:flex" />
            </div>
            
            <ThemeSwitcher />
            
            {/* Header search */}
            <button
              className="search-icon p-2 hover:bg-theme-light dark:hover:bg-darkmode-theme-light rounded-full transition-colors duration-200"
              onClick={() => {
                setSearchModal(true);
              }}
              aria-label="Search"
            >
              <IoSearch className="text-xl" />
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white lg:hidden hover:bg-dark transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {showMenu ? (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <title>Menu Close</title>
                  <polygon
                    points="11 9 22 9 22 11 11 11 11 22 9 22 9 11 -2 11 -2 9 9 9 9 -2 11 -2"
                    transform="rotate(45 10 10)"
                  />
                </svg>
              ) : (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                  <title>Menu Open</title>
                  <path d="M0 3h20v2H0V3z m0 6h20v2H0V9z m0 6h20v2H0V0z" />
                </svg>
              )}
            </button>
          </div>

          <SearchModal
            searchModal={searchModal}
            setSearchModal={setSearchModal}
          />
        </nav>
        
        {/* Mobile menu backdrop */}
        {showMenu && (
          <div 
            className="header-backdrop fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setShowMenu(false)}
          />
        )}
      </header>
      
      {/* Category Navigation */}
      <CategoryNav categories={categories} />
    </>
  );
};

export default Header;
