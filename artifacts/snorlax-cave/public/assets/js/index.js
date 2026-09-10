const input = document.getElementById("search");
const form = input?.closest("form") || document.getElementById("proxy-search-form");

async function openProxy(event) {
  event?.preventDefault();
  if (!form || !input || form.dataset.proxySubmitting === "true") return;

  form.dataset.proxySubmitting = "true";

  try {
    if (!window.__uv$config?.prefix || typeof window.__uv$config.encodeUrl !== "function") {
      throw new Error("UV configuration did not load");
    }

    const registration = await window.navigator.serviceWorker.register("/sw.js", {
      scope: window.__uv$config.prefix,
    });
    await (registration.active ? Promise.resolve() : navigator.serviceWorker.ready);

    let url = input.value.trim();
    if (!url) throw new Error("Enter a URL or search term");
    if (!isUrl(url)) url = "https://www.google.com/search?q=" + encodeURIComponent(url);
    else if (!(url.startsWith("https://") || url.startsWith("http://"))) {
      url = "http://" + url;
    }

    localStorage.setItem("encodedUrl", window.__uv$config.encodeUrl(url));
    window.location.assign("/portal");
  } catch (error) {
    form.dataset.proxySubmitting = "false";
    console.error("Unable to start the proxy:", error);
  }
}

if (form && input && form.dataset.proxyBound !== "true") {
  form.dataset.proxyBound = "true";
  form.addEventListener("submit", openProxy);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") openProxy(event);
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