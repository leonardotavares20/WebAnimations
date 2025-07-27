const wrapper = document.querySelector(".smooth-wrapper");
const content = document.querySelector(".content");
const progress = document.querySelector(".progress");
const progressInner = document.querySelector(".progress-inner");
const div = document.querySelector(".translatediv");
const div2 = document.querySelector(".translatediv2");

const container = document.querySelector(".container");
const square = document.querySelector(".square");
const square2 = document.querySelector(".square-2");
const square3 = document.querySelector(".square-3");

let currentScroll = 0;
let targetScroll = 0;

document.body.style.height = content.scrollHeight + "px";

const squareTimeline = square.animate(
  [
    { transform: "translateX(0)", easing: "ease-in" },
    { backgroundColor: "blue", offset: 0.8 },
    {
      transform: "translateX(calc(80vw - 100px)) rotate(360deg)",
      backgrundColor: "red",
    },
  ],
  {
    duration: 3000,
    // delay: 1000,
    fill: "both",
  }
);

const squareTimeline2 = square2.animate(
  [
    { transform: "translateX(0)", easing: "ease-in" },
    { backgroundColor: "blue", offset: 0.8 },
    {
      transform: "translateX(calc(80vw - 100px)) rotate(360deg)",
      backgrundColor: "red",
    },
  ],
  {
    duration: 1000,
    // delay: 1000,
    fill: "both",
  }
);

const squareTimeline3 = square3.animate(
  [
    { transform: "translateX(0)", easing: "ease-in" },
    { backgroundColor: "blue", offset: 0.8 },
    {
      transform: "translateX(calc(80vw - 100px)) rotate(360deg)",
      backgrundColor: "red",
    },
  ],
  {
    duration: 1000,
    // delay: 1000,
    fill: "both",
  }
);

squareTimeline.pause();
squareTimeline2.pause();
squareTimeline3.pause();

const animation = progressInner.animate([{ width: "100%" }, { width: "0%" }], {
  duration: 1,
  // fill: "both",
});

animation.pause();

const animationDiv = div.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(300px)" }],
  {
    duration: 1000,
    easing: "ease-in-out",
    fill: "both",
  }
);

const animationDiv2 = div2.animate(
  [{ transform: "translateX(0)" }, { transform: "translateX(300px)" }],
  {
    duration: 1000,
    easing: "ease-in-out",
    fill: "both",
  }
);

animationDiv.pause();
animationDiv2.pause();

animationDiv.onfinish = () => {
  animationDiv2.play();
};

let isDivVisible = false;

let progressCurrent = 0;
let progressTarget = 0;

let hasPlayed = false;
let hasPlayed2 = false;

function checkDivEntry() {
  const rect = div.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const triggerOffset = 0.2;
  // pra px -, pra porcentagem *
  //   if (!hasPlayed && rect.top < windowHeight - triggerOffset) {

  if (!hasPlayed && rect.top < windowHeight * triggerOffset) {
    animationDiv.play();
    hasPlayed = true;
  }
}

function checkSquareEntry() {
  const rect = container.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const triggerOffset = 0.2;
  // pra px -, pra porcentagem *
  //   if (!hasPlayed && rect.top < windowHeight - triggerOffset) {

  if (!hasPlayed2 && rect.top < windowHeight * triggerOffset) {
    timeline.play();
    // squareTimeline.play();
    // squareTimeline2.play();
    // timeline.play();

    hasPlayed2 = true;
  }
}

let isProgressVisible = false;
let hasStartedProgress = false;

function checkProgressEntry() {
  const rect = progress.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const offsetTrigger = 250; // 250px antes de aparecer

  const isAbove = rect.bottom < 0;
  const isBelow = rect.top > windowHeight + offsetTrigger;
  const isInRange = rect.top < windowHeight + offsetTrigger && rect.bottom > 0;

  //   console.log(rect.bottom < 0);

  if (!hasStartedProgress && !isProgressVisible && isInRange) {
    isProgressVisible = true;
    hasStartedProgress = true;
  }
  if (hasStartedProgress && (isAbove || isBelow)) {
    isProgressVisible = false;
    hasStartedProgress = false;
  }
}

function animateBar() {
  const rect = progress.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const height = progress.offsetHeight;

  const start = 100 - height; // progresso start entry
  const end = windowHeight - 300; // progresso start out

  progressTarget = Math.min(Math.max((rect.top - start) / (end - start), 0), 1);

  progressCurrent += (progressTarget - progressCurrent) * 0.7;
  // console.log(progressCurrent)

  animation.currentTime = progressCurrent;
}

function smoothScroll() {
  targetScroll = window.scrollY || window.pageYOffset;
  currentScroll += (targetScroll - currentScroll) * 0.07;

  wrapper.style.transform = `translateY(${-currentScroll}px)`;

  checkProgressEntry();
  checkSquareEntry();

  if (isProgressVisible) {
    animateBar();
  }
  checkDivEntry();

  requestAnimationFrame(smoothScroll);
}

smoothScroll();

function createTimeline(animations) {
  let rafIds = [];
  let index = 0;
  let startTimeStamp = 0;

  function playTimeline() {
    startTimeStamp = performance.now();

    animations.forEach((element, index) => {
      const { animation, start = null } = element;

      if (start !== null) {
        const startTime = start;

        function tick() {
          const now = performance.now();

          if (now - startTimeStamp >= startTime) {
            animation.play();
          } else {
            rafIds[index] = requestAnimationFrame(tick);
          }
        }

        tick();
      } else {
        const prev = animations[index - 1];

        if (prev) {
          prev.animation.onfinish = () => {
            animation.play();
          };
        } else {
          animation.play();
        }
      }
    });
  }

  return {
    play: () => {
      rafIds.forEach((rafId) => cancelAnimationFrame(rafId));
      rafIds = [];

      playTimeline();
    },
    stop() {
      rafIds.forEach((rafId) => cancelAnimationFrame(rafId));
      rafIds = [];
    },
  };
}

const timeline = createTimeline([
  { animation: squareTimeline },
  { animation: squareTimeline2, start: 500 },
  { animation: squareTimeline3 },
]);

// function watchEntry(element, triggerCallback, options = {}) {
//   const {
//     triggerOffset = 0,
//     once = true,
//     triggerPercent = null,
//   } = options;

//   let hasTriggered = false;

//   function check() {
//     const rect = element.getBoundingClientRect();
//     const winHeight = window.innerHeight;

//     const triggerPoint = triggerPercent
//       ? winHeight * triggerPercent
//       : winHeight - triggerOffset;

//     if (!hasTriggered && rect.top < triggerPoint) {
//       triggerCallback();
//       if (once) hasTriggered = true;
//     }
//   }

//   return { check };
// }

// const watcher = watchEntry(div, () => animationDiv.play(), {
//   triggerOffset: 200,
//   once: true,
// });

// function smoothScroll() {
//   // ...
//   watcher.check();
//   // ...
// }
