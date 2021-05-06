document.addEventListener('DOMContentLoaded', () => {
    const menu = () => {

        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        const overlayReg = document.querySelector('.overlay-reg'); 
        const overlayThank = document.querySelector('.overlay-thank'); 

        // функция открыти - закрытия меню
        const toggleMenu = () => {
            nav.classList.toggle('open');
        }

        

        // функция скрола
        const skroll = (selector) => {
            // получаем высоту раздела
            const scrollHeight = document.querySelector(selector).offsetTop;
            window.scrollTo({top: scrollHeight, behavior: 'smooth'});
            toggleMenu();
        }

        overlayReg.addEventListener('click', e => {
            if (e.target.classList.contains('visible')){
                overlayReg.classList.remove('visible');
            }
        })

        header.addEventListener('click', e => {
            const target = e.target;

            // отркываем модалку с регистрацией
            if(target.classList.contains('nav__registration')){
                toggleMenu();
                overlayReg.classList.add('visible');
            }
            // открытие меню кликая по бергеру
            if(target.closest('.burger')){
                toggleMenu();
            }

            // скролл
            if (target.closest('.nav__item')){
                e.preventDefault();
                skroll(target.closest('.nav__item').dataset.scroll);
            }
        })


        // закрытие модалки thank по клику
        overlayThank.addEventListener('click', e => {
            const target = e.target;
            
            if (target.classList.contains('overlay-thank')){
                overlayThank.classList.remove('visible');
            }

            if (target.classList.contains('modal-thank__btn')){
                overlayThank.classList.remove('visible');
            }
        })

        // ====================== отправка формы ========================\



       

        // say thank
        const thank = () => {
            
            overlayThank.classList.add('visible');

            setTimeout(() => {
                overlayThank.classList.remove('visible');
            }, 5000)
        }


        document.addEventListener('submit', e => {
            e.preventDefault();
            overlayReg.classList.remove('visible');
           
            thank();
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