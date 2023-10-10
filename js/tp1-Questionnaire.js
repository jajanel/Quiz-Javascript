"use strict";
const zoneDeDonnees = document.getElementById("zoneDeDonnees");
const legend = document.createElement("legend");
const fieldset = creerFieldset("fieldset");
zoneDeDonnees.appendChild(fieldset);

let indexCourrantQuestion = -1;
let verificationReponseFaite = false;
let abandon = false;


/**
 * Construit et controle l'interface de l'introduction au quiz.
 */
function construireInterfaceIntro() {
    viderZoneDeDonnees();
    legend.textContent = "Intro";
    fieldset.appendChild(legend);

    fieldset.appendChild(creerBaliseX("h1", "titre", "Bienvenue sur le quiz JavaScript de Janelle et Raphaël"));
    fieldset.appendChild(creerBaliseX("p", "p2", "Nous vous invitons à participer à un petit jeu questionnaire qui comporte 5 questions choisies au hasard dans un ensemble de questions. Chaque question vous donnera un certain nombre de points. À la fin du quiz, vous obtiendrez votre résultat final. Bonne chance! 🥰 "));

    const boutonIntro = creerInput("button", "boutonIntro", "", "Commencer le quiz !", "bouton");
    fieldset.appendChild(boutonIntro);
    boutonIntro.addEventListener("click", creerNouveauJeu);
}

function viderZoneDeDonnees() {
    fieldset.innerHTML = "";
}

/**
 * Méthode qui crée un nouveau jeu, remet à 0 lorsqu'on clique sur le bouton "Commencer le quiz !" ou "Rejouer !"
 */
function creerNouveauJeu() {
    indexCourrantQuestion = -1;
    viderZoneDeDonnees();
    const questionnaireObj = new QuestionnaireQuiz();
    verificationQuestionSuivante(questionnaireObj);
}

/**
 * Méthode qui vérifie que faire en selon si l'utilisateur a répondu à toutes les questions ou non.
 * @param questionnaireObj l'objet questionnaire
 */
function verificationQuestionSuivante(questionnaireObj) {
    indexCourrantQuestion++;
    verificationReponseFaite = false;
    abandon = false;
    const questionObj = questionnaireObj.questions[indexCourrantQuestion];
    affichageQuestion(questionObj, questionnaireObj);
    gererBoutons(questionnaireObj);
}


/**
 * Méthode qui affiche le bouton "Vérifier la réponse" et qui verifie la réponse après le clic du bouton.
 * @param questionnaireObj l'ojet questionnaire
 */
function afficherBoutonVerifier(questionnaireObj) {
    const boutonVerifier = creerInput("button", "boutonVerifier", "", "Vérifier le resultat", "bouton");
    fieldset.appendChild(boutonVerifier);
    boutonVerifier.addEventListener("click", function () {
        verifierSiQuestionSelectionnee(questionnaireObj);
    });
}

/**
 * Méthode qui sort la valeur de la réponse sélectionnée.
 * @param questionnaireObj l'objet questionnaire
 */
function verifierSiQuestionSelectionnee(questionnaireObj) {
    let listeReponse = document.querySelectorAll("input");
    let reponseSelectionee = null;
    for (let rep of listeReponse) {
        if (rep.checked) {
            reponseSelectionee = rep.value;
        }
    }
    questionSuivanteVerif(reponseSelectionee, questionnaireObj);
}


/**
 * Méthode qui vérifie si la réponse selectionne est bonne ou non, additionne les points et desactive les boutons radios.
 * Verifie si la réponse n'a pas été selctionnée.
 * @param reponseSelectionee la reposne selectionnée
 * @param questionnaireObj l'objet questionnaire
 */
function questionSuivanteVerif(reponseSelectionee, questionnaireObj) {
    if (verificationReponseFaite) {

    } else {
        if (reponseSelectionee === null) {
            alert("Veuillez choisir une réponse ou abandonner !");
        } else {
            let questionObj = questionnaireObj.questions[indexCourrantQuestion];
            const laBonneReponse = questionObj.bonneReponse.value;
            questionnaireObj.verifierBonneReponse(questionObj, reponseSelectionee);

            questionnaireObj.nombreDePointsMax += questionObj.nbrePoints;
            verificationReponseFaite = true;
            radioDesactives();

            const boutonVerifier = document.getElementById("boutonVerifier");

            if (indexCourrantQuestion === questionnaireObj.questions.length - 1) {
                boutonVerifier.value = "Voir les résultats";
                boutonVerifier.addEventListener("click", function () {
                    construireInterfaceResultats(questionnaireObj);
                });
                boutonAbandon.remove();
            } else {
                boutonVerifier.value = "Question Suivante !";
                boutonVerifier.removeEventListener("click", verifierSiQuestionSelectionnee);
                boutonVerifier.addEventListener("click", function () {
                    verificationQuestionSuivante(questionnaireObj);
                });
            }
        }
    }
}

