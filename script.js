const slider = document.getElementById("bgSlider");
const themeSlider = document.getElementById("themeSlider");
const toggleBtn = document.getElementById("toggleBtn");

// Gradient stops
const gradientStops = [
  { top: "#00172D", bottom: "#002244" }, // dark navy
  { top: "#002244", bottom: "#003366" }, // deep blue
  { top: "#003366", bottom: "#004080" }, // classic blue
  { top: "#004080", bottom: "#336699" }, // strong blue
  { top: "#336699", bottom: "#6699CC" }, // steel blue
  { top: "#6699CC", bottom: "#99BBE6" }, // sky blue
  { top: "#99BBE6", bottom: "#B0C4DE" }, // cloudy blue
];

function hexToRgb(hex) {
  const bigint = parseInt(hex.slice(1), 16);
  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255,
  };
}

function interpolateColor(c1, c2, t) {
  return {
    r: Math.round(c1.r + (c2.r - c1.r) * t),
    g: Math.round(c1.g + (c2.g - c1.g) * t),
    b: Math.round(c1.b + (c2.b - c1.b) * t),
  };
}

function rgbToCss(rgb) {
  return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function updateBackground(pos) {
  const total = gradientStops.length - 1;
  const normalized = (pos - 1) / 99;
  const idx = Math.floor(normalized * total);
  const t = (normalized * total) - idx;

  const from = gradientStops[idx];
  const to = gradientStops[idx + 1] || from;

  const topStart = hexToRgb(from.top);
  const bottomStart = hexToRgb(from.bottom);
  const topEnd = hexToRgb(to.top);
  const bottomEnd = hexToRgb(to.bottom);

  const topColor = interpolateColor(topStart, topEnd, t);
  const bottomColor = interpolateColor(bottomStart, bottomEnd, t);

  document.body.style.background = `linear-gradient(to bottom right, ${rgbToCss(topColor)}, ${rgbToCss(bottomColor)})`;

  // Save the current slider value to localStorage
  if (typeof pos !== 'undefined') {
    localStorage.setItem('bgSliderValue', pos);
  }
}

// Get saved slider value or default to 1
const savedSliderValue = localStorage.getItem('bgSliderValue') || '1';

if (slider && themeSlider && toggleBtn) {
  slider.value = savedSliderValue;
  slider.addEventListener("input", () => {
    updateBackground(slider.value);
  });

  toggleBtn.addEventListener("click", () => {
    themeSlider.classList.toggle("hidden");
  });

  updateBackground(slider.value);
} else {
  // Set background using saved value for non-slider pages
  updateBackground(savedSliderValue);
}
