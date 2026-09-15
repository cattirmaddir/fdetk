function apps(url) {
    window.navigator.serviceWorker.register('/sw.js', {
        scope: __uv$config.prefix
    }).then(() => {
        const encodedUrl = __uv$config.encodeUrl(url);
        localStorage.setItem('agUrl', __uv$config.prefix + encodedUrl);
        window.location.assign('/dashboard');
    }).catch((error) => {
        console.error('Unable to open proxied app:', error);
    });
  }
  
  function openLink(url) {
        const target = new URL(/^https?:\/\//i.test(url) ? url : 'https://' + url);

        if (target.hostname === 'play.geforcenow.com') {
            window.location.assign(target.href);
            return;
        }

        if (target.hostname === 'nvidia.com' || target.hostname.endsWith('.nvidia.com')) {
            window.location.assign(target.href);
            return;
        }

        apps(target.href);
  }
  
  function ourDiscord() {
      window.location.href = 'https://discord.gg/snorlaxscave';
  }
  
  
  function patreon() {
      window.location.href = 'https://patreon.com/SnorlaxCave';
  }
  
  function email() {
      window.location.href = 'birdy@snorlaxscave.site';
  }
  
  function ourgithub() {
      window.location.href = 'https://github.com/Snorlaxs-Cave/Snorlaxs-Cave-v2';
  }
  
  function bgChange(color) {
      localStorage.setItem("color", color)
      window.location = window.location
  }
  
  function setImageBackground() {
      var url = document.getElementById('imageUrl').value;
      localStorage.setItem("backgroundImage", url);
      window.location.reload();
  }
  function setName() {
      const input = document.getElementById('name');
      const newTabName = input.value;
  
      document.title = newTabName;
      localStorage.setItem('tabName', newTabName);
    }
function cloak() {
    let url = window.location.href;
    var w = window.open("about:blank", "_blank");
    w.document.write('<iframe style="position: absolute;top: 0px;bottom: 0px;right: 0px;width: 100%;border: none;margin: 0;padding: 0;overflow: hidden;z-index: 99999;height: 100%;" src="' + url + '"></iframe>');
    window.close('', '_parent', '');
}
