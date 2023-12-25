// ==UserScript==
// @name          Neopets Quick Menu
// @version       1.2.0
// @description   Adds a quick access menu to all Neopets pages
// @author        NeoRich
// @match         *://www.neopets.com/*
// @exclude-match *://www.neopets.com/~*
// @grant         none
// @updateURL     https://github.com/neo-rich/userscripts/raw/main/quickmenu.user.js
// @downloadURL   https://github.com/neo-rich/userscripts/raw/main/quickmenu.user.js
// ==/UserScript==

(function () {
    // Return early if in iframe (trudys surprise)
    const inIframe = window.location !== window.parent.location;
    const inPopup = window.opener && window.opener !== window;
    if (inIframe || inPopup) return -1;
  
    function addStyle(css) {
        let head = document.head;
        let style = document.createElement('style');
        head.appendChild(style);
        style.appendChild(document.createTextNode(css));
    }

    addStyle(`
        .gm-menu {
            position: fixed;
            top: 10px;
            left: 60px;
            border: 1px solid black;
            border-radius: 0.3em;
            background-color: lightgray;
            font-family: monospace;
            text-align: left;
            z-index: 10000;
            font-size: 1rem;
            box-shadow: 0 2px 6px 0 rgba(0, 0, 0, .25), 0 3px 10px 7px rgba(0, 0, 0, 0.08);
        }
        
        .gm-menu ul {
            padding-left: 0;
            margin: 0.4em;
            line-height: 1.4;
            list-style-type: none;
        }
        .gm-menu a {
            color: black;
            font-weight: 600;
            text-decoration: none;
        }
        .gm-menu #gm-shopnum {
            width: 6em;
        }
        .gm-menu.legacy {
            left: 10px;
        }
        
        .top-right {
            position: absolute;
            right: 2px;
            top: 0;
        }
        
        .btn {
            cursor: pointer;
        }
        .btn:hover {
            color: gray;
        }
        .btn:active {
            color: red;
        }
        

    `)
  
    const menu = document.createElement("div");
  
    const isLegacyPage = () => { return !document.querySelector(".nav-top__2020"); }
    
    let currentShopID = 1;
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get("type") === "shop") {
        currentShopID = parseInt(searchParams.get("obj_type"), 10);
    }
    
    menu.innerHTML = `
      <div class="gm-menu${isLegacyPage() ? ' legacy' : ''}">
        <div class="top-right">
          ${ window.neorichTO !== undefined ? `<span class="gm-menu-timeout-button btn">clearTO</span>` : "" }
          <span class="gm-menu-close btn">x</span>
        </div>
        <ul>
            <li><a href="/questlog">Quest Log</a></li>
            <li><a href="/bank.phtml">Bank</a></li>
            <li><a href="/quickref.phtml">QuickRef</a></li>
            <li><a href="/inventory.phtml">Inventory</a>&nbsp;(<a href="/safetydeposit.phtml">SDB</a>)</li>
            <li><a href="/market.phtml?type=your">Shop Stock</a>&nbsp;(<a href="/market.phtml?type=till">Till</a>)</li>
            <li><a href="/stockmarket.phtml?type=list&bargain=true">Stocks</a>&nbsp;(<a href="/stockmarket.phtml?type=portfolio">Portfolio</a>)</li>
            <li><a href="/objects.phtml?obj_type=1&type=shop" class="gm-link-shop">Shop #</a><input type="number" id="gm-shopnum" name="gm-shopnum" value="${currentShopID}" min="1"></li>
        </ul>
      </div>
    `
  
    document.body.appendChild(menu);

    document.querySelector("#gm-shopnum").addEventListener("input", function() {
        let shopNum = this.value;
        document.querySelector(".gm-link-shop").href = `/objects.phtml?obj_type=${shopNum}&type=shop`;
    })
    document.querySelector("#gm-shopnum").addEventListener("keydown", function() {
        if(event.key === 'Enter') {
          window.location = document.querySelector(".gm-link-shop").href;
        }
    })
  
    document.querySelector(".gm-menu-close").addEventListener("click", () => {
      document.querySelector(".gm-menu").remove();
    })
  
    if (window.neorichTO !== undefined) {
      document.querySelector(".gm-menu-timeout-button").addEventListener("click", () => {
        document.querySelector(".gm-menu-timeout-button").remove();
        removeAllTimeouts();
      })
    }
  
    function removeTimeout(name) {
        if (window.neorichTO === undefined) {
          window.neorichTO = {}
          console.error(`Can't delete timeout "${name}"`)
        }

        if (window.neorichTO[name]) {
          clearTimeout(window.neorichTO[name]);
          console.info(`Removed timeout "${name}".`)
        } else {
          console.error(`Can't find timeout "${name}", not deleted.`)
        }
    }
  
    function removeAllTimeouts() {
      for (let to of Object.keys(window.neorichTO)) {
        removeTimeout(to);
      }
    }
})()
