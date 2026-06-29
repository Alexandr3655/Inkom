//Открытие/скрытие меню

const burgerBtn = document.getElementById('burgerBtn');
const openMenu = document.getElementById('openMenu');
const overlay = document.getElementById('overlay');
const menuClose = document.getElementById('menuClose');

function openMenuFn() {
    openMenu.classList.add('active');
    overlay.classList.add('active');
    burgerBtn.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMenuFn() {
    openMenu.classList.remove('active');
    overlay.classList.remove('active');
    burgerBtn.classList.remove('active');
    document.body.style.overflow = '';
}

function toggleMenu() {
    if (openMenu.classList.contains('active')) {
        closeMenuFn();
    } else {
        openMenuFn();
    }
}

// Открытие по бургеру
burgerBtn.addEventListener('click', toggleMenu);

// Закрытие по крестику
menuClose.addEventListener('click', closeMenuFn);

// Закрытие по оверлею
overlay.addEventListener('click', closeMenuFn);

// Закрытие по Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && openMenu.classList.contains('active')) {
        closeMenuFn();
    }
});

// Закрытие при клике на пункты меню (опционально)
document.querySelectorAll('.navMenu a').forEach(item => {
    item.addEventListener('click', closeMenuFn);
});

// Scroll to anchors
(function () {

    const smoothScroll = function (targetEl, duration) {
        let target = document.querySelector(targetEl);

        // Проверка: если элемент не найден, выходим
        if (!target) return;

        let startPosition = window.pageYOffset;
        // Вычисляем targetPosition ДО начала анимации
        let targetPosition = target.getBoundingClientRect().top + startPosition;
        let startTime = null;

        const ease = function (t, b, c, d) {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t + b;
            t--;
            return -c / 2 * (t * (t - 2) - 1) + b;
        };

        const animation = function (currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const run = ease(timeElapsed, startPosition, targetPosition, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };
        requestAnimationFrame(animation);
    };

    const scrollTo = function () {
        const links = document.querySelectorAll('.js-scroll');
        links.forEach(each => {
            each.addEventListener('click', function (e) {
                e.preventDefault(); // Рекомендую добавить, чтобы якорь не прыгал в URL
                const currentTarget = this.getAttribute('href');
                smoothScroll(currentTarget, 1000);
            });
        });
    };
    scrollTo();
}());