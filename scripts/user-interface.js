import { cart } from './cart.js';
import { getProduct } from './data/products.js';
import formatCurrency from './money.js';


export function startScrolls() {
  const daysClasses = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  let id = 0;
  const scrolls = document.getElementById('scrolls');
  setInterval(() => {
    // scrolls.style.transition = 'all 0.6s ease-in';
    if (id === 0) {
      if (scrolls.classList.contains('saturday')) {
        scrolls.classList.replace('saturday', 'monday');
      } else {
        scrolls.classList.add('monday');
      }
      // scrolls.style.transition = 'all 0.6s ease-in';
    } 
    else if (id === 1) {
      scrolls.classList.replace('monday', 'tuesday');
      scrolls.style.transition = 'all 0.8s ease-in-out';
    }
    else if (id === 2) {
      scrolls.classList.replace('tuesday', 'wednesday');
      // scrolls.style.transition = 'all 0.6s ease-in';
    }
    else if (id === 3) {
      scrolls.classList.replace('wednesday', 'thursday');
      // scrolls.style.transition = 'all 0.6s ease-in';
    }
    else if (id === 4) {
      scrolls.classList.replace('thursday', 'friday');
      // scrolls.style.transition = 'all 0.6s ease-in';
    }
    else if (id === 5) {
      scrolls.classList.replace('friday', 'saturday');
      setTimeout(() => {
        scrolls.style.transition = 'none';
      }, 3000);

    }

    // console.log(scrolls.classList);
    id++;
    if (id > daysClasses.length - 1) {
      id = 0
    }
  }, 3000);
}


export function changeUiColor() {
  const header = document.querySelector('.js-nav-bar');
  const landingPage = document.querySelector('.js-front-cover');
  const scrollPosition = (window.scrollY / (landingPage.offsetHeight + window.innerHeight)) * 100;

  const cartIcon = document.querySelector('.js-cart-icon');
  const cartNumber = document.querySelector('.js-cart-number');

  const menuList = document.querySelector('.js-menu');

  // console.log(window.scrollY);
  // console.log('ladingpage  height:' + landingPage.offsetHeight);
  // console.log('window  height:' + window.innerHeight);

  // console.log(scrollPosition);




  if (scrollPosition > 45) {
    // console.log('working');
    header.classList.add('header-background-color');
    header.classList.add('no-border');
  } else {
    header.classList.remove('header-background-color');
    header.classList.remove('no-border');
    // console.log(scrollPosition);
  }

  // FOR MENU BORDER
  if (scrollPosition > 35) {
    
    menuList.classList.add('border');
  } else {
    menuList.classList.remove('border');
  }


  // FOR CART BUTTON COLORS.
  const bodyWidth = window.innerWidth;
  const bodyHeight = window.innerHeight;

  // console.log({ bodyWidth });
  // console.log({ bodyHeight });
  // console.log({ scrollPosition });

  let frontCoverTarget = 5;
  let footerTarget = 118;

  if (bodyHeight < 635) {
    landingPage.classList.add('give-height');
    frontCoverTarget = 17;

    switch (true) {
      case bodyWidth <= 580:
        footerTarget = 193;
      break;
    
      case bodyWidth <= 801:
        footerTarget = 164;
      break;
    
      case bodyWidth <= 900:
        footerTarget = 170;
      break;
    
      case bodyWidth <= 1120:
        footerTarget = 150;
      break;
    
      default:
        footerTarget = 151;
      break;
    }
  }
  else {
    landingPage.classList.remove('give-height');
    frontCoverTarget = 5;

    switch (true) {
      case bodyWidth <= 580:
        footerTarget = 154.5;
      break;
    
      case bodyWidth <= 801:
        footerTarget = 130.5;
      break;
    
      case bodyWidth <= 900:
        footerTarget = 136;
      break;
    
      case bodyWidth <= 1120:
        footerTarget = 118.5;
      break;
    
      default:
        footerTarget = 118.3;
      break;
    }
  }

  if ((scrollPosition >= frontCoverTarget) && (scrollPosition <= footerTarget)) {
    cartIcon.classList.add('black');
    cartNumber.classList.add('black');
  } else {
    cartIcon.classList.remove('black');
    cartNumber.classList.remove('black');
  }
}


export function giveProductsCheckoutHeaderShadow() {
  const header = document.querySelector('.js-nav-bar');
  if (window.scrollY > 0) {
    header.classList.add('shadow');
  } else {
    header.classList.remove('shadow');
  }
}


