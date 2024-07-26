import { changeUiColor, startScrolls, showCart, showScrollBar, showMenu, sendForm, giveShopStausOpacityEffects, trackOrderFunctions } from './user-interface.js';
import { cart } from './cart.js';
import { checkShopStatus } from './days.js';


const cartQuantityElem = document.getElementById('cart-icon-quantity');
const cartBtn = document.querySelector('.js-cart-btn');
// const cartItemsLink = document.querySelector('.js-cart-header-items-text');
const clearCartBtn = document.querySelector('.js-clear-cart-btn');
const shopStatusContainer = document.getElementById('shop-status');

const cartBody = document.querySelector('.js-cart-body');
const trackOrderBody = document.querySelector('.js-track-order-body');

cart.updateCartQuantityElem(cartQuantityElem);

changeUiColor();
showMenu();
startScrolls();
showCart();
showScrollBar(cartBody);
showScrollBar(trackOrderBody);
sendForm();
renderShopStatus();
giveShopStausOpacityEffects();

setInterval(renderShopStatus, 60000);

window.addEventListener('scroll', changeUiColor);

// console.log(document.body.style);
cartBtn.addEventListener('click', () => {
  cart.renderCartItems();
});

clearCartBtn.addEventListener('click', () => {
  cart.clearCart();
});

trackOrderFunctions();

function renderShopStatus() {
  let shopStatus;
  if (checkShopStatus()) {
    shopStatus = 'store: opened';
    if (shopStatusContainer.classList.contains('closed')) {
      shopStatusContainer.classList.replace('closed', 'opened');
    } else {
      shopStatusContainer.classList.add('opened');
    }
  } else {
    shopStatus = 'store: closed';
    if (shopStatusContainer.classList.contains('opened')) {
      shopStatusContainer.classList.replace('opened', 'closed');
    } else {
      shopStatusContainer.classList.add('closed');
    }
  }
  shopStatusContainer.innerText = shopStatus;
}