/**
 * Méthode qui gère l'affichage des boutons "Vérifier la réponse" et "Abandonner".
 * @param questionnaireObj l'objet questionnaire
 */
function gererBoutons(questionnaireObj) {
    afficherBoutonVerifier(questionnaireObj);
    const boutonAbandon = creerInput("button", "boutonAbandon", "", "Abandonner", "bouton");
    fieldset.appendChild(boutonAbandon);
    boutonAbandon.addEventListener("click", function () {
        abandon = true;
        construireInterfaceResultats(questionnaireObj);
    });
}


/**
 * Méthode qui affiche le titre de la question, la question et les choix de réponses.
 * @param questionObj l'objet question
 * @param questionnaireObj l'objet questionnaire
 */
function affichageQuestion(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    let pluriel = pointsPluriel(questionObj);
    legend.textContent = "Questionnaire";
    fieldset.appendChild(legend);


    fieldset.appendChild(creerBaliseX("h1", "p1", "Question " + (indexCourrantQuestion + 1) + " de 5 pour " + questionObj.nbrePoints + " point" + pluriel + " :"));
    fieldset.appendChild(creerBaliseX("p", "p2", questionObj.question));

    for (let i = 0; i < questionObj.reponses.length; i++) {
        let choixDeReponse = creerBaliseX("p", "choix");
        choixDeReponse.appendChild(affichageChoixReponses(questionObj.reponses[i], i + 1));
        fieldset.appendChild(choixDeReponse);

    }

}

/**
 * Méthode qui crée les choix de réponses et les boutons radios.
 * @param reponse la réponse
 * @param index l'index de la réponse
 * @returns {HTMLParagraphElement} le paragraphe avec le bouton radio et le label
 */
function affichageChoixReponses(reponse, index) {
    let ligneReponse = document.createElement("p");
    ligneReponse.appendChild(creerInput("radio", "reponse" + index, "reponse", reponse));
    ligneReponse.appendChild(creerLabel(reponse, "reponse" + index, reponse, "pRep"));
    return ligneReponse;
}

/**
 * Méthode qui construit l'interface des résultats. Autant si l'user a complété le quiz que s'il a abandonné.
 * @param questionnaireObj l'objet questionnaire
 */
function construireInterfaceResultats(questionnaireObj) {
    viderZoneDeDonnees();
    legend.textContent = "Résultats";
    fieldset.appendChild(legend);
    fieldset.appendChild(creerBaliseX("h1", "titre",));
    fieldset.appendChild(creerBaliseX("p", "resultat", "", ""));
    fieldset.appendChild(creerBaliseX("p", "nombreDePoints"));
    const boutonRejouer = creerInput("button", "boutonRejouer", "", "Rejouer !", "bouton");
    fieldset.appendChild(boutonRejouer);
    gererInterfaceResultats(questionnaireObj);
}

/**
 * Méthode qui gère quelle phrase générer en fonction de si l'utilisateur à décidé d'abandonner ou non.
 * @param questionnaireObj l'objet questionnaire
 */
function gererInterfaceResultats(questionnaireObj) {
    let scoreFinal = questionnaireObj.nombreDePoints;
    let notePourcentage = ((scoreFinal / questionnaireObj.nombreDePointsMax) * 100).toFixed(2);
    if (abandon === true) {

        console.log(notePourcentage);
        titre.textContent = "Voici votre résultat, même si vous avez abandonné...";
        resultat.textContent = "Vous avez quand même " + scoreFinal + "/ " + questionnaireObj.nombreDePointsMax + " points d'accumulés, et votre note est de: " + notePourcentage + "%. C'est dommage de ne pas avoir continué :(";
    } else if (abandon === false) {
        titre.textContent = "Voici votre résultat final: ";
        resultat.textContent = "Vous avez " + scoreFinal + "/" + questionnaireObj.nombreDePointsMax + " points, ce qui fait une note de: " + notePourcentage + "%." + msgSelonScore(notePourcentage);

    }
    boutonRejouer.addEventListener("click", creerNouveauJeu);
}

/**
 * Méthode qui désactive les boutons radios.
 */
function radioDesactives() {
    let radios = document.getElementsByName("reponse");
    for (let i = 0; i < radios.length; i++) {
        radios[i].disabled = true;
    }
}

function main() {
    // Zone de données est l'id du div dans le HTML
    construireInterfaceIntro(zoneDeDonnees);
}

main();