"use strict";
const zoneDeDonnees = document.getElementById("zoneDeDonnees");
const legend = document.createElement("legend");
const fieldset = creerFieldset("fieldset");
zoneDeDonnees.appendChild(fieldset);

let indexCourrantQuestion = -1;
let verificationReponseFaite = false;
let abandon = false;

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
function creerNouveauJeu() {
    indexCourrantQuestion = -1;
    viderZoneDeDonnees();
    const questionnaireObj = new QuestionnaireQuiz();
    construireInterfaceQuestion(questionnaireObj);
}
function construireInterfaceQuestion(questionnaireObj) {
    indexCourrantQuestion++;
    verificationReponseFaite = false;
    if (indexCourrantQuestion >= questionnaireObj.questions.length) {
        construireInterfaceResultats(questionnaireObj);
    } else if (indexCourrantQuestion == 5) {
        gererBoutonsFinal(questionnaireObj);
    } else {
        const questionObj = questionnaireObj.questions[indexCourrantQuestion];
        affichageQuestion(questionObj, questionnaireObj);
        gererBoutons(questionnaireObj);
    }
}

//TODO Faire qu'à la dernière question le bouton "suivant" devient "terminer" et qu'il mène à la page des résultats.
/**
 * Fonction qui fait que le bouton Abandonner disparait (changer le style de l'élément bouton pour display: none.) et le bouton Question Suivante se transofrme en "Voir les résultats" (changer la "value")
 * @param questionnaireObj - l'objet questionnaire
 */
function gererBoutonsFinal(questionnaireObj){
    console.log("Dernière question !")
    const boutonAbandon = document.getElementById("boutonAbandon");
    boutonAbandon.style.display = "none";
    const boutonVerifier = document.getElementById("boutonVerifier");
    boutonVerifier.value = "Voir les résultats";
    boutonVerifier.addEventListener("click", function () {
        construireInterfaceResultats(questionnaireObj);
    });
}



function afficherBoutonVerifier(questionnaireObj) {
    const boutonVerifier = creerInput("button", "boutonVerifier", "", "Vérifier le resultat", "bouton");
    fieldset.appendChild(boutonVerifier);

    boutonVerifier.addEventListener("click", function () {
        verifierReponse(questionnaireObj);
    });
}


function afficherBoutonVerifier(questionnaireObj) {
    const boutonVerifier = creerInput("button", "boutonVerifier", "", "Vérifier le resultat", "bouton");
    fieldset.appendChild(boutonVerifier);

    boutonVerifier.addEventListener("click", function () {
        verifierReponse(questionnaireObj);
    });
}
function verifierReponse(questionnaireObj) {
    let listeReponse = document.querySelectorAll("input");
    let reponseSelectionee = null;
    for (let rep of listeReponse) {
        if (rep.checked) {
            reponseSelectionee = rep.value;
        }
    }

    if (verificationReponseFaite) {
        console.log("Vous avez déjà vérifié la réponse !");
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
            boutonVerifier.value = "Question Suivante !";
            boutonVerifier.removeEventListener("click", verifierReponse);

            boutonVerifier.addEventListener("click", function () {
                boutonVerifier.value = "Vérifier la réponse";
                boutonVerifier.classList.add('hidden');
                boutonAbandon.classList.remove('hidden');

                construireInterfaceQuestion(questionnaireObj);
            });
        }
    }
}
function gererBoutons(questionnaireObj) {
    afficherBoutonVerifier(questionnaireObj);

    const boutonAbandon = creerInput("button", "boutonAbandon", "", "Abandonner", "bouton");
    fieldset.appendChild(boutonAbandon);
    boutonAbandon.addEventListener("click", function () {
        abandon = true;
        console.log("Vous avez abandonné !");
        construireInterfaceResultats(questionnaireObj);
    });
}
function affichageQuestion(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    let pluriel = "s";
    if (questionObj.nbrePoints === 1){
        pluriel = "";
    }
        legend.textContent = "Questionnaire";
        fieldset.appendChild(legend);


        fieldset.appendChild(creerBaliseX("h1", "p1", "Question " + (indexCourrantQuestion + 1) + " de 5 pour " + questionObj.nbrePoints + " point" + pluriel + " :"));
        fieldset.appendChild(creerBaliseX("p", "p2", questionObj.question));

        for (let i = 0; i < questionObj.reponses.length; i++) {
            let choixDeReponse = creerBaliseX("p", "choix");
            choixDeReponse.appendChild(affichageChoixReponses(questionObj.reponses[i], i + 1));
            fieldset.appendChild(choixDeReponse);

            //C'est pas forcément ici, mais on pourrait faire que si on voit que y'a pas de question restante, qu'on change le bouton pour "voir les résultats" et que ça mène à la page des résultats.
        }

}
function affichageChoixReponses(reponse, index) {
    let ligneReponse = document.createElement("p");
    ligneReponse.appendChild(creerInput("radio", "reponse" + index, "reponse", reponse));
    ligneReponse.appendChild(creerLabel(reponse, "reponse" + index, reponse, "pRep"));
    return ligneReponse;
}
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
function gererInterfaceResultats(questionnaireObj) {
    let scoreFinal = questionnaireObj.nombreDePoints;
    let notePourcentage = ((scoreFinal / questionnaireObj.nombreDePointsMax) * 100).toFixed(2);
    if (abandon === true) {
        titre.textContent = "Voici votre résultat, même si vous avez abandonné...";
        resultat.textContent = "Vous avez quand même " + scoreFinal + "/ " + questionnaireObj.nombreDePointsMax + " points d'accumulés, et votre note est de: " + notePourcentage + "%. C'est dommage de ne pas avoir continué :(";
    } else if (abandon === false) {
        titre.textContent = "Voici votre résultat final: ";
        resultat.textContent = "Vous avez " + scoreFinal + "/" + questionnaireObj.nombreDePointsMax + " points, ce qui fait une note de: " + notePourcentage + "% ." + msgSelonScore(notePourcentage);

    }
    boutonRejouer.addEventListener("click", creerNouveauJeu);
}
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