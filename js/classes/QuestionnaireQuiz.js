class QuestionnaireQuiz {

    _indexCourrantQuestion = 0;

    constructor(questions) {
        this._indexQuestion = 0;
        this._nombreDePoints = 0;
        this._questions = JSONaObjectJS();
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



    calculerPoints() {
        // Implement logic to calculate points based on user responses
        // For example, you can iterate through this._questions and check user responses
        let totalPoints = 0;
        // Add your logic here to calculate points
        return totalPoints;
    }



    //Un peu n'importe quoi mais dans cette idée là
    verifierReponse(question, valeurCochée) {
        let valeurAeteCochee= false;
        if (valeurCochée == null) {
            alert("Veuillez choisir une réponse ou abandonner !");
        } else {
            //TODO vérifier si c'est la bonne réponse!!
            valeurAeteCochee = true;
            console.log("valeurCochée : " + valeurCochée.value);
        }
        return valeurAeteCochee;
    }

}



