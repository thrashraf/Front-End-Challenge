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

    const inputBill = bill.value;
    const tipPercentage = clickedTip;
    console.log(tipPercentage);
    const customPercentage = customTip.value;
    const totalPeople = numberOfPeople.value;


    if(totalPeople.length == 0 || totalPeople < 0){

        numberOfPeople.style.borderColor  = "red";
        warning.innerHTML = `This From Cannot be Empty`;
        warning.style.color = 'red';
        totalOnePerson.innerHTML = `$0.00`;
        totalAll.innerHTML = `$0.00`;

    } else {

    numberOfPeople.style.borderColor  = '#58a89d';
    warning.innerHTML = `Number Of People`;
    warning.style.color = 'grey';
    const totaltip = ((tipPercentage / 100) * inputBill) / totalPeople;   
    const totalBillPerson = (inputBill / totalPeople) + totaltip;

    totalOnePerson.innerHTML = `$${totaltip.toFixed(2)}`;
    totalAll.innerHTML = `$${totalBillPerson.toFixed(2)}`;
    }
}

function reset(){

    bill.value = 0;
    numberOfPeople.value = " ";
    totalOnePerson.innerHTML = `$0.00`;
    totalAll.innerHTML = `$0.00`;
}

function clickButton(){

        
    this.classList.contains('button') ? this.classList.replace('button','active') : this.classList.replace('active','button');

    clickedTip = this.value;
    
}



buttons.forEach(button => button.addEventListener('click' , clickButton));
resetbtn.addEventListener('click' , reset);
numberOfPeople.addEventListener('input' , calculateBill)
