class QuestionnaireQuiz {
    constructor(questions) {
        this.questions = JSONaObjectJS();
        this.indexQuestion = 0; // Track the current question index
        this.nombreDePoints = 0; // Track the number of points
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
        if (valeurCochée === null) {
            alert("Veuillez choisir une réponse ou abandonner !")
        } else {
            if (question.bonneReponse === valeurCochée && valideReponse(question.bonneReponse)) {
                this.nombreDePoints += question.nbrePoints;
                return true;
            }
        }
        return false;
    }

}



