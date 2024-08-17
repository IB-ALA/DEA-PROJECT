import { getProduct } from './data/products.js';
import { formatCurrency } from './money.js';


class Cart {
  cartItems;
  #localStorageKey;

  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage();
  }


  saveCart() {
    localStorage.setItem(`${this.#localStorageKey}`, JSON.stringify(this.cartItems));
  }

  #loadFromStorage() {
    this.cartItems = JSON.parse(localStorage.getItem(`${this.#localStorageKey}`));
    if (!this.cartItems) {
      this.cartItems = [];
    }
  }

  addToCart(productId) {
    let passed = false;
    const quantityElem = document.getElementById(`product-add-quantity-input-${productId}`);
    const quantity = Number(quantityElem.value);
  
    let matchingItem;
    this.cartItems.forEach(cartItem => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
  
    if (quantity > 0 && quantity < 10) {
      passed = true;
      if (matchingItem) {
        matchingItem.quantity += quantity;
      } else {
        this.cartItems.push({productId, quantity})
      }
      this.saveCart();
    }
    return passed;
  }

  findCartTotal() {
    let total = 0;
  
    this.cartItems.forEach(cartItem => {
      total+= cartItem.quantity;
    });
  
    return total;
  }

  updateCartQuantityElem(DOMElement) {
    DOMElement.innerText = this.findCartTotal();
  }

  async renderCartItems() {
    const cartBody = document.querySelector('.js-cart-body');
    // const cartItemsLink = document.querySelector('.js-cart-header-items-text');
    // const cartCheckoutBtn = document.querySelector('.js-cart-checkout-btn');
    const cartCheckoutAmount = document.querySelector('.js-cart-checkout-total-amount');
    // const clearBtn = document.querySelector('.js-clear-cart-btn');
  
    let cartBodyHTML = '';
    if (this.cartItems.length > 0) {

      for (const cartItem of this.cartItems) {
        const product = await getProduct(cartItem.productId);
        console.log({product});
        cartBodyHTML += `
          <div class="cart-item js-cart-item" data-product-id="${cartItem.productId}">
          
            <div class="item-image">
              <img src="${product.getImage()}" alt="">
            </div>
    
            <div class="item-details">
              <div class="top">
                <p>${product.name}</p>
                <button title="Remove Item" class="js-remove-item-btn">
                  <svg  class="js-remove-item-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path  class="js-remove-item-btn" d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"></path>
                  </svg>
                </button>
              </div>
    
              <div class="bottom">
                <div class="quantity-section">
                  <div class="item-quantity-container">
                    <span class="quantity-text">quantity:</span>
                    <span class="item-quantity-text js-item-quantity-text">${cartItem.quantity}</span>
    
                    <div class="quantity-editing-container remove js-quantity-editing-container">
                      <input class="item-quantity-input js-item-quantity-input" type="number" min="1" max="999">
    
                      <button class="save-update-btn js-save-update-btn">
                        <svg class="save-update-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p class="item-quantity-update js-item-quantity-update">update</p>
                </div>
                
                <p class="item-total">
                  ₵${formatCurrency(product.pricePesewas * cartItem.quantity)}
                </p>
              </div>
            </div>
          </div>
        `;
      };

      /*
      this.cartItems.forEach(cartItem => {
        const product = getProduct(cartItem.productId);
        // console.log(product);
        cartBodyHTML += `
          <div class="cart-item js-cart-item" data-product-id="${cartItem.productId}">
          
            <div class="item-image">
              <img src="${product.getImage()}" alt="">
            </div>
    
            <div class="item-details">
              <div class="top">
                <p>${product.name}</p>
                <button title="Remove Item" class="js-remove-item-btn">
                  <svg  class="js-remove-item-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                    <path  class="js-remove-item-btn" d="m376-300 104-104 104 104 56-56-104-104 104-104-56-56-104 104-104-104-56 56 104 104-104 104 56 56Zm-96 180q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520Zm-400 0v520-520Z"></path>
                  </svg>
                </button>
              </div>
    
              <div class="bottom">
                <div class="quantity-section">
                  <div class="item-quantity-container">
                    <span class="quantity-text">quantity:</span>
                    <span class="item-quantity-text js-item-quantity-text">${cartItem.quantity}</span>
    
                    <div class="quantity-editing-container remove js-quantity-editing-container">
                      <input class="item-quantity-input js-item-quantity-input" type="number" min="1" max="999">
    
                      <button class="save-update-btn js-save-update-btn">
                        <svg class="save-update-btn" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24">
                          <path d="m424-296 282-282-56-56-226 226-114-114-56 56 170 170Zm56 216q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <p class="item-quantity-update js-item-quantity-update">update</p>
                </div>
                
                <p class="item-total">
                  ₵${formatCurrency(product.pricePesewas * cartItem.quantity)}
                </p>
              </div>
            </div>
          </div>
        `;
      });
      */

    } else {
      cartBodyHTML = `
        <div class="reference">
          <p>Your cart is empty</p>
          <P>
            visit 
            <a href="products.html">our store</a>
            to check our available products.
          </P>
        </div>
      `;
    }
  
    cartBody.innerHTML = cartBodyHTML;
    this.updateCartItemsElem();
    cartCheckoutAmount.innerText = `₵${formatCurrency(await this.calculateCartTotalAmount())}`;
  
  
    const cartItemsElem = cartBody.querySelectorAll('.js-cart-item');
  
    cartItemsElem.forEach(eachCartItem =>  {
      eachCartItem.addEventListener('click', e => {
        const { productId } = eachCartItem.dataset;
        const clickedElem = e.target;
        const cartQuantityElem = document.getElementById('cart-icon-quantity');
  
        // console.log({productId});
        // console.log(clickedElem);
  
        if (clickedElem.classList.contains('js-remove-item-btn')) {
          this.cartItems = this.cartItems.filter(cartItem => cartItem.productId !== productId);
          this.saveCart();
          this.renderCartItems();
          this.updateCartQuantityElem(cartQuantityElem);
        }
        else if (clickedElem.classList.contains('js-item-quantity-update')) {
          const cartItemQuantityText = eachCartItem.querySelector('.js-item-quantity-text');
          const cartItemQuantityEditElem = eachCartItem.querySelector('.js-quantity-editing-container');
          const cartItemQuantityEditInput = eachCartItem.querySelector('.js-item-quantity-input');
          const saveEditsBtn = eachCartItem.querySelector('.js-save-update-btn');
          
          clickedElem.classList.add('remove');
          cartItemQuantityText.classList.add('remove');
          cartItemQuantityEditElem.classList.remove('remove');
          this.cartItems.forEach(cartItem => {
            if (cartItem.productId === productId) {
              cartItemQuantityEditInput.value = cartItem.quantity; 
            }
          });
  
          saveEditsBtn.addEventListener('click', () => {
            const newQuantity = Number(cartItemQuantityEditInput.value);
            if (newQuantity > 0 && newQuantity < 1000) {
              this.cartItems.forEach(cartItem => {
                if (cartItem.productId === productId) {
                  cartItem.quantity = newQuantity; 
                }
              });
              this.saveCart();
              this.renderCartItems(); 
              this.updateCartQuantityElem(cartQuantityElem);
            }
          });

          cartItemQuantityEditInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
              const newQuantity = Number(cartItemQuantityEditInput.value);
              if (newQuantity > 0 && newQuantity < 1000) {
                this.cartItems.forEach(cartItem => {
                  if (cartItem.productId === productId) {
                    cartItem.quantity = newQuantity; 
                  }
                });
                this.saveCart();
                this.renderCartItems(); 
                this.updateCartQuantityElem(cartQuantityElem);
              }
            }
          });
  
        }
      });
    });
  
    // const clearBtn = document.querySelector('.js-remove-item-btn');
  }

  async calculateCartTotalAmount() {
    let cartTotal = 0;  
    // this.cartItems.forEach(async cartItem => {
    //   const product = await getProduct(cartItem.productId);
    //   cartTotal += (cartItem.quantity * product.pricePesewas);
    // });

    for (const cartItem of this.cartItems) {
      const product = await getProduct(cartItem.productId);
      // console.log(product.pricePesewas * cartItem.quantity);
      cartTotal += (cartItem.quantity * product.pricePesewas);
    };
  
    // console.log(cartTotal);
    return cartTotal;
  }

  updateCartItemsElem() {
    const cartItemsLinks = document.querySelectorAll('.js-cart-header-items-text');
  
    cartItemsLinks.forEach(eachCartItemsLink => {
      eachCartItemsLink.innerText = `${this.findCartTotal()} ${this.findCartTotal() === 1 ? 'item' : 'items'}`;
    });
  }

  clearCart() {
    const cartQuantityElem = document.getElementById('cart-icon-quantity');
    this.cartItems = [];
    this.saveCart();
    this.renderCartItems();
    this.updateCartQuantityElem(cartQuantityElem);
  }
}


export const cart = new Cart('cart');