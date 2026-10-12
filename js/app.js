/**
 * Manual y Guía de Vector Embeddings - Script Principal
 *
 * Módulos:
 *   initTheme, initNavigation, initSearch, initCodeCopy,
 *   initProgressTracking, initEmbeddingsDemo (mock embeddings), initMobileMenu
 *
 * Convenciones de localStorage:
 *   embeddings_guide_theme       -> 'dark' | 'light'
 *   embeddings_read_sections -> ["conceptos", ...]
 *
 * Aviso de seguridad: ninguna función abre sockets ni lanza procesos stdio.
 * El wizard simula la generación de embeddings y recuperación de documentos.
 */

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initSearch();
    initCodeCopy();
    initProgressTracking();
    initEmbeddingsDemo();
    initMobileMenu();
});

/* ==========================================================================
   1. Theme Management (Dark / Light Mode)
   ========================================================================== */
function initTheme() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = document.getElementById('theme-icon');
    const themeText = document.getElementById('theme-text');

    const savedTheme = localStorage.getItem('embeddings_guide_theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeUI(savedTheme);

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('embeddings_guide_theme', newTheme);
            updateThemeUI(newTheme);
        });
    }

    function updateThemeUI(theme) {
        if (themeIcon && themeText) {
            if (theme === 'dark') {
                themeIcon.textContent = '🌙';
                themeText.textContent = 'Modo Oscuro';
            } else {
                themeIcon.textContent = '☀️';
                themeText.textContent = 'Modo Claro';
            }
        }
    }
}

/* ==========================================================================
   2. Navigation & SPA Routing via Hash
   ========================================================================== */
function initNavigation() {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.doc-section');
    const currentCrumb = document.getElementById('current-crumb');

    function activateSection(targetId, updateHash = true) {
        if (!targetId) targetId = 'inicio';

        sections.forEach(sec => sec.classList.remove('active'));
        navItems.forEach(item => item.classList.remove('active'));

        const targetSection = document.getElementById(targetId);
        const targetNavItem = document.querySelector(`.nav-item[data-target="${targetId}"]`);

        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });

            if (targetNavItem) {
                targetNavItem.classList.add('active');
                if (currentCrumb) {
                    currentCrumb.textContent = targetNavItem.querySelector('.nav-text')?.textContent || targetId;
                }
            }

            if (updateHash) {
                history.pushState(null, null, `#${targetId}`);
            }

            // Track reading progress
            saveProgress(targetId);
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const target = item.getAttribute('data-target');
            activateSection(target);
            document.querySelector('.sidebar')?.classList.remove('mobile-open');
        });
    });

    window.addEventListener('popstate', () => {
        const hash = window.location.hash.replace('#', '');
        activateSection(hash || 'inicio', false);
    });

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        activateSection(initialHash, false);
    } else {
        activateSection('inicio', false);
    }
}

/* ==========================================================================
   3. Real-time Search Filter
   ========================================================================== */
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const navGroups = document.querySelectorAll('.nav-group');
    const navItems = document.querySelectorAll('.nav-item');

    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        navItems.forEach(item => {
            const text = item.textContent.toLowerCase();
            const matches = text.includes(query);
            item.style.display = matches ? 'flex' : 'none';
        });

        navGroups.forEach(group => {
            const visibleChildren = group.querySelectorAll('.nav-item');
            const hasVisible = Array.from(visibleChildren).some(child => child.style.display !== 'none');
            group.style.display = hasVisible ? 'block' : 'none';
        });
    });
}

/* ==========================================================================
   4. Code Copy to Clipboard
   ========================================================================== */
function initCodeCopy() {
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', async () => {
            const wrapper = btn.closest('.code-wrapper');
            const codeBlock = wrapper ? wrapper.querySelector('code') : null;

            if (codeBlock) {
                try {
                    await navigator.clipboard.writeText(codeBlock.innerText);
                    const originalText = btn.innerHTML;
                    btn.innerHTML = '✓ ¡Copiado!';
                    btn.style.backgroundColor = 'var(--accent-primary)';
                    btn.style.color = '#fff';

                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.style.backgroundColor = '';
                        btn.style.color = '';
                    }, 2000);
                } catch (err) {
                    btn.textContent = '❌ Error';
                }
            }
        });
    });
}

/* ==========================================================================
   5. Reading Progress Tracking
   ========================================================================== */
const TOTAL_SECTIONS = 7; // sin contar inicio ni el wizard demo

function saveProgress(sectionId) {
    if (sectionId === 'inicio' || sectionId === 'demo') return;

    let readSections = JSON.parse(localStorage.getItem('embeddings_read_sections')) || [];
    if (!readSections.includes(sectionId)) {
        readSections.push(sectionId);
        localStorage.setItem('embeddings_read_sections', JSON.stringify(readSections));
    }
    updateProgressUI(readSections);
}

function initProgressTracking() {
    const readSections = JSON.parse(localStorage.getItem('embeddings_read_sections')) || [];
    updateProgressUI(readSections);

    const completionBtns = document.querySelectorAll('.completion-btn');
    completionBtns.forEach(btn => {
        const sectionId = btn.getAttribute('data-section');
        if (readSections.includes(sectionId)) {
            setBtnCompleted(btn);
        }

        btn.addEventListener('click', () => {
            let currentRead = JSON.parse(localStorage.getItem('embeddings_read_sections')) || [];
            if (!currentRead.includes(sectionId)) {
                currentRead.push(sectionId);
                localStorage.setItem('embeddings_read_sections', JSON.stringify(currentRead));
                setBtnCompleted(btn);
                updateProgressUI(currentRead);
            }
        });
    });
}

