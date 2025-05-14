document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");

  // animate inicia sem chamar o metodo play

  // playback rate pertence a animation object
  // duration pertence a keyframe effect

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
      delay: 1000,
      easing: "ease-in-out",
      iterations: 2,
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
      if (button.classList.contains("changeAnimation")) {
        squareAnimation.effect.setKeyframes([
          { transform: "translateY(0)", easing: "ease-in" },
          { backgroundColor: "blue", offset: 0.8 },
          {
            transform: "translateY(calc(100vw - 100px)) rotate(360deg)",
            backgrundColor: "red",
          },
        ]);
      }
      if (button.classList.contains("logInfo")) {
        console.log("currentTime", squareAnimation.currentTime);
        console.log("startTime", squareAnimation.startTime);
        console.log("playbackRate", squareAnimation.playbackRate);
        console.log("playbackState", squareAnimation.playState);
        console.log("Keyframes", squareAnimation.effect.getKeyframes());
        console.log("Timing", squareAnimation.effect.getTiming());
        console.log(
          "ComputedTiming",
          squareAnimation.effect.getComputedTiming()
        );
      }
    });

    const playbackRateInput = document.getElementById("playbackRateInput");
    const playbackRateInputValue = document.getElementById(
      "playbackRateInputValue"
    );

    playbackRateInput.value = squareAnimation.playbackRate;
    playbackRateInputValue.value = squareAnimation.playbackRate;

    playbackRateInput.addEventListener("input", (e) => {
      squareAnimation.updatePlaybackRate(e.target.value);
      playbackRateInputValue.value = e.target.value;
    });

    const durationInput = document.getElementById("durationInput");
    const durationInputValue = document.getElementById("durationInputValue");

    durationInput.value = squareAnimation.effect.getTiming().duration;
    durationInputValue.value = squareAnimation.effect.getTiming().duration;

    durationInput.addEventListener("input", (e) => {
      squareAnimation.effect.updateTiming({ duration: +e.target.value });
      durationInputValue.value = e.target.value;
    });

    const infiniteInput = document.getElementById("infiniteInput");

    infiniteInput.addEventListener("change", (e) => {
      squareAnimation.effect.updateTiming({
        iterations: e.target.checked ? Infinity : 2,
      });
    });

    infiniteInput.checked =
      squareAnimation.effect.getTiming().iterations === Infinity;
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

  // squareAnimation.currentTime =
  //   squareAnimation.effect.getComputedTiming().activeDuration / 2 +
  //   squareAnimation.effect.getComputedTiming().delay;

  const currentTime = document.getElementById("currentTime");
  const currentTimeValue = document.getElementById("currentTimeValue");

  currentTime.value = squareAnimation.currentTime;
  currentTimeValue.value = squareAnimation.currentTime;

  currentTime.addEventListener("input", (e) => {
    squareAnimation.currentTime = e.target.value;
    currentTimeValue.value = e.target.value;
  });

  const startTime = document.getElementById("startTime");
  const startTimeValue = document.getElementById("startTimeValue");

  startTime.value = squareAnimation.startTime ? squareAnimation.startTime : 0;
  startTimeValue.value = squareAnimation.startTime
    ? squareAnimation.startTime
    : 0;

  startTime.addEventListener("input", (e) => {
    squareAnimation.startTime = e.target.value;
    startTimeValue.value = e.target.value;
  });

  // squareAnimation.startTime = 3000;
});
