import { products } from './data/products.js';
import { showCart, showScrollBar, showMenu, trackOrderFunctions } from './user-interface.js';
import { cart } from './cart.js';

const cartItemsLink = document.querySelector('.js-cart-header-items-text');
const productsGrid = document.getElementById('products-grid');
const cartBtn = document.querySelector('.js-cart-btn');
const cartQuantityElem = document.getElementById('cart-icon-quantity');
const clearCartBtn = document.querySelector('.js-clear-cart-btn');
const cartBody = document.querySelector('.js-cart-body');
const trackOrderBody = document.querySelector('.js-track-order-body');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterInputElem = document.getElementById('newsletter-input');

// displaying checkmark
let timeoutId;
let oldProductId = '0';

// giveProductsHeaderShadow();
showCart();
showMenu();
showScrollBar(cartBody);
showScrollBar(trackOrderBody);

cart.updateCartQuantityElem(cartQuantityElem);

renderProducts();

// window.addEventListener('scroll', giveProductsHeaderShadow);

cartBtn.addEventListener('click', () => {
  cart.renderCartItems();
});

clearCartBtn.addEventListener('click', () => {
  cart.clearCart();
});

cartItemsLink.addEventListener('click', () => {
  document.querySelector('.js-cart').classList.remove('show');
  document.querySelector('.js-cart-checkout-grid').classList.remove('checkout-side');
});


trackOrderFunctions();


function renderProducts() {
  let productsHTML = '';

  products.forEach(product => {
    productsHTML += `
      <section class="product js-product" data-product-id="${product.id}">
        <div class="product-image">
          <img src="${product.image}" alt="">
        </div>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${product.getPrice()}</p>
        <div class="product-quantity">
          <input type="number" step="1" min="1" max="9" value="1" id="product-add-quantity-input-${product.id}">
          <img class="remove js-added-checkmark" src="images/icons/checkmark.png" alt="">
        </div>
        <!-- <div class="add-to-cart"> -->
          <button class="js-add-to-cart-btn">add to cart</button>
        <!-- </div> -->
      </section>
    `;
  });

  productsGrid.innerHTML = productsHTML;

  const productContainers = document.querySelectorAll('.product');

  productContainers.forEach(eachProduct => {
    eachProduct.addEventListener('click', (e) => {
      const { productId } =  eachProduct.dataset;
      const clickedElem = e.target;


      if (clickedElem.classList.contains('js-add-to-cart-btn')) {
        const passed = cart.addToCart(productId);
        cart.updateCartQuantityElem(cartQuantityElem);

        if (passed) {
          if (oldProductId === productId) {
            clearTimeout(timeoutId);
          }
          // clearTimeout(timeoutId);
          eachProduct.querySelector('.js-added-checkmark').classList.remove('remove');
          timeoutId = setTimeout(() => {
            eachProduct.querySelector('.js-added-checkmark').classList.add('remove');
          }, 2000);
  
          oldProductId = productId;
  
          console.log({ productId });
          console.log({ cart });
        }
      }
    });
  });
}
// console.log(newsletterInputElem.value);


newsletterForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const emailAlert = document.getElementById('email-warning');
  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+\.)([a-z]{2,3})?$/;

  if (!newsletterInputElem.value.match(emailRegex)) {
    if (newsletterInputElem.value !== '') {
      emailAlert.classList.remove('remove');
      emailAlert.innerText = 'Please enter a valid email address';
    }
  } else {
    emailAlert.classList.add('remove');
  }

  newsletterInputElem.addEventListener('keyup', () => {
    if (!newsletterInputElem.value.match(emailRegex)) {
      if (newsletterInputElem.value !== '') {
        emailAlert.classList.remove('remove');
        emailAlert.innerText = 'Please enter a valid email address';
      }
    } else {
      emailAlert.classList.add('remove');
    }
  });


  if (emailAlert.classList.contains('remove')) {
    console.log(newsletterInputElem.value);
    window.alert('Subscibed Successfully!');
    newsletterForm.reset();

    /*
    const result = subscribeToNewsletter(newsletterInputElem.value);

    if (result === 'Added') {
      window.alert('Subscribed Successfully!');
      newsletterForm.reset();
    } else if (result === 'Exists') {
      window.alert('Already A Subscriber');
      newsletterForm.reset();
    } else {
      window.alert('An Error Occurred, Try Subscribing Again');
    }
    */
  }
});

async function subscribeToNewsletter(email) {
  try {
    const response = await fetch(`/dea/newletter/${email}`);
    const data = await response.json();
    if (data.Success) {
      return data.data;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
}



// localStorage.removeItem('cart');
// console.log(findCartTotal());
// console.log(cart.cartItems);
