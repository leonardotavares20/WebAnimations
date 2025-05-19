document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");
  // const elementTwo = document.querySelector(".square-3");

  // animate inicia sem chamar o metodo play

  // playback rate pertence a animation object
  // duration pertence a keyframe effect

  // elementTwo.animate(
  //   [{ backgroundColor: "red" }, { backgroundColor: "blue" }],
  //   {
  //     duration: 2000,
  //     iterations: Infinity,
  //     direction: "alternate",
  //   }
  // );

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
      iterations: 1,
      direction: "alternate",
      fill: "both",
      iterationComposite: "accumulate",
      composite: "replace",
      timeline: document.timeline,
    }
  );

  const buttons = document.querySelectorAll(".button");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("play")) {
        squareAnimation.play();
        console.log("pending", squareAnimation.pending);
        squareAnimation.ready.then(() => {
          console.log("playstate after play", squareAnimation.playState);
          console.log("pending", squareAnimation.pending);
        });
      }
      if (button.classList.contains("pause")) {
        squareAnimation.pause();
        squareAnimation.ready.then(() => {
          console.log("playstate after pause", squareAnimation.playState);
        });
      }
      if (button.classList.contains("cancel")) {
        squareAnimation.cancel();
        squareAnimation.ready.then(() => {
          console.log("playstate after cancel", squareAnimation.playState); // idle significa que nao ha currentTime na animacao, e tambem nao ha tasks pendentes
        });
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
  squareAnimation.play();

  // a propriedade depending vai indicar se a animacao esta esperando por uma operacao assincrona
  // metodos como play e pause sao metodos assincronos; quando chamados, eles demoram algum tempo para serem executados
  // a propriedade ready vai indicar quando a animacao estiver pronta para ser executada, ela é uma promise, portanto pode ser usada com then ou await, e é executada assincronamente
  console.log("playstate after pause", squareAnimation.playState);
  console.log("pending after pause", squareAnimation.pending);

  squareAnimation.ready.then(() => {
    console.log("ready animation");
    console.log("playstate after ready", squareAnimation.playState);
    console.log("playstate after ready", squareAnimation.pending);
  });

  squareAnimation.play();

  console.log("playstate after play", squareAnimation.playState);
  console.log("pending after play", squareAnimation.pending);

  // squareAnimation.finished.then(() => {
  //   console.log("finished animation");
  //   console.log("playstate after finished", squareAnimation.playState);
  //   console.log("pending after finished", squareAnimation.pending);
  //   element.remove()
  // })

  // squareAnimation.addEventListener("finish", () => {
  //   console.log("finished animation");
  //   console.log("playstate after finished", squareAnimation.playState);
  //   console.log("pending after finished", squareAnimation.pending);
  //   element.remove();
  // });

  squareAnimation.addEventListener("cancel", () => {
    console.log("finished animation");
    console.log("playstate after cancel", squareAnimation.playState);
    console.log("pending after cancel", squareAnimation.pending);
    // element.remove();
  });

  // metodos uteis para acessibilidade, caso o usuario queira desativar as animacoes do site, ou deixar elas mais lentas ou rapidas

  // console.log(document.getAnimations());

  // console.log("element 1", element.getAnimations({ subtree: true }));
  // console.log("element 2", elementTwo.getAnimations());

  const speedButtons = document.querySelectorAll(".speedButton");

  speedButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("increase")) {
        document.getAnimations().forEach((animation) => {
          animation.updatePlaybackRate(animation.playbackRate + 0.1);
        });
      }

      if (button.classList.contains("decrease")) {
        document.getAnimations().forEach((animation) => {
          animation.updatePlaybackRate(animation.playbackRate - 0.1);
        });
      }
    });
  });

  // commitStyles mantem as animacoes quando o fill mode for forwards ou both, em que o elemento permanece na posicao final definida, no entanto, nao sendo mais mantido pelo browser, o que afeta a performace, mas sim pelos estilos da animacao diretamente no elemento.

  squareAnimation.addEventListener("finish", () => {
    squareAnimation.commitStyles();
    squareAnimation.cancel();
    element.style.transform = "translateX(30px)";
  });
});
