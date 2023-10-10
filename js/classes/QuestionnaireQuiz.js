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


    calculerPoints() {
        // Implement logic to calculate points based on user responses
        // For example, you can iterate through this._questions and check user responses
        let totalPoints = 0;
        // Add your logic here to calculate points
        return totalPoints;
    }


    /**
     * Vérifie si la réponse est bonne
     * @param question {Question}
     * @param valeurChecked {string}
     * @returns {boolean}
     */
    verifierBonneReponse(question, valeurChecked) {
        let valeurAeteCochee = false;
        if (valeurChecked == null) {
            alert("Veuillez choisir une réponse ou abandonner !");
        } else {
            console.log(valeurChecked);
            console.log(question.bonneReponse);
            if (question.valideReponse(valeurChecked)) {
                console.log("Bonne réponse");
                let id = document.getElementById(valeurChecked);
                id.style.color = "green";
                id.innerText += " ✔️";
                this._nombreDePoints += question.nbrePoints;



                valeurAeteCochee = true;

            } else {
                let id = document.getElementById(valeurChecked);
                id.style.color = "red";
                id.innerText += " ❌";
                id.style.textDecoration = "line-through";
//L'id de ma bonne réponse, c'Est le même que la string qu'il contient. - Fabien, 2023
            }
            return valeurAeteCochee;
        }
    }

}



