// UNISEX SALON - Website JavaScript

document.addEventListener("DOMContentLoaded", function () {

  // Mobile navigation menu
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", function () {
      const isOpen = navLinks.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Close navigation" : "Open navigation"
      );

      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
        menuToggle.textContent = "☰";
      });
    });
  }

  // Automatically update the footer year
  const year = document.getElementById("currentYear");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // Prevent selecting a past appointment date
  const dateInput = document.getElementById("appointmentDate");

  if (dateInput) {
    const today = new Date();

    const localDate = new Date(
      today.getTime() - today.getTimezoneOffset() * 60000
    ).toISOString().slice(0, 10);

    dateInput.min = localDate;
  }

  // Booking form
  const bookingForm = document.getElementById("bookingForm");

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!bookingForm.reportValidity()) {
        return;
      }

      const formData = new FormData(bookingForm);

      const name = formData.get("fullName");
      const phone = formData.get("phone");
      const email = formData.get("email") || "Not provided";
      const service = formData.get("service");
      const date = formData.get("appointmentDate");
      const time = formData.get("appointmentTime");
      const notes = formData.get("notes") || "None";

      const subject = encodeURIComponent(
        "UNISEX SALON Appointment Request - " + name
      );

      const message = [
        "UNISEX SALON - Appointment Request",
        "",
        "Name: " + name,
        "Phone: " + phone,
        "Email: " + email,
        "Service: " + service,
        "Preferred date: " + date,
        "Preferred time: " + time,
        "Extra details: " + notes,
        "",
        "Please confirm appointment availability and final price."
      ].join("\n");

      const status = document.getElementById("formMessage");

      if (status) {
        status.textContent =
          "Your email app will open if one is configured. The appointment is not confirmed until the salon replies.";
      }

      // Replace this email with the real salon email address.
      const salonEmail = "salon@example.com";

      window.location.href =
        "mailto:" + salonEmail +
        "?subject=" + subject +
        "&body=" + encodeURIComponent(message);
    });
  }

  // Contact form
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      if (!contactForm.reportValidity()) {
        return;
      }

      const formData = new FormData(contactForm);

      const name = formData.get("contactName");
      const email = formData.get("contactEmail");
      const subject = encodeURIComponent(
        formData.get("contactSubject")
      );
      const message = [
        "Name: " + name,
        "Email: " + email,
        "",
        "Message:",
        formData.get("contactMessage")
      ].join("\n");

      const status = document.getElementById("contactMessageStatus");

      if (status) {
        status.textContent =
          "Your email app will open if one is configured. Replace salon@example.com with the real salon email.";
      }

      const salonEmail = "salon@example.com";

      window.location.href =
        "mailto:" + salonEmail +
        "?subject=" + subject +
        "&body=" + encodeURIComponent(message);
    });
  }

});
