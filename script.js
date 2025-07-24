// ===== VARIABLES GLOBALES =====
let lastScrollTop = 0;
const navbar = document.getElementById("navbar");
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("nav-menu");
const whatsappFloat = document.getElementById("whatsapp-float");

// ===== INICIALIZACIÓN =====
document.addEventListener("DOMContentLoaded", function () {
  initializeAnimations();
  initializeNavigation();
  initializeScrollEffects();
  initializeFormHandling();
  initializeIntersectionObserver();
  initializeSmoothScrolling();
});

// ===== ANIMACIONES DE INICIALIZACIÓN =====
function initializeAnimations() {
  // Animar elementos hero al cargar
  const heroElements = document.querySelectorAll(".animate-fade-up");
  heroElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 200);
  });
}

// ===== NAVEGACIÓN =====
function initializeNavigation() {
  // Toggle menú hamburguesa
  hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.style.overflow = navMenu.classList.contains("active")
      ? "hidden"
      : "";
  });

  // Cerrar menú al hacer click en un enlace
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  // Cerrar menú al hacer click fuera
  document.addEventListener("click", function (e) {
    if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ===== EFECTOS DE SCROLL =====
function initializeScrollEffects() {
  window.addEventListener("scroll", function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Navbar scroll effect
    if (scrollTop > 100) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // WhatsApp button visibility
    if (scrollTop > 300) {
      whatsappFloat.style.opacity = "1";
      whatsappFloat.style.visibility = "visible";
    } else {
      whatsappFloat.style.opacity = "0";
      whatsappFloat.style.visibility = "hidden";
    }

    // Parallax effect for hero section
    const hero = document.querySelector(".hero");
    if (hero) {
      const heroBackground = hero.querySelector(".hero-background");
      if (heroBackground && scrollTop < window.innerHeight) {
        heroBackground.style.transform = `translateY(${scrollTop * 0.5}px)`;
      }
    }

    lastScrollTop = scrollTop;
  });
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
  const links = document.querySelectorAll('a[href^="#"]');

  links.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80; // Ajuste para navbar fija

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
}

// ===== INTERSECTION OBSERVER PARA ANIMACIONES =====
function initializeIntersectionObserver() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");

        // Animaciones específicas por tipo de elemento
        if (entry.target.classList.contains("activity-card")) {
          animateActivityCard(entry.target);
        } else if (entry.target.classList.contains("package-card")) {
          animatePackageCard(entry.target);
        } else if (entry.target.classList.contains("testimonial-card")) {
          animateTestimonialCard(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observar elementos que necesitan animación
  const elementsToAnimate = document.querySelectorAll(`
        .activity-card,
        .package-card,
        .testimonial-card,
        .info-card,
        .about-content,
        .section-header
    `);

  elementsToAnimate.forEach((element) => {
    element.classList.add("scroll-animate");
    observer.observe(element);
  });
}

// ===== ANIMACIONES ESPECÍFICAS =====
function animateActivityCard(card) {
  const icon = card.querySelector(".activity-icon");
  const title = card.querySelector(".activity-title");
  const description = card.querySelector(".activity-description");

  setTimeout(() => {
    if (icon) icon.style.transform = "scale(1.1) rotate(5deg)";
  }, 100);

  setTimeout(() => {
    if (icon) icon.style.transform = "scale(1) rotate(0deg)";
    if (title) title.style.color = "var(--primary-light)";
  }, 300);

  setTimeout(() => {
    if (title) title.style.color = "var(--primary-color)";
    if (description) description.style.opacity = "1";
  }, 500);
}

function animatePackageCard(card) {
  const price = card.querySelector(".package-price .amount");
  const features = card.querySelectorAll(".package-features li");

  if (price) {
    let currentValue = 0;
    const targetValue = parseInt(price.textContent);
    const increment = targetValue / 30;

    const countUp = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(countUp);
      }
      price.textContent = Math.floor(currentValue);
    }, 50);
  }

  features.forEach((feature, index) => {
    setTimeout(() => {
      feature.style.transform = "translateX(0)";
      feature.style.opacity = "1";
    }, index * 100);
  });
}

