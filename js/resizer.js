! function() {
    if (window.postMessage && window.addEventListener && !window.h5pResizerInitialized) {
        window.h5pResizerInitialized = !0;
        var e = {
            hello: function(e, t, i) {
                e.style.width = "100%", e.getBoundingClientRect();
                var n = function() {
                    e.contentWindow ? i("resize") : window.removeEventListener("resize", n)
                };
                window.addEventListener("resize", n, !1), i("hello")
            },
            prepareResize: function(e, t, i) {
                e.clientHeight === t.scrollHeight && t.scrollHeight === t.clientHeight || (e.style.height = t.clientHeight + "px", i("resizePrepared"))
            },
            resize: function(e, t) {
                e.style.height = t.scrollHeight + "px"
            }
        };
        window.addEventListener("message", (function(t) {
            if ("h5p" === t.data.context) {
                for (var i, n = document.getElementsByTagName("iframe"), o = 0; o < n.length; o++)
                    if (n[o].contentWindow === t.source) {
                        i = n[o];
                        break
                    } i && e[t.data.action] && e[t.data.action](i, t.data, (function(e, i) {
                    void 0 === i && (i = {}), i.action = e, i.context = "h5p", t.source.postMessage(i, t.origin)
                }))
            }
        }), !1);
        for (var t = document.getElementsByTagName("iframe"), i = {
                context: "h5p",
                action: "ready"
            }, n = 0; n < t.length; n++) - 1 !== t[n].src.indexOf("h5p") && t[n].contentWindow.postMessage(i, "*")
    }
}();
