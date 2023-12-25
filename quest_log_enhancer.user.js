// ==UserScript==
// @name          Quest Log Enhancer
// @version       1.0.0
// @description   Enhances Quest Log with clickable links
// @author        NeoRich
// @match         *://www.neopets.com/questlog
// @match         *://www.neopets.com/questlog/*
// @grant         none
// @updateURL     https://github.com/neo-rich/userscripts/raw/main/quest_log_enhancer.user.js
// ==/UserScript==

(function () {
  const LINK_REPLACE_MAP = {
    "Wheel of Knowledge": "/medieval/knowledge.phtml",
    "Wheel of Excitement": "/faerieland/wheel.phtml",
    "Wheel of Mediocrity": "/prehistoric/mediocrity.phtml",
    "Wheel of Misfortune": "/halloween/wheel/index.phtml",
    "Customise": "/customise"
  }

  const questLogDescriptions = document.querySelectorAll(".ql-quest-description");

  for (const description of questLogDescriptions) {
    const textContent = description?.textContent ?? "";

    for (const [linkText, href] of Object.entries(LINK_REPLACE_MAP)) {
      if (textContent.includes(linkText)) {
        description.innerHTML = description.innerHTML.replaceAll(linkText, `<a href="${href}" target="_blank">${linkText}</a>`)
      }
    }
  }
})()
