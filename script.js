// Intersection Observer to add 'visible' class on scroll for animation
// Also remove 'visible' when out of view to animate on scroll up/down repeatedly
document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("section");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.3,
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible");
      }
    });
  }, observerOptions);
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Contact form submission handling with Formspree
  const form = document.getElementById("contactForm");
  const successMessage = document.getElementById("successMessage");
  const errorMessage = document.getElementById("errorMessage");

  successMessage.style.display = "none";
  errorMessage.style.display = "none";

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    successMessage.style.display = "none";
    errorMessage.style.display = "none";

    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (response.ok) {
        form.reset();
        successMessage.style.display = "block";
      } else {
        errorMessage.style.display = "block";
      }
    } catch (error) {
      errorMessage.style.display = "block";
    }
  });
});
