(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const glyphs = ["✿", "❀", "✾", "❁", "✽"];
  const palette = [
    "#f7a8b8",
    "#ffd166",
    "#f2b5ff",
    "#ff9f80",
    "#a9d18e",
    "#f9c784",
    "#ff8fab"
  ];

  const active = [];
  const maxFlowers = 110;
  let lastSpawnAt = 0;
  let lastX = -1000;
  let lastY = -1000;

  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  function removeFlower(node) {
    const idx = active.indexOf(node);
    if (idx >= 0) active.splice(idx, 1);
    node.remove();
  }

  function spawnFlower(x, y) {
    const flower = document.createElement("span");
    flower.className = "mouse-flower";
    flower.textContent = pick(glyphs);
    flower.style.color = pick(palette);
    flower.style.setProperty("--x", `${x}px`);
    flower.style.setProperty("--y", `${y}px`);
    flower.style.setProperty("--size", `${rand(13, 24)}px`);
    flower.style.setProperty("--drift", `${rand(-42, 42)}px`);
    flower.style.setProperty("--drop", `${rand(110, 190)}px`);
    flower.style.setProperty("--fall", `${rand(1200, 2100)}ms`);
    flower.style.setProperty("--spin", `${rand(-220, 220)}deg`);

    document.body.appendChild(flower);
    active.push(flower);

    if (active.length > maxFlowers) {
      removeFlower(active[0]);
    }

    flower.addEventListener("animationend", () => removeFlower(flower), { once: true });
  }

  function onPointerMove(e) {
    const now = performance.now();
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    const dist2 = dx * dx + dy * dy;

    // Keep the effect smooth and lightweight.
    if (now - lastSpawnAt < 26 || dist2 < 20) {
      return;
    }

    lastSpawnAt = now;
    lastX = e.clientX;
    lastY = e.clientY;

    spawnFlower(e.clientX, e.clientY);
    if (Math.random() < 0.24) {
      spawnFlower(e.clientX + rand(-10, 10), e.clientY + rand(-6, 6));
    }
  }

  window.addEventListener("pointermove", onPointerMove, { passive: true });
})();
