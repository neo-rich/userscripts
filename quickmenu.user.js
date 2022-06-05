// ==UserScript==
// @name          Neopets Quick Menu
// @version       1.0
// @description   Adds a quick access menu to all Neopets pages
// @author        NeoRich
// @match         *://www.neopets.com/*
// @exclude-match *://www.neopets.com/~*
// @grant         none
// @updateURL     https://github.com/neo-rich/userscripts/raw/main/quickmenu.user.js
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

        .gm-menu-close {
            position: absolute;
            right: 2px;
            top: 0;
            cursor: pointer;
        }
    `)
  
    const menu = document.createElement("div");
  
    const isLegacyPage = () => { return !document.querySelector(".nav-top__2020"); }
    
    menu.innerHTML = `
      <div class="gm-menu${isLegacyPage() ? ' legacy' : ''}">
        <span class="gm-menu-close">x</span>
        <ul>
            <li><a href="/bank.phtml">Bank</a></li>
            <li><a href="/quickref.phtml">QuickRef</a></li>
            <li><a href="/inventory.phtml">Inventory</a>&nbsp;(<a href="/inventory.phtml/x">Old</a>)&nbsp;(<a href="/safetydeposit.phtml">SDB</a>)</li>
            <li><a href="/market.phtml?type=your">Shop Stock</a>&nbsp;(<a href="/market.phtml?type=till">Till</a>)</li>
            <li><a href="/stockmarket.phtml?type=list&bargain=true">Stocks</a>&nbsp;(<a href="/stockmarket.phtml?type=portfolio">Portfolio</a>)</li>
            <li><a href="/objects.phtml?obj_type=1&type=shop" class="gm-link-shop">Shop #</a><input type="number" id="gm-shopnum" name="gm-shopnum" value="1" min="1"></li>
        </ul>
      </div>
    `

    document.body.appendChild(menu);

    document.querySelector("#gm-shopnum").addEventListener("input", function() {
        let shopNum = this.value;
        document.querySelector(".gm-link-shop").href = `/objects.phtml?obj_type=${shopNum}&type=shop`;
    })
  
    document.querySelector(".gm-menu-close").addEventListener("click", () => {
      document.querySelector(".gm-menu").remove();
    })
})()
