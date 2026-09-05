# Preguntas de cierre F1-A2

**Nombre: Luis Enrique Bedolla Fierros**
**Grupo: 01**

## 1. ¿Qué problema resuelve la interfaz `Gif` dentro del proyecto?

La interfaz `Gif` define la forma que debe tener cada GIF de la colección: propiedades obligatorias como `id`, `title`, `url`, `tags` y `rating`, y propiedades opcionales como `username` y `description`. Esto permite que TypeScript compruebe que los datos tienen una estructura consistente antes de ejecutar la aplicación.

## 2. ¿Qué diferencia existe entre una interfaz y un objeto literal?

Una interfaz es un contrato de tipos que describe qué propiedades y tipos debe tener un valor, pero no crea datos por sí sola. Un objeto literal es un valor concreto escrito con llaves, por ejemplo `{ id: "cat-01", title: "Gato programando" }`, que puede cumplir ese contrato.

## 3. ¿Qué significa `Gif[]` y qué error evita en el arreglo local?

`Gif[]` significa "arreglo de elementos del tipo `Gif`". En `const gifs: Gif[]`, TypeScript comprueba que cada objeto tenga las propiedades obligatorias, que los tipos sean correctos y que `rating` use un valor permitido. Así evita errores como omitir `title`, usar un número como `url` o asignar una clasificación no válida.

## 4. ¿Por qué `username` y `description` pueden declararse como propiedades opcionales?

Porque no todos los GIFs tienen necesariamente un autor o una descripción. El signo `?` permite que esas propiedades estén presentes o ausentes. Al mostrar los datos, el proyecto usa valores predeterminados como `"Autor no disponible"` y `"Descripción no disponible"` cuando faltan.

## 5. ¿En qué situación utilizarías `let` en lugar de `const` dentro de esta actividad?

Usaría `let` para una variable cuyo valor necesitara cambiar, por ejemplo un contador que se incremente dentro de un ciclo o una referencia que se reasigne. En esta actividad se usa `const` porque las referencias de la colección, los elementos del DOM y los resultados calculados no necesitan reasignarse.

## 6. ¿Qué reciben y qué devuelven `normalizeText`, `searchGifs` y `createGifCard`?

- `normalizeText` recibe un `string` y devuelve un `string` sin espacios extremos y convertido a minúsculas.
- `searchGifs` recibe un arreglo de `Gif` y un texto de búsqueda; devuelve otro arreglo de `Gif` que coincide con la consulta.
- `createGifCard` recibe un objeto `Gif` y devuelve un `string` con el HTML de su tarjeta.

## 7. ¿Qué diferencia existe entre `forEach`, `filter`, `map` y `find`?

- `forEach` ejecuta una función para cada elemento y normalmente se usa para efectos secundarios; no crea un arreglo transformado.
- `filter` devuelve un nuevo arreglo con los elementos que cumplen una condición.
- `map` devuelve un nuevo arreglo con un valor transformado por cada elemento.
- `find` devuelve el primer elemento que cumple una condición o `undefined` si no encuentra ninguno.

En la solución se usan `filter` para buscar GIFs y `map` para crear las tarjetas HTML.

## 8. ¿Por qué `find` puede devolver `undefined` y cómo se controló ese resultado?

`find` puede no encontrar ningún GIF con clasificación `g`, por lo que su resultado puede ser `undefined`. Se controló usando optional chaining (`firstSafeGif?.title`) y el operador `??` para mostrar `"Ninguno"` como valor alternativo.

## 9. ¿Qué es un callback? Identifica dos callbacks presentes en tu solución.

Un callback es una función que se entrega a otra función o evento para que sea ejecutada posteriormente. Dos callbacks presentes son:

- `(gif) => matchesQuery(gif, query)`, entregado a `filter`.
- `createGifCard`, entregado a `map` para transformar cada GIF en HTML.

También hay callbacks en `addEventListener`, como la función que responde al envío del formulario.

## 10. ¿Qué ventaja ofrecen las template strings al construir las tarjetas?

Las template strings permiten escribir HTML de varias líneas e insertar valores mediante `${...}`. Esto facilita combinar los datos del GIF, como título, URL, descripción, clasificación y etiquetas, sin concatenar muchas cadenas con el operador `+`.

## 11. ¿Para qué se utilizó la destructuración y el valor predeterminado de `username`?

La destructuración extrae directamente propiedades del objeto `Gif`, por ejemplo `title`, `url`, `username`, `description`, `tags` y `rating`, haciendo más legible la plantilla. El valor predeterminado `username = "Autor no disponible"` evita mostrar un valor vacío cuando el GIF no tiene autor.

## 12. ¿Por qué `querySelector` puede devolver `null` y cómo se validaron los elementos?

`querySelector` puede devolver `null` si no existe en el documento un elemento que coincida con el selector. Después de crear el HTML, se comprobaron `form`, `input`, `gallery` y `status` con una condición `if`. Si alguno falta, se lanza un error mediante `throw new Error(...)`. Las referencias validadas se guardan luego en `searchForm`, `searchInput`, `gifGallery` y `searchStatus`.

## 13. ¿Qué función cumple `preventDefault` en el envío del formulario?

`preventDefault()` evita el comportamiento predeterminado del formulario, que normalmente recargaría la página o enviaría los datos a otra dirección. Así la aplicación puede procesar la búsqueda en TypeScript y actualizar solamente la galería.

## 14. ¿Cómo responde la aplicación cuando la búsqueda no obtiene coincidencias?

`searchGifs` devuelve un arreglo vacío. Después, `renderGifs` actualiza el contador a `0 resultados` y muestra el mensaje `No se encontraron GIFs. Prueba con otra palabra.` en la galería.

## 15. ¿Qué cambiará cuando el arreglo local sea sustituido por datos de Giphy API?

La fuente de datos cambiará: en lugar de leer `gifs` directamente, habría que hacer una petición asíncrona con `fetch`, convertir la respuesta de Giphy al modelo `Gif` y controlar estados de carga y error. Las funciones de búsqueda y renderizado podrían mantenerse si los datos transformados conservan la estructura esperada por la interfaz.

## 16. ¿Qué error o dificultad encontraste y cómo comprobaste que quedó resuelto?

La principal dificultad fue un problema de alcance y estrechamiento de tipos: las funciones se encontraban dentro del bloque que validaba elementos posiblemente nulos, y TypeScript después no podía garantizar que `status`, `gallery`, `form` e `input` existieran. Se corrigió cerrando correctamente el bloque de validación y creando referencias validadas para usarlas en las funciones y listeners. Se comprobó la solución ejecutando `pnpm run build`, que terminó correctamente con `tsc` y `vite build`.
