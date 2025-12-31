const livelli = [
    { id: 2, categoria: "CUCINA", frase: "LASAGNE AL FORNO" },
    { id: 3, categoria: "GEOGRAFIA", frase: "GRAN SASSO" },
    { id: 4, categoria: "PROVERBI", frase: "MEGLIO TARDI CHE MAI" },
    { id: 5, categoria: "CITTÀ", frase: "MILANO MARITTIMA" },
    { id: 6, categoria: "STORIA", frase: "GIULIO CESARE" },
    { id: 7, categoria: "FILM", frase: "AVATAR LA VIA DELL ACQUA" },
    { id: 8, categoria: "CUCINA", frase: "RISOTTO ALLO ZAFFERANO" }
];

const capacities = [12, 14, 14, 12];

function init() {
    const list = document.getElementById('levels-list');
    livelli.forEach((liv, index) => {
        const btn = document.createElement('button');
        btn.className = 'level-btn';
        btn.innerText = `LIV. ${liv.id}: ${liv.categoria}`;
        btn.onclick = () => startGame(index);
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

function showHome() {
    document.getElementById('home-screen').classList.remove('hidden');
    document.getElementById('game-screen').classList.add('hidden');
}

function setupBoard(frase) {
    const words = frase.split(' ');
    let rows = [[], [], [], []];
    let curr = 1;

    words.forEach(w => {
        if (rows[curr].join(' ').length + w.length + 1 > capacities[curr]) curr++;
        if (curr < 4) rows[curr].push(w);
    });

    for (let i = 0; i < 4; i++) {
        const el = document.getElementById(`row-${i+1}`);
        el.innerHTML = '';
        const txt = rows[i].join(' ');
        const pad = Math.floor((capacities[i] - txt.length) / 2);

        for (let j = 0; j < capacities[i]; j++) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            const char = txt[j - pad];
            if (char && char !== ' ') {
                tile.classList.add('active');
                tile.dataset.letter = char;
            }
            el.appendChild(tile);
        }
    }
}

function setupKeyboard() {
    const kb = document.getElementById('keyboard');
    kb.innerHTML = '';
    // Tutti i 26 caratteri dell'alfabeto internazionale
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').forEach(l => {
        const b = document.createElement('button');
        b.className = 'key';
        b.innerText = l;
        b.onclick = () => {
            b.disabled = true;
            document.querySelectorAll(`.tile[data-letter="${l}"]`).forEach(t => t.innerText = l);
        };
        kb.appendChild(b);
    });
}

window.onload = init;
