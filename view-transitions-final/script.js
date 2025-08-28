document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  const header = document.querySelector(".header");
  const gridOuter = document.querySelector(".grid-outer");
  const main = document.querySelector(".main .item");
  const gridButton = document.querySelector(".grid-view-button");

  function populateItemViewTransitionName(clear) {
    grid.querySelectorAll(".grid-item").forEach((item, index) => {
      item.style.viewTransitionName = clear ? "none" : `grid-item-${index}`;
    });
  }

  populateItemViewTransitionName();

  function expandImage(item) {
    const title = item.querySelector("h3").innerText;
    const largeImage = item.dataset.largeImage;
    main.querySelector("h2").innerText = title;
    main.querySelector("img").src = largeImage;
    gridButton.style.display = "block";
    header.classList.add("expanded");
    gridOuter.classList.add("expanded");

    grid
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
    item.classList.add("active");

    grid.style.viewTransitionName = "grid";
  }

  function displayGrid() {
    document.documentElement.scrollTop = 0;
    gridButton.style.display = "none";
    grid.style.viewTransitionName = "none";
    gridOuter.classList.remove("expanded");
    header.classList.remove("expanded");
    grid
      .querySelectorAll(".active")
      .forEach((e) => e.classList.remove("active"));
  }

  grid.addEventListener("click", async (e) => {
    const item = e.target.closest(".grid-item");
    if (!item || item.classList.contains("active")) return;

    if (!document.startViewTransition) {
      expandImage(item);
      return;
    }

    const thumbnail = item.querySelector("img");
    const largeImage = main.querySelector("img");

    thumbnail.style.viewTransitionName = "image";
    largeImage.style.viewTransitionName = "none";

    const transition = document.startViewTransition(() => {
      thumbnail.style.viewTransitionName = "none";
      largeImage.style.viewTransitionName = "image";
      expandImage(item);
    });

    await transition.finished;

    populateItemViewTransitionName(true);

    // thumbnail.style.viewTransitionName = "none";
    // largeImage.style.viewTransitionName = "none";

    // sem o await o scrollIntoView não funcionaria pq ele precisa que o novo estado do DOM esteja pronto
    // sem o await ele seria executado antes mesmo do DOM ser atualizado
    // e o scrollIntoView não é uma promise, então não podemos usar await nele
    // mas podemos usar o transition.finished para garantir que o DOM foi atualizado antes de chamar scrollIntoView
    // e assim garantir que o scroll será suave e não vai pular para o topo da página

    item.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });

    // transition.skipTransition();

    // try {
    //   await transition.ready;
    //   console.log(
    //     "View transition is ready, pseudo-element tree is created and the animation is about to start."
    //   );
    // } catch (e) {
    //   console.error("View transition failed transition.ready:", e);
    // }

    // try {
    //   await transition.updateCallbackDone;
    //   console.log(
    //     "View transition is done. DOM was updated successfully. but that does not guarantee that the transition was successful."
    //   );
    // } catch (e) {
    //   console.error("View transition failed transition.updateCallbackDone:", e);
    // }

    // try {
    //   await transition.finished;
    //   console.log(
    //     "View transition is finished. and the new page view is visible and interactive to the user."
    //   );
    // } catch (e) {
    //   console.error("View transition failed transition.finished:", e);
    // }
  });

  gridButton.addEventListener("click", async (e) => {
    if (!document.startViewTransition) {
      displayGrid();
      return;
    }

    const activeThumbnail = grid.querySelector(".active img");
    const largeImage = main.querySelector("img");

    // largeImage.style.viewTransitionName = "image";
    // activeItem.style.viewTransitionName = "none";

    populateItemViewTransitionName();

    const transition = document.startViewTransition(() => {
      activeThumbnail.style.viewTransitionName = "image";
      largeImage.style.viewTransitionName = "none";
      displayGrid();
    });

    await transition.finished;

    activeThumbnail.style.viewTransitionName = "none";
    largeImage.style.viewTransitionName = "none";
  });
});

// Transition on view:root

// document.addEventListener("DOMContentLoaded", () => {
//   const grid = document.querySelector(".grid");
//   const header = document.querySelector(".header");
//   const gridOuter = document.querySelector(".grid-outer");
//   const main = document.querySelector(".main .item");
//   const gridButton = document.querySelector(".grid-view-button");

//   function expandImage(item) {
//     const title = item.querySelector("h3").innerText;
//     const largeImage = item.dataset.largeImage;
//     main.querySelector("h2").innerText = title;
//     main.querySelector("img").src = largeImage;
//     gridButton.style.display = "block";
//     header.classList.add("expanded");
//     gridOuter.classList.add("expanded");

//     grid
//       .querySelectorAll(".active")
//       .forEach((e) => e.classList.remove("active"));
//     item.classList.add("active");
//   }

//   function displayGrid() {
//     document.documentElement.scrollTop = 0;
//     gridButton.style.display = "none";
//     gridOuter.classList.remove("expanded");
//     header.classList.remove("expanded");
//     grid
//       .querySelectorAll(".active")
//       .forEach((e) => e.classList.remove("active"));
//   }

//   grid.addEventListener("click", async (e) => {
//     const item = e.target.closest(".grid-item");
//     if (!item || item.classList.contains("active")) return;

//     if (!document.startViewTransition) {
//       expandImage(item);
//       return;
//     }

//     const { top, left, right, bottom } = item.getBoundingClientRect();

//     const transition = document.startViewTransition(() => {
//       expandImage(item);
//     });

//     await transition.ready;

//     document.documentElement.animate(
//       [
//         {
//           clipPath: `inset(${top}px ${innerWidth - right}px ${
//             innerHeight - bottom
//           }px ${left}px)`,
//           filter: "contrast(0.3)",
//         },
//         {
//           clipPath: "inset(0%)",
//           filter: "contrast(1)",
//         },
//       ],
//       {
//         duration: 200,
//         easing: "ease-in-out",
//         pseudoElement: "::view-transition-new(root)",
//       }
//     );

//     await transition.finished;

//     item.scrollIntoView({
//       behavior: "smooth",
//       block: "nearest",
//     });
//   });

//   gridButton.addEventListener("click", async (e) => {
//     if (!document.startViewTransition) {
//       displayGrid();
//       return;
//     }

//     document.documentElement.classList.add("back");

//     const transition = document.startViewTransition(() => {
//       displayGrid();
//     });

//     await transition.finished;

//     document.documentElement.classList.remove("back");
//   });
// });
