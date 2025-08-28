document.addEventListener("DOMContentLoaded", () => {
  const logoSVG = document.getElementById("logo");
  const logoSVGPath = document.querySelector(".cls-1");

  logoSVGPath.addEventListener("animationend", () => {
    logoSVG.classList.remove("animate");
    setTimeout(() => {
      logoSVG.classList.add("animate");
    }, 5000);
  });

  const mediaQuery = matchMedia("(prefers-reduced-motion)");

  const checkReduceMotion = () => {
    const videos = document.querySelectorAll(".bg-video");
    if (mediaQuery.matches) {
      videos.forEach((video) => {
        video.pause();
      });
    } else {
      videos.forEach((video) => {
        video.play();
      });
    }
  };

  checkReduceMotion();
  mediaQuery.addEventListener("change", checkReduceMotion);
});
