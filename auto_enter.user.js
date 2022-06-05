// ==UserScript==
// @name         Neopets Auto Enter Haggle & Till
// @version      1.0
// @description  Automatically enters haggle price and shop till value in the form
// @author       NeoRich
// @match        *://www.neopets.com/haggle.phtml*
// @match        *://www.neopets.com/market.phtml?type=till
// @grant        none
// @updateURL    https://github.com/neo-rich/userscripts/raw/main/auto_enter.user.js
// ==/UserScript==

(function () {
    const path = window.location.pathname;
  
    switch (true) {
      case (path.includes("haggle")):
        document.querySelector("input[name=current_offer]").value = document.querySelector("#shopkeeper_makes_deal p b").textContent.match(/\d{1,3}(,\d{3})*(\.\d\d)?|\.\d\d Neopoints/)[0].replace(",", "");
      break;
      case (path.includes("market")):
        document.querySelector("input[name=amount]").value = document.evaluate("//b[contains(., 'NP')]", document).iterateNext().textContent.match(/\d{1,3}(,\d{3})*(\.\d\d)?|\.\d\d NP/)[0].replace(",", "");
      break;
    }
})();
