// Variables pour gérer le dessin
const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let brushColor = 'black'; // Couleur par défaut
let brushSize = 5; // Taille du tracé par défaut

// Commencer à dessiner
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    draw(e); // Démarre le dessin dès le clic
});

// Arrêter le dessin
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath(); // Nouvelle ligne après avoir relâché la souris
});

// Arrêter le dessin quand la souris quitte le canvas
canvas.addEventListener('mouseleave', () => {
    drawing = false;
});

// Fonction de dessin avec mousemove
canvas.addEventListener('mousemove', draw);

// Fonction pour dessiner
function draw(e) {
    if (!drawing) return; // Ne dessine que si le bouton de la souris est enfoncé

    // Paramètres du tracé
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    // Position de la souris dans le canvas
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Tracer la ligne
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

// Changer la couleur du pinceau quand on clique sur un cercle
document.querySelectorAll('.color').forEach(item => {
    item.addEventListener('click', event => {
        brushColor = event.target.getAttribute('data-color');
    });
});

// Changer la taille du pinceau avec le slider
document.getElementById('brushSize').addEventListener('input', event => {
    brushSize = event.target.value;
});

// Effacer le canvas
document.getElementById('clearCanvas').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Télécharger le contenu du canvas en tant qu'image
document.getElementById('saveCanvas').addEventListener('click', () => {
    const link = document.createElement('a');
    link.download = 'canvas_image.png'; // Nom du fichier téléchargé
    link.href = canvas.toDataURL('image/png'); // Convertir le contenu du canvas en data URL
    link.click(); // Simuler un clic pour démarrer le téléchargement
});

// Sauvegarder l'image dans le local storage
document.getElementById('saveLocal').addEventListener('click', () => {
    const canvasData = canvas.toDataURL(); // Convertir le canvas en URL encodée
    localStorage.setItem('savedCanvas', canvasData); // Sauvegarder dans le local storage
    alert('Canvas sauvegardé dans le navigateur.');
});

// Restaurer l'image depuis le local storage
document.getElementById('restoreLocal').addEventListener('click', () => {
    const savedCanvas = localStorage.getItem('savedCanvas');
    if (savedCanvas) {
        const img = new Image(); // Créer une nouvelle image
        img.src = savedCanvas; // Utiliser les données sauvegardées
        img.onload = function () {
            ctx.drawImage(img, 0, 0); // Dessiner l'image sur le canvas
        }
    } else {
        alert('Aucune image sauvegardée trouvée.');
    }
});
