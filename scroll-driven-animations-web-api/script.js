document.addEventListener("DOMContentLoaded", () => {
  const containerOne = document.querySelector(".c-1");
  const containerTwo = document.querySelector(".c-2");

  const progress = document.querySelector(".p-1");
  // const progressBarTwo = document.querySelector(".progress-bar-2");

  const rect = progress.getBoundingClientRect();

  const absoluteTop = rect.top + window.scrollY;

  const timeline = new ScrollTimeline({
    source: containerTwo,
    axis: "block",
  });

  const view = new ViewTimeline({
    subject: progress,
    axis: "block",
    // inset: [CSS.percent(20), CSS.percent(20)],
  });

  console.log(timeline);
  // currentTime, mostra a porcentagem da animacao, inicialmente com um valor negativo que significa que a animacao ainda nao iniciou, e conforme vai se aproximando do target, esse valor vai aumentando, quando ele chegar no target, ele vai ser 0 e quando ele acabar, vai ser 100
  // startOffset, mostra o valor em pixels que faltam pra o target ser alcancado e animacao iniciar
  // endOffset, mostra o valor em pixel que faltam pra o target ser alcancado e animacao terminar

  const animationtest = containerOne.animate([{ backgroundColor: "gold" }], {
    timeline: timeline,
    fill: "both",
  });

  const animation = progress.animate([{ width: "0%" }, { width: "100%" }], {
    timeline: view,
    fill: "both",
    rangeStart: {
      rangeName: "contain",
      offset: CSS.px(100),
    },
  });

  containerTwo.animate([{ backgroundColor: "gold" }], {
    timeline: view,
    fill: "both",
    rangeStart: {
      rangeName: "contain",
      offset: CSS.percent(20),
    },
    rangeEnd: {
      rangeName: "contain",
      offset: CSS.percent(80),
    },
  });

  view.source.onscroll = () => {
    const rect = progress.getBoundingClientRect();
    console.log("top na viewport", rect.top);
  };

  timeline.source.onscroll = () => {
    console.log("onscroll", absoluteTop);

    // console.log("onscroll", rect);
    // console.log("onscroll", animation.effect.getComputedTiming().delay);
    // console.log("onscroll", animation.currentTime);
    // animation.currentTime = 50;
    // console.log(progress.offsetTop);
    // animateBar(inner.offsetTop, inner.offsetHeight + inner.offsetTop - 100);
  };
});
