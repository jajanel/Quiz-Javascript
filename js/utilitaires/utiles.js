/**
 * Méthode qui prend en paramètre un array et qui shuffle les question selon l'algorithme Fisher-Yates.
 * @param array Un array passé en paramètre
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Fonction qui prend le fichier JSON et qui tranforme chacune des question JSON en un objet Question.
 * @returns {*[]} Le tableau de 5 objets questions aléatoires.
 * @constructor
 */
function JSONaObjectJS() {
    let tableauDesQuestions = [];
    for (const question of tabAssQuestions) {
        tableauDesQuestions.push(new Question(question.question, question.reponses, question.bonneReponse, question.nbrePoints)); // Push each question object into the new array
    }
    shuffleArray(tableauDesQuestions);

    return tableauDesQuestions.slice(0, 5);

}

/**
 * Fonction qui retourne un message selon le score
 * @param pourcentage - le pourcentage de la note
 * @returns {string} - le message selon le score
 */
function msgSelonScore(pourcentage){
    let laStringDeTexte = "";
    if (pourcentage > 0 && pourcentage < 30){
        laStringDeTexte = "Vous êtes vraiment nul ! Il va falloir réviser encore...";
    } else if (pourcentage < 60){
        laStringDeTexte = " Vous auriez quand même pu faire mieux... Aller hop, on révise !";
    } else if (pourcentage < 70){
        laStringDeTexte = " Vous êtes dans la moyenne! Vous pouvez certainement vous améliorer!";
    } else if ( pourcentage < 85){
        laStringDeTexte = " Vous êtes bon, mais vous pouvez faire encore mieux !";
    } else if (pourcentage < 95){
        laStringDeTexte = " Vous êtes très bon! Bravo !";
    } else if (pourcentage < 100){
        laStringDeTexte = " Vous êtes excellent ! C'est presque parfait!";
    } else if (pourcentage == 100){
        laStringDeTexte = " Vous êtes parfait ! C'est sans fautes !";
    }
    return laStringDeTexte;
}


function styleBonneReponse(valeurChecked, question) {
    let id = document.getElementById(valeurChecked);
    id.style.color = "green";
    id.innerText += " ✔️";
    this._nombreDePoints += question.nbrePoints;
}

function styleMauvauseReponse(valeurChecked) {
    let id = document.getElementById(valeurChecked);
    id.style.color = "red";
    id.innerText += " ❌";
    id.style.textDecoration = "line-through";
}
