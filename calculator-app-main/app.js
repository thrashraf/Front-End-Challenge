//grab everything we need
const input         = document.querySelector('[name = input]');
const buttons       = document.querySelectorAll('[name = button]');
const firstTheme    = document.querySelector('#first_toggle');
const secondTheme   = document.querySelector('#second_toggle');
const thirdTheme    = document.querySelector('#third_toggle');
const defaultTheme   = document.querySelector('.theme1');

function calculate() {

    const value = this.value;

    if ( value == '=') {
        
        input.value = eval( input.value);
    } else if ( value == 'del') {
        
        input.value =  input.value.slice(0 , -1);
    } else if ( value == 'reset'){

        input.value = " ";
    } else {
        console.log('click');
        input.value += value;
    };
};


function changeTheme() {
    
    if (secondTheme.checked == true){
        defaultTheme.classList.replace('theme1' ,'theme2');
        defaultTheme.classList.replace('theme3' ,'theme2');
        
    } else if (thirdTheme.checked == true){
        defaultTheme.classList.replace('theme2','theme3');
        defaultTheme.classList.replace('theme1','theme3');
    } else if (firstTheme.checked == true){
        defaultTheme.classList.replace('theme2' , 'theme1');
        defaultTheme.classList.replace('theme3' , 'theme1');
    }
}





// addEventListner
buttons.forEach(button => button.addEventListener('click' , calculate));
firstTheme.addEventListener('click' , changeTheme);
secondTheme.addEventListener('click' , changeTheme);
thirdTheme.addEventListener('click' , changeTheme);