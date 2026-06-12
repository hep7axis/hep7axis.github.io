# CÓMO PUBLICAR UN HEPTÁLOGO

Tiempo: 5 minutos. Requisito: tener acceso al repositorio en GitHub. No se toca código jamás.

## El ritual diario (6 pasos)

1. Abre `github.com/hep7axis/hep7axis.github.io` en el navegador.
2. Entra a la carpeta **`_posts`**.
3. Botón **Add file → Create new file**.
4. Nombre del archivo, EXACTO en este formato:
   `AAAA-MM-DD-titulo-corto.md`
   Ejemplo: `2026-06-12-siete-discos-para-el-fin.md`
   Reglas del nombre: minúsculas, palabras separadas por guiones, sin ñ, sin tildes, sin espacios. La fecha es la fecha de publicación.
5. Abre en otra pestaña el archivo **`PLANTILLA_HEPTALOGO.md`** (está en la raíz del repo), copia TODO su contenido, pégalo en tu archivo nuevo y reemplaza los textos: el encabezado (title, numero, categoria, autor) y los 7 párrafos.
6. Botón verde **Commit changes**. En 1 a 3 minutos el heptálogo está vivo en `hep7axis.com`, en la portada y en el archivo.

## Reglas de oro

- **7 párrafos = 7 nodos.** Ni más, ni menos. Un párrafo es un bloque de texto separado por UNA línea en blanco. Si publicas con 6 o con 8, la página muestra una alerta `⚠ X/7 NODOS` para que lo corrijas.
- **El encabezado entre `---` y `---` no se rompe:** cada línea lleva su `:` y las comillas como en la plantilla.
- **El número:** mira en la portada el número del último heptálogo y súmale 1.
- **Categorías válidas:** `manifiesto`, `palabra`, `musica`, `cine`, `arte`, `viajes` (en minúsculas y sin tildes; el sitio les pone color automáticamente).
- **Nadie toca nada fuera de `_posts`** (y `assets/img` para subir fotos). En el resto de carpetas vive el diseño.

## Fotos dentro de un heptálogo (artes visuales)

1. Carpeta `assets/img` → **Add file → Upload files** → arrastra la foto → Commit.
2. En el párrafo donde va la imagen, escribe:
   `![qué se ve en la foto](/assets/img/nombre-de-la-foto.jpg)`
   La revista la enmarca y la adapta sola al ancho.

## Editar o despublicar

- **Editar:** abre el archivo en `_posts` → ícono del lápiz → corrige → Commit changes.
- **Despublicar:** abre el archivo → ícono de basurero → Commit changes. Desaparece del sitio pero queda en la historia de GitHub (recuperable siempre).

## Si algo sale mal

- **Llega un correo "Page build failed":** en el 95% de los casos es el encabezado del último archivo creado (faltó un `---`, un `:` o una comilla). Ábrelo, compáralo con la plantilla, corrige, Commit. El sitio sigue mostrando la versión anterior mientras tanto: nada se cae.
- **¿Rompiste algo y no sabes qué?** Sobre el archivo → botón **History** → abre la versión anterior → **Revert** o copia el contenido viejo encima. En GitHub nada se pierde nunca.
- **El heptálogo no aparece:** revisa que la fecha del nombre del archivo no sea futura (ver Modo Goteo) y que el archivo esté dentro de `_posts`.

## MODO GOTEO (opcional): escribir el domingo, publicar toda la semana solo

Por defecto, un archivo con fecha futura NO aparece hasta que el sitio se reconstruya después de esa fecha. El Modo Goteo reconstruye el sitio automáticamente una vez al día, así que puedes dejar 7 heptálogos escritos con fechas de lunes a domingo y el sistema publica uno cada día sin que nadie haga nada.

Activación (una sola vez, 3 pasos):

1. En el repo, crea el archivo `.github/workflows/goteo-diario.yml` (Add file → Create new file; al escribir el nombre con `/`, GitHub crea las carpetas solas).
2. Pega dentro el contenido del archivo `extras/goteo-diario.yml` de este paquete. Commit.
3. En **Settings → Pages → Build and deployment → Source**, cambia de "Deploy from a branch" a **"GitHub Actions"**.

Desde ese momento el sitio se reconstruye todos los días a las ~08:00 (hora de Chile) y cada vez que alguien publica.
