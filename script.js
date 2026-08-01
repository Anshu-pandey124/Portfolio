// Smooth scroll function for buttons & links
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const navHeight = document.querySelector('header')?.offsetHeight || 70;
    const targetPosition = section.getBoundingClientRect().top + window.pageYOffset - navHeight;
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  }
}

// Typing effect for #typing element
document.addEventListener('DOMContentLoaded', () => {
  const typingElement = document.getElementById('typing');
  if (typingElement) {
    const phrases = [
      'Full Stack Developer',
      'Web Application Creator',
      'Problem Solver',
      'B.Tech CSE Student'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
      const currentPhrase = phrases[phraseIndex];
      
      if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typeSpeed = 50;
      } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typeSpeed = 100;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500; // Pause before typing next
      }

      setTimeout(type, typeSpeed);
    }

    type();
  }

  // Mobile Navigation Menu Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const nav = document.querySelector('nav');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      mobileToggle.classList.toggle('active');
    });

    // Close menu when clicking a link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (mobileToggle) mobileToggle.classList.remove('active');
      });
    });
  }

  // Header Scroll Effect & Active Link Highlight
  const header = document.querySelector('header');
  const navLinks = document.querySelectorAll('nav a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header shadow on scroll
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    // Active nav link highlight
    let current = '';
    const pageYOffset = window.pageYOffset;

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Scroll Reveal Animations using IntersectionObserver
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Add reveal class to cards and elements
  const revealElements = document.querySelectorAll(
    '.home-content, .home-image, .about-image, .about-content, .skill-card, .project, .left, .form'
  );

  revealElements.forEach((el, index) => {
    el.classList.add('reveal-element');
    el.style.transitionDelay = `${(index % 4) * 0.1}s`;
    revealObserver.observe(el);
  });

  // Contact Form Feedback Handler
  const contactForm = document.querySelector('.form button');
  if (contactForm) {
    contactForm.addEventListener('click', (e) => {
      e.preventDefault();
      const nameInput = document.querySelector('.form input[type="text"]');
      const emailInput = document.querySelector('.form input[type="email"]');
      const messageInput = document.querySelector('.form textarea');

      if (!nameInput?.value.trim() || !emailInput?.value.trim()) {
        showNotification('Please fill in your name and email.', 'error');
        return;
      }

      const originalText = contactForm.innerText;
      contactForm.innerText = 'Sending...';
      contactForm.disabled = true;

      setTimeout(() => {
        contactForm.innerText = 'Message Sent! ✓';
        contactForm.style.background = '#10b981';
        contactForm.style.color = '#fff';
        showNotification('Thank you for reaching out! Your message has been sent.', 'success');

        setTimeout(() => {
          contactForm.innerText = originalText;
          contactForm.style.background = '';
          contactForm.style.color = '';
          contactForm.disabled = false;
          if (nameInput) nameInput.value = '';
          if (emailInput) emailInput.value = '';
          const subjectInput = document.querySelectorAll('.form input[type="text"]')[1];
          if (subjectInput) subjectInput.value = '';
          if (messageInput) messageInput.value = '';
        }, 3000);
      }, 1000);
    });
  }

  // Helper notification toast
  function showNotification(message, type) {
    let toast = document.getElementById('toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'toast-notification';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.className = `toast ${type} show`;

    setTimeout(() => {
      toast.classList.remove('show');
    }, 4000);
  }
});
