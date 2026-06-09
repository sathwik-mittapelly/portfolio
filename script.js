// DOM Elements
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const themeToggleBtn = document.getElementById("theme-toggle");

const statNumbers = document.querySelectorAll(".stat-number");
const typedTextElement = document.querySelector(".typed-text");

// Theme Toggle Functionality
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  
  // Update icon
  const icon = themeToggleBtn.querySelector("i");
  if (newTheme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  } else {
    icon.classList.remove("fa-sun");
    icon.classList.add("fa-moon");
  }
}

// Load saved theme on page load
function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  
  const theme = savedTheme || (prefersDark ? "dark" : "light");
  document.documentElement.setAttribute("data-theme", theme);
  
  // Update icon based on theme
  const icon = themeToggleBtn.querySelector("i");
  if (theme === "dark") {
    icon.classList.remove("fa-moon");
    icon.classList.add("fa-sun");
  }
}

// Add event listener for theme toggle
if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", toggleTheme);
}

// Load theme on page load
document.addEventListener("DOMContentLoaded", loadTheme);

// Mobile Navigation Toggle
hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href");
    const targetSection = document.querySelector(targetId);

    if (targetSection) {
      const offsetTop = targetSection.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// Typing Animation
const roles = [
  "Full-Stack Developer",
  "Problem Solver",
  "Tech Enthusiast",
  "Creative Thinker",
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
  const currentRole = roles[roleIndex];

  if (isDeleting) {
    typedTextElement.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
    typingSpeed = 50;
  } else {
    typedTextElement.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
    typingSpeed = 100;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    isDeleting = true;
    typingSpeed = 2000; // Pause at end
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typingSpeed = 500; // Pause before typing new role
  }

  setTimeout(typeText, typingSpeed);
}

// Start typing animation
if (typedTextElement) {
  typeText();
}
// Animated Counter for Statistics
function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 20);
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.animation = "fadeInUp 0.6s ease forwards";

      // Animate statistics when visible
      if (entry.target.classList.contains("stat-item")) {
        const statNumber = entry.target.querySelector(".stat-number");
        const target = parseInt(statNumber.getAttribute("data-target"));
        animateCounter(statNumber, target);
      }
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".stat-item, .skill-item, .project-card",
  );
  animatedElements.forEach((el) => observer.observe(el));
});



// Notification System
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "1rem 1.5rem",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    zIndex: "10000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
  });

  // Set background color based on type
  switch (type) {
    case "success":
      notification.style.backgroundColor = "#10B981";
      break;
    case "error":
      notification.style.backgroundColor = "#EF4444";
      break;
    default:
      notification.style.backgroundColor = "#3B82F6";
  }

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 300);
  }, 3000);
}

// Scroll to top functionality
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Add scroll to top button
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollBtn.className = "scroll-to-top";
Object.assign(scrollBtn.style, {
  position: "fixed",
  bottom: "30px",
  right: "30px",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
  backgroundColor: "#2a9d8f",
  color: "white",
  border: "none",
  cursor: "pointer",
  display: "none",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.2rem",
  zIndex: "1000",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 12px rgba(42, 157, 143, 0.3)",
});

document.body.appendChild(scrollBtn);

scrollBtn.addEventListener("click", scrollToTop);

// Show/hide scroll to top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Add hover effect to scroll button
scrollBtn.addEventListener("mouseenter", () => {
  scrollBtn.style.transform = "scale(1.1)";
  scrollBtn.style.backgroundColor = "#1a535c";
});

scrollBtn.addEventListener("mouseleave", () => {
  scrollBtn.style.transform = "scale(1)";
  scrollBtn.style.backgroundColor = "#2a9d8f";
});


// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll("section");
  const scrollPosition = window.pageYOffset + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.classList.add("active");
        }
      });
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

// Add active link styling
const style = document.createElement("style");
style.textContent = `
    .nav-link.active {
        color: #2a9d8f !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Initialize animations on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add fade-in animation to sections
  const sections = document.querySelectorAll("section");
  sections.forEach((section, index) => {
    section.style.opacity = "0";
    section.style.transform = "translateY(30px)";
    section.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;

    setTimeout(() => {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }, 100);
  });
});


