window.addEventListener('DOMContentLoaded', () => {

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

    function openCart() {
        cart.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }

    function closeCart() {
        cart.style.display = 'none';
        document.body.style.overflow = '';
    }

    cartOpenBtn.addEventListener('click', openCart);
    cartCloseBtn.addEventListener('click', closeCart);

    goodsBtn.forEach(function(btn, i) {
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
            calcGoods(0);
            calcTotal();
            removeFromCart()
        });
    })

    
    function sliceTitle() {
        titles.forEach(function(item) {
            if (item.textContent.length < 70) {
                return;
            } else {
                const str = `${item.textContent.slice(0, 71)}...`;
                item.textContent = str;
            }
        });
    }

    sliceTitle();

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

    function calcGoods(i) {
        const items = cartWrapper.querySelectorAll('.goods__item');
        badge.textContent = i + items.length;
    }

    function calcTotal() {
        const prices = cartWrapper.querySelectorAll('.goods__item > .goods__price > span');
        let total = 0;

        prices.forEach(function(item) {
            total += +item.textContent;
        });
        
        totalCost.textContent = total;
    }

    function removeFromCart() {
        const removeBtn = cartWrapper.querySelectorAll('.goods__item-remove');
        removeBtn.forEach(function(btn) {
            btn.addEventListener('click', () => {
                const items = cartWrapper.querySelectorAll('.goods__item');
                btn.parentElement.remove();

                calcGoods();
                calcTotal();

                if (items.length == 0) {
                    cartWrapper.querySelector('.empty').style.display = 'block';
                }
            });
        });
    }
});