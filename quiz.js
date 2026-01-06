/********************
 *Quiz de personalité matcha




 

// On relit le pseudo du placard (si il existe)*/

const pseudo = localStorage.getItem("matcha_user");
let hero = document.getElementById("result-hero");
//on cherche si il y a le pseudo stocker dans localStorage
if (pseudo) {
  //si je trouve le pseudo je dis COUOUC :)
  // const message = document.createElement().insertafter(hero);
  const message = document.getElementById("pseudo");
  message.style.textAlign = "center";
  message.style.color = "white";
  console.log(message);
  ("h3"); //là on met du texte pour dire coucou :)
  message.textContent =
    "Bienvenue " + //on dit coucou boubou au pseudo
    pseudo;
  // plaace ce message tout en haut de la page
  // document.body.insertBefore(message, document.body.firstChild); //là on le met en haut de la page pour qu'on puise te dire coucou en premier, COUCOU
}
/* 1) Les fiches résultats */
const OUTCOMES = {
  "matcha fraise": { label: "Matcha Fraise", desc: "Doux et sociable." },
  "matcha framboise": {
    label: "Matcha Framboise",
    desc: "Amoureux et passionné.",
  },
  "matcha mangue": { label: "Matcha Mangue", desc: "Solaire et optimiste." },
  "matcha myrtille": {
    label: "Matcha Myrtille",
    desc: "Calme et introspectif.",
  },
  "matcha gingembre": {
    label: "Matcha Gingembre",
    desc: "Franc et terre à terre.",
  },
  "matcha pêche blanche": {
    label: "Matcha Pêche blanche",
    desc: "Subtil et élégant.",
  },
  "matcha ananas": { label: "Matcha Ananas", desc: "Énergique et fun." },
  "matcha pomme": { label: "Matcha Pomme", desc: "Pratique et fiable." },
  "matcha carotte": { label: "Matcha Carotte", desc: "Original et créatif." },
  "matcha betterave": {
    label: "Matcha Betterave",
    desc: "Intense et artistique.",
  },
  "matcha poire": { label: "Matcha Poire", desc: "Apaisant, diplomate." },
  "matcha classique": {
    label: "Matcha Classique",
    desc: "Minimaliste et aventureux.",
  },
};

/* 2) LES simages */
const IMAGES = {
  "matcha fraise": "matchafraise.png",
  "matcha framboise": "matchaframboise.png",
  "matcha mangue": "matchamangue.png",
  "matcha myrtille": "matchamyrtille.png",
  "matcha gingembre": "matchagingembre.png",
  "matcha pêche blanche": "matchapecheblanche.png",
  "matcha ananas": "matchaananas.png",
  "matcha pomme": "matchapomme.png",
  "matcha carotte": "matchacarotte.png",
  "matcha betterave": "matchabetterave.png",
  "matcha poire": "matchapoire.png",
  "matcha classique": "matchaclassique.png",
};

/* 3) Petite clé pour l’historique si on veut garder les infos, sert de clef */
const LS_KEY = "matcha_results_v1";

/* 4) On cherche le bouton dans le HTML qui a id="btn".
On le garde dans une petite boîte appelée btn pour pouvoir s’en servir plus tard (par exemple quand on cliquera dessus). */
const btn = document.getElementById("btn");

/* 5) On fabrique un bloc “resultat” tout en haut*/
// let hero = document.getElementById("result-hero");
// if (!hero) {
//   //On cherche si un bloc avec l’id “result-hero” existe dans le HTML.
//   //Si oui, on le garde dans la variable hero.
//   //Si non, hero vaut null (vide).
//   hero = document.createElement("div"); // on crée une boîte
//   hero.id = "result-hero"; // on lui donne un id
//   hero.style.textAlign = "center"; // simple mise en forme inline (pas de CSS demandé)
//   const body = document.body;
//   navbar.after(hero); //pour être en dessous de la navbar
// } //on dit au navigateur “mets ma nouvelle boîte tout en haut de la page”.
hero.style.textAlign = "center";

