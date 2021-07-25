const FAQ = document.querySelector('.content-2');

const showContent = (e) => {

    console.log(e.target);

    const target = e.target;
    const parent = e.target.parentNode.parentNode;
    const answer = parent.nextElementSibling;
    const question = e.target.parentNode.previousElementSibling;

    console.log(answer);
    

    if(target.matches('.arrow')){

        answer.classList.toggle('showAnswer');
        parent.classList.toggle('questionActive');

    }   

};



FAQ.addEventListener('click' , showContent);






