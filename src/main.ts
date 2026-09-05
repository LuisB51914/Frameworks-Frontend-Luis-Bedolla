import "./styles/style.css";
import type { Gif } from "./models/gif.interface";

const MEDIA_URL = "https://media.giphy.com/media";
const gifs: Gif[] = [
  {
    id: "cat-01",
    title: "Gato programando",
    url: `${MEDIA_URL}/JIX9t2j0ZTN9S/giphy.gif`,
    username: "gifinder",
    description: "Un gato concentrado frente a una computadora, como si estuviera programando.",
    tags: ["gato", "programación", "computadora"],
    rating: "g",
  },
  {
    id: "celebration-01",
    title: "Celebración del equipo",
    url: `${MEDIA_URL}/g9582DNuQppxC/giphy.gif`,
    tags: ["equipo", "éxito", "celebración"],
    rating: "g",
  },
  {
    id: "coding-01",
    title: "Código en progreso",
    url: `${MEDIA_URL}/13HgwGsXF0aiGY/giphy.gif`,
    username: "developer",
    description: "Un desarrollador escribiendo código en su teclado, mostrando el proceso de desarrollo.",
    tags: ["código", "desarrollo", "teclado"],
    rating: "pg",
  },
  {
    id: "idea-01",
    title: "Nueva idea",
    url: `${MEDIA_URL}/l0HlRnAWXxn0MhKLK/giphy.gif`,
    tags: ["idea", "creatividad", "solución"],
    rating: "g",
  },
  {
    id: "herodreamy-01",
    title: "Dreamybrine",
    url: `${MEDIA_URL}/yz7m5pjJGnNfTr1YXJ/giphy.gif`,
    username: "gifinder",
    description: "ambatabusssss",
    tags: ["minecraft", "dreamy ", "ambatukam"],
    rating: "g",
  },
  {
    id: "angryspeed-01",
    title: "IshowSpeed Enojado",
    url: `${MEDIA_URL}/WtkSLISjPARFCVuQd5/giphy.gif`,
    username: "gifinder",
    description: "IshowSpeed crashing out",
    tags: ["IShowSpeed", "crashout", "speed"],
    rating: "g",
  },
  {
    id: "hussvalley-01",
    title: "Huss Valley",
    url: `${MEDIA_URL}/uCXY6aEuIl4aUqUXBl/giphy.gif`,
    username: "gifinder",
    description: "Huss valley",
    tags: ["folk valley", "badminton training", "fitness"],
    rating: "g",
  },
  {
    id: "hoodirony-01",
    title: "Hood Irony",
    url: `${MEDIA_URL}/hfilfTaUfzKt43uFIJ/giphy.gif`,
    username: "gifinder",
    description: "V stepped into the crowd",
    tags: ["hood irony", "like", "water"],
    rating: "g",
  },
];

const app = document.querySelector<HTMLDivElement>("#app");

if (!app) {
  throw new Error("No se encontró el elemento #app.");
}

app.innerHTML = `
<main class="app-shell">
<header class="hero">
<p class="eyebrow">EC1 - Fundamentos de TypeScript</p>
<h1>GIFinder</h1>
<p>Explora una colección local de GIFs.</p>
</header>
<form id="search-form" class="search-form">
<label for="search-input">
Buscar por título, autor o etiqueta
</label>
<div class="search-row">
<input id="search-input" name="query"
type="search" placeholder="Ejemplo: gato"
autocomplete="off" />
<button type="submit">Buscar</button>
</div>
</form>
<p id="search-status" class="status"
aria-live="polite"></p>
<section id="gif-gallery" class="gallery"
aria-label="Resultados"></section>
</main>
`;

const form = document.querySelector<HTMLFormElement>("#search-form");
const input = document.querySelector<HTMLInputElement>("#search-input");
const gallery = document.querySelector<HTMLElement>("#gif-gallery");
const status = document.querySelector<HTMLParagraphElement>("#search-status");

if (!form || !input || !gallery || !status) {
  throw new Error("No se pudo inicializar la interfaz de búsqueda.");
}

const searchForm = form;
const searchInput = input;
const gifGallery = gallery;
const searchStatus = status;

function normalizeText(value: string): string {
  return value.trim().toLocaleLowerCase("es-MX");
}

function matchesQuery(gif: Gif, query: string): boolean {
  const searchableText = [gif.title, gif.username ?? "", gif.description ?? "", ...gif.tags].join(" ");
  return normalizeText(searchableText).includes(query);
}

function searchGifs(collection: Gif[], value: string): Gif[] {
  const query = normalizeText(value);
  if (!query) {
    return [...collection];
  }
  return collection.filter((gif) => matchesQuery(gif, query));
}

function createGifCard(gif: Gif): string {
  const { title, url, username = "Autor no disponible", description = "Descripción no disponible", tags, rating } = gif;
  return `
<article class="gif-card">
<img src="${url}" alt="${title}"
loading="lazy" />
<div class="gif-card__content">
<h2>${title}</h2>
<p>${username} - Clasificación
${rating.toUpperCase()}</p>
<p>${description}</p>
<p class="tags">
${tags.map((tag) => `#${tag}`).join(" ")}
</p>
</div>
</article>
`;
}

function renderGifs(collection: Gif[]): void {
  const total = collection.length;
  const label = total === 1 ? "resultado" : "resultados";
  searchStatus.textContent = `${total} ${label}`;
  if (total === 0) {
    gifGallery.innerHTML = `
<p class="empty-state">
No se encontraron GIFs.
Prueba con otra palabra.
</p>
`;
    return;
  }
  gifGallery.innerHTML = collection.map(createGifCard).join("");
}

searchForm.addEventListener("submit", (event: SubmitEvent) => {
  event.preventDefault();
  const results = searchGifs(gifs, searchInput.value);
  renderGifs(results);
});
searchInput.addEventListener("input", () => {
  if (searchInput.value.trim() === "") {
    renderGifs(gifs);
  }
});

const firstSafeGif = gifs.find((gif) => gif.rating === "g");
console.log(`Primer GIF clasificación G: ${firstSafeGif?.title ?? "Ninguno"}`);
renderGifs(gifs);
