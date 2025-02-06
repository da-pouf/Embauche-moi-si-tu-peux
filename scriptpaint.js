// Code JS pour le paint

// Fonction pour actualiser le champ de valeur à droite des sliders
function Actualiser_valeur(nombre) {
  const slider = document.getElementById(`slider${nombre}`);
  const valeur = document.getElementById(`valeur${nombre}`);
  if (slider && valeur) {
    valeur.value = slider.value; // Mets à jour la valeur de l'input avec celle du slider
  }
  var binded = document.getElementById("binder-valeurs").value;

  // Si les sliders sont liés, synchronise leur valeur
  if (binded === "true" && nombre === 1) {
    document.getElementById("valeur2").value = document.getElementById("valeur1").value;
    Actualiser_slider(1); // Actualise alors aussi les sliders
    Actualiser_slider(2);
  }
  if (binded === "true" && nombre === 2) {
    document.getElementById("valeur1").value = document.getElementById("valeur2").value;
    Actualiser_slider(1);
    Actualiser_slider(2);
  }
  Actualiser_couleur(); // Actualise la couleur car cette focntion concerne aussi tous les sliders de couleurs et donc le carré
}

// Fonction pour actualiser les sliders si la valeur du champ de valeur à droite est modifiée
function Actualiser_slider(nombre) {
  const slider = document.getElementById(`slider${nombre}`);
  const valeur = document.getElementById(`valeur${nombre}`);

  if (slider && valeur) {
    slider.value = valeur.value; // Mets à jour la valeur du slider avec celle de l'input
  }
  var binded = document.getElementById("binder-valeurs").value;

  // Si les sliders sont liés, synchronise les deux sliders
  if (binded === "true" && nombre === 1) {
    document.getElementById("slider2").value = document.getElementById("slider1").value;
    Actualiser_valeur(1);//idem qu'en haut dans l'autre focntion
    Actualiser_valeur(2);
  }
  if (binded === "true" && nombre === 2) {
    document.getElementById("slider1").value = document.getElementById("slider2").value;
    Actualiser_valeur(1);
    Actualiser_valeur(2);
  }
  Actualiser_couleur(); // Actualise la couleur car cela concerne encore une fois les sliders de couleurs et donc le carré
}

// Fonction pour lier ou délier les sliders et changer la couleur du bouton
function Actualiser_binder() {// en anglais car moche en francais et pas à l'aise( choix arbitraire)
  var bouton = document.getElementById("binder-valeurs");
  var binded = bouton.value;

  if (binded === "false") {
    bouton.value = "true"; //change de valeur le liage
    bouton.style.backgroundColor = "green"; // Change la couleur du bouton
  } else {
    bouton.value = "false";
    bouton.style.backgroundColor = "red";
  }
  Actualiser_slider(1);
  Actualiser_slider(2);
}

function setcouleur(couleur) {//boutons pour definir une couleur spéciale ( noir et blanc)
  if (couleur === 'noir') {
    document.getElementById('slider3').value = 0;
    document.getElementById('slider4').value = 0;
    document.getElementById('slider5').value = 0;
    document.getElementById('slider6').value = 1;
  } else if (couleur === 'blanc') {
    document.getElementById('slider3').value = 255;
    document.getElementById('slider4').value = 255;
    document.getElementById('slider5').value = 255;
    document.getElementById('slider6').value = 1;
  }
  Actualiser_valeur(3);
  Actualiser_valeur(4);
  Actualiser_valeur(5);
  Actualiser_valeur(6);
}


// Fonction pour actualiser la couleur basée sur les sliders
function Actualiser_couleur() {
  const rouge = document.getElementById("slider3").value || 0;//signifie que si il a un probleme et qu'il ne trouve pas, il va prendre la valeur 0
  const vert = document.getElementById("slider4").value || 0;
  const bleu = document.getElementById("slider5").value || 0;
  const alpha = document.getElementById("slider6").value || 1;//l'oppacité de la couleur:0-->transparent, 1-->opaque  
  document.getElementById('carre_couleur').style.backgroundColor = `rgba(${rouge},${vert},${bleu},${alpha})`; // Mets à jour la couleur du carré
}

// Variables pour gérer le dessin du rectangle sur le canvas
const canvas = document.querySelector(".canvas");
const ctx = canvas.getContext("2d");

let rectangleTemp = null;//commence par être innexistant
let deplace_rect = false;//par defaut on ne deplace pas le rectangle
let gribouillage = [];  // Tableau pour stocker les points de gribouillage


// Fonction pour générer un rectangle qui suivra la soursi
let sauvegardeImage = null; // Stocke l'état du canvas

function sauvegarderCanvas() {
  sauvegardeImage = new Image();
  sauvegardeImage.src = canvas.toDataURL(); // Capture le canvas sous forme d'image
}

