// ************************************** Fichier Javascript pour le blogPost ************************************************************

const params = new URLSearchParams(window.location.search);
const publicationId = params.get('id');

// Fonction qui va chercher une publication correspondant à l'id puis l'affiche en faisant appelle à remplirBlog
function getPublicationDetails(publicationId) {
    fetch(`http://localhost:3000/publications/${publicationId}`)
    .then(response => response.json())
    .then(json => remplirBlog(json))
    .catch(err => console.log(err));
}

// Fonction qui prend en parametre une publication puis l'affiche en respectant la mise en forme de l'article
function remplirBlog(publication) {
    let titreElement = `<h2>${publication.titre}</h2>`;
    let contenuElement = `<p>${publication.contenu}</p>`;
    let auteurElement = `<h4>Article écrit et publié par : ${publication.auteur}</h4>`;
    let dateElement = `<h4>Date de publication  :${publication.datePublication}</h4>`;

    document.getElementById('titreBlog').innerHTML = titreElement;
    document.getElementById('contenuBlog').innerHTML += contenuElement;
    document.getElementById('auteurBlog').innerHTML += auteurElement;
    document.getElementById('dateBlog').innerHTML += dateElement;
}

// Fonction qui va chercher les commentaires correspondant à l'id de la publication
function getCommentairesDetails(publicationId) {
    fetch(`http://localhost:3000/commentaires`)
    .then(response => response.json())
    .then(json => {
        let commentaires = json.filter(commentaire => commentaire.publicationID === publicationId);
        remplirCommentaires(commentaires);
    })
    .catch(err => console.log(err));
}

// Fonction qui prend en parametre un tableau de commentaires puis l'affiche en respectant la mise en forme des commentaires
function remplirCommentaires(commentaires) {
    const groupCommentsElement = document.getElementById('groupComments');
    groupCommentsElement.innerHTML = ''; 

    commentaires.forEach(commentaire => {
        let miseEnForme = `
            <div class="row mb-3">
                <div class="col-1">
                    <div class="card border-dark text-center">
                        <img src="images/personne1.png" class="card-img-top mx-auto mt-3" alt="Image internaute 1." class="classLog">
                    </div>
                </div>
                <div class="col">
                    <div class="d-flex align-items-start">
                        <p>${commentaire.contenu}</p>
                        <p class="ms-auto">Publié le : ----- ${commentaire.datePublication} -----</p>
                    </div>
                </div>
            </div>`;
        groupCommentsElement.innerHTML += miseEnForme;
    });
}

// Fonction qui prend en parametre l'id de la publication, la date et le contenu puis ajoute un commentaire
function AjouterCommentaire(publicationIDParam, dateParam, contenuParam) {
    fetch('http://localhost:3000/commentaires', {
        method: 'POST',
        body: JSON.stringify({
            publicationID: publicationIDParam,
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

// Fonction qui se déclenche quand l'utilisateur appuie sur le bouton d'envoi puis appelle la fonction AjouterCommentaire
$(document).ready(function(){
    $('#commentForm').submit(function(e){
        e.preventDefault(); 
        $('<div></div>').appendTo('body')
            .html('<div><h6>Confirmez-vous l\'envoi de ce commentaire ?</h6></div>')
            .dialog({
                modal: true, 
                title: 'Confirmation-Commentaire',
                zIndex: 10000,
                autoOpen: true,
                width: 'auto',
                resizable: false,
                closeText: '<span class="ui-icon ui-icon-closethick"></span>',
                buttons: {
                    Oui: function () {
                        $(this).dialog("close"); 
                        let contenuCom = document.getElementById('commentaire').value; 
                        AjouterCommentaire(publicationId, new Date().toLocaleDateString(), contenuCom);
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

getPublicationDetails(publicationId);
getCommentairesDetails(publicationId);
