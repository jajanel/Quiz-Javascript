"use strict";

let indexCourrantQuestion = 0;
const unObjetQuestionnaireQuiz = new QuestionnaireQuiz();
const unObjetQuestions = unObjetQuestionnaireQuiz.questions[indexCourrantQuestion];

function construireInterfaceIntro(baliseZoneDeDonnees) {
    baliseZoneDeDonnees.innerHTML = "";
    baliseZoneDeDonnees.appendChild(creerBaliseX("h1", "titre", "Bienvenue sur le quiz JavaScript de Janelle et Raphaël"));
    baliseZoneDeDonnees.appendChild(creerBaliseX("p", "p1", "Jeu Questionnaire "));
    baliseZoneDeDonnees.appendChild(creerBaliseX("p", "p2", "Nous vous invitons à participer à un petit jeu questionnaire qui comporte 5 questions choisies au hasard dans un ensemble de questions. Chaque question vous donneras un certain nombre de points. À la fin du quiz, vous obtiendrez votre résultat final. Bonne chance! ! 🥰 "));
    baliseZoneDeDonnees.appendChild(creerInput("button", "boutonIntro", "", "Commencer le quiz !", "bouton"));
    gererInterfaceIntro(baliseZoneDeDonnees);
}

function gererInterfaceIntro(baliseZoneDeDonnees) {
    boutonIntro.addEventListener("click", function () {
        construireInterfaceQuestionnaire(baliseZoneDeDonnees, unObjetQuestions);
    });
}

function construireInterfaceQuestionnaire(baliseZoneDeDonnees, questionObj) {
    

}

function gererInterfaceQuestion(questionObj, questionnaireObj, baliseZoneDeDonnees) {
    let boutonNextQuestion = rectangle.appendChild(creerInput("button", "bouton", "", "Passez à la question suivante", ""));
    boutonNextQuestion.addEventListener("click", function () {
        construireInterfaceQuestionnaire(baliseZoneDeDonnees, questionObj);
    });

}


function construireInterfaceFinal(baliseZoneDeDonnees) {
    baliseZoneDeDonnees.innerHTML = "";
    baliseZoneDeDonnees.appendChild(creerBaliseX("h1", "titre"));
    baliseZoneDeDonnees.appendChild(creerBaliseX("p", "resultat"));
    baliseZoneDeDonnees.appendChild(creerBaliseX("p", "nombreDePoints"));

    baliseZoneDeDonnees.appendChild(creerInput("button", "boutonRejouer", "", "Rejouer !", ""));
    gererInterfaceFinal(baliseZoneDeDonnees);
}


function gererInterfaceFinal(baliseZoneDeDonnees) {
    baliseZoneDeDonnees.innerHTML = "";
    let scoreFinal = QuestionnaireQuiz.calculerPoints();
    let msgEncouragement = msgSelonScore(scoreFinal);
    // TODO Créer une fonction qui va calculer le pourcentage de la note. Considerer que si l'user abandonne, c'est pas 5 questions qu'il a répondu.
    let notePourcentage = scoreFinal / 50 * 100;

    titre.textContent = "Voici les résultats du quiz :o)";
    resultat.textContent = "Tu as eu un score de " + scoreFinal + " points, ce qui fait une note de: "+ notePourcentage +" ." + msgEncouragement;
    boutonRejouer.addEventListener("click", function () {
        construireInterfaceIntro(baliseZoneDeDonnees);
    });

}


function construireInterfaceAbandon(baliseZoneDeDonnees) {
    baliseZoneDeDonnees.innerHTML = "";
    baliseZoneDeDonnees.appendChild(creerBaliseX("h1", "titre"));
    baliseZoneDeDonnees.appendChild(creerBaliseX("p", "resultat"));
    baliseZoneDeDonnees.appendChild(creerBaliseX("p", "nombreDePoints"));

    baliseZoneDeDonnees.appendChild(creerInput("button", "boutonRejouer", "", "Rejouer !", ""));
    gererInterfaceAbandon(baliseZoneDeDonnees);
}

function gererInterfaceAbandon(baliseZoneDeDonnees) {
    baliseZoneDeDonnees.innerHTML = "";
    let scoreFinal = QuestionnaireQuiz.calculerPoints();
    let msgEncouragement = msgSelonScore(scoreFinal);
    let notePourcentage = scoreFinal / 50 * 100; //Peut-être créer une fonction ? Si l'user abandonne c'est pas nécéssairement 5 questions.

    titre.textContent = "Voici votre résultat, même si vous avez abandonné :o)";
    resultat.textContent = "Tu as eu un score de " + scoreFinal + " points, ce qui fait une note de: "+ notePourcentage +" ." + msgEncouragement;
    boutonRejouer.addEventListener("click", function () {
        construireInterfaceIntro(baliseZoneDeDonnees);
    });
}


function main() {
    //Zone de données est l'id du div dans le html
    construireInterfaceIntro(zoneDeDonnees);
}

main();

