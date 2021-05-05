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
                this.items = document.querySelector(selector).children;
                this.count = 0;
            }

            init() {

               requestAnimationFrame(this.move.bind(this))
            }

            move(){

                this.count++;
                console.log(this.count);
                [...this.items].forEach(elem => {
                    elem.style.transform = `translateX(${this.count}px)`;
                    if (parseFloat( elem.style.transform.split('(')[1]) > 300){
                        elem.parentElement.prepend(elem)
                    }
                })
                // requestAnimationFrame(this.move.bind(this))
                

            }
        }

        const line1 = new LineMove('.first-line');

        line1.init();

        


    }

    lines();
})