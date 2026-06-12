/* ============================================================
   HEP7AXIS // HEPTALOGO.JS
   Se carga en TODAS las páginas de heptálogo automáticamente.
   1) Numera los párrafos como NODE_01..07 (los escritores no
      escriben markup: solo 7 párrafos de texto plano).
   2) Si no hay exactamente 7, muestra alerta visible en la página.
   3) ADHD MODE: lector simplificado que trocea por "," y ".".
   Los escritores NUNCA tocan este archivo.
   ============================================================ */
"use strict";
(function () {
    var art = document.getElementById("h7-article");
    if (!art) return;

    /* ---------- 1) NUMERACIÓN AUTOMÁTICA DE NODOS ---------- */
    var ps = [];
    for (var i = 0; i < art.children.length; i++) {
        if (art.children[i].tagName === "P") ps.push(art.children[i]);
    }
    ps.forEach(function (p, i) {
        p.setAttribute("data-node", "[NODE_" + String(i + 1).padStart(2, "0") + "]");
    });

    /* ---------- 2) AUTODIAGNÓSTICO: 7 NODOS EXACTOS ---------- */
    var meta = document.getElementById("h7-meta");
    if (meta && ps.length !== 7) {
        var alertChip = document.createElement("span");
        alertChip.className = "node-alert";
        alertChip.textContent = "\u26A0 " + ps.length + "/7 NODOS";
        alertChip.title = "Un heptálogo debe tener exactamente 7 párrafos. Revisa las líneas en blanco del archivo.";
        meta.appendChild(alertChip);
    }

    /* ---------- 3) ADHD MODE — LECTOR SIMPLIFICADO ---------- */
    var reader   = document.getElementById("adhd-reader");
    var openBtn  = document.getElementById("open-adhd");
    if (!reader || !openBtn) return;

    var closeBtn = document.getElementById("ar-close");
    var docEl    = document.getElementById("ar-doc");
    var focusBtn = document.getElementById("ar-focus");
    var prevBtn  = document.getElementById("ar-prev");
    var nextBtn  = document.getElementById("ar-next");
    var progress = document.getElementById("ar-progress");
    var incBtn   = document.getElementById("ar-inc");
    var decBtn   = document.getElementById("ar-dec");

    var clauses = [];
    var idx = 0;
    var size = 1.5;
    var built = false;
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function esc(s) {
        var d = document.createElement("div");
        d.textContent = s;
        return d.innerHTML;
    }

    // Trocea el texto SOLO por "," y "." conservando el separador.
    function splitClauses(text) {
        var parts = text.match(/[^,.]+[,.]?/g) || [];
        var out = [];
        for (var i = 0; i < parts.length; i++) {
            var t = parts[i].replace(/\s+/g, " ").trim();
            if (t) out.push(t);
        }
        return out;
    }

    // Marca la coma o el punto final en verde (la pausa hecha visible).
    function clauseHTML(frag) {
        var last = frag.slice(-1);
        if (last === "," || last === ".") {
            return esc(frag.slice(0, -1)) + '<span class="sep">' + last + "</span>";
        }
        return esc(frag);
    }

    function build() {
        var html = "";
        for (var i = 0; i < ps.length; i++) {
            var node = (ps[i].getAttribute("data-node") || "").replace(/[\[\]]/g, "");
            if (node) html += '<div class="ar-node">' + esc(node) + "</div>";

            var hasImg = !!ps[i].querySelector("img");
            var text = (ps[i].textContent || "").replace(/\s+/g, " ").trim();

            if (!text && hasImg) {
                html += '<p class="ar-clause">[ lámina visual — disponible en la vista normal ]</p>';
                continue;
            }
            var frags = splitClauses(text);
            for (var j = 0; j < frags.length; j++) {
                html += '<p class="ar-clause">' + clauseHTML(frags[j]) + "</p>";
            }
        }
        docEl.innerHTML = html;
        clauses = Array.prototype.slice.call(docEl.querySelectorAll(".ar-clause"));
        clauses.forEach(function (c, i) {
            c.addEventListener("click", function () {
                if (reader.classList.contains("focus")) setActive(i);
            });
        });
        built = true;
    }

    function applySize() {
        docEl.style.setProperty("--ar-size", size.toFixed(2) + "rem");
    }

    function setActive(i) {
        if (!clauses.length) return;
        idx = Math.max(0, Math.min(clauses.length - 1, i));
        for (var k = 0; k < clauses.length; k++) {
            clauses[k].classList.toggle("active", k === idx);
        }
        progress.textContent = (idx + 1) + " / " + clauses.length;
        var el = clauses[idx];
        if (el) el.scrollIntoView({ block: "center", behavior: reduceMotion ? "auto" : "smooth" });
    }

    function openReader() {
        if (!built) build();
        applySize();
        reader.classList.add("open");
        document.body.style.overflow = "hidden";
        closeBtn.focus();
    }

    function closeReader() {
        reader.classList.remove("open");
        document.body.style.overflow = "";
        openBtn.focus();
    }

    function toggleFocus() {
        var on = !reader.classList.contains("focus");
        reader.classList.toggle("focus", on);
        focusBtn.setAttribute("aria-pressed", on ? "true" : "false");
        focusBtn.innerHTML = on ? "&#9632; enfoque" : "&#9654; enfoque";
        if (on) setActive(idx || 0);
    }

    openBtn.addEventListener("click", openReader);
    closeBtn.addEventListener("click", closeReader);
    focusBtn.addEventListener("click", toggleFocus);
    prevBtn.addEventListener("click", function () { setActive(idx - 1); });
    nextBtn.addEventListener("click", function () { setActive(idx + 1); });
    incBtn.addEventListener("click", function () { size = Math.min(2.4, size + 0.15); applySize(); });
    decBtn.addEventListener("click", function () { size = Math.max(1.0, size - 0.15); applySize(); });

    document.addEventListener("keydown", function (e) {
        if (!reader.classList.contains("open")) return;
        if (e.key === "Escape") { closeReader(); return; }
        if (reader.classList.contains("focus")) {
            if (e.key === "ArrowRight" || e.key === "ArrowDown") { e.preventDefault(); setActive(idx + 1); }
            else if (e.key === "ArrowLeft" || e.key === "ArrowUp") { e.preventDefault(); setActive(idx - 1); }
        }
    });
})();
