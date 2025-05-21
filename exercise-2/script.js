document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");

  const characterAnimation = character.animate(
    [
      { backgroundPosition: "0 0" },
      { backgroundPosition: "calc(var(--char-width) * -7) 0px" },
    ],
    {
      id: "run",
      duration: 1000,
      iterations: Infinity,
      easing: "steps(8, jump-none)",
    }
  );

  function jumpCharacter() {
    if (character.getAnimations().find((animation) => animation.id === "jump"))
      return;
    characterAnimation.pause();
    character.classList.add("jump");
    const jumpAnimation = character.animate(
      [{ transform: "translateY(0)" }, { transform: "translateY(-100px)" }],
      {
        id: "jump",
        duration: 500,
        iterations: 2,
        direction: "alternate",
        easing: "ease-in-out",
      }
    );

    jumpAnimation.onfinish = () => {
      characterAnimation.play();
      character.classList.remove("jump");
    };
  }

  document.addEventListener("keyup", (e) => {
    switch (e.code) {
      case "ArrowUp":
        jumpCharacter();
        break;
      case "ArrowRight":
        jumpCharacter();
        break;
      case "ArrowLeft":
        jumpCharacter();
        break;

      default:
        break;
    }
  });
});
