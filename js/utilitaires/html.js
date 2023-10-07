"use strict";

//******************
//Balises autres standards
//******************

/**
 *  Créer une balise html de type standard
 *
 * <balise id="id" classes="classe">texte et html "valeur"</balise>
 *
 * @param balise {strig}
 * @param id {strig}
 * @param valeur {strig}
 * @param classe {strig}
 * @return {*}
 */
function creerBaliseX(balise, id = "", valeur = "", classe = "") {
    let baliseTemp = document.createElement(balise);

    if (id !== "") {
        baliseTemp.id = id;
    }

    if (classe !== "") {
        baliseTemp.className = classe;
    }

    baliseTemp.innerHTML = valeur;

    return baliseTemp;
}

function creerFieldset(id = "", legendText = "") {
    let fieldset = document.createElement("fieldset");

    if (id !== "") {
        fieldset.id = id;
    }

    if (legendText !== "") {
        let legend = document.createElement("legend");
        legend.innerText = legendText;
        fieldset.appendChild(legend);
    }

    return fieldset;
}


//******************
//Balises particulières
//******************

/**
 * Créer une balise html "input";
 *
 * <input type="type" id="id" name="nom" value="valeur" classes="classe" />
 *
 * @param type
 * @param id
 * @param nom
 * @param valeur
 * @return {HTMLInputElement}
 */
function creerInput(type, id, nom = "", valeur = "", classe = "") {
    let inputTemp = document.createElement("input");

    if (type !== "") {
        inputTemp.type = type;
    }
    if (id !== "") {
        inputTemp.id = id;
    }
    if (nom !== "") {
        inputTemp.name = nom;
    }
    if (valeur !== "") {
        inputTemp.value = valeur;
    }
    if (classe !== "") {
        inputTemp.className = classe;
    }

    return inputTemp;
}

/**
 * Créer une balise html "img";
 *
 * <img id="id" src="source" classes="classe" />
 *
 * @param id
 * @param source
 * @param classe
 * @return {HTMLImageElement}
 */
function creerImg(id, source = "", classe = "") {
    let imgTemp = document.createElement("img");

    if (id !== "") {
        imgTemp.id = id;
    }
    if (source !== "") {
        imgTemp.src = source;
    }

    if (classe !== "") {
        imgTemp.className = classe;
    }

    return imgTemp;
}

/**
 * Créer une balise html "label";
 *
 * <label id="id" for="valFor" classes="classe">texte et html "valeur"</label>
 *
 * @param id
 * @param valFor
 * @param valeur
 * @param classe
 * @return {HTMLLabelElement}
 */
function creerLabel(id, valFor = "", valeur = "", classe = "") {
    let labelTemp = document.createElement("label");

    if (id !== "") {
        labelTemp.id = id;
    }

    if (valFor !== "") {
        labelTemp.htmlFor = valFor;
    }

    if (classe !== "") {
        labelTemp.className = classe;
    }

    labelTemp.innerHTML = valeur;

    return labelTemp;
}


