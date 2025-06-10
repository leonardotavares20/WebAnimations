document.addEventListener("DOMContentLoaded", () => {
  const character = document.querySelector(".character");
  const street = document.querySelector(".street");
  const background = document.querySelector(".background");
  const foreground = document.querySelector(".foreground");
  const carWrapper = document.querySelector(".car-wrapper");

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
      id: "foreground",
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

  async function addNewCar() {
    if (
      streetAnimation.playState === "paused" ||
      document.querySelector(".car")
    )
      return;
    const car = document.createElement("div");
    car.classList.add("car");

    const carAnimation = car.animate(
      [
        {
          transform: "translateX(-100vw)",
        },
        {
          transform: "translateX(100vw)",
        },
      ],
      {
        id: "car",
        duration: Math.random() * 4000 + 200,
        iterations: 1,
        easing: "linear",
      }
    );

    ["::before", "::after"].forEach((pseudoElement) => {
      car.animate(
        [
          {
            transform: "rotate(0)",
          },
          {
            transform: "rotate(360deg)",
          },
        ],
        {
          id: "car",
          pseudoElement: pseudoElement,
          iterations: Infinity,
          easing: "linear",
          duration: carAnimation.effect.getComputedTiming().duration / 4,
        }
      );
    });

    carWrapper.appendChild(car);

    await carAnimation.finished;

    car.remove();

    setTimeout(() => {
      if (streetAnimation.playState === "running") addNewCar();
    }, Math.random() * 4000);
  }

  streetAnimation.ready.then(() => {
    addNewCar();
  });

  function togglePlaystate() {
    document.getAnimations().forEach((animation) => {
      if (animation.playState === "paused") {
        animation.play();
      } else {
        animation.pause();
      }
    });
    addNewCar();
  }

  function runFaster() {
    document.getAnimations().forEach((animation) => {
      if (animation.id === "car") return;
      animation.updatePlaybackRate(animation.playbackRate + 0.1);
    });
  }

  function runSlower() {
    document.getAnimations().forEach((animation) => {
      if (animation.id === "car") return;
      animation.updatePlaybackRate(animation.playbackRate - 0.1);
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

    const { duration, iterations, easing, direction } =
      jumpAnimation.effect.getComputedTiming();

    const shadow = document.querySelector(".shadow");

    shadow.animate(
      [
        {
          transform: "scale(1)",
        },
        {
          transform: "scale(1.15)",
        },
      ],
      {
        id: "shadow",
        duration: duration,
        iterations: iterations,
        direction: direction,
        easing: easing,
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