function animateTestimonialCard(card) {
  const text = card.querySelector(".testimonial-text");
  const author = card.querySelector(".testimonial-author");

  if (text) {
    text.style.transform = "translateY(0)";
    text.style.opacity = "1";
  }

  setTimeout(() => {
    if (author) {
      author.style.transform = "translateX(0)";
      author.style.opacity = "1";
    }
  }, 300);
}

// ===== MANEJO DE FORMULARIOS =====
function initializeFormHandling() {
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      handleFormSubmission(this);
    });

    // Validación en tiempo real
    const inputs = contactForm.querySelectorAll("input, select, textarea");
    inputs.forEach((input) => {
      input.addEventListener("blur", function () {
        validateField(this);
      });

      input.addEventListener("input", function () {
        clearFieldError(this);
      });
    });
  }
}

function handleFormSubmission(form) {
  const formData = new FormData(form);
  const submitButton = form.querySelector('button[type="submit"]');

  // Validar todos los campos
  let isValid = true;
  const requiredFields = form.querySelectorAll("[required]");

  requiredFields.forEach((field) => {
    if (!validateField(field)) {
      isValid = false;
    }
  });

  if (!isValid) {
    showNotification(
      "Por favor, completa todos los campos requeridos.",
      "error"
    );
    return;
  }

  // Simular envío del formulario
  submitButton.textContent = "Enviando...";
  submitButton.disabled = true;
  submitButton.classList.add("loading");

  setTimeout(() => {
    // Aquí iría la lógica real de envío
    showNotification(
      "¡Gracias por tu interés! Te contactaremos pronto.",
      "success"
    );
    form.reset();

    submitButton.textContent = "Enviar solicitud";
    submitButton.disabled = false;
    submitButton.classList.remove("loading");

    // Redirigir a WhatsApp con información del formulario
    const name = formData.get("name");
    const email = formData.get("email");
    const packageSelected = formData.get("package");
    const message = formData.get("message");

    const whatsappMessage = `Hola! Me interesa el Mi Otro Yo CAMP 2026.%0A%0ANombre: ${name}%0AEmail: ${email}%0APaquete: ${packageSelected}%0A%0AMensaje: ${message}`;
    const whatsappUrl = `https://wa.me/15559876543?text=${whatsappMessage}`;

    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 2000);
  }, 2000);
}

function validateField(field) {
  const value = field.value.trim();
  let isValid = true;

  clearFieldError(field);

  if (field.hasAttribute("required") && !value) {
    showFieldError(field, "Este campo es requerido");
    isValid = false;
  } else if (field.type === "email" && value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      showFieldError(field, "Ingresa un email válido");
      isValid = false;
    }
  } else if (field.type === "tel" && value) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    if (!phoneRegex.test(value)) {
      showFieldError(field, "Ingresa un teléfono válido");
      isValid = false;
    }
  }

  return isValid;
}

function showFieldError(field, message) {
  field.style.borderColor = "#e53e3e";

  let errorElement = field.parentNode.querySelector(".field-error");
  if (!errorElement) {
    errorElement = document.createElement("div");
    errorElement.className = "field-error";
    errorElement.style.color = "#e53e3e";
    errorElement.style.fontSize = "0.875rem";
    errorElement.style.marginTop = "0.25rem";
    field.parentNode.appendChild(errorElement);
  }

  errorElement.textContent = message;
}

function clearFieldError(field) {
  field.style.borderColor = "";
  const errorElement = field.parentNode.querySelector(".field-error");
  if (errorElement) {
    errorElement.remove();
  }
}

