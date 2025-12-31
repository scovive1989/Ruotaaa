const livelli = [
    { id: 1, categoria: "LIGABUE", frase: "IN UN SUO DISCO URLA CONTRO IL CIELO"},
    { id: 2, categoria: "CUCINA", frase: "LASAGNE AL FORNO" },
    { id: 3, categoria: "GEOGRAFIA", frase: "GRAN SASSO" },
    { id: 4, categoria: "PROVERBI", frase: "MEGLIO TARDI CHE MAI" },
    { id: 5, categoria: "CITTÀ", frase: "MILANO MARITTIMA" },
    { id: 6, categoria: "STORIA", frase: "GIULIO CESARE" },
    { id: 7, categoria: "FILM", frase: "IL GLADIATORE" }
];

const rowCaps = [12, 14, 14, 12];

function init() {
    const list = document.getElementById('levels-list');
    if(!list) return;
    
    renderLevels(livelli);

    // LOGICA DI RICERCA: Filtra i bottoni in tempo reale
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toUpperCase();
            // Filtra cercando sia nella categoria che nell'ID (opzionale)
            const filtered = livelli.filter(l => l.categoria.includes(term));
            renderLevels(filtered);
        });
    }
}

// Funzione per disegnare la lista dei bottoni (usata anche per il filtro)
function renderLevels(dataArray) {
    const list = document.getElementById('levels-list');
    if (!list) return;
    
    list.innerHTML = '';
    dataArray.forEach((liv) => {
        const originalIndex = livelli.findIndex(l => l.id === liv.id);
        
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.innerText = `LIV. ${liv.id}: ${liv.categoria}`;
        btn.onclick = () => startGame(originalIndex);
        list.appendChild(btn);
    });
}

function startGame(idx) {
    document.getElementById('home-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    const data = livelli[idx];
    document.getElementById('categoryDisplay').innerText = data.categoria;
    
    setupBoard(data.frase);
    setupKeyboard();
}

// NUOVA FUNZIONE: Rivela tutta la frase
function revealSolution() {
    if(!confirm("Vuoi visualizzare la soluzione completa?")) return;
    
    const activeTiles = document.querySelectorAll('.tile.active');
    activeTiles.forEach(tile => {
        const letter = tile.dataset.letter;
        if (letter) {
            tile.innerText = letter;
            tile.style.backgroundColor = "white";
        }
    });

    // Disabilita i tasti per indicare che il gioco è terminato
    const keys = document.querySelectorAll('.key');
    keys.forEach(k => k.disabled = true);
}

function setupBoard(frase) {
    const words = frase.split(' ');
    let rowsData = [[], [], [], []];
    let currRow = 1;

    // 1. Distribuzione parole sulle righe
    words.forEach(w => {
        if (rowsData[currRow].join(' ').length + w.length + 1 > rowCaps[currRow]) {
            currRow++;
        }
        if (currRow < 4) rowsData[currRow].push(w);
    });

    // 2. Generazione fisica delle caselle
    for (let i = 0; i < 4; i++) {
        const tr = document.getElementById(`row-${i+1}`);
        tr.innerHTML = '';
        
        const txt = rowsData[i].join(' ');
        const pad = Math.floor((rowCaps[i] - txt.length) / 2);
        const totalSlots = 14; 
        
        for (let j = 0; j < totalSlots; j++) {
            const td = document.createElement('td');
            
            if ((i === 0 || i === 3) && (j === 0 || j === 13)) {
                td.className = 'tile offset-tile';
            } else {
                td.className = 'tile';
                const charIndex = (i === 0 || i === 3) ? (j - 1 - pad) : (j - pad);
                const char = txt[charIndex];

                if (char && char !== ' ') {
                    td.classList.add('active');
                    td.dataset.letter = char;
                }
            }
            tr.appendChild(td);
        }
    }
}

function setupKeyboard() {
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(l => {
        const b = document.createElement('button');
        b.className = 'key';
        b.innerText = l;
        b.onclick = () => {
            b.disabled = true;
            const targets = document.querySelectorAll(`.tile[data-letter="${l}"]`);
            targets.forEach(t => {
                t.innerText = l;
                t.style.backgroundColor = "white";
            });
        };
        kb.appendChild(b);
    });
}

window.onload = init;
