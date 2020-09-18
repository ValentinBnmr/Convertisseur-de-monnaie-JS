const selectBox = document.querySelector('select');
const valDepart = document.querySelector('#valeur-depart');
const resultatsAffichage = document.querySelector('.resultats');
let options = [];
let valeurSelect;
let tauxEnCours;

//Affiche 1EUR = x monnaie
valDepart.value = 1;

function arondir (x){
   return Math.round(x * 100) / 100;
}


//Appel de l'API
fetch("https://api.exchangeratesapi.io/latest")
    .then(reponse => reponse.json())
    .then(data => {
        // console.log(data);
        //Injection de tous les taux monétaire
        for(const property in data.rates){
            options.push(`<option>${property}</option>`)
        }
        console.log(options);
        selectBox.innerHTML = options.join('');
        valeurSelect = selectBox.value;
        APICall(valeurSelect);
    })


async function APICall(val){

    const resultatsAPI = await fetch(`https://api.exchangeratesapi.io/latest?symbols=${val}`);
    const resultats = await resultatsAPI.json();

    valeurSelect = val;
    tauxEnCours = resultats.rates[valeurSelect];
    resultatsAffichage.innerText = `1 EUR = ${ arondir(resultats.rates[valeurSelect])} ${valeurSelect}`;
}

valDepart.addEventListener('input', (e) => {

    if(e.target.value < 1) {
        e.target.value = 1;
    } 
    else {
        let conversionFinale = arondir(e.target.value * tauxEnCours);
        resultatsAffichage.innerText = `${e.target.value} EUR = ${conversionFinale} ${valeurSelect}`;
    }

})

selectBox.addEventListener('input', (e) => {
    // console.log(e.target.value);
    APICall(e.target.value)
})

// Scroll reveal 
const sr = ScrollReveal({
    duration: 1500
});
sr.reveal('h1');

sr.reveal('.box')