class QuestionnaireQuiz {


    constructor(questions) {
        this._indexQuestion = 0;
        this._nombreDePoints = 0;
        this._nombreDePointsMax = 0;
        this._questions = JSONaObjectJS();
    }

    get nombreDePointsMax() {
        return this._nombreDePointsMax;
    }

    set nombreDePointsMax(value) {
        this._nombreDePointsMax = value;
    }


    get questions() {
        return this._questions;
    }

    set questions(value) {
        this._questions = value;
    }

    get nombreDePoints() {
        return this._nombreDePoints;
    }

    set nombreDePoints(value) {
        this._nombreDePoints = value;
    }

    /**
     * Méthode qui calcule le nombre total de points qui peuvent être obtenus avec les 5 questions.
     */
    calculerTotalPossiblePoints() {
        this._nombreDePointsMax = 0;
        for (const question of this.questions) {
            this._nombreDePointsMax += question.nbrePoints;
        }
    }


    /**
     * Applique le bon style selon la réponse qui a été selectionnée.
     * @param question {Question} La question
     * @param valeurChecked {string} la valeur selectionnée
     */
    verifierBonneReponse(question, valeurChecked) {
        if (valeurChecked == null) {
            alert("Veuillez choisir une réponse ou abandonner !");
        } else {
            if (question.valideReponse(valeurChecked)) {
                styleBonneReponse.call(this, valeurChecked, question);
            } else {
                styleMauvauseReponse(valeurChecked);
                styleBonneReponse(question.bonneReponse, question);
            }
        }
    }

}



