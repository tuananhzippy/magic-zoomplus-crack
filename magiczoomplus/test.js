window.MagicZoom = (function() {
    var x, y;
    x = y = (function() {
        var T = {
            version: "v3.3-b5-7-g46fd501",
            UUID: 0,
            storage: {},
            $uuid: function(X) {
                return (X.$J_UUID || (X.$J_UUID = ++N.UUID))
            },
            getStorage: function(X) {
                return (N.storage[X] || (N.storage[X] = {}))
            },
            $F: function() {},
            $false: function() {
                return false
            },
            $true: function() {
                return true
            },
            stylesId: "mjs-" + Math.floor(Math.random() * new Date().getTime()),
            defined: function(X) {
                return (undefined != X)
            },
            ifndef: function(Y, X) {
                return (undefined != Y) ? Y : X
            },
            exists: function(X) {
                return !!(X)
            },
            jTypeOf: function(X) {
                if (!N.defined(X)) {
                    return false
                }
                if (X.$J_TYPE) {
                    return X.$J_TYPE
                }
                if (!!X.nodeType) {
                    if (1 == X.nodeType) {
                        return "element"
                    }
                    if (3 == X.nodeType) {
                        return "textnode"
                    }
                }
                if (X.length && X.item) {
                    return "collection"
                }
                if (X.length && X.callee) {
                    return "arguments"
                }
                if ((X instanceof window.Object || X instanceof window.Function) && X.constructor === N.Class) {
                    return "class"
                }
                if (X instanceof window.Array) {
                    return "array"
                }
                if (X instanceof window.Function) {
                    return "function"
                }
                if (X instanceof window.String) {
                    return "string"
                }
                if (N.browser.trident) {
                    if (N.defined(X.cancelBubble)) {
                        return "event"
                    }
                } else {
                    if (X === window.event || X.constructor == window.Event || X.constructor == window.MouseEvent || X.constructor == window.UIEvent || X.constructor == window.KeyboardEvent || X.constructor == window.KeyEvent) {
                        return "event"
                    }
                }
                if (X instanceof window.Date) {
                    return "date"
                }
                if (X instanceof window.RegExp) {
                    return "regexp"
                }
                if (X === window) {
                    return "window"
                }
                if (X === document) {
                    return "document"
                }
                return typeof(X)
            },
            extend: function(ac, ab) {
                if (!(ac instanceof window.Array)) {
                    ac = [ac]
                }
                if (!ab) {
                    return ac[0]
                }
                for (var aa = 0, Y = ac.length; aa < Y; aa++) {
                    if (!N.defined(ac)) {
                        continue
                    }
                    for (var Z in ab) {
                        if (!Object.prototype.hasOwnProperty.call(ab, Z)) {
                            continue
                        }
                        try {
                            ac[aa][Z] = ab[Z]
                        } catch (X) {}
                    }
                }
                return ac[0]
            },
            implement: function(ab, aa) {
                if (!(ab instanceof window.Array)) {
                    ab = [ab]
                }
                for (var Z = 0, X = ab.length; Z < X; Z++) {
                    if (!N.defined(ab[Z])) {
                        continue
                    }
                    if (!ab[Z].prototype) {
                        continue
                    }
                    for (var Y in (aa || {})) {
                        if (!ab[Z].prototype[Y]) {
                            ab[Z].prototype[Y] = aa[Y]
                        }
                    }
                }
                return ab[0]
            },
            nativize: function(Z, Y) {
                if (!N.defined(Z)) {
                    return Z
                }
                for (var X in (Y || {})) {
                    if (!Z[X]) {
                        Z[X] = Y[X]
                    }
                }
                return Z
            },
            $try: function() {
                for (var Y = 0, X = arguments.length; Y < X; Y++) {
                    try {
                        return arguments[Y]()
                    } catch (Z) {}
                }
                return null
            },
            $A: function(Z) {
                if (!N.defined(Z)) {
                    return N.$([])
                }
                if (Z.toArray) {
                    return N.$(Z.toArray())
                }
                if (Z.item) {
                    var Y = Z.length || 0,
                        X = new Array(Y);
                    while (Y--) {
                        X[Y] = Z[Y]
                    }
                    return N.$(X)
                }
                return N.$(Array.prototype.slice.call(Z))
            },
            now: function() {
                return new Date().getTime()
            },
            detach: function(ab) {
                var Z;
                switch (N.jTypeOf(ab)) {
                    case "object":
                        Z = {};
                        for (var aa in ab) {
                            Z[aa] = N.detach(ab[aa])
                        }
                        break;
                    case "array":
                        Z = [];
                        for (var Y = 0, X = ab.length; Y < X; Y++) {
                            Z[Y] = N.detach(ab[Y])
                        }
                        break;
                    default:
                        return ab
                }
                return N.$(Z)
            },
            $: function(Z) {
                var X = true;
                if (!N.defined(Z)) {
                    return null
                }
                if (Z.$J_EXT) {
                    return Z
                }
                switch (N.jTypeOf(Z)) {
                    case "array":
                        Z = N.nativize(Z, N.extend(N.Array, {
                            $J_EXT: N.$F
                        }));
                        Z.jEach = Z.forEach;
                        return Z;
                        break;
                    case "string":
                        var Y = document.getElementById(Z);
                        if (N.defined(Y)) {
                            return N.$(Y)
                        }
                        return null;
                        break;
                    case "window":
                    case "document":
                        N.$uuid(Z);
                        Z = N.extend(Z, N.Doc);
                        break;
                    case "element":
                        N.$uuid(Z);
                        Z = N.extend(Z, N.Element);
                        break;
                    case "event":
                        Z = N.extend(Z, N.Event);
                        break;
                    case "textnode":
                    case "function":
                    case "array":
                    case "date":
                    default:
                        X = false;
                        break
                }
                if (X) {
                    return N.extend(Z, {
                        $J_EXT: N.$F
                    })
                } else {
                    return Z
                }
            },
            $new: function(X, Z, Y) {
                return N.$(N.doc.createElement(X)).setProps(Z || {}).jSetCss(Y || {})
            },
            addCSS: function(aa, ab, Y) {
                var X, ad, Z, af = [],
                    ae = -1;
                Y || (Y = N.stylesId);
                X = N.$(Y) || N.$new("style", {
                    id: Y,
                    type: "text/css"
                }).jAppendTo((document.head || document.body), "top");
                ad = X.sheet || X.styleSheet;
                if ("string" != N.jTypeOf(ab)) {
                    for (var Z in ab) {
                        af.push(Z + ":" + ab[Z])
                    }
                    ab = af.join(";")
                }
                if (ad.insertRule) {
                    ae = ad.insertRule(aa + " {" + ab + "}", ad.cssRules.length)
                } else {
                    try {
                        ae = ad.addRule(aa, ab, ad.rules.length)
                    } catch (ac) {}
                }
                return ae
            },
            removeCSS: function(aa, X) {
                var Z, Y;
                Z = N.$(aa);
                if ("element" !== N.jTypeOf(Z)) {
                    return
                }
                Y = Z.sheet || Z.styleSheet;
                if (Y.deleteRule) {
                    Y.deleteRule(X)
                } else {
                    if (Y.removeRule) {
                        Y.removeRule(X)
                    }
                }
            },
            generateUUID: function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(Z) {
                    var Y = Math.random() * 16 | 0,
                        X = Z == "x" ? Y : (Y & 3 | 8);
                    return X.toString(16)
                }).toUpperCase()
            },
            getAbsoluteURL: (function() {
                var X;
                return function(Y) {
                    if (!X) {
                        X = document.createElement("a")
                    }
                    X.setAttribute("href", Y);
                    return ("!!" + X.href).replace("!!", "")
                }
            })(),
            getHashCode: function(Z) {
                var aa = 0,
                    X = Z.length;
                for (var Y = 0; Y < X; ++Y) {
                    aa = 31 * aa + Z.charCodeAt(Y);
                    aa %= 4294967296
                }
                return aa
            }
        };
        var N = T;
        var O = T.$;
        if (!window.magicJS) {
            window.magicJS = T;
            window.$mjs = T.$
        }
        N.Array = {
            $J_TYPE: "array",
            indexOf: function(aa, ab) {
                var X = this.length;
                for (var Y = this.length, Z = (ab < 0) ? Math.max(0, Y + ab) : ab || 0; Z < Y; Z++) {
                    if (this[Z] === aa) {
                        return Z
                    }
                }
                return -1
            },
            contains: function(X, Y) {
                return this.indexOf(X, Y) != -1
            },
            forEach: function(X, aa) {
                for (var Z = 0, Y = this.length; Z < Y; Z++) {
                    if (Z in this) {
                        X.call(aa, this[Z], Z, this)
                    }
                }
            },
            filter: function(X, ac) {
                var ab = [];
                for (var aa = 0, Y = this.length; aa < Y; aa++) {
                    if (aa in this) {
                        var Z = this[aa];
                        if (X.call(ac, this[aa], aa, this)) {
                            ab.push(Z)
                        }
                    }
                }
                return ab
            },
            map: function(X, ab) {
                var aa = [];
                for (var Z = 0, Y = this.length; Z < Y; Z++) {
                    if (Z in this) {
                        aa[Z] = X.call(ab, this[Z], Z, this)
                    }
                }
                return aa
            }
        };
        N.implement(String, {
            $J_TYPE: "string",
            jTrim: function() {
                return this.replace(/^\s+|\s+$/g, "")
            },
            eq: function(X, Y) {
                return (Y || false) ? (this.toString() === X.toString()) : (this.toLowerCase().toString() === X.toLowerCase().toString())
            },
            jCamelize: function() {
                return this.replace(/-\D/g, function(X) {
                    return X.charAt(1).toUpperCase()
                })
            },
            dashize: function() {
                return this.replace(/[A-Z]/g, function(X) {
                    return ("-" + X.charAt(0).toLowerCase())
                })
            },
            jToInt: function(X) {
                return parseInt(this, X || 10)
            },
            toFloat: function() {
                return parseFloat(this)
            },
            jToBool: function() {
                return !this.replace(/true/i, "").jTrim()
            },
            has: function(Y, X) {
                X = X || "";
                return (X + this + X).indexOf(X + Y + X) > -1
            }
        });
        T.implement(Function, {
            $J_TYPE: "function",
            jBind: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return function() {
                    return X.apply(Z || null, Y.concat(N.$A(arguments)))
                }
            },
            jBindAsEvent: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return function(aa) {
                    return X.apply(Z || null, N.$([aa || (N.browser.ieMode ? window.event : null)]).concat(Y))
                }
            },
            jDelay: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return window.setTimeout(function() {
                    return X.apply(X, Y)
                }, Z || 0)
            },
            jDefer: function() {
                var Y = N.$A(arguments),
                    X = this;
                return function() {
                    return X.jDelay.apply(X, Y)
                }
            },
            interval: function() {
                var Y = N.$A(arguments),
                    X = this,
                    Z = Y.shift();
                return window.setInterval(function() {
                    return X.apply(X, Y)
                }, Z || 0)
            }
        });
        var U = {};
        var M = navigator.userAgent.toLowerCase();
        var L = M.match(/(webkit|gecko|trident|presto)\/(\d+\.?\d*)/i);
        var Q = M.match(/(edge|opr)\/(\d+\.?\d*)/i) || M.match(/(crios|chrome|safari|firefox|opera|opr)\/(\d+\.?\d*)/i);
        var S = M.match(/version\/(\d+\.?\d*)/i);
        var H = document.documentElement.style;

        function I(Y) {
            var X = Y.charAt(0).toUpperCase() + Y.slice(1);
            return Y in H || ("Webkit" + X) in H || ("Moz" + X) in H || ("ms" + X) in H || ("O" + X) in H
        }
        N.browser = {
            features: {
                xpath: !!(document.evaluate),
                air: !!(window.runtime),
                query: !!(document.querySelector),
                fullScreen: !!(document.fullscreenEnabled || document.msFullscreenEnabled || document.exitFullscreen || document.cancelFullScreen || document.webkitexitFullscreen || document.webkitCancelFullScreen || document.mozCancelFullScreen || document.oCancelFullScreen || document.msCancelFullScreen),
                xhr2: !!(window.ProgressEvent) && !!(window.FormData) && (window.XMLHttpRequest && "withCredentials" in new XMLHttpRequest),
                transition: I("transition"),
                transform: I("transform"),
                perspective: I("perspective"),
                animation: I("animation"),
                requestAnimationFrame: false,
                multibackground: false,
                cssFilters: false,
                canvas: false,
                svg: (function() {
                    return document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#Image", "1.1")
                }())
            },
            touchScreen: (function() {
                return "ontouchstart" in window || (window.DocumentTouch && document instanceof DocumentTouch) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0)
            }()),
            mobile: !!M.match(/(android|bb\d+|meego).+|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od|ad)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/),
            engine: (L && L[1]) ? L[1].toLowerCase() : (window.opera) ? "presto" : !!(window.ActiveXObject) ? "trident" : (document.getBoxObjectFor !== undefined || window.mozInnerScreenY !== null) ? "gecko" : (window.WebKitPoint !== null || !navigator.taintEnabled) ? "webkit" : "unknown",
            version: (L && L[2]) ? parseFloat(L[2]) : 0,
            uaName: (Q && Q[1]) ? Q[1].toLowerCase() : "",
            uaVersion: (Q && Q[2]) ? parseFloat(Q[2]) : 0,
            cssPrefix: "",
            cssDomPrefix: "",
            domPrefix: "",
            ieMode: 0,
            platform: M.match(/ip(?:ad|od|hone)/) ? "ios" : (M.match(/(?:webos|android)/) || navigator.platform.match(/mac|win|linux/i) || ["other"])[0].toLowerCase(),
            backCompat: document.compatMode && document.compatMode.toLowerCase() === "backcompat",
            scrollbarsWidth: 0,
            getDoc: function() {
                return (document.compatMode && document.compatMode.toLowerCase() === "backcompat") ? document.body : document.documentElement
            },
            requestAnimationFrame: window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || undefined,
            cancelAnimationFrame: window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.webkitCancelRequestAnimationFrame || undefined,
            ready: false,
            onready: function() {
                if (N.browser.ready) {
                    return
                }
                var aa;
                var Z;
                N.browser.ready = true;
                N.body = N.$(document.body);
                N.win = N.$(window);
                try {
                    var Y = N.$new("div").jSetCss({
                        width: 100,
                        height: 100,
                        overflow: "scroll",
                        position: "absolute",
                        top: -9999
                    }).jAppendTo(document.body);
                    N.browser.scrollbarsWidth = Y.offsetWidth - Y.clientWidth;
                    Y.jRemove()
                } catch (X) {}
                try {
                    aa = N.$new("div");
                    Z = aa.style;
                    Z.cssText = "background:url(https://),url(https://),red url(https://)";
                    N.browser.features.multibackground = (/(url\s*\(.*?){3}/).test(Z.background);
                    Z = null;
                    aa = null
                } catch (X) {}
                if (!N.browser.cssTransformProp) {
                    N.browser.cssTransformProp = N.normalizeCSS("transform").dashize()
                }
                try {
                    aa = N.$new("div");
                    aa.style.cssText = N.normalizeCSS("filter").dashize() + ":blur(2px);";
                    N.browser.features.cssFilters = !!aa.style.length && (!N.browser.ieMode || N.browser.ieMode > 9);
                    aa = null
                } catch (X) {}
                if (!N.browser.features.cssFilters) {
                    N.$(document.documentElement).jAddClass("no-cssfilters-magic")
                }
                try {
                    N.browser.features.canvas = (function() {
                        var ab = N.$new("canvas");
                        return !!(ab.getContext && ab.getContext("2d"))
                    }())
                } catch (X) {}
                if (window.TransitionEvent === undefined && window.WebKitTransitionEvent !== undefined) {
                    U.transitionend = "webkitTransitionEnd"
                }
                N.Doc.jCallEvent.call(N.$(document), "domready")
            }
        };
        (function() {
            var Y = [],
                ab, aa, ac;

            function X() {
                return !!(arguments.callee.caller)
            }
            switch (N.browser.engine) {
                case "trident":
                    if (!N.browser.version) {
                        N.browser.version = !!(window.XMLHttpRequest) ? 3 : 2
                    }
                    break;
                case "gecko":
                    N.browser.version = (Q && Q[2]) ? parseFloat(Q[2]) : 0;
                    break
            }
            N.browser[N.browser.engine] = true;
            if (Q && Q[1] === "crios") {
                N.browser.uaName = "chrome"
            }
            if (!!window.chrome) {
                N.browser.chrome = true
            }
            if (Q && Q[1] === "opr") {
                N.browser.uaName = "opera";
                N.browser.opera = true
            }
            if (N.browser.uaName === "safari" && (S && S[1])) {
                N.browser.uaVersion = parseFloat(S[1])
            }
            if (N.browser.platform === "android" && N.browser.webkit && (S && S[1])) {
                N.browser.androidBrowser = true
            }
            ab = ({
                gecko: ["-moz-", "Moz", "moz"],
                webkit: ["-webkit-", "Webkit", "webkit"],
                trident: ["-ms-", "ms", "ms"],
                presto: ["-o-", "O", "o"]
            })[N.browser.engine] || ["", "", ""];
            N.browser.cssPrefix = ab[0];
            N.browser.cssDomPrefix = ab[1];
            N.browser.domPrefix = ab[2];
            N.browser.ieMode = !N.browser.trident ? undefined : (document.documentMode) ? document.documentMode : (function() {
                var ad = 0;
                if (N.browser.backCompat) {
                    return 5
                }
                switch (N.browser.version) {
                    case 2:
                        ad = 6;
                        break;
                    case 3:
                        ad = 7;
                        break
                }
                return ad
            }());
            Y.push(N.browser.platform + "-magic");
            if (N.browser.mobile) {
                Y.push("mobile-magic")
            }
            if (N.browser.androidBrowser) {
                Y.push("android-browser-magic")
            }
            if (N.browser.ieMode) {
                N.browser.uaName = "ie";
                N.browser.uaVersion = N.browser.ieMode;
                Y.push("ie" + N.browser.ieMode + "-magic");
                for (aa = 11; aa > N.browser.ieMode; aa--) {
                    Y.push("lt-ie" + aa + "-magic")
                }
            }
            if (N.browser.webkit && N.browser.version < 536) {
                N.browser.features.fullScreen = false
            }
            if (N.browser.requestAnimationFrame) {
                N.browser.requestAnimationFrame.call(window, function() {
                    N.browser.features.requestAnimationFrame = true
                })
            }
            if (N.browser.features.svg) {
                Y.push("svg-magic")
            } else {
                Y.push("no-svg-magic")
            }
            ac = (document.documentElement.className || "").match(/\S+/g) || [];
            document.documentElement.className = N.$(ac).concat(Y).join(" ");
            try {
                document.documentElement.setAttribute("data-magic-ua", N.browser.uaName);
                document.documentElement.setAttribute("data-magic-ua-ver", N.browser.uaVersion)
            } catch (Z) {}
            if (N.browser.ieMode && N.browser.ieMode < 9) {
                document.createElement("figure");
                document.createElement("figcaption")
            }
            if (!window.navigator.pointerEnabled) {
                N.$(["Down", "Up", "Move", "Over", "Out"]).jEach(function(ad) {
                    U["pointer" + ad.toLowerCase()] = window.navigator.msPointerEnabled ? "MSPointer" + ad : -1
                })
            }
        }());
        (function() {
            N.browser.fullScreen = {
                capable: N.browser.features.fullScreen,
                enabled: function() {
                    return !!(document.fullscreenElement || document[N.browser.domPrefix + "FullscreenElement"] || document.fullScreen || document.webkitIsFullScreen || document[N.browser.domPrefix + "FullScreen"])
                },
                request: function(X, Y) {
                    if (!Y) {
                        Y = {}
                    }
                    if (this.capable) {
                        N.$(document).jAddEvent(this.changeEventName, this.onchange = function(Z) {
                            if (this.enabled()) {
                                if (Y.onEnter) {
                                    Y.onEnter()
                                }
                            } else {
                                N.$(document).jRemoveEvent(this.changeEventName, this.onchange);
                                if (Y.onExit) {
                                    Y.onExit()
                                }
                            }
                        }.jBindAsEvent(this));
                        N.$(document).jAddEvent(this.errorEventName, this.onerror = function(Z) {
                            if (Y.fallback) {
                                Y.fallback()
                            }
                            N.$(document).jRemoveEvent(this.errorEventName, this.onerror)
                        }.jBindAsEvent(this));
                        (X.requestFullscreen || X[N.browser.domPrefix + "RequestFullscreen"] || X[N.browser.domPrefix + "RequestFullScreen"] || function() {}).call(X)
                    } else {
                        if (Y.fallback) {
                            Y.fallback()
                        }
                    }
                },
                cancel: (document.exitFullscreen || document.cancelFullScreen || document[N.browser.domPrefix + "ExitFullscreen"] || document[N.browser.domPrefix + "CancelFullScreen"] || function() {}).jBind(document),
                changeEventName: document.msExitFullscreen ? "MSFullscreenChange" : (document.exitFullscreen ? "" : N.browser.domPrefix) + "fullscreenchange",
                errorEventName: document.msExitFullscreen ? "MSFullscreenError" : (document.exitFullscreen ? "" : N.browser.domPrefix) + "fullscreenerror",
                prefix: N.browser.domPrefix,
                activeElement: null
            }
        }());
        var W = /\S+/g,
            K = /^(border(Top|Bottom|Left|Right)Width)|((padding|margin)(Top|Bottom|Left|Right))$/,
            P = {
                "float": ("undefined" === typeof(H.styleFloat)) ? "cssFloat" : "styleFloat"
            },
            R = {
                fontWeight: true,
                lineHeight: true,
                opacity: true,
                zIndex: true,
                zoom: true
            },
            J = (window.getComputedStyle) ? function(Z, X) {
                var Y = window.getComputedStyle(Z, null);
                return Y ? Y.getPropertyValue(X) || Y[X] : null
            } : function(aa, Y) {
                var Z = aa.currentStyle,
                    X = null;
                X = Z ? Z[Y] : null;
                if (null == X && aa.style && aa.style[Y]) {
                    X = aa.style[Y]
                }
                return X
            };

        function V(Z) {
            var X, Y;
            Y = (N.browser.webkit && "filter" == Z) ? false : (Z in H);
            if (!Y) {
                X = N.browser.cssDomPrefix + Z.charAt(0).toUpperCase() + Z.slice(1);
                if (X in H) {
                    return X
                }
            }
            return Z
        }
        N.normalizeCSS = V;
        N.Element = {
            jHasClass: function(X) {
                return !(X || "").has(" ") && (this.className || "").has(X, " ")
            },
            jAddClass: function(ab) {
                var Y = (this.className || "").match(W) || [],
                    aa = (ab || "").match(W) || [],
                    X = aa.length,
                    Z = 0;
                for (; Z < X; Z++) {
                    if (!N.$(Y).contains(aa[Z])) {
                        Y.push(aa[Z])
                    }
                }
                this.className = Y.join(" ");
                return this
            },
            jRemoveClass: function(ac) {
                var Y = (this.className || "").match(W) || [],
                    ab = (ac || "").match(W) || [],
                    X = ab.length,
                    aa = 0,
                    Z;
                for (; aa < X; aa++) {
                    if ((Z = N.$(Y).indexOf(ab[aa])) > -1) {
                        Y.splice(Z, 1)
                    }
                }
                this.className = ac ? Y.join(" ") : "";
                return this
            },
            jToggleClass: function(X) {
                return this.jHasClass(X) ? this.jRemoveClass(X) : this.jAddClass(X)
            },
            jGetCss: function(Y) {
                var Z = Y.jCamelize(),
                    X = null;
                Y = P[Z] || (P[Z] = V(Z));
                X = J(this, Y);
                if ("auto" === X) {
                    X = null
                }
                if (null !== X) {
                    if ("opacity" == Y) {
                        return N.defined(X) ? parseFloat(X) : 1
                    }
                    if (K.test(Y)) {
                        X = parseInt(X, 10) ? X : "0px"
                    }
                }
                return X
            },
            jSetCssProp: function(Y, X) {
                var aa = Y.jCamelize();
                try {
                    if ("opacity" == Y) {
                        this.jSetOpacity(X);
                        return this
                    }
                    Y = P[aa] || (P[aa] = V(aa));
                    this.style[Y] = X + (("number" == N.jTypeOf(X) && !R[aa]) ? "px" : "")
                } catch (Z) {}
                return this
            },
            jSetCss: function(Y) {
                for (var X in Y) {
                    this.jSetCssProp(X, Y[X])
                }
                return this
            },
            jGetStyles: function() {
                var X = {};
                N.$A(arguments).jEach(function(Y) {
                    X[Y] = this.jGetCss(Y)
                }, this);
                return X
            },
            jSetOpacity: function(Z, X) {
                var Y;
                X = X || false;
                this.style.opacity = Z;
                Z = parseInt(parseFloat(Z) * 100);
                if (X) {
                    if (0 === Z) {
                        if ("hidden" != this.style.visibility) {
                            this.style.visibility = "hidden"
                        }
                    } else {
                        if ("visible" != this.style.visibility) {
                            this.style.visibility = "visible"
                        }
                    }
                }
                if (N.browser.ieMode && N.browser.ieMode < 9) {
                    if (!isNaN(Z)) {
                        if (!~this.style.filter.indexOf("Alpha")) {
                            this.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + Z + ")"
                        } else {
                            this.style.filter = this.style.filter.replace(/Opacity=\d*/i, "Opacity=" + Z)
                        }
                    } else {
                        this.style.filter = this.style.filter.replace(/progid:DXImageTransform.Microsoft.Alpha\(Opacity=\d*\)/i, "").jTrim();
                        if ("" === this.style.filter) {
                            this.style.removeAttribute("filter")
                        }
                    }
                }
                return this
            },
            setProps: function(X) {
                for (var Y in X) {
                    if ("class" === Y) {
                        this.jAddClass("" + X[Y])
                    } else {
                        this.setAttribute(Y, "" + X[Y])
                    }
                }
                return this
            },
            jGetTransitionDuration: function() {
                var Y = 0,
                    X = 0;
                Y = this.jGetCss("transition-duration");
                X = this.jGetCss("transition-delay");
                Y = Y.indexOf("ms") > -1 ? parseFloat(Y) : Y.indexOf("s") > -1 ? parseFloat(Y) * 1000 : 0;
                X = X.indexOf("ms") > -1 ? parseFloat(X) : X.indexOf("s") > -1 ? parseFloat(X) * 1000 : 0;
                return Y + X
            },
            hide: function() {
                return this.jSetCss({
                    display: "none",
                    visibility: "hidden"
                })
            },
            show: function() {
                return this.jSetCss({
                    display: "",
                    visibility: "visible"
                })
            },
            jGetSize: function() {
                return {
                    width: this.offsetWidth,
                    height: this.offsetHeight
                }
            },
            getInnerSize: function(Y) {
                var X = this.jGetSize();
                X.width -= (parseFloat(this.jGetCss("border-left-width") || 0) + parseFloat(this.jGetCss("border-right-width") || 0));
                X.height -= (parseFloat(this.jGetCss("border-top-width") || 0) + parseFloat(this.jGetCss("border-bottom-width") || 0));
                if (!Y) {
                    X.width -= (parseFloat(this.jGetCss("padding-left") || 0) + parseFloat(this.jGetCss("padding-right") || 0));
                    X.height -= (parseFloat(this.jGetCss("padding-top") || 0) + parseFloat(this.jGetCss("padding-bottom") || 0))
                }
                return X
            },
            jGetScroll: function() {
                return {
                    top: this.scrollTop,
                    left: this.scrollLeft
                }
            },
            jGetFullScroll: function() {
                var X = this,
                    Y = {
                        top: 0,
                        left: 0
                    };
                do {
                    Y.left += X.scrollLeft || 0;
                    Y.top += X.scrollTop || 0;
                    X = X.parentNode
                } while (X);
                return Y
            },
            jGetPosition: function() {
                var ab = this,
                    Y = 0,
                    aa = 0;
                if (N.defined(document.documentElement.getBoundingClientRect)) {
                    var X = this.getBoundingClientRect(),
                        Z = N.$(document).jGetScroll(),
                        ac = N.browser.getDoc();
                    return {
                        top: X.top + Z.y - ac.clientTop,
                        left: X.left + Z.x - ac.clientLeft
                    }
                }
                do {
                    Y += ab.offsetLeft || 0;
                    aa += ab.offsetTop || 0;
                    ab = ab.offsetParent
                } while (ab && !(/^(?:body|html)$/i).test(ab.tagName));
                return {
                    top: aa,
                    left: Y
                }
            },
            jGetRect: function() {
                var Y = this.jGetPosition();
                var X = this.jGetSize();
                return {
                    top: Y.top,
                    bottom: Y.top + X.height,
                    left: Y.left,
                    right: Y.left + X.width
                }
            },
            changeContent: function(Y) {
                try {
                    this.innerHTML = Y
                } catch (X) {
                    this.innerText = Y
                }
                return this
            },
            jRemove: function() {
                return (this.parentNode) ? this.parentNode.removeChild(this) : this
            },
            kill: function() {
                N.$A(this.childNodes).jEach(function(X) {
                    if (3 == X.nodeType || 8 == X.nodeType) {
                        return
                    }
                    N.$(X).kill()
                });
                this.jRemove();
                this.jClearEvents();
                if (this.$J_UUID) {
                    N.storage[this.$J_UUID] = null;
                    delete N.storage[this.$J_UUID]
                }
                return null
            },
            append: function(Z, Y) {
                Y = Y || "bottom";
                var X = this.firstChild;
                ("top" == Y && X) ? this.insertBefore(Z, X): this.appendChild(Z);
                return this
            },
            jAppendTo: function(Z, Y) {
                var X = N.$(Z).append(this, Y);
                return this
            },
            enclose: function(X) {
                this.append(X.parentNode.replaceChild(this, X));
                return this
            },
            hasChild: function(X) {
                if ("element" !== N.jTypeOf("string" == N.jTypeOf(X) ? X = document.getElementById(X) : X)) {
                    return false
                }
                return (this == X) ? false : (this.contains && !(N.browser.webkit419)) ? (this.contains(X)) : (this.compareDocumentPosition) ? !!(this.compareDocumentPosition(X) & 16) : N.$A(this.byTag(X.tagName)).contains(X)
            }
        };
        N.Element.jGetStyle = N.Element.jGetCss;
        N.Element.jSetStyle = N.Element.jSetCss;
        if (!window.Element) {
            window.Element = N.$F;
            if (N.browser.engine.webkit) {
                window.document.createElement("iframe")
            }
            window.Element.prototype = (N.browser.engine.webkit) ? window["[[DOMElement.prototype]]"] : {}
        }
        N.implement(window.Element, {
            $J_TYPE: "element"
        });
        N.Doc = {
            jGetSize: function() {
                if (N.browser.touchScreen || N.browser.presto925 || N.browser.webkit419) {
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight
                    }
                }
                return {
                    width: N.browser.getDoc().clientWidth,
                    height: N.browser.getDoc().clientHeight
                }
            },
            jGetScroll: function() {
                return {
                    x: window.pageXOffset || N.browser.getDoc().scrollLeft,
                    y: window.pageYOffset || N.browser.getDoc().scrollTop
                }
            },
            jGetFullSize: function() {
                var X = this.jGetSize();
                return {
                    width: Math.max(N.browser.getDoc().scrollWidth, X.width),
                    height: Math.max(N.browser.getDoc().scrollHeight, X.height)
                }
            }
        };
        N.extend(document, {
            $J_TYPE: "document"
        });
        N.extend(window, {
            $J_TYPE: "window"
        });
        N.extend([N.Element, N.Doc], {
            jFetch: function(aa, Y) {
                var X = N.getStorage(this.$J_UUID),
                    Z = X[aa];
                if (undefined !== Y && undefined === Z) {
                    Z = X[aa] = Y
                }
                return (N.defined(Z) ? Z : null)
            },
            jStore: function(Z, Y) {
                var X = N.getStorage(this.$J_UUID);
                X[Z] = Y;
                return this
            },
            jDel: function(Y) {
                var X = N.getStorage(this.$J_UUID);
                delete X[Y];
                return this
            }
        });
        if (!(window.HTMLElement && window.HTMLElement.prototype && window.HTMLElement.prototype.getElementsByClassName)) {
            N.extend([N.Element, N.Doc], {
                getElementsByClassName: function(X) {
                    return N.$A(this.getElementsByTagName("*")).filter(function(Z) {
                        try {
                            return (1 == Z.nodeType && Z.className.has(X, " "))
                        } catch (Y) {}
                    })
                }
            })
        }
        N.extend([N.Element, N.Doc], {
            byClass: function() {
                return this.getElementsByClassName(arguments[0])
            },
            byTag: function() {
                return this.getElementsByTagName(arguments[0])
            }
        });
        if (N.browser.fullScreen.capable && !document.requestFullScreen) {
            N.Element.requestFullScreen = function() {
                N.browser.fullScreen.request(this)
            }
        }
        N.Event = {
            $J_TYPE: "event",
            isQueueStopped: N.$false,
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                if (this.stopPropagation) {
                    this.stopPropagation()
                } else {
                    this.cancelBubble = true
                }
                return this
            },
            stopDefaults: function() {
                if (this.preventDefault) {
                    this.preventDefault()
                } else {
                    this.returnValue = false
                }
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = N.$true;
                return this
            },
            getClientXY: function() {
                var X = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
                return !N.defined(X) ? {
                    x: 0,
                    y: 0
                } : {
                    x: X.clientX,
                    y: X.clientY
                }
            },
            jGetPageXY: function() {
                var X = (/touch/i).test(this.type) ? this.changedTouches[0] : this;
                return !N.defined(X) ? {
                    x: 0,
                    y: 0
                } : {
                    x: X.pageX || X.clientX + N.browser.getDoc().scrollLeft,
                    y: X.pageY || X.clientY + N.browser.getDoc().scrollTop
                }
            },
            getTarget: function() {
                var X = this.target || this.srcElement;
                while (X && X.nodeType === 3) {
                    X = X.parentNode
                }
                return X
            },
            getRelated: function() {
                var Y = null;
                switch (this.type) {
                    case "mouseover":
                    case "pointerover":
                    case "MSPointerOver":
                        Y = this.relatedTarget || this.fromElement;
                        break;
                    case "mouseout":
                    case "pointerout":
                    case "MSPointerOut":
                        Y = this.relatedTarget || this.toElement;
                        break;
                    default:
                        return Y
                }
                try {
                    while (Y && Y.nodeType === 3) {
                        Y = Y.parentNode
                    }
                } catch (X) {
                    Y = null
                }
                return Y
            },
            getButton: function() {
                if (!this.which && this.button !== undefined) {
                    return (this.button & 1 ? 1 : (this.button & 2 ? 3 : (this.button & 4 ? 2 : 0)))
                }
                return this.which
            },
            isTouchEvent: function() {
                return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
            },
            isPrimaryTouch: function() {
                if (this.pointerType) {
                    return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
                    }
                }
                return false
            },
            getPrimaryTouch: function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0]
                    }
                }
                return null
            },
            getPrimaryTouchId: function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0].identifier
                    }
                }
                return null
            }
        };
        N._event_add_ = "addEventListener";
        N._event_del_ = "removeEventListener";
        N._event_prefix_ = "";
        if (!document.addEventListener) {
            N._event_add_ = "attachEvent";
            N._event_del_ = "detachEvent";
            N._event_prefix_ = "on"
        }
        N.Event.Custom = {
            type: "",
            x: null,
            y: null,
            timeStamp: null,
            button: null,
            target: null,
            relatedTarget: null,
            $J_TYPE: "event.custom",
            isQueueStopped: N.$false,
            events: N.$([]),
            pushToEvents: function(X) {
                var Y = X;
                this.events.push(Y)
            },
            stop: function() {
                return this.stopDistribution().stopDefaults()
            },
            stopDistribution: function() {
                this.events.jEach(function(Y) {
                    try {
                        Y.stopDistribution()
                    } catch (X) {}
                });
                return this
            },
            stopDefaults: function() {
                this.events.jEach(function(Y) {
                    try {
                        Y.stopDefaults()
                    } catch (X) {}
                });
                return this
            },
            stopQueue: function() {
                this.isQueueStopped = N.$true;
                return this
            },
            getClientXY: function() {
                return {
                    x: this.clientX,
                    y: this.clientY
                }
            },
            jGetPageXY: function() {
                return {
                    x: this.x,
                    y: this.y
                }
            },
            getTarget: function() {
                return this.target
            },
            getRelated: function() {
                return this.relatedTarget
            },
            getButton: function() {
                return this.button
            },
            getOriginalTarget: function() {
                return this.events.length > 0 ? this.events[0].getTarget() : undefined
            },
            isTouchEvent: function() {
                return (this.pointerType && (this.pointerType === "touch" || this.pointerType === this.MSPOINTER_TYPE_TOUCH)) || (/touch/i).test(this.type)
            },
            isPrimaryTouch: function() {
                if (this.pointerType) {
                    return (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) && this.isPrimary
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches.length === 1 && (this.targetTouches.length ? this.targetTouches[0].identifier === this.changedTouches[0].identifier : true)
                    }
                }
                return false
            },
            getPrimaryTouch: function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this : null
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0]
                    }
                }
                return null
            },
            getPrimaryTouchId: function() {
                if (this.pointerType) {
                    return this.isPrimary && (this.pointerType === "touch" || this.MSPOINTER_TYPE_TOUCH === this.pointerType) ? this.pointerId : null
                } else {
                    if (this instanceof window.TouchEvent) {
                        return this.changedTouches[0].identifier
                    }
                }
                return null
            }
        };
        N.extend([N.Element, N.Doc], {
            jAddEvent: function(Z, ab, ac, af) {
                var ae, X, aa, ad, Y;
                if (N.jTypeOf(Z) === "string") {
                    Y = Z.split(" ");
                    if (Y.length > 1) {
                        Z = Y
                    }
                }
                if (N.jTypeOf(Z) === "array") {
                    N.$(Z).jEach(this.jAddEvent.jBindAsEvent(this, ab, ac, af));
                    return this
                }
                Z = U[Z] || Z;
                if (!Z || !ab || N.jTypeOf(Z) !== "string" || N.jTypeOf(ab) !== "function") {
                    return this
                }
                if (Z === "domready" && N.browser.ready) {
                    ab.call(this);
                    return this
                }
                ac = parseInt(ac || 50, 10);
                if (!ab.$J_EUID) {
                    ab.$J_EUID = Math.floor(Math.random() * N.now())
                }
                ae = N.Doc.jFetch.call(this, "_EVENTS_", {});
                X = ae[Z];
                if (!X) {
                    ae[Z] = X = N.$([]);
                    aa = this;
                    if (N.Event.Custom[Z]) {
                        N.Event.Custom[Z].handler.add.call(this, af)
                    } else {
                        X.handle = function(ag) {
                            ag = N.extend(ag || window.e, {
                                $J_TYPE: "event"
                            });
                            N.Doc.jCallEvent.call(aa, Z, N.$(ag))
                        };
                        this[N._event_add_](N._event_prefix_ + Z, X.handle, false)
                    }
                }
                ad = {
                    type: Z,
                    fn: ab,
                    priority: ac,
                    euid: ab.$J_EUID
                };
                X.push(ad);
                X.sort(function(ah, ag) {
                    return ah.priority - ag.priority
                });
                return this
            },
            jRemoveEvent: function(ad) {
                var ab = N.Doc.jFetch.call(this, "_EVENTS_", {});
                var Z;
                var X;
                var Y;
                var ae;
                var ac;
                var aa;
                ac = arguments.length > 1 ? arguments[1] : -100;
                if (N.jTypeOf(ad) === "string") {
                    aa = ad.split(" ");
                    if (aa.length > 1) {
                        ad = aa
                    }
                }
                if (N.jTypeOf(ad) === "array") {
                    N.$(ad).jEach(this.jRemoveEvent.jBindAsEvent(this, ac));
                    return this
                }
                ad = U[ad] || ad;
                if (!ad || N.jTypeOf(ad) !== "string" || !ab || !ab[ad]) {
                    return this
                }
                Z = ab[ad] || [];
                for (Y = 0; Y < Z.length; Y++) {
                    X = Z[Y];
                    if (ac === -100 || !!ac && ac.$J_EUID === X.euid) {
                        ae = Z.splice(Y--, 1)
                    }
                }
                if (Z.length === 0) {
                    if (N.Event.Custom[ad]) {
                        N.Event.Custom[ad].handler.jRemove.call(this)
                    } else {
                        this[N._event_del_](N._event_prefix_ + ad, Z.handle, false)
                    }
                    delete ab[ad]
                }
                return this
            },
            jCallEvent: function(aa, ac) {
                var Z = N.Doc.jFetch.call(this, "_EVENTS_", {});
                var Y;
                var X;
                aa = U[aa] || aa;
                if (!aa || N.jTypeOf(aa) !== "string" || !Z || !Z[aa]) {
                    return this
                }
                try {
                    ac = N.extend(ac || {}, {
                        type: aa
                    })
                } catch (ab) {}
                if (ac.timeStamp === undefined) {
                    ac.timeStamp = N.now()
                }
                Y = Z[aa] || [];
                for (X = 0; X < Y.length && !(ac.isQueueStopped && ac.isQueueStopped()); X++) {
                    Y[X].fn.call(this, ac)
                }
            },
            jRaiseEvent: function(Y, X) {
                var ab = (Y !== "domready");
                var aa = this;
                var Z;
                Y = U[Y] || Y;
                if (!ab) {
                    N.Doc.jCallEvent.call(this, Y);
                    return this
                }
                if (aa === document && document.createEvent && !aa.dispatchEvent) {
                    aa = document.documentElement
                }
                if (document.createEvent) {
                    Z = document.createEvent(Y);
                    Z.initEvent(X, true, true)
                } else {
                    Z = document.createEventObject();
                    Z.eventType = Y
                }
                if (document.createEvent) {
                    aa.dispatchEvent(Z)
                } else {
                    aa.fireEvent("on" + X, Z)
                }
                return Z
            },
            jClearEvents: function() {
                var Y = N.Doc.jFetch.call(this, "_EVENTS_");
                if (!Y) {
                    return this
                }
                for (var X in Y) {
                    N.Doc.jRemoveEvent.call(this, X)
                }
                N.Doc.jDel.call(this, "_EVENTS_");
                return this
            }
        });
        (function(X) {
            if (document.readyState === "complete") {
                return X.browser.onready.jDelay(1)
            }
            if (X.browser.webkit && X.browser.version < 420) {
                (function() {
                    if (X.$(["loaded", "complete"]).contains(document.readyState)) {
                        X.browser.onready()
                    } else {
                        arguments.callee.jDelay(50)
                    }
                }())
            } else {
                if (X.browser.trident && X.browser.ieMode < 9 && window === top) {
                    (function() {
                        if (X.$try(function() {
                                X.browser.getDoc().doScroll("left");
                                return true
                            })) {
                            X.browser.onready()
                        } else {
                            arguments.callee.jDelay(50)
                        }
                    }())
                } else {
                    X.Doc.jAddEvent.call(X.$(document), "DOMContentLoaded", X.browser.onready);
                    X.Doc.jAddEvent.call(X.$(window), "load", X.browser.onready)
                }
            }
        }(T));
        N.Class = function() {
            var ab = null,
                Y = N.$A(arguments);
            if ("class" == N.jTypeOf(Y[0])) {
                ab = Y.shift()
            }
            var X = function() {
                for (var ae in this) {
                    this[ae] = N.detach(this[ae])
                }
                if (this.constructor.$parent) {
                    this.$parent = {};
                    var ag = this.constructor.$parent;
                    for (var af in ag) {
                        var ad = ag[af];
                        switch (N.jTypeOf(ad)) {
                            case "function":
                                this.$parent[af] = N.Class.wrap(this, ad);
                                break;
                            case "object":
                                this.$parent[af] = N.detach(ad);
                                break;
                            case "array":
                                this.$parent[af] = N.detach(ad);
                                break
                        }
                    }
                }
                var ac = (this.init) ? this.init.apply(this, arguments) : this;
                delete this.caller;
                return ac
            };
            if (!X.prototype.init) {
                X.prototype.init = N.$F
            }
            if (ab) {
                var aa = function() {};
                aa.prototype = ab.prototype;
                X.prototype = new aa;
                X.$parent = {};
                for (var Z in ab.prototype) {
                    X.$parent[Z] = ab.prototype[Z]
                }
            } else {
                X.$parent = null
            }
            X.constructor = N.Class;
            X.prototype.constructor = X;
            N.extend(X.prototype, Y[0]);
            N.extend(X, {
                $J_TYPE: "class"
            });
            return X
        };
        T.Class.wrap = function(X, Y) {
            return function() {
                var aa = this.caller;
                var Z = Y.apply(X, arguments);
                return Z
            }
        };
        (function(aa) {
            var Z = aa.$;
            var X = 5,
                Y = 300;
            aa.Event.Custom.btnclick = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "btnclick",
                init: function(ad, ac) {
                    var ab = ac.jGetPageXY();
                    this.x = ab.x;
                    this.y = ab.y;
                    this.clientX = ac.clientX;
                    this.clientY = ac.clientY;
                    this.timeStamp = ac.timeStamp;
                    this.button = ac.getButton();
                    this.target = ad;
                    this.pushToEvents(ac)
                }
            }));
            aa.Event.Custom.btnclick.handler = {
                options: {
                    threshold: Y,
                    button: 1
                },
                add: function(ab) {
                    this.jStore("event:btnclick:options", aa.extend(aa.detach(aa.Event.Custom.btnclick.handler.options), ab || {}));
                    this.jAddEvent("mousedown", aa.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("mouseup", aa.Event.Custom.btnclick.handler.handle, 1);
                    this.jAddEvent("click", aa.Event.Custom.btnclick.handler.onclick, 1);
                    if (aa.browser.trident && aa.browser.ieMode < 9) {
                        this.jAddEvent("dblclick", aa.Event.Custom.btnclick.handler.handle, 1)
                    }
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", aa.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("mouseup", aa.Event.Custom.btnclick.handler.handle);
                    this.jRemoveEvent("click", aa.Event.Custom.btnclick.handler.onclick);
                    if (aa.browser.trident && aa.browser.ieMode < 9) {
                        this.jRemoveEvent("dblclick", aa.Event.Custom.btnclick.handler.handle)
                    }
                },
                onclick: function(ab) {
                    ab.stopDefaults()
                },
                handle: function(ae) {
                    var ad, ab, ac;
                    ab = this.jFetch("event:btnclick:options");
                    if (ae.type != "dblclick" && ae.getButton() != ab.button) {
                        return
                    }
                    if (this.jFetch("event:btnclick:ignore")) {
                        this.jDel("event:btnclick:ignore");
                        return
                    }
                    if ("mousedown" == ae.type) {
                        ad = new aa.Event.Custom.btnclick(this, ae);
                        this.jStore("event:btnclick:btnclickEvent", ad)
                    } else {
                        if ("mouseup" == ae.type) {
                            ad = this.jFetch("event:btnclick:btnclickEvent");
                            if (!ad) {
                                return
                            }
                            ac = ae.jGetPageXY();
                            this.jDel("event:btnclick:btnclickEvent");
                            ad.pushToEvents(ae);
                            if (ae.timeStamp - ad.timeStamp <= ab.threshold && Math.sqrt(Math.pow(ac.x - ad.x, 2) + Math.pow(ac.y - ad.y, 2)) <= X) {
                                this.jCallEvent("btnclick", ad)
                            }
                            document.jCallEvent("mouseup", ae)
                        } else {
                            if (ae.type == "dblclick") {
                                ad = new aa.Event.Custom.btnclick(this, ae);
                                this.jCallEvent("btnclick", ad)
                            }
                        }
                    }
                }
            }
        })(T);
        (function(Y) {
            var X = Y.$;
            Y.Event.Custom.mousedrag = new Y.Class(Y.extend(Y.Event.Custom, {
                type: "mousedrag",
                state: "dragstart",
                dragged: false,
                init: function(ac, ab, aa) {
                    var Z = ab.jGetPageXY();
                    this.x = Z.x;
                    this.y = Z.y;
                    this.clientX = ab.clientX;
                    this.clientY = ab.clientY;
                    this.timeStamp = ab.timeStamp;
                    this.button = ab.getButton();
                    this.target = ac;
                    this.pushToEvents(ab);
                    this.state = aa
                }
            }));
            Y.Event.Custom.mousedrag.handler = {
                add: function() {
                    var aa = Y.Event.Custom.mousedrag.handler.handleMouseMove.jBindAsEvent(this),
                        Z = Y.Event.Custom.mousedrag.handler.handleMouseUp.jBindAsEvent(this);
                    this.jAddEvent("mousedown", Y.Event.Custom.mousedrag.handler.handleMouseDown, 1);
                    this.jAddEvent("mouseup", Y.Event.Custom.mousedrag.handler.handleMouseUp, 1);
                    document.jAddEvent("mousemove", aa, 1);
                    document.jAddEvent("mouseup", Z, 1);
                    this.jStore("event:mousedrag:listeners:document:move", aa);
                    this.jStore("event:mousedrag:listeners:document:end", Z)
                },
                jRemove: function() {
                    this.jRemoveEvent("mousedown", Y.Event.Custom.mousedrag.handler.handleMouseDown);
                    this.jRemoveEvent("mouseup", Y.Event.Custom.mousedrag.handler.handleMouseUp);
                    X(document).jRemoveEvent("mousemove", this.jFetch("event:mousedrag:listeners:document:move") || Y.$F);
                    X(document).jRemoveEvent("mouseup", this.jFetch("event:mousedrag:listeners:document:end") || Y.$F);
                    this.jDel("event:mousedrag:listeners:document:move");
                    this.jDel("event:mousedrag:listeners:document:end")
                },
                handleMouseDown: function(aa) {
                    var Z;
                    if (1 != aa.getButton()) {
                        return
                    }
                    Z = new Y.Event.Custom.mousedrag(this, aa, "dragstart");
                    this.jStore("event:mousedrag:dragstart", Z)
                },
                handleMouseUp: function(aa) {
                    var Z;
                    Z = this.jFetch("event:mousedrag:dragstart");
                    if (!Z) {
                        return
                    }
                    aa.stopDefaults();
                    Z = new Y.Event.Custom.mousedrag(this, aa, "dragend");
                    this.jDel("event:mousedrag:dragstart");
                    this.jCallEvent("mousedrag", Z)
                },
                handleMouseMove: function(aa) {
                    var Z;
                    Z = this.jFetch("event:mousedrag:dragstart");
                    if (!Z) {
                        return
                    }
                    aa.stopDefaults();
                    if (!Z.dragged) {
                        Z.dragged = true;
                        this.jCallEvent("mousedrag", Z)
                    }
                    Z = new Y.Event.Custom.mousedrag(this, aa, "dragmove");
                    this.jCallEvent("mousedrag", Z)
                }
            }
        })(T);
        (function(Y) {
            var X = Y.$;
            Y.Event.Custom.dblbtnclick = new Y.Class(Y.extend(Y.Event.Custom, {
                type: "dblbtnclick",
                timedout: false,
                tm: null,
                init: function(ab, aa) {
                    var Z = aa.jGetPageXY();
                    this.x = Z.x;
                    this.y = Z.y;
                    this.clientX = aa.clientX;
                    this.clientY = aa.clientY;
                    this.timeStamp = aa.timeStamp;
                    this.button = aa.getButton();
                    this.target = ab;
                    this.pushToEvents(aa)
                }
            }));
            Y.Event.Custom.dblbtnclick.handler = {
                options: {
                    threshold: 200
                },
                add: function(Z) {
                    this.jStore("event:dblbtnclick:options", Y.extend(Y.detach(Y.Event.Custom.dblbtnclick.handler.options), Z || {}));
                    this.jAddEvent("btnclick", Y.Event.Custom.dblbtnclick.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent("btnclick", Y.Event.Custom.dblbtnclick.handler.handle)
                },
                handle: function(ab) {
                    var aa, Z;
                    aa = this.jFetch("event:dblbtnclick:event");
                    Z = this.jFetch("event:dblbtnclick:options");
                    if (!aa) {
                        aa = new Y.Event.Custom.dblbtnclick(this, ab);
                        aa.tm = setTimeout(function() {
                            aa.timedout = true;
                            ab.isQueueStopped = Y.$false;
                            this.jCallEvent("btnclick", ab);
                            this.jDel("event:dblbtnclick:event")
                        }.jBind(this), Z.threshold + 10);
                        this.jStore("event:dblbtnclick:event", aa);
                        ab.stopQueue()
                    } else {
                        clearTimeout(aa.tm);
                        this.jDel("event:dblbtnclick:event");
                        if (!aa.timedout) {
                            aa.pushToEvents(ab);
                            ab.stopQueue().stop();
                            this.jCallEvent("dblbtnclick", aa)
                        } else {}
                    }
                }
            }
        })(T);
        (function(aa) {
            var Z = aa.$;
            var X = 10;
            var Y = 200;
            aa.Event.Custom.tap = new aa.Class(aa.extend(aa.Event.Custom, {
                type: "tap",
                id: null,
                init: function(ac, ab) {
                    var ad = ab.getPrimaryTouch();
                    this.id = ad.pointerId || ad.identifier;
                    this.x = ad.pageX;
                    this.y = ad.pageY;
                    this.pageX = ad.pageX;
                    this.pageY = ad.pageY;
                    this.clientX = ad.clientX;
                    this.clientY = ad.clientY;
                    this.timeStamp = ab.timeStamp;
                    this.button = 0;
                    this.target = ac;
                    this.pushToEvents(ab)
                }
            }));
            aa.Event.Custom.tap.handler = {
                add: function(ab) {
                    this.jAddEvent(["touchstart", "pointerdown"], aa.Event.Custom.tap.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", "pointerup"], aa.Event.Custom.tap.handler.onTouchEnd, 1);
                    this.jAddEvent("click", aa.Event.Custom.tap.handler.onClick, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", "pointerdown"], aa.Event.Custom.tap.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", "pointerup"], aa.Event.Custom.tap.handler.onTouchEnd);
                    this.jRemoveEvent("click", aa.Event.Custom.tap.handler.onClick)
                },
                onClick: function(ab) {
                    ab.stopDefaults()
                },
                onTouchStart: function(ab) {
                    if (!ab.isPrimaryTouch()) {
                        this.jDel("event:tap:event");
                        return
                    }
                    this.jStore("event:tap:event", new aa.Event.Custom.tap(this, ab));
                    this.jStore("event:btnclick:ignore", true)
                },
                onTouchEnd: function(ae) {
                    var ac = aa.now();
                    var ad = this.jFetch("event:tap:event");
                    var ab = this.jFetch("event:tap:options");
                    if (!ad || !ae.isPrimaryTouch()) {
                        return
                    }
                    this.jDel("event:tap:event");
                    if (ad.id === ae.getPrimaryTouchId() && ae.timeStamp - ad.timeStamp <= Y && Math.sqrt(Math.pow(ae.getPrimaryTouch().pageX - ad.x, 2) + Math.pow(ae.getPrimaryTouch().pageY - ad.y, 2)) <= X) {
                        this.jDel("event:btnclick:btnclickEvent");
                        ae.stop();
                        ad.pushToEvents(ae);
                        this.jCallEvent("tap", ad)
                    }
                }
            }
        }(T));
        N.Event.Custom.dbltap = new N.Class(N.extend(N.Event.Custom, {
            type: "dbltap",
            timedout: false,
            tm: null,
            init: function(Y, X) {
                this.x = X.x;
                this.y = X.y;
                this.clientX = X.clientX;
                this.clientY = X.clientY;
                this.timeStamp = X.timeStamp;
                this.button = 0;
                this.target = Y;
                this.pushToEvents(X)
            }
        }));
        N.Event.Custom.dbltap.handler = {
            options: {
                threshold: 300
            },
            add: function(X) {
                this.jStore("event:dbltap:options", N.extend(N.detach(N.Event.Custom.dbltap.handler.options), X || {}));
                this.jAddEvent("tap", N.Event.Custom.dbltap.handler.handle, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("tap", N.Event.Custom.dbltap.handler.handle)
            },
            handle: function(Z) {
                var Y, X;
                Y = this.jFetch("event:dbltap:event");
                X = this.jFetch("event:dbltap:options");
                if (!Y) {
                    Y = new N.Event.Custom.dbltap(this, Z);
                    Y.tm = setTimeout(function() {
                        Y.timedout = true;
                        Z.isQueueStopped = N.$false;
                        this.jCallEvent("tap", Z)
                    }.jBind(this), X.threshold + 10);
                    this.jStore("event:dbltap:event", Y);
                    Z.stopQueue()
                } else {
                    clearTimeout(Y.tm);
                    this.jDel("event:dbltap:event");
                    if (!Y.timedout) {
                        Y.pushToEvents(Z);
                        Z.stopQueue().stop();
                        this.jCallEvent("dbltap", Y)
                    } else {}
                }
            }
        };
        (function(Z) {
            var Y = Z.$;
            var X = 10;
            Z.Event.Custom.touchdrag = new Z.Class(Z.extend(Z.Event.Custom, {
                type: "touchdrag",
                state: "dragstart",
                id: null,
                dragged: false,
                init: function(ac, ab, aa) {
                    var ad = ab.getPrimaryTouch();
                    this.id = ad.pointerId || ad.identifier;
                    this.clientX = ad.clientX;
                    this.clientY = ad.clientY;
                    this.pageX = ad.pageX;
                    this.pageY = ad.pageY;
                    this.x = ad.pageX;
                    this.y = ad.pageY;
                    this.timeStamp = ab.timeStamp;
                    this.button = 0;
                    this.target = ac;
                    this.pushToEvents(ab);
                    this.state = aa
                }
            }));
            Z.Event.Custom.touchdrag.handler = {
                add: function() {
                    var ab = Z.Event.Custom.touchdrag.handler.onTouchMove.jBind(this);
                    var aa = Z.Event.Custom.touchdrag.handler.onTouchEnd.jBind(this);
                    this.jAddEvent(["touchstart", "pointerdown"], Z.Event.Custom.touchdrag.handler.onTouchStart, 1);
                    this.jAddEvent(["touchend", "pointerup"], Z.Event.Custom.touchdrag.handler.onTouchEnd, 1);
                    this.jAddEvent(["touchmove", "pointermove"], Z.Event.Custom.touchdrag.handler.onTouchMove, 1);
                    this.jStore("event:touchdrag:listeners:document:move", ab);
                    this.jStore("event:touchdrag:listeners:document:end", aa);
                    Y(document).jAddEvent("pointermove", ab, 1);
                    Y(document).jAddEvent("pointerup", aa, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(["touchstart", "pointerdown"], Z.Event.Custom.touchdrag.handler.onTouchStart);
                    this.jRemoveEvent(["touchend", "pointerup"], Z.Event.Custom.touchdrag.handler.onTouchEnd);
                    this.jRemoveEvent(["touchmove", "pointermove"], Z.Event.Custom.touchdrag.handler.onTouchMove);
                    Y(document).jRemoveEvent("pointermove", this.jFetch("event:touchdrag:listeners:document:move") || Z.$F, 1);
                    Y(document).jRemoveEvent("pointerup", this.jFetch("event:touchdrag:listeners:document:end") || Z.$F, 1);
                    this.jDel("event:touchdrag:listeners:document:move");
                    this.jDel("event:touchdrag:listeners:document:end")
                },
                onTouchStart: function(ab) {
                    var aa;
                    if (!ab.isPrimaryTouch()) {
                        return
                    }
                    aa = new Z.Event.Custom.touchdrag(this, ab, "dragstart");
                    this.jStore("event:touchdrag:dragstart", aa)
                },
                onTouchEnd: function(ab) {
                    var aa;
                    aa = this.jFetch("event:touchdrag:dragstart");
                    if (!aa || !aa.dragged || aa.id !== ab.getPrimaryTouchId()) {
                        return
                    }
                    aa = new Z.Event.Custom.touchdrag(this, ab, "dragend");
                    this.jDel("event:touchdrag:dragstart");
                    this.jCallEvent("touchdrag", aa)
                },
                onTouchMove: function(ab) {
                    var aa;
                    aa = this.jFetch("event:touchdrag:dragstart");
                    if (!aa || !ab.isPrimaryTouch()) {
                        return
                    }
                    if (aa.id !== ab.getPrimaryTouchId()) {
                        this.jDel("event:touchdrag:dragstart");
                        return
                    }
                    if (!aa.dragged && Math.sqrt(Math.pow(ab.getPrimaryTouch().pageX - aa.x, 2) + Math.pow(ab.getPrimaryTouch().pageY - aa.y, 2)) > X) {
                        aa.dragged = true;
                        this.jCallEvent("touchdrag", aa)
                    }
                    if (!aa.dragged) {
                        return
                    }
                    aa = new Z.Event.Custom.touchdrag(this, ab, "dragmove");
                    this.jCallEvent("touchdrag", aa)
                }
            }
        }(T));
        N.Event.Custom.touchpinch = new N.Class(N.extend(N.Event.Custom, {
            type: "touchpinch",
            scale: 1,
            previousScale: 1,
            curScale: 1,
            state: "pinchstart",
            init: function(Y, X) {
                this.timeStamp = X.timeStamp;
                this.button = 0;
                this.target = Y;
                this.x = X.touches[0].clientX + (X.touches[1].clientX - X.touches[0].clientX) / 2;
                this.y = X.touches[0].clientY + (X.touches[1].clientY - X.touches[0].clientY) / 2;
                this._initialDistance = Math.sqrt(Math.pow(X.touches[0].clientX - X.touches[1].clientX, 2) + Math.pow(X.touches[0].clientY - X.touches[1].clientY, 2));
                this.pushToEvents(X)
            },
            update: function(X) {
                var Y;
                this.state = "pinchupdate";
                if (X.changedTouches[0].identifier != this.events[0].touches[0].identifier || X.changedTouches[1].identifier != this.events[0].touches[1].identifier) {
                    return
                }
                Y = Math.sqrt(Math.pow(X.changedTouches[0].clientX - X.changedTouches[1].clientX, 2) + Math.pow(X.changedTouches[0].clientY - X.changedTouches[1].clientY, 2));
                this.previousScale = this.scale;
                this.scale = Y / this._initialDistance;
                this.curScale = this.scale / this.previousScale;
                this.x = X.changedTouches[0].clientX + (X.changedTouches[1].clientX - X.changedTouches[0].clientX) / 2;
                this.y = X.changedTouches[0].clientY + (X.changedTouches[1].clientY - X.changedTouches[0].clientY) / 2;
                this.pushToEvents(X)
            }
        }));
        N.Event.Custom.touchpinch.handler = {
            add: function() {
                this.jAddEvent("touchstart", N.Event.Custom.touchpinch.handler.handleTouchStart, 1);
                this.jAddEvent("touchend", N.Event.Custom.touchpinch.handler.handleTouchEnd, 1);
                this.jAddEvent("touchmove", N.Event.Custom.touchpinch.handler.handleTouchMove, 1)
            },
            jRemove: function() {
                this.jRemoveEvent("touchstart", N.Event.Custom.touchpinch.handler.handleTouchStart);
                this.jRemoveEvent("touchend", N.Event.Custom.touchpinch.handler.handleTouchEnd);
                this.jRemoveEvent("touchmove", N.Event.Custom.touchpinch.handler.handleTouchMove)
            },
            handleTouchStart: function(Y) {
                var X;
                if (Y.touches.length != 2) {
                    return
                }
                Y.stopDefaults();
                X = new N.Event.Custom.touchpinch(this, Y);
                this.jStore("event:touchpinch:event", X)
            },
            handleTouchEnd: function(Y) {
                var X;
                X = this.jFetch("event:touchpinch:event");
                if (!X) {
                    return
                }
                Y.stopDefaults();
                this.jDel("event:touchpinch:event")
            },
            handleTouchMove: function(Y) {
                var X;
                X = this.jFetch("event:touchpinch:event");
                if (!X) {
                    return
                }
                Y.stopDefaults();
                X.update(Y);
                this.jCallEvent("touchpinch", X)
            }
        };
        (function(ac) {
            var aa = ac.$;
            ac.Event.Custom.mousescroll = new ac.Class(ac.extend(ac.Event.Custom, {
                type: "mousescroll",
                init: function(ai, ah, ak, ae, ad, aj, af) {
                    var ag = ah.jGetPageXY();
                    this.x = ag.x;
                    this.y = ag.y;
                    this.timeStamp = ah.timeStamp;
                    this.target = ai;
                    this.delta = ak || 0;
                    this.deltaX = ae || 0;
                    this.deltaY = ad || 0;
                    this.deltaZ = aj || 0;
                    this.deltaFactor = af || 0;
                    this.deltaMode = ah.deltaMode || 0;
                    this.isMouse = false;
                    this.pushToEvents(ah)
                }
            }));
            var ab, Y;

            function X() {
                ab = null
            }

            function Z(ad, ae) {
                return (ad > 50) || (1 === ae && !("win" == ac.browser.platform && ad < 1)) || (0 === ad % 12) || (0 == ad % 4.000244140625)
            }
            ac.Event.Custom.mousescroll.handler = {
                eventType: "onwheel" in document || ac.browser.ieMode > 8 ? "wheel" : "mousewheel",
                add: function() {
                    this.jAddEvent(ac.Event.Custom.mousescroll.handler.eventType, ac.Event.Custom.mousescroll.handler.handle, 1)
                },
                jRemove: function() {
                    this.jRemoveEvent(ac.Event.Custom.mousescroll.handler.eventType, ac.Event.Custom.mousescroll.handler.handle, 1)
                },
                handle: function(ai) {
                    var aj = 0,
                        ag = 0,
                        ae = 0,
                        ad = 0,
                        ah, af;
                    if (ai.detail) {
                        ae = ai.detail * -1
                    }
                    if (ai.wheelDelta !== undefined) {
                        ae = ai.wheelDelta
                    }
                    if (ai.wheelDeltaY !== undefined) {
                        ae = ai.wheelDeltaY
                    }
                    if (ai.wheelDeltaX !== undefined) {
                        ag = ai.wheelDeltaX * -1
                    }
                    if (ai.deltaY) {
                        ae = -1 * ai.deltaY
                    }
                    if (ai.deltaX) {
                        ag = ai.deltaX
                    }
                    if (0 === ae && 0 === ag) {
                        return
                    }
                    aj = 0 === ae ? ag : ae;
                    ad = Math.max(Math.abs(ae), Math.abs(ag));
                    if (!ab || ad < ab) {
                        ab = ad
                    }
                    ah = aj > 0 ? "floor" : "ceil";
                    aj = Math[ah](aj / ab);
                    ag = Math[ah](ag / ab);
                    ae = Math[ah](ae / ab);
                    if (Y) {
                        clearTimeout(Y)
                    }
                    Y = setTimeout(X, 200);
                    af = new ac.Event.Custom.mousescroll(this, ai, aj, ag, ae, 0, ab);
                    af.isMouse = Z(ab, ai.deltaMode || 0);
                    this.jCallEvent("mousescroll", af)
                }
            }
        })(T);
        N.win = N.$(window);
        N.doc = N.$(document);
        return T
    })();
    (function(J) {
        if (!J) {
            throw "MagicJS not found"
        }
        var I = J.$;
        var H = window.URL || window.webkitURL || null;
        x.ImageLoader = new J.Class({
            img: null,
            ready: false,
            options: {
                onprogress: J.$F,
                onload: J.$F,
                onabort: J.$F,
                onerror: J.$F,
                oncomplete: J.$F,
                onxhrerror: J.$F,
                xhr: false,
                progressiveLoad: true
            },
            size: null,
            _timer: null,
            loadedBytes: 0,
            _handlers: {
                onprogress: function(K) {
                    if (K.target && (200 === K.target.status || 304 === K.target.status) && K.lengthComputable) {
                        this.options.onprogress.jBind(null, (K.loaded - (this.options.progressiveLoad ? this.loadedBytes : 0)) / K.total).jDelay(1);
                        this.loadedBytes = K.loaded
                    }
                },
                onload: function(K) {
                    if (K) {
                        I(K).stop()
                    }
                    this._unbind();
                    if (this.ready) {
                        return
                    }
                    this.ready = true;
                    this._cleanup();
                    !this.options.xhr && this.options.onprogress.jBind(null, 1).jDelay(1);
                    this.options.onload.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onabort: function(K) {
                    if (K) {
                        I(K).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onabort.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                },
                onerror: function(K) {
                    if (K) {
                        I(K).stop()
                    }
                    this._unbind();
                    this.ready = false;
                    this._cleanup();
                    this.options.onerror.jBind(null, this).jDelay(1);
                    this.options.oncomplete.jBind(null, this).jDelay(1)
                }
            },
            _bind: function() {
                I(["load", "abort", "error"]).jEach(function(K) {
                    this.img.jAddEvent(K, this._handlers["on" + K].jBindAsEvent(this).jDefer(1))
                }, this)
            },
            _unbind: function() {
                if (this._timer) {
                    try {
                        clearTimeout(this._timer)
                    } catch (K) {}
                    this._timer = null
                }
                I(["load", "abort", "error"]).jEach(function(L) {
                    this.img.jRemoveEvent(L)
                }, this)
            },
            _cleanup: function() {
                this.jGetSize();
                if (this.img.jFetch("new")) {
                    var K = this.img.parentNode;
                    this.img.jRemove().jDel("new").jSetCss({
                        position: "static",
                        top: "auto"
                    });
                    K.kill()
                }
            },
            loadBlob: function(L) {
                var M = new XMLHttpRequest(),
                    K;
                I(["abort", "progress"]).jEach(function(N) {
                    M["on" + N] = I(function(O) {
                        this._handlers["on" + N].call(this, O)
                    }).jBind(this)
                }, this);
                M.onerror = I(function() {
                    this.options.onxhrerror.jBind(null, this).jDelay(1);
                    this.options.xhr = false;
                    this._bind();
                    this.img.src = L
                }).jBind(this);
                M.onload = I(function() {
                    if (200 !== M.status && 304 !== M.status) {
                        this._handlers.onerror.call(this);
                        return
                    }
                    K = M.response;
                    this._bind();
                    if (H && !J.browser.trident && !("ios" === J.browser.platform && J.browser.version < 537)) {
                        this.img.setAttribute("src", H.createObjectURL(K))
                    } else {
                        this.img.src = L
                    }
                }).jBind(this);
                M.open("GET", L);
                M.responseType = "blob";
                M.send()
            },
            init: function(L, K) {
                this.options = J.extend(this.options, K);
                this.img = I(L) || J.$new("img", {}, {
                    "max-width": "none",
                    "max-height": "none"
                }).jAppendTo(J.$new("div").jAddClass("magic-temporary-img").jSetCss({
                    position: "absolute",
                    top: -10000,
                    width: 10,
                    height: 10,
                    overflow: "hidden"
                }).jAppendTo(document.body)).jStore("new", true);
                if (J.browser.features.xhr2 && this.options.xhr && "string" == J.jTypeOf(L)) {
                    this.loadBlob(L);
                    return
                }
                var M = function() {
                    if (this.isReady()) {
                        this._handlers.onload.call(this)
                    } else {
                        this._handlers.onerror.call(this)
                    }
                    M = null
                }.jBind(this);
                this._bind();
                if ("string" == J.jTypeOf(L)) {
                    this.img.src = L
                } else {
                    if (J.browser.trident && 5 == J.browser.version && J.browser.ieMode < 9) {
                        this.img.onreadystatechange = function() {
                            if (/loaded|complete/.test(this.img.readyState)) {
                                this.img.onreadystatechange = null;
                                M && M()
                            }
                        }.jBind(this)
                    }
                    this.img.src = L.getAttribute("src")
                }
                this.img && this.img.complete && M && (this._timer = M.jDelay(100))
            },
            destroy: function() {
                this._unbind();
                this._cleanup();
                this.ready = false;
                return this
            },
            isReady: function() {
                var K = this.img;
                return (K.naturalWidth) ? (K.naturalWidth > 0) : (K.readyState) ? ("complete" == K.readyState) : K.width > 0
            },
            jGetSize: function() {
                return this.size || (this.size = {
                    width: this.img.naturalWidth || this.img.width,
                    height: this.img.naturalHeight || this.img.height
                })
            }
        })
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found"
        }
        if (I.FX) {
            return
        }
        var H = I.$;
        I.FX = new I.Class({
            init: function(K, J) {
                var L;
                this.el = I.$(K);
                this.options = I.extend(this.options, J);
                this.timer = false;
                this.easeFn = this.cubicBezierAtTime;
                L = I.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === I.jTypeOf(L)) {
                    this.easeFn = L
                } else {
                    this.cubicBezier = this.parseCubicBezier(L) || this.parseCubicBezier("ease")
                }
                if ("string" == I.jTypeOf(this.options.cycles)) {
                    this.options.cycles = "infinite" === this.options.cycles ? Infinity : parseInt(this.options.cycles) || 1
                }
            },
            options: {
                fps: 60,
                duration: 600,
                transition: "ease",
                cycles: 1,
                direction: "normal",
                onStart: I.$F,
                onComplete: I.$F,
                onBeforeRender: I.$F,
                onAfterRender: I.$F,
                forceAnimation: false,
                roundCss: false
            },
            styles: null,
            cubicBezier: null,
            easeFn: null,
            setTransition: function(J) {
                this.options.transition = J;
                J = I.FX.Transition[this.options.transition] || this.options.transition;
                if ("function" === I.jTypeOf(J)) {
                    this.easeFn = J
                } else {
                    this.easeFn = this.cubicBezierAtTime;
                    this.cubicBezier = this.parseCubicBezier(J) || this.parseCubicBezier("ease")
                }
            },
            start: function(L) {
                var J = /\%$/,
                    K;
                this.styles = L || {};
                this.cycle = 0;
                this.state = 0;
                this.curFrame = 0;
                this.pStyles = {};
                this.alternate = "alternate" === this.options.direction || "alternate-reverse" === this.options.direction;
                this.continuous = "continuous" === this.options.direction || "continuous-reverse" === this.options.direction;
                for (K in this.styles) {
                    J.test(this.styles[K][0]) && (this.pStyles[K] = true);
                    if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                        this.styles[K].reverse()
                    }
                }
                this.startTime = I.now();
                this.finishTime = this.startTime + this.options.duration;
                this.options.onStart.call();
                if (0 === this.options.duration) {
                    this.render(1);
                    this.options.onComplete.call()
                } else {
                    this.loopBind = this.loop.jBind(this);
                    if (!this.options.forceAnimation && I.browser.features.requestAnimationFrame) {
                        this.timer = I.browser.requestAnimationFrame.call(window, this.loopBind)
                    } else {
                        this.timer = this.loopBind.interval(Math.round(1000 / this.options.fps))
                    }
                }
                return this
            },
            stopAnimation: function() {
                if (this.timer) {
                    if (!this.options.forceAnimation && I.browser.features.requestAnimationFrame && I.browser.cancelAnimationFrame) {
                        I.browser.cancelAnimationFrame.call(window, this.timer)
                    } else {
                        clearInterval(this.timer)
                    }
                    this.timer = false
                }
            },
            stop: function(J) {
                J = I.defined(J) ? J : false;
                this.stopAnimation();
                if (J) {
                    this.render(1);
                    this.options.onComplete.jDelay(10)
                }
                return this
            },
            calc: function(L, K, J) {
                L = parseFloat(L);
                K = parseFloat(K);
                return (K - L) * J + L
            },
            loop: function() {
                var K = I.now(),
                    J = (K - this.startTime) / this.options.duration,
                    L = Math.floor(J);
                if (K >= this.finishTime && L >= this.options.cycles) {
                    this.stopAnimation();
                    this.render(1);
                    this.options.onComplete.jDelay(10);
                    return this
                }
                if (this.alternate && this.cycle < L) {
                    for (var M in this.styles) {
                        this.styles[M].reverse()
                    }
                }
                this.cycle = L;
                if (!this.options.forceAnimation && I.browser.features.requestAnimationFrame) {
                    this.timer = I.browser.requestAnimationFrame.call(window, this.loopBind)
                }
                this.render((this.continuous ? L : 0) + this.easeFn(J % 1))
            },
            render: function(J) {
                var K = {},
                    M = J;
                for (var L in this.styles) {
                    if ("opacity" === L) {
                        K[L] = Math.round(this.calc(this.styles[L][0], this.styles[L][1], J) * 100) / 100
                    } else {
                        K[L] = this.calc(this.styles[L][0], this.styles[L][1], J);
                        this.pStyles[L] && (K[L] += "%")
                    }
                }
                this.options.onBeforeRender(K, this.el);
                this.set(K);
                this.options.onAfterRender(K, this.el)
            },
            set: function(J) {
                return this.el.jSetCss(J)
            },
            parseCubicBezier: function(J) {
                var K, L = null;
                if ("string" !== I.jTypeOf(J)) {
                    return null
                }
                switch (J) {
                    case "linear":
                        L = H([0, 0, 1, 1]);
                        break;
                    case "ease":
                        L = H([0.25, 0.1, 0.25, 1]);
                        break;
                    case "ease-in":
                        L = H([0.42, 0, 1, 1]);
                        break;
                    case "ease-out":
                        L = H([0, 0, 0.58, 1]);
                        break;
                    case "ease-in-out":
                        L = H([0.42, 0, 0.58, 1]);
                        break;
                    case "easeInSine":
                        L = H([0.47, 0, 0.745, 0.715]);
                        break;
                    case "easeOutSine":
                        L = H([0.39, 0.575, 0.565, 1]);
                        break;
                    case "easeInOutSine":
                        L = H([0.445, 0.05, 0.55, 0.95]);
                        break;
                    case "easeInQuad":
                        L = H([0.55, 0.085, 0.68, 0.53]);
                        break;
                    case "easeOutQuad":
                        L = H([0.25, 0.46, 0.45, 0.94]);
                        break;
                    case "easeInOutQuad":
                        L = H([0.455, 0.03, 0.515, 0.955]);
                        break;
                    case "easeInCubic":
                        L = H([0.55, 0.055, 0.675, 0.19]);
                        break;
                    case "easeOutCubic":
                        L = H([0.215, 0.61, 0.355, 1]);
                        break;
                    case "easeInOutCubic":
                        L = H([0.645, 0.045, 0.355, 1]);
                        break;
                    case "easeInQuart":
                        L = H([0.895, 0.03, 0.685, 0.22]);
                        break;
                    case "easeOutQuart":
                        L = H([0.165, 0.84, 0.44, 1]);
                        break;
                    case "easeInOutQuart":
                        L = H([0.77, 0, 0.175, 1]);
                        break;
                    case "easeInQuint":
                        L = H([0.755, 0.05, 0.855, 0.06]);
                        break;
                    case "easeOutQuint":
                        L = H([0.23, 1, 0.32, 1]);
                        break;
                    case "easeInOutQuint":
                        L = H([0.86, 0, 0.07, 1]);
                        break;
                    case "easeInExpo":
                        L = H([0.95, 0.05, 0.795, 0.035]);
                        break;
                    case "easeOutExpo":
                        L = H([0.19, 1, 0.22, 1]);
                        break;
                    case "easeInOutExpo":
                        L = H([1, 0, 0, 1]);
                        break;
                    case "easeInCirc":
                        L = H([0.6, 0.04, 0.98, 0.335]);
                        break;
                    case "easeOutCirc":
                        L = H([0.075, 0.82, 0.165, 1]);
                        break;
                    case "easeInOutCirc":
                        L = H([0.785, 0.135, 0.15, 0.86]);
                        break;
                    case "easeInBack":
                        L = H([0.6, -0.28, 0.735, 0.045]);
                        break;
                    case "easeOutBack":
                        L = H([0.175, 0.885, 0.32, 1.275]);
                        break;
                    case "easeInOutBack":
                        L = H([0.68, -0.55, 0.265, 1.55]);
                        break;
                    default:
                        J = J.replace(/\s/g, "");
                        if (J.match(/^cubic-bezier\((?:-?[0-9\.]{0,}[0-9]{1,},){3}(?:-?[0-9\.]{0,}[0-9]{1,})\)$/)) {
                            L = J.replace(/^cubic-bezier\s*\(|\)$/g, "").split(",");
                            for (K = L.length - 1; K >= 0; K--) {
                                L[K] = parseFloat(L[K])
                            }
                        }
                }
                return H(L)
            },
            cubicBezierAtTime: function(V) {
                var J = 0,
                    U = 0,
                    R = 0,
                    W = 0,
                    T = 0,
                    P = 0,
                    Q = this.options.duration;

                function O(X) {
                    return ((J * X + U) * X + R) * X
                }

                function N(X) {
                    return ((W * X + T) * X + P) * X
                }

                function L(X) {
                    return (3 * J * X + 2 * U) * X + R
                }

                function S(X) {
                    return 1 / (200 * X)
                }

                function K(X, Y) {
                    return N(M(X, Y))
                }

                function M(ae, af) {
                    var ad, ac, ab, Y, X, aa;

                    function Z(ag) {
                        if (ag >= 0) {
                            return ag
                        } else {
                            return 0 - ag
                        }
                    }
                    for (ab = ae, aa = 0; aa < 8; aa++) {
                        Y = O(ab) - ae;
                        if (Z(Y) < af) {
                            return ab
                        }
                        X = L(ab);
                        if (Z(X) < 0.000001) {
                            break
                        }
                        ab = ab - Y / X
                    }
                    ad = 0;
                    ac = 1;
                    ab = ae;
                    if (ab < ad) {
                        return ad
                    }
                    if (ab > ac) {
                        return ac
                    }
                    while (ad < ac) {
                        Y = O(ab);
                        if (Z(Y - ae) < af) {
                            return ab
                        }
                        if (ae > Y) {
                            ad = ab
                        } else {
                            ac = ab
                        }
                        ab = (ac - ad) * 0.5 + ad
                    }
                    return ab
                }
                R = 3 * this.cubicBezier[0];
                U = 3 * (this.cubicBezier[2] - this.cubicBezier[0]) - R;
                J = 1 - R - U;
                P = 3 * this.cubicBezier[1];
                T = 3 * (this.cubicBezier[3] - this.cubicBezier[1]) - P;
                W = 1 - P - T;
                return K(V, S(Q))
            }
        });
        I.FX.Transition = {
            linear: "linear",
            sineIn: "easeInSine",
            sineOut: "easeOutSine",
            expoIn: "easeInExpo",
            expoOut: "easeOutExpo",
            quadIn: "easeInQuad",
            quadOut: "easeOutQuad",
            cubicIn: "easeInCubic",
            cubicOut: "easeOutCubic",
            backIn: "easeInBack",
            backOut: "easeOutBack",
            elasticIn: function(K, J) {
                J = J || [];
                return Math.pow(2, 10 * --K) * Math.cos(20 * K * Math.PI * (J[0] || 1) / 3)
            },
            elasticOut: function(K, J) {
                return 1 - I.FX.Transition.elasticIn(1 - K, J)
            },
            bounceIn: function(L) {
                for (var K = 0, J = 1; 1; K += J, J /= 2) {
                    if (L >= (7 - 4 * K) / 11) {
                        return J * J - Math.pow((11 - 6 * K - 11 * L) / 4, 2)
                    }
                }
            },
            bounceOut: function(J) {
                return 1 - I.FX.Transition.bounceIn(1 - J)
            },
            none: function(J) {
                return 0
            }
        }
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found"
        }
        if (I.PFX) {
            return
        }
        var H = I.$;
        I.PFX = new I.Class(I.FX, {
            init: function(J, K) {
                this.el_arr = J;
                this.options = I.extend(this.options, K);
                this.timer = false;
                this.$parent.init()
            },
            start: function(N) {
                var J = /\%$/,
                    M, L, K = N.length;
                this.styles_arr = N;
                this.pStyles_arr = new Array(K);
                for (L = 0; L < K; L++) {
                    this.pStyles_arr[L] = {};
                    for (M in N[L]) {
                        J.test(N[L][M][0]) && (this.pStyles_arr[L][M] = true);
                        if ("reverse" === this.options.direction || "alternate-reverse" === this.options.direction || "continuous-reverse" === this.options.direction) {
                            this.styles_arr[L][M].reverse()
                        }
                    }
                }
                this.$parent.start({});
                return this
            },
            render: function(J) {
                for (var K = 0; K < this.el_arr.length; K++) {
                    this.el = I.$(this.el_arr[K]);
                    this.styles = this.styles_arr[K];
                    this.pStyles = this.pStyles_arr[K];
                    this.$parent.render(J)
                }
            }
        })
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found";
            return
        }
        if (I.Tooltip) {
            return
        }
        var H = I.$;
        I.Tooltip = function(K, L) {
            var J = this.tooltip = I.$new("div", null, {
                position: "absolute",
                "z-index": 999
            }).jAddClass("MagicToolboxTooltip");
            I.$(K).jAddEvent("mouseover", function() {
                J.jAppendTo(document.body)
            });
            I.$(K).jAddEvent("mouseout", function() {
                J.jRemove()
            });
            I.$(K).jAddEvent("mousemove", function(Q) {
                var S = 20,
                    P = I.$(Q).jGetPageXY(),
                    O = J.jGetSize(),
                    N = I.$(window).jGetSize(),
                    R = I.$(window).jGetScroll();

                function M(V, T, U) {
                    return (U < (V - T) / 2) ? U : ((U > (V + T) / 2) ? (U - T) : (V - T) / 2)
                }
                J.jSetCss({
                    left: R.x + M(N.width, O.width + 2 * S, P.x - R.x) + S,
                    top: R.y + M(N.height, O.height + 2 * S, P.y - R.y) + S
                })
            });
            this.text(L)
        };
        I.Tooltip.prototype.text = function(J) {
            this.tooltip.firstChild && this.tooltip.removeChild(this.tooltip.firstChild);
            this.tooltip.append(document.createTextNode(J))
        }
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found";
            return
        }
        if (I.MessageBox) {
            return
        }
        var H = I.$;
        I.Message = function(M, L, K, J) {
            this.hideTimer = null;
            this.messageBox = I.$new("span", null, {
                position: "absolute",
                "z-index": 999,
                visibility: "hidden",
                opacity: 0.8
            }).jAddClass(J || "").jAppendTo(K || document.body);
            this.setMessage(M);
            this.show(L)
        };
        I.Message.prototype.show = function(J) {
            this.messageBox.show();
            this.hideTimer = this.hide.jBind(this).jDelay(I.ifndef(J, 5000))
        };
        I.Message.prototype.hide = function(J) {
            clearTimeout(this.hideTimer);
            this.hideTimer = null;
            if (this.messageBox && !this.hideFX) {
                this.hideFX = new x.FX(this.messageBox, {
                    duration: I.ifndef(J, 500),
                    onComplete: function() {
                        this.messageBox.kill();
                        delete this.messageBox;
                        this.hideFX = null
                    }.jBind(this)
                }).start({
                    opacity: [this.messageBox.jGetCss("opacity"), 0]
                })
            }
        };
        I.Message.prototype.setMessage = function(J) {
            this.messageBox.firstChild && this.tooltip.removeChild(this.messageBox.firstChild);
            this.messageBox.append(document.createTextNode(J))
        }
    })(x);
    (function(I) {
        if (!I) {
            throw "MagicJS not found"
        }
        if (I.Options) {
            return
        }
        var L = I.$,
            H = null,
            P = {
                "boolean": 1,
                array: 2,
                number: 3,
                "function": 4,
                string: 100
            },
            J = {
                "boolean": function(S, R, Q) {
                    if ("boolean" != I.jTypeOf(R)) {
                        if (Q || "string" != I.jTypeOf(R)) {
                            return false
                        } else {
                            if (!/^(true|false)$/.test(R)) {
                                return false
                            } else {
                                R = R.jToBool()
                            }
                        }
                    }
                    if (S.hasOwnProperty("enum") && !L(S["enum"]).contains(R)) {
                        return false
                    }
                    H = R;
                    return true
                },
                string: function(S, R, Q) {
                    if ("string" !== I.jTypeOf(R)) {
                        return false
                    } else {
                        if (S.hasOwnProperty("enum") && !L(S["enum"]).contains(R)) {
                            return false
                        } else {
                            H = "" + R;
                            return true
                        }
                    }
                },
                number: function(T, S, R) {
                    var Q = false,
                        V = /%$/,
                        U = (I.jTypeOf(S) == "string" && V.test(S));
                    if (R && !"number" == typeof S) {
                        return false
                    }
                    S = parseFloat(S);
                    if (isNaN(S)) {
                        return false
                    }
                    if (isNaN(T.minimum)) {
                        T.minimum = Number.NEGATIVE_INFINITY
                    }
                    if (isNaN(T.maximum)) {
                        T.maximum = Number.POSITIVE_INFINITY
                    }
                    if (T.hasOwnProperty("enum") && !L(T["enum"]).contains(S)) {
                        return false
                    }
                    if (T.minimum > S || S > T.maximum) {
                        return false
                    }
                    H = U ? (S + "%") : S;
                    return true
                },
                array: function(T, R, Q) {
                    if ("string" === I.jTypeOf(R)) {
                        try {
                            R = window.JSON.parse(R)
                        } catch (S) {
                            return false
                        }
                    }
                    if (I.jTypeOf(R) === "array") {
                        H = R;
                        return true
                    } else {
                        return false
                    }
                },
                "function": function(S, R, Q) {
                    if (I.jTypeOf(R) === "function") {
                        H = R;
                        return true
                    } else {
                        return false
                    }
                }
            },
            K = function(V, U, R) {
                var T;
                T = V.hasOwnProperty("oneOf") ? V.oneOf : [V];
                if ("array" != I.jTypeOf(T)) {
                    return false
                }
                for (var S = 0, Q = T.length - 1; S <= Q; S++) {
                    if (J[T[S].type](T[S], U, R)) {
                        return true
                    }
                }
                return false
            },
            N = function(V) {
                var T, S, U, Q, R;
                if (V.hasOwnProperty("oneOf")) {
                    Q = V.oneOf.length;
                    for (T = 0; T < Q; T++) {
                        for (S = T + 1; S < Q; S++) {
                            if (P[V.oneOf[T]["type"]] > P[V.oneOf[S].type]) {
                                R = V.oneOf[T];
                                V.oneOf[T] = V.oneOf[S];
                                V.oneOf[S] = R
                            }
                        }
                    }
                }
                return V
            },
            O = function(T) {
                var S;
                S = T.hasOwnProperty("oneOf") ? T.oneOf : [T];
                if ("array" != I.jTypeOf(S)) {
                    return false
                }
                for (var R = S.length - 1; R >= 0; R--) {
                    if (!S[R].type || !P.hasOwnProperty(S[R].type)) {
                        return false
                    }
                    if (I.defined(S[R]["enum"])) {
                        if ("array" !== I.jTypeOf(S[R]["enum"])) {
                            return false
                        }
                        for (var Q = S[R]["enum"].length - 1; Q >= 0; Q--) {
                            if (!J[S[R].type]({
                                    type: S[R].type
                                }, S[R]["enum"][Q], true)) {
                                return false
                            }
                        }
                    }
                }
                if (T.hasOwnProperty("default") && !K(T, T["default"], true)) {
                    return false
                }
                return true
            },
            M = function(Q) {
                this.schema = {};
                this.options = {};
                this.parseSchema(Q)
            };
        I.extend(M.prototype, {
            parseSchema: function(S) {
                var R, Q, T;
                for (R in S) {
                    if (!S.hasOwnProperty(R)) {
                        continue
                    }
                    Q = (R + "").jTrim().jCamelize();
                    if (!this.schema.hasOwnProperty(Q)) {
                        this.schema[Q] = N(S[R]);
                        if (!O(this.schema[Q])) {
                            throw "Incorrect definition of the '" + R + "' parameter in " + S
                        }
                        this.options[Q] = undefined
                    }
                }
            },
            set: function(R, Q) {
                R = (R + "").jTrim().jCamelize();
                if (I.jTypeOf(Q) == "string") {
                    Q = Q.jTrim()
                }
                if (this.schema.hasOwnProperty(R)) {
                    H = Q;
                    if (K(this.schema[R], Q)) {
                        this.options[R] = H
                    }
                    H = null
                }
            },
            get: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                if (this.schema.hasOwnProperty(Q)) {
                    return I.defined(this.options[Q]) ? this.options[Q] : this.schema[Q]["default"]
                }
            },
            fromJSON: function(R) {
                for (var Q in R) {
                    this.set(Q, R[Q])
                }
            },
            getJSON: function() {
                var R = I.extend({}, this.options);
                for (var Q in R) {
                    if (undefined === R[Q] && undefined !== this.schema[Q]["default"]) {
                        R[Q] = this.schema[Q]["default"]
                    }
                }
                return R
            },
            fromString: function(Q) {
                L(Q.split(";")).jEach(L(function(R) {
                    R = R.split(":");
                    this.set(R.shift().jTrim(), R.join(":"))
                }).jBind(this))
            },
            exists: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                return this.schema.hasOwnProperty(Q)
            },
            isset: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                return this.exists(Q) && I.defined(this.options[Q])
            },
            jRemove: function(Q) {
                Q = (Q + "").jTrim().jCamelize();
                if (this.exists(Q)) {
                    delete this.options[Q];
                    delete this.schema[Q]
                }
            }
        });
        I.Options = M
    }(x));
    (function(L) {
        if (!L) {
            throw "MagicJS not found";
            return
        }
        var K = L.$;
        if (L.SVGImage) {
            return
        }
        var J = "http://www.w3.org/2000/svg",
            I = "http://www.w3.org/1999/xlink";
        var H = function(M) {
            this.filters = {};
            this.originalImage = K(M);
            this.canvas = K(document.createElementNS(J, "svg"));
            this.canvas.setAttribute("width", this.originalImage.naturalWidth || this.originalImage.width);
            this.canvas.setAttribute("height", this.originalImage.naturalHeight || this.originalImage.height);
            this.image = K(document.createElementNS(J, "image"));
            this.image.setAttributeNS(I, "href", this.originalImage.getAttribute("src"));
            this.image.setAttribute("width", "100%");
            this.image.setAttribute("height", "100%");
            this.image.jAppendTo(this.canvas)
        };
        H.prototype.getNode = function() {
            return this.canvas
        };
        H.prototype.blur = function(M) {
            if (Math.round(M) < 1) {
                return
            }
            if (!this.filters.blur) {
                this.filters.blur = K(document.createElementNS(J, "filter"));
                this.filters.blur.setAttribute("id", "filterBlur");
                this.filters.blur.appendChild(K(document.createElementNS(J, "feGaussianBlur")).setProps({
                    "in": "SourceGraphic",
                    stdDeviation: M
                }));
                this.filters.blur.jAppendTo(this.canvas);
                this.image.setAttribute("filter", "url(#filterBlur)")
            } else {
                this.filters.blur.firstChild.setAttribute("stdDeviation", M)
            }
            return this
        };
        L.SVGImage = H
    }(x));
    var q = (function(J) {
        var I = J.$;
        var H = function(L, K) {
            this.settings = {
                cssPrefix: "magic",
                orientation: "horizontal",
                position: "bottom",
                size: {
                    units: "px",
                    width: "auto",
                    height: "auto"
                },
                sides: ["height", "width"]
            };
            this.parent = L;
            this.root = null;
            this.wrapper = null;
            this.context = null;
            this.buttons = {};
            this.items = [];
            this.selectedItem = null;
            this.scrollFX = null;
            this.resizeCallback = null;
            this.settings = J.extend(this.settings, K);
            this.rootCSS = this.settings.cssPrefix + "-thumbs";
            this.itemCSS = this.settings.cssPrefix + "-thumb";
            this.setupContent()
        };
        H.prototype = {
            setupContent: function() {
                this.root = J.$new("div").jAddClass(this.rootCSS).jAddClass(this.rootCSS + "-" + this.settings.orientation).jSetCss({
                    visibility: "hidden"
                });
                this.wrapper = J.$new("div").jAddClass(this.rootCSS + "-wrapper").jAppendTo(this.root);
                this.root.jAppendTo(this.parent);
                I(["prev", "next"]).jEach(function(K) {
                    this.buttons[K] = J.$new("button").jAddClass(this.rootCSS + "-button").jAddClass(this.rootCSS + "-button-" + K).jAppendTo(this.root).jAddEvent("btnclick tap", (function(M, L) {
                        I(M).events[0].stop().stopQueue();
                        I(M).stopDistribution();
                        this.scroll(L)
                    }).jBindAsEvent(this, K))
                }.jBind(this));
                this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                this.context = J.$new("ul").jAddEvent("btnclick tap", function(K) {
                    K.stop()
                })
            },
            addItem: function(L) {
                var K = J.$new("li").jAddClass(this.itemCSS).append(L).jAppendTo(this.context);
                new J.ImageLoader(L, {
                    oncomplete: this.reflow.jBind(this)
                });
                this.items.push(K);
                return K
            },
            selectItem: function(L) {
                var K = this.selectedItem || this.context.byClass(this.itemCSS + "-selected")[0];
                if (K) {
                    I(K).jRemoveClass(this.itemCSS + "-selected")
                }
                this.selectedItem = I(L);
                if (!this.selectedItem) {
                    return
                }
                this.selectedItem.jAddClass(this.itemCSS + "-selected");
                this.scroll(this.selectedItem)
            },
            run: function() {
                if (this.wrapper !== this.context.parentNode) {
                    I(this.context).jAppendTo(this.wrapper);
                    this.initDrag();
                    I(window).jAddEvent("resize", this.resizeCallback = this.reflow.jBind(this));
                    this.run.jBind(this).jDelay(1);
                    return
                }
                var K = this.parent.jGetSize();
                if (K.height > 0 && K.height > K.width) {
                    this.setOrientation("vertical")
                } else {
                    this.setOrientation("horizontal")
                }
                this.reflow();
                this.root.jSetCss({
                    visibility: ""
                })
            },
            stop: function() {
                if (this.resizeCallback) {
                    I(window).jRemoveEvent("resize", this.resizeCallback)
                }
                this.root.kill()
            },
            scroll: function(X, N) {
                var P = {
                        x: 0,
                        y: 0
                    },
                    aa = "vertical" == this.settings.orientation ? "top" : "left",
                    S = "vertical" == this.settings.orientation ? "height" : "width",
                    O = "vertical" == this.settings.orientation ? "y" : "x",
                    W = this.context.parentNode.jGetSize()[S],
                    T = this.context.parentNode.jGetPosition(),
                    M = this.context.jGetSize()[S],
                    V, K, Z, Q, L, U, R, Y = [];
                if (this.scrollFX) {
                    this.scrollFX.stop()
                } else {
                    this.context.jSetCss("transition", J.browser.cssTransformProp + String.fromCharCode(32) + "0s")
                }
                if (undefined === N) {
                    N = 600
                }
                V = this.context.jGetPosition();
                if ("string" == J.jTypeOf(X)) {
                    P[O] = ("next" == X) ? Math.max(V[aa] - T[aa] - W, W - M) : Math.min(V[aa] - T[aa] + W, 0)
                } else {
                    if ("element" == J.jTypeOf(X)) {
                        K = X.jGetSize();
                        Z = X.jGetPosition();
                        P[O] = Math.min(0, Math.max(W - M, V[aa] + W / 2 - Z[aa] - K[S] / 2))
                    } else {
                        return
                    }
                }
                if (J.browser.gecko && "android" == J.browser.platform || J.browser.ieMode && J.browser.ieMode < 10) {
                    if ("string" == J.jTypeOf(X) && P[O] == V[aa] - T[aa]) {
                        V[aa] += 0 === V[aa] - T[aa] ? 30 : -30
                    }
                    P["margin-" + aa] = [((M <= W) ? 0 : (V[aa] - T[aa])), P[O]];
                    delete P.x;
                    delete P.y;
                    if (!this.selectorsMoveFX) {
                        this.selectorsMoveFX = new J.PFX([this.context], {
                            duration: 500
                        })
                    }
                    Y.push(P);
                    this.selectorsMoveFX.start(Y);
                    R = P["margin-" + aa][1]
                } else {
                    this.context.jSetCss({
                        transition: J.browser.cssTransformProp + String.fromCharCode(32) + N + "ms ease",
                        transform: "translate3d(" + P.x + "px, " + P.y + "px, 0)"
                    });
                    R = P[O]
                }
                if (R >= 0) {
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled")
                } else {
                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled")
                }
                if (R <= W - M) {
                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled")
                } else {
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                }
                R = null
            },
            initDrag: function() {
                var M, L, N, U, T, W, O, S, R, V, ab, Y, Z, X = {
                        x: 0,
                        y: 0
                    },
                    K, Q, P = 300,
                    aa = function(ae) {
                        var ad, ac = 0;
                        for (ad = 1.5; ad <= 90; ad += 1.5) {
                            ac += (ae * Math.cos(ad / Math.PI / 2))
                        }(U < 0) && (ac *= (-1));
                        return ac
                    };
                T = I(function(ac) {
                    X = {
                        x: 0,
                        y: 0
                    };
                    K = "vertical" == this.settings.orientation ? "top" : "left";
                    Q = "vertical" == this.settings.orientation ? "height" : "width";
                    M = "vertical" == this.settings.orientation ? "y" : "x";
                    Y = this.context.parentNode.jGetSize()[Q];
                    ab = this.context.jGetSize()[Q];
                    N = Y - ab;
                    if (N >= 0) {
                        return
                    }
                    if (ac.state == "dragstart") {
                        if (undefined === Z) {
                            Z = 0
                        }
                        this.context.jSetCssProp("transition", J.browser.cssTransformProp + String.fromCharCode(32) + "0ms");
                        W = ac[M];
                        R = ac.y;
                        S = ac.x;
                        V = false
                    } else {
                        if ("dragend" == ac.state) {
                            if (V) {
                                return
                            }
                            O = aa(Math.abs(U));
                            Z += O;
                            (Z <= N) && (Z = N);
                            (Z >= 0) && (Z = 0);
                            X[M] = Z;
                            this.context.jSetCssProp("transition", J.browser.cssTransformProp + String.fromCharCode(32) + P + "ms  cubic-bezier(.0, .0, .0, 1)");
                            this.context.jSetCssProp("transform", "translate3d(" + X.x + "px, " + X.y + "px, 0px)");
                            U = 0
                        } else {
                            if (V) {
                                return
                            }
                            if ("horizontal" == this.settings.orientation && Math.abs(ac.x - S) > Math.abs(ac.y - R) || "vertical" == this.settings.orientation && Math.abs(ac.x - S) < Math.abs(ac.y - R)) {
                                ac.stop();
                                U = ac[M] - W;
                                Z += U;
                                X[M] = Z;
                                this.context.jSetCssProp("transform", "translate3d(" + X.x + "px, " + X.y + "px, 0px)");
                                if (Z >= 0) {
                                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled")
                                } else {
                                    this.buttons.prev.jRemoveClass(this.rootCSS + "-button-disabled")
                                }
                                if (Z <= N) {
                                    this.buttons.next.jAddClass(this.rootCSS + "-button-disabled")
                                } else {
                                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                                }
                            } else {
                                V = true
                            }
                        }
                        W = ac[M]
                    }
                }).jBind(this);
                this.context.jAddEvent("touchdrag", T)
            },
            reflow: function() {
                var N, M, K, L = this.parent.jGetSize();
                if (L.height > 0 && L.height > L.width) {
                    this.setOrientation("vertical")
                } else {
                    this.setOrientation("horizontal")
                }
                N = "vertical" == this.settings.orientation ? "height" : "width";
                M = this.context.jGetSize()[N];
                K = this.root.jGetSize()[N];
                if (M <= K) {
                    this.root.jAddClass("no-buttons");
                    this.context.jSetCssProp("transition", "").jGetSize();
                    this.context.jSetCssProp("transform", "translate3d(0,0,0)");
                    this.buttons.prev.jAddClass(this.rootCSS + "-button-disabled");
                    this.buttons.next.jRemoveClass(this.rootCSS + "-button-disabled")
                } else {
                    this.root.jRemoveClass("no-buttons")
                }
                if (this.selectedItem) {
                    this.scroll(this.selectedItem, 0)
                }
            },
            setOrientation: function(K) {
                if ("vertical" !== K && "horizontal" !== K || K == this.settings.orientation) {
                    return
                }
                this.root.jRemoveClass(this.rootCSS + "-" + this.settings.orientation);
                this.settings.orientation = K;
                this.root.jAddClass(this.rootCSS + "-" + this.settings.orientation);
                this.context.jSetCssProp("transition", "none").jGetSize();
                this.context.jSetCssProp("transform", "").jSetCssProp("margin", "")
            }
        };
        return H
    })(x);
    var g = y.$;
    if (typeof Object.assign !== "function") {
        Object.assign = function(K) {
            if (K == null) {
                throw new TypeError("Cannot convert undefined or null to object")
            }
            K = Object(K);
            for (var H = 1; H < arguments.length; H++) {
                var J = arguments[H];
                if (J != null) {
                    for (var I in J) {
                        if (Object.prototype.hasOwnProperty.call(J, I)) {
                            K[I] = J[I]
                        }
                    }
                }
            }
            return K
        }
    }
    if (!y.browser.cssTransform) {
        y.browser.cssTransform = y.normalizeCSS("transform").dashize()
    }
    var n = {
        zoomOn: {
            type: "string",
            "enum": ["click", "hover"],
            "default": "hover"
        },
        zoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "preview", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        zoomWidth: {
            oneOf: [{
                type: "string",
                "enum": ["auto"]
            }, {
                type: "number",
                minimum: 1
            }],
            "default": "auto"
        },
        zoomHeight: {
            oneOf: [{
                type: "string",
                "enum": ["auto"]
            }, {
                type: "number",
                minimum: 1
            }],
            "default": "auto"
        },
        zoomPosition: {
            type: "string",
            "default": "right"
        },
        zoomDistance: {
            type: "number",
            minimum: 0,
            "default": 15
        },
        zoomCaption: {
            oneOf: [{
                type: "string",
                "enum": ["bottom", "top", "off"],
                "default": "off"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "off"
        },
        expand: {
            oneOf: [{
                type: "string",
                "enum": ["window", "fullscreen", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "window"
        },
        expandZoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        expandZoomOn: {
            type: "string",
            "enum": ["click", "always"],
            "default": "click"
        },
        expandCaption: {
            type: "boolean",
            "default": true
        },
        closeOnClickOutside: {
            type: "boolean",
            "default": true
        },
        hint: {
            oneOf: [{
                type: "string",
                "enum": ["once", "always", "off"]
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "once"
        },
        smoothing: {
            type: "boolean",
            "default": true
        },
        upscale: {
            type: "boolean",
            "default": true
        },
        variableZoom: {
            type: "boolean",
            "default": false
        },
        lazyZoom: {
            type: "boolean",
            "default": false
        },
        autostart: {
            type: "boolean",
            "default": true
        },
        rightClick: {
            type: "boolean",
            "default": false
        },
        transitionEffect: {
            type: "boolean",
            "default": true
        },
        selectorTrigger: {
            type: "string",
            "enum": ["click", "hover"],
            "default": "click"
        },
        cssClass: {
            type: "string"
        },
        forceTouch: {
            type: "boolean",
            "default": false
        },
        textHoverZoomHint: {
            type: "string",
            "default": "Hover to zoom"
        },
        textClickZoomHint: {
            type: "string",
            "default": "Click to zoom"
        },
        textExpandHint: {
            type: "string",
            "default": "Click to expand"
        },
        textBtnClose: {
            type: "string",
            "default": "Close"
        },
        textBtnNext: {
            type: "string",
            "default": "Next"
        },
        textBtnPrev: {
            type: "string",
            "default": "Previous"
        }
    };
    var k = {
        zoomMode: {
            oneOf: [{
                type: "string",
                "enum": ["zoom", "magnifier", "off"],
                "default": "zoom"
            }, {
                type: "boolean",
                "enum": [false]
            }],
            "default": "zoom"
        },
        expandZoomOn: {
            type: "string",
            "enum": ["click", "always"],
            "default": "click"
        },
        textExpandHint: {
            type: "string",
            "default": "Tap to expand"
        },
        textHoverZoomHint: {
            type: "string",
            "default": "Touch to zoom"
        },
        textClickZoomHint: {
            type: "string",
            "default": "Double tap to zoom"
        }
    };
    var m = "MagicZoom";
    var C = "mz";
    var b = 20;
    var z = ["onZoomReady", "onUpdate", "onZoomIn", "onZoomOut", "onExpandOpen", "onExpandClose"];
    var B = 600;
    var t;
    var o = {};
    var E = g([]);
    var G;
    var e = window.devicePixelRatio || 1;
    var F;
    var w = true;
    var f = y.browser.features.perspective ? "translate3d(" : "translate(";
    var A = y.browser.features.perspective ? ",0)" : ")";
    var l = null;
    var p = (function() {
        var I, L, K, J, H;
        H = ["2o.f|kh3,fzz~4!!yyy coigmzaablav mac!coigmtaac~b{}!,.a`mbgme3,zfg} lb{|&'5,.zo|ikz3,Qlbo`e,.}zwbk3,maba|4.g`fk|gz5.zkvz#jkma|ozga`4.`a`k5,0Coigm.Taac.^b{}(z|ojk5.z|gob.xk|}ga`2!o0", "#ff0000", 11, "normal", "", "center", "100%"];
        return H
    })();
    var r = function() {
        return "mgctlbxN$MZ" + "p".toUpperCase() + " mgctlbxV$" + "v5.2.6".replace("v", "") + " mgctlbxL$" + "t".toUpperCase() + ((window.mgctlbx$Pltm && y.jTypeOf(window.mgctlbx$Pltm) === "string") ? " mgctlbxP$" + window.mgctlbx$Pltm.toLowerCase() : "")
    };

    function v(J) {
        var I, H;
        I = "";
        for (H = 0; H < J.length; H++) {
            I += String.fromCharCode(14 ^ J.charCodeAt(H))
        }
        return I
    }

    function h(J) {
        var I = [],
            H = null;
        (J && (H = g(J))) && (I = E.filter(function(K) {
            return K.placeholder === H
        }));
        return I.length ? I[0] : null
    }

    function a(J) {
        var I = g(window).jGetSize();
        var H = g(window).jGetScroll();
        J = J || 0;
        return {
            left: J,
            right: I.width - J,
            top: J,
            bottom: I.height - J,
            x: H.x,
            y: H.y
        }
    }

    function d(H) {
        return Object.assign({}, H, {
            type: H.type,
            pageX: H.pageX,
            pageY: H.pageY,
            screenX: H.screenX,
            screenY: H.screenY,
            clientX: H.clientX,
            clientY: H.clientY
        })
    }

    function s() {
        var J = y.$A(arguments);
        var I = J.shift();
        var H = o[I];
        if (H) {
            for (var K = 0; K < H.length; K++) {
                H[K].apply(null, J)
            }
        }
    }

    function D() {
        var L = arguments[0],
            H, K, I = [];
        try {
            do {
                K = L.tagName;
                if (/^[A-Za-z]*$/.test(K)) {
                    if (H = L.getAttribute("id")) {
                        if (/^[A-Za-z][-A-Za-z0-9_]*/.test(H)) {
                            K += "#" + H
                        }
                    }
                    I.push(K)
                }
                L = L.parentNode
            } while (L && L !== document.documentElement);
            I = I.reverse();
            y.addCSS(I.join(" ") + "> .mz-figure > img", {
                width: "100% !important;",
                transition: "none",
                transform: "none"
            }, "mz-runtime-css", true)
        } catch (J) {}
    }

    function u() {
        var I = null,
            J = null,
            H = function() {
                window.scrollTo(document.body.scrollLeft, document.body.scrollTop);
                window.dispatchEvent(new Event("resize"))
            };
        J = setInterval(function() {
            var M = window.orientation === 90 || window.orientation === -90;
            var L = window.innerHeight;
            var K = (M ? screen.availWidth : screen.availHeight) * 0.85;
            if ((I === null || I === false) && ((M && L < K) || (!M && L < K))) {
                I = true;
                H()
            } else {
                if ((I === null || I === true) && ((M && L > K) || (!M && L > K))) {
                    I = false;
                    H()
                }
            }
        }, 250);
        return J
    }

    function c() {
        y.addCSS(".magic-hidden-wrapper, .magic-temporary-img", {
            display: "block !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            width: "10px !important",
            height: "10px !important",
            position: "absolute !important",
            top: "-10000px !important",
            left: "0 !important",
            overflow: "hidden !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magiczoom-reset-css");
        y.addCSS(".magic-temporary-img img", {
            display: "inline-block !important",
            border: "0 !important",
            padding: "0 !important",
            "min-height": "0 !important",
            "min-width": "0 !important",
            "max-height": "none !important",
            "max-width": "none !important",
            "-webkit-transform": "none !important",
            transform: "none !important",
            "-webkit-transition": "none !important",
            transition: "none !important"
        }, "magiczoom-reset-css");
        if (y.browser.androidBrowser) {
            y.addCSS(".mobile-magic .mz-expand .mz-expand-bg", {
                display: "none !important"
            }, "magiczoom-reset-css")
        }
        if (y.browser.androidBrowser && (y.browser.uaName !== "chrome" || y.browser.uaVersion === 44)) {
            y.addCSS(".mobile-magic .mz-zoom-window.mz-magnifier, .mobile-magic .mz-zoom-window.mz-magnifier:before", {
                "border-radius": "0 !important"
            }, "magiczoom-reset-css")
        }
    }
    var j = function(K, L, I, J, H) {
        this.small = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: false
        };
        this.zoom = {
            src: null,
            url: null,
            dppx: 1,
            node: null,
            state: 0,
            size: {
                width: 0,
                height: 0
            },
            loaded: false
        };
        if (y.jTypeOf(K) === "object") {
            this.small = K
        } else {
            if (y.jTypeOf(K) === "string") {
                this.small.url = y.getAbsoluteURL(K)
            }
        }
        if (y.jTypeOf(L) === "object") {
            this.zoom = L
        } else {
            if (y.jTypeOf(L) === "string") {
                this.zoom.url = y.getAbsoluteURL(L)
            }
        }
        this.caption = I;
        this.options = J;
        this.origin = H;
        this.callback = null;
        this.link = null;
        this.node = null
    };
    j.prototype = {
        parseNode: function(J, I, H) {
            var K = J.byTag("img")[0];
            if (H) {
                this.small.node = K || y.$new("img").jAppendTo(J)
            }
            if (e > 1) {
                this.small.url = J.getAttribute("data-image-2x");
                if (this.small.url) {
                    this.small.dppx = 2
                }
                this.zoom.url = J.getAttribute("data-zoom-image-2x");
                if (this.zoom.url) {
                    this.zoom.dppx = 2
                }
            }
            this.small.src = J.getAttribute("data-image") || J.getAttribute("rev") || (K ? K.currentSrc || K.getAttribute("src") : null);
            if (this.small.src) {
                this.small.src = y.getAbsoluteURL(this.small.src)
            }
            this.small.url = this.small.url || this.small.src;
            if (this.small.url) {
                this.small.url = y.getAbsoluteURL(this.small.url)
            }
            this.zoom.src = J.getAttribute("data-zoom-image") || J.getAttribute("href");
            if (this.zoom.src) {
                this.zoom.src = y.getAbsoluteURL(this.zoom.src)
            }
            this.zoom.url = this.zoom.url || this.zoom.src;
            if (this.zoom.url) {
                this.zoom.url = y.getAbsoluteURL(this.zoom.url)
            }
            this.caption = J.getAttribute("data-caption") || J.getAttribute("title") || I;
            this.link = J.getAttribute("data-link");
            this.origin = J;
            return this
        },
        loadImg: function(H) {
            var I = null;
            if (arguments.length > 1 && y.jTypeOf(arguments[1]) === "function") {
                I = arguments[1]
            }
            if (this[H].state !== 0) {
                if (this[H].loaded) {
                    this.onload(I)
                }
                return
            }
            if (this[H].url && this[H].node && !this[H].node.getAttribute("src") && !this[H].node.getAttribute("srcset")) {
                this[H].node.setAttribute("src", this[H].url)
            }
            this[H].state = 1;
            new y.ImageLoader(this[H].node || this[H].url, {
                oncomplete: g(function(J) {
                    this[H].loaded = true;
                    this[H].state = J.ready ? 2 : -1;
                    if (J.ready) {
                        this[H].size = J.jGetSize();
                        if (!this[H].node) {
                            this[H].node = g(J.img);
                            this[H].node.getAttribute("style");
                            this[H].node.removeAttribute("style");
                            this[H].size.width /= this[H].dppx;
                            this[H].size.height /= this[H].dppx
                        } else {
                            this[H].node.jSetCss({
                                "max-width": this[H].size.width,
                                "max-height": this[H].size.height
                            });
                            if (this[H].node.currentSrc && this[H].node.currentSrc !== this[H].node.src) {
                                this[H].url = this[H].node.currentSrc
                            } else {
                                if (y.getAbsoluteURL(this[H].node.getAttribute("src") || "") !== this[H].url) {
                                    this[H].node.setAttribute("src", this[H].url)
                                }
                            }
                        }
                    }
                    this.onload(I)
                }).jBind(this)
            })
        },
        loadSmall: function() {
            this.loadImg("small", arguments[0])
        },
        loadZoom: function() {
            this.loadImg("zoom", arguments[0])
        },
        load: function() {
            this.callback = null;
            if (arguments.length > 0 && y.jTypeOf(arguments[0]) === "function") {
                this.callback = arguments[0]
            }
            this.loadSmall();
            this.loadZoom()
        },
        onload: function(H) {
            if (H) {
                H.call(null, this)
            }
            if (this.callback && this.small.loaded && this.zoom.loaded) {
                this.callback.call(null, this);
                this.callback = null;
                return
            }
        },
        loaded: function() {
            return (this.small.loaded && this.zoom.loaded)
        },
        ready: function() {
            return (this.small.state === 2 && this.zoom.state === 2)
        },
        getURL: function(I) {
            var H = I === "small" ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && this[I].state === 2)) {
                return this[I].url
            } else {
                if (!this[H].loaded || (this[H].loaded && this[H].state === 2)) {
                    return this[H].url
                } else {
                    return null
                }
            }
        },
        getNode: function(I) {
            var H = I === "small" ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && this[I].state === 2)) {
                return this[I].node
            } else {
                if (!this[H].loaded || (this[H].loaded && this[H].state === 2)) {
                    return this[H].node
                } else {
                    return null
                }
            }
        },
        jGetSize: function(I) {
            var H = I === "small" ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && this[I].state === 2)) {
                return this[I].size
            } else {
                if (!this[H].loaded || (this[H].loaded && this[H].state === 2)) {
                    return this[H].size
                } else {
                    return {
                        width: 0,
                        height: 0
                    }
                }
            }
        },
        getRatio: function(I) {
            var H = I === "small" ? "zoom" : "small";
            if (!this[I].loaded || (this[I].loaded && this[I].state === 2)) {
                return this[I].dppx
            } else {
                if (!this[H].loaded || (this[H].loaded && this[H].state === 2)) {
                    return this[H].dppx
                } else {
                    return 1
                }
            }
        },
        setCurNode: function(H) {
            this.node = this.getNode(H)
        }
    };
    var i = function(I, H) {
        this.options = new y.Options(n);
        this.option = g(function() {
            if (arguments.length > 1) {
                return this.set(arguments[0], arguments[1])
            } else {
                return this.get(arguments[0])
            }
        }).jBind(this.options);
        this.touchOptions = new y.Options(k);
        this.additionalImages = [];
        this.image = null;
        this.primaryImage = null;
        this.placeholder = g(I).jAddEvent("dragstart selectstart click", function(J) {
            J.stop()
        });
        this.id = null;
        this.node = null;
        this.stubNode = null;
        this.originalImg = null;
        this.originalImgSrc = null;
        this.originalTitle = null;
        this.normalSize = {
            width: 0,
            height: 0
        };
        this.size = {
            width: 0,
            height: 0
        };
        this.zoomSize = {
            width: 0,
            height: 0
        };
        this.zoomSizeOrigin = {
            width: 0,
            height: 0
        };
        this.boundaries = {
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
        };
        this.ready = false;
        this.expanded = false;
        this.activateTimer = null;
        this.resizeTimer = null;
        this.resizeCallback = g(function() {
            if (this.expanded) {
                this.image.node.jSetCss({
                    "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
                });
                this.image.node.jSetCss({
                    "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
                })
            }
            this.reflowZoom(arguments[0])
        }).jBind(this);
        this.onResize = g(function(J) {
            clearTimeout(this.resizeTimer);
            this.resizeTimer = g(this.resizeCallback).jDelay(10, J.type === "scroll")
        }).jBindAsEvent(this);
        if (r) {
            G.append(y.$new("div", {}, {
                display: "none",
                visibility: "hidden"
            }).append(document.createTextNode(r)));
            r = undefined
        }
        this.lens = null;
        this.zoomBox = null;
        this.hint = null;
        this.hintMessage = null;
        this.hintRuns = 0;
        this.mobileZoomHint = true;
        this.loadingBox = null;
        this.loadTimer = null;
        this.thumb = null;
        this.expandBox = null;
        this.expandBg = null;
        this.expandCaption = null;
        this.expandStage = null;
        this.expandImageStage = null;
        this.expandFigure = null;
        this.expandControls = null;
        this.expandNav = null;
        this.expandThumbs = null;
        this.expandGallery = [];
        this.buttons = {};
        this.startAttempts = 0;
        this.startTimer = null;
        this.start(H)
    };
    i.prototype = {
        loadOptions: function(H) {
            this.options.fromJSON(window[C + "Options"] || {});
            this.options.fromString(this.placeholder.getAttribute("data-options") || "");
            if (!y.browser.touchScreen) {
                this.option("forceTouch", false)
            }
            if (y.browser.mobile || this.option("forceTouch")) {
                this.options.fromJSON(this.touchOptions.getJSON());
                this.options.fromJSON(window[C + "MobileOptions"] || {});
                this.options.fromString(this.placeholder.getAttribute("data-mobile-options") || "")
            }
            if (y.jTypeOf(H) === "string") {
                this.options.fromString(H || "")
            } else {
                this.options.fromJSON(H || {})
            }
            if (this.option("cssClass")) {
                this.option("cssClass", this.option("cssClass").replace(",", " "))
            }
            if (this.option("zoomCaption") === false) {
                this.option("zoomCaption", "off")
            }
            if (this.option("hint") === false) {
                this.option("hint", "off")
            }
            switch (this.option("hint")) {
                case "off":
                    this.hintRuns = 0;
                    break;
                case "always":
                    this.hintRuns = Infinity;
                    break;
                case "once":
                default:
                    this.hintRuns = 2;
                    break
            }
            if (this.option("zoomMode") === "off") {
                this.option("zoomMode", false)
            }
            if (this.option("expand") === "off") {
                this.option("expand", false)
            }
            if (this.option("expandZoomMode") === "off") {
                this.option("expandZoomMode", false)
            }
            if (y.browser.mobile && this.option("zoomMode") === "zoom" && this.option("zoomPosition") === "inner") {
                if (this.option("expand")) {
                    this.option("zoomMode", false)
                } else {
                    this.option("zoomOn", "click")
                }
            }
        },
        start: function(K) {
            var I;
            var H = this;
            var J;
            if (this.startAttempts < 1) {
                this.loadOptions(K);
                if (w && !this.option("autostart")) {
                    return
                }
                this.originalImg = this.placeholder.querySelector("img");
                this.originalImgSrc = this.originalImg ? this.originalImg.getAttribute("src") : null;
                this.originalTitle = g(this.placeholder).getAttribute("title");
                g(this.placeholder).removeAttribute("title")
            }
            J = new j().parseNode(this.placeholder, this.originalTitle, true);
            if (!J.small.url) {
                if (++this.startAttempts <= B) {
                    this.startTimer = setTimeout(function() {
                        H.start()
                    }, 100)
                }
                return
            }
            this.primaryImage = J;
            this.image = this.primaryImage;
            D(this.placeholder);
            this.id = this.placeholder.getAttribute("id") || "mz-" + Math.floor(Math.random() * y.now());
            this.placeholder.setAttribute("id", this.id);
            this.node = y.$new("figure").jAddClass("mz-figure");
            this.node.enclose(this.image.small.node).jAddClass(this.option("cssClass"));
            if (this.option("rightClick") !== true) {
                this.node.jAddEvent("contextmenu", function(M) {
                    M.stop();
                    return false
                })
            }
            this.node.jAddClass("mz-" + this.option("zoomOn") + "-zoom");
            if (!this.option("expand")) {
                this.node.jAddClass("mz-no-expand")
            }
            this.lens = {
                node: y.$new("div", {
                    "class": "mz-lens"
                }, {
                    top: 0
                }).jAppendTo(this.node),
                image: y.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute",
                    top: 0,
                    left: 0
                }),
                width: 0,
                height: 0,
                pos: {
                    x: 0,
                    y: 0
                },
                spos: {
                    x: 0,
                    y: 0
                },
                size: {
                    width: 0,
                    height: 0
                },
                border: {
                    x: 0,
                    y: 0
                },
                dx: 0,
                dy: 0,
                innertouch: false,
                hide: function() {
                    if (y.browser.features.transform) {
                        this.node.jSetCss({
                            transform: "translate(-10000px, -10000px)"
                        })
                    } else {
                        this.node.jSetCss({
                            top: -10000
                        })
                    }
                }
            };
            this.lens.hide();
            this.lens.node.append(this.lens.image);
            this.zoomBox = {
                node: y.$new("div", {
                    "class": "mz-zoom-window"
                }, {
                    top: -100000
                }).jAddClass(this.option("cssClass")).jAppendTo(G),
                image: y.$new("img", {
                    src: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
                }, {
                    position: "absolute"
                }),
                aspectRatio: 0,
                width: 0,
                height: 0,
                innerWidth: 0,
                innerHeight: 0,
                size: {
                    width: "auto",
                    wunits: "px",
                    height: "auto",
                    hunits: "px"
                },
                mode: this.option("zoomMode"),
                position: this.option("zoomPosition"),
                trigger: this.option("zoomOn"),
                custom: false,
                active: false,
                activating: false,
                enabled: false,
                enable: g(function() {
                    this.zoomBox.enabled = arguments[0] !== false;
                    this.node[this.zoomBox.enabled ? "jRemoveClass" : "jAddClass"]("mz-no-zoom")
                }).jBind(this),
                hide: g(function() {
                    var M = g(this.node).jFetch("cr");
                    this.zoomBox.node.jRemoveEvent("transitionend");
                    this.zoomBox.node.jSetCss({
                        top: -100000
                    }).jAppendTo(G);
                    this.zoomBox.node.jRemoveClass("mz-deactivating mz-p-" + (this.zoomBox.mode === "zoom" ? this.zoomBox.position : this.zoomBox.mode));
                    if (!this.expanded && M) {
                        M.jRemove()
                    }
                    this.zoomBox.image.getAttribute("style");
                    this.zoomBox.image.removeAttribute("style")
                }).jBind(this),
                setMode: g(function(M) {
                    this.node[M === false ? "jAddClass" : "jRemoveClass"]("mz-no-zoom");
                    this.node[M === "magnifier" ? "jAddClass" : "jRemoveClass"]("mz-magnifier-zoom");
                    this.zoomBox.node[M === "magnifier" ? "jAddClass" : "jRemoveClass"]("mz-magnifier");
                    this.zoomBox.node[M === "preview" ? "jAddClass" : "jRemoveClass"]("mz-preview");
                    if (M !== "zoom") {
                        this.node.jRemoveClass("mz-inner-zoom");
                        this.zoomBox.node.jRemoveClass("mz-inner")
                    }
                    this.zoomBox.mode = M;
                    if (M === false) {
                        this.zoomBox.enable(false)
                    }
                }).jBind(this)
            };
            this.zoomBox.node.append(this.zoomBox.image);
            this.zoomBox.setMode(this.option("zoomMode"));
            this.zoomBox.image.removeAttribute("width");
            this.zoomBox.image.removeAttribute("height");
            if (typeof(p) !== "undefined") {
                var L = Math.floor(Math.random() * y.now());
                g(this.node).jStore("cr", y.$new(((Math.floor(Math.random() * 101) + 1) % 2) ? "span" : "div").setProps({
                    id: "crMz" + L
                }).jSetCss({
                    display: "inline",
                    overflow: "hidden",
                    visibility: "visible",
                    color: p[1],
                    fontSize: p[2],
                    fontWeight: p[3],
                    fontFamily: "sans-serif",
                    position: "absolute",
                    top: 8,
                    left: 8,
                    margin: "auto",
                    width: "auto",
                    textAlign: "right",
                    lineHeight: "2em",
                    zIndex: 2147483647
                }).changeContent(v(p[0])));
                if (g(g(this.node).jFetch("cr")).byTag("a")[0]) {
                    g(g(g(this.node).jFetch("cr")).byTag("a")[0]).jAddEvent("tap btnclick", function(M) {
                        M.stopDistribution();
                        window.open(this.href)
                    }).setProps({
                        id: "mzCrA" + L
                    })
                }
                var selector = "#" + this.id + " > figure.mz-figure > #" + ("crMz" + L) + ",#" + this.id + " > figure.mz-figure > #" + ("crMz" + L) + " > #" + ("mzCrA" + L) + ",html body .mz-expand > #" + ("crMz" + L) + ",html body .mz-expand > #" + ("crMz" + L) + " > #" + ("mzCrA" + L);
                y.addCSS(selector, {
                    display: "none !important;",
                    visibility: "hidden !important;",
                    color: "transparent !important;",
                    "font-size": "0 px !important;",
                    "z-index": "2147483647 !important;"
                }, "mz-runtime-css", true);
            }
            if ((I = ("" + this.option("zoomWidth")).match(/^([0-9]+)?(px|%)?$/))) {
                this.zoomBox.size.wunits = I[2] || "px";
                this.zoomBox.size.width = (parseFloat(I[1]) || "auto")
            }
            if ((I = ("" + this.option("zoomHeight")).match(/^([0-9]+)?(px|%)?$/))) {
                this.zoomBox.size.hunits = I[2] || "px";
                this.zoomBox.size.height = (parseFloat(I[1]) || "auto")
            }
            if (this.zoomBox.mode === "magnifier") {
                this.node.jAddClass("mz-magnifier-zoom");
                this.zoomBox.node.jAddClass("mz-magnifier");
                if (this.zoomBox.size.width === "auto") {
                    this.zoomBox.size.wunits = "%";
                    this.zoomBox.size.width = 70
                }
                if (this.zoomBox.size.height === "auto") {
                    this.zoomBox.size.hunits = "%"
                }
            } else {
                if (this.option("zoom-position").match(/^#/)) {
                    if (this.zoomBox.custom = g(this.option("zoom-position").replace(/^#/, ""))) {
                        if (g(this.zoomBox.custom).jGetSize().height > 50) {
                            if (this.zoomBox.size.width === "auto") {
                                this.zoomBox.size.wunits = "%";
                                this.zoomBox.size.width = 100
                            }
                            if (this.zoomBox.size.height === "auto") {
                                this.zoomBox.size.hunits = "%";
                                this.zoomBox.size.height = 100
                            }
                        }
                    } else {
                        this.option("zoom-position", "right")
                    }
                }
                if (this.zoomBox.mode === "preview") {
                    if (this.zoomBox.size.width === "auto") {
                        this.zoomBox.size.wunits = "px"
                    }
                    if (this.zoomBox.size.height === "auto") {
                        this.zoomBox.size.hunits = "px"
                    }
                }
                if (this.zoomBox.mode === "zoom") {
                    if (this.zoomBox.size.width === "auto" || this.option("zoom-position") === "inner") {
                        this.zoomBox.size.wunits = "%";
                        this.zoomBox.size.width = 100
                    }
                    if (this.zoomBox.size.height === "auto" || this.option("zoom-position") === "inner") {
                        this.zoomBox.size.hunits = "%";
                        this.zoomBox.size.height = 100
                    }
                }
                if (this.option("zoom-position") === "inner") {
                    this.node.jAddClass("mz-inner-zoom")
                }
            }
            this.zoomBox.position = this.zoomBox.custom ? "custom" : this.option("zoom-position");
            this.lens.border.x = parseFloat(this.lens.node.jGetCss("border-left-width") || "0");
            this.lens.border.y = parseFloat(this.lens.node.jGetCss("border-top-width") || "0");
            this.image.loadSmall(function() {
                if (this.image.small.state !== 2) {
                    return
                }
                this.image.setCurNode("small");
                this.size = this.image.node.jGetSize();
                this.registerEvents();
                this.ready = true;
                if (this.option("lazyZoom") === true) {
                    s("onZoomReady", this.id);
                    if (y.browser.mobile) {
                        this.reflowZoom()
                    } else {
                        this.showHint()
                    }
                }
            }.jBind(this));
            if (this.option("lazyZoom") !== true || this.option("zoomOn") === "always") {
                this.image.load(g(function(M) {
                    this.setupZoom(M, true)
                }).jBind(this));
                this.loadTimer = g(this.showLoading).jBind(this).jDelay(400)
            }
            this.setupSelectors()
        },
        stop: function() {
            clearTimeout(this.startTimer);
            this.unregisterEvents();
            if (this.zoomBox) {
                this.zoomBox.node.kill()
            }
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                this.expandThumbs = null
            }
            if (this.expandBox) {
                this.expandBox.kill()
            }
            if (this.expanded) {
                g(y.browser.getDoc()).jSetCss({
                    overflow: ""
                })
            }
            g(this.additionalImages).jEach(function(H) {
                g(H.origin).jRemoveClass("mz-thumb-selected").jRemoveClass(this.option("cssClass") || "mz-$dummy-css-class-to-jRemove$")
            }, this);
            if (this.originalImg) {
                this.placeholder.append(this.originalImg);
                if (this.originalImgSrc) {
                    this.originalImg.setAttribute("src", this.originalImgSrc)
                }
            }
            if (this.originalTitle) {
                this.placeholder.setAttribute("title", this.originalTitle)
            }
            if (this.node) {
                this.node.kill()
            }
        },
        setupZoom: function(I, J) {
            var H = this.image;
            if (I.zoom.state !== 2) {
                this.image = I;
                this.ready = true;
                this.zoomBox.enable(false);
                return
            }
            this.image = I;
            this.image.setCurNode(this.expanded ? "zoom" : "small");
            this.zoomBox.image.src = this.image.getURL("zoom");
            this.zoomBox.node.jRemoveClass("mz-preview");
            this.zoomBox.image.getAttribute("style");
            this.zoomBox.image.removeAttribute("style");
            this.zoomBox.node.jGetSize();
            setTimeout(g(function() {
                var L = this.zoomBox.image.jGetSize(),
                    K;
                this.zoomSizeOrigin = this.image.jGetSize("zoom");
                if (L.width * L.height > 1 && L.width * L.height < this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) {
                    this.zoomSizeOrigin = L
                }
                this.zoomSize = y.detach(this.zoomSizeOrigin);
                if (this.zoomBox.mode === "preview") {
                    this.zoomBox.node.jAddClass("mz-preview")
                }
                this.setCaption();
                this.lens.image.src = this.image.node.currentSrc || this.image.node.src;
                this.zoomBox.enable(this.zoomBox.mode && !(this.expanded && this.zoomBox.mode === "preview"));
                this.ready = true;
                this.activateTimer = null;
                this.resizeCallback();
                this.node.jAddClass("mz-ready");
                this.hideLoading();
                if (H !== this.image) {
                    s("onUpdate", this.id, H.origin, this.image.origin);
                    if (this.nextImage) {
                        K = this.nextImage;
                        this.nextImage = null;
                        this.update(K.image, K.onswipe)
                    }
                } else {
                    if (!!J) {
                        s("onZoomReady", this.id)
                    }
                }
                if (this.initEvent) {
                    this.node.jCallEvent(this.initEvent.type, this.initEvent)
                } else {
                    if (this.expanded && this.option("expandZoomOn") === "always") {
                        this.activate()
                    } else {
                        if (!!J) {
                            this.showHint()
                        }
                    }
                }
            }).jBind(this), 256)
        },
        setupSelectors: function() {
            var I = this.id;
            var H;
            var J;
            J = new RegExp("zoom\\-id(\\s+)?:(\\s+)?" + I + "($|;)");
            if (y.browser.features.query) {
                H = y.$A(document.querySelectorAll('[data-zoom-id="' + this.id + '"]'));
                H = g(H).concat(y.$A(document.querySelectorAll('[rel*="zoom-id"]')).filter(function(K) {
                    return J.test(K.getAttribute("rel") || "")
                }))
            } else {
                H = y.$A(document.getElementsByTagName("A")).filter(function(K) {
                    return I === K.getAttribute("data-zoom-id") || J.test(K.getAttribute("rel") || "")
                })
            }
            g(H).jEach(function(L) {
                var K, M;
                g(L).jAddEvent("click", function(N) {
                    N.stopDefaults()
                });
                K = new j().parseNode(L, this.originalTitle);
                if (this.image.zoom.src.has(K.zoom.src) && this.image.small.src.has(K.small.src)) {
                    g(K.origin).jAddClass("mz-thumb-selected");
                    K = this.image;
                    K.origin = L
                }
                if (!K.link && this.image.link) {
                    K.link = this.image.link
                }
                M = g(function() {
                    this.update(K)
                }).jBind(this);
                g(L).jAddEvent("mousedown", function(N) {
                    if ("stopImmediatePropagation" in N) {
                        N.stopImmediatePropagation()
                    }
                }, 5);
                g(L).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), g(function(O, N) {
                    if (this.updateTimer) {
                        clearTimeout(this.updateTimer)
                    }
                    this.updateTimer = false;
                    if (O.type === "mouseover") {
                        this.updateTimer = g(M).jDelay(N)
                    } else {
                        if (O.type === "tap" || O.type === "btnclick") {
                            M()
                        }
                    }
                }).jBindAsEvent(this, 60)).jAddClass(this.option("cssClass")).jAddClass("mz-thumb");
                K.loadSmall();
                if (this.option("lazyZoom") !== true) {
                    K.loadZoom()
                }
                this.additionalImages.push(K)
            }, this)
        },
        update: function(H, I) {
            if (!this.ready) {
                this.nextImage = {
                    image: H,
                    onswipe: I
                };
                return
            }
            if (!H || H === this.image) {
                return false
            }
            this.deactivate(null, true);
            this.ready = false;
            this.node.jRemoveClass("mz-ready");
            this.loadTimer = g(this.showLoading).jBind(this).jDelay(400);
            H.load(g(function(P) {
                var J, Q, O, L, K, N, M = (y.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect";
                this.hideLoading();
                P.setCurNode("small");
                if (!P.node) {
                    this.ready = true;
                    this.node.jAddClass("mz-ready");
                    return
                }
                this.setActiveThumb(P);
                J = this.image.node[M]();
                if (this.expanded) {
                    P.setCurNode("zoom");
                    O = y.$new("div").jAddClass("mz-expand-bg");
                    if (y.browser.features.cssFilters || y.browser.ieMode < 10) {
                        O.append(y.$new("img", {
                            src: P.getURL("zoom")
                        }).jSetCss({
                            opacity: 0
                        }))
                    } else {
                        O.append(new y.SVGImage(P.node).blur(b).getNode().jSetCss({
                            opacity: 0
                        }))
                    }
                    g(O).jSetCss({
                        "z-index": -99
                    }).jAppendTo(this.expandBox)
                }
                if (this.expanded && this.zoomBox.mode === "zoom" && this.option("expandZoomOn") === "always") {
                    g(P.node).jSetCss({
                        opacity: 0
                    }).jAppendTo(this.node);
                    Q = J;
                    K = [P.node, this.image.node];
                    N = [{
                        opacity: [0, 1]
                    }, {
                        opacity: [1, 0]
                    }];
                    g(P.node).jSetCss({
                        "max-width": Math.min(P.jGetSize("zoom").width, this.expandMaxWidth()),
                        "max-height": Math.min(P.jGetSize("zoom").height, this.expandMaxHeight())
                    })
                } else {
                    this.node.jSetCss({
                        height: this.node[M]().height
                    });
                    this.image.node.jSetCss({
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        width: "100%",
                        height: "100%",
                        "max-width": "",
                        "max-height": ""
                    });
                    g(P.node).jSetCss({
                        "max-width": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                        "max-height": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity),
                        position: "relative",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        transform: ""
                    }).jAppendTo(this.node);
                    Q = g(P.node)[M]();
                    if (!I) {
                        g(P.node).jSetCss({
                            "min-width": J.width,
                            height: J.height,
                            "max-width": J.width,
                            "max-height": ""
                        })
                    }
                    this.node.jSetCss({
                        height: "",
                        overflow: ""
                    }).jGetSize();
                    g(P.node).jGetSize();
                    K = [P.node, this.image.node];
                    N = [y.extend({
                        opacity: [0, 1]
                    }, I ? {
                        scale: [0.6, 1]
                    } : {
                        "min-width": [J.width, Q.width],
                        "max-width": [J.width, Q.width],
                        height: [J.height, Q.height]
                    }), {
                        opacity: [1, 0]
                    }]
                }
                if (this.expanded) {
                    if (this.expandBg.firstChild && O.firstChild) {
                        L = g(this.expandBg.firstChild).jGetCss("opacity");
                        if (y.browser.gecko) {
                            K = K.concat([O.firstChild]);
                            N = N.concat([{
                                opacity: [0.0001, L]
                            }])
                        } else {
                            K = K.concat([O.firstChild, this.expandBg.firstChild]);
                            N = N.concat([{
                                opacity: [0.0001, L]
                            }, {
                                opacity: [L, 0.0001]
                            }])
                        }
                    }
                }
                new y.PFX(K, {
                    duration: (I || this.option("transitionEffect")) ? I ? 160 : 350 : 0,
                    transition: I ? "cubic-bezier(0.175, 0.885, 0.320, 1)" : (J.width === Q.width) ? "linear" : "cubic-bezier(0.25, .1, .1, 1)",
                    onComplete: g(function() {
                        this.image.node.jRemove().getAttribute("style");
                        this.image.node.removeAttribute("style");
                        g(P.node).jSetCss(this.expanded ? {
                            width: "auto",
                            height: "auto"
                        } : {
                            width: "",
                            height: ""
                        }).jSetCss({
                            "min-width": "",
                            "min-height": "",
                            opacity: "",
                            "max-width": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").width, this.expanded ? this.expandMaxWidth() : Infinity),
                            "max-height": Math.min(P.jGetSize(this.expanded ? "zoom" : "small").height, this.expanded ? this.expandMaxHeight() : Infinity)
                        });
                        if (this.expanded) {
                            this.expandBg.jRemove();
                            this.expandBg = undefined;
                            this.expandBg = O.jSetCssProp("z-index", -100);
                            g(this.expandBg.firstChild).jSetCss({
                                opacity: ""
                            });
                            if (this.expandCaption) {
                                if (P.caption) {
                                    if (P.link) {
                                        this.expandCaption.changeContent("").append(y.$new("a", {
                                            href: P.link
                                        }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(P.caption))
                                    } else {
                                        this.expandCaption.changeContent(P.caption).jAddClass("mz-show")
                                    }
                                } else {
                                    this.expandCaption.jRemoveClass("mz-show")
                                }
                            }
                        }
                        this.setupZoom(P)
                    }).jBind(this),
                    onBeforeRender: g(function(R, S) {
                        if (undefined !== R.scale) {
                            S.jSetCssProp("transform", "scale(" + R.scale + ")")
                        }
                    })
                }).start(N)
            }).jBind(this))
        },
        setActiveThumb: function(I) {
            var H = false;
            g(this.additionalImages).jEach(function(J) {
                g(J.origin).jRemoveClass("mz-thumb-selected");
                if (J === I) {
                    H = true
                }
            });
            if (H && I.origin) {
                g(I.origin).jAddClass("mz-thumb-selected")
            }
            if (this.expandThumbs) {
                this.expandThumbs.selectItem(I.selector)
            }
        },
        setCaption: function(H) {
            if (this.image.caption && this.option("zoomCaption") !== "off" && this.zoomBox.mode !== "magnifier") {
                if (!this.zoomBox.caption) {
                    this.zoomBox.caption = y.$new("div", {
                        "class": "mz-caption"
                    }).jAppendTo(this.zoomBox.node.jAddClass("caption-" + this.option("zoomCaption")))
                }
                this.zoomBox.caption.changeContent(this.image.caption)
            }
        },
        showHint: function(H, K, I) {
            var J;
            if (!this.expanded) {
                if (this.hintRuns <= 0) {
                    return
                }
                if (I !== true) {
                    this.hintRuns--
                }
            }
            if (K === undefined || K === null) {
                if (!this.zoomBox.active && !this.zoomBox.activating) {
                    if (this.option("zoomMode") && (this.zoomBox.enabled || !this.image.loaded()) && !(y.browser.mobile && this.option("expand") && this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner")) {
                        if (this.zoomBox.trigger === "hover") {
                            K = this.option("textHoverZoomHint")
                        } else {
                            if (this.zoomBox.trigger === "click") {
                                K = this.option("textClickZoomHint")
                            }
                        }
                    } else {
                        K = this.option("expand") ? this.option("textExpandHint") : ""
                    }
                } else {
                    K = this.option("expand") ? this.option("textExpandHint") : ""
                }
            }
            if (!K) {
                this.hideHint();
                return
            }
            J = this.node;
            if (!this.hint) {
                this.hint = y.$new("div", {
                    "class": "mz-hint"
                });
                this.hintMessage = y.$new("span", {
                    "class": "mz-hint-message"
                }).append(document.createTextNode(K)).jAppendTo(this.hint);
                g(this.hint).jAppendTo(this.node)
            } else {
                g(this.hintMessage).changeContent(K)
            }
            this.hint.jSetCss({
                "transition-delay": ""
            }).jRemoveClass("mz-hint-hidden");
            if (this.expanded) {
                J = this.expandFigure
            } else {
                if ((this.zoomBox.active || this.zoomBox.activating) && this.zoomBox.mode !== "magnifier" && this.zoomBox.position === "inner") {
                    J = this.zoomBox.node
                }
            }
            if (H === true) {
                setTimeout(g(function() {
                    this.hint.jAddClass("mz-hint-hidden")
                }).jBind(this), 16)
            }
            this.hint.jAppendTo(J)
        },
        hideHint: function() {
            if (this.hint) {
                this.hint.jSetCss({
                    "transition-delay": "0ms"
                }).jAddClass("mz-hint-hidden")
            }
        },
        showLoading: function() {
            if (!this.loadingBox) {
                this.loadingBox = y.$new("div", {
                    "class": "mz-loading"
                });
                this.node.append(this.loadingBox);
                this.loadingBox.jGetSize()
            }
            this.loadingBox.jAddClass("shown")
        },
        hideLoading: function() {
            clearTimeout(this.loadTimer);
            this.loadTimer = null;
            if (this.loadingBox) {
                g(this.loadingBox).jRemoveClass("shown")
            }
        },
        setSize: function(J, N) {
            var M = y.detach(this.zoomBox.size),
                L = (!this.expanded && this.zoomBox.custom) ? g(this.zoomBox.custom).jGetSize() : {
                    width: 0,
                    height: 0
                },
                I, H, K = this.size,
                O = {
                    x: 0,
                    y: 0
                };
            N = N || this.zoomBox.position;
            this.normalSize = this.image.node.jGetSize();
            this.size = this.image.node.jGetSize();
            this.boundaries = this.image.node.getBoundingClientRect();
            if (!L.height) {
                L = this.size
            }
            if (this.option("upscale") === false || this.zoomBox.mode === false || this.zoomBox.mode === "preview") {
                J = false
            }
            if (this.zoomBox.mode === "preview") {
                if (M.width === "auto") {
                    M.width = this.zoomSizeOrigin.width
                }
                if (M.height === "auto") {
                    M.height = this.zoomSizeOrigin.height
                }
            }
            if (this.expanded && this.zoomBox.mode === "magnifier") {
                M.width = 70;
                M.height = "auto"
            }
            if (this.zoomBox.mode === "magnifier" && M.height === "auto") {
                this.zoomBox.width = parseFloat(M.width / 100) * Math.min(L.width, L.height);
                this.zoomBox.height = this.zoomBox.width
            } else {
                if (this.zoomBox.mode === "zoom" && N === "inner") {
                    this.size = this.node.jGetSize();
                    L = this.size;
                    this.boundaries = this.node.getBoundingClientRect();
                    this.zoomBox.width = L.width;
                    this.zoomBox.height = L.height
                } else {
                    this.zoomBox.width = (M.wunits === "%") ? parseFloat(M.width / 100) * L.width : parseInt(M.width);
                    this.zoomBox.height = (M.hunits === "%") ? parseFloat(M.height / 100) * L.height : parseInt(M.height)
                }
            }
            if (this.zoomBox.mode === "preview") {
                H = Math.min(Math.min(this.zoomBox.width / this.zoomSizeOrigin.width, this.zoomBox.height / this.zoomSizeOrigin.height), 1);
                this.zoomBox.width = this.zoomSizeOrigin.width * H;
                this.zoomBox.height = this.zoomSizeOrigin.height * H
            }
            this.zoomBox.width = Math.ceil(this.zoomBox.width);
            this.zoomBox.height = Math.ceil(this.zoomBox.height);
            this.zoomBox.aspectRatio = this.zoomBox.width / this.zoomBox.height;
            this.zoomBox.node.jSetCss({
                width: this.zoomBox.width,
                height: this.zoomBox.height
            });
            if (J) {
                L = this.expanded ? this.expandBox.jGetSize() : this.zoomBox.node.jGetSize();
                if (!this.expanded && (this.normalSize.width * this.normalSize.height) / (this.zoomSizeOrigin.width * this.zoomSizeOrigin.height) > 0.8) {
                    this.zoomSize.width = 1.5 * this.zoomSizeOrigin.width;
                    this.zoomSize.height = 1.5 * this.zoomSizeOrigin.height
                } else {
                    this.zoomSize = y.detach(this.zoomSizeOrigin)
                }
            }
            if (this.zoomBox.mode !== false && !this.zoomBox.active && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if ((this.normalSize.width * this.normalSize.height) / (this.zoomSize.width * this.zoomSize.height) > 0.8) {
                    this.zoomSize = y.detach(this.zoomSizeOrigin);
                    this.zoomBox.enable(false)
                } else {
                    this.zoomBox.enable(true)
                }
            }
            this.zoomBox.image.jSetCss({
                width: this.zoomSize.width,
                height: this.zoomSize.height
            });
            this.zoomSize.maxWidth = this.zoomSize.width;
            this.zoomSize.maxHeight = this.zoomSize.height;
            I = this.zoomBox.node.getInnerSize();
            this.zoomBox.innerWidth = Math.ceil(I.width);
            this.zoomBox.innerHeight = Math.ceil(I.height);
            this.lens.width = Math.ceil(this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            this.lens.height = Math.ceil(this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            });
            this.lens.image.jSetCss(this.size);
            y.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                if (this.lens.innertouch) {
                    this.lens.pos.x *= (this.size.width / K.width);
                    this.lens.pos.y *= (this.size.height / K.height);
                    O.x = this.lens.spos.x;
                    O.y = this.lens.spos.y
                } else {
                    O.x = this.boundaries.left + this.lens.width / 2 + (this.lens.pos.x * (this.size.width / K.width));
                    O.y = this.boundaries.top + this.lens.height / 2 + (this.lens.pos.y * (this.size.height / K.height))
                }
                this.animate(null, O)
            }
        },
        reflowZoom: function(L) {
            var O;
            var N;
            var H;
            var M;
            var K;
            var J;
            var I = g(this.node).jFetch("cr");
            H = a(5);
            K = this.zoomBox.position;
            M = this.expanded ? "inner" : this.zoomBox.custom ? "custom" : this.option("zoom-position");
            J = this.expanded && this.zoomBox.mode === "zoom" ? this.expandBox : document.body;
            if (this.expanded) {
                H.y = 0;
                H.x = 0
            }
            if (!L) {
                this.setSize(true, M)
            }
            O = this.boundaries.top;
            if (this.zoomBox.mode !== "magnifier") {
                if (L) {
                    this.setSize(false);
                    return
                }
                switch (M) {
                    case "inner":
                    case "custom":
                        O = 0;
                        N = 0;
                        break;
                    case "top":
                        O = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                        if (H.top > O) {
                            O = this.boundaries.bottom + this.option("zoom-distance");
                            M = "bottom"
                        }
                        N = this.boundaries.left;
                        break;
                    case "bottom":
                        O = this.boundaries.bottom + this.option("zoom-distance");
                        if (H.bottom < O + this.zoomBox.height) {
                            O = this.boundaries.top - this.zoomBox.height - this.option("zoom-distance");
                            M = "top"
                        }
                        N = this.boundaries.left;
                        break;
                    case "left":
                        N = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                        if (H.left > N && H.right >= this.boundaries.right + this.option("zoom-distance") + this.zoomBox.width) {
                            N = this.boundaries.right + this.option("zoom-distance");
                            M = "right"
                        }
                        break;
                    case "right":
                    default:
                        N = this.boundaries.right + this.option("zoom-distance");
                        if (H.right < N + this.zoomBox.width && H.left <= this.boundaries.left - this.zoomBox.width - this.option("zoom-distance")) {
                            N = this.boundaries.left - this.zoomBox.width - this.option("zoom-distance");
                            M = "left"
                        }
                        break
                }
                switch (this.option("zoom-position")) {
                    case "top":
                    case "bottom":
                        if (H.top > O || H.bottom < O + this.zoomBox.height) {
                            M = "inner"
                        }
                        break;
                    case "left":
                    case "right":
                        if (H.left > N || H.right < N + this.zoomBox.width) {
                            M = "inner"
                        }
                        break;
                    default:
                }
                this.zoomBox.position = M;
                if (!this.zoomBox.activating && !this.zoomBox.active) {
                    if (y.browser.mobile && !this.expanded && this.zoomBox.mode === "zoom") {
                        if (this.option("expand")) {
                            this.zoomBox.enable(M !== "inner")
                        } else {
                            if (this.option("zoomOn") !== "click") {
                                this.zoomBox.trigger = M === "inner" ? "click" : this.option("zoomOn");
                                this.unregisterActivateEvent();
                                this.unregisterDeactivateEvent();
                                this.registerActivateEvent(this.zoomBox.trigger === "click");
                                this.registerDeactivateEvent(this.zoomBox.trigger === "click" && !this.option("expand"))
                            }
                        }
                        this.showHint(false, null, !this.image.loaded())
                    }
                    return
                }
                this.setSize(false);
                if (L) {
                    return
                }
                if (M === "custom") {
                    J = this.zoomBox.custom;
                    H.y = 0;
                    H.x = 0
                }
                if (M === "inner") {
                    if (this.zoomBox.mode !== "preview") {
                        this.zoomBox.node.jAddClass("mz-inner");
                        this.node.jAddClass("mz-inner-zoom")
                    }
                    this.lens.hide();
                    O = this.boundaries.top + H.y;
                    N = this.boundaries.left + H.x;
                    if (!this.expanded && y.browser.ieMode && y.browser.ieMode < 11) {
                        O = 0;
                        N = 0;
                        J = this.node
                    }
                } else {
                    O += H.y;
                    N += H.x;
                    this.node.jRemoveClass("mz-inner-zoom");
                    this.zoomBox.node.jRemoveClass("mz-inner")
                }
                this.zoomBox.node.jSetCss({
                    top: O,
                    left: N
                })
            } else {
                this.setSize(false);
                J = this.node;
                if (y.browser.mobile && !this.expanded && !this.zoomBox.activating && !this.zoomBox.active) {
                    this.showHint(false, null, !(this.option("lazyZoom") && this.image.loaded()))
                }
            }
            this.zoomBox.node[this.expanded ? "jAddClass" : "jRemoveClass"]("mz-expanded");
            if (!this.expanded && I) {
                I.jAppendTo(this.zoomBox.mode === "zoom" && M === "inner" ? this.zoomBox.node : this.node, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
            }
            this.zoomBox.node.jAppendTo(J)
        },
        changeZoomLevel: function(N) {
            var J;
            var H;
            var L;
            var K;
            var M = false;
            var I = N.isMouse ? 5 : 3 / 54;
            if (!this.zoomBox.active) {
                return
            }
            g(N).stop();
            I = (100 + I * Math.abs(N.deltaY)) / 100;
            if (N.deltaY < 0) {
                I = 1 / I
            }
            if (this.zoomBox.mode === "magnifier") {
                H = Math.max(100, Math.round(this.zoomBox.width * I));
                H = Math.min(H, this.size.width * 0.9);
                L = H / this.zoomBox.aspectRatio;
                this.zoomBox.width = Math.ceil(H);
                this.zoomBox.height = Math.ceil(L);
                this.zoomBox.node.jSetCss({
                    width: this.zoomBox.width,
                    height: this.zoomBox.height
                });
                J = this.zoomBox.node.getInnerSize();
                this.zoomBox.innerWidth = Math.ceil(J.width);
                this.zoomBox.innerHeight = Math.ceil(J.height);
                M = true
            } else {
                if (!this.expanded && this.zoomBox.mode === "zoom") {
                    H = Math.max(this.size.width, Math.round(this.zoomSize.width * I));
                    H = Math.min(H, this.zoomSize.maxWidth);
                    L = H / (this.zoomSize.maxWidth / this.zoomSize.maxHeight);
                    this.zoomSize.width = Math.ceil(H);
                    this.zoomSize.height = Math.ceil(L)
                } else {
                    return
                }
            }
            K = g(window).jGetScroll();
            this.lens.width = (this.zoomBox.innerWidth / (this.zoomSize.width / this.size.width));
            this.lens.height = (this.zoomBox.innerHeight / (this.zoomSize.height / this.size.height));
            this.lens.node.jSetCss({
                width: this.lens.width,
                height: this.lens.height
            });
            y.extend(this.lens, this.lens.node.jGetSize());
            if (this.zoomBox.active) {
                clearTimeout(this.moveTimer);
                this.moveTimer = null;
                if (M) {
                    this.moveTimer = true
                }
                this.animate(null, {
                    x: N.x - K.x,
                    y: N.y - K.y
                });
                if (M) {
                    this.moveTimer = null
                }
            }
        },
        registerActivateEvent: function(J) {
            var I;
            var H = J ? "dbltap btnclick" : "touchstart" + (window.navigator.pointerEnabled ? " pointerdown" : window.navigator.msPointerEnabled ? " MSPointerDown" : "") + (window.navigator.pointerEnabled ? " pointermove" : window.navigator.msPointerEnabled ? " MSPointerMove" : " mousemove");
            var K = this.node.jFetch("mz:handlers:activate:fn", (!J) ? g(function(L) {
                if (L.isTouchEvent() && !L.isPrimaryTouch()) {
                    return
                }
                if (L && L.pointerType === "touch" && L.type !== "pointerdown") {
                    return
                }
                I = (y.browser.ieMode < 9) ? y.extend({}, L) : L;
                if (!this.activateTimer) {
                    clearTimeout(this.activateTimer);
                    this.activateTimer = setTimeout(g(function() {
                        this.activate(I)
                    }).jBind(this), 120)
                }
            }).jBindAsEvent(this) : g(this.activate).jBindAsEvent(this));
            this.node.jStore("mz:handlers:activate:event", H).jAddEvent(H, K, 10)
        },
        unregisterActivateEvent: function() {
            var H = this.node.jFetch("mz:handlers:activate:event");
            var I = this.node.jFetch("mz:handlers:activate:fn");
            this.node.jRemoveEvent(H, I);
            this.node.jDel("mz:handlers:activate:fn")
        },
        registerDeactivateEvent: function(I) {
            var H = "touchend";
            if (window.navigator.pointerEnabled) {
                H += " pointerup pointerout pointermove"
            } else {
                if (window.navigator.msPointerEnabled) {
                    H += " MSPointerUp MSPointerOut MSPointerMove"
                } else {
                    H += " mouseout mousemove"
                }
            }
            if (I) {
                if (this.expanded || y.browser.mobile) {
                    H = "dbltap btnclick"
                } else {
                    H += " dbltap btnclick"
                }
            }
            var J = this.node.jFetch("mz:handlers:deactivate:fn", g(function(L) {
                if (L.isTouchEvent() && !L.isPrimaryTouch()) {
                    return
                }
                if (L && L.type === "pointerup" && L.pointerType !== "touch") {
                    return
                }
                if (L && (L.type === "pointermove" || L.type === "MSPointerMove" || L.type === "mousemove")) {
                    if (!this.ready || !this.zoomBox.enabled || !this.zoomBox.active) {
                        return
                    }
                    var K = L.getClientXY();
                    if (K.x < this.boundaries.left || K.x > this.boundaries.right || K.y < this.boundaries.top || K.y > this.boundaries.bottom) {
                        this.deactivate(L);
                        return
                    }
                } else {
                    if (this.zoomBox.node !== L.getRelated() && !((this.zoomBox.position === "inner" || this.zoomBox.mode === "magnifier") && this.zoomBox.node.hasChild(L.getRelated())) && !this.node.hasChild(L.getRelated())) {
                        this.deactivate(L);
                        return
                    }
                }
            }).jBindAsEvent(this));
            this.node.jStore("mz:handlers:deactivate:event", H).jAddEvent(H, J, 20)
        },
        unregisterDeactivateEvent: function() {
            var H = this.node.jFetch("mz:handlers:deactivate:event");
            var I = this.node.jFetch("mz:handlers:deactivate:fn");
            this.node.jRemoveEvent(H, I);
            this.node.jDel("mz:handlers:deactivate:fn")
        },
        registerEvents: function() {
            this.moveBind = this.move.jBind(this);
            this.node.jAddEvent(["touchstart", window.navigator.pointerEnabled ? "pointerdown" : "MSPointerDown"], g(function(H) {
                if ((y.browser.androidBrowser || y.browser.platform === "android" && y.browser.gecko) && this.option("zoomMode") && this.option("zoomOn") !== "click" && H.type === "touchstart") {
                    H.stopDefaults();
                    if (y.browser.gecko) {
                        H.stopDistribution()
                    }
                }
                if (!this.zoomBox.active) {
                    return
                }
                if (this.zoomBox.position === "inner") {
                    this.lens.spos = H.getClientXY()
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent(["touchend", window.navigator.pointerEnabled ? "pointerup" : "MSPointerUp"], g(function(H) {
                if (H.isTouchEvent() && H.isPrimaryTouch()) {
                    this.lens.touchmovement = false
                }
            }).jBindAsEvent(this), 10);
            this.node.jAddEvent("touchmove " + (y.browser.platform === "android" ? "" : window.navigator.pointerEnabled ? "pointermove" : window.navigator.msPointerEnabled ? "MSPointerMove" : "mousemove"), g(this.animate).jBindAsEvent(this));
            if (this.option("zoomMode")) {
                this.registerActivateEvent(this.option("zoomOn") === "click");
                this.registerDeactivateEvent(this.option("zoomOn") === "click")
            }
            this.node.jAddEvent("mousedown", function(H) {
                H.stopDistribution()
            }, 10).jAddEvent("btnclick", g(function(H) {
                this.node.jRaiseEvent("MouseEvent", "click");
                if (this.expanded) {
                    this.expandBox.jCallEvent("btnclick", H)
                }
            }).jBind(this), 15);
            if (this.option("expand")) {
                this.node.jAddEvent("tap btnclick", g(this.expand).jBindAsEvent(this), 15)
            } else {
                this.node.jAddEvent("tap btnclick", g(this.openLink).jBindAsEvent(this), 15)
            }
            if (this.additionalImages.length > 1) {
                this.swipe()
            }
            if (!y.browser.mobile && this.option("variableZoom")) {
                this.node.jAddEvent("mousescroll", this.changeZoomLevel.jBindAsEvent(this))
            }
            g(window).jAddEvent(y.browser.mobile ? "resize" : "resize scroll", this.onResize)
        },
        unregisterEvents: function() {
            if (this.node) {
                this.node.jRemoveEvent("mousescroll")
            }
            g(window).jRemoveEvent("resize scroll", this.onResize);
            g(this.additionalImages).jEach(function(H) {
                g(H.origin).jClearEvents()
            })
        },
        activate: function(N) {
            var O;
            var M;
            var K;
            var L;
            var H;
            var I = 0;
            var J = 0;
            if (!this.image.loaded() || !this.ready || !this.zoomBox.enabled || this.zoomBox.active || this.zoomBox.activating) {
                if (!this.image.loaded() && !this.initEvent) {
                    if (N) {
                        this.initEvent = d(N);
                        N.stopQueue()
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = g(this.showLoading).jBind(this).jDelay(400)
                    }
                }
                return
            }
            if (N && N.type === "pointermove" && N.pointerType === "touch") {
                return
            }
            if (!this.option("zoomMode") && this.option("expand") && !this.expanded) {
                this.zoomBox.active = true;
                return
            }
            this.zoomBox.activating = true;
            if (this.expanded && this.zoomBox.mode === "zoom") {
                L = this.image.node.jGetRect();
                this.expandStage.jAddClass("mz-zoom-in");
                H = this.expandFigure.jGetRect();
                J = ((L.left + L.right) / 2 - (H.left + H.right) / 2);
                I = ((L.top + L.bottom) / 2 - (H.top + H.bottom) / 2)
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("mz-deactivating").jRemoveEvent("transitionend");
            this.zoomBox.node.jAddClass("mz-activating");
            this.node.jAddClass("mz-activating");
            this.reflowZoom();
            M = (this.zoomBox.mode === "zoom") ? this.zoomBox.position : this.zoomBox.mode;
            if (y.browser.features.transition && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (M === "inner") {
                    K = this.image.node.jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform: "translate3d(0," + I + "px, 0) scale(" + K.width / this.zoomSize.width + ", " + K.height / this.zoomSize.height + ")"
                    }).jGetSize();
                    this.zoomBox.image.jAddEvent("transitionend", g(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + M);
                        this.zoomBox.activating = false;
                        this.zoomBox.active = true
                    }).jBind(this));
                    this.zoomBox.node.jAddClass("mz-p-" + M).jGetSize();
                    if (!y.browser.mobile && y.browser.chrome && (y.browser.uaName === "chrome" || y.browser.uaName === "opera")) {
                        this.zoomBox.activating = false;
                        this.zoomBox.active = true
                    }
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", g(function() {
                        this.zoomBox.node.jRemoveEvent("transitionend");
                        this.zoomBox.node.jRemoveClass("mz-activating mz-p-" + M)
                    }).jBind(this));
                    this.zoomBox.node.jSetCss({
                        transition: "none"
                    });
                    this.zoomBox.node.jAddClass("mz-p-" + M).jGetSize();
                    this.zoomBox.node.jSetCss({
                        transition: ""
                    }).jGetSize();
                    this.zoomBox.node.jRemoveClass("mz-p-" + M);
                    this.zoomBox.activating = false;
                    this.zoomBox.active = true
                }
            } else {
                this.zoomBox.node.jRemoveClass("mz-activating");
                this.zoomBox.activating = false;
                this.zoomBox.active = true
            }
            if (!this.expanded) {
                this.showHint(true)
            }
            if (N) {
                N.stop().stopQueue();
                O = N.getClientXY();
                if (this.zoomBox.mode === "magnifier" && (/tap/i).test(N.type)) {
                    O.y -= this.zoomBox.height / 2 + 10
                }
                if (M === "inner" && ((/tap/i).test(N.type) || N.isTouchEvent())) {
                    this.lens.pos = {
                        x: 0,
                        y: 0
                    };
                    O.x = -(O.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    O.y = -(O.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
                }
            } else {
                O = {
                    x: this.boundaries.left + (this.boundaries.right - this.boundaries.left) / 2,
                    y: this.boundaries.top + (this.boundaries.bottom - this.boundaries.top) / 2
                };
                if (y.browser.mobile && this.expanded && this.option("expandZoomOn") === "always") {
                    this.lens.innertouch = true;
                    this.lens.pos = {
                        x: 0,
                        y: 0
                    };
                    O.x = -(O.x - this.boundaries.left - this.size.width / 2) * (this.zoomSize.width / this.size.width);
                    O.y = -(O.y - this.boundaries.top - this.size.height / 2) * (this.zoomSize.height / this.size.height)
                }
            }
            this.node.jRemoveClass("mz-activating").jAddClass("mz-active");
            O.x += -J;
            O.y += -I;
            this.lens.spos = {
                x: 0,
                y: 0
            };
            this.lens.dx = 0;
            this.lens.dy = 0;
            this.animate(N, O, true);
            s("onZoomIn", this.id)
        },
        deactivate: function(J, O) {
            var M;
            var K;
            var H;
            var I;
            var L = 0;
            var N = 0;
            var P = this.zoomBox.active;
            this.initEvent = null;
            if (!this.ready) {
                return
            }
            if (J && J.type === "pointerout" && J.pointerType === "touch") {
                return
            }
            clearTimeout(this.moveTimer);
            this.moveTimer = null;
            clearTimeout(this.activateTimer);
            this.activateTimer = null;
            this.zoomBox.activating = false;
            this.zoomBox.active = false;
            if (O !== true && !this.expanded) {
                if (P) {
                    if (y.browser.mobile && !this.expanded && this.zoomBox.mode === "zoom") {
                        this.reflowZoom()
                    } else {
                        this.showHint()
                    }
                }
            }
            if (!this.zoomBox.enabled) {
                return
            }
            if (J) {
                J.stop()
            }
            this.zoomBox.image.jRemoveEvent("transitionend");
            this.zoomBox.node.jRemoveClass("mz-activating").jRemoveEvent("transitionend");
            if (this.expanded) {
                I = this.expandFigure.jGetRect();
                if (this.option("expandZoomOn") !== "always") {
                    this.expandStage.jRemoveClass("mz-zoom-in")
                }
                this.image.node.jSetCss({
                    "max-height": this.expandMaxHeight()
                });
                H = this.image.node.jGetRect();
                N = ((H.left + H.right) / 2 - (I.left + I.right) / 2);
                L = ((H.top + H.bottom) / 2 - (I.top + I.bottom) / 2)
            }
            M = (this.zoomBox.mode === "zoom") ? this.zoomBox.position : this.zoomBox.mode;
            if (y.browser.features.transition && J && !(this.expanded && this.option("expandZoomOn") === "always")) {
                if (M === "inner") {
                    this.zoomBox.image.jAddEvent("transitionend", g(function() {
                        this.zoomBox.image.jRemoveEvent("transitionend");
                        this.node.jRemoveClass("mz-active");
                        setTimeout(g(function() {
                            this.zoomBox.hide()
                        }).jBind(this), 32)
                    }).jBind(this));
                    K = this.image.node.jGetSize();
                    this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + M).jGetSize();
                    this.zoomBox.image.jSetCss({
                        transform: "translate3d(0," + L + "px,0) scale(" + K.width / this.zoomSize.maxWidth + ", " + K.height / this.zoomSize.maxHeight + ")"
                    })
                } else {
                    this.zoomBox.node.jAddEvent("transitionend", g(function() {
                        this.zoomBox.hide();
                        this.node.jRemoveClass("mz-active")
                    }).jBind(this));
                    this.zoomBox.node.jGetCss("opacity");
                    this.zoomBox.node.jAddClass("mz-deactivating mz-p-" + M);
                    this.node.jRemoveClass("mz-active")
                }
            } else {
                this.zoomBox.hide();
                this.node.jRemoveClass("mz-active")
            }
            this.lens.dx = 0;
            this.lens.dy = 0;
            this.lens.spos = {
                x: 0,
                y: 0
            };
            this.lens.hide();
            if (P) {
                s("onZoomOut", this.id)
            }
        },
        animate: function(R, Q, P) {
            var J = Q;
            var L;
            var K;
            var N = 0;
            var I;
            var M = 0;
            var H;
            var S;
            var O = false;
            if (!this.zoomBox.active && !P) {
                return
            }
            if (R) {
                g(R).stopDefaults().stopDistribution();
                if (R.isTouchEvent() && !R.isPrimaryTouch()) {
                    return
                }
                O = (/tap/i).test(R.type) || R.isTouchEvent();
                if (O && !this.lens.touchmovement) {
                    this.lens.touchmovement = O
                }
                if (!J) {
                    J = R.getClientXY()
                }
            }
            if (this.zoomBox.mode === "preview") {
                return
            }
            if (this.zoomBox.mode === "zoom" && this.zoomBox.position === "inner" && (R && O || !R && this.lens.innertouch)) {
                this.lens.innertouch = true;
                L = this.lens.pos.x + (J.x - this.lens.spos.x);
                K = this.lens.pos.y + (J.y - this.lens.spos.y);
                this.lens.spos = J;
                N = Math.min(0, this.zoomBox.innerWidth - this.zoomSize.width) / 2;
                I = -N;
                M = Math.min(0, this.zoomBox.innerHeight - this.zoomSize.height) / 2;
                H = -M
            } else {
                this.lens.innertouch = false;
                if (this.zoomBox.mode === "magnifier") {
                    J.y = Math.max(this.boundaries.top, Math.min(J.y, this.boundaries.bottom));
                    J.x = Math.max(this.boundaries.left, Math.min(J.x, this.boundaries.right))
                }
                L = J.x - this.boundaries.left;
                K = J.y - this.boundaries.top;
                I = this.size.width - this.lens.width;
                H = this.size.height - this.lens.height;
                L -= this.lens.width / 2;
                K -= this.lens.height / 2
            }
            if (this.zoomBox.mode !== "magnifier") {
                L = Math.max(N, Math.min(L, I));
                K = Math.max(M, Math.min(K, H))
            }
            this.lens.pos.x = L;
            this.lens.pos.y = K;
            if (this.zoomBox.mode === "zoom" && this.zoomBox.position !== "inner") {
                if (y.browser.features.transform) {
                    this.lens.node.jSetCss({
                        transform: "translate(" + this.lens.pos.x + "px," + this.lens.pos.y + "px)"
                    });
                    this.lens.image.jSetCss({
                        transform: "translate(" + -(this.lens.pos.x + this.lens.border.x) + "px, " + -(this.lens.pos.y + this.lens.border.y) + "px)"
                    })
                } else {
                    this.lens.node.jSetCss({
                        top: this.lens.pos.y,
                        left: this.lens.pos.x
                    });
                    this.lens.image.jSetCss({
                        top: -(this.lens.pos.y + this.lens.border.y),
                        left: -(this.lens.pos.x + this.lens.border.x)
                    })
                }
            }
            if (this.zoomBox.mode === "magnifier") {
                if (this.lens.touchmovement && !(R && R.type === "dbltap")) {
                    J.y -= this.zoomBox.height / 2 + 10
                }
                this.zoomBox.node.jSetCss({
                    top: J.y - this.boundaries.top - this.zoomBox.height / 2,
                    left: J.x - this.boundaries.left - this.zoomBox.width / 2
                })
            }
            if (!this.moveTimer) {
                this.lens.dx = 0;
                this.lens.dy = 0;
                this.move(1)
            }
        },
        move: function(M) {
            var K;
            var I;
            var H;
            var N;
            var L;
            var J;
            if (!isFinite(M)) {
                if (this.lens.innertouch) {
                    M = this.lens.touchmovement ? 0.4 : 0.16
                } else {
                    M = this.option("smoothing") ? 0.2 : this.lens.touchmovement ? 0.4 : 0.8
                }
            }
            K = ((this.lens.pos.x - this.lens.dx) * M);
            I = ((this.lens.pos.y - this.lens.dy) * M);
            this.lens.dx += K;
            this.lens.dy += I;
            if (!this.moveTimer || Math.abs(K) > 0.000001 || Math.abs(I) > 0.000001) {
                if (this.lens.innertouch) {
                    H = this.lens.dx;
                    N = this.lens.dy
                } else {
                    H = (this.lens.dx * (this.zoomSize.width / this.size.width) - Math.max(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2);
                    N = (this.lens.dy * (this.zoomSize.height / this.size.height) - Math.max(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2);
                    if (this.zoomBox.mode === "magnifier") {
                        H = Math.round(H);
                        N = Math.round(N)
                    }
                    H = -H;
                    N = -N
                }
                L = this.zoomSize.width / this.zoomSize.maxWidth;
                J = this.zoomSize.height / this.zoomSize.maxHeight;
                this.zoomBox.image.jSetCss(y.browser.features.transform ? {
                    transform: f + H + "px," + N + "px" + A + " scale(" + L + "," + J + ")"
                } : {
                    width: this.zoomSize.width,
                    height: this.zoomSize.height,
                    left: -(this.lens.dx * (this.zoomSize.width / this.size.width) + Math.min(0, this.zoomSize.width - this.zoomBox.innerWidth) / 2),
                    top: -(this.lens.dy * (this.zoomSize.height / this.size.height) + Math.min(0, this.zoomSize.height - this.zoomBox.innerHeight) / 2)
                })
            }
            if (this.zoomBox.mode === "magnifier") {
                return
            }
            this.moveTimer = setTimeout(this.moveBind, 16)
        },
        swipe: function() {
            var T;
            var J;
            var O = 30;
            var L = 201;
            var Q;
            var R = "";
            var I = {};
            var H;
            var N;
            var S = 0;
            var U = {
                transition: y.browser.cssTransform + String.fromCharCode(32) + "300ms cubic-bezier(.18,.35,.58,1)"
            };
            var K;
            var P;
            var M = g(function(V) {
                if (!this.ready || this.zoomBox.active) {
                    return
                }
                if (V.state === "dragstart") {
                    clearTimeout(this.activateTimer);
                    this.activateTimer = null;
                    S = 0;
                    I = {
                        x: V.x,
                        y: V.y,
                        ts: V.timeStamp
                    };
                    T = this.size.width;
                    J = T / 2;
                    this.image.node.jRemoveEvent("transitionend");
                    this.image.node.jSetCssProp("transition", "");
                    this.image.node.jSetCssProp("transform", "translate3d(0, 0, 0)");
                    P = null
                } else {
                    H = (V.x - I.x);
                    N = {
                        x: 0,
                        y: 0,
                        z: 0
                    };
                    if (P === null) {
                        P = (Math.abs(V.x - I.x) < Math.abs(V.y - I.y))
                    }
                    if (P) {
                        return
                    }
                    V.stop();
                    if (V.state === "dragend") {
                        S = 0;
                        K = null;
                        Q = V.timeStamp - I.ts;
                        if (Math.abs(H) > J || (Q < L && Math.abs(H) > O)) {
                            if ((R = (H > 0) ? "backward" : (H <= 0) ? "forward" : "")) {
                                if (R === "backward") {
                                    K = this.getPrev();
                                    S += T * 10
                                } else {
                                    K = this.getNext();
                                    S -= T * 10
                                }
                            }
                        }
                        N.x = S;
                        N.deg = -90 * (N.x / T);
                        this.image.node.jAddEvent("transitionend", g(function(W) {
                            this.image.node.jRemoveEvent("transitionend");
                            this.image.node.jSetCssProp("transition", "");
                            if (K) {
                                this.image.node.jSetCss({
                                    transform: "translate3d(" + N.x + "px, 0px, 0px)"
                                });
                                this.update(K, true)
                            }
                        }).jBind(this));
                        this.image.node.jSetCss(U);
                        this.image.node.jSetCss({
                            "transition-duration": N.x ? "100ms" : "300ms",
                            opacity: 1 - 0.2 * Math.abs(N.x / T),
                            transform: "translate3d(" + N.x + "px, 0px, 0px)"
                        });
                        H = 0;
                        return
                    }
                    N.x = H;
                    N.z = -50 * Math.abs(N.x / J);
                    N.deg = -60 * (N.x / J);
                    this.image.node.jSetCss({
                        opacity: 1 - 0.2 * Math.abs(N.x / J),
                        transform: "translate3d(" + N.x + "px, 0px, " + N.z + "px)"
                    })
                }
            }).jBind(this);
            this.node.jAddEvent("touchdrag", M)
        },
        setupExpandGallery: function() {
            var I, H;
            if (this.additionalImages.length) {
                this.expandGallery = this.additionalImages
            } else {
                I = this.placeholder.getAttribute("data-gallery");
                if (I) {
                    if (y.browser.features.query) {
                        H = y.$A(document.querySelectorAll('.MagicZoom[data-gallery="' + I + '"], .MagicZoomPlus[data-gallery="' + I + '"]'))
                    } else {
                        H = y.$A(document.getElementsByTagName("A")).filter(function(J) {
                            return I === J.getAttribute("data-gallery")
                        })
                    }
                    g(H).jEach(function(K) {
                        var J, L;
                        J = h(K);
                        if (J && J.additionalImages.length > 0) {
                            return
                        }
                        if (J) {
                            L = new j(J.image.small.url, J.image.zoom.url, J.image.caption, null, J.image.origin);
                            L.link = J.image.link
                        } else {
                            L = new j().parseNode(K, J ? J.originalTitle : null)
                        }
                        if (this.image.zoom.src.has(L.zoom.url) && this.image.small.src.has(L.small.url)) {
                            L = this.image
                        }
                        this.expandGallery.push(L)
                    }, this);
                    this.primaryImage = this.image
                }
            }
            if (this.expandGallery.length > 1) {
                this.expandStage.jAddClass("with-thumbs");
                this.expandNav = y.$new("div", {
                    "class": "mz-expand-thumbnails"
                }).jAppendTo(this.expandStage);
                this.expandThumbs = new q(this.expandNav);
                g(this.expandGallery).jEach(function(J) {
                    var K = g(function(L) {
                        this.setActiveThumb(J);
                        this.update(J)
                    }).jBind(this);
                    J.selector = this.expandThumbs.addItem(y.$new("img", {
                        src: J.getURL("small")
                    }).jAddEvent("tap btnclick", function(L) {
                        L.stop()
                    }).jAddEvent("tap " + (this.option("selectorTrigger") === "hover" ? "mouseover mouseout" : "btnclick"), g(function(M, L) {
                        if (this.updateTimer) {
                            clearTimeout(this.updateTimer)
                        }
                        this.updateTimer = false;
                        if (M.type === "mouseover") {
                            this.updateTimer = g(K).jDelay(L)
                        } else {
                            if (M.type === "tap" || M.type === "btnclick") {
                                K()
                            }
                        }
                    }).jBindAsEvent(this, 60)))
                }, this);
                this.buttons.next.show();
                this.buttons.prev.show()
            } else {
                this.expandStage.jRemoveClass("with-thumbs");
                this.buttons.next.hide();
                this.buttons.prev.hide()
            }
        },
        destroyExpandGallery: function() {
            var H;
            if (this.expandThumbs) {
                this.expandThumbs.stop();
                this.expandThumbs = null
            }
            if (this.expandNav) {
                this.expandNav.jRemove();
                this.expandNav = null
            }
            if (this.expandGallery.length > 1 && !this.additionalImages.length) {
                this.node.jRemoveEvent("touchdrag");
                this.image.node.jRemove().getAttribute("style");
                this.image.node.removeAttribute("style");
                this.primaryImage.node.jAppendTo(this.node);
                this.setupZoom(this.primaryImage);
                while (H = this.expandGallery.pop()) {
                    if (H !== this.primaryImage) {
                        if (H.small.node) {
                            H.small.node.kill();
                            H.small.node = null
                        }
                        if (H.zoom.node) {
                            H.zoom.node.kill();
                            H.zoom.node = null
                        }
                        H = null
                    }
                }
            }
            this.expandGallery = []
        },
        close: function() {
            if (!this.ready || !this.expanded) {
                return
            }
            if (y.browser.platform === "ios" && y.browser.uaName === "safari" && parseInt(y.browser.uaVersion) === 7) {
                clearInterval(l);
                l = null
            }
            g(document).jRemoveEvent("keydown", this.keyboardCallback);
            this.deactivate(null, true);
            this.ready = false;
            if (y.browser.fullScreen.capable && y.browser.fullScreen.enabled()) {
                y.browser.fullScreen.cancel()
            } else {
                if (y.browser.features.transition) {
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition: ""
                    });
                    this.node.jAddEvent("transitionend", this.onClose);
                    if (y.browser.webkit) {
                        setTimeout(g(function() {
                            this.onClose()
                        }).jBind(this), 260)
                    }
                    this.expandBg.jRemoveEvent("transitionend").jSetCss({
                        transition: ""
                    });
                    this.expandBg.jSetCss({
                        transition: "all 0.6s cubic-bezier(0.895, 0.030, 0.685, 0.220) 0.0s"
                    }).jGetSize();
                    this.node.jSetCss({
                        transition: "all .3s cubic-bezier(0.600, 0, 0.735, 0.045) 0s"
                    }).jGetSize();
                    if (this.zoomBox.mode !== false && this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== "magnifier") {
                        this.image.node.jSetCss({
                            "max-height": this.image.jGetSize("zoom").height
                        });
                        this.image.node.jSetCss({
                            "max-width": this.image.jGetSize("zoom").width
                        })
                    }
                    this.expandBg.jSetCss({
                        opacity: 0.4
                    });
                    this.node.jSetCss({
                        opacity: 0.01,
                        transform: "scale(0.4)"
                    })
                } else {
                    this.onClose()
                }
            }
        },
        expand: function(J) {
            if (!this.image.loaded() || !this.ready || this.expanded) {
                if (!this.image.loaded()) {
                    if (J) {
                        this.initEvent = d(J);
                        J.stopQueue();
                        if (J.type === "tap") {
                            J.events[1].stopQueue()
                        }
                    }
                    this.image.load(this.setupZoom.jBind(this));
                    if (!this.loadTimer) {
                        this.loadTimer = g(this.showLoading).jBind(this).jDelay(400)
                    }
                }
                return
            }
            if (J) {
                J.stopQueue()
            }
            var H = g(this.node).jFetch("cr");
            var I = document.createDocumentFragment();
            this.hideHint();
            this.hintRuns--;
            this.deactivate(null, true);
            this.unregisterActivateEvent();
            this.unregisterDeactivateEvent();
            this.ready = false;
            if (!this.expandBox) {
                this.expandBox = y.$new("div").jAddClass("mz-expand").jAddClass(this.option("cssClass")).jSetCss({
                    opacity: 0
                });
                this.expandStage = y.$new("div").jAddClass("mz-expand-stage").jAppendTo(this.expandBox);
                this.expandControls = y.$new("div").jAddClass("mz-expand-controls").jAppendTo(this.expandStage);
                g(["prev", "next", "close"]).jEach(function(L) {
                    var K = "mz-button";
                    this.buttons[L] = y.$new("button", {
                        title: this.option("text-btn-" + L)
                    }).jAddClass(K).jAddClass(K + "-" + L);
                    I.appendChild(this.buttons[L]);
                    switch (L) {
                        case "prev":
                            this.buttons[L].jAddEvent("tap btnclick", function(M) {
                                M.stop();
                                this.update(this.getPrev())
                            }.jBindAsEvent(this));
                            break;
                        case "next":
                            this.buttons[L].jAddEvent("tap btnclick", function(M) {
                                M.stop();
                                this.update(this.getNext())
                            }.jBindAsEvent(this));
                            break;
                        case "close":
                            this.buttons[L].jAddEvent("tap btnclick", function(M) {
                                M.stop();
                                this.close()
                            }.jBindAsEvent(this));
                            break;
                        default:
                    }
                }, this);
                this.expandControls.append(I);
                this.expandBox.jAddEvent("mousescroll touchstart dbltap", g(function(K) {
                    g(K).stop()
                }));
                if (this.option("closeOnClickOutside")) {
                    this.expandBox.jAddEvent("tap btnclick", function(M) {
                        var L = M.jGetPageXY();
                        var K = g(this.option("expandZoomMode") === "magnifier" ? this.zoomBox.node : this.zoomBox.image).jGetRect();
                        if (this.option("expandZoomOn") !== "always" && K.top <= L.y && L.y <= K.bottom && K.left <= L.x && L.x <= K.right) {
                            M.stopQueue();
                            this.deactivate(M);
                            return
                        }
                        if (this.option("expandZoomOn") !== "always" && this.node.hasChild(M.getOriginalTarget())) {
                            return
                        }
                        M.stop();
                        this.close()
                    }.jBindAsEvent(this))
                }
                this.keyboardCallback = g(function(L) {
                    var K = null;
                    if (L.keyCode !== 27 && L.keyCode !== 37 && L.keyCode !== 39) {
                        return
                    }
                    g(L).stop();
                    if (L.keyCode === 27) {
                        this.close()
                    } else {
                        K = (L.keyCode === 37) ? this.getPrev() : this.getNext();
                        if (K) {
                            this.update(K)
                        }
                    }
                }).jBindAsEvent(this);
                this.onExpand = g(function() {
                    var K;
                    this.node.jRemoveEvent("transitionend").jSetCss({
                        transition: "",
                        transform: "translate3d(0, 0, 0)"
                    });
                    if (this.expanded) {
                        return
                    }
                    this.expanded = true;
                    this.expandBox.jRemoveClass("mz-expand-opening").jSetCss({
                        opacity: 1
                    });
                    this.zoomBox.setMode(this.option("expandZoomMode"));
                    this.zoomSize = y.detach(this.zoomSizeOrigin);
                    this.resizeCallback();
                    if (this.expandCaption && this.image.caption) {
                        if (this.image.link) {
                            this.expandCaption.append(y.$new("a", {
                                href: this.image.link
                            }).jAddEvent("tap btnclick", this.openLink.jBind(this)).changeContent(this.image.caption))
                        } else {
                            this.expandCaption.changeContent(this.image.caption)
                        }
                        this.expandCaption.jAddClass("mz-show")
                    }
                    if (this.option("expandZoomOn") !== "always") {
                        this.registerActivateEvent(true);
                        this.registerDeactivateEvent(true)
                    }
                    this.ready = true;
                    if (this.option("expandZoomOn") === "always") {
                        if (this.zoomBox.mode !== false) {
                            this.zoomBox.enable(true)
                        }
                        if (y.browser.mobile && this.mobileZoomHint) {
                            this.mobileZoomHint = false
                        }
                        this.activate()
                    }
                    if ((y.browser.mobile || this.option("forceTouch")) && this.zoomBox.enabled) {
                        if (this.mobileZoomHint || this.hintRuns > 0) {
                            this.showHint(true, this.option("textClickZoomHint"))
                        }
                        this.mobileZoomHint = false
                    }
                    this.expandControls.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible");
                    if (this.expandNav) {
                        this.expandNav.jRemoveClass("mz-hidden").jAddClass("mz-fade mz-visible")
                    }
                    if (this.expandThumbs) {
                        this.expandThumbs.run();
                        this.setActiveThumb(this.image)
                    }
                    if (H) {
                        H.jAppendTo(this.expandBox, ((Math.floor(Math.random() * 101) + 1) % 2) ? "top" : "bottom")
                    }
                    if (this.expandGallery.length && !this.additionalImages.length) {
                        this.swipe()
                    }
                    g(document).jAddEvent("keydown", this.keyboardCallback);
                    if (y.browser.platform === "ios" && y.browser.uaName === "safari" && parseInt(y.browser.uaVersion) === 7) {
                        l = u()
                    }
                    s("onExpandOpen", this.id)
                }).jBind(this);
                this.onClose = g(function() {
                    this.node.jRemoveEvent("transitionend");
                    if (!this.expanded) {
                        return
                    }
                    if (this.expanded) {
                        g(document).jRemoveEvent("keydown", this.keyboardCallback);
                        this.deactivate(null, true)
                    }
                    this.destroyExpandGallery();
                    this.expanded = false;
                    this.zoomBox.setMode(this.option("zoomMode"));
                    this.node.replaceChild(this.image.getNode("small"), this.image.node);
                    this.image.setCurNode("small");
                    g(this.image.node).jSetCss({
                        width: "",
                        height: "",
                        "max-width": Math.min(this.image.jGetSize("small").width),
                        "max-height": Math.min(this.image.jGetSize("small").height)
                    });
                    this.lens.image.src = this.image.getURL("small");
                    this.node.jSetCss({
                        opacity: "",
                        transition: ""
                    });
                    this.node.jSetCss({
                        transform: "translate3d(0, 0, 0)"
                    });
                    g(this.placeholder).replaceChild(this.node, this.stubNode);
                    this.setSize(true);
                    if (this.expandCaption) {
                        this.expandCaption.jRemove();
                        this.expandCaption = null
                    }
                    this.unregisterActivateEvent();
                    this.unregisterDeactivateEvent();
                    if (this.option("zoomOn") === "always") {
                        this.activate()
                    } else {
                        if (this.option("zoomMode") !== false) {
                            this.registerActivateEvent(this.option("zoomOn") === "click");
                            this.registerDeactivateEvent(this.option("zoomOn") === "click")
                        }
                    }
                    this.showHint();
                    this.expandBg.jRemoveEvent("transitionend");
                    this.expandBox.jRemove();
                    this.expandBg.jRemove();
                    this.expandBg = null;
                    g(y.browser.getDoc()).jRemoveClass("mz-expanded-view-open");
                    this.ready = true;
                    if (y.browser.ieMode < 10) {
                        this.resizeCallback()
                    } else {
                        g(window).jRaiseEvent("UIEvent", "resize")
                    }
                    s("onExpandClose", this.id)
                }).jBind(this);
                this.expandImageStage = y.$new("div", {
                    "class": "mz-image-stage"
                }).jAppendTo(this.expandStage);
                this.expandFigure = y.$new("figure").jAppendTo(this.expandImageStage);
                this.stubNode = this.node.cloneNode(false)
            }
            this.setupExpandGallery();
            g(y.browser.getDoc()).jAddClass("mz-expanded-view-open");
            g(document.body).jGetSize();
            if (this.option("expand") === "fullscreen") {
                this.prepareExpandedView();
                y.browser.fullScreen.request(this.expandBox, {
                    onEnter: g(function() {
                        this.onExpand()
                    }).jBind(this),
                    onExit: this.onClose,
                    fallback: g(function() {
                        this.expandToWindow()
                    }).jBind(this)
                })
            } else {
                setTimeout(g(function() {
                    this.prepareExpandedView();
                    this.expandToWindow()
                }).jBind(this), 96)
            }
        },
        prepareExpandedView: function() {
            var I;
            var H;
            I = y.$new("img", {
                src: this.image.getURL("zoom")
            });
            this.expandBg = y.$new("div").jAddClass("mz-expand-bg").append((y.browser.features.cssFilters || y.browser.ieMode < 10) ? I : new y.SVGImage(I).blur(b).getNode()).jAppendTo(this.expandBox);
            if (this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false) {
                this.expandStage.jAddClass("mz-always-zoom" + (this.option("expandZoomMode") === "zoom" ? " mz-zoom-in" : "")).jGetSize()
            }
            H = g(this.node)[(y.browser.ieMode < 10) ? "jGetSize" : "getBoundingClientRect"]();
            g(this.stubNode).jSetCss({
                width: H.width,
                height: H.height
            });
            this.node.replaceChild(this.image.getNode("zoom"), this.image.node);
            this.image.setCurNode("zoom");
            this.expandBox.jAppendTo(document.body);
            this.expandMaxWidth = function() {
                var J = this.expandImageStage;
                if (g(this.expandFigure).jGetSize().width > 50) {
                    J = this.expandFigure
                }
                return function() {
                    return this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false && this.option("expandZoomMode") !== "magnifier" ? Infinity : Math.round(g(J).getInnerSize().width)
                }
            }.call(this);
            this.expandMaxHeight = function() {
                var J = this.expandImageStage;
                if (g(this.expandFigure).jGetSize().height > 50) {
                    J = this.expandFigure
                }
                return function() {
                    return this.option("expandZoomOn") === "always" && this.option("expandZoomMode") !== false && this.option("expandZoomMode") !== "magnifier" ? Infinity : Math.round(g(J).getInnerSize().height)
                }
            }.call(this);
            this.expandControls.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden");
            if (this.expandNav) {
                this.expandNav.jRemoveClass("mz-fade mz-visible").jAddClass("mz-hidden")
            }
            this.image.node.jSetCss({
                "max-height": Math.min(this.image.jGetSize("zoom").height, this.expandMaxHeight())
            });
            this.image.node.jSetCss({
                "max-width": Math.min(this.image.jGetSize("zoom").width, this.expandMaxWidth())
            });
            this.expandFigure.append(g(this.placeholder).replaceChild(this.stubNode, this.node));
            if (this.option("expandCaption")) {
                this.expandCaption = y.$new("figcaption", {
                    "class": "mz-caption"
                }).jAppendTo(this.expandFigure)
            }
        },
        expandToWindow: function() {
            this.node.jSetCss({
                transition: ""
            });
            this.node.jSetCss({
                transform: "scale(0.6)"
            }).jGetSize();
            this.node.jSetCss({
                transition: y.browser.cssTransform + " 0.4s cubic-bezier(0.175, 0.885, 0.320, 1) 0s"
            });
            if (y.browser.features.transition) {
                this.node.jAddEvent("transitionend", this.onExpand);
                if (y.browser.chrome && (y.browser.uaName === "chrome" || y.browser.uaName === "opera")) {
                    setTimeout(g(function() {
                        this.onExpand()
                    }).jBind(this), 500)
                }
            } else {
                this.onExpand.jDelay(16, this)
            }
            this.expandBox.jSetCss({
                opacity: 1
            });
            this.node.jSetCss({
                transform: "scale(1)"
            })
        },
        openLink: function() {
            if (this.image.link) {
                window.open(this.image.link, "_self")
            }
        },
        getNext: function() {
            var H = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(K) {
                return (K.small.state !== -1 || K.zoom.state !== -1)
            });
            var I = H.length;
            var J = g(H).indexOf(this.image) + 1;
            return (I <= 1) ? null : H[(J >= I) ? 0 : J]
        },
        getPrev: function() {
            var H = (this.expanded ? this.expandGallery : this.additionalImages).filter(function(K) {
                return (K.small.state !== -1 || K.zoom.state !== -1)
            });
            var I = H.length;
            var J = g(H).indexOf(this.image) - 1;
            return (I <= 1) ? null : H[(J < 0) ? I - 1 : J]
        },
        imageByURL: function(I, J) {
            var H = this.additionalImages.filter(function(K) {
                return ((K.zoom.src.has(I) || K.zoom.url.has(I)) && (K.small.src.has(J) || K.small.url.has(J)))
            }) || [];
            return H[0] || ((J && I && y.jTypeOf(J) === "string" && y.jTypeOf(I) === "string") ? new j(J, I) : null)
        },
        imageByOrigin: function(I) {
            var H = this.additionalImages.filter(function(J) {
                return (J.origin === I)
            }) || [];
            return H[0]
        },
        imageByIndex: function(H) {
            return this.additionalImages[H]
        }
    };
    t = {
        version: "v5.2.6 (Plus) DEMO",
        start: function(K, I) {
            var J = null;
            var H = [];
            y.$A((K ? [g(K)] : y.$A(document.byClass("MagicZoom")).concat(y.$A(document.byClass("MagicZoomPlus"))))).jEach(g(function(L) {
                if (g(L)) {
                    if (!h(L)) {
                        J = new i(L, I);
                        if (w && !J.option("autostart")) {
                            J.stop();
                            J = null
                        } else {
                            E.push(J);
                            H.push(J)
                        }
                    }
                }
            }).jBind(this));
            return K ? H[0] : H
        },
        stop: function(K) {
            var I, J, H;
            if (K) {
                (J = h(K)) && (J = E.splice(E.indexOf(J), 1)) && J[0].stop() && (delete J[0]);
                return
            }
            while (I = E.length) {
                J = E.splice(I - 1, 1);
                J[0].stop();
                delete J[0]
            }
        },
        refresh: function(H) {
            this.stop(H);
            return this.start(H)
        },
        update: function(M, L, K, I) {
            var J = h(M);
            var H;
            if (J) {
                H = y.jTypeOf(L) === "element" ? J.imageByOrigin(L) : J.imageByURL(L, K);
                if (H) {
                    J.update(H)
                }
            }
        },
        switchTo: function(K, J) {
            var I = h(K);
            var H;
            if (I) {
                switch (y.jTypeOf(J)) {
                    case "element":
                        H = I.imageByOrigin(J);
                        break;
                    case "number":
                        H = I.imageByIndex(J);
                        break;
                    default:
                }
                if (H) {
                    I.update(H)
                }
            }
        },
        prev: function(I) {
            var H;
            (H = h(I)) && H.update(H.getPrev())
        },
        next: function(I) {
            var H;
            (H = h(I)) && H.update(H.getNext())
        },
        zoomIn: function(I) {
            var H;
            (H = h(I)) && H.activate()
        },
        zoomOut: function(I) {
            var H;
            (H = h(I)) && H.deactivate()
        },
        expand: function(I) {
            var H;
            (H = h(I)) && H.expand()
        },
        close: function(I) {
            var H;
            (H = h(I)) && H.close()
        },
        registerCallback: function(H, I) {
            if (!o[H]) {
                o[H] = []
            }
            if (y.jTypeOf(I) === "function") {
                o[H].push(I)
            }
        },
        running: function(H) {
            return !!h(H)
        }
    };
    g(document).jAddEvent("domready", function() {
        var I = window[C + "Options"] || {};
        r = r();
        c();
        G = y.$new("div", {
            "class": "magic-hidden-wrapper"
        }).jAppendTo(document.body);
        F = (y.browser.mobile && window.matchMedia && window.matchMedia("(max-device-width: 767px), (max-device-height: 767px)").matches);
        if (y.browser.mobile) {
            y.extend(n, k)
        }
        for (var H = 0; H < z.length; H++) {
            if (I[z[H]] && y.$F !== I[z[H]]) {
                t.registerCallback(z[H], I[z[H]])
            }
        }
        t.start();
        w = false
    });
    window.MagicZoomPlus = window.MagicZoomPlus || {};
    return t
})();