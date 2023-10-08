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

function calculerPoucentage(scoreFinal, nbrQuestionRepondue){
    //TODO VARIABLE DU NOMBRE DE POINTS ACCUMULÉ ET VARIABLE DU NOMBRE DE QUESTIONS RÉPONDUES (YA CLAIREMENT QUELQUE CHOSE À FAIRE AVEC INDEX E QUESTION -1 OU JSP ON VERRA)
    // DIVISÉ PAR NOMBRE DE QUESTION JSP COMMENT FAIRE UN POURCENTAGE.
}






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

