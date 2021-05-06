document.addEventListener('DOMContentLoaded', () => {
    const menu = () => {
        const burger = document.querySelector('.burger');
        const nav = document.querySelector('.nav');

        burger.addEventListener('click', e => {
            nav.classList.toggle('open')
        })

    }

    menu();


    const lines = () => {
        class LineMove {
            constructor(selector) {
                this.items = document.querySelector(selector);
                this.count = 0;
                this.widthWindow = 600;
            }

            init() {
                for(let i = 0; i < 7; i++){
                    const elem = document.createElement('div');
                    elem.classList.add('lines__elem');
                    
                    elem.innerHTML = `
                        <img src="./img/lines/warning.svg" alt="warning">
                        <span class="lines__text">Вход строго по приглашениям </span>
                    `;
                    elem.left = 0;
                    this.items.insertAdjacentElement('beforeend', elem);
                }
               requestAnimationFrame(this.move.bind(this))
            }
            move(){
                [...this.items.children].forEach(elem => {
                    elem.left ++;
                    elem.style.transform = `translateX(${elem.left}px)`;
                    if (elem.left > this.widthWindow){
                        elem.parentElement.insertAdjacentElement('afterbegin', elem)
                        elem.left = 0;
                        elem.style.transform = `translateX(${elem.left}px)`;
                    }
                })
                requestAnimationFrame(this.move.bind(this));
            }
        }

        const line1 = new LineMove('.first-line');
        const line2 = new LineMove('.second-line');

        line1.init();
        line2.init();
    }

    lines();
})