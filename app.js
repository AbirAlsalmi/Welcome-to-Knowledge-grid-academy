document.addEventListener("DOMContentLoaded", function () {
  console.log("Knowledge Grid Academy app starting...");

  // Language data
  const languageData = {
    en: {
      code: "en",
      direction: "ltr",
      welcomeTemplate: "Dear {name}, welcome to Knowledge Grid Academy",
      validationMessages: {
        empty: "Please enter your name",
        tooShort: "Please enter at least 2 characters",
      },
    },
    ar: {
      code: "ar",
      direction: "rtl",
      welcomeTemplate:
        "مرحبا {name}، أهلا و سهلا بك في أكاديمية شبكة المعرفة✨",
      validationMessages: {
        empty: "يرجى إدخال اسمك",
        tooShort: "يرجى إدخال حرفين على الأقل",
      },
    },
  };

  // DOM elements
  const htmlElement = document.documentElement;
  const form = document.getElementById("welcomeForm");
  const nameInput = document.getElementById("studentName");
  const welcomeMessage = document.getElementById("welcomeMessage");
  const welcomeText = document.getElementById("welcomeText");
  const nextStudentBtn = document.getElementById("nextStudentBtn");
  const englishBtn = document.getElementById("englishBtn");
  const arabicBtn = document.getElementById("arabicBtn");

  // Current language state
  let currentLanguage = "en";

  // Verify DOM elements
  console.log("DOM elements found:", {
    form: !!form,
    nameInput: !!nameInput,
    welcomeMessage: !!welcomeMessage,
    welcomeText: !!welcomeText,
    nextStudentBtn: !!nextStudentBtn,
    englishBtn: !!englishBtn,
    arabicBtn: !!arabicBtn,
  });

  // Language switching functions
  function updateLanguage(lang) {
    console.log("Switching to language:", lang);
    currentLanguage = lang;

    // Update HTML attributes
    htmlElement.lang = lang;
    htmlElement.dir = languageData[lang].direction;

    // Update active button state
    englishBtn.classList.remove("active");
    arabicBtn.classList.remove("active");

    if (lang === "en") {
      englishBtn.classList.add("active");
    } else {
      arabicBtn.classList.add("active");
    }

    // Update all translatable elements
    updateTextContent();

    // Update input placeholder
    updatePlaceholder();

    // Focus on input
    nameInput.focus();
  }

  function updateTextContent() {
    // Update all elements with data attributes
    document.querySelectorAll("[data-en][data-ar]").forEach((element) => {
      const key = currentLanguage === "en" ? "data-en" : "data-ar";
      const text = element.getAttribute(key);
      if (text) {
        element.textContent = text;
      }
    });
  }

  function updatePlaceholder() {
    const placeholderKey =
      currentLanguage === "en" ? "data-placeholder-en" : "data-placeholder-ar";
    const placeholder = nameInput.getAttribute(placeholderKey);
    if (placeholder) {
      nameInput.placeholder = placeholder;
    }
  }

  function showValidationError(message) {
    alert(message);
    nameInput.focus();
  }

  function validateName(name) {
    if (name === "") {
      showValidationError(
        languageData[currentLanguage].validationMessages.empty
      );
      return false;
    }

    if (name.length < 2) {
      showValidationError(
        languageData[currentLanguage].validationMessages.tooShort
      );
      return false;
    }

    return true;
  }

  function showWelcomeMessage(name) {
    console.log("Showing welcome message for:", name);

    // Create personalized welcome message
    const template = languageData[currentLanguage].welcomeTemplate;
    const personalizedMessage = template.replace("{name}", name);

    // Update welcome text
    welcomeText.textContent = personalizedMessage;

    // Show welcome message
    welcomeMessage.classList.remove("hidden");
    welcomeMessage.classList.add("show");

    // Hide form during welcome display
    form.style.opacity = "0.3";
    form.style.pointerEvents = "none";

    // Auto-reset after 4 seconds
    setTimeout(() => {
      resetForm();
    }, 4000);
  }

  function resetForm() {
    console.log("Resetting form");

    // Clear input
    nameInput.value = "";

    // Hide welcome message
    welcomeMessage.classList.remove("show");
    welcomeMessage.classList.add("hidden");

    // Restore form
    form.style.opacity = "1";
    form.style.pointerEvents = "auto";

    // Focus on input
    nameInput.focus();
  }

  // Event listeners
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      console.log("Form submitted");

      const name = nameInput.value.trim();
      console.log("Name entered:", name);

      if (validateName(name)) {
        showWelcomeMessage(name);
      }
    });
  }

  // Next student button
  if (nextStudentBtn) {
    nextStudentBtn.addEventListener("click", function (e) {
      e.preventDefault();
      resetForm();
    });
  }

  // Language toggle buttons
  if (englishBtn) {
    englishBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("English button clicked");
      updateLanguage("en");
      if (!welcomeMessage.classList.contains("hidden")) {
        resetForm();
      }
    });
  }

  if (arabicBtn) {
    arabicBtn.addEventListener("click", function (e) {
      e.preventDefault();
      console.log("Arabic button clicked");
      updateLanguage("ar");
      if (!welcomeMessage.classList.contains("hidden")) {
        resetForm();
      }
    });
  }

  // Input event listeners for better UX
  if (nameInput) {
    nameInput.addEventListener("input", function () {
      console.log("Input value:", nameInput.value);
    });

    nameInput.addEventListener("focus", function () {
      console.log("Input focused");
    });
  }

  // Initialize application
  function initialize() {
    console.log("Initializing application");

    // Set initial language to English
    updateLanguage("en");

    // Initialize form state
    if (welcomeMessage) {
      welcomeMessage.classList.add("hidden");
    }

    if (form) {
      form.style.opacity = "1";
      form.style.pointerEvents = "auto";
    }

    // Focus on input
    if (nameInput) {
      nameInput.focus();
    }
  }

  // Start the application
  initialize();
});
