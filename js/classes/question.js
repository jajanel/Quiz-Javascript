"use strict";

class Question {
    constructor(question, reponses, bonneReponse, nbrePoints) {
        this._question = question;
        this._reponses = reponses;
        this._bonneReponse = bonneReponse;
        this._nbrePoints = nbrePoints;
    }


    get question() {
        return this._question;
    }

    set question(value) {
        this._question = value;
    }

    get reponses() {
        return this._reponses;
    }

    set reponses(value) {
        this._reponses = value;
    }

    get bonneReponse() {
        return this._bonneReponse;
    }

    set bonneReponse(value) {
        this._bonneReponse = value;
    }

    get nbrePoints() {
        return this._nbrePoints;
    }

    set nbrePoints(value) {
        this._nbrePoints = value;
    }
}

//Verif si la reponse est bonne ici
    function valideReponse(reponseDonnee) {
        this.reponseDonnee = reponseDonnee;

    }

    /**
     * Fonction qui prend un array et shuffle les question selon algorithm Fisher-Yates
     * @returns {*[]}
     * @constructor
     */
    function JSONaObjectJS(questionJSON) {
        let tableauDesQuestions = [];
        for (const question of questionJSON) {
            tableauDesQuestions.push(new Question(question.question, question.reponses, question.bonneReponse, question.nbrePoints)); // Push each question object into the new array
        }
        shuffleArray(tableauDesQuestions);

        return tableauDesQuestions.slice(0, 5);
    }



