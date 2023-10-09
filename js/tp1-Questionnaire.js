"use strict";

const zoneDeDonnees = document.getElementById("zoneDeDonnees");
const fieldset = creerFieldset("fieldset");
zoneDeDonnees.appendChild(fieldset);
let indexCourrantQuestion = -1;

function construireInterfaceIntro() {
    viderZoneDeDonnees();
    const legend = document.createElement("legend");
    legend.textContent = "Intro";
    fieldset.appendChild(legend);

    fieldset.appendChild(creerBaliseX("h1", "titre", "Bienvenue sur le quiz JavaScript de Janelle et Raphaël"));
    fieldset.appendChild(creerBaliseX("p", "p2", "Nous vous invitons à participer à un petit jeu questionnaire qui comporte 5 questions choisies au hasard dans un ensemble de questions. Chaque question vous donnera un certain nombre de points. À la fin du quiz, vous obtiendrez votre résultat final. Bonne chance! 🥰 "));

    const boutonIntro = creerInput("button", "boutonIntro", "", "Commencer le quiz !", "bouton");
    fieldset.appendChild(boutonIntro);
    boutonIntro.addEventListener("click", function () {
        creerNouveauJeu();
    });
}

function viderZoneDeDonnees() {
    fieldset.innerHTML = "";
}

function creerNouveauJeu() {
    indexCourrantQuestion = -1;
    viderZoneDeDonnees();
    const questionnaireObj = new QuestionnaireQuiz();
    construireInterfaceQuestion(questionnaireObj);
}

function construireInterfaceQuestion(questionnaireObj) {
    indexCourrantQuestion++;
    if (indexCourrantQuestion >= questionnaireObj.questions.length) {
        construireInterfaceFinal(questionnaireObj);
    } else {
        const questionObj = questionnaireObj.questions[indexCourrantQuestion];
        affichageQuestion(questionObj, questionnaireObj);
        gererBoutons(questionnaireObj);
    }
}

function gererBoutons(questionnaireObj) {
    let boutonVerifier = null;

    function afficherBoutonVerifier() {
        boutonVerifier = creerInput("button", "boutonVerifier", "", "Verifier le resultat", "bouton");
        fieldset.appendChild(boutonVerifier);

        boutonVerifier.addEventListener("click", function () {
            const reponseSelectionee = document.querySelector('input[name="reponse"]:checked');
            if (!reponseSelectionee) {
                alert("Veuillez sélectionner une réponse ou abandonner le quiz.");
                return;
            }
            const questionObj = questionnaireObj.questions[indexCourrantQuestion];
            const correctAnswer = questionObj.bonneReponse;

            if (reponseSelectionee.value === correctAnswer) {
                reponseSelectionee.classList.add("pBonneRéponse");

            } else {
                // The selected answer is incorrect
                reponseSelectionee.classList.add("pMauvaiseReponse");
            }

            const reponsesRadio = document.querySelectorAll('input[name="reponse"]');
            reponsesRadio.forEach((radio) => {
                radio.disabled = true;
            });

            boutonVerifier.value = "Question Suivante !";
            boutonVerifier.removeEventListener("click", afficherBoutonVerifier);
            boutonVerifier.addEventListener("click", function () {
                boutonVerifier.value = "Verifier le resultat";
                boutonVerifier.classList.add('hidden');
                boutonAbandon.classList.remove('hidden');
                construireInterfaceQuestion(questionnaireObj);
            });
        });
    }

    afficherBoutonVerifier();

    const boutonAbandon = creerInput("button", "boutonAbandon", "", "Abandonner", "bouton");
    fieldset.appendChild(boutonAbandon);

    boutonAbandon.addEventListener("click", function () {
        construireInterfaceAbandon(questionnaireObj);
    });
}

function affichageQuestion(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    const questionText = questionObj.question;
    const reponses = questionObj.reponses;
    fieldset.appendChild(creerBaliseX("h1", "p1", "Question " + (indexCourrantQuestion + 1) + " de 5 pour " + questionObj.nbrePoints + " points"));
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

function construireInterfaceFinal(questionnaireObj) {
    viderZoneDeDonnees();
    //legend.textContent = "Résultats";
    fieldset.appendChild(creerBaliseX("h1", "titre",));
    fieldset.appendChild(creerBaliseX("p", "resultat", "", ""));
    fieldset.appendChild(creerBaliseX("p", "nombreDePoints"));
    const boutonRejouer = creerInput("button", "boutonRejouer", "", "Rejouer !", "bouton");
    fieldset.appendChild(boutonRejouer);
    gererInterfaceFinal(questionnaireObj);
}

function gererInterfaceFinal(questionnaireObj) {
    let scoreFinal = 0;
    //questionnaireObj.calculerPoints();
    let msgEncouragement = msgSelonScore(scoreFinal);
    // TODO Créer une fonction qui va calculer le pourcentage de la note. Considerer que si l'user abandonne, c'est pas nécessairement 5 questions qu'il a répondu.
    let notePourcentage = scoreFinal / 50 * 100;

    titre.textContent = "Voici votre résultat final: ";
    resultat.textContent = "Tu as eu un score de " + scoreFinal + " points, ce qui fait une note de: " + notePourcentage + " ." + msgEncouragement;
    boutonRejouer.addEventListener("click", function () {
        creerNouveauJeu();
    });
}

function construireInterfaceAbandon(questionnaireObj) {
    viderZoneDeDonnees();
    fieldset.appendChild(creerBaliseX("h1", "titre"));
    fieldset.appendChild(creerBaliseX("p", "resultat"));
    fieldset.appendChild(creerBaliseX("p", "nombreDePoints"));
    const boutonRejouer = creerInput("button", "boutonRejouer", "", "Rejouer !", "bouton");
    fieldset.appendChild(boutonRejouer);
    gererInterfaceAbandon(questionnaireObj);
}

function gererInterfaceAbandon(questionnaireObj) {
    let scoreFinal = 0;
    let notePourcentage = calculerPoucentage(scoreFinal, 2);
    titre.textContent = "Voici votre résultat, même si vous avez abandonné...";
    resultat.textContent = "Tu as eu un score de " + scoreFinal + " points, ce qui fait une note de: " + notePourcentage + " ." + msgSelonScore(scoreFinal);

    boutonRejouer.addEventListener("click", function () {
        creerNouveauJeu();
    });
}

function main() {
    // Zone de données est l'id du div dans le HTML
    construireInterfaceIntro(zoneDeDonnees);
}

main();