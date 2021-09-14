import "regenerator-runtime/runtime.js";
import "./../styles/presentation.css";
import Reveal from "reveal.js";
import RevealMath from "reveal.js/plugin/math/math.esm.js";

new Reveal({
  plugins: [RevealMath],
  controlsTutorial: true,
  overview: true,
  touch: true,
  slideNumber: true,
  showSlideNumber: "all",
}).initialize();
