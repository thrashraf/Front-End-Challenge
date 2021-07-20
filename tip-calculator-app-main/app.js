//grab everything we need

const bill           = document.querySelector('[name = bill]');
const numberOfPeople = document.querySelector('[name = people]');
const buttons        = document.querySelectorAll('[type = submit]');
const totalOnePerson = document.querySelector('.total-1');
const totalAll       = document.querySelector('.total-all');
const customTip      = document.querySelector('[name = custom]');
const resetbtn       = document.querySelector('.reset');
const warning        = document.querySelector('.warning-sign');

let clickedTip = 0;



function calculateBill(e){

    const inputBill = parseInt(bill.value);
    const tipPercentage = parseInt(clickedTip);
    console.log(tipPercentage);
    const customPercentage = calCustomtip();
    console.log(customPercentage);
    const totalPeople = parseInt(numberOfPeople.value);


    if(totalPeople < 1 || isNaN(totalPeople)){

        isEmpty();

    } else {

    numberOfPeople.style.borderColor  = '#58a89d';
    warning.innerHTML = `Number Of People`;
    warning.style.color = 'grey';

    const totaltip = (((tipPercentage + customPercentage) / 100) * inputBill) / totalPeople;   
    const totalBillPerson = (inputBill / totalPeople) + totaltip;

    totalOnePerson.innerHTML = `$${totaltip.toFixed(2)}`;
    totalAll.innerHTML = `$${totalBillPerson.toFixed(2)}`;
    

    }
    
}


function isEmpty(){

    numberOfPeople.style.borderColor  = "red";
    warning.innerHTML = `This From Cannot be Empty`;
    warning.style.color = 'red';
    totalOnePerson.innerHTML = `$0.00`;
    totalAll.innerHTML = `$0.00`;
}

function reset(){

    bill.value = 0;
    numberOfPeople.value = " ";
    totalOnePerson.innerHTML = `$0.00`;
    totalAll.innerHTML = `$0.00`;
}

function clickButton(e){

    for (const button of buttons) {
        
        if (button.classList.contains('active')) {
            button.classList.remove('active');
        }
    }
    
    this.classList.add('active');
    customTip.value = 0;

    clickedTip = this.value;
    return parseInt(clickedTip);
}

function calCustomtip(){
    
    for (const button of buttons) {
        
        if (button.classList.contains('active')) {
            button.classList.remove('active');
            
        }
    }
    clickedTip = 0;
    return parseInt(customTip.value);

}


buttons.forEach(button => button.addEventListener('click' , clickButton));
resetbtn.addEventListener('click' , reset);
numberOfPeople.addEventListener('input' , calculateBill);
customTip.addEventListener('click' , calCustomtip);