export function showCart() {
  const cartBtn = document.querySelector('.js-cart-btn');
  const cartContainer = document.querySelector('.js-cart');
  const closeCartBtns = cartContainer.querySelectorAll('.js-close-cart');
  const cartCheckoutBtn = cartContainer.querySelector('.js-cart-checkout-btn');
  const trackOrderBtn = cartContainer.querySelector('.js-track-order-btn');

  cartBtn.addEventListener('click', () => {
    cartContainer.classList.toggle('show');
    if (document.querySelector('.js-cart-track-order-grid').classList.contains('track-order-side')) {
      document.querySelector('.js-cart-track-order-grid').classList.remove('track-order-side');
    }
  });

  closeCartBtns.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
      cartContainer.classList.remove('show');
      document.querySelector('.js-cart-track-order-grid').classList.remove('track-order-side');
    });
  });

  cartContainer.querySelector('.js-track-order-back-btn').addEventListener('click', () => {
    document.querySelector('.js-cart-track-order-grid').classList.remove('track-order-side');
  });


  trackOrderBtn.addEventListener('click', () => {
    document.querySelector('.js-cart-track-order-grid').classList.add('track-order-side');
    resetTrackOrderEffects();
  });

  cartCheckoutBtn.addEventListener('click', () => {
    if (cart.cartItems.length !== 0) {
      window.location.href = "checkout.html";
    } else {
      // alert user to add products.
    }
    // console.log(cart.cartItems.length);
  });

  const bodyHeight = window.innerHeight;
  if (bodyHeight < 660) {
    cartContainer.classList.add('smaller-height');
  } 
  // else {
  //   cartContainer.classList.remove('smaller-height');
  // }
}


export function showScrollBar(domElement) {
  // const cartBody = document.querySelector('.js-cart-body');
  let timeoutId;

  domElement.addEventListener('scroll', () => {
    addScrollbarEffect(timeoutId, domElement)
  });
  // domElement.addEventListener('mouseover', () => {
  //   addScrollbarEffect(timeoutId, domElement)
  // });
}
function addScrollbarEffect(timeoutId, domElement) {
  clearTimeout(timeoutId);
  domElement.classList.add('show-scroll-bar');
  timeoutId = setTimeout(() => {
    domElement.classList.remove('show-scroll-bar');
  }, 1500);
}


