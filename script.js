// Code JS


// Fonction pour afficher les résultats de la recherche et surligner le texte
function AfficherResultat() {
  const searchTerm = document.getElementById('input-recherche').value.toLowerCase(); // pour éviter la "casse", on passe tout en minuscules 
  const pages = document.querySelectorAll('body'); // Selectionne tout le body


  // Applique le surlignage uniquement pour le texte recherché
  pages.forEach(page => { // boucle bornée (la meme chose que for page in pages: XXX en python pour l'analogie)
    const elements = page.querySelectorAll('*'); // Sélectionne tous les éléments dans le body
    elements.forEach(element => {
      if (element.childNodes.length) {
        element.childNodes.forEach(child => {
          if (child.nodeType === Node.TEXT_NODE) {
            const textContent = child.nodeValue;

            // Si le texte contient le terme de recherche, on le surligne
            if (textContent.toLowerCase().includes(searchTerm)) {
              const highlightedText = textContent.replace(new RegExp(searchTerm, 'gi'), `<span style="background-color: #ADD8E6;">$&</span>`);
              const span = document.createElement('span');
              span.innerHTML = highlightedText; // Ajoute le texte surligné dans un élément span
              element.replaceChild(span, child); // Remplace le texte original par le texte surligné
            }
          }
        });
      }
    });
  });
}


// Fonction pour gérer la navigation vers un autre lien
function clic(loc) {
  window.location.href = loc; // Change l'URL de la page pour celle spécifiée par 'loc'
}


// Easter egg avec la loupe (recuperer, deplacer et reposer la loupe)
var loupe = false;
function attrape_loupe() {
  loupe = true;
  document.querySelector('.logoloupe').style.display = "none";
  document.getElementById("loupe_suiveuse").style.display = "inline-block";
}

function poser_loupe() {
  if (loupe) {
    loupe = false;
    document.getElementById("loupe_suiveuse").style.display = "none";
    document.querySelector('.logoloupe').style.display = "inline-block";
  }
}

document.addEventListener("mousemove", function(e) {
  const loupe_suiveuse = document.getElementById("loupe_suiveuse");
  loupe_suiveuse.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Easter egg avec la loupe (trouver le secret sucré)
easter_egg = document.querySelector('.container-egg');
easter_egg.addEventListener("mousemove", function() {
  if (loupe) {
    document.querySelector('.easter-egg').style.display = "block";
  }
});


// Gestion du menu de sélection des CV (Jean ou Nathan)
function choixcv() {
  let choix = document.getElementById("menu-cvs").value;

  if (choix == "J") {
    document.querySelector('.cv-de-jean').style.display = "block"; // Affiche le CV de Jean
    document.querySelector('.cv-de-nathan').style.display = "none"; // Cache le CV de Nathan
  } else if (choix == "N") {
    document.querySelector('.cv-de-nathan').style.display = "block"; // Affiche le CV de Nathan
    document.querySelector('.cv-de-jean').style.display = "none"; // Cache le CV de Jean
  }
}

// Gestion du menu de sélection des métiers (Jean ou Nathan)
function choixmetier() {//même modèle que pour les CVs
  let choix = document.getElementById("menu-metiers").value;

  if (choix == "J") {
    document.getElementById("metier_de_Jean").style.display = "block"; // Affiche le métier de Jean
    document.getElementById("metier_de_Nathan").style.display = "none"; // Cache le métier de Nathan
  } else if (choix == "N") {
    document.getElementById("metier_de_Nathan").style.display = "block"; // Affiche le métier de Nathan
    document.getElementById("metier_de_Jean").style.display = "none"; // Cache le métier de Jean
  }
}


function tuto() {
  // Importe tous les elements
  const slidlong = document.querySelector('.encadre_slider_longueur');
  const boutxtra = document.querySelector('.boutons_extras');
  const blcclr = document.querySelector('.bloc_couleur');
  const cadrgen = document.querySelector('.encadré_bouton_generer');
  const cadrwidth = document.querySelector('.encadré_slider_epaisseur_tracé');
  const cadrdwnld = document.querySelector('.encadré_bouton_telecharger');
  const cadrefc = document.querySelector('.encadré_bouton_effacer');
  const dsin = document.querySelector('.dessin');

  slidlong.style.display = "none";
  boutxtra.style.display = "none";
  blcclr.style.display = "none";
  cadrgen.style.display = "none";
  cadrwidth.style.display = "none";
  cadrdwnld.style.display = "none";
  cadrefc.style.display = "none";
  dsin.style.display = "none";



  // Afficher les éléments progressivement avec des délais
  setTimeout(function() {
    alert("Cette page va nous permettre d'illustrer nos capacités hors-du-commun et pourquoi vous devez à tout prix nous embaucher.\n Voici une présentation des différents éléments de la page et de leur fonction");
    slidlong.style.display = "block";
  }, 100);

  setTimeout(function() {
    alert("Permet de séléctionner la hauteur et la largeur des formes");
    boutxtra.style.display = "flex";
  }, 200);

  setTimeout(function() {
    alert("Ce sont les boutons permettant des actions spéciales: lier les valeurs de longueurs, mettre la couleur à noir ou blanc");
    blcclr.style.display = "flex";
  }, 300);

  setTimeout(function() {
    alert("Ceci est le bloc permettant de séléctionner la couleur de la forme ou du crayon");
    cadrgen.style.display = "block";
  }, 400);

  setTimeout(function() {
    alert("Ce bouton permet de générer une forme, en déplaçant la souris sur le canvas et en cliquant, cela la placera");
    cadrwidth.style.display = "block";
  }, 500);

  setTimeout(function() {
    alert("Ce slider vous permet de choisir l'épaisseur du trait du crayon");
    cadrdwnld.style.display = "block";
  }, 600);

  setTimeout(function() {
    alert("Ce bouton permet de télécharger l'image du dessin afin de pouvoir exposer votre travail d'artiste");
    cadrefc.style.display = "block";
  }, 700);

  setTimeout(function() {
    alert("Ce bouton permet d'effacer le champ de dessin, il est le bouton sur lequel appuiera automatiquement votre chat");
    dsin.style.display = "flex";
  }, 800);

  setTimeout(function() {
    alert("Ceci est la zone de dessin, il est vide au départ et c'est là que vous pourrez laisser votre âme d'artiste prendre le dessus");
  }, 900);
}