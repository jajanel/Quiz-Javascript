class QuestionnaireQuiz {

    _indexCourrantQuestion = 0;

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

    get indexCourrantQuestion() {
        return this._indexCourrantQuestion++;
    }

    set indexCourrantQuestion(value) {
        this._indexCourrantQuestion = value;
    }

    get questions() {
        return this._questions;
    }

    set questions(value) {
        this._questions = value;
    }

    get indexQuestion() {
        return this._indexQuestion;
    }

    set indexQuestion(value) {
        this._indexQuestion = value;
    }

    get nombreDePoints() {
        return this._nombreDePoints;
    }

    set nombreDePoints(value) {
        this._nombreDePoints = value;
    }

    verifierIndex() {
        let prochaineQuestionExiste = false;
        if (this._indexCourrantQuestion < this._questions.length) {
            prochaineQuestionExiste = true;
            this._indexCourrantQuestion++;
        } else {
            prochaineQuestionExiste = true;
        }
        return prochaineQuestionExiste;
    }


    calculerQuizTotal(question) {
        let total = 0;
        for (let i = 0; i < question.length; i++) {
            total += question[i].nbrePoints;
        }
        return total;
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



