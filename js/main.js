document.addEventListener("DOMContentLoaded", function () {
  // Navigation
  const navs = document.querySelectorAll(".nav-list");

  document.querySelectorAll(".heading").forEach((heading) => {
    const section = heading.parentElement;
    section.id = heading.textContent.toLowerCase().replace(/\s/g, "-");
    const headingText = heading.textContent;

    const headingLink = document.createElement("a");
    headingLink.href = `#${section.id}`;
    headingLink.textContent = "#";
    headingLink.classList.add("heading__link");
    heading.prepend(headingLink);

    const navItem = document.createElement("li");
    const link = document.createElement("a");

    link.href = `#${section.id}`;
    link.textContent = headingText;
    link.classList.add("nav-link");

    navItem.appendChild(link);

    [...navs].forEach((nav) => {
      const item = navItem.cloneNode(true);
      nav.appendChild(item);
    });
  });

  // Mobile Navigation
  const navToggle = document.querySelector(".nav-toggle-button");
  const mobileNav = document.querySelector(".mobile-nav");
  const closeMobileNav = document.querySelector(".mobile-nav__close");
  const menuBackground = document.querySelector(".menu-background");

  const closeMobile = () => {
    mobileNav.classList.remove("mobile-nav--active");
    menuBackground.classList.remove("menu-background--active");
  };

  navToggle.addEventListener("click", function () {
    mobileNav.classList.toggle("mobile-nav--active");
    menuBackground.classList.toggle("menu-background--active");
  });

  closeMobileNav.addEventListener("click", function () {
    closeMobile();
  });

  menuBackground.addEventListener("click", function () {
    closeMobile();
  });

  mobileNav.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", function () {
      closeMobile();
    });
  });

  // SHA-1
  const sha1_input = document.getElementById("sha1-input");
  const sha1_output = document.getElementById("sha1-output");

  async function sha1(str) {
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest("SHA-1", enc.encode(str));
    return Array.from(new Uint8Array(hash))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("");
  }

  sha1(sha1_input.value).then((hash) => (sha1_output.value = hash));

  sha1_input.addEventListener("input", function () {
    if (sha1_input.value === "") {
      sha1_output.value = "";
      return;
    }

    sha1(sha1_input.value).then((hash) => (sha1_output.value = hash));
  });
});
