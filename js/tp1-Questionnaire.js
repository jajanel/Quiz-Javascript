"use strict";

const zoneDeDonnees = document.getElementById("zoneDeDonnees");
const fieldset = creerFieldset("fieldset");
zoneDeDonnees.appendChild(fieldset);

function construireInterfaceIntro() {
    viderZoneDeDonnees();

    // Create and append the legend element
    const legend = document.createElement("legend");
    legend.textContent = "Intro";
    fieldset.appendChild(legend);

    fieldset.appendChild(creerBaliseX("h1", "titre", "Bienvenue sur le quiz JavaScript de Janelle et Raphaël"));
    fieldset.appendChild(creerBaliseX("p", "p2", "Nous vous invitons à participer à un petit jeu questionnaire qui comporte 5 questions choisies au hasard dans un ensemble de questions. Chaque question vous donnera un certain nombre de points. À la fin du quiz, vous obtiendrez votre résultat final. Bonne chance! ! 🥰 "));

    const boutonIntro = creerInput("button", "boutonIntro", "", "Commencer le quiz !", "bouton");
    fieldset.appendChild(boutonIntro);

    // Add event listener to the button
    boutonIntro.addEventListener("click", function () {
        creerNouveauJeu();
    });
}

function viderZoneDeDonnees() {
    fieldset.innerHTML = "";
}

function creerNouveauJeu() {
    const questionnaireObj = new QuestionnaireQuiz();
    const questionObj = questionnaireObj.questions;

    viderZoneDeDonnees();
    construireInterfaceQuestion(questionObj, questionnaireObj);
}

function construireInterfaceQuestion(questionObj, questionnaireObj) {
    if (questionnaireObj.indexQuestion < questionnaireObj.questions.length) {
        viderZoneDeDonnees();
        const questionObj = questionnaireObj.questions[questionnaireObj.indexQuestion];
        affichageQuestion(questionObj);
        gererBoutons();
    } else {
        construireInterfaceFinal();
    }
}




function gererBoutons(questionObj, questionnaireObj) {
    const boutonSuivant = creerInput("button", "boutonSuivant", "", "Question Suivante !", "bouton");
    fieldset.appendChild(boutonSuivant);
    boutonSuivant.addEventListener("click", function () {
        const nextQuestionObj = questionnaireObj;
        if (nextQuestionObj) {
            construireInterfaceQuestion(nextQuestionObj, questionnaireObj);
        } else {
            construireInterfaceFinal(fieldset, questionnaireObj);
        }
    });
    const boutonAbandon = creerInput("button", "boutonAbandon", "", "Abandonner", "bouton");
    fieldset.appendChild(boutonAbandon);
    boutonAbandon.addEventListener("click", function () {
            construireInterfaceAbandon(questionObj, questionnaireObj);
        }
    );
}


function affichageQuestion(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    const nbrePoints = questionObj.nbrePoints;
    const questionText = questionObj.question;
    const reponses = questionObj.reponses;
    fieldset.appendChild(creerBaliseX("h1", "p1", "Question " + (questionnaireObj + 1) + " de 5 pour " + nbrePoints + " points"));
    fieldset.appendChild(creerBaliseX("p", "p2", questionText));
    for (let i = 0; i < reponses.length; i++) {
        let choixDeReponse = creerBaliseX("p", "choix");
        choixDeReponse.appendChild(affichageChoixReponses(reponses[i], i + 1));
        fieldset.appendChild(choixDeReponse);
    }
}

function affichageChoixReponses(reponse, index) {
    let ligneReponse = document.createElement("p");
    ligneReponse.appendChild(creerInput("radio", "reponse" + index, "reponse", reponse));
    ligneReponse.appendChild(creerLabel("pRep", "reponse" + index, reponse));
    return ligneReponse;
}


function construireInterfaceFinal(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    //legend.textContent = "Résultats";
    fieldset.appendChild(creerBaliseX("h1", "titre",));
    fieldset.appendChild(creerBaliseX("p", "resultat", "", ""));
    fieldset.appendChild(creerBaliseX("p", "nombreDePoints"));
    const boutonRejouer = creerInput("button", "boutonRejouer", "", "Rejouer !", "bouton"); // Declare boutonRejouer
    fieldset.appendChild(boutonRejouer);
    gererInterfaceFinal(questionnaireObj, questionObj); // Pass questionnaireObj as an argument
}

function gererInterfaceFinal(questionnaireObj, questionObj) {
    let scoreFinal = 0;
    //questionnaireObj.calculerPoints();
    let msgEncouragement = msgSelonScore(scoreFinal);
    // TODO Créer une fonction qui va calculer le pourcentage de la note. Considerer que si l'user abandonne, c'est pas nécessairement 5 questions qu'il a répondu.
    let notePourcentage = scoreFinal / 50 * 100; // You might want to calculate this differently; it's currently a fixed percentage.

    titre.textContent = "Voici votre résultat final: ";
    resultat.textContent = "Tu as eu un score de " + scoreFinal + " points, ce qui fait une note de: " + notePourcentage + " ." + msgEncouragement;
    boutonRejouer.addEventListener("click", function () {
        creerNouveauJeu();
    });
}

function construireInterfaceAbandon(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    fieldset.appendChild(creerBaliseX("h1", "titre"));
    fieldset.appendChild(creerBaliseX("p", "resultat"));
    fieldset.appendChild(creerBaliseX("p", "nombreDePoints"));
    const boutonRejouer = creerInput("button", "boutonRejouer", "", "Rejouer !", "bouton"); // Declare boutonRejouer
    fieldset.appendChild(boutonRejouer);
    gererInterfaceAbandon(questionObj, questionnaireObj);
}

function gererInterfaceAbandon(questionObj, questionnaireObj) {
    let scoreFinal = 0;
    let msgEncouragement = msgSelonScore(scoreFinal);
    let notePourcentage = scoreFinal / 50 * 100; //TODO Créer une fonction qui va calculer le pourcentage de la note. Considerer que si l'user abandonne, c'est pas nécessairement 5 questions qu'il a répondu.
    titre.textContent = "Voici votre résultat, même si vous avez abandonné...";
    resultat.textContent = "Tu as eu un score de " + scoreFinal + " points, ce qui fait une note de: " + notePourcentage + " ." + msgEncouragement;

    boutonRejouer.addEventListener("click", function () {
        creerNouveauJeu();
    });
}

function main() {
    // Zone de données est l'id du div dans le HTML
    construireInterfaceIntro(zoneDeDonnees);
}

main();