document.addEventListener("DOMContentLoaded", () => {
  const element = document.querySelector(".square");

  // animate inicia sem chamar o metodo play

  const squareAnimation = element.animate(
    [
      { transform: "translateX(0)" },
      { backgrundColor: "blue", offset: 0.8 },
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
      composite: "add",
      timeline: document.timeline,
    }
  );

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
