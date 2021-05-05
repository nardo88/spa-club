document.addEventListener('DOMContentLoaded', () => {
    const menu = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav');

        burger.addEventListener('click', e => {
            nav.classList.toggle('open')
        })

    }

    menu();
})