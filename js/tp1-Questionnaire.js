"use strict";

const zoneDeDonnees = document.getElementById("zoneDeDonnees");
const fieldset = creerFieldset("fieldset");
zoneDeDonnees.appendChild(fieldset);
let indexCourrantQuestion = -1;
let verificationReponseFaite = false;
const legend = document.createElement("legend");
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
    } else {
        const questionObj = questionnaireObj.questions[indexCourrantQuestion];
        affichageQuestion(questionObj, questionnaireObj);
        gererBoutons(questionnaireObj);
    }
}
function afficherBoutonVerifier(questionnaireObj) {
    const boutonVerifier = creerInput("button", "boutonVerifier", "", "Verifier le resultat", "bouton");
    fieldset.appendChild(boutonVerifier);

    boutonVerifier.addEventListener("click", function () {
        verifierReponse(questionnaireObj);
    });
}



function verifierReponse(questionnaireObj) {
    const reponseSelectionee = document.querySelector('input[name="reponse"]:checked');
    if (!reponseSelectionee) {
        alert("Veuillez sélectionner une réponse ou abandonner le quiz.");
        //TODO enlever les returns
        return;
    }
    if (verificationReponseFaite) {
        return;
    }
    const questionObj = questionnaireObj.questions[indexCourrantQuestion];
    const laBonneReponse = questionObj.bonneReponse;

    reponseSelectionee.setAttribute("style", "color: red;");

    if (reponseSelectionee.value === laBonneReponse) {
        reponseSelectionee.setAttribute("style", "color: red;");
        console.log("Bonne réponse");
        questionnaireObj.nombreDePoints += questionObj.nbrePoints;
    } else {
        reponseSelectionee.classList.add("pMauvaiseReponse");
        console.log("Mauvaise réponse");
    }
    verificationReponseFaite = true;

    radioDesactives();

    const boutonVerifier = document.getElementById("boutonVerifier");
    boutonVerifier.value = "Question Suivante !";
    boutonVerifier.removeEventListener("click", verifierReponse);
    boutonVerifier.addEventListener("click", function () {
        boutonVerifier.value = "Verifier le resultat";
        boutonVerifier.classList.add('hidden');
        boutonAbandon.classList.remove('hidden');
        construireInterfaceQuestion(questionnaireObj);
    });
}

function gererBoutons(questionnaireObj) {
    afficherBoutonVerifier(questionnaireObj);
    const boutonAbandon = creerInput("button", "boutonAbandon", "", "Abandonner", "bouton");
    fieldset.appendChild(boutonAbandon);
    boutonAbandon.addEventListener("click", function () {
        abandon = true;
        construireInterfaceResultats(questionnaireObj);
    });
}

function affichageQuestion(questionObj, questionnaireObj) {
    viderZoneDeDonnees();
    legend.textContent = "Questionnaire";
    fieldset.appendChild(legend);
    const questionEcrite = questionObj.question;
    const reponses = questionObj.reponses;
    fieldset.appendChild(creerBaliseX("h1", "p1", "Question " + (indexCourrantQuestion + 1) + " de 5 pour " + questionObj.nbrePoints + " points"));
    fieldset.appendChild(creerBaliseX("p", "p2", questionEcrite));
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
    let scoreFinal = questionnaireObj.calculerPoints();
    let notePourcentage = calculerPoucentage(questionnaireObj.nombreDePoints, 2)
    if (abandon === true){
        titre.textContent = "Voici votre résultat, même si vous avez abandonné...";
    } else if (abandon === false){
        titre.textContent = "Voici votre résultat final: ";
    }
    resultat.textContent = "Tu as eu un score de " + questionnaireObj.nombreDePoints + " points, ce qui fait une note de: " + notePourcentage + " ." + msgSelonScore(scoreFinal);

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