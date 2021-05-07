document.addEventListener('DOMContentLoaded', () => {
    const menu = () => {

        const header = document.querySelector('.header');
        const nav = document.querySelector('.nav');
        const overlayReg = document.querySelector('.overlay-reg');
        const overlayThank = document.querySelector('.overlay-thank');
        const buy = document.querySelector('.buy');

        // функция открыти - закрытия меню
        const toggleMenu = () => {
            nav.classList.toggle('open');
        }

        // функция скрола
        const skroll = (selector) => {
            // получаем высоту раздела
            const scrollHeight = document.querySelector(selector).offsetTop;
            window.scrollTo({
                top: scrollHeight,
                behavior: 'smooth'
            });
            toggleMenu();
        }

        buy.addEventListener('click', e => {
            e.preventDefault();
            overlayReg.classList.add('visible');
        })

        overlayReg.addEventListener('click', e => {
            if (e.target.classList.contains('visible')) {
                overlayReg.classList.remove('visible');
            }
        })

        header.addEventListener('click', e => {
            const target = e.target;

            // отркываем модалку с регистрацией
            if (target.classList.contains('nav__registration')) {
                toggleMenu();
                overlayReg.classList.add('visible');
            }
            // открытие меню кликая по бергеру
            if (target.closest('.burger')) {
                toggleMenu();
            }

            // скролл
            if (target.closest('.nav__item')) {
                e.preventDefault();
                skroll(target.closest('.nav__item').dataset.scroll);
            }
        })


        // закрытие модалки thank по клику
        overlayThank.addEventListener('click', e => {
            const target = e.target;

            if (target.classList.contains('overlay-thank')) {
                overlayThank.classList.remove('visible');
            }

            if (target.classList.contains('modal-thank__btn')) {
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

        // отправка формы

        async function sendForm(e) {
            e.preventDefault();
            const form = document.querySelector('.form');
            let formData = new FormData(form);

            let response = await fetch('../sendmail.php', {
                method: 'POST',
                body: formData,
            })

            if (response.ok) {
                // в переменную result помещаем ответ преобразив его в формат 
                // JSON
                let result = await response.json()
                // Выводим alert c результатом ответа
                form.reset()
                overlayReg.classList.remove('visible');
                thank();
                // если же что то пошло не так
            } else {
                // мы выдаем alert c результатом
                alert('Ошибка!')

            }

        }

        document.addEventListener('submit', sendForm);
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
                for (let i = 0; i < 7; i++) {
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
            move() {
                [...this.items.children].forEach(elem => {
                    elem.left++;
                    elem.style.transform = `translateX(${elem.left}px)`;
                    if (elem.left > this.widthWindow) {
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



    const countTimer = (deadLine) => {
        const timeValue = document.querySelectorAll('.time__value');
        // const days = document.querySelector('.days');
        // const hours = document.querySelector('.hours');
        // const minutes = document.querySelector('.minutes');


        function getTimeRemaining() {
            let dateStop = new Date(deadLine).getTime(),
                dateNow = new Date().getTime(),
                timeRemaining = (dateStop - dateNow) / 1000,
                miliSecond = Math.floor(timeRemaining % 60),
                second = Math.floor(timeRemaining / 60 % 60),
                minutes = Math.floor((timeRemaining / 60 / 60) % 60),
                hours = Math.floor(timeRemaining / 60 / 60 / 24);

            return {
                timeRemaining,
                hours,
                minutes,
                second,
                miliSecond
            };
        }

        function updateClock() {
            let timer = getTimeRemaining();

            // если акция закончилась то выключаем таймер
            if (timer.timeRemaining <= 0) {
                // я бы здесь вообще указал timer-numbers display none
                clearInterval(updateClockInterval)
                timerHours.textContent = '00'
                timerMinutes.textContent = '00'
                timerSeconds.textContent = '00'

                // days.textContent = '00';
                // hours.textContent = '00';
                // minutes.textContent = '00';
            } else {

                timeValue[0].textContent = `${timer.hours < 10 ? '0' + timer.hours : timer.hours} : ${timer.minutes < 10 ? '0' + timer.minutes : timer.minutes} : ${timer.second < 10 ? '0' + timer.second : timer.second} : ${timer.miliSecond < 10 ? '0' + timer.miliSecond : timer.miliSecond}`;

                timeValue[1].textContent = `${timer.hours < 10 ? '0' + timer.hours : timer.hours} : ${timer.minutes < 10 ? '0' + timer.minutes : timer.minutes} : ${timer.second < 10 ? '0' + timer.second : timer.second} : ${timer.miliSecond < 10 ? '0' + timer.miliSecond : timer.miliSecond}`;

                // days.textContent = `${timer.hours < 10 ? '0' + timer.hours : timer.hours}`;
                // hours.textContent = `${timer.minutes < 10 ? '0' + timer.minutes : timer.minutes}`;
                // minutes.textContent = `${timer.second < 10 ? '0' + timer.second : timer.second}`;
            }




        }

        updateClock();

        let updateClockInterval = setInterval(updateClock, 1000)

    }

    countTimer('9 June 2021');



    const goToTop = () => {
        const goTopBtn = document.querySelector('.go-to-top');
        window.addEventListener('scroll', () => {
            if (pageYOffset === 0) {
                goTopBtn.classList.remove('go-to-top-reverse')
            } else {
                goTopBtn.classList.add('go-to-top-reverse')

            }
        })

        goTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        })

    }

    goToTop();


})