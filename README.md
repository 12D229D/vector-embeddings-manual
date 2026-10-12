# 🧠 EMBEDDINGS — Manual y Guía de Vector Embeddings

SPA interactiva (HTML5 semántico + CSS3 Vanilla + JS ES6+) que documenta cómo
**generar, almacenar y recuperar embeddings** con tecnologías web nativas.

- **100% sin dependencias**: cero `node_modules`, cero build step, cero
  frameworks. Solo `index.html` + `css/styles.css` + `js/app.js`.
- **100% segura**: ninguna demo abre sockets ni lanza procesos stdio.
  La sección `#demo` simula todo con respuestas mockeadas.
- **Reutiliza el design system** del `manual-frontend-html5` (slate + indigo)
  con componentes temáticos de embeddings: `.embedding-vector` (visualización de
  embeddings como barras).

---

## 🚀 Cómo abrir y navegar el manual

Es HTML/CSS/JS 100% estático. Cualquiera de estas opciones vale:

```bash
# Opción A — doble clic en index.html (file://)
# Opción B — servidor estático desde la carpeta del proyecto
cd "C:/Users/IGD/Dropbox/Copias de seguridad/Codex/EMBEDDINGS"
python -m http.server 8003
# luego abre http://localhost:8003
```

> Alternativa opcional: `npx serve .` (requiere Node; no es la vía canónica del repositorio).

---

## 🧭 Tabla de hashes (navegación SPA)

| Hash                | Título                            | Contenido clave                                                                              |
|---------------------|-----------------------------------|----------------------------------------------------------------------------------------------|
| `#inicio`           | Inicio y Resumen                  | Qué son embeddings, por qué existen, cómo usar el manual                         |
| `#conceptos`        | Conceptos Clave                   | Vector embeddings, similaridad coseno, RAG                                                  |
| `#generacion`       | Generación de Embeddings          | Modelos como `all-MiniLM-L6-v2`, parámetros, normalización                            |
| `#almacenamiento`  | Almacenamiento de Embeddings      | FAISS/Chroma, índices, particiones                                                  |
| `#recuperacion`     | Recuperación de Embeddings        | `similarity_search`, k-NN, filtros                                                  |
| `#esquemas`         | Esquemas JSON                     | Estructura de embeddings, ejemplos de consultas                                           |
| `#casos`            | Casos de Uso                      | RAG, búsqueda semántica, recomendación de contenido                                      |
| `#demo`             | Embeddings Playground              | Demo: genera embeddings mock y simula recuperación de documentos                     |

---

## ✨ Features de la UI

- [x] Sidebar con buscador en vivo y barra de progreso de lectura
- [x] Navegación SPA con `#hash` y soporte back/forward (`popstate`)
- [x] Modo claro/oscuro persistente (`localStorage` → clave `embeddings_guide_theme`)
- [x] Copia de bloques de código al portapapeles
- [x] "Marcar como leída" por sección → recalcula el % de progreso (clave `embeddings_read_sections`)
- [x] Demo «Embeddings Playground» que simula generación de embeddings y recuperación de documentos
- [x] Componente visual `.embedding-vector` (representación de embeddings como barras)
- [x] Responsive: sidebar colapsable en móvil (< 992px) con overlay

---

## 🔒 Precauciones de seguridad

- Ninguna demo de este manual abre sockets ni lanza procesos stdio.
- La demo «Embeddings Playground» simula todo con **respuestas mockeadas**.
- Los ejemplos de almacenamiento FAISS/Chroma explican los **riesgos** (no exponer
  servidores de embeddings a internet).

---

## 🗂️ Estructura de archivos

```text
EMBEDDINGS/
├── index.html          # SPA por secciones (#hash), sidebar + buscador + demo embebida
├── css/
│   └── styles.css      # Design tokens slate/indigo + layout + componente `.embedding-vector`
├── js/
│   └── app.js          # initTheme, initNavigation, initSearch, initCodeCopy,
│                       #   initProgressTracking, initEmbeddingsDemo (mock embeddings), initMobileMenu
├── README.md           # Este archivo
└── plan.md             # Bitácora y plan de ruta del subproyecto
```

Sin `assets/`, `scripts/`, `components/`, `examples/` ni backend: sigue el patrón SPA
monolítico vanilla de los manuales hermanos
(`manual-frontend-html5`, `manual-zcode-html5`, `📚 Manual-IA-HTML5`).

---

## 📖 Referencias técnicas

- [Sentence Transformers — Documentation](https://sentence-transformers.com/)
- [FAISS — Documentation](https://faiss.ai/)
- [Chroma — Documentation](https://chroma.com/)
- [Vector Embeddings — Conceptos](https://en.wikipedia.org/wiki/Vector_embedding)
- [Similaridad Coseno — Wikipedia](https://en.wikipedia.org/wiki/Cosine_similarity)
- [RAG — Retrieval-Augmented Generation](https://en.wikipedia.org/wiki/Retrieval-Augmented_Generation)

---

## 🧱 Convenciones

- **Idioma**: español.
- **Semántica y SEO**: HTML5 semántico, un único `<h1>` por página, IDs únicos.
- **100% vanilla**: cero `node_modules`, cero build. Los embeddings reales se
  documentan con pseudocódigo Multi-SDK; la demo es un mock en JS puro.
- **Cumple `AGENTS.md`**: no instalar paquetes npm en la raíz del repo.
