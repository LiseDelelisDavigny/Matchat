document.addEventListener('DOMContentLoaded', () => { // Déclaration des filtres et des cartes
    const filtres = Array.from(document.querySelectorAll('.filtres input[type="checkbox"]'));
    const cards = Array.from(document.querySelectorAll('.card-item'));

    filtres.forEach(box => box.addEventListener('change', applyFilters)); // box c'est la boite avec toutes les données, avec 'change' on va appeler la fonction dès que une case et cchée ou décochée.


    // la fonction sert à check toutes les cases cochées
    function applyFilters() { 

        const activeFilters = filtres.reduce((acc, box) => { // reduce sert a regarder les filtres un par un
            if (box.checked) {
                if (!acc[box.name]) acc[box.name] = []; // acc = accumulateur, là ou on range les résultats
                acc[box.name].push(box.value);
            }
            return acc;
        }, {});


        // Cherche si il doit montrer ou non la carte
        cards.forEach(card => { // On regarde chaque carte une par une
            let isVisible = true;

            for (const [filterName, filterValues] of Object.entries(activeFilters)) { // on regarde tous les filtres ACTIFS avec leurs valeurs
                const cardData = card.dataset[filterName]; // Est ce que la carte à une info qui correspond au filtre ?
                if (!cardData) { // si "Non" alors elle ne correspond pas au filtre
                    isVisible = false; 
                    break;
                }

                const cardValues = cardData.split(',').map(value => value.trim()); // on transforme la liste en tableau (split le créé, map ) (trim pr enlever les espaces au cas où)
                if (!filterValues.some(value => cardValues.includes(value))) { // est ce qu'au moins des valeurs du filtre est dans la carte ?
                    isVisible = false;
                    break
                }
            }

            if (isVisible) { // Si oui, on enlève hidden (qui se trouve dans le css) donc on montre la carte !!
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    }
});


// Ouverture du modal
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

// fonction pr fermer le modal
const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// ferme quand la page ou le btn fermer est cliqué 
closeModalBtn.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);


// Ouvre le modal
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);




let listePanier = document.getElementById("listePanier");
let totalPanier = document.getElementById("totalPanier");

let produit1 = document.getElementById("produit1");
let produit2 = document.getElementById("produit2");
let produit3 = document.getElementById("produit3");
let produit4 = document.getElementById("produit4");
let produit5 = document.getElementById("produit5");
let produit6 = document.getElementById("produit6");
let produit7 = document.getElementById("produit7");
let produit8 = document.getElementById("produit8");
let produit9 = document.getElementById("produit9");
let produit10 = document.getElementById("produit10");
let produit11 = document.getElementById("produit11");
let produit12= document.getElementById("produit12");


// Full reset pour tester
localStorage.clear();

function getLocalStorage(key, isNumber) { //?
  let item = localStorage.getItem(key);
  console.log("item: ", item);

  if (isNumber) {
    return parseInt(item);
  } else {
    return item;
  }
}

function addToCart(idProduit, nomProduit, prixProduit, imageProduit) {
  let localStorageTotal = getLocalStorage("totalPanier", true);
  // console.log("localStorageTotal: ", localStorageTotal);

  if (!localStorageTotal) {
    localStorage.setItem(`totalPanier`, 0);
    localStorageTotal = getLocalStorage("totalPanier", true);
    // console.log("created new localStorageTotal: ", localStorageTotal);
  }

  let localStorageProduit = getLocalStorage(`produit${idProduit}`, true);
  // console.log("localStorageProduit: ", localStorageProduit);

  if (!localStorageProduit) {
    localStorage.setItem(`produit${idProduit}`, 0);
    localStorageProduit = getLocalStorage(`produit${idProduit}`, true);
    // console.log("created new localStorageProduit: ", localStorageProduit);
  }

  let newQuantite = (localStorageProduit += 1);
  // console.log("newQuantite: ", newQuantite);
  let newTotal = (localStorageTotal += prixProduit).toFixed(2);
  // console.log("newTotal: ", newTotal);

  let listProduit = document.getElementById(`listProduit${idProduit}`);
  if (listProduit) {
    let quantiteProduit = document.getElementById(`quantite-${idProduit}`);
    quantiteProduit.textContent = newQuantite;
  } else {
    let newElementList = document.createElement("li");
    newElementList.id = `listProduit${idProduit}`;
    newElementList.innerHTML = `<img src="${imageProduit}" style="height:100px; width:100px;">`;
    newElementList.innerHTML += `<span> ${nomProduit} </span>`;
    newElementList.innerHTML += `<span id="quantite-${idProduit}"> ${newQuantite} </span>`;
    listePanier.appendChild(newElementList);
  }

  localStorage.setItem(`produit${idProduit}`, newQuantite);
  localStorage.setItem(`totalPanier`, newTotal);

  totalPanier.textContent = `Total : ${newTotal}€`;
}