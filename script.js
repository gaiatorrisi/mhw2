/*Mappa risposte:*/
const given = {};      

const boxes = document.querySelectorAll('.choice-grid div');    
for (const box of boxes) {
    box.addEventListener('click', Selected);                 
}

/*Funzione seleziona/deseleziona: */
function Selected(event){
    const box = event.currentTarget;
    
    box.querySelector('.checkbox').src = "images/checked.png";
    box.classList.add('azzurro');
    box.classList.remove('trasparenza');

    const cliccata = box.dataset.choiceId;
    const all = box.parentNode.querySelectorAll('div');

    for (const risp of all) {
        /*Specifiche risposte non selezionate:*/
        if(risp.dataset.choiceId !== cliccata){
            risp.classList.add('trasparenza');
            risp.querySelector('.checkbox').src = "images/unchecked.png";
            risp.classList.remove('azzurro');
        }
    }

    given[box.dataset.questionId] = box.dataset.choiceId;
/*Controllo se sono state selezionate le risposte per ogni blocco:*/
    if(given.one && given.two && given.three)
        Completed_Quiz();
}

function Completed_Quiz(){
    for (const box of boxes) 
            box.removeEventListener('click',Selected);
        Show_Result(Generate_Result());
}
/*Funzione che genera risultato in base alle risposte date, se ce ne sono in maggioranza o sono tutte diverse:*/
function Generate_Result(){
    if(given.one === given.two || given.one === given.three)
        return given.one;
    else if(given.two === given.one   ||given.two === given.three)
        return given.two;
    else if(given.three === given.one || given.three === given.two)
        return given.three;
    return given.one;
}


/*Funzione che mostra il container di: testo + tasto per reset  */
function Show_Result(key){
    /*testo*/
    const mostra = document.querySelector('#test_result');
    mostra.querySelector('h1').textContent = RESULTS_MAP[key].title;
    mostra.querySelector('p').textContent = RESULTS_MAP[key].contents;
    mostra.classList.remove('nascondi');
    /*tasto*/
    const button = document.querySelector('#reset_button');
    button.addEventListener('click', Reset_Quiz);
}

/*Funzione che aggiorna il sito senza aggiornare la pagina internet:*/
function Reset_Quiz(){
    const Hide_Container = document.querySelector('#test_result');
    /*rimuoviamo il container di testo + tasto reset*/
    Hide_Container.classList.add('nascondi');
    /*azzeriamo le risposte date:*/
    delete given.one;
    delete given.two;
    delete given.three;
    /*facciamo tornare il sito all'aspetto originale*/
    for (const box of boxes) {
        box.classList.remove('trasparenza');
        box.classList.remove('azzurro');
        box.addEventListener('click', Selected);
        box.querySelector('.checkbox').src = "images/unchecked.png";
    }
}
