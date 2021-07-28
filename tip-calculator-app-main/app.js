//grab everything we need

const buttons        = document.querySelectorAll('[type = submit]');
const totalOnePerson = document.querySelector('.total-1');
const totalAll       = document.querySelector('.total-all');
const resetbtn       = document.querySelector('.reset');
const warning        = document.querySelector('.warning-sign');
const customTip      = document.querySelector('[name = custom]');
const peoples        = document.querySelector('[name = people]');
const inputBill      = document.querySelector('[name = bill]');

const clickedButton = (e) => {

    buttonHandler();
    e.target.classList.add('active');
    tipValue = e.target.value;
    customTip.value = null;
    console.log(tipValue);

    calculateBill(tipValue);

};

const buttonHandler = () => {

    for (const button of buttons) {
        
        if (button.classList.contains('active')){
            button.classList.remove('active');
        }
    }
};

const customCalculateTip = () => {

    buttonHandler();
    buttons.values = null;
    
    calculateBill(customTip.value);
    
};

const calculateBill = (tipValue) => {

    const bill           = inputBill.value;
    const numberOfPeople = peoples.value;

    if (bill.trim() ==='' || numberOfPeople.trim() === ''){

        return errorHandler();
    } 

    inputHandler();

    const totalTip = ((( tipValue / 100) * bill) / numberOfPeople);   
    const totalBillPerson = (bill / numberOfPeople) + totalTip;

    console.log(totalTip);
    console.log(totalBillPerson);
    totalOnePerson.innerHTML = `$${totalTip.toFixed(2)}`;
    totalAll.innerHTML = `$${totalBillPerson.toFixed(2)}`;

};

const errorHandler = () => {

    peoples.style.borderColor  = "red";
    warning.innerHTML = `This From Cannot be Empty`;
    warning.style.color = 'red';
    totalOnePerson.innerHTML = `$0.00`;
    totalAll.innerHTML = `$0.00`;
};

const inputHandler = () => {

    peoples.style.borderColor  = '#58a89d';
    warning.innerHTML = `Number Of People`;
    warning.style.color = 'grey';
};

const reset = () => {

    totalOnePerson.innerHTML = `$0.00`;
    totalAll.innerHTML = `$0.00`;
    peoples.value = '';
    inputBill.value = '';
    buttonHandler();
};

buttons.forEach(button => button.addEventListener('click', clickedButton));
customTip.addEventListener('input', customCalculateTip);
resetbtn.addEventListener('click', reset);