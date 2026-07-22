// ===== Mobile Menu Toggle =====
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// ===== Dynamic Footer Year =====
const currentYearSpan = document.getElementById('currentYear');
currentYearSpan.textContent = new Date().getFullYear();

// ===== Navbar Background on Scroll =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== Scroll to Top Button =====
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollTopBtn.classList.add('show');
  } else {
    scrollTopBtn.classList.remove('show');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== Contact Form Validation =====
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const messageError = document.getElementById('messageError');

function isValidEmail(value) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
}

function validateField(input, errorEl, message, isValid) {
  if (!isValid) {
    input.classList.add('invalid');
    errorEl.textContent = message;
    return false;
  } else {
    input.classList.remove('invalid');
    errorEl.textContent = '';
    return true;
  }
}

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const nameVal = nameInput.value.trim();
    const emailVal = emailInput.value.trim();
    const messageVal = messageInput.value.trim();

    const isNameValid = validateField(
      nameInput, nameError, 'Please enter your name.', nameVal.length >= 2
    );

    const isEmailValid = validateField(
      emailInput, emailError, 'Please enter a valid email address.', isValidEmail(emailVal)
    );

    const isMessageValid = validateField(
      messageInput, messageError, 'Message should be at least 10 characters.', messageVal.length >= 10
    );

    if (isNameValid && isEmailValid && isMessageValid) {
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;

      submitBtn.textContent = `Thanks, ${nameVal}! ✔`;
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        contactForm.reset();
      }, 2500);
    }
  });

  // Real-time validation as user types
  nameInput.addEventListener('input', () => {
    if (nameInput.classList.contains('invalid')) {
      validateField(nameInput, nameError, 'Please enter your name.', nameInput.value.trim().length >= 2);
    }
  });

  emailInput.addEventListener('input', () => {
    if (emailInput.classList.contains('invalid')) {
      validateField(emailInput, emailError, 'Please enter a valid email address.', isValidEmail(emailInput.value.trim()));
    }
  });

  messageInput.addEventListener('input', () => {
    if (messageInput.classList.contains('invalid')) {
      validateField(messageInput, messageError, 'Message should be at least 10 characters.', messageInput.value.trim().length >= 10);
    }
  });
}