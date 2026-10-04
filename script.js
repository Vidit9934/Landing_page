function openDirect(appUri, webUri) {
  let appOpened = false;

  const onBlur = () => { appOpened = true; };
  const onVisibilityChange = () => {
    if (document.hidden) appOpened = true;
  };

  window.addEventListener("blur", onBlur, { once: true });
  document.addEventListener("visibilitychange", onVisibilityChange, { once: true });

  window.location.href = appUri;

  setTimeout(() => {
    window.removeEventListener("blur", onBlur);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    if (!appOpened) {
      window.location.href = webUri;
    }
  }, 1200);
}

document.querySelectorAll(".btn[data-app-uri]").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    openDirect(link.dataset.appUri, link.href);
  });
});