export function trackOrderFunctions() {
  const searchOrderBtn = document.getElementById('search-order-btn');
  searchOrderBtn.addEventListener('click', () => {
    searchOrder();
  });
  document.querySelectorAll('.js-track-order-input').forEach((inputElem) => {
    inputElem.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        searchOrder(); 
      }
    });
  }); 


  document.querySelector('.js-alternate-search-option').addEventListener('click', () => {
    switchSearchAlternative();
  });

  validateInputs();

  async function searchOrder() {
    const orderIdSearchInputElem = document.getElementById('orderid-search-option-input');
    const emailSearchInputElem = document.getElementById('email-search-option-input');
    const searchOrderErrorText = document.getElementById('search-order-error-text');
    let urlQuery; 

    if (!orderIdSearchInputElem.classList.contains('remove')) {
      urlQuery = `orderId=${orderIdSearchInputElem.value}`;

      if (orderIdSearchInputElem.value.length !== 10) {
        searchOrderErrorText.innerText = 'enter valid orderId';
        searchOrderErrorText.classList.remove('remove');
        return;
      } else {
        searchOrderErrorText.classList.add('remove');
      }
    } 
    else {
      urlQuery = `email=${emailSearchInputElem.value}`;
      let emailgood = checkTrackOrderEmail();

      if (!emailgood) {
        return;
      }
    }

    document.querySelector('.js-track-order-load').classList.remove('remove');    
    // /*
    try {

      const response = await fetch(`http://localhost:5000/dea/orders?${urlQuery}`);
      // trial orderId and Email
      // e232288417
      // iishaqyusif@gmail.com
      const data = await response.json();

      if (data.Success) {
        const order = data.data.orders;

        if (order.length !== 0) {
          // console.log(order);
          // const results = await renderOrders(order);
          // console.log(results);
          document.getElementById('response-container').innerHTML = await renderOrders(order);
          document.querySelector('.js-track-order-load').classList.add('remove');
        } else {
          throw new Error("No Order Found");
        }
      } 
      else {
        throw new Error("Couldn't Get Order");
      }
    } catch (error) {
      // some code here
      let errorMessage = '';
      if (error.message === 'No Order Found') {
        errorMessage = 'No order found, reach our team on <a href="tel:+2335771000**" style="text-decoration: underline;">05771000**</a> if there is a problem.';
      } else {
        errorMessage = 'An error occured. If problem persists, reach our team on <a href="tel:+2335771000**">05771000**</a>';
      }
      document.getElementById('response-container').innerHTML = renderErrorSearchOrderHTML(errorMessage);
      document.querySelector('.js-track-order-load').classList.add('remove');
      console.log(error);
    }
    // */

  }

  function switchSearchAlternative() {
    document.getElementById('email-search-option-input').classList.toggle('remove');
    document.getElementById('orderid-search-option-input').classList.toggle('remove');
    document.getElementById('forgot-orderid-text').classList.toggle('remove');
    resetTrackOrderEffects();

    const switchSearchAlternativeElem = document.querySelector('.js-alternate-search-option');
    if (switchSearchAlternativeElem.innerText === 'Use Email') {
      switchSearchAlternativeElem.innerText = 'Use OrderID';
    } else {
      switchSearchAlternativeElem.innerText = 'Use Email';
    }
  }

  function checkTrackOrderEmail() {
    const emailSearchInputElem = document.getElementById('email-search-option-input');
    const searchOrderErrorText = document.getElementById('search-order-error-text');
    const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+\.)([a-z]{2,3})?$/;
    if (emailSearchInputElem.value !== '' && !emailSearchInputElem.value.match(emailRegex)) {
      searchOrderErrorText.innerText = 'enter valid email';
      searchOrderErrorText.classList.remove('remove');
      return false;
    } else {
      searchOrderErrorText.classList.add('remove');
      return true;
    }
  }

  function validateInputs() {
    const orderIdSearchInputElem = document.getElementById('orderid-search-option-input');
    const emailSearchInputElem = document.getElementById('email-search-option-input');
    const searchOrderErrorText = document.getElementById('search-order-error-text');
  
    orderIdSearchInputElem.addEventListener('keyup', () => {
      if (orderIdSearchInputElem.value !== '' && orderIdSearchInputElem.value.length !== 10) {
        searchOrderErrorText.innerText = 'enter valid orderId';
        searchOrderErrorText.classList.remove('remove');
        return;
      } else {
        searchOrderErrorText.classList.add('remove');
      }
    });
  
    emailSearchInputElem.addEventListener('keyup', () => {
      let emailgood = checkTrackOrderEmail();
      if (!emailgood) {
        return;
      }
    });
  }
}

function resetTrackOrderEffects() {
  document.getElementById('search-order-error-text').classList.add('remove');
  document.getElementById('email-search-option-input').value = '';
  document.getElementById('orderid-search-option-input').value = '';
  document.getElementById('response-container').innerHTML = '';
}

export function showMenu() {
  const menuIcon = document.querySelector('.js-menu-icon');
  const menuContainer = document.getElementById('menu-container');
  const menuList = document.querySelector('.js-menu');
  const menuListLI = document.querySelectorAll('.js-menu-li');


  menuListLI.forEach(li => {
    li.addEventListener('click', () => {
      menuList.classList.replace('show', 'hide');
      setTimeout(() => {
        menuContainer.style.height = '0px';
      }, 290);
    });

    // li.addEventListener('mouseover', () => {
    //   menuList.classList.replace('hide', 'show');
    // });
  });

  // menuList.addEventListener('mouseover', () => {
  //   menuList.classList.replace('hide', 'show');
  // });
  // menuList.addEventListener('mouseout', () => {
  //   menuList.classList.replace('show', 'hide');
  // });

  menuIcon.addEventListener('click', () => {
    if (menuList.classList.contains('show')) {
      menuList.classList.replace('show', 'hide');
      setTimeout(() => {
        menuContainer.style.height = '0px';
      }, 290);
    } else {
      menuList.classList.replace('hide', 'show');
      menuContainer.style.height = 'auto';
    }
  });

  // menuIcon.addEventListener('mouseout', () => {
  //   menuList.classList.replace('show', 'hide');
  //   console.log(menuList.classList);

  //   document.querySelector('.menu-container').style.height = 'auto';
  // });
}


