const input = document.getElementById("search");
const form = input?.form || document.querySelector("form");

if (form && input && form.dataset.proxyBound !== "true") {
  form.dataset.proxyBound = "true";

  form.addEventListener("submit", async (event) => {
  event.preventDefault();
    if (form.dataset.proxySubmitting === "true") return;
    form.dataset.proxySubmitting = "true";

    try {
      const registration = await window.navigator.serviceWorker.register("/sw.js", {
        scope: __uv$config.prefix,
      });
      await (registration.active ? Promise.resolve() : navigator.serviceWorker.ready);

      let url = input.value.trim();
      if (!isUrl(url)) url = "https://www.google.com/search?q=" + encodeURIComponent(url);
      else if (!(url.startsWith("https://") || url.startsWith("http://")))
        url = "http://" + url;
      localStorage.setItem("encodedUrl", __uv$config.encodeUrl(url));
      location.href = "/portal";
    } catch (error) {
      form.dataset.proxySubmitting = "false";
      console.error("Unable to start the proxy:", error);
    }
  });
}

function isUrl(val = "") {
  if (
    /^http(s?):\/\//.test(val) ||
    (val.includes(".") && val.substr(0, 1) !== " ")
  )
    return true;
  return false;
}