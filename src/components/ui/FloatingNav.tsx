"use client";
import React, { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { cn } from "../../lib/utils";
import { Link, useLocation } from "react-router-dom";

export const FloatingNav = ({
  navItems,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: JSX.Element;
  }[];
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const location = useLocation();
  const [visible, setVisible] = useState(true); // Always visible now
  const [activeSection, setActiveSection] = useState('');

  // Detect active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .filter(item => item.link.startsWith('#'))
        .map(item => item.link.substring(1));
      
      const scrollPosition = window.scrollY + 100; // Offset for navbar
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [navItems]);

  // Smooth scroll function for anchor links
  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const navbarHeight = 80; // Height of the fixed navbar
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - navbarHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // Optional: Hide navbar on scroll down, show on scroll up (keeping the original behavior as an option)
  useMotionValueEvent(scrollYProgress, "change", (current) => {
    // Uncomment the following code if you want the navbar to hide/show on scroll
    // if (typeof current === "number") {
    //   let direction = current! - scrollYProgress.getPrevious()!;
    //   if (scrollYProgress.get() < 0.05) {
    //     setVisible(false);
    //   } else {
    //     if (direction < 0) {
    //       setVisible(true);
    //     } else {
    //       setVisible(false);
    //     }
    //   }
    // }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.3,
        }}
        className={cn(
          "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-indigo-500/20 rounded-full bg-bg-secondary/90 backdrop-blur-md shadow-lg shadow-indigo-500/10 z-[5000] pr-2 pl-8 py-3 items-center justify-center space-x-6",
          className
        )}
      >
        {navItems.map((navItem: any, idx: number) => {
          const isActive = activeSection === navItem.link;
          return (
            <Link
              key={`link=${idx}`}
              to={navItem.link}
              onClick={(e) => handleAnchorClick(e, navItem.link)}
              className={cn(
                "relative text-text-secondary items-center flex space-x-1 hover:text-indigo-400 transition-colors duration-200 cursor-pointer",
                isActive && "text-indigo-400"
              )}
            >
              <span className="block sm:hidden">{navItem.icon}</span>
              <span className="hidden sm:block text-sm font-medium">{navItem.name}</span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
        <Link 
          to="/login"
          className="border text-sm font-medium relative border-indigo-500/30 text-text-primary hover:text-white bg-indigo-500/10 hover:bg-gradient-to-r hover:from-indigo-500 hover:to-rose-500 px-4 py-2 rounded-full transition-all duration-300"
        >
          <span>Login</span>
          <span className="absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px" />
        </Link>
      </motion.div>
    </AnimatePresence>
  );
};