export function sendForm() {
  const form = document.querySelector('.js-form-grid');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const senderNameElem = document.getElementById('sender-name-input');
    const senderEmailElem = document.getElementById('sender-email-input');
    const senderMessageElem = document.getElementById('sender-message-input');

    let senderName = senderNameElem.value.trim();
    const senderEmail = senderEmailElem.value.trim();
    const senderMessage = senderMessageElem.value.trim();

    checkInputs();

    senderName = senderName.charAt(0).toUpperCase() + senderName.slice(1);

    if (!senderNameElem.parentElement.classList.contains('error') && !senderEmailElem.parentElement.classList.contains('error') && !senderMessageElem.parentElement.classList.contains('error')) {
      // console.log('ok');
      const message = `Message from ${senderName, senderEmail}. ${senderMessage}`;

      Email.send({
        SecureToken: "dd790cba-9554-48fd-894e-7ade1d823fb9",
        To : "ibaladeveloper@gmail.com",
        From : "ibaladeveloper@gmail.com",
        Subject : "DEA.com-Contact",
        Body : message
      }).then(
        message => {
          if (message === 'OK') {
            Swal.fire({
              title: "Done!",
              text: "Message sent Successfully",
              icon: "success"
            });
            form.reset();
          } else {
            Swal.fire({
              title: "Error!",
              text: "Couldn't send message. Please try again.",
              icon: "error"
            });
            console.log(message);
          }
        }
      );

      // contacts.push({senderName, senderEmail, senderMessage});
      // form.reset();
      // saveContacts();
      // console.log(contacts);
    }
  });
}


function checkInputs() {
  const formInputs = document.querySelectorAll('.form-input');
  for (const inputElem of formInputs) {
    if (inputElem.value === '') {
      inputElem.parentElement.classList.add('error');
    }

    if (formInputs[1].value !== '') {
      checkEmail();
    } 

    formInputs[1].addEventListener('keyup', () => {
      checkEmail();
    })

    inputElem.addEventListener('keyup', () => {
      if (inputElem.value !== '') {
        inputElem.parentElement.classList.remove('error');
      } else {
        inputElem.parentElement.classList.add('error');
      }
    });
  }
}


function checkEmail() {
  const senderEmailElem = document.getElementById('sender-email-input');
  const emailAlert = document.getElementById('email-warning');

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+\.)([a-z]{2,3})?$/;

  if (!senderEmailElem.value.match(emailRegex)) {
    senderEmailElem.parentElement.classList.add('error');
    if (senderEmailElem.value !== '') {
      emailAlert.innerText = 'Please enter a valid email address';
    } else {
      emailAlert.innerText = 'Please enter an email';
    }
  } else {
    senderEmailElem.parentElement.classList.remove('error');
  }
}


export function giveShopStausOpacityEffects() {
  const shopStatusElem = document.getElementById('shop-status');
  let timeoutId;

  window.addEventListener('scroll', () => {
    clearTimeout(timeoutId);
    shopStatusElem.classList.add('add-opacity');
    timeoutId = setTimeout(() => {
      shopStatusElem.classList.remove('add-opacity');
    }, 1500);
  });
}


async function renderOrders(orders) {
  let ordersHTML = '';

  for (const order of orders) {
  // await orders.forEach(async () => {

    const {orderId, orderDate, orderStatus, orderTotal, orderItems} = order;
    let orderItemsHTML = '';

    for (const orderItem of orderItems) {
      const { productId, quantity } = orderItem;
      const product = await getProduct(productId);
      // console.log({product});
      const {name, pricePesewas} = product;
      orderItemsHTML+= `
        <div class="order-item">
          <div class="order-item-img">
            <img src="${product.getImage()}" alt="Vanity mirror-Silver">
          </div>

          <div class="order-item-details">
            <div class="left-side">
              <p>${name}</p>
              <p>₵${formatCurrency(pricePesewas)}</p>
            </div>
            <div class="right-side">
              <p>X${quantity}</p>
            </div>
          </div>
        </div>
      `;
    }
    
    ordersHTML += `
      <div class="each-order-container">
        <div class="order-info-section">
          <div class="">
            <p>id: <span>${orderId}</span></p>
            <p>date: <span>${orderDate.slice(0, 10)}</span></p>
          </div>
          <div class="">
            <p>total: <span>₵${formatCurrency(orderTotal)}</span></p>
            <p>status: <span>${orderStatus}</span></p>
          </div>
        </div>

        <div class="order-details">${orderItemsHTML}</div>
      </div>
    `;
  }

  return ordersHTML;
}

function renderErrorSearchOrderHTML(errorMessage) {
  return `
    <p class="track-order-error-response" id="track-order-error-response">
      ${errorMessage}
    </p>
  `;
}

// const date = '2024-08-21T13:26:35.000Z'
// console.log(date.slice(0, 10));