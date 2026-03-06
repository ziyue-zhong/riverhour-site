const data = {
  "2-no": [
    {
      name: "Dew Pebble Set",
      anchor: "Pebble Stud 6mm",
      orbit: "Mini Hoop 10mm",
      dust: "Micro Dot Stud",
      helix: "-",
      price: "$78",
      link: ""
    },
    {
      name: "Soft Leaf Set",
      anchor: "Leaf Stud 7mm",
      orbit: "Half Moon Stud",
      dust: "Tiny Pearl Dot",
      helix: "-",
      price: "$82",
      link: ""
    },
    {
      name: "Seed Glow Set",
      anchor: "Seed Stud 6mm",
      orbit: "Slim Hoop 11mm",
      dust: "Mini Gem Dot",
      helix: "-",
      price: "$75",
      link: ""
    }
  ],
  "2-yes": [
    {
      name: "Dew Pebble + Helix",
      anchor: "Pebble Stud 6mm",
      orbit: "Mini Hoop 10mm",
      dust: "Micro Dot Stud",
      helix: "Dew Helix Stud 2mm",
      price: "$89",
      link: ""
    },
    {
      name: "Moon Drop + Helix",
      anchor: "Drop Stud 7mm",
      orbit: "Round Orbit Stud",
      dust: "Tiny Pearl Dot",
      helix: "Seed Helix Stud 2mm",
      price: "$92",
      link: ""
    },
    {
      name: "Star Seed + Helix",
      anchor: "Soft Star Stud 6mm",
      orbit: "Slim Hoop 11mm",
      dust: "Mini Gem Dot",
      helix: "Micro Helix Dot 1.8mm",
      price: "$88",
      link: ""
    }
  ],
  "3-no": [
    {
      name: "River Orbit Trio",
      anchor: "Pebble Stud 7mm",
      orbit: "Mini Hoop 10mm",
      dust: "Micro Dot Stud",
      helix: "-",
      price: "$94",
      link: ""
    },
    {
      name: "Leaf Curve Trio",
      anchor: "Leaf Stud 6mm",
      orbit: "Half Hoop 10mm",
      dust: "Tiny Pearl Dot",
      helix: "-",
      price: "$98",
      link: ""
    },
    {
      name: "Dawn Sculpt Trio",
      anchor: "Drop Stud 7mm",
      orbit: "Round Orbit Stud",
      dust: "Mini Gem Dot",
      helix: "-",
      price: "$96",
      link: ""
    }
  ],
  "3-yes": [
    {
      name: "River Orbit + Helix",
      anchor: "Pebble Stud 7mm",
      orbit: "Mini Hoop 10mm",
      dust: "Micro Dot Stud",
      helix: "Dew Helix Stud 2mm",
      price: "$100",
      link: ""
    },
    {
      name: "Leaf Curve + Helix",
      anchor: "Leaf Stud 6mm",
      orbit: "Half Hoop 10mm",
      dust: "Tiny Pearl Dot",
      helix: "Seed Helix Stud 2mm",
      price: "$104",
      link: ""
    },
    {
      name: "Dawn Sculpt + Helix",
      anchor: "Drop Stud 7mm",
      orbit: "Round Orbit Stud",
      dust: "Mini Gem Dot",
      helix: "Micro Helix Dot 1.8mm",
      price: "$102",
      link: ""
    }
  ]
};

const typeLinks = {
  "2-no": "",
  "2-yes": "",
  "3-no": "",
  "3-yes": ""
};

let selectedPiercing = "2";
let selectedHelix = "no";

const cards = document.getElementById("cards");
const resultType = document.getElementById("resultType");

function render() {
  const key = `${selectedPiercing}-${selectedHelix}`;
  const list = data[key] || [];
  const typeLabel =
    selectedPiercing === "2"
      ? selectedHelix === "yes"
        ? "2 Lobe + Helix"
        : "2 Lobe"
      : selectedHelix === "yes"
        ? "3 Lobe + Helix"
        : "3 Lobe";

  resultType.textContent = typeLabel;
  cards.innerHTML = list
    .map(
      (item) => `
      <article class="card">
        <span class="tag">${typeLabel}</span>
        <h3 class="name">${item.name}</h3>
        <p class="parts">
          <strong>Anchor:</strong> ${item.anchor}<br />
          <strong>Orbit:</strong> ${item.orbit}<br />
          <strong>Dust:</strong> ${item.dust}<br />
          <strong>Helix:</strong> ${item.helix}
        </p>
        <p class="price"><strong>Set Price:</strong> ${item.price}</p>
        ${
          typeLinks[key]
            ? `<a href="${typeLinks[key]}" target="_blank" rel="noreferrer noopener">
                <button class="cta">Add Set to Cart</button>
              </a>`
            : `<button class="cta" type="button" onclick="alert('Checkout will open soon.');">Coming Soon</button>`
        }
      </article>
    `
    )
    .join("");
}

function setSelected(selector, target, attrName, attrValue) {
  document.querySelectorAll(selector).forEach((el) => {
    el.classList.toggle("selected", el === target);
  });
  if (attrName === "piercing") selectedPiercing = attrValue;
  if (attrName === "helix") selectedHelix = attrValue;
  render();
}

document.querySelectorAll("[data-piercing]").forEach((btn) => {
  btn.addEventListener("click", () => {
    selectedPiercing = btn.dataset.piercing;

    document.querySelectorAll(".pill[data-piercing]").forEach((el) => {
      el.classList.toggle("selected", el.dataset.piercing === selectedPiercing);
    });

    render();
    document.getElementById("selector").scrollIntoView({ behavior: "smooth" });
  });
});

document.querySelectorAll(".pill[data-piercing]").forEach((btn) => {
  btn.addEventListener("click", () =>
    setSelected(".pill[data-piercing]", btn, "piercing", btn.dataset.piercing)
  );
});

document.querySelectorAll(".pill[data-helix]").forEach((btn) => {
  btn.addEventListener("click", () =>
    setSelected(".pill[data-helix]", btn, "helix", btn.dataset.helix)
  );
});

render();
