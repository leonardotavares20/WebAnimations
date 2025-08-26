function getPhotoId(_url) {
  const url = new URL(_url);
  const arr = url.pathname.split("/");

  return arr.includes("photo") && arr[arr.length - 1].split(".")[0];
}

window.addEventListener("pageswap", async (e) => {
  if (e.viewTransition) {
    const photoId = getPhotoId(e.activation.entry.url);

    if (photoId) {
      const grid = document.querySelector(".grid");
      const item = grid.children[photoId - 1];

      item.querySelector("img").style.viewTransitionName = "image";

      await e.viewTransition.finished;

      item.querySelector("img").style.viewTransitionName = "none";
    }
  }
});

window.addEventListener("pagereveal", async (e) => {
  if (e.viewTransition) {
    const fromUrl = navigation.activation.from.url;
    const currentUrl = navigation.activation.entry.url;

    if (!getPhotoId(currentUrl) && getPhotoId(fromUrl)) {
      const photoId = getPhotoId(fromUrl);
      const grid = document.querySelector(".grid");

      const item = grid.children[getPhotoId(fromUrl) - 1];

      item.querySelector("img").style.viewTransitionName = "image";

      await e.viewTransition.ready;

      item.querySelector("img").style.viewTransitionName = "none";
    }
  }
});
