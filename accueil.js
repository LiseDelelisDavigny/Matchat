const carouselItems = document.querySelectorAll(".carousel_item");
let i = 1;

setInterval(() => {
  // Pour accéder à tous les "items" du carousel
  Array.from(carouselItems).forEach((item, index) => {
    if (i < carouselItems.length) {
      item.style.transform = `translateX(-${i * 100}%)`;
    }
  });

  if (i < carouselItems.length) {
    console.log("dernière condition");
    i++;
  } else {
    i = 0;
  }
}, 5000);

// Script pour les pseudos

//  1)  ceci attrape le bouton et le champ
// document.getElementById("start") = ça va a chercher l’élément qui a cet id dans le HTML.
const bouton = document.getElementById("start");
const champ = document.getElementById("pseudo");

// quand on clique sur le bouton
bouton.addEventListener("click", function () {
  // on lit ce qu’il y a écrit dans le champ
  // .value = ce que la personne a tapé
  const pseudo = champ.value.trim(); // trim() = enlève les espaces inutiles (si jamais)

  //so le champs c’est vide ça bloque
  if (!pseudo) {
    alert("Veuillez écrire votre pseudo.");
    return; // fin de cette condition
  }

  //  le pseudo se range le pseudo dans localStorage
  // localStorage = un peu comme le placard des donnés de notre site
  // setItem("clé", valeur) = range la donnée sous ce nom
  localStorage.setItem("matcha_user", pseudo);

  // un message dans la console (juste pour les devs pour voir si ça marche)
  console.log("Pseudo enregistré :", pseudo);

  // ensuite onnn redirige vers la page du quiz
  // Remplace "quiz.html" par le vrai nom de la page, met un # jusqu'à qu'on commence a vraiment relier les pages
  window.location.href = "quiz.html";
});