// ===== NOTIFICACIONES =====
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${
              type === "success"
                ? "check-circle"
                : type === "error"
                ? "exclamation-circle"
                : "info-circle"
            }"></i>
            <span>${message}</span>
        </div>
    `;

  // Estilos de la notificación
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    background:
      type === "success" ? "#48bb78" : type === "error" ? "#e53e3e" : "#4299e1",
    color: "white",
    padding: "1rem 1.5rem",
    borderRadius: "0.5rem",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
    zIndex: "9999",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    maxWidth: "400px",
  });

  notification.querySelector(".notification-content").style.display = "flex";
  notification.querySelector(".notification-content").style.alignItems =
    "center";
  notification.querySelector(".notification-content").style.gap = "0.5rem";

  document.body.appendChild(notification);

  // Animar entrada
  setTimeout(() => {
    notification.style.transform = "translateX(0)";
  }, 100);

  // Auto-remover después de 5 segundos
  setTimeout(() => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);

  // Permitir cerrar al hacer click
  notification.addEventListener("click", () => {
    notification.style.transform = "translateX(100%)";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  });
}

// ===== EFECTOS ADICIONALES =====

// Efecto de typing para el título hero
function initializeTypingEffect() {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    setTimeout(typeWriter, 1000);
  }
}

// Contador animado para estadísticas
function animateCounters() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach((counter) => {
    const target = parseInt(counter.getAttribute("data-target"));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current);
        setTimeout(updateCounter, 20);
      } else {
        counter.textContent = target;
      }
    };

    updateCounter();
  });
}

// Efecto de partículas para el fondo hero
function initializeParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const particlesContainer = document.createElement("div");
  particlesContainer.className = "particles-container";
  particlesContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
    `;

  hero.appendChild(particlesContainer);

  // Crear partículas
  for (let i = 0; i < 50; i++) {
    createParticle(particlesContainer);
  }
}

function createParticle(container) {
  const particle = document.createElement("div");
  particle.className = "particle";

  const size = Math.random() * 4 + 2;
  const x = Math.random() * 100;
  const animationDuration = Math.random() * 20 + 10;
  const opacity = Math.random() * 0.5 + 0.2;

  particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(255, 255, 255, ${opacity});
        border-radius: 50%;
        left: ${x}%;
        top: 100%;
        animation: float ${animationDuration}s linear infinite;
    `;

  container.appendChild(particle);

  // Remover partícula después de la animación
  setTimeout(() => {
    if (particle.parentNode) {
      particle.parentNode.removeChild(particle);
    }
    // Crear nueva partícula
    createParticle(container);
  }, animationDuration * 1000);
}

// Agregar CSS para animación de partículas
const particleStyles = document.createElement("style");
particleStyles.textContent = `
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        100% {
            transform: translateY(-100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(particleStyles);

// ===== LAZY LOADING PARA IMÁGENES =====
function initializeLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// ===== INICIALIZACIÓN ADICIONAL =====
window.addEventListener("load", function () {
  // Inicializar efectos adicionales después de que todo esté cargado
  initializeParticles();
  initializeLazyLoading();

  // Ocultar loader si existe
  const loader = document.querySelector(".loader");
  if (loader) {
    loader.style.opacity = "0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 500);
  }
});

// ===== MANEJO DE ERRORES =====
window.addEventListener("error", function (e) {
  console.error("Error en la aplicación:", e.error);
});

// ===== PERFORMANCE OPTIMIZATION =====
let ticking = false;

function requestTick() {
  if (!ticking) {
    requestAnimationFrame(updateAnimations);
    ticking = true;
  }
}

function updateAnimations() {
  // Aquí se pueden agregar animaciones que necesiten ser actualizadas en cada frame
  ticking = false;
}

// Throttle scroll events
let scrollTimeout;
window.addEventListener("scroll", function () {
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }
  scrollTimeout = setTimeout(requestTick, 10);
});

// ===== ACCESIBILIDAD =====
document.addEventListener("keydown", function (e) {
  // Navegación con teclado
  if (e.key === "Escape") {
    // Cerrar menú móvil
    if (navMenu.classList.contains("active")) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }
});

// Focus trap para menú móvil
function trapFocus(element) {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
  );
  const firstFocusableElement = focusableElements[0];
  const lastFocusableElement = focusableElements[focusableElements.length - 1];

  element.addEventListener("keydown", function (e) {
    if (e.key === "Tab") {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          lastFocusableElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          firstFocusableElement.focus();
          e.preventDefault();
        }
      }
    }
  });
}
