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
    
    /**
     * Fonction qui valide si la reponse est la bonne
     * @param reponseDonnee
     */
    valideReponse(reponseDonnee) {
        return this.bonneReponse === reponseDonnee;
    }
}










