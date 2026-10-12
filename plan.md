# Plan y Bitácora — Manual y Guía de Vector Embeddings en HTML5

## 📌 Resumen

SPA interactiva (HTML5 semántico + CSS3 Vanilla + JS ES6+, 100% sin dependencias, sin 
ode_modules, sin build step) que documenta cómo **generar, almacenar y recuperar embeddings** vectoriales con tecnologías web nativas, métricas de similitud y proyecciones semánticas.

Todo el proyecto vive dentro de la carpeta EMBEDDINGS/ cumpliendo AGENTS.md.

---

## 🎯 Objetivos

- [x] Proveer una SPA responsiva, accesible y de alto nivel visual sobre **embeddings**.
- [x] Explicar generación de embeddings (modelos Transformer), almacenamiento en bases vectoriales y cálculo de similitud coseno / distancia euclidiana.
- [x] Mostrar esquemas de metadatos vectoriales y ejemplos de búsquedas por k-vecinos más cercanos (k-NN).
- [x] Incluir una **demo interactiva** que simula cálculo de distancias y similitud semántica en el navegador.
- [x] Tema claro/oscuro persistente, hash routing SPA, buscador y progreso de lectura.

---

## 🏗️ Arquitectura de Archivos

- **Patrón**: SPA modular interactiva sin dependencias con motor matemático en JS puro.

`	ext
EMBEDDINGS/
├── index.html        # SPA con guía completa de embeddings y simulador de similitud
├── css/
│   └── styles.css    # Sistema de diseño dark/light y glassmorphism
├── js/
│   └── app.js        # Lógica SPA, calculador de similitud coseno y buscador
├── README.md         # Documentación de uso
└── plan.md           # Plan de desarrollo y bitácora
`

---

## 🧠 Paradigma de Programación

- **Híbrido: Declarativo + Event-Driven**
- Vistas declarativas y reactividad por eventos DOM para el cálculo dinámico de similitudes.

---

## 🌐 Propósito de Visibilidad y Destino Remoto

- **Visibilidad**: Público (Open Source / Portafolio).
- **Plataforma Remota Asignada**: GitHub.
- **Plataforma de Despliegue CI/CD**: GitHub Pages / Cloudflare Pages.
- **Justificación**: Guía abierta y simulador interactivo de embeddings vectoriales para aplicaciones de IA y búsqueda semántica; perfecto para GitHub Pages.

---

## 📊 Estado Actual

🟢 **Completado** — Entregable funcional y verificado.
