// *************************************** Fichier Javascript pour l'acceuil : index.html *************************************************

// Fonctions qui va chercher toutes les publications
function fournirPublication() 
{
    fetch('http://localhost:3000/publications')
    .then(response => response.json())
    .then(json => remplirPage(json))
}

// Fonction qui prend en parametre un tableau de publications puis affiche les publications une par une en respectant la mise en forme
function remplirPage(publications) 
{
    for(let i = 0; i <publications.length; i++)
    {
        let miseEnForme = `<div class="col-md-3">
        <a href="blogPost.html?id=${publications[i].id}" class="card-link">
    <div class="card mb-3">
        <img src="images/ai.png" class="card-img-top" alt="image ai">
        <div class="card-body testClick">
            <h5 class="card-title">${publications[i].titre}</h5>
            <p class="card-text">${publications[i].description}</p>
        </div>
    </div>
</a>
    </div>`;
    document.getElementById("groupCard1").innerHTML +=miseEnForme;
        
    }

}

fournirPublication();

