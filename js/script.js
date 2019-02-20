window.addEventListener('DOMContentLoaded', () => {

    //Request to server
    const loadContent = async (url, callback) => {
        await fetch(url)
            .then(response => response.json())
            .then(json => createElement(json.goods));
        callback(); //Got response. Continue.
    }

    //JSON to HTML elements
    function createElement(arr) {
        const goodsWrapper = document.querySelector('.goods__wrapper');

        arr.forEach(function (item) {
            let card = document.createElement('div');
            card.classList.add('goods__item');

            card.innerHTML = `
        <img class="goods__img" src="${item.url}" alt="phone">
        <div class="goods__colors">Доступно цветов: 4</div>
        <div class="goods__title">
            ${item.title}
        </div>
        <div class="goods__price">
            <span>${item.price}</span> руб/шт
        </div>
        <button class="goods__btn">Добавить в корзину</button>
        `;

            goodsWrapper.appendChild(card);
        })
    }

    loadContent('js/db.json', () => {
        const cartWrapper = document.querySelector('.cart__wrapper'),
            cart = document.querySelector('.cart'),
            cartCloseBtn = document.querySelector('.cart__close'),
            cartOpenBtn = document.querySelector('#cart'),
            goodsBtn = document.querySelectorAll('.goods__btn'),
            products = document.querySelectorAll('.goods__item'),
            cartConfirm = document.querySelector('.confirm'),
            badge = document.querySelector('.nav__badge'),
            totalCost = document.querySelector('.cart__total > span'),
            titles = document.querySelectorAll('.goods__title');

        //Open cart tab
        function openCart() {
            cart.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        //Close cart tab
        function closeCart() {
            cart.style.display = 'none';
            document.body.style.overflow = '';
        }

        //Listen for open/close requests for cart tab
        cartOpenBtn.addEventListener('click', openCart);
        cartCloseBtn.addEventListener('click', closeCart);

        //Listen for every "Add to cart" button
        goodsBtn.forEach(function (btn, i) {
            //Runs when "Add to cart" pressed
            btn.addEventListener('click', () => {
                let item = products[i].cloneNode(true),
                    trigger = item.querySelector('button'),
                    removeBtn = document.createElement('div'),
                    empty = cartWrapper.querySelector('.empty');

                trigger.remove();

                removeBtn.classList.add('goods__item-remove');
                removeBtn.innerHTML = '&times';
                item.appendChild(removeBtn);

                cartWrapper.appendChild(item);

                if (empty.style.display = 'block') {
                    empty.style.display = 'none';
                }

                showConfirm();
                calcGoods();
                calcTotal();
                removeFromCart()
            });
        })

        //Cut products discription
        function sliceTitle() {
            titles.forEach(function (item) {
                if (item.textContent.length < 60) {
                    return;
                } else {
                    const str = `${item.textContent.slice(0, 60)}...`;
                    item.textContent = str;
                }
            });
        }

        sliceTitle();

        //Play "Add to cart" animation
        function showConfirm() {
            cartConfirm.style.display = 'block';
            let counter = 100;
            const id = setInterval(frame, 10);

            function frame() {
                if (counter == 10) {
                    clearInterval(id);
                    cartConfirm.style.display = 'none';
                } else {
                    counter--;

                    cartConfirm.style.transform = `translateY(-${counter}px)`;
                    cartConfirm.style.opacity = `.${counter}`;
                }
            }
        }

        //Calculate and show amount of products in the cart
        function calcGoods() {
            const items = cartWrapper.querySelectorAll('.goods__item');
            badge.textContent = items.length;
        }

        //Calculate and show sum of all products in the cart
        function calcTotal() {
            const prices = cartWrapper.querySelectorAll('.goods__item > .goods__price > span');
            let total = 0;

            prices.forEach(function (item) {
                total += +item.textContent;
            });

            totalCost.textContent = total;
        }

        //Remove product from cart
        function removeFromCart() {
            const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
            removeBtn.forEach(function (btn) {
                btn.addEventListener('click', () => {
                    btn.parentElement.remove();

                    calcGoods();
                    calcTotal();

                    if (cartWrapper.querySelectorAll('.goods__item').length == 0) {
                        cartWrapper.querySelector('.empty').style.display = 'block';
                    }
                });
            });
        }
    });
});