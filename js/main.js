document.addEventListener("DOMContentLoaded", function () {
  const sha1_input = document.getElementById("sha1-input");
  const sha1_output = document.getElementById("sha1-output");

  async function sha1(str) {
    const enc = new TextEncoder();
    const hash = await crypto.subtle.digest("SHA-1", enc.encode(str));
    return Array.from(new Uint8Array(hash))
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("");
  }

  sha1_input.addEventListener("input", function () {
    if (sha1_input.value === "") {
      sha1_output.value = "";
      return;
    }

    sha1(sha1_input.value).then((hash) => (sha1_output.value = hash));
  });
});
