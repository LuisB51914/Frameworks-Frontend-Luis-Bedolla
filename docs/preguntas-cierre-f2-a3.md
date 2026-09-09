# Preguntas de cierre - EC1 F2 A3

## 1. ¿Qué significa refactorizar una aplicación?

Refactorizar significa reorganizar y mejorar la estructura del código sin cambiar su comportamiento visible. En este proyecto, se separó la lógica en módulos para que sea más clara, reutilizable y fácil de mantener.

## 2. ¿Por qué el proyecto se dividió en módulos?

Se dividió para separar responsabilidades: los modelos describen los datos, los servicios contienen la lógica de búsqueda, los componentes encargan la representación visual, los datos locales aportan la colección inicial y `main.ts` actúa como punto de entrada que conecta todo. Esto reduce la complejidad y facilita futuras extensiones.

## 3. ¿Cuál es la responsabilidad de main.ts?

`main.ts` es el archivo principal de la aplicación. Su responsabilidad es crear la estructura inicial del DOM, obtener referencias a los elementos del interfaz, configurar los listeners de eventos y orquestar la interacción entre los módulos. También inicializa la vista con la colección de GIFs y el estado inicial.

## 4. ¿Qué diferencias existen entre una interfaz, un tipo unión y una enumeración?

- Una interfaz describe la forma de un objeto y puede especificar propiedades obligatorias u opcionales. En este proyecto se usa en `gif.interface.ts` para definir `Gif`.
- Un tipo unión (`type`) permite combinar varios valores o tipos, por ejemplo `GifRating = 'g' | 'pg' | 'pg-13'`, lo que restringe el conjunto de valores permitidos.
- Una enumeración (`enum`) define un conjunto de constantes con nombres asociados, como `RequestStatus`, útil para representar estados como `Initial`, `Loading`, `Success`, `Empty` y `Error`.

## 5. ¿Para qué se utiliza import type?

Se utiliza para importar solo tipos y no generar código JavaScript adicional al compilar. En este proyecto, por ejemplo, `import type { Gif } from '../models/gif.interface'` indica que solo se necesita la definición de `Gif`, no un valor en tiempo de ejecución.

## 6. ¿Dónde se aplicaron la desestructuración, spread y rest?

- Desestructuración: en `gallery.ts` y `gif-detail.ts`, donde se extraen propiedades del objeto `gif` como `id`, `title`, `url`, `tags` y `rating`.
- Spread: en `searchGifs`, donde se devuelve `[...]collection` para crear una copia del arreglo antes de filtrar y evitar mutar la colección original.
- Rest: en `gif-detail.ts`, donde `const [mainTag = 'Sin etiqueta', ...secondaryTags] = tags;` separa la primera etiqueta del resto.

## 7. ¿Por qué searchGifs recibe la colección como parámetro?

Porque `searchGifs` es una función reutilizable y no depende de una variable global. Recibir la colección como parámetro permite reutilizarla con cualquier conjunto de GIFs, facilita las pruebas y mantiene la lógica de búsqueda independiente de la fuente de datos.

## 8. ¿Por qué findGifById puede devolver undefined?

Porque `find` devuelve el primer elemento que cumple la condición, pero si no existe ningún GIF con ese `id`, devuelve `undefined`. Ese valor se maneja en `main.ts`, donde si no se encuentra el GIF se muestra un estado de error.

## 9. ¿Qué función cumple data-gif-id?

`data-gif-id` se usa como atributo HTML para marcar cada botón de una tarjeta de GIF con el identificador del elemento correspondiente. En `main.ts`, el evento delegado sobre la galería lee ese atributo para localizar el GIF exacto en la colección y mostrar su detalle.

## 10. ¿Qué es la delegación de eventos?

Es una técnica en la que se captura un evento en un contenedor padre en lugar de agregar un listener a cada elemento hijo. En este proyecto, la galería escucha clics y luego usa `closest('[data-gif-id]')` para detectar cuál tarjeta fue seleccionada. Esto reduce la cantidad de listeners y simplifica la gestión de elementos dinámicos.

## 11. ¿Por qué el estado Loading podría no observarse?

Porque la actualización del estado en la interfaz ocurre prácticamente de inmediato y la operación de búsqueda es muy rápida. Además, en una aplicación pequeña como esta, el cambio de texto puede verse apenas por una fracción de segundo, por lo que el estado `Loading` no siempre es visible para el usuario.

## 12. ¿Qué dificultad se presentó durante la refactorización y cómo se resolvió?

La dificultad principal fue mantener la organización modular sin romper la lógica de interacción y sin perder el control de tipos. Durante la refactorización, el código se reorganizó en archivos como `data`, `services`, `components`, `models` y `utils`, y se resolvió validando correctamente las referencias del DOM, importando tipos con `import type` y usando funciones dedicadas para renderizar, buscar y mostrar estados. También se apoyó en la separación de responsabilidades para evitar mezclar lógica con presentación.