function setBtnCompleted(btn) {
    btn.classList.add('completed');
    btn.innerHTML = '✓ Sección Leída y Completada';
}

function updateProgressUI(readSections) {
    const valElem = document.getElementById('progress-val');
    const fillElem = document.getElementById('progress-fill');

    if (valElem && fillElem) {
        const percent = Math.min(Math.round((readSections.length / TOTAL_SECTIONS) * 100), 100);
        valElem.textContent = `${percent}%`;
        fillElem.style.width = `${percent}%`;
    }
}

/* ==========================================================================
   6. Interactive Demo «Embeddings Playground»
      Simula la generación de embeddings y recuperación de documentos.
      Sin red ni dependencias.
   ========================================================================== */
function initEmbeddingsDemo() {
    const generateBtn = document.getElementById('generate-btn');
    const searchBtn = document.getElementById('search-btn');
    const textInput = document.getElementById('text-input');
    const searchInput = document.getElementById('search-input');
    const embeddingVector = document.getElementById('embedding-vector');
    const resultsList = document.getElementById('results-list');

    // Mock embeddings database
    const mockEmbeddings = [
        {
            id: 'doc_123',
            text: 'El gato está en el tejado',
            embedding: generateMockEmbedding(),
            metadata: { category: 'animales' }
        },
        {
            id: 'doc_456',
            text: 'El perro está en el tejado',
            embedding: generateMockEmbedding(),
            metadata: { category: 'animales' }
        },
        {
            id: 'doc_789',
            text: 'El sol brilla en el cielo',
            embedding: generateMockEmbedding(),
            metadata: { category: 'naturaleza' }
        }
    ];

    // Generate embeddings mock
    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            if (!textInput.value.trim()) return;

            // Simulate embedding generation
            const mockEmbedding = generateMockEmbedding();
            renderEmbeddingVector(mockEmbedding);

            // Add to mock database
            mockEmbeddings.push({
                id: `doc_${Date.now()}`,
                text: textInput.value,
                embedding: mockEmbedding,
                metadata: { category: 'usuario' }
            });
        });
    }

    // Search mock
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            if (!searchInput.value.trim()) return;

            // Simulate search
            const queryEmbedding = generateMockEmbedding();
            const results = similaritySearch(queryEmbedding, mockEmbeddings);
            renderSearchResults(results);
        });
    }

    /**
     * Generates a mock embedding (384 dimensions, normalized)
     */
    function generateMockEmbedding() {
        const embedding = new Array(384).fill(0).map(() => Math.random() * 2 - 1);
        const magnitude = Math.sqrt(embedding.reduce((sum, val) => sum + val * val, 0));
        return embedding.map(val => val / magnitude);
    }

    /**
     * Renders the embedding vector as bars
     */
    function renderEmbeddingVector(embedding) {
        if (!embeddingVector) return;

        embeddingVector.innerHTML = '';

        // Sample 10 bars for visualization
        const sample = embedding.slice(0, 10);
        const maxVal = Math.max(...sample.map(Math.abs));

        sample.forEach(val => {
            const bar = document.createElement('div');
            bar.className = 'embedding-vector-bar';
            bar.style.width = `${(Math.abs(val) / maxVal) * 100}%`;
            bar.style.backgroundColor = val > 0 ? 'var(--accent-primary)' : 'var(--accent-cyan)';
            embeddingVector.appendChild(bar);
        });
    }

    /**
     * Simulates similarity search (mock)
     */
    function similaritySearch(queryEmbedding, embeddings) {
        return embeddings.map(doc => ({
            id: doc.id,
            text: doc.text,
            score: cosineSimilarity(queryEmbedding, doc.embedding)
        })).sort((a, b) => b.score - a.score).slice(0, 3);
    }

    /**
     * Calculates cosine similarity between two vectors
     */
    function cosineSimilarity(a, b) {
        const dotProduct = a.reduce((sum, val, i) => sum + val * b[i], 0);
        const magnitudeA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
        const magnitudeB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
        return dotProduct / (magnitudeA * magnitudeB);
    }

    /**
     * Renders search results
     */
    function renderSearchResults(results) {
        if (!resultsList) return;

        if (results.length === 0) {
            resultsList.innerHTML = '<p class="demo-results-empty">No se encontraron resultados.</p>';
            return;
        }

        resultsList.innerHTML = results.map(result => {
            return `
                <div class="demo-result-item">
                    <div class="demo-result-text">${result.text}</div>
                    <div class="demo-result-score">Similaridad: ${result.score.toFixed(2)}</div>
                </div>
            `;
        }).join('');
    }
}

/* ==========================================================================
   7. Mobile Navigation Drawer
   ========================================================================== */
function initMobileMenu() {
    const toggleBtn = document.getElementById('mobile-toggle-btn');
    const sidebar = document.querySelector('.sidebar');

    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
        });
    }
}
