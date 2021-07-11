const menu = document.querySelector('.burger-icon');





function showMenu(e){

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    if (e.target.matches('.burger-icon')){

        hamburgerMenu.classList.toggle('.hamburger-menu');
        console.log('click');
    } 
}












menu.addEventListener('click' , showMenu);