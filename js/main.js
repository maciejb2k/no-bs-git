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

  // Git blob

  async function git_blob(str) {
    const header = `blob ${new Blob([str]).size}\0`;
    const store = header + str;
    return await sha1(store);
  }

  const zlib_deflate = (str) => {
    const encoder = new TextEncoder();
    const inputUint8Array = encoder.encode(str);
    const compressedData = pako.deflate(inputUint8Array, { level: 1 });
    return compressedData;
  };

  function bufferToHex(arrayBuffer) {
    return Array.prototype.map
      .call(new Uint8Array(arrayBuffer), (n) =>
        ("00" + n.toString(16)).slice(-2)
      )
      .join("");
  }

  const zlib_inflate = (str) => {
    try {
      const decompressedUint8Array = pako.inflate(compressedData);
      const decoder = new TextDecoder();
      const originalString = decoder.decode(decompressedUint8Array);
      return originalString;
    } catch (err) {
      console.log(err);
    }
  };

  const get_blob_header = (str) => `blob ${new Blob([str]).size}\\0`;
  const get_blob_store = (str) => `blob ${new Blob([str]).size}\0${str}`;

  const blob_input = document.getElementById("blob-input");
  const blob_content = document.getElementById("blob-content");
  const blob_compressed = document.getElementById("blob-compressed");
  const blob_sha1 = document.getElementById("blob-sha1");

  const set_blob_content = (str) => {
    blob_content.value = get_blob_header(str) + str;
  };

  const set_blob_sha1 = (str) => {
    git_blob(str).then((hash) => (blob_sha1.value = hash));
  };

  const set_blob_compressed = (str) => {
    blob_compressed.value = bufferToHex(zlib_deflate(str));
  };

  // Initial values
  set_blob_content(blob_input.value);
  set_blob_sha1(blob_input.value);
  set_blob_compressed(get_blob_store(blob_input.value));

  blob_input.addEventListener("input", function () {
    set_blob_content(blob_input.value);
    set_blob_compressed(get_blob_store(blob_input.value));
    set_blob_sha1(blob_input.value);
  });
});
