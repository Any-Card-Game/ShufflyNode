/*!
* jQuery JavaScript Library v1.4.2
* http://jquery.com/
*
* Copyright 2010, John Resig
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*
* Includes Sizzle.js
* http://sizzlejs.com/
* Copyright 2010, The Dojo Foundation
* Released under the MIT, BSD, and GPL Licenses.
*
* Date: Sat Feb 13 22:33:48 2010 -0500
*/
(function (A, w) {
    function ma() { if (!c.isReady) { try { s.documentElement.doScroll("left") } catch (a) { setTimeout(ma, 1); return } c.ready() } } function Qa(a, b) { b.src ? c.ajax({ url: b.src, async: false, dataType: "script" }) : c.globalEval(b.text || b.textContent || b.innerHTML || ""); b.parentNode && b.parentNode.removeChild(b) } function X(a, b, d, f, e, j) {
        var i = a.length; if (typeof b === "object") { for (var o in b) X(a, o, b[o], f, e, d); return a } if (d !== w) { f = !j && f && c.isFunction(d); for (o = 0; o < i; o++) e(a[o], b, f ? d.call(a[o], o, e(a[o], b)) : d, j); return a } return i ?
e(a[0], b) : w
    } function J() { return (new Date).getTime() } function Y() { return false } function Z() { return true } function na(a, b, d) { d[0].type = a; return c.event.handle.apply(b, d) } function oa(a) {
        var b, d = [], f = [], e = arguments, j, i, o, k, n, r; i = c.data(this, "events"); if (!(a.liveFired === this || !i || !i.live || a.button && a.type === "click")) {
            a.liveFired = this; var u = i.live.slice(0); for (k = 0; k < u.length; k++) { i = u[k]; i.origType.replace(O, "") === a.type ? f.push(i.selector) : u.splice(k--, 1) } j = c(a.target).closest(f, a.currentTarget); n = 0; for (r =
j.length; n < r; n++) for (k = 0; k < u.length; k++) { i = u[k]; if (j[n].selector === i.selector) { o = j[n].elem; f = null; if (i.preType === "mouseenter" || i.preType === "mouseleave") f = c(a.relatedTarget).closest(i.selector)[0]; if (!f || f !== o) d.push({ elem: o, handleObj: i }) } } n = 0; for (r = d.length; n < r; n++) { j = d[n]; a.currentTarget = j.elem; a.data = j.handleObj.data; a.handleObj = j.handleObj; if (j.handleObj.origHandler.apply(j.elem, e) === false) { b = false; break } } return b
        } 
    } function pa(a, b) {
        return "live." + (a && a !== "*" ? a + "." : "") + b.replace(/\./g, "`").replace(/ /g,
"&")
    } function qa(a) { return !a || !a.parentNode || a.parentNode.nodeType === 11 } function ra(a, b) { var d = 0; b.each(function () { if (this.nodeName === (a[d] && a[d].nodeName)) { var f = c.data(a[d++]), e = c.data(this, f); if (f = f && f.events) { delete e.handle; e.events = {}; for (var j in f) for (var i in f[j]) c.event.add(this, j, f[j][i], f[j][i].data) } } }) } function sa(a, b, d) {
        var f, e, j; b = b && b[0] ? b[0].ownerDocument || b[0] : s; if (a.length === 1 && typeof a[0] === "string" && a[0].length < 512 && b === s && !ta.test(a[0]) && (c.support.checkClone || !ua.test(a[0]))) {
            e =
true; if (j = c.fragments[a[0]]) if (j !== 1) f = j
        } if (!f) { f = b.createDocumentFragment(); c.clean(a, b, f, d) } if (e) c.fragments[a[0]] = j ? f : 1; return { fragment: f, cacheable: e}
    } function K(a, b) { var d = {}; c.each(va.concat.apply([], va.slice(0, b)), function () { d[this] = a }); return d } function wa(a) { return "scrollTo" in a && a.document ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : false } var c = function (a, b) { return new c.fn.init(a, b) }, Ra = A.jQuery, Sa = A.$, s = A.document, T, Ta = /^[^<]*(<[\w\W]+>)[^>]*$|^#([\w-]+)$/, Ua = /^.[^:#\[\.,]*$/, Va = /\S/,
Wa = /^(\s|\u00A0)+|(\s|\u00A0)+$/g, Xa = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, P = navigator.userAgent, xa = false, Q = [], L, $ = Object.prototype.toString, aa = Object.prototype.hasOwnProperty, ba = Array.prototype.push, R = Array.prototype.slice, ya = Array.prototype.indexOf; c.fn = c.prototype = { init: function (a, b) {
    var d, f; if (!a) return this; if (a.nodeType) { this.context = this[0] = a; this.length = 1; return this } if (a === "body" && !b) { this.context = s; this[0] = s.body; this.selector = "body"; this.length = 1; return this } if (typeof a === "string") if ((d = Ta.exec(a)) &&
(d[1] || !b)) if (d[1]) { f = b ? b.ownerDocument || b : s; if (a = Xa.exec(a)) if (c.isPlainObject(b)) { a = [s.createElement(a[1])]; c.fn.attr.call(a, b, true) } else a = [f.createElement(a[1])]; else { a = sa([d[1]], [f]); a = (a.cacheable ? a.fragment.cloneNode(true) : a.fragment).childNodes } return c.merge(this, a) } else { if (b = s.getElementById(d[2])) { if (b.id !== d[2]) return T.find(a); this.length = 1; this[0] = b } this.context = s; this.selector = a; return this } else if (!b && /^\w+$/.test(a)) {
        this.selector = a; this.context = s; a = s.getElementsByTagName(a); return c.merge(this,
a)
    } else return !b || b.jquery ? (b || T).find(a) : c(b).find(a); else if (c.isFunction(a)) return T.ready(a); if (a.selector !== w) { this.selector = a.selector; this.context = a.context } return c.makeArray(a, this)
}, selector: "", jquery: "1.4.2", length: 0, size: function () { return this.length }, toArray: function () { return R.call(this, 0) }, get: function (a) { return a == null ? this.toArray() : a < 0 ? this.slice(a)[0] : this[a] }, pushStack: function (a, b, d) {
    var f = c(); c.isArray(a) ? ba.apply(f, a) : c.merge(f, a); f.prevObject = this; f.context = this.context; if (b ===
"find") f.selector = this.selector + (this.selector ? " " : "") + d; else if (b) f.selector = this.selector + "." + b + "(" + d + ")"; return f
}, each: function (a, b) { return c.each(this, a, b) }, ready: function (a) { c.bindReady(); if (c.isReady) a.call(s, c); else Q && Q.push(a); return this }, eq: function (a) { return a === -1 ? this.slice(a) : this.slice(a, +a + 1) }, first: function () { return this.eq(0) }, last: function () { return this.eq(-1) }, slice: function () { return this.pushStack(R.apply(this, arguments), "slice", R.call(arguments).join(",")) }, map: function (a) {
    return this.pushStack(c.map(this,
function (b, d) { return a.call(b, d, b) }))
}, end: function () { return this.prevObject || c(null) }, push: ba, sort: [].sort, splice: [].splice
}; c.fn.init.prototype = c.fn; c.extend = c.fn.extend = function () {
    var a = arguments[0] || {}, b = 1, d = arguments.length, f = false, e, j, i, o; if (typeof a === "boolean") { f = a; a = arguments[1] || {}; b = 2 } if (typeof a !== "object" && !c.isFunction(a)) a = {}; if (d === b) { a = this; --b } for (; b < d; b++) if ((e = arguments[b]) != null) for (j in e) {
        i = a[j]; o = e[j]; if (a !== o) if (f && o && (c.isPlainObject(o) || c.isArray(o))) {
            i = i && (c.isPlainObject(i) ||
c.isArray(i)) ? i : c.isArray(o) ? [] : {}; a[j] = c.extend(f, i, o)
        } else if (o !== w) a[j] = o
    } return a
}; c.extend({ noConflict: function (a) { A.$ = Sa; if (a) A.jQuery = Ra; return c }, isReady: false, ready: function () { if (!c.isReady) { if (!s.body) return setTimeout(c.ready, 13); c.isReady = true; if (Q) { for (var a, b = 0; a = Q[b++]; ) a.call(s, c); Q = null } c.fn.triggerHandler && c(s).triggerHandler("ready") } }, bindReady: function () {
    if (!xa) {
        xa = true; if (s.readyState === "complete") return c.ready(); if (s.addEventListener) {
            s.addEventListener("DOMContentLoaded",
L, false); A.addEventListener("load", c.ready, false)
        } else if (s.attachEvent) { s.attachEvent("onreadystatechange", L); A.attachEvent("onload", c.ready); var a = false; try { a = A.frameElement == null } catch (b) { } s.documentElement.doScroll && a && ma() } 
    } 
}, isFunction: function (a) { return $.call(a) === "[object Function]" }, isArray: function (a) { return $.call(a) === "[object Array]" }, isPlainObject: function (a) {
    if (!a || $.call(a) !== "[object Object]" || a.nodeType || a.setInterval) return false; if (a.constructor && !aa.call(a, "constructor") && !aa.call(a.constructor.prototype,
"isPrototypeOf")) return false; var b; for (b in a); return b === w || aa.call(a, b)
}, isEmptyObject: function (a) { for (var b in a) return false; return true }, error: function (a) { throw a; }, parseJSON: function (a) {
    if (typeof a !== "string" || !a) return null; a = c.trim(a); if (/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return A.JSON && A.JSON.parse ? A.JSON.parse(a) : (new Function("return " +
a))(); else c.error("Invalid JSON: " + a)
}, noop: function () { }, globalEval: function (a) { if (a && Va.test(a)) { var b = s.getElementsByTagName("head")[0] || s.documentElement, d = s.createElement("script"); d.type = "text/javascript"; if (c.support.scriptEval) d.appendChild(s.createTextNode(a)); else d.text = a; b.insertBefore(d, b.firstChild); b.removeChild(d) } }, nodeName: function (a, b) { return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase() }, each: function (a, b, d) {
    var f, e = 0, j = a.length, i = j === w || c.isFunction(a); if (d) if (i) for (f in a) {
        if (b.apply(a[f],
d) === false) break
    } else for (; e < j; ) { if (b.apply(a[e++], d) === false) break } else if (i) for (f in a) { if (b.call(a[f], f, a[f]) === false) break } else for (d = a[0]; e < j && b.call(d, e, d) !== false; d = a[++e]); return a
}, trim: function (a) { return (a || "").replace(Wa, "") }, makeArray: function (a, b) { b = b || []; if (a != null) a.length == null || typeof a === "string" || c.isFunction(a) || typeof a !== "function" && a.setInterval ? ba.call(b, a) : c.merge(b, a); return b }, inArray: function (a, b) {
    if (b.indexOf) return b.indexOf(a); for (var d = 0, f = b.length; d < f; d++) if (b[d] ===
a) return d; return -1
}, merge: function (a, b) { var d = a.length, f = 0; if (typeof b.length === "number") for (var e = b.length; f < e; f++) a[d++] = b[f]; else for (; b[f] !== w; ) a[d++] = b[f++]; a.length = d; return a }, grep: function (a, b, d) { for (var f = [], e = 0, j = a.length; e < j; e++) !d !== !b(a[e], e) && f.push(a[e]); return f }, map: function (a, b, d) { for (var f = [], e, j = 0, i = a.length; j < i; j++) { e = b(a[j], j, d); if (e != null) f[f.length] = e } return f.concat.apply([], f) }, guid: 1, proxy: function (a, b, d) {
    if (arguments.length === 2) if (typeof b === "string") { d = a; a = d[b]; b = w } else if (b &&
!c.isFunction(b)) { d = b; b = w } if (!b && a) b = function () { return a.apply(d || this, arguments) }; if (a) b.guid = a.guid = a.guid || b.guid || c.guid++; return b
}, uaMatch: function (a) { a = a.toLowerCase(); a = /(webkit)[ \/]([\w.]+)/.exec(a) || /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(a) || /(msie) ([\w.]+)/.exec(a) || !/compatible/.test(a) && /(mozilla)(?:.*? rv:([\w.]+))?/.exec(a) || []; return { browser: a[1] || "", version: a[2] || "0"} }, browser: {}
}); P = c.uaMatch(P); if (P.browser) { c.browser[P.browser] = true; c.browser.version = P.version } if (c.browser.webkit) c.browser.safari =
true; if (ya) c.inArray = function (a, b) { return ya.call(b, a) }; T = c(s); if (s.addEventListener) L = function () { s.removeEventListener("DOMContentLoaded", L, false); c.ready() }; else if (s.attachEvent) L = function () { if (s.readyState === "complete") { s.detachEvent("onreadystatechange", L); c.ready() } }; (function () {
    c.support = {}; var a = s.documentElement, b = s.createElement("script"), d = s.createElement("div"), f = "script" + J(); d.style.display = "none"; d.innerHTML = "   <link/><table></table><a href='/a' style='color:red;float:left;opacity:.55;'>a</a><input type='checkbox'/>";
    var e = d.getElementsByTagName("*"), j = d.getElementsByTagName("a")[0]; if (!(!e || !e.length || !j)) {
        c.support = { leadingWhitespace: d.firstChild.nodeType === 3, tbody: !d.getElementsByTagName("tbody").length, htmlSerialize: !!d.getElementsByTagName("link").length, style: /red/.test(j.getAttribute("style")), hrefNormalized: j.getAttribute("href") === "/a", opacity: /^0.55$/.test(j.style.opacity), cssFloat: !!j.style.cssFloat, checkOn: d.getElementsByTagName("input")[0].value === "on", optSelected: s.createElement("select").appendChild(s.createElement("option")).selected,
            parentNode: d.removeChild(d.appendChild(s.createElement("div"))).parentNode === null, deleteExpando: true, checkClone: false, scriptEval: false, noCloneEvent: true, boxModel: null
        }; b.type = "text/javascript"; try { b.appendChild(s.createTextNode("window." + f + "=1;")) } catch (i) { } a.insertBefore(b, a.firstChild); if (A[f]) { c.support.scriptEval = true; delete A[f] } try { delete b.test } catch (o) { c.support.deleteExpando = false } a.removeChild(b); if (d.attachEvent && d.fireEvent) {
            d.attachEvent("onclick", function k() {
                c.support.noCloneEvent =
false; d.detachEvent("onclick", k)
            }); d.cloneNode(true).fireEvent("onclick")
        } d = s.createElement("div"); d.innerHTML = "<input type='radio' name='radiotest' checked='checked'/>"; a = s.createDocumentFragment(); a.appendChild(d.firstChild); c.support.checkClone = a.cloneNode(true).cloneNode(true).lastChild.checked; c(function () { var k = s.createElement("div"); k.style.width = k.style.paddingLeft = "1px"; s.body.appendChild(k); c.boxModel = c.support.boxModel = k.offsetWidth === 2; s.body.removeChild(k).style.display = "none" }); a = function (k) {
            var n =
s.createElement("div"); k = "on" + k; var r = k in n; if (!r) { n.setAttribute(k, "return;"); r = typeof n[k] === "function" } return r
        }; c.support.submitBubbles = a("submit"); c.support.changeBubbles = a("change"); a = b = d = e = j = null
    } 
})(); c.props = { "for": "htmlFor", "class": "className", readonly: "readOnly", maxlength: "maxLength", cellspacing: "cellSpacing", rowspan: "rowSpan", colspan: "colSpan", tabindex: "tabIndex", usemap: "useMap", frameborder: "frameBorder" }; var G = "jQuery" + J(), Ya = 0, za = {}; c.extend({ cache: {}, expando: G, noData: { embed: true, object: true,
    applet: true
}, data: function (a, b, d) { if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) { a = a == A ? za : a; var f = a[G], e = c.cache; if (!f && typeof b === "string" && d === w) return null; f || (f = ++Ya); if (typeof b === "object") { a[G] = f; e[f] = c.extend(true, {}, b) } else if (!e[f]) { a[G] = f; e[f] = {} } a = e[f]; if (d !== w) a[b] = d; return typeof b === "string" ? a[b] : a } }, removeData: function (a, b) {
    if (!(a.nodeName && c.noData[a.nodeName.toLowerCase()])) {
        a = a == A ? za : a; var d = a[G], f = c.cache, e = f[d]; if (b) { if (e) { delete e[b]; c.isEmptyObject(e) && c.removeData(a) } } else {
            if (c.support.deleteExpando) delete a[c.expando];
            else a.removeAttribute && a.removeAttribute(c.expando); delete f[d]
        } 
    } 
} 
}); c.fn.extend({ data: function (a, b) {
    if (typeof a === "undefined" && this.length) return c.data(this[0]); else if (typeof a === "object") return this.each(function () { c.data(this, a) }); var d = a.split("."); d[1] = d[1] ? "." + d[1] : ""; if (b === w) { var f = this.triggerHandler("getData" + d[1] + "!", [d[0]]); if (f === w && this.length) f = c.data(this[0], a); return f === w && d[1] ? this.data(d[0]) : f } else return this.trigger("setData" + d[1] + "!", [d[0], b]).each(function () {
        c.data(this,
a, b)
    })
}, removeData: function (a) { return this.each(function () { c.removeData(this, a) }) } 
}); c.extend({ queue: function (a, b, d) { if (a) { b = (b || "fx") + "queue"; var f = c.data(a, b); if (!d) return f || []; if (!f || c.isArray(d)) f = c.data(a, b, c.makeArray(d)); else f.push(d); return f } }, dequeue: function (a, b) { b = b || "fx"; var d = c.queue(a, b), f = d.shift(); if (f === "inprogress") f = d.shift(); if (f) { b === "fx" && d.unshift("inprogress"); f.call(a, function () { c.dequeue(a, b) }) } } }); c.fn.extend({ queue: function (a, b) {
    if (typeof a !== "string") { b = a; a = "fx" } if (b ===
w) return c.queue(this[0], a); return this.each(function () { var d = c.queue(this, a, b); a === "fx" && d[0] !== "inprogress" && c.dequeue(this, a) })
}, dequeue: function (a) { return this.each(function () { c.dequeue(this, a) }) }, delay: function (a, b) { a = c.fx ? c.fx.speeds[a] || a : a; b = b || "fx"; return this.queue(b, function () { var d = this; setTimeout(function () { c.dequeue(d, b) }, a) }) }, clearQueue: function (a) { return this.queue(a || "fx", []) } 
}); var Aa = /[\n\t]/g, ca = /\s+/, Za = /\r/g, $a = /href|src|style/, ab = /(button|input)/i, bb = /(button|input|object|select|textarea)/i,
cb = /^(a|area)$/i, Ba = /radio|checkbox/; c.fn.extend({ attr: function (a, b) { return X(this, a, b, true, c.attr) }, removeAttr: function (a) { return this.each(function () { c.attr(this, a, ""); this.nodeType === 1 && this.removeAttribute(a) }) }, addClass: function (a) {
    if (c.isFunction(a)) return this.each(function (n) { var r = c(this); r.addClass(a.call(this, n, r.attr("class"))) }); if (a && typeof a === "string") for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
        var e = this[d]; if (e.nodeType === 1) if (e.className) {
            for (var j = " " + e.className + " ",
i = e.className, o = 0, k = b.length; o < k; o++) if (j.indexOf(" " + b[o] + " ") < 0) i += " " + b[o]; e.className = c.trim(i)
        } else e.className = a
    } return this
}, removeClass: function (a) {
    if (c.isFunction(a)) return this.each(function (k) { var n = c(this); n.removeClass(a.call(this, k, n.attr("class"))) }); if (a && typeof a === "string" || a === w) for (var b = (a || "").split(ca), d = 0, f = this.length; d < f; d++) {
        var e = this[d]; if (e.nodeType === 1 && e.className) if (a) {
            for (var j = (" " + e.className + " ").replace(Aa, " "), i = 0, o = b.length; i < o; i++) j = j.replace(" " + b[i] + " ",
" "); e.className = c.trim(j)
        } else e.className = ""
    } return this
}, toggleClass: function (a, b) {
    var d = typeof a, f = typeof b === "boolean"; if (c.isFunction(a)) return this.each(function (e) { var j = c(this); j.toggleClass(a.call(this, e, j.attr("class"), b), b) }); return this.each(function () {
        if (d === "string") for (var e, j = 0, i = c(this), o = b, k = a.split(ca); e = k[j++]; ) { o = f ? o : !i.hasClass(e); i[o ? "addClass" : "removeClass"](e) } else if (d === "undefined" || d === "boolean") {
            this.className && c.data(this, "__className__", this.className); this.className =
this.className || a === false ? "" : c.data(this, "__className__") || ""
        } 
    })
}, hasClass: function (a) { a = " " + a + " "; for (var b = 0, d = this.length; b < d; b++) if ((" " + this[b].className + " ").replace(Aa, " ").indexOf(a) > -1) return true; return false }, val: function (a) {
    if (a === w) {
        var b = this[0]; if (b) {
            if (c.nodeName(b, "option")) return (b.attributes.value || {}).specified ? b.value : b.text; if (c.nodeName(b, "select")) {
                var d = b.selectedIndex, f = [], e = b.options; b = b.type === "select-one"; if (d < 0) return null; var j = b ? d : 0; for (d = b ? d + 1 : e.length; j < d; j++) {
                    var i =
e[j]; if (i.selected) { a = c(i).val(); if (b) return a; f.push(a) } 
                } return f
            } if (Ba.test(b.type) && !c.support.checkOn) return b.getAttribute("value") === null ? "on" : b.value; return (b.value || "").replace(Za, "")
        } return w
    } var o = c.isFunction(a); return this.each(function (k) {
        var n = c(this), r = a; if (this.nodeType === 1) {
            if (o) r = a.call(this, k, n.val()); if (typeof r === "number") r += ""; if (c.isArray(r) && Ba.test(this.type)) this.checked = c.inArray(n.val(), r) >= 0; else if (c.nodeName(this, "select")) {
                var u = c.makeArray(r); c("option", this).each(function () {
                    this.selected =
c.inArray(c(this).val(), u) >= 0
                }); if (!u.length) this.selectedIndex = -1
            } else this.value = r
        } 
    })
} 
}); c.extend({ attrFn: { val: true, css: true, html: true, text: true, data: true, width: true, height: true, offset: true }, attr: function (a, b, d, f) {
    if (!a || a.nodeType === 3 || a.nodeType === 8) return w; if (f && b in c.attrFn) return c(a)[b](d); f = a.nodeType !== 1 || !c.isXMLDoc(a); var e = d !== w; b = f && c.props[b] || b; if (a.nodeType === 1) {
        var j = $a.test(b); if (b in a && f && !j) {
            if (e) {
                b === "type" && ab.test(a.nodeName) && a.parentNode && c.error("type property can't be changed");
                a[b] = d
            } if (c.nodeName(a, "form") && a.getAttributeNode(b)) return a.getAttributeNode(b).nodeValue; if (b === "tabIndex") return (b = a.getAttributeNode("tabIndex")) && b.specified ? b.value : bb.test(a.nodeName) || cb.test(a.nodeName) && a.href ? 0 : w; return a[b]
        } if (!c.support.style && f && b === "style") { if (e) a.style.cssText = "" + d; return a.style.cssText } e && a.setAttribute(b, "" + d); a = !c.support.hrefNormalized && f && j ? a.getAttribute(b, 2) : a.getAttribute(b); return a === null ? w : a
    } return c.style(a, b, d)
} 
}); var O = /\.(.*)$/, db = function (a) {
    return a.replace(/[^\w\s\.\|`]/g,
function (b) { return "\\" + b })
}; c.event = { add: function (a, b, d, f) {
    if (!(a.nodeType === 3 || a.nodeType === 8)) {
        if (a.setInterval && a !== A && !a.frameElement) a = A; var e, j; if (d.handler) { e = d; d = e.handler } if (!d.guid) d.guid = c.guid++; if (j = c.data(a)) {
            var i = j.events = j.events || {}, o = j.handle; if (!o) j.handle = o = function () { return typeof c !== "undefined" && !c.event.triggered ? c.event.handle.apply(o.elem, arguments) : w }; o.elem = a; b = b.split(" "); for (var k, n = 0, r; k = b[n++]; ) {
                j = e ? c.extend({}, e) : { handler: d, data: f }; if (k.indexOf(".") > -1) {
                    r = k.split(".");
                    k = r.shift(); j.namespace = r.slice(0).sort().join(".")
                } else { r = []; j.namespace = "" } j.type = k; j.guid = d.guid; var u = i[k], z = c.event.special[k] || {}; if (!u) { u = i[k] = []; if (!z.setup || z.setup.call(a, f, r, o) === false) if (a.addEventListener) a.addEventListener(k, o, false); else a.attachEvent && a.attachEvent("on" + k, o) } if (z.add) { z.add.call(a, j); if (!j.handler.guid) j.handler.guid = d.guid } u.push(j); c.event.global[k] = true
            } a = null
        } 
    } 
}, global: {}, remove: function (a, b, d, f) {
    if (!(a.nodeType === 3 || a.nodeType === 8)) {
        var e, j = 0, i, o, k, n, r, u, z = c.data(a),
C = z && z.events; if (z && C) {
            if (b && b.type) { d = b.handler; b = b.type } if (!b || typeof b === "string" && b.charAt(0) === ".") { b = b || ""; for (e in C) c.event.remove(a, e + b) } else {
                for (b = b.split(" "); e = b[j++]; ) {
                    n = e; i = e.indexOf(".") < 0; o = []; if (!i) { o = e.split("."); e = o.shift(); k = new RegExp("(^|\\.)" + c.map(o.slice(0).sort(), db).join("\\.(?:.*\\.)?") + "(\\.|$)") } if (r = C[e]) if (d) {
                        n = c.event.special[e] || {}; for (B = f || 0; B < r.length; B++) {
                            u = r[B]; if (d.guid === u.guid) {
                                if (i || k.test(u.namespace)) { f == null && r.splice(B--, 1); n.remove && n.remove.call(a, u) } if (f !=
null) break
                            } 
                        } if (r.length === 0 || f != null && r.length === 1) { if (!n.teardown || n.teardown.call(a, o) === false) Ca(a, e, z.handle); delete C[e] } 
                    } else for (var B = 0; B < r.length; B++) { u = r[B]; if (i || k.test(u.namespace)) { c.event.remove(a, n, u.handler, B); r.splice(B--, 1) } } 
                } if (c.isEmptyObject(C)) { if (b = z.handle) b.elem = null; delete z.events; delete z.handle; c.isEmptyObject(z) && c.removeData(a) } 
            } 
        } 
    } 
}, trigger: function (a, b, d, f) {
    var e = a.type || a; if (!f) {
        a = typeof a === "object" ? a[G] ? a : c.extend(c.Event(e), a) : c.Event(e); if (e.indexOf("!") >= 0) {
            a.type =
e = e.slice(0, -1); a.exclusive = true
        } if (!d) { a.stopPropagation(); c.event.global[e] && c.each(c.cache, function () { this.events && this.events[e] && c.event.trigger(a, b, this.handle.elem) }) } if (!d || d.nodeType === 3 || d.nodeType === 8) return w; a.result = w; a.target = d; b = c.makeArray(b); b.unshift(a)
    } a.currentTarget = d; (f = c.data(d, "handle")) && f.apply(d, b); f = d.parentNode || d.ownerDocument; try { if (!(d && d.nodeName && c.noData[d.nodeName.toLowerCase()])) if (d["on" + e] && d["on" + e].apply(d, b) === false) a.result = false } catch (j) { } if (!a.isPropagationStopped() &&
f) c.event.trigger(a, b, f, true); else if (!a.isDefaultPrevented()) { f = a.target; var i, o = c.nodeName(f, "a") && e === "click", k = c.event.special[e] || {}; if ((!k._default || k._default.call(d, a) === false) && !o && !(f && f.nodeName && c.noData[f.nodeName.toLowerCase()])) { try { if (f[e]) { if (i = f["on" + e]) f["on" + e] = null; c.event.triggered = true; f[e]() } } catch (n) { } if (i) f["on" + e] = i; c.event.triggered = false } } 
}, handle: function (a) {
    var b, d, f, e; a = arguments[0] = c.event.fix(a || A.event); a.currentTarget = this; b = a.type.indexOf(".") < 0 && !a.exclusive;
    if (!b) { d = a.type.split("."); a.type = d.shift(); f = new RegExp("(^|\\.)" + d.slice(0).sort().join("\\.(?:.*\\.)?") + "(\\.|$)") } e = c.data(this, "events"); d = e[a.type]; if (e && d) { d = d.slice(0); e = 0; for (var j = d.length; e < j; e++) { var i = d[e]; if (b || f.test(i.namespace)) { a.handler = i.handler; a.data = i.data; a.handleObj = i; i = i.handler.apply(this, arguments); if (i !== w) { a.result = i; if (i === false) { a.preventDefault(); a.stopPropagation() } } if (a.isImmediatePropagationStopped()) break } } } return a.result
}, props: "altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode layerX layerY metaKey newValue offsetX offsetY originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),
    fix: function (a) {
        if (a[G]) return a; var b = a; a = c.Event(b); for (var d = this.props.length, f; d; ) { f = this.props[--d]; a[f] = b[f] } if (!a.target) a.target = a.srcElement || s; if (a.target.nodeType === 3) a.target = a.target.parentNode; if (!a.relatedTarget && a.fromElement) a.relatedTarget = a.fromElement === a.target ? a.toElement : a.fromElement; if (a.pageX == null && a.clientX != null) {
            b = s.documentElement; d = s.body; a.pageX = a.clientX + (b && b.scrollLeft || d && d.scrollLeft || 0) - (b && b.clientLeft || d && d.clientLeft || 0); a.pageY = a.clientY + (b && b.scrollTop ||
d && d.scrollTop || 0) - (b && b.clientTop || d && d.clientTop || 0)
        } if (!a.which && (a.charCode || a.charCode === 0 ? a.charCode : a.keyCode)) a.which = a.charCode || a.keyCode; if (!a.metaKey && a.ctrlKey) a.metaKey = a.ctrlKey; if (!a.which && a.button !== w) a.which = a.button & 1 ? 1 : a.button & 2 ? 3 : a.button & 4 ? 2 : 0; return a
    }, guid: 1E8, proxy: c.proxy, special: { ready: { setup: c.bindReady, teardown: c.noop }, live: { add: function (a) { c.event.add(this, a.origType, c.extend({}, a, { handler: oa })) }, remove: function (a) {
        var b = true, d = a.origType.replace(O, ""); c.each(c.data(this,
"events").live || [], function () { if (d === this.origType.replace(O, "")) return b = false }); b && c.event.remove(this, a.origType, oa)
    } 
    }, beforeunload: { setup: function (a, b, d) { if (this.setInterval) this.onbeforeunload = d; return false }, teardown: function (a, b) { if (this.onbeforeunload === b) this.onbeforeunload = null } }
    }
}; var Ca = s.removeEventListener ? function (a, b, d) { a.removeEventListener(b, d, false) } : function (a, b, d) { a.detachEvent("on" + b, d) }; c.Event = function (a) {
    if (!this.preventDefault) return new c.Event(a); if (a && a.type) {
        this.originalEvent =
a; this.type = a.type
    } else this.type = a; this.timeStamp = J(); this[G] = true
}; c.Event.prototype = { preventDefault: function () { this.isDefaultPrevented = Z; var a = this.originalEvent; if (a) { a.preventDefault && a.preventDefault(); a.returnValue = false } }, stopPropagation: function () { this.isPropagationStopped = Z; var a = this.originalEvent; if (a) { a.stopPropagation && a.stopPropagation(); a.cancelBubble = true } }, stopImmediatePropagation: function () { this.isImmediatePropagationStopped = Z; this.stopPropagation() }, isDefaultPrevented: Y, isPropagationStopped: Y,
    isImmediatePropagationStopped: Y
}; var Da = function (a) { var b = a.relatedTarget; try { for (; b && b !== this; ) b = b.parentNode; if (b !== this) { a.type = a.data; c.event.handle.apply(this, arguments) } } catch (d) { } }, Ea = function (a) { a.type = a.data; c.event.handle.apply(this, arguments) }; c.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (a, b) { c.event.special[a] = { setup: function (d) { c.event.add(this, b, d && d.selector ? Ea : Da, a) }, teardown: function (d) { c.event.remove(this, b, d && d.selector ? Ea : Da) } } }); if (!c.support.submitBubbles) c.event.special.submit =
{ setup: function () { if (this.nodeName.toLowerCase() !== "form") { c.event.add(this, "click.specialSubmit", function (a) { var b = a.target, d = b.type; if ((d === "submit" || d === "image") && c(b).closest("form").length) return na("submit", this, arguments) }); c.event.add(this, "keypress.specialSubmit", function (a) { var b = a.target, d = b.type; if ((d === "text" || d === "password") && c(b).closest("form").length && a.keyCode === 13) return na("submit", this, arguments) }) } else return false }, teardown: function () { c.event.remove(this, ".specialSubmit") } };
    if (!c.support.changeBubbles) {
        var da = /textarea|input|select/i, ea, Fa = function (a) { var b = a.type, d = a.value; if (b === "radio" || b === "checkbox") d = a.checked; else if (b === "select-multiple") d = a.selectedIndex > -1 ? c.map(a.options, function (f) { return f.selected }).join("-") : ""; else if (a.nodeName.toLowerCase() === "select") d = a.selectedIndex; return d }, fa = function (a, b) {
            var d = a.target, f, e; if (!(!da.test(d.nodeName) || d.readOnly)) {
                f = c.data(d, "_change_data"); e = Fa(d); if (a.type !== "focusout" || d.type !== "radio") c.data(d, "_change_data",
e); if (!(f === w || e === f)) if (f != null || e) { a.type = "change"; return c.event.trigger(a, b, d) } 
            } 
        }; c.event.special.change = { filters: { focusout: fa, click: function (a) { var b = a.target, d = b.type; if (d === "radio" || d === "checkbox" || b.nodeName.toLowerCase() === "select") return fa.call(this, a) }, keydown: function (a) { var b = a.target, d = b.type; if (a.keyCode === 13 && b.nodeName.toLowerCase() !== "textarea" || a.keyCode === 32 && (d === "checkbox" || d === "radio") || d === "select-multiple") return fa.call(this, a) }, beforeactivate: function (a) {
            a = a.target; c.data(a,
"_change_data", Fa(a))
        } 
        }, setup: function () { if (this.type === "file") return false; for (var a in ea) c.event.add(this, a + ".specialChange", ea[a]); return da.test(this.nodeName) }, teardown: function () { c.event.remove(this, ".specialChange"); return da.test(this.nodeName) } 
        }; ea = c.event.special.change.filters
    } s.addEventListener && c.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
        function d(f) { f = c.event.fix(f); f.type = b; return c.event.handle.call(this, f) } c.event.special[b] = { setup: function () {
            this.addEventListener(a,
d, true)
        }, teardown: function () { this.removeEventListener(a, d, true) } 
        }
    }); c.each(["bind", "one"], function (a, b) { c.fn[b] = function (d, f, e) { if (typeof d === "object") { for (var j in d) this[b](j, f, d[j], e); return this } if (c.isFunction(f)) { e = f; f = w } var i = b === "one" ? c.proxy(e, function (k) { c(this).unbind(k, i); return e.apply(this, arguments) }) : e; if (d === "unload" && b !== "one") this.one(d, f, e); else { j = 0; for (var o = this.length; j < o; j++) c.event.add(this[j], d, i, f) } return this } }); c.fn.extend({ unbind: function (a, b) {
        if (typeof a === "object" &&
!a.preventDefault) for (var d in a) this.unbind(d, a[d]); else { d = 0; for (var f = this.length; d < f; d++) c.event.remove(this[d], a, b) } return this
    }, delegate: function (a, b, d, f) { return this.live(b, d, f, a) }, undelegate: function (a, b, d) { return arguments.length === 0 ? this.unbind("live") : this.die(b, null, d, a) }, trigger: function (a, b) { return this.each(function () { c.event.trigger(a, b, this) }) }, triggerHandler: function (a, b) { if (this[0]) { a = c.Event(a); a.preventDefault(); a.stopPropagation(); c.event.trigger(a, b, this[0]); return a.result } },
        toggle: function (a) { for (var b = arguments, d = 1; d < b.length; ) c.proxy(a, b[d++]); return this.click(c.proxy(a, function (f) { var e = (c.data(this, "lastToggle" + a.guid) || 0) % d; c.data(this, "lastToggle" + a.guid, e + 1); f.preventDefault(); return b[e].apply(this, arguments) || false })) }, hover: function (a, b) { return this.mouseenter(a).mouseleave(b || a) } 
    }); var Ga = { focus: "focusin", blur: "focusout", mouseenter: "mouseover", mouseleave: "mouseout" }; c.each(["live", "die"], function (a, b) {
        c.fn[b] = function (d, f, e, j) {
            var i, o = 0, k, n, r = j || this.selector,
u = j ? this : c(this.context); if (c.isFunction(f)) { e = f; f = w } for (d = (d || "").split(" "); (i = d[o++]) != null; ) { j = O.exec(i); k = ""; if (j) { k = j[0]; i = i.replace(O, "") } if (i === "hover") d.push("mouseenter" + k, "mouseleave" + k); else { n = i; if (i === "focus" || i === "blur") { d.push(Ga[i] + k); i += k } else i = (Ga[i] || i) + k; b === "live" ? u.each(function () { c.event.add(this, pa(i, r), { data: f, selector: r, handler: e, origType: i, origHandler: e, preType: n }) }) : u.unbind(pa(i, r), e) } } return this
        } 
    }); c.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error".split(" "),
function (a, b) { c.fn[b] = function (d) { return d ? this.bind(b, d) : this.trigger(b) }; if (c.attrFn) c.attrFn[b] = true }); A.attachEvent && !A.addEventListener && A.attachEvent("onunload", function () { for (var a in c.cache) if (c.cache[a].handle) try { c.event.remove(c.cache[a].handle.elem) } catch (b) { } }); (function () {
    function a(g) { for (var h = "", l, m = 0; g[m]; m++) { l = g[m]; if (l.nodeType === 3 || l.nodeType === 4) h += l.nodeValue; else if (l.nodeType !== 8) h += a(l.childNodes) } return h } function b(g, h, l, m, q, p) {
        q = 0; for (var v = m.length; q < v; q++) {
            var t = m[q];
            if (t) { t = t[g]; for (var y = false; t; ) { if (t.sizcache === l) { y = m[t.sizset]; break } if (t.nodeType === 1 && !p) { t.sizcache = l; t.sizset = q } if (t.nodeName.toLowerCase() === h) { y = t; break } t = t[g] } m[q] = y } 
        } 
    } function d(g, h, l, m, q, p) { q = 0; for (var v = m.length; q < v; q++) { var t = m[q]; if (t) { t = t[g]; for (var y = false; t; ) { if (t.sizcache === l) { y = m[t.sizset]; break } if (t.nodeType === 1) { if (!p) { t.sizcache = l; t.sizset = q } if (typeof h !== "string") { if (t === h) { y = true; break } } else if (k.filter(h, [t]).length > 0) { y = t; break } } t = t[g] } m[q] = y } } } var f = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g,
e = 0, j = Object.prototype.toString, i = false, o = true; [0, 0].sort(function () { o = false; return 0 }); var k = function (g, h, l, m) {
    l = l || []; var q = h = h || s; if (h.nodeType !== 1 && h.nodeType !== 9) return []; if (!g || typeof g !== "string") return l; for (var p = [], v, t, y, S, H = true, M = x(h), I = g; (f.exec(""), v = f.exec(I)) !== null; ) { I = v[3]; p.push(v[1]); if (v[2]) { S = v[3]; break } } if (p.length > 1 && r.exec(g)) if (p.length === 2 && n.relative[p[0]]) t = ga(p[0] + p[1], h); else for (t = n.relative[p[0]] ? [h] : k(p.shift(), h); p.length; ) {
        g = p.shift(); if (n.relative[g]) g += p.shift();
        t = ga(g, t)
    } else { if (!m && p.length > 1 && h.nodeType === 9 && !M && n.match.ID.test(p[0]) && !n.match.ID.test(p[p.length - 1])) { v = k.find(p.shift(), h, M); h = v.expr ? k.filter(v.expr, v.set)[0] : v.set[0] } if (h) { v = m ? { expr: p.pop(), set: z(m)} : k.find(p.pop(), p.length === 1 && (p[0] === "~" || p[0] === "+") && h.parentNode ? h.parentNode : h, M); t = v.expr ? k.filter(v.expr, v.set) : v.set; if (p.length > 0) y = z(t); else H = false; for (; p.length; ) { var D = p.pop(); v = D; if (n.relative[D]) v = p.pop(); else D = ""; if (v == null) v = h; n.relative[D](y, v, M) } } else y = [] } y || (y = t); y || k.error(D ||
g); if (j.call(y) === "[object Array]") if (H) if (h && h.nodeType === 1) for (g = 0; y[g] != null; g++) { if (y[g] && (y[g] === true || y[g].nodeType === 1 && E(h, y[g]))) l.push(t[g]) } else for (g = 0; y[g] != null; g++) y[g] && y[g].nodeType === 1 && l.push(t[g]); else l.push.apply(l, y); else z(y, l); if (S) { k(S, q, l, m); k.uniqueSort(l) } return l
}; k.uniqueSort = function (g) { if (B) { i = o; g.sort(B); if (i) for (var h = 1; h < g.length; h++) g[h] === g[h - 1] && g.splice(h--, 1) } return g }; k.matches = function (g, h) { return k(g, null, null, h) }; k.find = function (g, h, l) {
    var m, q; if (!g) return [];
    for (var p = 0, v = n.order.length; p < v; p++) { var t = n.order[p]; if (q = n.leftMatch[t].exec(g)) { var y = q[1]; q.splice(1, 1); if (y.substr(y.length - 1) !== "\\") { q[1] = (q[1] || "").replace(/\\/g, ""); m = n.find[t](q, h, l); if (m != null) { g = g.replace(n.match[t], ""); break } } } } m || (m = h.getElementsByTagName("*")); return { set: m, expr: g}
}; k.filter = function (g, h, l, m) {
    for (var q = g, p = [], v = h, t, y, S = h && h[0] && x(h[0]); g && h.length; ) {
        for (var H in n.filter) if ((t = n.leftMatch[H].exec(g)) != null && t[2]) {
            var M = n.filter[H], I, D; D = t[1]; y = false; t.splice(1, 1); if (D.substr(D.length -
1) !== "\\") { if (v === p) p = []; if (n.preFilter[H]) if (t = n.preFilter[H](t, v, l, p, m, S)) { if (t === true) continue } else y = I = true; if (t) for (var U = 0; (D = v[U]) != null; U++) if (D) { I = M(D, t, U, v); var Ha = m ^ !!I; if (l && I != null) if (Ha) y = true; else v[U] = false; else if (Ha) { p.push(D); y = true } } if (I !== w) { l || (v = p); g = g.replace(n.match[H], ""); if (!y) return []; break } } 
        } if (g === q) if (y == null) k.error(g); else break; q = g
    } return v
}; k.error = function (g) { throw "Syntax error, unrecognized expression: " + g; }; var n = k.selectors = { order: ["ID", "NAME", "TAG"], match: { ID: /#((?:[\w\u00c0-\uFFFF-]|\\.)+)/,
    CLASS: /\.((?:[\w\u00c0-\uFFFF-]|\\.)+)/, NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF-]|\\.)+)['"]*\]/, ATTR: /\[\s*((?:[\w\u00c0-\uFFFF-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/, TAG: /^((?:[\w\u00c0-\uFFFF\*-]|\\.)+)/, CHILD: /:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/, POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/, PSEUDO: /:((?:[\w\u00c0-\uFFFF-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
}, leftMatch: {}, attrMap: { "class": "className", "for": "htmlFor" }, attrHandle: { href: function (g) { return g.getAttribute("href") } },
    relative: { "+": function (g, h) { var l = typeof h === "string", m = l && !/\W/.test(h); l = l && !m; if (m) h = h.toLowerCase(); m = 0; for (var q = g.length, p; m < q; m++) if (p = g[m]) { for (; (p = p.previousSibling) && p.nodeType !== 1; ); g[m] = l || p && p.nodeName.toLowerCase() === h ? p || false : p === h } l && k.filter(h, g, true) }, ">": function (g, h) {
        var l = typeof h === "string"; if (l && !/\W/.test(h)) { h = h.toLowerCase(); for (var m = 0, q = g.length; m < q; m++) { var p = g[m]; if (p) { l = p.parentNode; g[m] = l.nodeName.toLowerCase() === h ? l : false } } } else {
            m = 0; for (q = g.length; m < q; m++) if (p = g[m]) g[m] =
l ? p.parentNode : p.parentNode === h; l && k.filter(h, g, true)
        } 
    }, "": function (g, h, l) { var m = e++, q = d; if (typeof h === "string" && !/\W/.test(h)) { var p = h = h.toLowerCase(); q = b } q("parentNode", h, m, g, p, l) }, "~": function (g, h, l) { var m = e++, q = d; if (typeof h === "string" && !/\W/.test(h)) { var p = h = h.toLowerCase(); q = b } q("previousSibling", h, m, g, p, l) } 
    }, find: { ID: function (g, h, l) { if (typeof h.getElementById !== "undefined" && !l) return (g = h.getElementById(g[1])) ? [g] : [] }, NAME: function (g, h) {
        if (typeof h.getElementsByName !== "undefined") {
            var l = [];
            h = h.getElementsByName(g[1]); for (var m = 0, q = h.length; m < q; m++) h[m].getAttribute("name") === g[1] && l.push(h[m]); return l.length === 0 ? null : l
        } 
    }, TAG: function (g, h) { return h.getElementsByTagName(g[1]) } 
    }, preFilter: { CLASS: function (g, h, l, m, q, p) { g = " " + g[1].replace(/\\/g, "") + " "; if (p) return g; p = 0; for (var v; (v = h[p]) != null; p++) if (v) if (q ^ (v.className && (" " + v.className + " ").replace(/[\t\n]/g, " ").indexOf(g) >= 0)) l || m.push(v); else if (l) h[p] = false; return false }, ID: function (g) { return g[1].replace(/\\/g, "") }, TAG: function (g) { return g[1].toLowerCase() },
        CHILD: function (g) { if (g[1] === "nth") { var h = /(-?)(\d*)n((?:\+|-)?\d*)/.exec(g[2] === "even" && "2n" || g[2] === "odd" && "2n+1" || !/\D/.test(g[2]) && "0n+" + g[2] || g[2]); g[2] = h[1] + (h[2] || 1) - 0; g[3] = h[3] - 0 } g[0] = e++; return g }, ATTR: function (g, h, l, m, q, p) { h = g[1].replace(/\\/g, ""); if (!p && n.attrMap[h]) g[1] = n.attrMap[h]; if (g[2] === "~=") g[4] = " " + g[4] + " "; return g }, PSEUDO: function (g, h, l, m, q) {
            if (g[1] === "not") if ((f.exec(g[3]) || "").length > 1 || /^\w/.test(g[3])) g[3] = k(g[3], null, null, h); else {
                g = k.filter(g[3], h, l, true ^ q); l || m.push.apply(m,
g); return false
            } else if (n.match.POS.test(g[0]) || n.match.CHILD.test(g[0])) return true; return g
        }, POS: function (g) { g.unshift(true); return g } 
    }, filters: { enabled: function (g) { return g.disabled === false && g.type !== "hidden" }, disabled: function (g) { return g.disabled === true }, checked: function (g) { return g.checked === true }, selected: function (g) { return g.selected === true }, parent: function (g) { return !!g.firstChild }, empty: function (g) { return !g.firstChild }, has: function (g, h, l) { return !!k(l[3], g).length }, header: function (g) { return /h\d/i.test(g.nodeName) },
        text: function (g) { return "text" === g.type }, radio: function (g) { return "radio" === g.type }, checkbox: function (g) { return "checkbox" === g.type }, file: function (g) { return "file" === g.type }, password: function (g) { return "password" === g.type }, submit: function (g) { return "submit" === g.type }, image: function (g) { return "image" === g.type }, reset: function (g) { return "reset" === g.type }, button: function (g) { return "button" === g.type || g.nodeName.toLowerCase() === "button" }, input: function (g) { return /input|select|textarea|button/i.test(g.nodeName) } 
    },
    setFilters: { first: function (g, h) { return h === 0 }, last: function (g, h, l, m) { return h === m.length - 1 }, even: function (g, h) { return h % 2 === 0 }, odd: function (g, h) { return h % 2 === 1 }, lt: function (g, h, l) { return h < l[3] - 0 }, gt: function (g, h, l) { return h > l[3] - 0 }, nth: function (g, h, l) { return l[3] - 0 === h }, eq: function (g, h, l) { return l[3] - 0 === h } }, filter: { PSEUDO: function (g, h, l, m) {
        var q = h[1], p = n.filters[q]; if (p) return p(g, l, h, m); else if (q === "contains") return (g.textContent || g.innerText || a([g]) || "").indexOf(h[3]) >= 0; else if (q === "not") {
            h =
h[3]; l = 0; for (m = h.length; l < m; l++) if (h[l] === g) return false; return true
        } else k.error("Syntax error, unrecognized expression: " + q)
    }, CHILD: function (g, h) {
        var l = h[1], m = g; switch (l) {
            case "only": case "first": for (; m = m.previousSibling; ) if (m.nodeType === 1) return false; if (l === "first") return true; m = g; case "last": for (; m = m.nextSibling; ) if (m.nodeType === 1) return false; return true; case "nth": l = h[2]; var q = h[3]; if (l === 1 && q === 0) return true; h = h[0]; var p = g.parentNode; if (p && (p.sizcache !== h || !g.nodeIndex)) {
                    var v = 0; for (m = p.firstChild; m; m =
m.nextSibling) if (m.nodeType === 1) m.nodeIndex = ++v; p.sizcache = h
                } g = g.nodeIndex - q; return l === 0 ? g === 0 : g % l === 0 && g / l >= 0
        } 
    }, ID: function (g, h) { return g.nodeType === 1 && g.getAttribute("id") === h }, TAG: function (g, h) { return h === "*" && g.nodeType === 1 || g.nodeName.toLowerCase() === h }, CLASS: function (g, h) { return (" " + (g.className || g.getAttribute("class")) + " ").indexOf(h) > -1 }, ATTR: function (g, h) {
        var l = h[1]; g = n.attrHandle[l] ? n.attrHandle[l](g) : g[l] != null ? g[l] : g.getAttribute(l); l = g + ""; var m = h[2]; h = h[4]; return g == null ? m === "!=" : m ===
"=" ? l === h : m === "*=" ? l.indexOf(h) >= 0 : m === "~=" ? (" " + l + " ").indexOf(h) >= 0 : !h ? l && g !== false : m === "!=" ? l !== h : m === "^=" ? l.indexOf(h) === 0 : m === "$=" ? l.substr(l.length - h.length) === h : m === "|=" ? l === h || l.substr(0, h.length + 1) === h + "-" : false
    }, POS: function (g, h, l, m) { var q = n.setFilters[h[2]]; if (q) return q(g, l, h, m) } 
    }
}, r = n.match.POS; for (var u in n.match) {
        n.match[u] = new RegExp(n.match[u].source + /(?![^\[]*\])(?![^\(]*\))/.source); n.leftMatch[u] = new RegExp(/(^(?:.|\r|\n)*?)/.source + n.match[u].source.replace(/\\(\d+)/g, function (g,
h) { return "\\" + (h - 0 + 1) }))
    } var z = function (g, h) { g = Array.prototype.slice.call(g, 0); if (h) { h.push.apply(h, g); return h } return g }; try { Array.prototype.slice.call(s.documentElement.childNodes, 0) } catch (C) { z = function (g, h) { h = h || []; if (j.call(g) === "[object Array]") Array.prototype.push.apply(h, g); else if (typeof g.length === "number") for (var l = 0, m = g.length; l < m; l++) h.push(g[l]); else for (l = 0; g[l]; l++) h.push(g[l]); return h } } var B; if (s.documentElement.compareDocumentPosition) B = function (g, h) {
        if (!g.compareDocumentPosition ||
!h.compareDocumentPosition) { if (g == h) i = true; return g.compareDocumentPosition ? -1 : 1 } g = g.compareDocumentPosition(h) & 4 ? -1 : g === h ? 0 : 1; if (g === 0) i = true; return g
    }; else if ("sourceIndex" in s.documentElement) B = function (g, h) { if (!g.sourceIndex || !h.sourceIndex) { if (g == h) i = true; return g.sourceIndex ? -1 : 1 } g = g.sourceIndex - h.sourceIndex; if (g === 0) i = true; return g }; else if (s.createRange) B = function (g, h) {
        if (!g.ownerDocument || !h.ownerDocument) { if (g == h) i = true; return g.ownerDocument ? -1 : 1 } var l = g.ownerDocument.createRange(), m =
h.ownerDocument.createRange(); l.setStart(g, 0); l.setEnd(g, 0); m.setStart(h, 0); m.setEnd(h, 0); g = l.compareBoundaryPoints(Range.START_TO_END, m); if (g === 0) i = true; return g
    }; (function () {
        var g = s.createElement("div"), h = "script" + (new Date).getTime(); g.innerHTML = "<a name='" + h + "'/>"; var l = s.documentElement; l.insertBefore(g, l.firstChild); if (s.getElementById(h)) {
            n.find.ID = function (m, q, p) {
                if (typeof q.getElementById !== "undefined" && !p) return (q = q.getElementById(m[1])) ? q.id === m[1] || typeof q.getAttributeNode !== "undefined" &&
q.getAttributeNode("id").nodeValue === m[1] ? [q] : w : []
            }; n.filter.ID = function (m, q) { var p = typeof m.getAttributeNode !== "undefined" && m.getAttributeNode("id"); return m.nodeType === 1 && p && p.nodeValue === q } 
        } l.removeChild(g); l = g = null
    })(); (function () {
        var g = s.createElement("div"); g.appendChild(s.createComment("")); if (g.getElementsByTagName("*").length > 0) n.find.TAG = function (h, l) { l = l.getElementsByTagName(h[1]); if (h[1] === "*") { h = []; for (var m = 0; l[m]; m++) l[m].nodeType === 1 && h.push(l[m]); l = h } return l }; g.innerHTML = "<a href='#'></a>";
        if (g.firstChild && typeof g.firstChild.getAttribute !== "undefined" && g.firstChild.getAttribute("href") !== "#") n.attrHandle.href = function (h) { return h.getAttribute("href", 2) }; g = null
    })(); s.querySelectorAll && function () { var g = k, h = s.createElement("div"); h.innerHTML = "<p class='TEST'></p>"; if (!(h.querySelectorAll && h.querySelectorAll(".TEST").length === 0)) { k = function (m, q, p, v) { q = q || s; if (!v && q.nodeType === 9 && !x(q)) try { return z(q.querySelectorAll(m), p) } catch (t) { } return g(m, q, p, v) }; for (var l in g) k[l] = g[l]; h = null } } ();
    (function () { var g = s.createElement("div"); g.innerHTML = "<div class='test e'></div><div class='test'></div>"; if (!(!g.getElementsByClassName || g.getElementsByClassName("e").length === 0)) { g.lastChild.className = "e"; if (g.getElementsByClassName("e").length !== 1) { n.order.splice(1, 0, "CLASS"); n.find.CLASS = function (h, l, m) { if (typeof l.getElementsByClassName !== "undefined" && !m) return l.getElementsByClassName(h[1]) }; g = null } } })(); var E = s.compareDocumentPosition ? function (g, h) { return !!(g.compareDocumentPosition(h) & 16) } :
function (g, h) { return g !== h && (g.contains ? g.contains(h) : true) }, x = function (g) { return (g = (g ? g.ownerDocument || g : 0).documentElement) ? g.nodeName !== "HTML" : false }, ga = function (g, h) { var l = [], m = "", q; for (h = h.nodeType ? [h] : h; q = n.match.PSEUDO.exec(g); ) { m += q[0]; g = g.replace(n.match.PSEUDO, "") } g = n.relative[g] ? g + "*" : g; q = 0; for (var p = h.length; q < p; q++) k(g, h[q], l); return k.filter(m, l) }; c.find = k; c.expr = k.selectors; c.expr[":"] = c.expr.filters; c.unique = k.uniqueSort; c.text = a; c.isXMLDoc = x; c.contains = E
})(); var eb = /Until$/, fb = /^(?:parents|prevUntil|prevAll)/,
gb = /,/; R = Array.prototype.slice; var Ia = function (a, b, d) { if (c.isFunction(b)) return c.grep(a, function (e, j) { return !!b.call(e, j, e) === d }); else if (b.nodeType) return c.grep(a, function (e) { return e === b === d }); else if (typeof b === "string") { var f = c.grep(a, function (e) { return e.nodeType === 1 }); if (Ua.test(b)) return c.filter(b, f, !d); else b = c.filter(b, f) } return c.grep(a, function (e) { return c.inArray(e, b) >= 0 === d }) }; c.fn.extend({ find: function (a) {
    for (var b = this.pushStack("", "find", a), d = 0, f = 0, e = this.length; f < e; f++) {
        d = b.length;
        c.find(a, this[f], b); if (f > 0) for (var j = d; j < b.length; j++) for (var i = 0; i < d; i++) if (b[i] === b[j]) { b.splice(j--, 1); break } 
    } return b
}, has: function (a) { var b = c(a); return this.filter(function () { for (var d = 0, f = b.length; d < f; d++) if (c.contains(this, b[d])) return true }) }, not: function (a) { return this.pushStack(Ia(this, a, false), "not", a) }, filter: function (a) { return this.pushStack(Ia(this, a, true), "filter", a) }, is: function (a) { return !!a && c.filter(a, this).length > 0 }, closest: function (a, b) {
    if (c.isArray(a)) {
        var d = [], f = this[0], e, j =
{}, i; if (f && a.length) { e = 0; for (var o = a.length; e < o; e++) { i = a[e]; j[i] || (j[i] = c.expr.match.POS.test(i) ? c(i, b || this.context) : i) } for (; f && f.ownerDocument && f !== b; ) { for (i in j) { e = j[i]; if (e.jquery ? e.index(f) > -1 : c(f).is(e)) { d.push({ selector: i, elem: f }); delete j[i] } } f = f.parentNode } } return d
    } var k = c.expr.match.POS.test(a) ? c(a, b || this.context) : null; return this.map(function (n, r) { for (; r && r.ownerDocument && r !== b; ) { if (k ? k.index(r) > -1 : c(r).is(a)) return r; r = r.parentNode } return null })
}, index: function (a) {
    if (!a || typeof a ===
"string") return c.inArray(this[0], a ? c(a) : this.parent().children()); return c.inArray(a.jquery ? a[0] : a, this)
}, add: function (a, b) { a = typeof a === "string" ? c(a, b || this.context) : c.makeArray(a); b = c.merge(this.get(), a); return this.pushStack(qa(a[0]) || qa(b[0]) ? b : c.unique(b)) }, andSelf: function () { return this.add(this.prevObject) } 
}); c.each({ parent: function (a) { return (a = a.parentNode) && a.nodeType !== 11 ? a : null }, parents: function (a) { return c.dir(a, "parentNode") }, parentsUntil: function (a, b, d) {
    return c.dir(a, "parentNode",
d)
}, next: function (a) { return c.nth(a, 2, "nextSibling") }, prev: function (a) { return c.nth(a, 2, "previousSibling") }, nextAll: function (a) { return c.dir(a, "nextSibling") }, prevAll: function (a) { return c.dir(a, "previousSibling") }, nextUntil: function (a, b, d) { return c.dir(a, "nextSibling", d) }, prevUntil: function (a, b, d) { return c.dir(a, "previousSibling", d) }, siblings: function (a) { return c.sibling(a.parentNode.firstChild, a) }, children: function (a) { return c.sibling(a.firstChild) }, contents: function (a) {
    return c.nodeName(a, "iframe") ?
a.contentDocument || a.contentWindow.document : c.makeArray(a.childNodes)
} 
}, function (a, b) { c.fn[a] = function (d, f) { var e = c.map(this, b, d); eb.test(a) || (f = d); if (f && typeof f === "string") e = c.filter(f, e); e = this.length > 1 ? c.unique(e) : e; if ((this.length > 1 || gb.test(f)) && fb.test(a)) e = e.reverse(); return this.pushStack(e, a, R.call(arguments).join(",")) } }); c.extend({ filter: function (a, b, d) { if (d) a = ":not(" + a + ")"; return c.find.matches(a, b) }, dir: function (a, b, d) {
    var f = []; for (a = a[b]; a && a.nodeType !== 9 && (d === w || a.nodeType !== 1 || !c(a).is(d)); ) {
        a.nodeType ===
1 && f.push(a); a = a[b]
    } return f
}, nth: function (a, b, d) { b = b || 1; for (var f = 0; a; a = a[d]) if (a.nodeType === 1 && ++f === b) break; return a }, sibling: function (a, b) { for (var d = []; a; a = a.nextSibling) a.nodeType === 1 && a !== b && d.push(a); return d } 
}); var Ja = / jQuery\d+="(?:\d+|null)"/g, V = /^\s+/, Ka = /(<([\w:]+)[^>]*?)\/>/g, hb = /^(?:area|br|col|embed|hr|img|input|link|meta|param)$/i, La = /<([\w:]+)/, ib = /<tbody/i, jb = /<|&#?\w+;/, ta = /<script|<object|<embed|<option|<style/i, ua = /checked\s*(?:[^=]|=\s*.checked.)/i, Ma = function (a, b, d) {
    return hb.test(d) ?
a : b + "></" + d + ">"
}, F = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] }; F.optgroup = F.option; F.tbody = F.tfoot = F.colgroup = F.caption = F.thead; F.th = F.td; if (!c.support.htmlSerialize) F._default = [1, "div<div>", "</div>"]; c.fn.extend({ text: function (a) {
    if (c.isFunction(a)) return this.each(function (b) {
        var d =
c(this); d.text(a.call(this, b, d.text()))
    }); if (typeof a !== "object" && a !== w) return this.empty().append((this[0] && this[0].ownerDocument || s).createTextNode(a)); return c.text(this)
}, wrapAll: function (a) { if (c.isFunction(a)) return this.each(function (d) { c(this).wrapAll(a.call(this, d)) }); if (this[0]) { var b = c(a, this[0].ownerDocument).eq(0).clone(true); this[0].parentNode && b.insertBefore(this[0]); b.map(function () { for (var d = this; d.firstChild && d.firstChild.nodeType === 1; ) d = d.firstChild; return d }).append(this) } return this },
    wrapInner: function (a) { if (c.isFunction(a)) return this.each(function (b) { c(this).wrapInner(a.call(this, b)) }); return this.each(function () { var b = c(this), d = b.contents(); d.length ? d.wrapAll(a) : b.append(a) }) }, wrap: function (a) { return this.each(function () { c(this).wrapAll(a) }) }, unwrap: function () { return this.parent().each(function () { c.nodeName(this, "body") || c(this).replaceWith(this.childNodes) }).end() }, append: function () { return this.domManip(arguments, true, function (a) { this.nodeType === 1 && this.appendChild(a) }) },
    prepend: function () { return this.domManip(arguments, true, function (a) { this.nodeType === 1 && this.insertBefore(a, this.firstChild) }) }, before: function () { if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function (b) { this.parentNode.insertBefore(b, this) }); else if (arguments.length) { var a = c(arguments[0]); a.push.apply(a, this.toArray()); return this.pushStack(a, "before", arguments) } }, after: function () {
        if (this[0] && this[0].parentNode) return this.domManip(arguments, false, function (b) {
            this.parentNode.insertBefore(b,
this.nextSibling)
        }); else if (arguments.length) { var a = this.pushStack(this, "after", arguments); a.push.apply(a, c(arguments[0]).toArray()); return a } 
    }, remove: function (a, b) { for (var d = 0, f; (f = this[d]) != null; d++) if (!a || c.filter(a, [f]).length) { if (!b && f.nodeType === 1) { c.cleanData(f.getElementsByTagName("*")); c.cleanData([f]) } f.parentNode && f.parentNode.removeChild(f) } return this }, empty: function () {
        for (var a = 0, b; (b = this[a]) != null; a++) for (b.nodeType === 1 && c.cleanData(b.getElementsByTagName("*")); b.firstChild; ) b.removeChild(b.firstChild);
        return this
    }, clone: function (a) { var b = this.map(function () { if (!c.support.noCloneEvent && !c.isXMLDoc(this)) { var d = this.outerHTML, f = this.ownerDocument; if (!d) { d = f.createElement("div"); d.appendChild(this.cloneNode(true)); d = d.innerHTML } return c.clean([d.replace(Ja, "").replace(/=([^="'>\s]+\/)>/g, '="$1">').replace(V, "")], f)[0] } else return this.cloneNode(true) }); if (a === true) { ra(this, b); ra(this.find("*"), b.find("*")) } return b }, html: function (a) {
        if (a === w) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(Ja,
"") : null; else if (typeof a === "string" && !ta.test(a) && (c.support.leadingWhitespace || !V.test(a)) && !F[(La.exec(a) || ["", ""])[1].toLowerCase()]) { a = a.replace(Ka, Ma); try { for (var b = 0, d = this.length; b < d; b++) if (this[b].nodeType === 1) { c.cleanData(this[b].getElementsByTagName("*")); this[b].innerHTML = a } } catch (f) { this.empty().append(a) } } else c.isFunction(a) ? this.each(function (e) { var j = c(this), i = j.html(); j.empty().append(function () { return a.call(this, e, i) }) }) : this.empty().append(a); return this
    }, replaceWith: function (a) {
        if (this[0] &&
this[0].parentNode) { if (c.isFunction(a)) return this.each(function (b) { var d = c(this), f = d.html(); d.replaceWith(a.call(this, b, f)) }); if (typeof a !== "string") a = c(a).detach(); return this.each(function () { var b = this.nextSibling, d = this.parentNode; c(this).remove(); b ? c(b).before(a) : c(d).append(a) }) } else return this.pushStack(c(c.isFunction(a) ? a() : a), "replaceWith", a)
    }, detach: function (a) { return this.remove(a, true) }, domManip: function (a, b, d) {
        function f(u) {
            return c.nodeName(u, "table") ? u.getElementsByTagName("tbody")[0] ||
u.appendChild(u.ownerDocument.createElement("tbody")) : u
        } var e, j, i = a[0], o = [], k; if (!c.support.checkClone && arguments.length === 3 && typeof i === "string" && ua.test(i)) return this.each(function () { c(this).domManip(a, b, d, true) }); if (c.isFunction(i)) return this.each(function (u) { var z = c(this); a[0] = i.call(this, u, b ? z.html() : w); z.domManip(a, b, d) }); if (this[0]) {
            e = i && i.parentNode; e = c.support.parentNode && e && e.nodeType === 11 && e.childNodes.length === this.length ? { fragment: e} : sa(a, this, o); k = e.fragment; if (j = k.childNodes.length ===
1 ? (k = k.firstChild) : k.firstChild) { b = b && c.nodeName(j, "tr"); for (var n = 0, r = this.length; n < r; n++) d.call(b ? f(this[n], j) : this[n], n > 0 || e.cacheable || this.length > 1 ? k.cloneNode(true) : k) } o.length && c.each(o, Qa)
        } return this
    } 
}); c.fragments = {}; c.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (a, b) {
    c.fn[a] = function (d) {
        var f = []; d = c(d); var e = this.length === 1 && this[0].parentNode; if (e && e.nodeType === 11 && e.childNodes.length === 1 && d.length === 1) {
            d[b](this[0]);
            return this
        } else { e = 0; for (var j = d.length; e < j; e++) { var i = (e > 0 ? this.clone(true) : this).get(); c.fn[b].apply(c(d[e]), i); f = f.concat(i) } return this.pushStack(f, a, d.selector) } 
    } 
}); c.extend({ clean: function (a, b, d, f) {
    b = b || s; if (typeof b.createElement === "undefined") b = b.ownerDocument || b[0] && b[0].ownerDocument || s; for (var e = [], j = 0, i; (i = a[j]) != null; j++) {
        if (typeof i === "number") i += ""; if (i) {
            if (typeof i === "string" && !jb.test(i)) i = b.createTextNode(i); else if (typeof i === "string") {
                i = i.replace(Ka, Ma); var o = (La.exec(i) || ["",
""])[1].toLowerCase(), k = F[o] || F._default, n = k[0], r = b.createElement("div"); for (r.innerHTML = k[1] + i + k[2]; n--; ) r = r.lastChild; if (!c.support.tbody) { n = ib.test(i); o = o === "table" && !n ? r.firstChild && r.firstChild.childNodes : k[1] === "<table>" && !n ? r.childNodes : []; for (k = o.length - 1; k >= 0; --k) c.nodeName(o[k], "tbody") && !o[k].childNodes.length && o[k].parentNode.removeChild(o[k]) } !c.support.leadingWhitespace && V.test(i) && r.insertBefore(b.createTextNode(V.exec(i)[0]), r.firstChild); i = r.childNodes
            } if (i.nodeType) e.push(i); else e =
c.merge(e, i)
        } 
    } if (d) for (j = 0; e[j]; j++) if (f && c.nodeName(e[j], "script") && (!e[j].type || e[j].type.toLowerCase() === "text/javascript")) f.push(e[j].parentNode ? e[j].parentNode.removeChild(e[j]) : e[j]); else { e[j].nodeType === 1 && e.splice.apply(e, [j + 1, 0].concat(c.makeArray(e[j].getElementsByTagName("script")))); d.appendChild(e[j]) } return e
}, cleanData: function (a) {
    for (var b, d, f = c.cache, e = c.event.special, j = c.support.deleteExpando, i = 0, o; (o = a[i]) != null; i++) if (d = o[c.expando]) {
        b = f[d]; if (b.events) for (var k in b.events) e[k] ?
c.event.remove(o, k) : Ca(o, k, b.handle); if (j) delete o[c.expando]; else o.removeAttribute && o.removeAttribute(c.expando); delete f[d]
    } 
} 
}); var kb = /z-?index|font-?weight|opacity|zoom|line-?height/i, Na = /alpha\([^)]*\)/, Oa = /opacity=([^)]*)/, ha = /float/i, ia = /-([a-z])/ig, lb = /([A-Z])/g, mb = /^-?\d+(?:px)?$/i, nb = /^-?\d/, ob = { position: "absolute", visibility: "hidden", display: "block" }, pb = ["Left", "Right"], qb = ["Top", "Bottom"], rb = s.defaultView && s.defaultView.getComputedStyle, Pa = c.support.cssFloat ? "cssFloat" : "styleFloat", ja =
function (a, b) { return b.toUpperCase() }; c.fn.css = function (a, b) { return X(this, a, b, true, function (d, f, e) { if (e === w) return c.curCSS(d, f); if (typeof e === "number" && !kb.test(f)) e += "px"; c.style(d, f, e) }) }; c.extend({ style: function (a, b, d) {
    if (!a || a.nodeType === 3 || a.nodeType === 8) return w; if ((b === "width" || b === "height") && parseFloat(d) < 0) d = w; var f = a.style || a, e = d !== w; if (!c.support.opacity && b === "opacity") {
        if (e) {
            f.zoom = 1; b = parseInt(d, 10) + "" === "NaN" ? "" : "alpha(opacity=" + d * 100 + ")"; a = f.filter || c.curCSS(a, "filter") || ""; f.filter =
Na.test(a) ? a.replace(Na, b) : b
        } return f.filter && f.filter.indexOf("opacity=") >= 0 ? parseFloat(Oa.exec(f.filter)[1]) / 100 + "" : ""
    } if (ha.test(b)) b = Pa; b = b.replace(ia, ja); if (e) f[b] = d; return f[b]
}, css: function (a, b, d, f) {
    if (b === "width" || b === "height") {
        var e, j = b === "width" ? pb : qb; function i() {
            e = b === "width" ? a.offsetWidth : a.offsetHeight; f !== "border" && c.each(j, function () {
                f || (e -= parseFloat(c.curCSS(a, "padding" + this, true)) || 0); if (f === "margin") e += parseFloat(c.curCSS(a, "margin" + this, true)) || 0; else e -= parseFloat(c.curCSS(a,
"border" + this + "Width", true)) || 0
            })
        } a.offsetWidth !== 0 ? i() : c.swap(a, ob, i); return Math.max(0, Math.round(e))
    } return c.curCSS(a, b, d)
}, curCSS: function (a, b, d) {
    var f, e = a.style; if (!c.support.opacity && b === "opacity" && a.currentStyle) { f = Oa.test(a.currentStyle.filter || "") ? parseFloat(RegExp.$1) / 100 + "" : ""; return f === "" ? "1" : f } if (ha.test(b)) b = Pa; if (!d && e && e[b]) f = e[b]; else if (rb) {
        if (ha.test(b)) b = "float"; b = b.replace(lb, "-$1").toLowerCase(); e = a.ownerDocument.defaultView; if (!e) return null; if (a = e.getComputedStyle(a, null)) f =
a.getPropertyValue(b); if (b === "opacity" && f === "") f = "1"
    } else if (a.currentStyle) { d = b.replace(ia, ja); f = a.currentStyle[b] || a.currentStyle[d]; if (!mb.test(f) && nb.test(f)) { b = e.left; var j = a.runtimeStyle.left; a.runtimeStyle.left = a.currentStyle.left; e.left = d === "fontSize" ? "1em" : f || 0; f = e.pixelLeft + "px"; e.left = b; a.runtimeStyle.left = j } } return f
}, swap: function (a, b, d) { var f = {}; for (var e in b) { f[e] = a.style[e]; a.style[e] = b[e] } d.call(a); for (e in b) a.style[e] = f[e] } 
}); if (c.expr && c.expr.filters) {
        c.expr.filters.hidden = function (a) {
            var b =
a.offsetWidth, d = a.offsetHeight, f = a.nodeName.toLowerCase() === "tr"; return b === 0 && d === 0 && !f ? true : b > 0 && d > 0 && !f ? false : c.curCSS(a, "display") === "none"
        }; c.expr.filters.visible = function (a) { return !c.expr.filters.hidden(a) } 
    } var sb = J(), tb = /<script(.|\s)*?\/script>/gi, ub = /select|textarea/i, vb = /color|date|datetime|email|hidden|month|number|password|range|search|tel|text|time|url|week/i, N = /=\?(&|$)/, ka = /\?/, wb = /(\?|&)_=.*?(&|$)/, xb = /^(\w+:)?\/\/([^\/?#]+)/, yb = /%20/g, zb = c.fn.load; c.fn.extend({ load: function (a, b, d) {
        if (typeof a !==
"string") return zb.call(this, a); else if (!this.length) return this; var f = a.indexOf(" "); if (f >= 0) { var e = a.slice(f, a.length); a = a.slice(0, f) } f = "GET"; if (b) if (c.isFunction(b)) { d = b; b = null } else if (typeof b === "object") { b = c.param(b, c.ajaxSettings.traditional); f = "POST" } var j = this; c.ajax({ url: a, type: f, dataType: "html", data: b, complete: function (i, o) { if (o === "success" || o === "notmodified") j.html(e ? c("<div />").append(i.responseText.replace(tb, "")).find(e) : i.responseText); d && j.each(d, [i.responseText, o, i]) } }); return this
    },
        serialize: function () { return c.param(this.serializeArray()) }, serializeArray: function () { return this.map(function () { return this.elements ? c.makeArray(this.elements) : this }).filter(function () { return this.name && !this.disabled && (this.checked || ub.test(this.nodeName) || vb.test(this.type)) }).map(function (a, b) { a = c(this).val(); return a == null ? null : c.isArray(a) ? c.map(a, function (d) { return { name: b.name, value: d} }) : { name: b.name, value: a} }).get() } 
    }); c.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "),
function (a, b) { c.fn[b] = function (d) { return this.bind(b, d) } }); c.extend({ get: function (a, b, d, f) { if (c.isFunction(b)) { f = f || d; d = b; b = null } return c.ajax({ type: "GET", url: a, data: b, success: d, dataType: f }) }, getScript: function (a, b) { return c.get(a, null, b, "script") }, getJSON: function (a, b, d) { return c.get(a, b, d, "json") }, post: function (a, b, d, f) { if (c.isFunction(b)) { f = f || d; d = b; b = {} } return c.ajax({ type: "POST", url: a, data: b, success: d, dataType: f }) }, ajaxSetup: function (a) { c.extend(c.ajaxSettings, a) }, ajaxSettings: { url: location.href,
    global: true, type: "GET", contentType: "application/x-www-form-urlencoded", processData: true, async: true, xhr: A.XMLHttpRequest && (A.location.protocol !== "file:" || !A.ActiveXObject) ? function () { return new A.XMLHttpRequest } : function () { try { return new A.ActiveXObject("Microsoft.XMLHTTP") } catch (a) { } }, accepts: { xml: "application/xml, text/xml", html: "text/html", script: "text/javascript, application/javascript", json: "application/json, text/javascript", text: "text/plain", _default: "*/*"}
}, lastModified: {}, etag: {}, ajax: function (a) {
    function b() {
        e.success &&
e.success.call(k, o, i, x); e.global && f("ajaxSuccess", [x, e])
    } function d() { e.complete && e.complete.call(k, x, i); e.global && f("ajaxComplete", [x, e]); e.global && ! --c.active && c.event.trigger("ajaxStop") } function f(q, p) { (e.context ? c(e.context) : c.event).trigger(q, p) } var e = c.extend(true, {}, c.ajaxSettings, a), j, i, o, k = a && a.context || e, n = e.type.toUpperCase(); if (e.data && e.processData && typeof e.data !== "string") e.data = c.param(e.data, e.traditional); if (e.dataType === "jsonp") {
        if (n === "GET") N.test(e.url) || (e.url += (ka.test(e.url) ?
"&" : "?") + (e.jsonp || "callback") + "=?"); else if (!e.data || !N.test(e.data)) e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?"; e.dataType = "json"
    } if (e.dataType === "json" && (e.data && N.test(e.data) || N.test(e.url))) { j = e.jsonpCallback || "jsonp" + sb++; if (e.data) e.data = (e.data + "").replace(N, "=" + j + "$1"); e.url = e.url.replace(N, "=" + j + "$1"); e.dataType = "script"; A[j] = A[j] || function (q) { o = q; b(); d(); A[j] = w; try { delete A[j] } catch (p) { } z && z.removeChild(C) } } if (e.dataType === "script" && e.cache === null) e.cache = false; if (e.cache ===
false && n === "GET") { var r = J(), u = e.url.replace(wb, "$1_=" + r + "$2"); e.url = u + (u === e.url ? (ka.test(e.url) ? "&" : "?") + "_=" + r : "") } if (e.data && n === "GET") e.url += (ka.test(e.url) ? "&" : "?") + e.data; e.global && !c.active++ && c.event.trigger("ajaxStart"); r = (r = xb.exec(e.url)) && (r[1] && r[1] !== location.protocol || r[2] !== location.host); if (e.dataType === "script" && n === "GET" && r) {
        var z = s.getElementsByTagName("head")[0] || s.documentElement, C = s.createElement("script"); C.src = e.url; if (e.scriptCharset) C.charset = e.scriptCharset; if (!j) {
            var B =
false; C.onload = C.onreadystatechange = function () { if (!B && (!this.readyState || this.readyState === "loaded" || this.readyState === "complete")) { B = true; b(); d(); C.onload = C.onreadystatechange = null; z && C.parentNode && z.removeChild(C) } } 
        } z.insertBefore(C, z.firstChild); return w
    } var E = false, x = e.xhr(); if (x) {
        e.username ? x.open(n, e.url, e.async, e.username, e.password) : x.open(n, e.url, e.async); try {
            if (e.data || a && a.contentType) x.setRequestHeader("Content-Type", e.contentType); if (e.ifModified) {
                c.lastModified[e.url] && x.setRequestHeader("If-Modified-Since",
c.lastModified[e.url]); c.etag[e.url] && x.setRequestHeader("If-None-Match", c.etag[e.url])
            } r || x.setRequestHeader("X-Requested-With", "XMLHttpRequest"); x.setRequestHeader("Accept", e.dataType && e.accepts[e.dataType] ? e.accepts[e.dataType] + ", */*" : e.accepts._default)
        } catch (ga) { } if (e.beforeSend && e.beforeSend.call(k, x, e) === false) { e.global && ! --c.active && c.event.trigger("ajaxStop"); x.abort(); return false } e.global && f("ajaxSend", [x, e]); var g = x.onreadystatechange = function (q) {
            if (!x || x.readyState === 0 || q === "abort") {
                E ||
d(); E = true; if (x) x.onreadystatechange = c.noop
            } else if (!E && x && (x.readyState === 4 || q === "timeout")) { E = true; x.onreadystatechange = c.noop; i = q === "timeout" ? "timeout" : !c.httpSuccess(x) ? "error" : e.ifModified && c.httpNotModified(x, e.url) ? "notmodified" : "success"; var p; if (i === "success") try { o = c.httpData(x, e.dataType, e) } catch (v) { i = "parsererror"; p = v } if (i === "success" || i === "notmodified") j || b(); else c.handleError(e, x, i, p); d(); q === "timeout" && x.abort(); if (e.async) x = null } 
        }; try {
            var h = x.abort; x.abort = function () {
                x && h.call(x);
                g("abort")
            } 
        } catch (l) { } e.async && e.timeout > 0 && setTimeout(function () { x && !E && g("timeout") }, e.timeout); try { x.send(n === "POST" || n === "PUT" || n === "DELETE" ? e.data : null) } catch (m) { c.handleError(e, x, null, m); d() } e.async || g(); return x
    } 
}, handleError: function (a, b, d, f) { if (a.error) a.error.call(a.context || a, b, d, f); if (a.global) (a.context ? c(a.context) : c.event).trigger("ajaxError", [b, a, f]) }, active: 0, httpSuccess: function (a) {
    try {
        return !a.status && location.protocol === "file:" || a.status >= 200 && a.status < 300 || a.status === 304 || a.status ===
1223 || a.status === 0
    } catch (b) { } return false
}, httpNotModified: function (a, b) { var d = a.getResponseHeader("Last-Modified"), f = a.getResponseHeader("Etag"); if (d) c.lastModified[b] = d; if (f) c.etag[b] = f; return a.status === 304 || a.status === 0 }, httpData: function (a, b, d) {
    var f = a.getResponseHeader("content-type") || "", e = b === "xml" || !b && f.indexOf("xml") >= 0; a = e ? a.responseXML : a.responseText; e && a.documentElement.nodeName === "parsererror" && c.error("parsererror"); if (d && d.dataFilter) a = d.dataFilter(a, b); if (typeof a === "string") if (b ===
"json" || !b && f.indexOf("json") >= 0) a = c.parseJSON(a); else if (b === "script" || !b && f.indexOf("javascript") >= 0) c.globalEval(a); return a
}, param: function (a, b) {
    function d(i, o) { if (c.isArray(o)) c.each(o, function (k, n) { b || /\[\]$/.test(i) ? f(i, n) : d(i + "[" + (typeof n === "object" || c.isArray(n) ? k : "") + "]", n) }); else !b && o != null && typeof o === "object" ? c.each(o, function (k, n) { d(i + "[" + k + "]", n) }) : f(i, o) } function f(i, o) { o = c.isFunction(o) ? o() : o; e[e.length] = encodeURIComponent(i) + "=" + encodeURIComponent(o) } var e = []; if (b === w) b = c.ajaxSettings.traditional;
    if (c.isArray(a) || a.jquery) c.each(a, function () { f(this.name, this.value) }); else for (var j in a) d(j, a[j]); return e.join("&").replace(yb, "+")
} 
}); var la = {}, Ab = /toggle|show|hide/, Bb = /^([+-]=)?([\d+-.]+)(.*)$/, W, va = [["height", "marginTop", "marginBottom", "paddingTop", "paddingBottom"], ["width", "marginLeft", "marginRight", "paddingLeft", "paddingRight"], ["opacity"]]; c.fn.extend({ show: function (a, b) {
    if (a || a === 0) return this.animate(K("show", 3), a, b); else {
        a = 0; for (b = this.length; a < b; a++) {
            var d = c.data(this[a], "olddisplay");
            this[a].style.display = d || ""; if (c.css(this[a], "display") === "none") { d = this[a].nodeName; var f; if (la[d]) f = la[d]; else { var e = c("<" + d + " />").appendTo("body"); f = e.css("display"); if (f === "none") f = "block"; e.remove(); la[d] = f } c.data(this[a], "olddisplay", f) } 
        } a = 0; for (b = this.length; a < b; a++) this[a].style.display = c.data(this[a], "olddisplay") || ""; return this
    } 
}, hide: function (a, b) {
    if (a || a === 0) return this.animate(K("hide", 3), a, b); else {
        a = 0; for (b = this.length; a < b; a++) {
            var d = c.data(this[a], "olddisplay"); !d && d !== "none" && c.data(this[a],
"olddisplay", c.css(this[a], "display"))
        } a = 0; for (b = this.length; a < b; a++) this[a].style.display = "none"; return this
    } 
}, _toggle: c.fn.toggle, toggle: function (a, b) { var d = typeof a === "boolean"; if (c.isFunction(a) && c.isFunction(b)) this._toggle.apply(this, arguments); else a == null || d ? this.each(function () { var f = d ? a : c(this).is(":hidden"); c(this)[f ? "show" : "hide"]() }) : this.animate(K("toggle", 3), a, b); return this }, fadeTo: function (a, b, d) { return this.filter(":hidden").css("opacity", 0).show().end().animate({ opacity: b }, a, d) },
    animate: function (a, b, d, f) {
        var e = c.speed(b, d, f); if (c.isEmptyObject(a)) return this.each(e.complete); return this[e.queue === false ? "each" : "queue"](function () {
            var j = c.extend({}, e), i, o = this.nodeType === 1 && c(this).is(":hidden"), k = this; for (i in a) {
                var n = i.replace(ia, ja); if (i !== n) { a[n] = a[i]; delete a[i]; i = n } if (a[i] === "hide" && o || a[i] === "show" && !o) return j.complete.call(this); if ((i === "height" || i === "width") && this.style) { j.display = c.css(this, "display"); j.overflow = this.style.overflow } if (c.isArray(a[i])) {
                    (j.specialEasing =
j.specialEasing || {})[i] = a[i][1]; a[i] = a[i][0]
                } 
            } if (j.overflow != null) this.style.overflow = "hidden"; j.curAnim = c.extend({}, a); c.each(a, function (r, u) { var z = new c.fx(k, j, r); if (Ab.test(u)) z[u === "toggle" ? o ? "show" : "hide" : u](a); else { var C = Bb.exec(u), B = z.cur(true) || 0; if (C) { u = parseFloat(C[2]); var E = C[3] || "px"; if (E !== "px") { k.style[r] = (u || 1) + E; B = (u || 1) / z.cur(true) * B; k.style[r] = B + E } if (C[1]) u = (C[1] === "-=" ? -1 : 1) * u + B; z.custom(B, u, E) } else z.custom(B, u, "") } }); return true
        })
    }, stop: function (a, b) {
        var d = c.timers; a && this.queue([]);
        this.each(function () { for (var f = d.length - 1; f >= 0; f--) if (d[f].elem === this) { b && d[f](true); d.splice(f, 1) } }); b || this.dequeue(); return this
    } 
}); c.each({ slideDown: K("show", 1), slideUp: K("hide", 1), slideToggle: K("toggle", 1), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide"} }, function (a, b) { c.fn[a] = function (d, f) { return this.animate(b, d, f) } }); c.extend({ speed: function (a, b, d) {
    var f = a && typeof a === "object" ? a : { complete: d || !d && b || c.isFunction(a) && a, duration: a, easing: d && b || b && !c.isFunction(b) && b }; f.duration = c.fx.off ? 0 : typeof f.duration ===
"number" ? f.duration : c.fx.speeds[f.duration] || c.fx.speeds._default; f.old = f.complete; f.complete = function () { f.queue !== false && c(this).dequeue(); c.isFunction(f.old) && f.old.call(this) }; return f
}, easing: { linear: function (a, b, d, f) { return d + f * a }, swing: function (a, b, d, f) { return (-Math.cos(a * Math.PI) / 2 + 0.5) * f + d } }, timers: [], fx: function (a, b, d) { this.options = b; this.elem = a; this.prop = d; if (!b.orig) b.orig = {} } 
}); c.fx.prototype = { update: function () {
    this.options.step && this.options.step.call(this.elem, this.now, this); (c.fx.step[this.prop] ||
c.fx.step._default)(this); if ((this.prop === "height" || this.prop === "width") && this.elem.style) this.elem.style.display = "block"
}, cur: function (a) { if (this.elem[this.prop] != null && (!this.elem.style || this.elem.style[this.prop] == null)) return this.elem[this.prop]; return (a = parseFloat(c.css(this.elem, this.prop, a))) && a > -10000 ? a : parseFloat(c.curCSS(this.elem, this.prop)) || 0 }, custom: function (a, b, d) {
    function f(j) { return e.step(j) } this.startTime = J(); this.start = a; this.end = b; this.unit = d || this.unit || "px"; this.now = this.start;
    this.pos = this.state = 0; var e = this; f.elem = this.elem; if (f() && c.timers.push(f) && !W) W = setInterval(c.fx.tick, 13)
}, show: function () { this.options.orig[this.prop] = c.style(this.elem, this.prop); this.options.show = true; this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()); c(this.elem).show() }, hide: function () { this.options.orig[this.prop] = c.style(this.elem, this.prop); this.options.hide = true; this.custom(this.cur(), 0) }, step: function (a) {
    var b = J(), d = true; if (a || b >= this.options.duration + this.startTime) {
        this.now =
this.end; this.pos = this.state = 1; this.update(); this.options.curAnim[this.prop] = true; for (var f in this.options.curAnim) if (this.options.curAnim[f] !== true) d = false; if (d) {
            if (this.options.display != null) { this.elem.style.overflow = this.options.overflow; a = c.data(this.elem, "olddisplay"); this.elem.style.display = a ? a : this.options.display; if (c.css(this.elem, "display") === "none") this.elem.style.display = "block" } this.options.hide && c(this.elem).hide(); if (this.options.hide || this.options.show) for (var e in this.options.curAnim) c.style(this.elem,
e, this.options.orig[e]); this.options.complete.call(this.elem)
        } return false
    } else { e = b - this.startTime; this.state = e / this.options.duration; a = this.options.easing || (c.easing.swing ? "swing" : "linear"); this.pos = c.easing[this.options.specialEasing && this.options.specialEasing[this.prop] || a](this.state, e, 0, 1, this.options.duration); this.now = this.start + (this.end - this.start) * this.pos; this.update() } return true
} 
}; c.extend(c.fx, { tick: function () {
    for (var a = c.timers, b = 0; b < a.length; b++) a[b]() || a.splice(b--, 1); a.length ||
c.fx.stop()
}, stop: function () { clearInterval(W); W = null }, speeds: { slow: 600, fast: 200, _default: 400 }, step: { opacity: function (a) { c.style(a.elem, "opacity", a.now) }, _default: function (a) { if (a.elem.style && a.elem.style[a.prop] != null) a.elem.style[a.prop] = (a.prop === "width" || a.prop === "height" ? Math.max(0, a.now) : a.now) + a.unit; else a.elem[a.prop] = a.now } }
}); if (c.expr && c.expr.filters) c.expr.filters.animated = function (a) { return c.grep(c.timers, function (b) { return a === b.elem }).length }; c.fn.offset = "getBoundingClientRect" in s.documentElement ?
function (a) { var b = this[0]; if (a) return this.each(function (e) { c.offset.setOffset(this, a, e) }); if (!b || !b.ownerDocument) return null; if (b === b.ownerDocument.body) return c.offset.bodyOffset(b); var d = b.getBoundingClientRect(), f = b.ownerDocument; b = f.body; f = f.documentElement; return { top: d.top + (self.pageYOffset || c.support.boxModel && f.scrollTop || b.scrollTop) - (f.clientTop || b.clientTop || 0), left: d.left + (self.pageXOffset || c.support.boxModel && f.scrollLeft || b.scrollLeft) - (f.clientLeft || b.clientLeft || 0)} } : function (a) {
    var b =
this[0]; if (a) return this.each(function (r) { c.offset.setOffset(this, a, r) }); if (!b || !b.ownerDocument) return null; if (b === b.ownerDocument.body) return c.offset.bodyOffset(b); c.offset.initialize(); var d = b.offsetParent, f = b, e = b.ownerDocument, j, i = e.documentElement, o = e.body; f = (e = e.defaultView) ? e.getComputedStyle(b, null) : b.currentStyle; for (var k = b.offsetTop, n = b.offsetLeft; (b = b.parentNode) && b !== o && b !== i; ) {
        if (c.offset.supportsFixedPosition && f.position === "fixed") break; j = e ? e.getComputedStyle(b, null) : b.currentStyle;
        k -= b.scrollTop; n -= b.scrollLeft; if (b === d) { k += b.offsetTop; n += b.offsetLeft; if (c.offset.doesNotAddBorder && !(c.offset.doesAddBorderForTableAndCells && /^t(able|d|h)$/i.test(b.nodeName))) { k += parseFloat(j.borderTopWidth) || 0; n += parseFloat(j.borderLeftWidth) || 0 } f = d; d = b.offsetParent } if (c.offset.subtractsBorderForOverflowNotVisible && j.overflow !== "visible") { k += parseFloat(j.borderTopWidth) || 0; n += parseFloat(j.borderLeftWidth) || 0 } f = j
    } if (f.position === "relative" || f.position === "static") { k += o.offsetTop; n += o.offsetLeft } if (c.offset.supportsFixedPosition &&
f.position === "fixed") { k += Math.max(i.scrollTop, o.scrollTop); n += Math.max(i.scrollLeft, o.scrollLeft) } return { top: k, left: n}
}; c.offset = { initialize: function () {
    var a = s.body, b = s.createElement("div"), d, f, e, j = parseFloat(c.curCSS(a, "marginTop", true)) || 0; c.extend(b.style, { position: "absolute", top: 0, left: 0, margin: 0, border: 0, width: "1px", height: "1px", visibility: "hidden" }); b.innerHTML = "<div style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;'><div></div></div><table style='position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;' cellpadding='0' cellspacing='0'><tr><td></td></tr></table>";
    a.insertBefore(b, a.firstChild); d = b.firstChild; f = d.firstChild; e = d.nextSibling.firstChild.firstChild; this.doesNotAddBorder = f.offsetTop !== 5; this.doesAddBorderForTableAndCells = e.offsetTop === 5; f.style.position = "fixed"; f.style.top = "20px"; this.supportsFixedPosition = f.offsetTop === 20 || f.offsetTop === 15; f.style.position = f.style.top = ""; d.style.overflow = "hidden"; d.style.position = "relative"; this.subtractsBorderForOverflowNotVisible = f.offsetTop === -5; this.doesNotIncludeMarginInBodyOffset = a.offsetTop !== j; a.removeChild(b);
    c.offset.initialize = c.noop
}, bodyOffset: function (a) { var b = a.offsetTop, d = a.offsetLeft; c.offset.initialize(); if (c.offset.doesNotIncludeMarginInBodyOffset) { b += parseFloat(c.curCSS(a, "marginTop", true)) || 0; d += parseFloat(c.curCSS(a, "marginLeft", true)) || 0 } return { top: b, left: d} }, setOffset: function (a, b, d) {
    if (/static/.test(c.curCSS(a, "position"))) a.style.position = "relative"; var f = c(a), e = f.offset(), j = parseInt(c.curCSS(a, "top", true), 10) || 0, i = parseInt(c.curCSS(a, "left", true), 10) || 0; if (c.isFunction(b)) b = b.call(a,
d, e); d = { top: b.top - e.top + j, left: b.left - e.left + i }; "using" in b ? b.using.call(a, d) : f.css(d)
} 
}; c.fn.extend({ position: function () {
    if (!this[0]) return null; var a = this[0], b = this.offsetParent(), d = this.offset(), f = /^body|html$/i.test(b[0].nodeName) ? { top: 0, left: 0} : b.offset(); d.top -= parseFloat(c.curCSS(a, "marginTop", true)) || 0; d.left -= parseFloat(c.curCSS(a, "marginLeft", true)) || 0; f.top += parseFloat(c.curCSS(b[0], "borderTopWidth", true)) || 0; f.left += parseFloat(c.curCSS(b[0], "borderLeftWidth", true)) || 0; return { top: d.top -
f.top, left: d.left - f.left
    }
}, offsetParent: function () { return this.map(function () { for (var a = this.offsetParent || s.body; a && !/^body|html$/i.test(a.nodeName) && c.css(a, "position") === "static"; ) a = a.offsetParent; return a }) } 
}); c.each(["Left", "Top"], function (a, b) {
    var d = "scroll" + b; c.fn[d] = function (f) {
        var e = this[0], j; if (!e) return null; if (f !== w) return this.each(function () { if (j = wa(this)) j.scrollTo(!a ? f : c(j).scrollLeft(), a ? f : c(j).scrollTop()); else this[d] = f }); else return (j = wa(e)) ? "pageXOffset" in j ? j[a ? "pageYOffset" :
"pageXOffset"] : c.support.boxModel && j.document.documentElement[d] || j.document.body[d] : e[d]
    } 
}); c.each(["Height", "Width"], function (a, b) {
    var d = b.toLowerCase(); c.fn["inner" + b] = function () { return this[0] ? c.css(this[0], d, false, "padding") : null }; c.fn["outer" + b] = function (f) { return this[0] ? c.css(this[0], d, false, f ? "margin" : "border") : null }; c.fn[d] = function (f) {
        var e = this[0]; if (!e) return f == null ? null : this; if (c.isFunction(f)) return this.each(function (j) { var i = c(this); i[d](f.call(this, j, i[d]())) }); return "scrollTo" in
e && e.document ? e.document.compatMode === "CSS1Compat" && e.document.documentElement["client" + b] || e.document.body["client" + b] : e.nodeType === 9 ? Math.max(e.documentElement["client" + b], e.body["scroll" + b], e.documentElement["scroll" + b], e.body["offset" + b], e.documentElement["offset" + b]) : f === w ? c.css(e, d) : this.css(d, typeof f === "string" ? f : f + "px")
    } 
}); A.jQuery = A.$ = c
})(window);














"use strict";
/*
* $Id: rawdeflate.js,v 0.3 2009/03/01 19:05:05 dankogai Exp dankogai $
*
* Original:
*   http://www.onicos.com/staff/iz/amuse/javascript/expert/deflate.txt
*/

// Zlib lib by djazz

var Zlib = (function Zlib /* Name for debugging */() {

    var Deflate = (function () {

        /* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
        * Version: 1.0.1
        * LastModified: Dec 25 1999
        */

        /* constant parameters */
        var zip_WSIZE = 32768; 	// Sliding Window size
        var zip_STORED_BLOCK = 0;
        var zip_STATIC_TREES = 1;
        var zip_DYN_TREES = 2;

        /* for deflate */
        var zip_DEFAULT_LEVEL = 6;
        var zip_FULL_SEARCH = true;
        var zip_INBUFSIZ = 32768; // Input buffer size
        var zip_INBUF_EXTRA = 64; // Extra buffer
        var zip_OUTBUFSIZ = 1024 * 8;
        var zip_window_size = 2 * zip_WSIZE;
        var zip_MIN_MATCH = 3;
        var zip_MAX_MATCH = 258;
        var zip_BITS = 16;
        // for SMALL_MEM
        var zip_LIT_BUFSIZE = 0x2000;
        var zip_HASH_BITS = 13;
        // for MEDIUM_MEM
        // var zip_LIT_BUFSIZE = 0x4000;
        // var zip_HASH_BITS = 14;
        // for BIG_MEM
        // var zip_LIT_BUFSIZE = 0x8000;
        // var zip_HASH_BITS = 15;
        if (zip_LIT_BUFSIZE > zip_INBUFSIZ)
            alert("error: zip_INBUFSIZ is too small");
        if ((zip_WSIZE << 1) > (1 << zip_BITS))
            alert("error: zip_WSIZE is too large");
        if (zip_HASH_BITS > zip_BITS - 1)
            alert("error: zip_HASH_BITS is too large");
        if (zip_HASH_BITS < 8 || zip_MAX_MATCH != 258)
            alert("error: Code too clever");
        var zip_DIST_BUFSIZE = zip_LIT_BUFSIZE;
        var zip_HASH_SIZE = 1 << zip_HASH_BITS;
        var zip_HASH_MASK = zip_HASH_SIZE - 1;
        var zip_WMASK = zip_WSIZE - 1;
        var zip_NIL = 0; // Tail of hash chains
        var zip_TOO_FAR = 4096;
        var zip_MIN_LOOKAHEAD = zip_MAX_MATCH + zip_MIN_MATCH + 1;
        var zip_MAX_DIST = zip_WSIZE - zip_MIN_LOOKAHEAD;
        var zip_SMALLEST = 1;
        var zip_MAX_BITS = 15;
        var zip_MAX_BL_BITS = 7;
        var zip_LENGTH_CODES = 29;
        var zip_LITERALS = 256;
        var zip_END_BLOCK = 256;
        var zip_L_CODES = zip_LITERALS + 1 + zip_LENGTH_CODES;
        var zip_D_CODES = 30;
        var zip_BL_CODES = 19;
        var zip_REP_3_6 = 16;
        var zip_REPZ_3_10 = 17;
        var zip_REPZ_11_138 = 18;
        var zip_HEAP_SIZE = 2 * zip_L_CODES + 1;
        var zip_H_SHIFT = parseInt((zip_HASH_BITS + zip_MIN_MATCH - 1) /
			   zip_MIN_MATCH, 10);

        /* variables */
        var zip_free_queue;
        var zip_qhead, zip_qtail;
        var zip_initflag;
        var zip_outbuf = null;
        var zip_outcnt, zip_outoff;
        var zip_complete;
        var zip_window;
        var zip_d_buf;
        var zip_l_buf;
        var zip_prev;
        var zip_bi_buf;
        var zip_bi_valid;
        var zip_block_start;
        var zip_ins_h;
        var zip_hash_head;
        var zip_prev_match;
        var zip_match_available;
        var zip_match_length;
        var zip_prev_length;
        var zip_strstart;
        var zip_match_start;
        var zip_eofile;
        var zip_lookahead;
        var zip_max_chain_length;
        var zip_max_lazy_match;
        var zip_compr_level;
        var zip_good_match;
        var zip_nice_match;
        var zip_dyn_ltree;
        var zip_dyn_dtree;
        var zip_static_ltree;
        var zip_static_dtree;
        var zip_bl_tree;
        var zip_l_desc;
        var zip_d_desc;
        var zip_bl_desc;
        var zip_bl_count;
        var zip_heap;
        var zip_heap_len;
        var zip_heap_max;
        var zip_depth;
        var zip_length_code;
        var zip_dist_code;
        var zip_base_length;
        var zip_base_dist;
        var zip_flag_buf;
        var zip_last_lit;
        var zip_last_dist;
        var zip_last_flags;
        var zip_flags;
        var zip_flag_bit;
        var zip_opt_len;
        var zip_static_len;
        var zip_deflate_data;
        var zip_deflate_pos;

        /* objects (deflate) */

        var zip_DeflateCT = function () {
            this.fc = 0; // frequency count or bit string
            this.dl = 0; // father node in Huffman tree or length of bit string
        }

        var zip_DeflateTreeDesc = function () {
            this.dyn_tree = null; // the dynamic tree
            this.static_tree = null; // corresponding static tree or NULL
            this.extra_bits = null; // extra bits for each code or NULL
            this.extra_base = 0; // base index for extra_bits
            this.elems = 0; 	// max number of elements in the tree
            this.max_length = 0; // max bit length for the codes
            this.max_code = 0; 	// largest code with non zero frequency
        }

        /* Values for max_lazy_match, good_match and max_chain_length, depending on
        * the desired pack level (0..9). The values given below have been tuned to
        * exclude worst case performance for pathological files. Better values may be
        * found for specific files.
        */
        var zip_DeflateConfiguration = function (a, b, c, d) {
            this.good_length = a; // reduce lazy search above this match length
            this.max_lazy = b;    // do not perform lazy search above this match length
            this.nice_length = c; // quit search above this match length
            this.max_chain = d;
        }

        var zip_DeflateBuffer = function () {
            this.next = null;
            this.len = 0;
            this.ptr = new Array(zip_OUTBUFSIZ);
            this.off = 0;
        }

        /* constant tables */
        var zip_extra_lbits = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];
        var zip_extra_dbits = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
        var zip_extra_blbits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];
        var zip_bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        var zip_configuration_table = [
	new zip_DeflateConfiguration(0, 0, 0, 0),
	new zip_DeflateConfiguration(4, 4, 8, 4),
	new zip_DeflateConfiguration(4, 5, 16, 8),
	new zip_DeflateConfiguration(4, 6, 32, 32),
	new zip_DeflateConfiguration(4, 4, 16, 16),
	new zip_DeflateConfiguration(8, 16, 32, 32),
	new zip_DeflateConfiguration(8, 16, 128, 128),
	new zip_DeflateConfiguration(8, 32, 128, 256),
	new zip_DeflateConfiguration(32, 128, 258, 1024),
	new zip_DeflateConfiguration(32, 258, 258, 4096)];


        /* routines (deflate) */

        var zip_deflate_start = function (level) {
            var i;

            if (!level)
                level = zip_DEFAULT_LEVEL;
            else if (level < 1)
                level = 1;
            else if (level > 9)
                level = 9;

            zip_compr_level = level;
            zip_initflag = false;
            zip_eofile = false;
            if (zip_outbuf != null)
                return;

            zip_free_queue = zip_qhead = zip_qtail = null;
            zip_outbuf = new Array(zip_OUTBUFSIZ);
            zip_window = new Array(zip_window_size);
            zip_d_buf = new Array(zip_DIST_BUFSIZE);
            zip_l_buf = new Array(zip_INBUFSIZ + zip_INBUF_EXTRA);
            zip_prev = new Array(1 << zip_BITS);
            zip_dyn_ltree = new Array(zip_HEAP_SIZE);
            for (i = 0; i < zip_HEAP_SIZE; i++)
                zip_dyn_ltree[i] = new zip_DeflateCT();
            zip_dyn_dtree = new Array(2 * zip_D_CODES + 1);
            for (i = 0; i < 2 * zip_D_CODES + 1; i++)
                zip_dyn_dtree[i] = new zip_DeflateCT();
            zip_static_ltree = new Array(zip_L_CODES + 2);
            for (i = 0; i < zip_L_CODES + 2; i++)
                zip_static_ltree[i] = new zip_DeflateCT();
            zip_static_dtree = new Array(zip_D_CODES);
            for (i = 0; i < zip_D_CODES; i++)
                zip_static_dtree[i] = new zip_DeflateCT();
            zip_bl_tree = new Array(2 * zip_BL_CODES + 1);
            for (i = 0; i < 2 * zip_BL_CODES + 1; i++)
                zip_bl_tree[i] = new zip_DeflateCT();
            zip_l_desc = new zip_DeflateTreeDesc();
            zip_d_desc = new zip_DeflateTreeDesc();
            zip_bl_desc = new zip_DeflateTreeDesc();
            zip_bl_count = new Array(zip_MAX_BITS + 1);
            zip_heap = new Array(2 * zip_L_CODES + 1);
            zip_depth = new Array(2 * zip_L_CODES + 1);
            zip_length_code = new Array(zip_MAX_MATCH - zip_MIN_MATCH + 1);
            zip_dist_code = new Array(512);
            zip_base_length = new Array(zip_LENGTH_CODES);
            zip_base_dist = new Array(zip_D_CODES);
            zip_flag_buf = new Array(parseInt(zip_LIT_BUFSIZE / 8, 10));
        }

        var zip_deflate_end = function () {
            zip_free_queue = zip_qhead = zip_qtail = null;
            zip_outbuf = null;
            zip_window = null;
            zip_d_buf = null;
            zip_l_buf = null;
            zip_prev = null;
            zip_dyn_ltree = null;
            zip_dyn_dtree = null;
            zip_static_ltree = null;
            zip_static_dtree = null;
            zip_bl_tree = null;
            zip_l_desc = null;
            zip_d_desc = null;
            zip_bl_desc = null;
            zip_bl_count = null;
            zip_heap = null;
            zip_depth = null;
            zip_length_code = null;
            zip_dist_code = null;
            zip_base_length = null;
            zip_base_dist = null;
            zip_flag_buf = null;
        }

        var zip_reuse_queue = function (p) {
            p.next = zip_free_queue;
            zip_free_queue = p;
        }

        var zip_new_queue = function () {
            var p;

            if (zip_free_queue != null) {
                p = zip_free_queue;
                zip_free_queue = zip_free_queue.next;
            }
            else
                p = new zip_DeflateBuffer();
            p.next = null;
            p.len = p.off = 0;

            return p;
        }

        var zip_head1 = function (i) {
            return zip_prev[zip_WSIZE + i];
        }

        var zip_head2 = function (i, val) {
            return zip_prev[zip_WSIZE + i] = val;
        }

        /* put_byte is used for the compressed output, put_ubyte for the
        * uncompressed output. However unlzw() uses window for its
        * suffix table instead of its output buffer, so it does not use put_ubyte
        * (to be cleaned up).
        */
        var zip_put_byte = function (c) {
            zip_outbuf[zip_outoff + zip_outcnt++] = c;
            if (zip_outoff + zip_outcnt == zip_OUTBUFSIZ)
                zip_qoutbuf();
        }

        /* Output a 16 bit value, lsb first */
        var zip_put_short = function (w) {
            w &= 0xffff;
            if (zip_outoff + zip_outcnt < zip_OUTBUFSIZ - 2) {
                zip_outbuf[zip_outoff + zip_outcnt++] = (w & 0xff);
                zip_outbuf[zip_outoff + zip_outcnt++] = (w >>> 8);
            } else {
                zip_put_byte(w & 0xff);
                zip_put_byte(w >>> 8);
            }
        }

        /* ==========================================================================
        * Insert string s in the dictionary and set match_head to the previous head
        * of the hash chain (the most recent string with same hash key). Return
        * the previous length of the hash chain.
        * IN  assertion: all calls to to INSERT_STRING are made with consecutive
        *    input characters and the first MIN_MATCH bytes of s are valid
        *    (except for the last MIN_MATCH-1 bytes of the input file).
        */
        var zip_INSERT_STRING = function () {
            zip_ins_h = ((zip_ins_h << zip_H_SHIFT)
		 ^ (zip_window[zip_strstart + zip_MIN_MATCH - 1] & 0xff))
	& zip_HASH_MASK;
            zip_hash_head = zip_head1(zip_ins_h);
            zip_prev[zip_strstart & zip_WMASK] = zip_hash_head;
            zip_head2(zip_ins_h, zip_strstart);
        }

        /* Send a code of the given tree. c and tree must not have side effects */
        var zip_SEND_CODE = function (c, tree) {
            zip_send_bits(tree[c].fc, tree[c].dl);
        }

        /* Mapping from a distance to a distance code. dist is the distance - 1 and
        * must not have side effects. dist_code[256] and dist_code[257] are never
        * used.
        */
        var zip_D_CODE = function (dist) {
            return (dist < 256 ? zip_dist_code[dist]
	    : zip_dist_code[256 + (dist >> 7)]) & 0xff;
        }

        /* ==========================================================================
        * Compares to subtrees, using the tree depth as tie breaker when
        * the subtrees have equal frequency. This minimizes the worst case length.
        */
        var zip_SMALLER = function (tree, n, m) {
            return tree[n].fc < tree[m].fc ||
      (tree[n].fc == tree[m].fc && zip_depth[n] <= zip_depth[m]);
        }

        /* ==========================================================================
        * <STRIKE>read string data</STRIKE>
        * read arraybuffer data
        */
        var zip_read_buff = function (buff, offset, n) {
            var i;
            var l = zip_deflate_data.length;
            for (i = 0; i < n && zip_deflate_pos < l; i += 1) {
                buff[offset + i] = zip_deflate_data[zip_deflate_pos++];
            }
            return i;
        }

        /* ==========================================================================
        * Initialize the "longest match" routines for a new file
        */
        var zip_lm_init = function () {
            var j;

            /* Initialize the hash table. */
            for (j = 0; j < zip_HASH_SIZE; j++)
            //	zip_head2(j, zip_NIL);
                zip_prev[zip_WSIZE + j] = 0;
            /* prev will be initialized on the fly */

            /* Set the default configuration parameters:
            */
            zip_max_lazy_match = zip_configuration_table[zip_compr_level].max_lazy;
            zip_good_match = zip_configuration_table[zip_compr_level].good_length;
            if (!zip_FULL_SEARCH)
                zip_nice_match = zip_configuration_table[zip_compr_level].nice_length;
            zip_max_chain_length = zip_configuration_table[zip_compr_level].max_chain;

            zip_strstart = 0;
            zip_block_start = 0;

            zip_lookahead = zip_read_buff(zip_window, 0, 2 * zip_WSIZE);
            if (zip_lookahead <= 0) {
                zip_eofile = true;
                zip_lookahead = 0;
                return;
            }
            zip_eofile = false;
            /* Make sure that we always have enough lookahead. This is important
            * if input comes from a device such as a tty.
            */
            while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
                zip_fill_window();

            /* If lookahead < MIN_MATCH, ins_h is garbage, but this is
            * not important since only literal bytes will be emitted.
            */
            zip_ins_h = 0;
            for (j = 0; j < zip_MIN_MATCH - 1; j++) {
                //      UPDATE_HASH(ins_h, window[j]);
                zip_ins_h = ((zip_ins_h << zip_H_SHIFT) ^ (zip_window[j] & 0xff)) & zip_HASH_MASK;
            }
        }

        /* ==========================================================================
        * Set match_start to the longest match starting at the given string and
        * return its length. Matches shorter or equal to prev_length are discarded,
        * in which case the result is equal to prev_length and match_start is
        * garbage.
        * IN assertions: cur_match is the head of the hash chain for the current
        *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
        */
        var zip_longest_match = function (cur_match) {
            var chain_length = zip_max_chain_length; // max hash chain length
            var scanp = zip_strstart; // current string
            var matchp; 	// matched string
            var len; 	// length of current match
            var best_len = zip_prev_length; // best match length so far

            /* Stop when cur_match becomes <= limit. To simplify the code,
            * we prevent matches with the string of window index 0.
            */
            var limit = (zip_strstart > zip_MAX_DIST ? zip_strstart - zip_MAX_DIST : zip_NIL);

            var strendp = zip_strstart + zip_MAX_MATCH;
            var scan_end1 = zip_window[scanp + best_len - 1];
            var scan_end = zip_window[scanp + best_len];

            /* Do not waste too much time if we already have a good match: */
            if (zip_prev_length >= zip_good_match)
                chain_length >>= 2;

            //  Assert(encoder->strstart <= window_size-MIN_LOOKAHEAD, "insufficient lookahead");

            do {
                //    Assert(cur_match < encoder->strstart, "no future");
                matchp = cur_match;

                /* Skip to next match if the match length cannot increase
                * or if the match length is less than 2:
                */
                if (zip_window[matchp + best_len] != scan_end ||
	   zip_window[matchp + best_len - 1] != scan_end1 ||
	   zip_window[matchp] != zip_window[scanp] ||
	   zip_window[++matchp] != zip_window[scanp + 1]) {
                    continue;
                }

                /* The check at best_len-1 can be removed because it will be made
                * again later. (This heuristic is not always a win.)
                * It is not necessary to compare scan[2] and match[2] since they
                * are always equal when the other bytes match, given that
                * the hash keys are equal and that HASH_BITS >= 8.
                */
                scanp += 2;
                matchp++;

                /* We check for insufficient lookahead only every 8th comparison;
                * the 256th check will be made at strstart+258.
                */
                do {
                } while (zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		zip_window[++scanp] == zip_window[++matchp] &&
		scanp < strendp);

                len = zip_MAX_MATCH - (strendp - scanp);
                scanp = strendp - zip_MAX_MATCH;

                if (len > best_len) {
                    zip_match_start = cur_match;
                    best_len = len;
                    if (zip_FULL_SEARCH) {
                        if (len >= zip_MAX_MATCH) break;
                    } else {
                        if (len >= zip_nice_match) break;
                    }

                    scan_end1 = zip_window[scanp + best_len - 1];
                    scan_end = zip_window[scanp + best_len];
                }
            } while ((cur_match = zip_prev[cur_match & zip_WMASK]) > limit
	    && --chain_length != 0);

            return best_len;
        }

        /* ==========================================================================
        * Fill the window when the lookahead becomes insufficient.
        * Updates strstart and lookahead, and sets eofile if end of input file.
        * IN assertion: lookahead < MIN_LOOKAHEAD && strstart + lookahead > 0
        * OUT assertions: at least one byte has been read, or eofile is set;
        *    file reads are performed for at least two bytes (required for the
        *    translate_eol option).
        */
        var zip_fill_window = function () {
            var n, m;

            // Amount of free space at the end of the window.
            var more = zip_window_size - zip_lookahead - zip_strstart;

            /* If the window is almost full and there is insufficient lookahead,
            * move the upper half to the lower one to make room in the upper half.
            */
            if (more == -1) {
                /* Very unlikely, but possible on 16 bit machine if strstart == 0
                * and lookahead == 1 (input done one byte at time)
                */
                more--;
            } else if (zip_strstart >= zip_WSIZE + zip_MAX_DIST) {
                /* By the IN assertion, the window is not empty so we can't confuse
                * more == 0 with more == 64K on a 16 bit machine.
                */
                //	Assert(window_size == (ulg)2*WSIZE, "no sliding with BIG_MEM");

                //	System.arraycopy(window, WSIZE, window, 0, WSIZE);
                for (n = 0; n < zip_WSIZE; n++)
                    zip_window[n] = zip_window[n + zip_WSIZE];

                zip_match_start -= zip_WSIZE;
                zip_strstart -= zip_WSIZE; /* we now have strstart >= MAX_DIST: */
                zip_block_start -= zip_WSIZE;

                for (n = 0; n < zip_HASH_SIZE; n++) {
                    m = zip_head1(n);
                    zip_head2(n, m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL);
                }
                for (n = 0; n < zip_WSIZE; n++) {
                    /* If n is not on any hash chain, prev[n] is garbage but
                    * its value will never be used.
                    */
                    m = zip_prev[n];
                    zip_prev[n] = (m >= zip_WSIZE ? m - zip_WSIZE : zip_NIL);
                }
                more += zip_WSIZE;
            }
            // At this point, more >= 2
            if (!zip_eofile) {
                n = zip_read_buff(zip_window, zip_strstart + zip_lookahead, more);
                if (n <= 0)
                    zip_eofile = true;
                else
                    zip_lookahead += n;
            }
        }

        /* ==========================================================================
        * Processes a new input file and return its compressed length. This
        * function does not perform lazy evaluationof matches and inserts
        * new strings in the dictionary only for unmatched strings or for short
        * matches. It is used only for the fast compression options.
        */
        var zip_deflate_fast = function () {
            while (zip_lookahead != 0 && zip_qhead == null) {
                var flush; // set if current block must be flushed

                /* Insert the string window[strstart .. strstart+2] in the
                * dictionary, and set hash_head to the head of the hash chain:
                */
                zip_INSERT_STRING();

                /* Find the longest match, discarding those <= prev_length.
                * At this point we have always match_length < MIN_MATCH
                */
                if (zip_hash_head != zip_NIL &&
	   zip_strstart - zip_hash_head <= zip_MAX_DIST) {
                    /* To simplify the code, we prevent matches with the string
                    * of window index 0 (in particular we have to avoid a match
                    * of the string with itself at the start of the input file).
                    */
                    zip_match_length = zip_longest_match(zip_hash_head);
                    /* longest_match() sets match_start */
                    if (zip_match_length > zip_lookahead)
                        zip_match_length = zip_lookahead;
                }
                if (zip_match_length >= zip_MIN_MATCH) {
                    //	    check_match(strstart, match_start, match_length);

                    flush = zip_ct_tally(zip_strstart - zip_match_start,
				 zip_match_length - zip_MIN_MATCH);
                    zip_lookahead -= zip_match_length;

                    /* Insert new strings in the hash table only if the match length
                    * is not too large. This saves time but degrades compression.
                    */
                    if (zip_match_length <= zip_max_lazy_match) {
                        zip_match_length--; // string at strstart already in hash table
                        do {
                            zip_strstart++;
                            zip_INSERT_STRING();
                            /* strstart never exceeds WSIZE-MAX_MATCH, so there are
                            * always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
                            * these bytes are garbage, but it does not matter since
                            * the next lookahead bytes will be emitted as literals.
                            */
                        } while (--zip_match_length != 0);
                        zip_strstart++;
                    } else {
                        zip_strstart += zip_match_length;
                        zip_match_length = 0;
                        zip_ins_h = zip_window[zip_strstart] & 0xff;
                        //		UPDATE_HASH(ins_h, window[strstart + 1]);
                        zip_ins_h = ((zip_ins_h << zip_H_SHIFT) ^ (zip_window[zip_strstart + 1] & 0xff)) & zip_HASH_MASK;

                        //#if MIN_MATCH != 3
                        //		Call UPDATE_HASH() MIN_MATCH-3 more times
                        //#endif

                    }
                } else {
                    /* No match, output a literal byte */
                    flush = zip_ct_tally(0, zip_window[zip_strstart] & 0xff);
                    zip_lookahead--;
                    zip_strstart++;
                }
                if (flush) {
                    zip_flush_block(0);
                    zip_block_start = zip_strstart;
                }

                /* Make sure that we always have enough lookahead, except
                * at the end of the input file. We need MAX_MATCH bytes
                * for the next match, plus MIN_MATCH bytes to insert the
                * string following the next match.
                */
                while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
                    zip_fill_window();
            }
        }

        var zip_deflate_better = function () {
            /* Process the input block. */
            while (zip_lookahead != 0 && zip_qhead == null) {
                /* Insert the string window[strstart .. strstart+2] in the
                * dictionary, and set hash_head to the head of the hash chain:
                */
                zip_INSERT_STRING();

                /* Find the longest match, discarding those <= prev_length.
                */
                zip_prev_length = zip_match_length;
                zip_prev_match = zip_match_start;
                zip_match_length = zip_MIN_MATCH - 1;

                if (zip_hash_head != zip_NIL &&
	   zip_prev_length < zip_max_lazy_match &&
	   zip_strstart - zip_hash_head <= zip_MAX_DIST) {
                    /* To simplify the code, we prevent matches with the string
                    * of window index 0 (in particular we have to avoid a match
                    * of the string with itself at the start of the input file).
                    */
                    zip_match_length = zip_longest_match(zip_hash_head);
                    /* longest_match() sets match_start */
                    if (zip_match_length > zip_lookahead)
                        zip_match_length = zip_lookahead;

                    /* Ignore a length 3 match if it is too distant: */
                    if (zip_match_length == zip_MIN_MATCH &&
	       zip_strstart - zip_match_start > zip_TOO_FAR) {
                        /* If prev_match is also MIN_MATCH, match_start is garbage
                        * but we will ignore the current match anyway.
                        */
                        zip_match_length--;
                    }
                }
                /* If there was a match at the previous step and the current
                * match is not better, output the previous match:
                */
                if (zip_prev_length >= zip_MIN_MATCH &&
	   zip_match_length <= zip_prev_length) {
                    var flush; // set if current block must be flushed

                    //	    check_match(strstart - 1, prev_match, prev_length);
                    flush = zip_ct_tally(zip_strstart - 1 - zip_prev_match,
				 zip_prev_length - zip_MIN_MATCH);

                    /* Insert in hash table all strings up to the end of the match.
                    * strstart-1 and strstart are already inserted.
                    */
                    zip_lookahead -= zip_prev_length - 1;
                    zip_prev_length -= 2;
                    do {
                        zip_strstart++;
                        zip_INSERT_STRING();
                        /* strstart never exceeds WSIZE-MAX_MATCH, so there are
                        * always MIN_MATCH bytes ahead. If lookahead < MIN_MATCH
                        * these bytes are garbage, but it does not matter since the
                        * next lookahead bytes will always be emitted as literals.
                        */
                    } while (--zip_prev_length != 0);
                    zip_match_available = 0;
                    zip_match_length = zip_MIN_MATCH - 1;
                    zip_strstart++;
                    if (flush) {
                        zip_flush_block(0);
                        zip_block_start = zip_strstart;
                    }
                } else if (zip_match_available != 0) {
                    /* If there was no match at the previous position, output a
                    * single literal. If there was a match but the current match
                    * is longer, truncate the previous match to a single literal.
                    */
                    if (zip_ct_tally(0, zip_window[zip_strstart - 1] & 0xff)) {
                        zip_flush_block(0);
                        zip_block_start = zip_strstart;
                    }
                    zip_strstart++;
                    zip_lookahead--;
                } else {
                    /* There is no previous match to compare with, wait for
                    * the next step to decide.
                    */
                    zip_match_available = 1;
                    zip_strstart++;
                    zip_lookahead--;
                }

                /* Make sure that we always have enough lookahead, except
                * at the end of the input file. We need MAX_MATCH bytes
                * for the next match, plus MIN_MATCH bytes to insert the
                * string following the next match.
                */
                while (zip_lookahead < zip_MIN_LOOKAHEAD && !zip_eofile)
                    zip_fill_window();
            }
        }

        var zip_init_deflate = function () {
            if (zip_eofile)
                return;
            zip_bi_buf = 0;
            zip_bi_valid = 0;
            zip_ct_init();
            zip_lm_init();

            zip_qhead = null;
            zip_outcnt = 0;
            zip_outoff = 0;

            if (zip_compr_level <= 3) {
                zip_prev_length = zip_MIN_MATCH - 1;
                zip_match_length = 0;
            }
            else {
                zip_match_length = zip_MIN_MATCH - 1;
                zip_match_available = 0;
            }

            zip_complete = false;
        }

        /* ==========================================================================
        * Same as above, but achieves better compression. We use a lazy
        * evaluation for matches: a match is finally adopted only if there is
        * no better match at the next window position.
        */
        var zip_deflate_internal = function (buff, off, buff_size) {
            var n;

            if (!zip_initflag) {
                zip_init_deflate();
                zip_initflag = true;
                if (zip_lookahead == 0) { // empty
                    zip_complete = true;
                    return 0;
                }
            }

            if ((n = zip_qcopy(buff, off, buff_size)) == buff_size)
                return buff_size;
            if (zip_complete)
                return n;

            if (zip_compr_level <= 3) // optimized for speed
                zip_deflate_fast();
            else
                zip_deflate_better();
            if (zip_lookahead == 0) {
                if (zip_match_available != 0) {
                    zip_ct_tally(0, zip_window[zip_strstart - 1] & 0xff);
                }
                zip_flush_block(1);
                zip_complete = true;
            }
            return n + zip_qcopy(buff, n + off, buff_size - n);
        }

        var zip_qcopy = function (buff, off, buff_size) {
            var n, i, j;

            n = 0;
            while (zip_qhead != null && n < buff_size) {
                i = buff_size - n;
                if (i > zip_qhead.len)
                    i = zip_qhead.len;
                //      System.arraycopy(qhead.ptr, qhead.off, buff, off + n, i);
                for (j = 0; j < i; j++) {
                    buff[off + n + j] = zip_qhead.ptr[zip_qhead.off + j];
                }

                zip_qhead.off += i;
                zip_qhead.len -= i;
                n += i;
                if (zip_qhead.len == 0) {
                    var p;
                    p = zip_qhead;
                    zip_qhead = zip_qhead.next;
                    zip_reuse_queue(p);
                }
            }
            if (n == buff_size) {
                return n;
            }

            if (zip_outoff < zip_outcnt) {
                i = buff_size - n;
                if (i > zip_outcnt - zip_outoff) {
                    i = zip_outcnt - zip_outoff;
                }
                //      System.arraycopy(outbuf, outoff, buff, off + n, i);
                for (j = 0; j < i; j++) {
                    buff[off + n + j] = zip_outbuf[zip_outoff + j];
                }
                zip_outoff += i;
                n += i;
                if (zip_outcnt == zip_outoff) {
                    zip_outcnt = zip_outoff = 0;
                }
            }
            return n;
        }

        /* ==========================================================================
        * Allocate the match buffer, initialize the various tables and save the
        * location of the internal file attribute (ascii/binary) and method
        * (DEFLATE/STORE).
        */
        var zip_ct_init = function () {
            var n; // iterates over tree elements
            var bits; // bit counter
            var length; // length value
            var code; // code value
            var dist; // distance index

            if (zip_static_dtree[0].dl != 0) return; // ct_init already called

            zip_l_desc.dyn_tree = zip_dyn_ltree;
            zip_l_desc.static_tree = zip_static_ltree;
            zip_l_desc.extra_bits = zip_extra_lbits;
            zip_l_desc.extra_base = zip_LITERALS + 1;
            zip_l_desc.elems = zip_L_CODES;
            zip_l_desc.max_length = zip_MAX_BITS;
            zip_l_desc.max_code = 0;

            zip_d_desc.dyn_tree = zip_dyn_dtree;
            zip_d_desc.static_tree = zip_static_dtree;
            zip_d_desc.extra_bits = zip_extra_dbits;
            zip_d_desc.extra_base = 0;
            zip_d_desc.elems = zip_D_CODES;
            zip_d_desc.max_length = zip_MAX_BITS;
            zip_d_desc.max_code = 0;

            zip_bl_desc.dyn_tree = zip_bl_tree;
            zip_bl_desc.static_tree = null;
            zip_bl_desc.extra_bits = zip_extra_blbits;
            zip_bl_desc.extra_base = 0;
            zip_bl_desc.elems = zip_BL_CODES;
            zip_bl_desc.max_length = zip_MAX_BL_BITS;
            zip_bl_desc.max_code = 0;

            // Initialize the mapping length (0..255) -> length code (0..28)
            length = 0;
            for (code = 0; code < zip_LENGTH_CODES - 1; code++) {
                zip_base_length[code] = length;
                for (n = 0; n < (1 << zip_extra_lbits[code]); n++)
                    zip_length_code[length++] = code;
            }
            // Assert (length == 256, "ct_init: length != 256");

            /* Note that the length 255 (match length 258) can be represented
            * in two different ways: code 284 + 5 bits or code 285, so we
            * overwrite length_code[255] to use the best encoding:
            */
            zip_length_code[length - 1] = code;

            /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
            dist = 0;
            for (code = 0; code < 16; code++) {
                zip_base_dist[code] = dist;
                for (n = 0; n < (1 << zip_extra_dbits[code]); n++) {
                    zip_dist_code[dist++] = code;
                }
            }
            // Assert (dist == 256, "ct_init: dist != 256");
            dist >>= 7; // from now on, all distances are divided by 128
            for (; code < zip_D_CODES; code++) {
                zip_base_dist[code] = dist << 7;
                for (n = 0; n < (1 << (zip_extra_dbits[code] - 7)); n++)
                    zip_dist_code[256 + dist++] = code;
            }
            // Assert (dist == 256, "ct_init: 256+dist != 512");

            // Construct the codes of the static literal tree
            for (bits = 0; bits <= zip_MAX_BITS; bits++)
                zip_bl_count[bits] = 0;
            n = 0;
            while (n <= 143) { zip_static_ltree[n++].dl = 8; zip_bl_count[8]++; }
            while (n <= 255) { zip_static_ltree[n++].dl = 9; zip_bl_count[9]++; }
            while (n <= 279) { zip_static_ltree[n++].dl = 7; zip_bl_count[7]++; }
            while (n <= 287) { zip_static_ltree[n++].dl = 8; zip_bl_count[8]++; }
            /* Codes 286 and 287 do not exist, but we must include them in the
            * tree construction to get a canonical Huffman tree (longest code
            * all ones)
            */
            zip_gen_codes(zip_static_ltree, zip_L_CODES + 1);

            /* The static distance tree is trivial: */
            for (n = 0; n < zip_D_CODES; n++) {
                zip_static_dtree[n].dl = 5;
                zip_static_dtree[n].fc = zip_bi_reverse(n, 5);
            }

            // Initialize the first block of the first file:
            zip_init_block();
        }

        /* ==========================================================================
        * Initialize a new block.
        */
        var zip_init_block = function () {
            var n; // iterates over tree elements

            // Initialize the trees.
            for (n = 0; n < zip_L_CODES; n++) zip_dyn_ltree[n].fc = 0;
            for (n = 0; n < zip_D_CODES; n++) zip_dyn_dtree[n].fc = 0;
            for (n = 0; n < zip_BL_CODES; n++) zip_bl_tree[n].fc = 0;

            zip_dyn_ltree[zip_END_BLOCK].fc = 1;
            zip_opt_len = zip_static_len = 0;
            zip_last_lit = zip_last_dist = zip_last_flags = 0;
            zip_flags = 0;
            zip_flag_bit = 1;
        }

        /* ==========================================================================
        * Restore the heap property by moving down the tree starting at node k,
        * exchanging a node with the smallest of its two sons if necessary, stopping
        * when the heap property is re-established (each father smaller than its
        * two sons).
        */
        var zip_pqdownheap = function (
    tree, // the tree to restore
    k) {	// node to move down
            var v = zip_heap[k];
            var j = k << 1; // left son of k

            while (j <= zip_heap_len) {
                // Set j to the smallest of the two sons:
                if (j < zip_heap_len &&
	   zip_SMALLER(tree, zip_heap[j + 1], zip_heap[j]))
                    j++;

                // Exit if v is smaller than both sons
                if (zip_SMALLER(tree, v, zip_heap[j]))
                    break;

                // Exchange v with the smallest son
                zip_heap[k] = zip_heap[j];
                k = j;

                // And continue down the tree, setting j to the left son of k
                j <<= 1;
            }
            zip_heap[k] = v;
        }

        /* ==========================================================================
        * Compute the optimal bit lengths for a tree and update the total bit length
        * for the current block.
        * IN assertion: the fields freq and dad are set, heap[heap_max] and
        *    above are the tree nodes sorted by increasing frequency.
        * OUT assertions: the field len is set to the optimal bit length, the
        *     array bl_count contains the frequencies for each bit length.
        *     The length opt_len is updated; static_len is also updated if stree is
        *     not null.
        */
        var zip_gen_bitlen = function (desc) { // the tree descriptor
            var tree = desc.dyn_tree;
            var extra = desc.extra_bits;
            var base = desc.extra_base;
            var max_code = desc.max_code;
            var max_length = desc.max_length;
            var stree = desc.static_tree;
            var h; 	// heap index
            var n, m; 	// iterate over the tree elements
            var bits; 	// bit length
            var xbits; 	// extra bits
            var f; 	// frequency
            var overflow = 0; // number of elements with bit length too large

            for (bits = 0; bits <= zip_MAX_BITS; bits++)
                zip_bl_count[bits] = 0;

            /* In a first pass, compute the optimal bit lengths (which may
            * overflow in the case of the bit length tree).
            */
            tree[zip_heap[zip_heap_max]].dl = 0; // root of the heap

            for (h = zip_heap_max + 1; h < zip_HEAP_SIZE; h++) {
                n = zip_heap[h];
                bits = tree[tree[n].dl].dl + 1;
                if (bits > max_length) {
                    bits = max_length;
                    overflow++;
                }
                tree[n].dl = bits;
                // We overwrite tree[n].dl which is no longer needed

                if (n > max_code)
                    continue; // not a leaf node

                zip_bl_count[bits]++;
                xbits = 0;
                if (n >= base)
                    xbits = extra[n - base];
                f = tree[n].fc;
                zip_opt_len += f * (bits + xbits);
                if (stree != null)
                    zip_static_len += f * (stree[n].dl + xbits);
            }
            if (overflow == 0)
                return;

            // This happens for example on obj2 and pic of the Calgary corpus

            // Find the first bit length which could increase:
            do {
                bits = max_length - 1;
                while (zip_bl_count[bits] == 0)
                    bits--;
                zip_bl_count[bits]--; 	// move one leaf down the tree
                zip_bl_count[bits + 1] += 2; // move one overflow item as its brother
                zip_bl_count[max_length]--;
                /* The brother of the overflow item also moves one step up,
                * but this does not affect bl_count[max_length]
                */
                overflow -= 2;
            } while (overflow > 0);

            /* Now recompute all bit lengths, scanning in increasing frequency.
            * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
            * lengths instead of fixing only the wrong ones. This idea is taken
            * from 'ar' written by Haruhiko Okumura.)
            */
            for (bits = max_length; bits != 0; bits--) {
                n = zip_bl_count[bits];
                while (n != 0) {
                    m = zip_heap[--h];
                    if (m > max_code)
                        continue;
                    if (tree[m].dl != bits) {
                        zip_opt_len += (bits - tree[m].dl) * tree[m].fc;
                        tree[m].fc = bits;
                    }
                    n--;
                }
            }
        }

        /* ==========================================================================
        * Generate the codes for a given tree and bit counts (which need not be
        * optimal).
        * IN assertion: the array bl_count contains the bit length statistics for
        * the given tree and the field len is set for all tree elements.
        * OUT assertion: the field code is set for all tree elements of non
        *     zero code length.
        */
        var zip_gen_codes = function (tree, // the tree to decorate
		   max_code) {	// largest code with non zero frequency
            var next_code = new Array(zip_MAX_BITS + 1); // next code value for each bit length
            var code = 0; 	// running code value
            var bits; 		// bit index
            var n; 		// code index

            /* The distribution counts are first used to generate the code values
            * without bit reversal.
            */
            for (bits = 1; bits <= zip_MAX_BITS; bits++) {
                code = ((code + zip_bl_count[bits - 1]) << 1);
                next_code[bits] = code;
            }

            /* Check that the bit counts in bl_count are consistent. The last code
            * must be all ones.
            */
            //    Assert (code + encoder->bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
            //	    "inconsistent bit counts");
            //    Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

            for (n = 0; n <= max_code; n++) {
                var len = tree[n].dl;
                if (len == 0)
                    continue;
                // Now reverse the bits
                tree[n].fc = zip_bi_reverse(next_code[len]++, len);

                //      Tracec(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
                //	  n, (isgraph(n) ? n : ' '), len, tree[n].fc, next_code[len]-1));
            }
        }

        /* ==========================================================================
        * Construct one Huffman tree and assigns the code bit strings and lengths.
        * Update the total bit length for the current block.
        * IN assertion: the field freq is set for all tree elements.
        * OUT assertions: the fields len and code are set to the optimal bit length
        *     and corresponding code. The length opt_len is updated; static_len is
        *     also updated if stree is not null. The field max_code is set.
        */
        var zip_build_tree = function (desc) { // the tree descriptor
            var tree = desc.dyn_tree;
            var stree = desc.static_tree;
            var elems = desc.elems;
            var n, m; 	// iterate over heap elements
            var max_code = -1; // largest code with non zero frequency
            var node = elems; // next internal node of the tree

            /* Construct the initial heap, with least frequent element in
            * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
            * heap[0] is not used.
            */
            zip_heap_len = 0;
            zip_heap_max = zip_HEAP_SIZE;

            for (n = 0; n < elems; n++) {
                if (tree[n].fc != 0) {
                    zip_heap[++zip_heap_len] = max_code = n;
                    zip_depth[n] = 0;
                } else
                    tree[n].dl = 0;
            }

            /* The pkzip format requires that at least one distance code exists,
            * and that at least one bit should be sent even if there is only one
            * possible code. So to avoid special checks later on we force at least
            * two codes of non zero frequency.
            */
            while (zip_heap_len < 2) {
                var xnew = zip_heap[++zip_heap_len] = (max_code < 2 ? ++max_code : 0);
                tree[xnew].fc = 1;
                zip_depth[xnew] = 0;
                zip_opt_len--;
                if (stree != null)
                    zip_static_len -= stree[xnew].dl;
                // new is 0 or 1 so it does not have extra bits
            }
            desc.max_code = max_code;

            /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
            * establish sub-heaps of increasing lengths:
            */
            for (n = zip_heap_len >> 1; n >= 1; n--)
                zip_pqdownheap(tree, n);

            /* Construct the Huffman tree by repeatedly combining the least two
            * frequent nodes.
            */
            do {
                n = zip_heap[zip_SMALLEST];
                zip_heap[zip_SMALLEST] = zip_heap[zip_heap_len--];
                zip_pqdownheap(tree, zip_SMALLEST);

                m = zip_heap[zip_SMALLEST];  // m = node of next least frequency

                // keep the nodes sorted by frequency
                zip_heap[--zip_heap_max] = n;
                zip_heap[--zip_heap_max] = m;

                // Create a new node father of n and m
                tree[node].fc = tree[n].fc + tree[m].fc;
                //	depth[node] = (char)(MAX(depth[n], depth[m]) + 1);
                if (zip_depth[n] > zip_depth[m] + 1)
                    zip_depth[node] = zip_depth[n];
                else
                    zip_depth[node] = zip_depth[m] + 1;
                tree[n].dl = tree[m].dl = node;

                // and insert the new node in the heap
                zip_heap[zip_SMALLEST] = node++;
                zip_pqdownheap(tree, zip_SMALLEST);

            } while (zip_heap_len >= 2);

            zip_heap[--zip_heap_max] = zip_heap[zip_SMALLEST];

            /* At this point, the fields freq and dad are set. We can now
            * generate the bit lengths.
            */
            zip_gen_bitlen(desc);

            // The field len is now set, we can generate the bit codes
            zip_gen_codes(tree, max_code);
        }

        /* ==========================================================================
        * Scan a literal or distance tree to determine the frequencies of the codes
        * in the bit length tree. Updates opt_len to take into account the repeat
        * counts. (The contribution of the bit length codes will be added later
        * during the construction of bl_tree.)
        */
        var zip_scan_tree = function (tree, // the tree to be scanned
		       max_code) {  // and its largest code of non zero frequency
            var n; 		// iterates over all tree elements
            var prevlen = -1; 	// last emitted length
            var curlen; 		// length of current code
            var nextlen = tree[0].dl; // length of next code
            var count = 0; 	// repeat count of the current code
            var max_count = 7; 	// max repeat count
            var min_count = 4; 	// min repeat count

            if (nextlen == 0) {
                max_count = 138;
                min_count = 3;
            }
            tree[max_code + 1].dl = 0xffff; // guard

            for (n = 0; n <= max_code; n++) {
                curlen = nextlen;
                nextlen = tree[n + 1].dl;
                if (++count < max_count && curlen == nextlen)
                    continue;
                else if (count < min_count)
                    zip_bl_tree[curlen].fc += count;
                else if (curlen != 0) {
                    if (curlen != prevlen)
                        zip_bl_tree[curlen].fc++;
                    zip_bl_tree[zip_REP_3_6].fc++;
                } else if (count <= 10)
                    zip_bl_tree[zip_REPZ_3_10].fc++;
                else
                    zip_bl_tree[zip_REPZ_11_138].fc++;
                count = 0; prevlen = curlen;
                if (nextlen == 0) {
                    max_count = 138;
                    min_count = 3;
                } else if (curlen == nextlen) {
                    max_count = 6;
                    min_count = 3;
                } else {
                    max_count = 7;
                    min_count = 4;
                }
            }
        }

        /* ==========================================================================
        * Send a literal or distance tree in compressed form, using the codes in
        * bl_tree.
        */
        var zip_send_tree = function (tree, // the tree to be scanned
		   max_code) { // and its largest code of non zero frequency
            var n; 		// iterates over all tree elements
            var prevlen = -1; 	// last emitted length
            var curlen; 		// length of current code
            var nextlen = tree[0].dl; // length of next code
            var count = 0; 	// repeat count of the current code
            var max_count = 7; 	// max repeat count
            var min_count = 4; 	// min repeat count

            /* tree[max_code+1].dl = -1; */  /* guard already set */
            if (nextlen == 0) {
                max_count = 138;
                min_count = 3;
            }

            for (n = 0; n <= max_code; n++) {
                curlen = nextlen;
                nextlen = tree[n + 1].dl;
                if (++count < max_count && curlen == nextlen) {
                    continue;
                } else if (count < min_count) {
                    do { zip_SEND_CODE(curlen, zip_bl_tree); } while (--count != 0);
                } else if (curlen != 0) {
                    if (curlen != prevlen) {
                        zip_SEND_CODE(curlen, zip_bl_tree);
                        count--;
                    }
                    // Assert(count >= 3 && count <= 6, " 3_6?");
                    zip_SEND_CODE(zip_REP_3_6, zip_bl_tree);
                    zip_send_bits(count - 3, 2);
                } else if (count <= 10) {
                    zip_SEND_CODE(zip_REPZ_3_10, zip_bl_tree);
                    zip_send_bits(count - 3, 3);
                } else {
                    zip_SEND_CODE(zip_REPZ_11_138, zip_bl_tree);
                    zip_send_bits(count - 11, 7);
                }
                count = 0;
                prevlen = curlen;
                if (nextlen == 0) {
                    max_count = 138;
                    min_count = 3;
                } else if (curlen == nextlen) {
                    max_count = 6;
                    min_count = 3;
                } else {
                    max_count = 7;
                    min_count = 4;
                }
            }
        }

        /* ==========================================================================
        * Construct the Huffman tree for the bit lengths and return the index in
        * bl_order of the last bit length code to send.
        */
        var zip_build_bl_tree = function () {
            var max_blindex;  // index of last bit length code of non zero freq

            // Determine the bit length frequencies for literal and distance trees
            zip_scan_tree(zip_dyn_ltree, zip_l_desc.max_code);
            zip_scan_tree(zip_dyn_dtree, zip_d_desc.max_code);

            // Build the bit length tree:
            zip_build_tree(zip_bl_desc);
            /* opt_len now includes the length of the tree representations, except
            * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
            */

            /* Determine the number of bit length codes to send. The pkzip format
            * requires that at least 4 bit length codes be sent. (appnote.txt says
            * 3 but the actual value used is 4.)
            */
            for (max_blindex = zip_BL_CODES - 1; max_blindex >= 3; max_blindex--) {
                if (zip_bl_tree[zip_bl_order[max_blindex]].dl != 0) break;
            }
            /* Update opt_len to include the bit length tree and counts */
            zip_opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
            //    Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
            //	    encoder->opt_len, encoder->static_len));

            return max_blindex;
        }

        /* ==========================================================================
        * Send the header for a block using dynamic Huffman trees: the counts, the
        * lengths of the bit length codes, the literal tree and the distance tree.
        * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
        */
        var zip_send_all_trees = function (lcodes, dcodes, blcodes) { // number of codes for each tree
            var rank; // index in bl_order

            //    Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
            //    Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
            //	    "too many codes");
            //    Tracev((stderr, "\nbl counts: "));
            zip_send_bits(lcodes - 257, 5); // not +255 as stated in appnote.txt
            zip_send_bits(dcodes - 1, 5);
            zip_send_bits(blcodes - 4, 4); // not -3 as stated in appnote.txt
            for (rank = 0; rank < blcodes; rank++) {
                //      Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
                zip_send_bits(zip_bl_tree[zip_bl_order[rank]].dl, 3);
            }

            // send the literal tree
            zip_send_tree(zip_dyn_ltree, lcodes - 1);

            // send the distance tree
            zip_send_tree(zip_dyn_dtree, dcodes - 1);
        }

        /* ==========================================================================
        * Determine the best encoding for the current block: dynamic trees, static
        * trees or store, and output the encoded block to the zip file.
        */
        var zip_flush_block = function (eof) { // true if this is the last block for a file
            var opt_lenb, static_lenb; // opt_len and static_len in bytes
            var max_blindex; // index of last bit length code of non zero freq
            var stored_len; // length of input block

            stored_len = zip_strstart - zip_block_start;
            zip_flag_buf[zip_last_flags] = zip_flags; // Save the flags for the last 8 items

            // Construct the literal and distance trees
            zip_build_tree(zip_l_desc);
            //    Tracev((stderr, "\nlit data: dyn %ld, stat %ld",
            //	    encoder->opt_len, encoder->static_len));

            zip_build_tree(zip_d_desc);
            //    Tracev((stderr, "\ndist data: dyn %ld, stat %ld",
            //	    encoder->opt_len, encoder->static_len));
            /* At this point, opt_len and static_len are the total bit lengths of
            * the compressed block data, excluding the tree representations.
            */

            /* Build the bit length tree for the above two trees, and get the index
            * in bl_order of the last bit length code to send.
            */
            max_blindex = zip_build_bl_tree();

            // Determine the best encoding. Compute first the block length in bytes
            opt_lenb = (zip_opt_len + 3 + 7) >> 3;
            static_lenb = (zip_static_len + 3 + 7) >> 3;

            //    Trace((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u dist %u ",
            //	   opt_lenb, encoder->opt_len,
            //	   static_lenb, encoder->static_len, stored_len,
            //	   encoder->last_lit, encoder->last_dist));

            if (static_lenb <= opt_lenb)
                opt_lenb = static_lenb;
            if (stored_len + 4 <= opt_lenb // 4: two words for the lengths
       && zip_block_start >= 0) {
                var i;

                /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
                * Otherwise we can't have processed more than WSIZE input bytes since
                * the last block flush, because compression would have been
                * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
                * transform a block into a stored block.
                */
                zip_send_bits((zip_STORED_BLOCK << 1) + eof, 3);  /* send block type */
                zip_bi_windup(); 	 /* align on byte boundary */
                zip_put_short(stored_len);
                zip_put_short(~stored_len);

                // copy block
                /*
                p = &window[block_start];
                for(i = 0; i < stored_len; i++)
                put_byte(p[i]);
                */
                for (i = 0; i < stored_len; i++)
                    zip_put_byte(zip_window[zip_block_start + i]);

            } else if (static_lenb == opt_lenb) {
                zip_send_bits((zip_STATIC_TREES << 1) + eof, 3);
                zip_compress_block(zip_static_ltree, zip_static_dtree);
            } else {
                zip_send_bits((zip_DYN_TREES << 1) + eof, 3);
                zip_send_all_trees(zip_l_desc.max_code + 1,
			   zip_d_desc.max_code + 1,
			   max_blindex + 1);
                zip_compress_block(zip_dyn_ltree, zip_dyn_dtree);
            }

            zip_init_block();

            if (eof != 0)
                zip_bi_windup();
        }

        /* ==========================================================================
        * Save the match info and tally the frequency counts. Return true if
        * the current block must be flushed.
        */
        var zip_ct_tally = function (
	dist, // distance of matched string
	lc) { // match length-MIN_MATCH or unmatched char (if dist==0)
            zip_l_buf[zip_last_lit++] = lc;
            if (dist == 0) {
                // lc is the unmatched char
                zip_dyn_ltree[lc].fc++;
            } else {
                // Here, lc is the match length - MIN_MATCH
                dist--; 	    // dist = match distance - 1
                //      Assert((ush)dist < (ush)MAX_DIST &&
                //	     (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
                //	     (ush)D_CODE(dist) < (ush)D_CODES,  "ct_tally: bad match");

                zip_dyn_ltree[zip_length_code[lc] + zip_LITERALS + 1].fc++;
                zip_dyn_dtree[zip_D_CODE(dist)].fc++;

                zip_d_buf[zip_last_dist++] = dist;
                zip_flags |= zip_flag_bit;
            }
            zip_flag_bit <<= 1;

            // Output the flags if they fill a byte
            if ((zip_last_lit & 7) == 0) {
                zip_flag_buf[zip_last_flags++] = zip_flags;
                zip_flags = 0;
                zip_flag_bit = 1;
            }
            // Try to guess if it is profitable to stop the current block here
            if (zip_compr_level > 2 && (zip_last_lit & 0xfff) == 0) {
                // Compute an upper bound for the compressed length
                var out_length = zip_last_lit * 8;
                var in_length = zip_strstart - zip_block_start;
                var dcode;

                for (dcode = 0; dcode < zip_D_CODES; dcode++) {
                    out_length += zip_dyn_dtree[dcode].fc * (5 + zip_extra_dbits[dcode]);
                }
                out_length >>= 3;
                //      Trace((stderr,"\nlast_lit %u, last_dist %u, in %ld, out ~%ld(%ld%%) ",
                //	     encoder->last_lit, encoder->last_dist, in_length, out_length,
                //	     100L - out_length*100L/in_length));
                if (zip_last_dist < parseInt(zip_last_lit / 2, 10) &&
	   out_length < parseInt(in_length / 2, 10))
                    return true;
            }
            return (zip_last_lit == zip_LIT_BUFSIZE - 1 ||
	    zip_last_dist == zip_DIST_BUFSIZE);
            /* We avoid equality with LIT_BUFSIZE because of wraparound at 64K
            * on 16 bit machines and because stored blocks are restricted to
            * 64K-1 bytes.
            */
        }

        /* ==========================================================================
        * Send the block data compressed using the given Huffman trees
        */
        var zip_compress_block = function (
	ltree, // literal tree
	dtree) {	// distance tree
            var dist; 	// distance of matched string
            var lc; 	// match length or unmatched char (if dist == 0)
            var lx = 0; 	// running index in l_buf
            var dx = 0; 	// running index in d_buf
            var fx = 0; 	// running index in flag_buf
            var flag = 0; // current flags
            var code; 	// the code to send
            var extra; 	// number of extra bits to send

            if (zip_last_lit != 0) do {
                if ((lx & 7) == 0)
                    flag = zip_flag_buf[fx++];
                lc = zip_l_buf[lx++] & 0xff;
                if ((flag & 1) == 0) {
                    zip_SEND_CODE(lc, ltree); /* send a literal byte */
                    //	Tracecv(isgraph(lc), (stderr," '%c' ", lc));
                } else {
                    // Here, lc is the match length - MIN_MATCH
                    code = zip_length_code[lc];
                    zip_SEND_CODE(code + zip_LITERALS + 1, ltree); // send the length code
                    extra = zip_extra_lbits[code];
                    if (extra != 0) {
                        lc -= zip_base_length[code];
                        zip_send_bits(lc, extra); // send the extra length bits
                    }
                    dist = zip_d_buf[dx++];
                    // Here, dist is the match distance - 1
                    code = zip_D_CODE(dist);
                    //	Assert (code < D_CODES, "bad d_code");

                    zip_SEND_CODE(code, dtree);   // send the distance code
                    extra = zip_extra_dbits[code];
                    if (extra != 0) {
                        dist -= zip_base_dist[code];
                        zip_send_bits(dist, extra);   // send the extra distance bits
                    }
                } // literal or match pair ?
                flag >>= 1;
            } while (lx < zip_last_lit);

            zip_SEND_CODE(zip_END_BLOCK, ltree);
        }

        /* ==========================================================================
        * Send a value on a given number of bits.
        * IN assertion: length <= 16 and value fits in length bits.
        */
        var zip_Buf_size = 16; // bit size of bi_buf
        var zip_send_bits = function (
	value, // value to send
	length) {	// number of bits
            /* If not enough room in bi_buf, use (valid) bits from bi_buf and
            * (16 - bi_valid) bits from value, leaving (width - (16-bi_valid))
            * unused bits in value.
            */
            if (zip_bi_valid > zip_Buf_size - length) {
                zip_bi_buf |= (value << zip_bi_valid);
                zip_put_short(zip_bi_buf);
                zip_bi_buf = (value >> (zip_Buf_size - zip_bi_valid));
                zip_bi_valid += length - zip_Buf_size;
            } else {
                zip_bi_buf |= value << zip_bi_valid;
                zip_bi_valid += length;
            }
        }

        /* ==========================================================================
        * Reverse the first len bits of a code, using straightforward code (a faster
        * method would use a table)
        * IN assertion: 1 <= len <= 15
        */
        var zip_bi_reverse = function (
	code, // the value to invert
	len) {	// its bit length
            var res = 0;
            do {
                res |= code & 1;
                code >>= 1;
                res <<= 1;
            } while (--len > 0);
            return res >> 1;
        }

        /* ==========================================================================
        * Write out any remaining bits in an incomplete byte.
        */
        var zip_bi_windup = function () {
            if (zip_bi_valid > 8) {
                zip_put_short(zip_bi_buf);
            } else if (zip_bi_valid > 0) {
                zip_put_byte(zip_bi_buf);
            }
            zip_bi_buf = 0;
            zip_bi_valid = 0;
        }

        var zip_qoutbuf = function () {
            if (zip_outcnt != 0) {
                var q, i;
                q = zip_new_queue();
                if (zip_qhead == null)
                    zip_qhead = zip_qtail = q;
                else
                    zip_qtail = zip_qtail.next = q;
                q.len = zip_outcnt - zip_outoff;
                //      System.arraycopy(zip_outbuf, zip_outoff, q.ptr, 0, q.len);
                for (i = 0; i < q.len; i++)
                    q.ptr[i] = zip_outbuf[zip_outoff + i];
                zip_outcnt = zip_outoff = 0;
            }
        }

        var zip_deflate = function (data, level) {
            var i, j;

            zip_deflate_data = data;
            zip_deflate_pos = 0;
            if (typeof level == "undefined") {
                level = zip_DEFAULT_LEVEL;
            }
            zip_deflate_start(level);
            var buff = [0];
            var aout = [];
            while ((i = zip_deflate_internal(buff, 0, buff.length)) > 0) {
                aout.push(buff[0]);
            }
            zip_deflate_data = null; // G.C.
            return new Uint8Array(aout);
        };

        return zip_deflate;
    })();






    /*
    * $Id: rawinflate.js,v 0.2 2009/03/01 18:32:24 dankogai Exp $
    *
    * original:
    * http://www.onicos.com/staff/iz/amuse/javascript/expert/inflate.txt
    */

    var Inflate = (function () {

        /* Copyright (C) 1999 Masanao Izumo <iz@onicos.co.jp>
        * Version: 1.0.0.1
        * LastModified: Dec 25 1999
        */

        /* Interface:
        * data = zip_inflate(src);
        */

        /* constant parameters */
        var zip_WSIZE = 32768; 	// Sliding Window size
        var zip_STORED_BLOCK = 0;
        var zip_STATIC_TREES = 1;
        var zip_DYN_TREES = 2;

        /* for inflate */
        var zip_lbits = 9; 		// bits in base literal/length lookup table
        var zip_dbits = 6; 		// bits in base distance lookup table
        var zip_INBUFSIZ = 32768; // Input buffer size
        var zip_INBUF_EXTRA = 64; // Extra buffer

        /* variables (inflate) */
        var zip_slide;
        var zip_wp; 		// current position in slide
        var zip_fixed_tl = null; // inflate static
        var zip_fixed_td; 	// inflate static
        var zip_fixed_bl, fixed_bd; // inflate static
        var zip_bit_buf; 	// bit buffer
        var zip_bit_len; 	// bits in bit buffer
        var zip_method;
        var zip_eof;
        var zip_copy_leng;
        var zip_copy_dist;
        var zip_tl, zip_td; // literal/length and distance decoder tables
        var zip_bl, zip_bd; // number of bits decoded by tl and td

        var zip_inflate_data;
        var zip_inflate_pos;


        /* constant tables (inflate) */
        var zip_MASK_BITS = new Array(
    0x0000,
    0x0001, 0x0003, 0x0007, 0x000f, 0x001f, 0x003f, 0x007f, 0x00ff,
    0x01ff, 0x03ff, 0x07ff, 0x0fff, 0x1fff, 0x3fff, 0x7fff, 0xffff);
        // Tables for deflate from PKZIP's appnote.txt.
        var zip_cplens = new Array( // Copy lengths for literal codes 257..285
    3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
    35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0);
        /* note: see note #13 above about the 258 in this list. */
        var zip_cplext = new Array( // Extra bits for literal codes 257..285
    0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2,
    3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99); // 99==invalid
        var zip_cpdist = new Array( // Copy offsets for distance codes 0..29
    1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
    257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
    8193, 12289, 16385, 24577);
        var zip_cpdext = new Array( // Extra bits for distance codes
    0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6,
    7, 7, 8, 8, 9, 9, 10, 10, 11, 11,
    12, 12, 13, 13);
        var zip_border = new Array(  // Order of the bit length code lengths
    16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);
        /* objects (inflate) */

        var zip_HuftList = function () {
            this.next = null;
            this.list = null;
        }

        var zip_HuftNode = function () {
            this.e = 0; // number of extra bits or operation
            this.b = 0; // number of bits in this code or subcode

            // union
            this.n = 0; // literal, length base, or distance base
            this.t = null; // (zip_HuftNode) pointer to next level of table
        }

        var zip_HuftBuild = function (b, // code lengths in bits (all assumed <= BMAX)
		       n, // number of codes (assumed <= N_MAX)
		       s, // number of simple-valued codes (0..s-1)
		       d, // list of base values for non-simple codes
		       e, // list of extra bits for non-simple codes
		       mm	// maximum lookup bits
		   ) {
            this.BMAX = 16;   // maximum bit length of any code
            this.N_MAX = 288; // maximum number of codes in any set
            this.status = 0; // 0: success, 1: incomplete table, 2: bad input
            this.root = null; // (zip_HuftList) starting table
            this.m = 0; 	// maximum lookup bits, returns actual

            /* Given a list of code lengths and a maximum table size, make a set of
            tables to decode that set of codes.	Return zero on success, one if
            the given code set is incomplete (the tables are still built in this
            case), two if the input is invalid (all zero length codes or an
            oversubscribed set of lengths), and three if not enough memory.
            The code with value 256 is special, and the tables are constructed
            so that no bits beyond that code are fetched when that code is
            decoded. */
            {
                var a; 		// counter for codes of length k
                var c = new Array(this.BMAX + 1); // bit length count table
                var el; 		// length of EOB code (value 256)
                var f; 		// i repeats in table every f entries
                var g; 		// maximum code length
                var h; 		// table level
                var i; 		// counter, current code
                var j; 		// counter
                var k; 		// number of bits in current code
                var lx = new Array(this.BMAX + 1); // stack of bits per table
                var p; 		// pointer into c[], b[], or v[]
                var pidx; 	// index of p
                var q; 		// (zip_HuftNode) points to current table
                var r = new zip_HuftNode(); // table entry for structure assignment
                var u = new Array(this.BMAX); // zip_HuftNode[BMAX][]  table stack
                var v = new Array(this.N_MAX); // values in order of bit length
                var w;
                var x = new Array(this.BMAX + 1); // bit offsets, then code stack
                var xp; 		// pointer into x or c
                var y; 		// number of dummy codes added
                var z; 		// number of entries in current table
                var o;
                var tail; 	// (zip_HuftList)

                tail = this.root = null;
                for (i = 0; i < c.length; i++)
                    c[i] = 0;
                for (i = 0; i < lx.length; i++)
                    lx[i] = 0;
                for (i = 0; i < u.length; i++)
                    u[i] = null;
                for (i = 0; i < v.length; i++)
                    v[i] = 0;
                for (i = 0; i < x.length; i++)
                    x[i] = 0;

                // Generate counts for each bit length
                el = n > 256 ? b[256] : this.BMAX; // set length of EOB code, if any
                p = b; pidx = 0;
                i = n;
                do {
                    c[p[pidx]]++; // assume all entries <= BMAX
                    pidx++;
                } while (--i > 0);
                if (c[0] == n) {	// null input--all zero length codes
                    this.root = null;
                    this.m = 0;
                    this.status = 0;
                    return;
                }

                // Find minimum and maximum length, bound *m by those
                for (j = 1; j <= this.BMAX; j++)
                    if (c[j] != 0)
                        break;
                k = j; 		// minimum code length
                if (mm < j)
                    mm = j;
                for (i = this.BMAX; i != 0; i--)
                    if (c[i] != 0)
                        break;
                g = i; 		// maximum code length
                if (mm > i)
                    mm = i;

                // Adjust last length count to fill out codes, if needed
                for (y = 1 << j; j < i; j++, y <<= 1)
                    if ((y -= c[j]) < 0) {
                        this.status = 2; // bad input: more codes than bits
                        this.m = mm;
                        return;
                    }
                if ((y -= c[i]) < 0) {
                    this.status = 2;
                    this.m = mm;
                    return;
                }
                c[i] += y;

                // Generate starting offsets into the value table for each length
                x[1] = j = 0;
                p = c;
                pidx = 1;
                xp = 2;
                while (--i > 0)		// note that i == g from above
                    x[xp++] = (j += p[pidx++]);

                // Make a table of values in order of bit lengths
                p = b; pidx = 0;
                i = 0;
                do {
                    if ((j = p[pidx++]) != 0)
                        v[x[j]++] = i;
                } while (++i < n);
                n = x[g]; 		// set n to length of v

                // Generate the Huffman codes and for each, make the table entries
                x[0] = i = 0; 	// first Huffman code is zero
                p = v; pidx = 0; 	// grab values in bit order
                h = -1; 		// no tables yet--level -1
                w = lx[0] = 0; 	// no bits decoded yet
                q = null; 		// ditto
                z = 0; 		// ditto

                // go through the bit lengths (k already is bits in shortest code)
                for (; k <= g; k++) {
                    a = c[k];
                    while (a-- > 0) {
                        // here i is the Huffman code of length k bits for value p[pidx]
                        // make tables up to required level
                        while (k > w + lx[1 + h]) {
                            w += lx[1 + h]; // add bits already decoded
                            h++;

                            // compute minimum size table less than or equal to *m bits
                            z = (z = g - w) > mm ? mm : z; // upper limit
                            if ((f = 1 << (j = k - w)) > a + 1) { // try a k-w bit table
                                // too few codes for k-w bit table
                                f -= a + 1; // deduct codes from patterns left
                                xp = k;
                                while (++j < z) { // try smaller tables up to z bits
                                    if ((f <<= 1) <= c[++xp])
                                        break; // enough codes to use up j bits
                                    f -= c[xp]; // else deduct codes from patterns
                                }
                            }
                            if (w + j > el && w < el)
                                j = el - w; // make EOB code end at table
                            z = 1 << j; // table entries for j-bit table
                            lx[1 + h] = j; // set table size in stack

                            // allocate and link in new table
                            q = new Array(z);
                            for (o = 0; o < z; o++) {
                                q[o] = new zip_HuftNode();
                            }

                            if (tail == null)
                                tail = this.root = new zip_HuftList();
                            else
                                tail = tail.next = new zip_HuftList();
                            tail.next = null;
                            tail.list = q;
                            u[h] = q; // table starts after link

                            /* connect to last table, if there is one */
                            if (h > 0) {
                                x[h] = i; 	// save pattern for backing up
                                r.b = lx[h]; // bits to dump before this table
                                r.e = 16 + j; // bits in this table
                                r.t = q; 	// pointer to this table
                                j = (i & ((1 << w) - 1)) >> (w - lx[h]);
                                u[h - 1][j].e = r.e;
                                u[h - 1][j].b = r.b;
                                u[h - 1][j].n = r.n;
                                u[h - 1][j].t = r.t;
                            }
                        }

                        // set up table entry in r
                        r.b = k - w;
                        if (pidx >= n)
                            r.e = 99; 	// out of values--invalid code
                        else if (p[pidx] < s) {
                            r.e = (p[pidx] < 256 ? 16 : 15); // 256 is end-of-block code
                            r.n = p[pidx++]; // simple code is just the value
                        } else {
                            r.e = e[p[pidx] - s]; // non-simple--look up in lists
                            r.n = d[p[pidx++] - s];
                        }

                        // fill code-like entries with r //
                        f = 1 << (k - w);
                        for (j = i >> w; j < z; j += f) {
                            q[j].e = r.e;
                            q[j].b = r.b;
                            q[j].n = r.n;
                            q[j].t = r.t;
                        }

                        // backwards increment the k-bit code i
                        for (j = 1 << (k - 1); (i & j) != 0; j >>= 1)
                            i ^= j;
                        i ^= j;

                        // backup over finished tables
                        while ((i & ((1 << w) - 1)) != x[h]) {
                            w -= lx[h]; 	// don't need to update q
                            h--;
                        }
                    }
                }

                /* return actual size of base table */
                this.m = lx[1];

                /* Return true (1) if we were given an incomplete table */
                this.status = ((y != 0 && g != 1) ? 1 : 0);
            } /* end of constructor */
        }


        /* routines (inflate) */

        var zip_GET_BYTE = function () {
            if (zip_inflate_data.length == zip_inflate_pos)
                return -1;
            return zip_inflate_data[zip_inflate_pos++];
        }

        var zip_NEEDBITS = function (n) {
            while (zip_bit_len < n) {
                zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
                zip_bit_len += 8;
            }
        }

        var zip_GETBITS = function (n) {
            return zip_bit_buf & zip_MASK_BITS[n];
        }

        var zip_DUMPBITS = function (n) {
            zip_bit_buf >>= n;
            zip_bit_len -= n;
        }

        var zip_inflate_codes = function (buff, off, size) {
            /* inflate (decompress) the codes in a deflated (compressed) block.
            Return an error code or zero if it all goes ok. */
            var e; 	// table entry flag/number of extra bits
            var t; 	// (zip_HuftNode) pointer to table entry
            var n;

            if (size == 0)
                return 0;

            // inflate the coded data
            n = 0;
            for (; ; ) {			// do until end of block
                zip_NEEDBITS(zip_bl);
                t = zip_tl.list[zip_GETBITS(zip_bl)];
                e = t.e;
                while (e > 16) {
                    if (e == 99)
                        return -1;
                    zip_DUMPBITS(t.b);
                    e -= 16;
                    zip_NEEDBITS(e);
                    t = t.t[zip_GETBITS(e)];
                    e = t.e;
                }
                zip_DUMPBITS(t.b);

                if (e == 16) {		// then it's a literal
                    zip_wp &= zip_WSIZE - 1;
                    buff[off + n++] = zip_slide[zip_wp++] = t.n;
                    if (n == size)
                        return size;
                    continue;
                }

                // exit if end of block
                if (e == 15)
                    break;

                // it's an EOB or a length

                // get length of block to copy
                zip_NEEDBITS(e);
                zip_copy_leng = t.n + zip_GETBITS(e);
                zip_DUMPBITS(e);

                // decode distance of block to copy
                zip_NEEDBITS(zip_bd);
                t = zip_td.list[zip_GETBITS(zip_bd)];
                e = t.e;

                while (e > 16) {
                    if (e == 99)
                        return -1;
                    zip_DUMPBITS(t.b);
                    e -= 16;
                    zip_NEEDBITS(e);
                    t = t.t[zip_GETBITS(e)];
                    e = t.e;
                }
                zip_DUMPBITS(t.b);
                zip_NEEDBITS(e);
                zip_copy_dist = zip_wp - t.n - zip_GETBITS(e);
                zip_DUMPBITS(e);

                // do the copy
                while (zip_copy_leng > 0 && n < size) {
                    zip_copy_leng--;
                    zip_copy_dist &= zip_WSIZE - 1;
                    zip_wp &= zip_WSIZE - 1;
                    buff[off + n++] = zip_slide[zip_wp++]
		= zip_slide[zip_copy_dist++];
                }

                if (n == size)
                    return size;
            }

            zip_method = -1; // done
            return n;
        }

        var zip_inflate_stored = function (buff, off, size) {
            /* "decompress" an inflated type 0 (stored) block. */
            var n;

            // go to byte boundary
            n = zip_bit_len & 7;
            zip_DUMPBITS(n);

            // get the length and its complement
            zip_NEEDBITS(16);
            n = zip_GETBITS(16);
            zip_DUMPBITS(16);
            zip_NEEDBITS(16);
            if (n != ((~zip_bit_buf) & 0xffff))
                return -1; 		// error in compressed data
            zip_DUMPBITS(16);

            // read and output the compressed data
            zip_copy_leng = n;

            n = 0;
            while (zip_copy_leng > 0 && n < size) {
                zip_copy_leng--;
                zip_wp &= zip_WSIZE - 1;
                zip_NEEDBITS(8);
                buff[off + n++] = zip_slide[zip_wp++] =
	    zip_GETBITS(8);
                zip_DUMPBITS(8);
            }

            if (zip_copy_leng == 0)
                zip_method = -1; // done
            return n;
        }

        var zip_inflate_fixed = function (buff, off, size) {
            /* decompress an inflated type 1 (fixed Huffman codes) block.  We should
            either replace this with a custom decoder, or at least precompute the
            Huffman tables. */

            // if first time, set up tables for fixed blocks
            if (zip_fixed_tl == null) {
                var i; 		// temporary variable
                var l = new Array(288); // length list for huft_build
                var h; // zip_HuftBuild

                // literal table
                for (i = 0; i < 144; i++)
                    l[i] = 8;
                for (; i < 256; i++)
                    l[i] = 9;
                for (; i < 280; i++)
                    l[i] = 7;
                for (; i < 288; i++)	// make a complete, but wrong code set
                    l[i] = 8;
                zip_fixed_bl = 7;

                h = new zip_HuftBuild(l, 288, 257, zip_cplens, zip_cplext,
			      zip_fixed_bl);
                if (h.status != 0) {
                    alert("HufBuild error: " + h.status);
                    return -1;
                }
                zip_fixed_tl = h.root;
                zip_fixed_bl = h.m;

                // distance table
                for (i = 0; i < 30; i++)	// make an incomplete code set
                    l[i] = 5;
                var zip_fixed_bd = 5;

                h = new zip_HuftBuild(l, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
                if (h.status > 1) {
                    zip_fixed_tl = null;
                    alert("HufBuild error: " + h.status);
                    return -1;
                }
                zip_fixed_td = h.root;
                zip_fixed_bd = h.m;
            }

            zip_tl = zip_fixed_tl;
            zip_td = zip_fixed_td;
            zip_bl = zip_fixed_bl;
            zip_bd = zip_fixed_bd;
            return zip_inflate_codes(buff, off, size);
        }

        var zip_inflate_dynamic = function (buff, off, size) {
            // decompress an inflated type 2 (dynamic Huffman codes) block.
            var i; 	// temporary variables
            var j;
            var l; 	// last length
            var n; 	// number of lengths to get
            var t; 	// (zip_HuftNode) literal/length code table
            var nb; 	// number of bit length codes
            var nl; 	// number of literal/length codes
            var nd; 	// number of distance codes
            var ll = new Array(286 + 30); // literal/length and distance code lengths
            var h; 	// (zip_HuftBuild)

            for (i = 0; i < ll.length; i++)
                ll[i] = 0;

            // read in table lengths
            zip_NEEDBITS(5);
            nl = 257 + zip_GETBITS(5); // number of literal/length codes
            zip_DUMPBITS(5);
            zip_NEEDBITS(5);
            nd = 1 + zip_GETBITS(5); // number of distance codes
            zip_DUMPBITS(5);
            zip_NEEDBITS(4);
            nb = 4 + zip_GETBITS(4); // number of bit length codes
            zip_DUMPBITS(4);
            if (nl > 286 || nd > 30)
                return -1; 	// bad lengths

            // read in bit-length-code lengths
            for (j = 0; j < nb; j++) {
                zip_NEEDBITS(3);
                ll[zip_border[j]] = zip_GETBITS(3);
                zip_DUMPBITS(3);
            }
            for (; j < 19; j++)
                ll[zip_border[j]] = 0;

            // build decoding table for trees--single level, 7 bit lookup
            zip_bl = 7;
            h = new zip_HuftBuild(ll, 19, 19, null, null, zip_bl);
            if (h.status != 0)
                return -1; // incomplete code set

            zip_tl = h.root;
            zip_bl = h.m;

            // read in literal and distance code lengths
            n = nl + nd;
            i = l = 0;
            while (i < n) {
                zip_NEEDBITS(zip_bl);
                t = zip_tl.list[zip_GETBITS(zip_bl)];
                j = t.b;
                zip_DUMPBITS(j);
                j = t.n;
                if (j < 16)		// length of code in bits (0..15)
                    ll[i++] = l = j; // save last length in l
                else if (j == 16) {	// repeat last length 3 to 6 times
                    zip_NEEDBITS(2);
                    j = 3 + zip_GETBITS(2);
                    zip_DUMPBITS(2);
                    if (i + j > n)
                        return -1;
                    while (j-- > 0)
                        ll[i++] = l;
                } else if (j == 17) {	// 3 to 10 zero length codes
                    zip_NEEDBITS(3);
                    j = 3 + zip_GETBITS(3);
                    zip_DUMPBITS(3);
                    if (i + j > n)
                        return -1;
                    while (j-- > 0)
                        ll[i++] = 0;
                    l = 0;
                } else {		// j == 18: 11 to 138 zero length codes
                    zip_NEEDBITS(7);
                    j = 11 + zip_GETBITS(7);
                    zip_DUMPBITS(7);
                    if (i + j > n)
                        return -1;
                    while (j-- > 0)
                        ll[i++] = 0;
                    l = 0;
                }
            }

            // build the decoding tables for literal/length and distance codes
            zip_bl = zip_lbits;
            h = new zip_HuftBuild(ll, nl, 257, zip_cplens, zip_cplext, zip_bl);
            if (zip_bl == 0)	// no literals or lengths
                h.status = 1;
            if (h.status != 0) {
                if (h.status == 1)
                    ; // **incomplete literal tree**
                return -1; 	// incomplete code set
            }
            zip_tl = h.root;
            zip_bl = h.m;

            for (i = 0; i < nd; i++)
                ll[i] = ll[i + nl];
            zip_bd = zip_dbits;
            h = new zip_HuftBuild(ll, nd, 0, zip_cpdist, zip_cpdext, zip_bd);
            zip_td = h.root;
            zip_bd = h.m;

            if (zip_bd == 0 && nl > 257) {   // lengths but no distances
                // **incomplete distance tree**
                return -1;
            }

            if (h.status == 1) {
                ; // **incomplete distance tree**
            }
            if (h.status != 0)
                return -1;

            // decompress until an end-of-block code
            return zip_inflate_codes(buff, off, size);
        }

        var zip_inflate_start = function () {
            var i;

            if (zip_slide == null)
                zip_slide = new Array(2 * zip_WSIZE);
            zip_wp = 0;
            zip_bit_buf = 0;
            zip_bit_len = 0;
            zip_method = -1;
            zip_eof = false;
            zip_copy_leng = zip_copy_dist = 0;
            zip_tl = null;
        }

        var zip_inflate_internal = function (buff, off, size) {
            // decompress an inflated entry
            var n, i;

            n = 0;
            while (n < size) {
                if (zip_eof && zip_method == -1)
                    return n;

                if (zip_copy_leng > 0) {
                    if (zip_method != zip_STORED_BLOCK) {
                        // STATIC_TREES or DYN_TREES
                        while (zip_copy_leng > 0 && n < size) {
                            zip_copy_leng--;
                            zip_copy_dist &= zip_WSIZE - 1;
                            zip_wp &= zip_WSIZE - 1;
                            buff[off + n++] = zip_slide[zip_wp++] =
			zip_slide[zip_copy_dist++];
                        }
                    } else {
                        while (zip_copy_leng > 0 && n < size) {
                            zip_copy_leng--;
                            zip_wp &= zip_WSIZE - 1;
                            zip_NEEDBITS(8);
                            buff[off + n++] = zip_slide[zip_wp++] = zip_GETBITS(8);
                            zip_DUMPBITS(8);
                        }
                        if (zip_copy_leng == 0)
                            zip_method = -1; // done
                    }
                    if (n == size)
                        return n;
                }

                if (zip_method == -1) {
                    if (zip_eof)
                        break;

                    // read in last block bit
                    zip_NEEDBITS(1);
                    if (zip_GETBITS(1) != 0)
                        zip_eof = true;
                    zip_DUMPBITS(1);

                    // read in block type
                    zip_NEEDBITS(2);
                    zip_method = zip_GETBITS(2);
                    zip_DUMPBITS(2);
                    zip_tl = null;
                    zip_copy_leng = 0;
                }

                switch (zip_method) {
                    case 0: // zip_STORED_BLOCK
                        i = zip_inflate_stored(buff, off + n, size - n);
                        break;

                    case 1: // zip_STATIC_TREES
                        if (zip_tl != null)
                            i = zip_inflate_codes(buff, off + n, size - n);
                        else
                            i = zip_inflate_fixed(buff, off + n, size - n);
                        break;

                    case 2: // zip_DYN_TREES
                        if (zip_tl != null)
                            i = zip_inflate_codes(buff, off + n, size - n);
                        else
                            i = zip_inflate_dynamic(buff, off + n, size - n);
                        break;

                    default: // error
                        i = -1;
                        break;
                }

                if (i == -1) {
                    if (zip_eof)
                        return 0;
                    return -1;
                }
                n += i;
            }
            return n;
        }

        var zip_inflate = function (data) {
            var i, j;
            zip_inflate_start();
            zip_inflate_data = data;
            zip_inflate_pos = 0;

            var buff = [0];
            var aout = [];
            while ((i = zip_inflate_internal(buff, 0, buff.length)) > 0) {
                aout.push(buff[0]);
            }
            zip_inflate_data = null; // G.C.
            return new Uint8Array(aout);
        }

        return zip_inflate;

    })();

    var adler32 = function (data) {
        var a = 1, b = 0;
        var i;
        var len = data.length;
        var MOD_ADLER = 65521;
        for (i = 0; i < len; i += 1) {
            a = (a + data[i]) % MOD_ADLER;
            b = (b + a) % MOD_ADLER;
        }
        return (b << 16) | a;
    };

    var Compress = function (data, level) {
        data = new Uint8Array(data);
        var calculated_checksum = adler32(data);
        var deflated_data = Deflate(data, level);
        data = new Uint8Array(deflated_data.length + 6);
        data[0] = 0x78;
        data[1] = 0xDA;
        data.set(deflated_data, 2);
        data.set(new Uint8Array(new Int32Array([calculated_checksum]).buffer), data.byteLength - 4);
        return data;
    };

    var Uncompress = function (data) {
        if (data.byteLength < 6) {
            throw "DataError: Not enough input";
        }
        data = new Uint8Array(data);
        var checksum = new Int32Array(new Uint8Array(data.subarray(data.byteLength - 4, data.byteLength)).buffer)[0];
        var inflated_data = Inflate(data.subarray(2, data.byteLength - 4));
        var calculated_checksum = adler32(inflated_data);
        if (data.byteLength > 6 && inflated_data.byteLength === 0) {
            throw "DataError: Unable to inflate the data";
        }
        else if (checksum !== calculated_checksum) {
            throw "DataError: Checksum don't match";
        }
        return inflated_data;
    };

    return {
        'deflate': Deflate,
        'inflate': Inflate,
        'compress': Compress,
        'uncompress': Uncompress
    };

})();



 
var Base64Binaryc = {
    _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    /* will return a  Uint8Array type */
    decodeArrayBuffer: function (input) {
        var bytes = Math.ceil((3 * input.length) / 4.0);
        var ab = new ArrayBuffer(bytes);
        this.decode(input, ab);

        return ab;
    },

    decode: function (input, arrayBuffer) {
        //get last chars to see if are valid
        var lkey1 = this._keyStr.indexOf(input.charAt(input.length - 1));
        var lkey2 = this._keyStr.indexOf(input.charAt(input.length - 1));

        var bytes = Math.ceil((3 * input.length) / 4.0);
        if (lkey1 == 64) bytes--; //padding chars, so skip
        if (lkey2 == 64) bytes--; //padding chars, so skip

        var uarray;
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;
        var j = 0;

        if (arrayBuffer)
            uarray = new Uint8Array(arrayBuffer);
        else
            uarray = new Uint8Array(bytes);

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        for (i = 0; i < bytes; i += 3) {
            //get the 3 octects in 4 ascii chars
            enc1 = this._keyStr.indexOf(input.charAt(j++));
            enc2 = this._keyStr.indexOf(input.charAt(j++));
            enc3 = this._keyStr.indexOf(input.charAt(j++));
            enc4 = this._keyStr.indexOf(input.charAt(j++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            uarray[i] = chr1;
            if (enc3 != 64) uarray[i + 1] = chr2;
            if (enc4 != 64) uarray[i + 2] = chr3;
        }

        return uarray;
    }
}