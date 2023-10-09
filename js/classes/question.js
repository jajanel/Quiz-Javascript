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


    get reponses() {
        return this._reponses;
    }


    get bonneReponse() {
        return this._bonneReponse;
    }


    get nbrePoints() {
        return this._nbrePoints;
    }

}


/**
 * Fonction qui valide si la reponse est la bonne
 * @param reponseDonnee
 */
    function valideReponse(reponseDonnee) {
        this.reponses === reponseDonnee;

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



