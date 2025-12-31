const livelli = [
    { categoria: "CIBO", frase: "PIZZA MARGHERITA" },
    { categoria: "PROVERBIO", frase: "CHI DORME NON PIGLIA PESCI" },
    { categoria: "CINEMA", frase: "IL GLADIATORE" },
    { categoria: "GEOGRAFIA", frase: "STATI UNITI D AMERICA" }
];

const rowCapacities = [12, 14, 14, 12];

function loadLevel() {
    const levelIndex = document.getElementById('levelSelect').value;
    const data = livelli[levelIndex];
    document.getElementById('categoryDisplay').innerText = `CATEGORIA: ${data.categoria}`;
    
    distributePhrase(data.frase);
}

function distributePhrase(frase) {
    const parole = frase.split(' ');
    let rows = [[], [], [], []];
    let currentRow = 1; // Iniziamo solitamente dalla seconda riga (quella da 14) per estetica

    parole.forEach(parola => {
        // Se la parola non sta nella riga attuale, passa alla successiva
        const spazioRimanente = rowCapacities[currentRow] - rows[currentRow].join('').length - (rows[currentRow].length > 0 ? 1 : 0);
        
        if (parola.length > spazioRimanente) {
            currentRow++;
        }

        if (currentRow < 4) {
            rows[currentRow].push(parola);
        }
    });

    renderBoard(rows);
}

function renderBoard(rowsData) {
    for (let i = 0; i < 4; i++) {
        const rowElement = document.getElementById(`row-${i + 1}`);
        rowElement.innerHTML = '';
        const capacity = rowCapacities[i];
        
        // Uniamo le parole della riga con uno spazio e centriamo
        const rigaTesto = rowsData[i].join(' ');
        const paddingLeft = Math.floor((capacity - rigaTesto.length) / 2);

        for (let j = 0; j < capacity; j++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            const charIndex = j - paddingLeft;
            const carattere = rigaTesto[charIndex];

            if (carattere && carattere !== ' ') {
                tile.classList.add('active');
                tile.innerText = carattere; // Per ora mostriamo la lettera, puoi svuotarlo per il gioco
            }

            rowElement.appendChild(tile);
        }
    }
}

window.onload = loadLevel;
