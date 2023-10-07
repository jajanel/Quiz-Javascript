//Ici on met toutes les fonctions qui ne servent pas à faire afficher du texte en HTML.
/**
 * Fonction qui prend un array et shuffle les question selon algorithm Fisher-Yates
 * @param array
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Fonction qui prend un array et shuffle les question selon algorithm Fisher-Yates
 * @returns {*[]}
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
 * à déplacer, pas encore utilisée
 */
function msgSelonScore(score){
    let laStringDeTexte = "";
    if (score > 0 && score < 30){
        laStringDeTexte = "vous êtes vraiment nul ! Il va falloir réviser encore...";
    } else if ( score >= 30 && score < 60){
        laStringDeTexte = "Vous auriez quand même pu faire mieux... Aller hop, on révise !";
    } else if (score >= 60 && score < 70){
        laStringDeTexte = "Vous êtes dans la moyenne! Vous pouvez certainement vous améliorer!";
    } else if (score >= 70 && score < 85){
        laStringDeTexte = "Vous êtes bon, mais vous pouvez faire encore mieux !";
    } else if (score >= 85 && score < 95){
        laStringDeTexte = "Vous êtes très bon! Bravo !";
    } else if (score >= 95 && score <= 100){
        laStringDeTexte = "Vous êtes excellent ! C'est presque parfait!";
    } else if (score == 100){
        laStringDeTexte = "Vous êtes parfait ! C'est sans fautes !";
    }
    return laStringDeTexte;
}