function generer() {
  const hauteur = parseInt(document.getElementById('slider1').value) || 0;
  const largeur = parseInt(document.getElementById('slider2').value) || 0;
  const rouge = parseInt(document.getElementById('slider3').value) || 0;
  const vert = parseInt(document.getElementById('slider4').value) || 0;
  const bleu = parseInt(document.getElementById('slider5').value) || 0;
  const alpha = parseFloat(document.getElementById('slider6').value) || 1;

  if (hauteur > 0 && largeur > 0) {
    sauvegarderCanvas(); // Sauvegarde l'état actuel du canvas

    rectangleTemp = {
      largeur: largeur,
      hauteur: hauteur,
      couleur: `rgba(${rouge},${vert},${bleu},${alpha})`,
      x: 0,
      y: 0
    };
    deplace_rect = true; // Active le mode deplacement du rectangle
  } else {
    alert("Dimensions non valides! Veuillez choisir une valeur supérieure à 0.");
  }
}

// Écouteur d'événement pour déplacer le rectangle temporaire avec la souris
canvas.addEventListener("mousemove", function(event) {
  if (deplace_rect && rectangleTemp) {
    const infoscanva = canvas.getBoundingClientRect();
    rectangleTemp.x = event.clientX - infoscanva.left;
    rectangleTemp.y = event.clientY - infoscanva.top;
    reafficher_canva(); // Réaffiche le rectangle
  }
});

// Écouteur d'événement pour "poser" le rectangle sur le canvas au clic
canvas.addEventListener("click", function() {
  if (deplace_rect && rectangleTemp) {
    // Ajouter le rectangle finalisé au tableau
    deplace_rect = false; // Désactive le mode "dragging"
    reafficher_canva(); // Réaffiche le canvas correctement
  }
});

// Fonction pour redessiner le canvas à chaque mise à jour
function reafficher_canva() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas

  // Réappliquer l'image sauvegardée (ancienne version du canvas)
  if (sauvegardeImage) {
    ctx.drawImage(sauvegardeImage, 0, 0);
  }

  // Dessiner le rectangle temporaire
  ctx.fillStyle = rectangleTemp.couleur;
  ctx.fillRect(rectangleTemp.x, rectangleTemp.y, rectangleTemp.largeur, rectangleTemp.hauteur);

  if (!deplace_rect) {
    rectangleTemp = null; // Réinitialise le rectangle temporaire quand on arrete de deplacer  
  }
}


// Fonctions de dessin supplémentaires (gribouillage)
const infoscanva = canvas.getBoundingClientRect();

var dessiner = false;

// Fonction de dessin
function draw(e) {
  if (!dessiner) {
    return;
  }

  // Initialisation de la ligne de dessin (couleur, largeur, forme)
  const rouge = parseInt(document.getElementById('slider3').value) || 0;
  const vert = parseInt(document.getElementById('slider4').value) || 0;
  const bleu = parseInt(document.getElementById('slider5').value) || 0;
  const alpha = parseFloat(document.getElementById('slider6').value) || 1;
  const epaisseur = parseInt(document.getElementById('slider7').value) || 1;

  ctx.strokeStyle = `rgba(${rouge},${vert},${bleu},${alpha})`; // Définit la couleur de la ligne
  ctx.lineWidth = epaisseur; // Définit l'épaisseur de la ligne
  ctx.lineCap = "round"; // Définit la forme de la ligne (arrondie)

  // Calcul des coordonnées du prochain point
  let X = (e.clientX - infoscanva.left) * (canvas.width / infoscanva.width);
  let Y = (e.clientY - infoscanva.top) * (canvas.height / infoscanva.height);

  // Dessine la ligne
  ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
}

// Événements de dessin (début, fin, et mouvement de la souris)
canvas.addEventListener("mousedown", function(e) {
  ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
  dessiner = true; // Active le dessin
});

canvas.addEventListener("mouseup", function() {
  dessiner = false; // Arrête le dessin
});

canvas.addEventListener("mouseout", function() {
  dessiner = false; // Arrête le dessin quand la souris quitte le canvas
});

// Dessine pendant que la souris est en mouvement
canvas.addEventListener("mousemove", draw);

// Fonction pour effacer le canvas
function effacer() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Efface le canvas
  sauvegarderCanvas(); // Sauvegarde l'état du canvas
}

// Fonction pour télécharger le dessin du canvas
function telecharger() {
  const image = canvas.toDataURL("image/png"); // Convertit le canvas en image PNG

  const lien_telechargement = document.createElement("a");
  lien_telechargement.href = image; // Crée un lien pour télécharger l'image
  lien_telechargement.download = "dessin.png"; // Définit le nom du fichier
  lien_telechargement.click(); // Lance le téléchargement
}

