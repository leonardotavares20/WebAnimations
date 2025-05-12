document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");

  // animate inicia sem chamar o metodo play

  const squareAnimation = element.animate(
    [
      { transform: "translateX(0)", easing: "ease-in" },
      { backgroundColor: "blue", offset: 0.8 }, // offset é a porcentagem da animacao que o keyframe vai ser executado
      {
        transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
        backgrundColor: "red",
      },
    ],
    {
      duration: 3000,
      easing: "ease-in-out",
      iterations: Infinity,
      direction: "alternate",
      fill: "forwards",
      iterationComposite: "accumulate",
      composite: "add",
      timeline: document.timeline,
    }
  );

  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("play")) {
        squareAnimation.play();
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
      }
      if (button.classList.contains("reverse")) {
        squareAnimation.reverse();
      }
      if (button.classList.contains("finish")) {
        squareAnimation.finish();
      }
    });

    const playbackRateInput = document.getElementById("playbackRateInput");
    const playbackRateInputValue = document.getElementById(
      "playbackRateInputValue"
    );

    playbackRateInput.addEventListener("input", (e) => {
      squareAnimation.updatePlaybackRate(e.target.value);
      playbackRateInputValue.value = e.target.value;
    });
  });

  // com new Animation e KeyframeEffect precisa chamar o metodo play para iniciar

  // const squareAnimationKeyframes = new KeyframeEffect(
  //   element,
  //   [
  //     { transform: "translateX(0)" },
  //     { backgrundColor: "blue", offset: 0.8 },
  //     {
  //       transform: "translateX(calc(100vw - 100px)) rotate(360deg)",
  //       backgrundColor: "red",
  //     },
  //   ],
  //   {
  //     duration: 3000,
  //     easing: "ease-in-out",
  //     iterations: Infinity,
  //     direction: "alternate",
  //     fill: "forwards",
  //     composite: "add",
  //   }
  // );

  // const squareAnimation = new Animation(
  //   squareAnimationKeyframes,
  //   document.timeline
  // );

  squareAnimation.play();
});
