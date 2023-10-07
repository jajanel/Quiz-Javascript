/**Faire une classe qui prends les quesions et qui les mets dans un tableau ordonné
 s'occupe de faire le questionnaire, de le faire avancer et de calculer les points
 Ajouter des fonctions, pour calculer les points, vérifier les réponses, etc.
 quand on clique sur jouer, faire un for in qui va créer les 5 questions dans le rectangle des données*/


class QuestionnaireQuiz {


//Ici mettre le constructeur
    constructor() {
        this._questions = JSONaObjectJS();
    }


    get questions() {
        return this._questions;
    }

    set questions(value) {
        this._questions = value;
    }

     // calculer les points
    calculerPoints() {
        return 0;
    }

}



