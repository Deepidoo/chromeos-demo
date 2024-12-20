let EXTID = "iofcikaolamaedhglbajjkbmdlleabed";
function reboot() {
  console.log("REBOOTING...");
  chrome.runtime.sendMessage(EXTID, { action: "power/reboot" }, function (res) {
    if (res && !res.error) {
      resolve(res);
    } else {
      const errmsg = (res && res.error) || JSON.stringify(res);
      reject(errmsg);
    }
  });
}

function delayReboot() {
  const textNode = document.createElement("h1");
  let i = 10;
  setInterval(() => {
    textNode.textContent = "Reboot in: " + i;
    document.body.appendChild(textNode);

    if (i < 1) {
      reboot();
    }
    i--;
  }, 1000);
}
