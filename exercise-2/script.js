document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");
  const street = document.querySelector(".street");
  const background = document.querySelector(".background");
  const foreground = document.querySelector(".foreground");

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

  const streetAnimation = street.animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-50%)" }],
    {
      id: "street",
      duration: 12000,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const foregroundAnimation = foreground.animate(
    [{ transform: "translateX(200%)" }, { transform: "translateX(-200%)" }],
    {
      id: "foregrund",
      duration: streetAnimation.effect.getComputedTiming().duration * 1.5,
      iterations: Infinity,
      easing: "linear",
    }
  );

  const backgroundAnimation = background.animate(
    [{ transform: "translateX(100%)" }, { transform: "translateX(-100%)" }],
    {
      id: "background",
      duration: streetAnimation.effect.getComputedTiming().duration * 2,
      iterations: Infinity,
      easing: "linear",
    }
  );

  function togglePlaystate() {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === "paused") {
        animation.play();
      } else {
        animation.pause();
      }
    });
  }

  function runFaster() {
    document.getAnimations().forEach((animation) => {
      animation.updatePlaybackRate(animation.playbackRate + 0.1);
    });
  }

  function runSlower() {
    document.getAnimations().forEach((animation) => {
      animation.updatePlaybackRate(animation.playbackRate -  0.1);
    });
  }

  function jumpCharacter() {
    if (
      document
        .getAnimations()
        .some((animation) => animation.playState === "paused") ||
      character.getAnimations().find((animation) => animation.id === "jump")
    )
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
        runFaster();
        break;
      case "ArrowLeft":
        runSlower();
        break;
      case "Space":
        togglePlaystate();
        break;

      default:
        break;
    }
  });
});
