import { showScrollBar } from './user-interface.js';
// import { cart } from './cart.js';

const orderDetailsContainer = document.querySelector('.js-order-details-container');
// const paymentDetailsFormElem = document.getElementById('payment-details-form');
const paymentFormInputs = document.querySelectorAll('.payment-details-form-input');
const proceedToPayBtn = document.getElementById('proceed-to-pay-btn');
const paymentGatewayElem = document.querySelector('.js-payment-gateway');
const momoPaymentForm = document.getElementById('momo-form');
// const completePaymentBtn = document.getElementById('finish-payment-btn');

const momoFormContainer = document.getElementById('momo-form-container');
const paymentApprovalContainer = document.getElementById('payment-approval-container');
const paymentFailureElem = document.getElementById('payment-failure');
const paymentSuccessfulElem = document.getElementById('payment-successful');

const paymentApprovedBtn = document.getElementById('payment-approved-btn');

const retryPaymentBtn = document.getElementById('retry-payment-btn');
// const backToStoreBtn = document.getElementById('back-to-store-btn');

showScrollBar(orderDetailsContainer);

proceedToPayBtn.addEventListener('click', () => {
  checkPaymentDetailsInputs();

  if (!paymentFormInputs[0].classList.contains('error') && !paymentFormInputs[1].classList.contains('error') && !paymentFormInputs[2].classList.contains('error') && !paymentFormInputs[3].classList.contains('error') && !paymentFormInputs[4].classList.contains('error')) {
    console.log('ALL IS WELL');
    switch (true) {
      case momo.checked:
        console.log('MOMO IS SELECTED');
        paymentGatewayElem.classList.remove('remove');
        break;
    
      default:
        console.log('OPTION NOT AVAILABLE YET');
        break;
    }
  } else {
    console.log('ERROR SOMEWHERE');
  }
});


paymentGatewayElem.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-payment-gateway') && paymentSuccessfulElem.classList.contains('remove')) {
    momoFormContainer.classList.remove('remove');
    paymentGatewayElem.classList.add('remove');
    paymentApprovalContainer.classList.add('remove');
    paymentFailureElem.classList.add('remove');
    console.log(paymentSuccessfulElem.classList.contains('remove'));
  } else if (e.target.classList.contains('js-payment-gateway') && !paymentSuccessfulElem.classList.contains('remove')) {
    // sessionStorage.setItem('redirected', true);
    // window.location.href = "products.html";
    // window.history.replaceState();
  }
});



function checkPaymentDetailsInputs() {
  // const paymentFormInputs = document.querySelectorAll('.payment-details-form-input');
  for (const inputElem of paymentFormInputs) {
    if (inputElem.value === '') {
      inputElem.classList.add('error');
      console.log(inputElem)
    }
  
    if (paymentFormInputs[3].value !== '') {
      checkEmail();
    } 
  
    paymentFormInputs[3].addEventListener('keyup', () => {
      checkEmail();
    })
  
    inputElem.addEventListener('keyup', () => {
      if (inputElem.value !== '') {
        inputElem.classList.remove('error');
      } else {
        inputElem.classList.add('error');
      }
    });
  }
}


function checkEmail() {
  const emailInputElem = document.querySelectorAll('.payment-details-form-input')[3];

  const emailRegex = /^([a-z\d\.-]+)@([a-z\d-]+\.)([a-z]{2,3})?$/;

  if (!emailInputElem.value.match(emailRegex)) {
    emailInputElem.classList.add('error');
  } else {
    emailInputElem.classList.remove('error');
  }
}


momoPaymentForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const alert1 = document.getElementById('momo-alert-1');
  const alert2 = document.getElementById('momo-alert-2');
  const momoInputElems = document.querySelectorAll('.momo-input');
  
  // const momoFormData = new FormData(momoPaymentForm);
  // const [key, value] = momoFormData.entries();

  // if (value[0].startsWith('+233')) {
  //   let numbersLeft = value[0].slice(4);
  //   console.log(numbersLeft);
  // } else {
  //   if (value[0].length !== 10) {
  //     alert1.classList.remove('remove')
  //   }
  // }



  // if (momoInputElems[0].value !== '' && momoInputElems[1].value !== '') {
    if (momoInputElems[0].value !== momoInputElems[1].value) {
      alert2.classList.remove('remove');
      momoInputElems[1].classList.add('error');
    } else {
      // window.alert('ALL GOOD!');
      momoInputElems[0].classList.remove('error');
      momoInputElems[1].classList.remove('error');
      alert1.classList.add('remove');
      alert2.classList.add('remove');

      try {
        // make request to momo
        momoFormContainer.querySelector('.loading').classList.remove('remove');
        // throw new Error('SERVER ERROR');

        setTimeout(() => {
          momoFormContainer.classList.add('remove');
          paymentApprovalContainer.classList.remove('remove');
          momoFormContainer.querySelector('.loading').classList.add('remove');
        }, 2000);

        // momoFormContainer.classList.add('remove');
        // paymentApprovalContainer.classList.remove('remove');
        // momoFormContainer.querySelector('.loading').classList.add('remove');

      } catch (error) {
        momoFormContainer.querySelector('.loading').classList.add('remove');
        momoFormContainer.classList.add('remove');
        paymentFailureElem.classList.remove('remove');
      }
    }

  // } 
  // else {
  //   momoInputElems[0].classList.add('error');
  //   momoInputElems[1].classList.add('error');
  // }
  // if (momoInputElems[1].value === '') {
  //   momoInputElems[1].classList.add('error');
  // }

  document.querySelectorAll('.momo-input').forEach(inputElem => {
    inputElem.addEventListener('keydown', () => {
      // if (momoInputElems[0].value !== '' && momoInputElems[1].value !== '') {
        // if (momoInputElems[0].value == momoInputElems[0].value) {
        //   console.log(momoInputElems[0].value === momoInputElems[0].value)
        //    alert1.classList.add('remove');
        //    alert2.classList.add('remove');
        //    momoInputElems[0].classList.remove('error');
        //   momoInputElems[1].classList.remove('error');
        // } else if(momoInputElems[0].value === momoInputElems[0].value) {
        //   alert2.classList.remove('remove');
        //   momoInputElems[1].classList.add('error');

        // window.alert('ALL GOOD!');
        // }
      // } 
      // if (value[0] !== value[1]) {
      //   alert2.classList.remove('remove');
      //   momoInputElems[1].classList.add('error');
      // } else {
      //   alert1.classList.add('remove');
      //   alert2.classList.add('remove');
      //   momoInputElems[0].classList.remove('error');
      //   momoInputElems[1].classList.remove('error');
      // }
    });
  });

  // for (const [key, value] of momoFormData.entries()) {
  //   console.log(`${key}: ${value}`);
  // }
});

paymentApprovedBtn.addEventListener('click', () => {
  paymentApprovalContainer.querySelector('.js-loading').classList.remove('remove');
  // throw new Error('NOT PAID YET');
  try {
    // check if payment was successful
    paymentApprovalContainer.querySelector('.js-loading').classList.remove('remove');
    // throw new Error('NOT PAID YET');
    setTimeout(() => {
      paymentApprovalContainer.querySelector('.js-loading').classList.add('remove');
      paymentApprovalContainer.classList.add('remove');
      paymentSuccessfulElem.classList.remove('remove');
    }, 2000);

    // paymentApprovalContainer.classList.add('remove');
    // paymentSuccessfulElem.classList.remove('remove');
    // paymentApprovalContainer.querySelector('.js-loading').classList.add('remove');
  } catch (error) {
    paymentApprovalContainer.querySelector('.js-loading').classList.add('remove');
    paymentApprovalContainer.classList.add('remove');
    paymentFailureElem.classList.remove('remove');
  }
});

retryPaymentBtn.addEventListener('click', () => {
  momoFormContainer.classList.remove('remove');
  paymentFailureElem.classList.add('remove');
});