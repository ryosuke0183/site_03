window.addEventListener('DOMContentLoaded', function () {
    const HAMBURGER = document.querySelector('.hamburger');
    const NAV = document.querySelector('.nav');
    HAMBURGER.addEventListener('click', function () {
        HAMBURGER.classList.toggle('js_clicked');
        NAV.classList.toggle('js_clicked');
    });
});

window.addEventListener('DOMContentLoaded', function () {
    const ITEMS = document.querySelectorAll('.item');
    const SCREEN = document.querySelector('.screen');
    const SCREEN_BG = document.querySelector('.screen__bg');
    const SCREEN_TEXT = document.querySelector('.screen__text');
    if (window.matchMedia('(min-width:768px)').matches) {
        ITEMS.forEach(function (item, index) {
            // 表示アニメーション
            item.addEventListener('animationend', function (event) {
                item.classList.add('anime1');
            });

            // hover時アニメーション
            item.addEventListener('mouseover', function () {
                let src = item.querySelector('img').getAttribute('src');
                let text = item.querySelector('figcaption').textContent;

                // 背景を表示
                SCREEN_BG.style.backgroundImage = `url(${src})`;
                SCREEN_TEXT.textContent = text;

                SCREEN.animate({
                    opacity: ['0', '1'],
                    transform: ['scale(1.2)', 'scale(1.1)'],
                    easing: ['ease']
                },
                    {
                        duration: 700,
                        fill: 'forwards'
                    });
            });

            item.addEventListener('mouseleave', function () {

                // 背景を非表示
                SCREEN.animate({
                    opacity: ['1', '0'],
                    easing: ['ease']
                },
                    {
                        duration: 200,
                        fill: 'forwards'
                    });
            });
        });


        // マウスイベント
        const toDecimal = (number, digit) => {
            return Math.round(number * Math.pow(10, digit)) / Math.pow(10, digit);
        };

        const WINDOW_WIDTH = window.innerWidth;
        const WINDOW_HEIGHT = window.innerHeight;

        const ITEM_NODE = document.querySelectorAll('.item');

        const POSITION = {};
        ITEM_NODE.forEach(function (item, index) {
            const ITEM_WIDTH = item.clientWidth;
            const ITEM_HEIGHT = item.clientHeight;
            const ITEM_RECT = item.getBoundingClientRect();
            const ITEM_LEFT = ITEM_RECT.left + ITEM_WIDTH / 2;
            const ITEM_TOP = ITEM_RECT.top + ITEM_HEIGHT / 2;
            let itemX = (ITEM_LEFT * 2 - WINDOW_WIDTH) / WINDOW_WIDTH;
            let itemY = (ITEM_TOP * 2 - WINDOW_HEIGHT) / WINDOW_HEIGHT;
            let itemZ = (ITEM_NODE.length - 1) / 5;
            itemX = toDecimal(itemX, 2);
            itemY = toDecimal(itemY, 2);
            POSITION[index] = { itemX, itemY, itemZ };
        });

        window.addEventListener('mousemove', (eve) => {                     // eve.clientX と eve.clientY で調整前のマウスの位置座標が取得できる
            let eveX = (eve.clientX * 2 - WINDOW_WIDTH) / WINDOW_WIDTH;         // 調整後のマウスの位置座標X
            let eveY = (eve.clientY * 2 - WINDOW_HEIGHT) / WINDOW_HEIGHT;       // 調整後のマウスの位置座標Y
            eveX = toDecimal(eveX, 2);                                        // 小数点の桁数が多いので第二位までに
            eveY = toDecimal(eveY, 2);                                        // 小数点の桁数が多いので第二位までに

            ITEM_NODE.forEach(function (item, index) {
                let strengthX = eveX - POSITION[index].itemX;
                let strengthY = eveY - POSITION[index].itemY;
                let strengthZ = POSITION[index].itemZ;

                strengthX = toDecimal(strengthX, 2) * -1;
                strengthY = toDecimal(strengthY, 2) * -1;

                item.style.transform = `translate(${40 * strengthX * strengthZ}px, ${40 * strengthY * strengthZ}px)`;
            });
        });
    }
});

window.addEventListener('DOMContentLoaded', function () {
    const ITEMS = document.querySelectorAll('.item');
    const OBSERVER = new IntersectionObserver(function (entries, observe) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting === true && window.matchMedia('(max-width:767px)').matches) {
                entry.target.classList.add('js-intersect');
            }
        })
    },
        {
            rootMargin: '25% 0px',
            threshold: 0
        });

    ITEMS.forEach(function (item, index) {
        OBSERVER.observe(item);
    });
});