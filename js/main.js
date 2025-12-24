document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const hero = document.getElementById("hero");

  if (!content || !hero) return;

  const hasSeenHero = sessionStorage.getItem("heroSeen");

  if (hasSeenHero) {
    // Skip hero animation
    content.classList.remove("hidden");
    content.classList.add("show");
    document.body.classList.remove("lock-scroll");
    hero.style.minHeight = "60vh";
    return;
  }

  // First-time visit
  document.body.classList.add("lock-scroll");

  setTimeout(() => {
    content.classList.remove("hidden");
    content.classList.add("show");

    document.body.classList.remove("lock-scroll");
    hero.style.minHeight = "60vh";

    sessionStorage.setItem("heroSeen", "true");
  }, 1500);
});

/* =========================
   SCROLL POSITION HANDLING
========================= */

// Save scroll position before navigating away
window.addEventListener("beforeunload", () => {
  sessionStorage.setItem("scrollY", window.scrollY);
});

// Restore scroll position when coming back
window.addEventListener("pageshow", (event) => {
  const scrollY = sessionStorage.getItem("scrollY");
  if (!scrollY) return;

  // Wait for layout to stabilize
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      window.scrollTo(0, parseInt(scrollY, 10));
    });
  });
});
