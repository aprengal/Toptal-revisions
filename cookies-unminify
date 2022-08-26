!(function () {
    function b(a, b) {
        return a.querySelector(b);
    }
    function c(a, b) {
        return a.querySelectorAll(b);
    }
    var g,
        a = document;
    if ((("ontouchstart" in window || (window.DocumentTouch && document instanceof window.DocumentTouch) || ((g = "(-ms-heartz)"), window.matchMedia && window.matchMedia(g).matches)) && a.body.classList.add("toque-act"), b(a, ".tel-b"))) {
        var a = document,
            h = b(a, ".tel-b"),
            s = h.classList,
            t = b(a, ".m-t").classList,
            d = b(a, ".menu-p"),
            j = c(d, "a"),
            i = (j.length, c(d, "button")),
            k = i.length,
            u = b(a, "#buscador"),
            v = b(a, ".b-buscar");
        if (b(a, ".pan"))
            var l = c(b(a, ".pan"), "a"),
                w = l.length;
        if (b(a, ".pan li.br")) var x = b(a, ".pan li.br");
        function y(a) {
            for (i = 0; i < w; i++) a ? (l[i].setAttribute("tabindex", -1), x && x.setAttribute("tabindex", -1)) : (l[i].removeAttribute("tabindex"), x && x.setAttribute("tabindex", 0));
        }
        function z() {
            window.innerWidth < 1024 &&
                (t.contains("si") || t.contains("act")
                    ? t.contains("si") &&
                      t.contains("act") &&
                      (t.remove("act"),
                      s.remove("activo"),
                      A(h, !1),
                      setTimeout(function () {
                          t.remove("si"), (u.disabled = !1), (v.disabled = !1), l && y(!1);
                      }, 375))
                    : (t.add("si"),
                      (u.disabled = !0),
                      (v.disabled = !0),
                      l && y(!0),
                      setTimeout(function () {
                          t.add("act"), s.add("activo"), A(h, !0);
                      }, 50)));
        }
        function m(a, b) {
            a.classList.contains("act") ? (a.classList.remove("act"), a.nextSibling.classList.remove("act"), A(a, !1)) : (a.classList.add("act"), a.nextSibling.classList.add("act"), A(a, !0));
        }
        for (
            h.addEventListener("click", function () {
                z();
            }),
                a.addEventListener("keydown", function (a) {
                    "Escape" === a.key &&
                        window.innerWidth < 1024 &&
                        (a.preventDefault(),
                        z(),
                        setTimeout(function () {
                            t.contains("act") ? j[0].focus() : h.focus();
                        }, 50));
                }),
                i = 0;
            i < k;
            i++
        )
            i[i].addEventListener("click", function () {
                m(this);
            });
        function A(a, b) {
            a.setAttribute("aria-expanded", b);
        }
        b(d, ".m-actual") && (b = (sub = b(d, ".m-actual")).children[1]).classList.contains("fam-b") && m(b), c(a, ".m-p");
        var f = c(d, "a"),
            n = f.length;
        for (i = 0; i < n; i++) f[i].addEventListener("focus", B, !0), f[i].addEventListener("blur", B, !0);
        function B() {
            for (var a = this; -1 === a.className.indexOf("menu-p"); )
                "li" === a.tagName.toLowerCase() && (a.classList.contains("enf") ? a.classList.remove("enf") : a.classList.add("enf")),
                    "a" === a.tagName.toLowerCase() && (a.classList.contains("sel") ? a.classList.remove("sel") : a.classList.add("sel")),
                    (a = a.parentElement);
        }
        window.addEventListener("resize", function () {
            window.innerWidth >= 1024 && t.contains("si") && (t.remove("act", "si"), (u.disabled = !1), (v.disabled = !1), l && y(!1));
        });
    }
    var o = b(a, ".rastros"),
        p = b(a, "#si_r"),
        q = b(a, "#non_r");
    try {
        var e = localStorage.getItem("estado_rastros");
    } catch {
        var e = void 0;
        console.warn("O almacemanto local est\xe1 desactivado.");
    }
    function C(a, b) {
        if (((p.disabled = !0), (q.disabled = !0), null === e))
            try {
                localStorage.setItem("estado_rastros", b), a && r();
            } catch {
                console.warn("O almacemanto local est\xe1 desactivado.");
            }
        o.classList.add("inv"),
            setTimeout(function () {
                o.classList.add("non");
            }, 1e3);
    }
    function r() {
        var a, e, f, h, b, d, g;
        (a = window),
            (e = document),
            (f = "script"),
            (h = "/materiais/js/arriba-ga.js"),
            (b = "ga"),
            (a.GoogleAnalyticsObject = b),
            (a[b] =
                a[b] ||
                function () {
                    (a[b].q = a[b].q || []).push(arguments);
                }),
            (a[b].l = 1 * new Date()),
            (d = e.createElement(f)),
            (g = c(e, f)[0]),
            (d.async = 1),
            (d.src = h),
            g.parentNode.insertBefore(d, g),
            ga("create", "UA-160367796-1", { cookieFlags: "max-age=31536000;secure;samesite=none" }),
            ga("set", "anonymizeIp", !0),
            ga("send", "pageview");
    }
    null === e &&
        (o.classList.remove("non"),
        setTimeout(function () {
            o.classList.remove("inv");
        }, 20)),
        p.addEventListener("click", function () {
            C(1, "permitido");
        }),
        q.addEventListener("click", function () {
            C(0, "denegado");
        }),
        "permitido" === e && r(),
        /(trident|msie)/i.test(navigator.userAgent) &&
            a.getElementById &&
            window.addEventListener &&
            window.addEventListener(
                "hashchange",
                function () {
                    var c,
                        d = location.hash.substring(1);
                    /^[A-z0-9_-]+$/.test(d) && (c = b(a, d)) && (/^(?:a|select|input|button|textarea)$/i.test(c.tagName) || (c.tabIndex = -1), c.focus());
                },
                !1
            ),
        void 0 !== e &&
            "serviceWorker" in navigator &&
            window.addEventListener("load", function () {
                navigator.serviceWorker.register("/traballo.js");
            });
})();
