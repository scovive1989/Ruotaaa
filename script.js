const layout = [12, 14, 14, 12];

function generateBoard() {
    layout.forEach((count, index) => {
        const rowElement = document.getElementById(`row-${index + 1}`);
        rowElement.innerHTML = ''; // Pulisce
        
        for (let i = 0; i < count; i++) {
            const tile = document.createElement('div');
            tile.classList.add('tile');
            
            // Esempio: rendiamo alcune caselle bianche (attive) casualmente
            if (Math.random() > 0.5) {
                tile.classList.add('active');
            }
            
            rowElement.appendChild(tile);
        }
    });
}

// Inizializza al caricamento
window.onload = generateBoard;