/* 6) Quand on clique: calcul,image gagnante, scroll en haut */
btn.addEventListener("click", function () {
  //addEventListener” = "écoute quand quelque chose arrive" "click" = “le truc qu’on écoute, c’est un clicé function() { ... } = "et voici ce que tu fais quand ça arrive”
  const checkedInputs = document.querySelectorAll(
    'input[type="radio"]:checked'
  ); //Le navigateur regarde tous les éléments <input> : de type "radio" (les ronds qu’on coche dans un quiz) qui sont cochés (:checked) Le résultat, c'est une liste de réponses choisies (une par question).
  //On la range dans une petite boîte appelée checkedInputs.

  // On attend 9 réponses (q0 à q8)
  if (checkedInputs.length < 9) {
    alert("Réponds à toutes les questions avant d'avoir ton matcha !");
    return;
  } //une petite alerte pour prévenir l'utilisateur qu'il doit répondre à toutes les questions !

  // On additionne les points sans rien afficher
  const scores = {}; //On crée une boîte vide (un objet) pour stocker les points.
  checkedInputs.forEach(function (input) {
    //On parcourt toutes les réponses cochées une par une, chaque réponse est appelée input.
    const obj = JSON.parse(input.dataset.scores);
    //Chaque bouton radio dans le HTML contient un petit "paquet d’infos" caché dans data-scores (un attribut).//input.dataset.scores = le texte {"matcha fraise": 2, "matcha gingembre": 1}
    // JSON.parse(..) on transforme ce texte en vrai objet utilisable par JavaScript
    for (const parfum in obj) {
      //On parcourt tous les parfums à l’intérieur de ce petit objet (ex: "matcha fraise","matcha gingembre").
      if (!scores[parfum]) scores[parfum] = 0;
      scores[parfum] += obj[parfum];
    } //si ce parfum n'a pas encore de score, on lui met 0 au départ puis on ajoute les points qu’il gagne.
  });

  // On trouve le gagnant
  let gagnant = null; //On prépare une boîte vide pour y mettre le nom du gagnant plus tard pour l’instant, on ne sait pas encore qui c’est donc on met null (= rien).
  let meilleur = -1; //En gros on part de très bas pour être sûr de pouvoir monter.
  for (const parfum in scores) {
    //on parcourt tous les parfums (toutes les clés de l’objet scores
    if (scores[parfum] > meilleur) {
      meilleur = scores[parfum];
      gagnant = parfum;
    } //On compare le score de ce parfum avec le meilleur score qu’on a trouvé jusque-là si ce score est plus grand, alors, on met à jour meilleur (le nouveau record) et on garde le nom du parfum comme nouveau gagnant
  }

  // On récupère l’image du gagnant
  const imgSrc = IMAGES[gagnant] || "./img/placeholder.jpg"; //et ici l'image
  const fiche = OUTCOMES[gagnant] || { label: gagnant, desc: "" }; //on cherche les infos (le nom et la description) du matcha gagnant dans un autre tableau

  // On remplace le contenu du “hero” par l’image + un petit titre
  hero.innerHTML = ""; // évite que les anciens textes ou images restent affichés.
  const title = document.createElement("h2");
  title.textContent = "Ton matcha : " + fiche.label; //On crée un titre <h2> pour afficher un texte ton matcha : Matcha Fraise fiche.label = le joli nom du matcha (ex : Matcha Fraise). textContent = le texte qu’on veut voir sur la page.

  const img = document.createElement("img");
  img.src = imgSrc;
  img.alt = "Image du résultat : " + fiche.label;
  img.style.maxWidth = "100%"; // pour éviter que ça déborde
  img.style.height = "auto"; //style juste pour être sûr

  // (Option) petite description
  const p = document.createElement("p");
  p.textContent = fiche.desc;

  hero.appendChild(title);
  hero.appendChild(img);
  hero.appendChild(p);
  hero.style.opacity = "1";

  // On scrolle en haut pour montrer l’image
  // vers le bloc résultat
  hero.scrollIntoView({ behavior: "smooth", block: "start" });

  // Sauvegarde historique (sans les détails à l’écran)
  const deja = localStorage.getItem(LS_KEY) || "[]";
  //je regarde dans le tiroir du navigateur (localStorage) s’il y a déjà des anciens résultats localStorage.getItem(LS_KEY) = ouvre le tiroir qui s’appelle LS_KEY || "[]" = si le tiroir est vide, je prends une boîte vide à la place JSON.parse(...) = je transforme ce que je lis en vraie boîte que je peux manipuler dans le code
  deja.push({ at: new Date().toISOString(), winner: gagnant }); // ça ajoute une nouvelle ligne dans la boîte avec la date daj et le nom du gagnant
  localStorage.setItem(LS_KEY, stringify(deja)); //je remets la boîte dans le tiroir du navigateur pour m'en souvenir plus tard
});
