//************************************ Fichier Javascript pour l'ajout de publication **************************************


// Fonction qui met la date du jour comme valeur de date dans le formulaire
function GererDate() 
{
    document.getElementById('date').value = new Date().toLocaleDateString();
}

// Fonction qui  prend en parametre le titre, l'auteur, la date et le contenu puis ajoute une publicationavec ces informations
function AjouterPublication(titreParam, auteurParam, dateParam, contenuParam) {
    fetch('http://localhost:3000/publications', {
        method: 'POST',
        body: JSON.stringify({
            titre: titreParam,
            auteur: auteurParam,
            datePublication: dateParam,
            contenu: contenuParam
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    .then(response => {
        console.log(response.status);
        return response.json();
    })
    .then(json => console.log(json))
    .catch(err => console.log(err));
}

// Fonction qui se déclenche quand l'utilisateur appuie sur le bouton d'envoi , appelle la fonction AjouterPublication et redirige l'utilisateur vers l'accueil

$(document).ready(function(){
    $('#publicationForm').submit(function(e){
        e.preventDefault(); 
        $('<div></div>').appendTo('body')
            .html('<div><h6>Confirmez-vous l\'envoi de cette publication ?</h6></div>')
            .dialog({
                modal: true, 
                title: 'Confirmation-Publication',
                zIndex: 10000,
                autoOpen: true,
                width: 'auto',
                resizable: false,
                buttons: {
                    Oui: function () {
                        $(this).dialog("close");
                        let titre = document.getElementById('titre').value;
                        let auteur = document.getElementById('auteur').value;
                        GererDate(); 
                        let date = document.getElementById('date').value; 
                        let contenu = document.getElementById('contenu').value; 
                        AjouterPublication(titre, auteur, date, contenu);
                        window.location.href="index.html"
                    },
                    Non: function () {
                        $(this).dialog("close");
                    }
                },
                close: function (event, ui) {
                    $(this).remove();
                }
            });
    });
});