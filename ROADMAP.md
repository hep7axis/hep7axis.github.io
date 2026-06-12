# HEP7AXIS // ROADMAP

Criterio rector de todo lo que sigue: **mantención mínima**. Nada que requiera servidores propios, claves de API que caduquen, o tocar código para publicar. Cada fase agrega como máximo un campo nuevo al encabezado de los heptálogos; el resto vive en el diseño, que se configura una vez.

## FASE 0 — Beta actual (HECHO)
- Revista Jekyll sobre GitHub Pages: publicar = crear un archivo de texto en `_posts`.
- Portada con transmisión + archivo automático, ordenado por fecha.
- ADHD MODE estructural: el botón existe en TODO heptálogo presente y futuro sin hacer nada (vive en la plantilla de diseño, no en los artículos).
- Autodiagnóstico: alerta visible si un heptálogo no tiene 7 nodos.
- Imágenes en párrafos ya funcionan (base para FASE 3).
- Modo Goteo opcional: publicación diaria automática de textos pre-escritos.

## FASE 1 — Heptálogos de música (Spotify + Apple Music + Tidal)
**Cuándo:** al primer heptálogo musical.
**Cómo se publicará** (un campo nuevo en el encabezado):
```
pistas:
  - https://open.spotify.com/track/XXXX
  - https://music.apple.com/cl/album/XXXX
  - https://tidal.com/browse/track/XXXX
```
El diseño detecta la plataforma por la URL y arma el reproductor embebido correspondiente (los tres servicios ofrecen embeds por iframe sin API ni claves: `open.spotify.com/embed/...`, `embed.music.apple.com`, `embed.tidal.com`).
**Decisión de diseño importante:** los embeds cargan código de terceros, lo que tensiona el `NO_TRACKING` del manifiesto. Solución: patrón *click-to-load* — se muestra una tarjeta estática con el tema y la plataforma, y el iframe solo se inyecta cuando el lector pulsa play. Nadie es rastreado por leer.

## FASE 2 — Heptálogos de cine, series y documentales
**Cuándo:** al primer heptálogo de cine.
**Cómo se publicará:**
```
ver_en:
  - plataforma: MUBI
    url: https://mubi.com/films/XXXX
```
Botones "▸ VER EN MUBI / NETFLIX / etc." con el estilo de la revista.
**Realidad técnica:** no existe API pública estable de disponibilidad por streaming (JustWatch no la ofrece abierta); los conectores automáticos se rompen y exigen mantención. El enlace manual en el encabezado es la solución antifrágil. Opcional futuro: ficha de película vía TMDB (API gratuita) si algún día se quiere póster + año automáticos.

## FASE 3 — Heptálogos de pintura y artes visuales
**Cuándo:** parcialmente operativo HOY (imágenes en párrafos ya funcionan y se enmarcan solas).
**Lo que se agregará:**
- Clase `lámina` para imágenes a sangre completa (narrativa visual de pantalla entera entre nodos).
- Lightbox open source (GLightbox o basicLightbox, MIT, un archivo, sin dependencias) para ver obras a pantalla completa.
- Carga diferida nativa (`loading="lazy"`) para que un heptálogo con 7 obras pese poco.
- En ADHD MODE las láminas se anuncian como `[ lámina visual ]` (ya implementado).

## FASE 4 — Heptálogos de viajes y experiencias (BACKLOG)
**Cuándo:** se analiza con el primer heptálogo de viajes real sobre la mesa.
**Candidatos open source preseleccionados:**
- **Leaflet + OpenStreetMap** (MIT): mapas embebidos sin API key, sin tracking comercial, estética personalizable a negro/verde. El candidato principal.
- **uMap** (libre, de la comunidad OSM): editor visual de mapas con marcadores que luego se embebe; cero código para el escritor.
- Rutas GPX renderizadas sobre Leaflet si los viajes incluyen caminatas.
**Decisión pendiente:** formato del encabezado (¿lista de coordenadas? ¿archivo GPX subido a assets?). Se define con el caso real.

## FASE 5 — Si el equipo de escritores crece
- CMS visual open source sobre el mismo repo (Decap CMS o Sveltia CMS): formulario web con campos "título / categoría / 7 párrafos" y botón publicar, sin ver GitHub jamás. Requiere una configuración OAuth única; se justifica solo con 4+ personas publicando.
- Vista previa de borradores con carpeta `_drafts`.

## Deuda y vigilancia
- Los handles de Mastodon/Bluesky del footer deben apuntar a los perfiles definitivos cuando existan.
- El correo de "build failed" de GitHub debe llegar a una casilla que alguien mire (hoy: la del dueño del repo).
- Revisar una vez al año que las versiones de actions del Modo Goteo sigan vigentes (cambio de un número en un archivo).
