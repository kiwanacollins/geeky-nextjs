import Logo from "@components/Logo";
import menu from "@config/menu.json";
import ThemeSwitcher from "@layouts/components/ThemeSwitcher";
import BreakingNews from "@partials/BreakingNews";
import CategoryNav from "@partials/CategoryNav";
import SearchModal from "@partials/SearchModal";
import { AppShell, Burger, Group, UnstyledButton, Collapse, Text, Box } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";

const Header = ({ breakingNews = [], categories = [] }) => {
  // distructuring the main menu from menu object
  const { main } = menu;

  // states declaration
  const [searchModal, setSearchModal] = useState(false);
  const [opened, { toggle }] = useDisclosure();

  // Router
  const router = useRouter();

  return (
    <>
      {/* Breaking News Banner */}
      <BreakingNews breakingNews={breakingNews} />
      
      <AppShell.Header className="bg-gradient-to-r from-white to-gray-50 dark:from-darkmode-body dark:to-slate-800 shadow-lg border-b border-border dark:border-darkmode-border min-h-[60px] backdrop-blur-sm">
        <Group h="100%" px="4" justify="space-between" className="min-h-[60px] max-w-7xl mx-auto">
          <Group className="flex items-center">
            <div className="transform transition-transform duration-300 hover:scale-105">
              <Logo />
            </div>
          </Group>

          {/* Desktop Navigation */}
          <Group gap="xs" visibleFrom="lg" className="hidden lg:flex">
            {main.map((menuItem, i) => (
              <React.Fragment key={`menu-${i}`}>
                {menuItem.hasChildren ? (
                  <Box className="relative group">
                    <UnstyledButton
                      className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md transform hover:scale-105 ${
                        menuItem.children
                          .map((c) => c.url)
                          .includes(router.asPath) 
                          ? "bg-gradient-to-r from-primary to-red-600 text-white shadow-lg" 
                          : "text-dark dark:text-darkmode-light hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white"
                      }`}
                    >
                      <Group gap={6}>
                        <Text size="sm" fw={600}>{menuItem.name}</Text>
                        <svg className="h-3 w-3 fill-current transition-transform group-hover:rotate-180" viewBox="0 0 20 20">
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </Group>
                    </UnstyledButton>
                    <Box className="absolute top-full left-0 mt-2 py-3 bg-white dark:bg-darkmode-body border border-border dark:border-darkmode-border rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 min-w-[220px] backdrop-blur-sm">
                      {menuItem.children.map((child, j) => (
                        <Link key={j} href={child.url} className="block">
                          <UnstyledButton
                            className={`w-full text-left px-5 py-3 text-sm font-medium transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-100 hover:text-primary border-l-2 border-transparent hover:border-primary ${
                              router.asPath === child.url ? "bg-gradient-to-r from-primary/10 to-red-100 text-primary border-l-primary" : "text-dark dark:text-darkmode-light"
                            }`}
                          >
                            {child.name}
                          </UnstyledButton>
                        </Link>
                      ))}
                    </Box>
                  </Box>
                ) : (
                  <Link href={menuItem.url} className="block">
                    <UnstyledButton
                      className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:shadow-md transform hover:scale-105 ${
                        router.asPath === menuItem.url 
                          ? "bg-gradient-to-r from-primary to-red-600 text-white shadow-lg" 
                          : "text-dark dark:text-darkmode-light hover:bg-gradient-to-r hover:from-primary hover:to-red-600 hover:text-white"
                      }`}
                    >
                      <Text size="sm" fw={600}>{menuItem.name}</Text>
                    </UnstyledButton>
                  </Link>
                )}
              </React.Fragment>
            ))}
          </Group>

          {/* Right side controls */}
          <Group gap="md" className="flex items-center">
            <div className="hidden sm:block">
              <div className="p-1 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm">
                <ThemeSwitcher />
              </div>
            </div>
            
            {/* Search button */}
            <UnstyledButton
              onClick={() => setSearchModal(true)}
              className="p-3 rounded-full bg-gradient-to-r from-primary to-red-600 text-white hover:from-red-600 hover:to-primary transition-all duration-300 hover:shadow-lg transform hover:scale-110 group"
              aria-label="Search"
            >
              <IoSearch className="text-lg group-hover:scale-110 transition-transform" />
            </UnstyledButton>
            
            {/* Mobile menu burger */}
            <div className="lg:hidden">
              <div className="p-2 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-sm hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300">
                <Burger 
                  opened={opened} 
                  onClick={toggle} 
                  color="#dc2626"
                  size="sm"
                  className="transition-transform duration-300 hover:scale-110"
                />
              </div>
            </div>
          </Group>
        </Group>

        {/* Mobile Navigation */}
        <Collapse in={opened}>
          <Box className="mx-4 mb-4 rounded-xl bg-white/95 dark:bg-darkmode-body/95 backdrop-blur-md border border-border/50 dark:border-darkmode-border/50 shadow-2xl overflow-hidden">
            <div className="p-2">
              {main.map((menuItem, i) => (
                <React.Fragment key={`mobile-menu-${i}`}>
                  {menuItem.hasChildren ? (
                    <Box className="mb-1">
                      <div className="px-4 py-3 font-semibold text-dark dark:text-darkmode-light bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 rounded-lg mb-2">
                        <Text size="sm" fw={700} className="tracking-wide">
                          {menuItem.name}
                        </Text>
                      </div>
                      <div className="pl-2 space-y-1">
                        {menuItem.children.map((child, j) => (
                          <Link key={j} href={child.url} className="block">
                            <UnstyledButton
                              onClick={() => toggle()}
                              className={`w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 border-l-2 border-transparent hover:border-primary hover:bg-gradient-to-r hover:from-primary/5 hover:to-red-50 dark:hover:to-slate-800 ${
                                router.asPath === child.url ? "bg-gradient-to-r from-primary/10 to-red-50 dark:to-slate-800 text-primary border-l-primary" : "text-dark dark:text-darkmode-light hover:text-primary"
                              }`}
                            >
                              <Text size="sm">{child.name}</Text>
                            </UnstyledButton>
                          </Link>
                        ))}
                      </div>
                    </Box>
                  ) : (
                    <Link href={menuItem.url} className="block mb-1">
                      <UnstyledButton
                        onClick={() => toggle()}
                        className={`w-full text-left px-4 py-4 font-semibold rounded-lg transition-all duration-300 hover:shadow-md transform hover:scale-[0.98] ${
                          router.asPath === menuItem.url ? "bg-gradient-to-r from-primary to-red-600 text-white shadow-lg" : "text-dark dark:text-darkmode-light hover:bg-gradient-to-r hover:from-primary/10 hover:to-red-50 dark:hover:to-slate-800 hover:text-primary"
                        }`}
                      >
                        <Text size="sm" fw={600}>
                          {menuItem.name}
                        </Text>
                      </UnstyledButton>
                    </Link>
                  )}
                </React.Fragment>
              ))}
            </div>
            
            {/* Mobile theme switcher */}
            <div className="px-4 py-3 border-t border-border/30 dark:border-darkmode-border/30 bg-gradient-to-r from-gray-50/50 to-gray-100/50 dark:from-slate-800/50 dark:to-slate-700/50">
              <div className="flex items-center justify-between">
                <Text size="sm" fw={600} className="text-dark dark:text-darkmode-light">
                  Theme
                </Text>
                <ThemeSwitcher />
              </div>
            </div>
          </Box>
        </Collapse>

        <SearchModal
          searchModal={searchModal}
          setSearchModal={setSearchModal}
        />
      </AppShell.Header>
      
      {/* Category Navigation */}
      <CategoryNav categories={categories} />
    </>
  );
};

export default Header;
