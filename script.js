document.querySelectorAll(".copy").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const text = document.getElementById(btn.dataset.copy).textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
      btn.textContent = "copied";
    } catch {
      btn.textContent = "select it by hand";
    }
    btn.dataset.copied = "";
    setTimeout(() => {
      btn.textContent = "copy";
      delete btn.dataset.copied;
    }, 1600);
  });
});

const patSound = new Audio("patpat.mp3");
patSound.preload = "auto";
const patBtn = document.querySelector(".pat");

const pat = (x, y) => {
  const s = patSound.cloneNode();
  s.volume = 0.8;
  s.play().catch(() => {});

  if (patBtn) {
    patBtn.classList.remove("squish");
    void patBtn.offsetWidth; // restart the animation on rapid pats
    patBtn.classList.add("squish");
  }

  const el = document.createElement("span");
  el.className = "pop";
  el.textContent = ":3";
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
  el.style.setProperty("--dx", `${(Math.random() - 0.5) * 50}px`);
  el.style.setProperty("--dy", "-70px");
  el.style.setProperty("--rot", `${(Math.random() - 0.5) * 40}deg`);
  el.style.setProperty("--c", "#ffb627");
  document.body.append(el);
  el.addEventListener("animationend", () => el.remove());
};

const patFrom = (el) => {
  const r = el.getBoundingClientRect();
  pat(r.left + r.width / 2, r.top + r.height / 2);
};

patBtn?.addEventListener("click", () => patFrom(patBtn));

let lastKey = "";
document.addEventListener("keydown", (e) => {
  if (e.target.closest("input, textarea, [contenteditable]")) return;
  if (e.key === "3" && lastKey === ":") {
    if (patBtn && patBtn.getBoundingClientRect().bottom > 0) patFrom(patBtn);
    else pat(innerWidth / 2, innerHeight / 2);
  }
  if (e.key !== "Shift") lastKey = e.key;
});
