const livelli = [
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
    list.innerHTML = '';
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
    
    const words = data.frase.split(' ');
    let rowsData = [[], [], [], []];
    let currRow = 1;

    words.forEach(w => {
        if (rowsData[currRow].join(' ').length + w.length + 1 > rowCaps[currRow]) currRow++;
        if (currRow < 4) rowsData[currRow].push(w);
    });

    for (let i = 0; i < 4; i++) {
        const tr = document.getElementById(`row-${i+1}`);
        tr.innerHTML = '';
        const txt = rowsData[i].join(' ');
        const pad = Math.floor((rowCaps[i] - txt.length) / 2);

        for (let j = 0; j < rowCaps[i]; j++) {
            const td = document.createElement('td');
            td.className = 'tile';
            const char = txt[j - pad];
            if (char && char !== ' ') {
                td.classList.add('active');
                td.dataset.letter = char;
            }
            tr.appendChild(td);
        }
    }
    setupKeyboard();
}
function setupBoard(frase) {
    const words = frase.split(' ');
    let rowsData = [[], [], [], []];
    let currRow = 1;

    // Distribuzione parole
    words.forEach(w => {
        if (rowsData[currRow].join(' ').length + w.length + 1 > rowCaps[currRow]) currRow++;
        if (currRow < 4) rowsData[currRow].push(w);
    });

    for (let i = 0; i < 4; i++) {
        const tr = document.getElementById(`row-${i+1}`);
        tr.innerHTML = '';
        
        const txt = rowsData[i].join(' ');
        const pad = Math.floor((rowCaps[i] - txt.length) / 2);

        // Tutte le righe ora hanno 14 slot nel DOM per allinearsi perfettamente
        const totalSlots = 14; 
        
        for (let j = 0; j < totalSlots; j++) {
            const td = document.createElement('td');
            td.className = 'tile';

            // LOGICA DEL SALTO (Riga 1 e 4)
            // Se siamo nella riga 1 o 4, la prima (0) e l'ultima (13) cella sono vuote
            if ((i === 0 || i === 3) && (j === 0 || j === 13)) {
                td.classList.add('offset-tile');
            } else {
                // Calcoliamo la lettera per le caselle centrali
                // Nelle righe 1 e 4, lo slot "0" del testo corrisponde al j=1
                const charIndex = (i === 0 || i === 3) ? j - 1 - pad : j - pad;
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
            targets.forEach(t => t.innerText = l);
        };
        kb.appendChild(b);
    });
}

window.onload = init;
