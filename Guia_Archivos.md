# Guia de archivos del proyecto

Este proyecto es una aplicacion frontend basada en **TypeScript** y **Vite**. Vite se encarga del servidor de desarrollo y del empaquetado para produccion, mientras que TypeScript permite escribir y comprobar el codigo fuente con tipos.

## Estructura general

```text
fundamentos-ts/
├── index.html
├── package.json
├── pnpm-lock.yaml
├── tsconfig.json
├── .gitignore
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
    ├── main.ts
    ├── counter.ts
    ├── style.css
    └── assets/
        ├── hero.png
        ├── typescript.svg
        └── vite.svg
```

Tambien pueden aparecer las carpetas generadas `node_modules/` y `dist/`. Estas no forman parte del codigo fuente principal.

## Carpetas

### `src/`

Contiene el codigo fuente de la aplicacion. Aqui se encuentran los archivos TypeScript, las hojas de estilos y los recursos que se importan desde el codigo.

### `src/assets/`

Guarda recursos usados directamente por la aplicacion, como imagenes y logotipos. Estos archivos pueden importarse desde `main.ts` y Vite los procesa durante la compilacion.

### `public/`

Contiene archivos estaticos que Vite copia y sirve directamente desde la raiz de la aplicacion. Por ejemplo, un archivo dentro de `public/icons.svg` se referencia en el navegador como `/icons.svg`.

### `node_modules/`

Contiene las dependencias instaladas del proyecto. Se genera al ejecutar la instalacion de paquetes y no debe editarse manualmente ni incluirse en el repositorio.

### `dist/`

Contiene la version compilada y optimizada para produccion. Se genera al ejecutar el comando de build y tampoco debe editarse manualmente.

## Archivos principales

### `index.html`

Es el documento HTML inicial de la aplicacion.

- Define la estructura minima del documento.
- Configura el viewport para dispositivos moviles.
- Define el titulo de la pagina y el favicon.
- Incluye el contenedor `<div id="app">`, donde se renderiza la interfaz.
- Carga `src/main.ts` como modulo de JavaScript.

### `src/main.ts`

Es el punto de entrada del frontend.

- Importa los estilos de `style.css`.
- Importa los logotipos y la imagen principal desde `src/assets/`.
- Importa la funcion `setupCounter` desde `counter.ts`.
- Genera el contenido HTML de la pagina dentro de `#app`.
- Conecta el boton del contador con la logica de `counter.ts`.

Cuando se quiera cambiar el contenido principal de la pagina, este es uno de los primeros archivos que se debe revisar.

### `src/counter.ts`

Contiene la logica reutilizable del contador.

- Exporta la funcion `setupCounter`.
- Recibe un elemento HTML de tipo `HTMLButtonElement`.
- Mantiene el valor actual del contador.
- Actualiza el texto del boton.
- Incrementa el contador cada vez que el usuario hace clic.

Separar esta logica de `main.ts` permite mantener el punto de entrada mas ordenado y facilita reutilizar o probar el comportamiento.

### `src/style.css`

Define la apariencia visual de la aplicacion.

- Declara variables CSS para colores, tipografias, bordes y sombras.
- Estiliza el contenido principal, el contador, los enlaces y las secciones.
- Define la composicion de la imagen principal y los logotipos.
- Incluye reglas responsive para pantallas de menor tamano.
- Incluye estilos para los modos claro y oscuro segun la preferencia del sistema operativo.

### `src/assets/hero.png`

Es la imagen base utilizada en la seccion visual principal de `main.ts`.

### `src/assets/typescript.svg`

Es el logotipo de TypeScript que se muestra en la interfaz y en los enlaces de documentacion.

### `src/assets/vite.svg`

Es el logotipo de Vite que se muestra en la interfaz y en el enlace de exploracion de Vite.

### `public/favicon.svg`

Es el icono que aparece en la pestaña del navegador. Se referencia desde `index.html` mediante `/favicon.svg`.

### `public/icons.svg`

Contiene simbolos SVG reutilizables, como los iconos de documentacion, GitHub, Discord, X y Bluesky. Se utilizan desde el HTML mediante referencias del tipo `/icons.svg#nombre-del-icono`.

## Archivos de configuracion

### `package.json`

Describe el proyecto y sus dependencias.

- Define el nombre, version y tipo de modulo del proyecto.
- Contiene los scripts `dev`, `build` y `preview`.
- Declara Vite y TypeScript como dependencias de desarrollo.

Comandos disponibles:

```bash
pnpm dev       # Inicia el servidor de desarrollo
pnpm build     # Comprueba TypeScript y genera la compilacion
pnpm preview   # Sirve localmente la compilacion de produccion
```

### `pnpm-lock.yaml`

Registra las versiones exactas de las dependencias instaladas y sus dependencias internas. Permite que diferentes personas o entornos instalen el mismo arbol de paquetes usando pnpm.

No se recomienda editarlo manualmente; normalmente se actualiza al instalar o cambiar dependencias.

### `tsconfig.json`

Configura el compilador de TypeScript.

- Define el objetivo de JavaScript como `ES2023`.
- Habilita los tipos del navegador y de Vite.
- Usa resolucion de modulos compatible con bundlers.
- Desactiva la generacion directa de archivos JavaScript mediante `noEmit`.
- Activa comprobaciones para detectar variables y parametros sin usar.
- Indica que el codigo que se debe comprobar esta dentro de `src/`.

### `.gitignore`

Indica que archivos y carpetas no deben incluirse en Git, como logs, `node_modules/`, `dist/` y configuraciones locales del editor.

## Flujo de ejecucion

1. El navegador carga `index.html`.
2. `index.html` carga `src/main.ts`.
3. `main.ts` importa los estilos, recursos y la logica del contador.
4. `main.ts` inserta la interfaz dentro de `#app`.
5. `setupCounter` conecta el boton y actualiza su valor cuando recibe clics.
6. Vite transforma y sirve los modulos durante el desarrollo o genera `dist/` para produccion.
