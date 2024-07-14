import { contacts, saveContacts } from '../scripts/data/data.js';
import { cart } from './cart.js';


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


  document.querySelector('.js-alternate-search-option').addEventListener('click', () => {
    switchSearchAlternative();
  });




  function searchOrder() {
    try {
      document.querySelector('.js-track-order-load').classList.remove('remove');
      setTimeout(() => {
        document.querySelector('.js-track-order-load').classList.add('remove');
      }, 2000);
    } catch (error) {
      // some code here
    }
  }

  function switchSearchAlternative() {
    document.getElementById('email-search-option-input').classList.toggle('remove');
    document.getElementById('orderid-search-option-input').classList.toggle('remove');
    document.getElementById('forgot-orderid-text').classList.toggle('remove');

    const switchSearchAlternativeElem = document.querySelector('.js-alternate-search-option');
    if (switchSearchAlternativeElem.innerText === 'Use Email') {
      switchSearchAlternativeElem.innerText = 'Use OrderID';
    } else {
      switchSearchAlternativeElem.innerText = 'Use Email';
    }
  }
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