const livelli = [
    { categoria: "CIBO", frase: "PIZZA MARGHERITA" },
    { categoria: "PROVERBIO", frase: "CHI DORME NON PIGLIA PESCI" },
    { categoria: "FILM", frase: "IL GLADIATORE" }
];

const layout = [12, 14, 14, 12];

function loadLevel() {
    const levelIndex = document.getElementById('levelSelect').value;
    const data = livelli[levelIndex];
    document.getElementById('categoryDisplay').innerText = `CATEGORIA: ${data.categoria}`;
    
    generateBoard(data.frase);
}

function generateBoard(frase) {
    const parole = frase.split(' ');
    // Creiamo una griglia piatta di 52 celle (12+14+14+12)
    let gridData = new Array(52).fill(null);

    // Logica semplificata: mettiamo la frase partendo dalla seconda riga (indice 12)
    let cursor = 13; // Inizia un po' spostato per centrare
    
    frase.split('').forEach(char => {
        if(cursor < 52) {
            gridData[cursor] = char === ' ' ? null : char;
            cursor++;
        }
    });

    // Disegniamo fisicamente le caselle
    let cellIndex = 0;
    layout.forEach((count, rowIndex) => {
        const rowElement = document.getElementById(`row-${rowIndex + 1}`);
        rowElement.innerHTML = '';
        
        for (let i = 0; i < count; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            const contenuto = gridData[cellIndex];
            if (contenuto !== null) {
                tile.classList.add('active');
                // Nascondiamo la lettera inizialmente (meccanica di gioco)
                tile.dataset.letter = contenuto; 
                tile.innerText = ""; // Vuoto finché non indovini
            }
            
            rowElement.appendChild(tile);
            cellIndex++;
        }
    });
}

// Inizializza il primo livello
window.onload = loadLevel;
