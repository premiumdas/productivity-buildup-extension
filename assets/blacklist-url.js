
"use strict";

/* global chrome, window, document */

const textarea = document.getElementById("textarea");
const save = document.getElementById("save");
const checkbox = document.getElementById("checkbox");

textarea.placeholder = [
  "xyz.com",
  "abc.com"
].join("\n");

save.addEventListener("click", () => {
  const blocked = textarea.value.split("\n").map(urls => urls.trim()).filter(Boolean);

  chrome.storage.local.set({ blocked });
});

checkbox.addEventListener("change", (event) => {
  const enabled = event.target.checked;

  chrome.storage.local.set({ enabled });
});

window.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["blocked", "enabled"], function (local) {
    const { blocked, enabled } = local;
    if (!Array.isArray(blocked)) {
      return;
    }

    // blocked
    var value = blocked.join("\r\n"); // display every blocked in new line
    textarea.value = value;

    // enabled
    checkbox.checked = enabled;

    // show controls
    document.body.classList.add("ready");
  });
});