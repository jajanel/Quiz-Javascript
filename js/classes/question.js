"use strict";

//Ceci est la classe question, on ne fait QUE fabriquer les objets ici


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
function verifierReponse(reponse, bonneReponse) {

}

