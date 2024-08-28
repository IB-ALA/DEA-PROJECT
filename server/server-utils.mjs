
// import ejs from 'ejs';
// import { orderPlaced } from './trial.mjs';

export function createOrderId() {
  const timeStampPart = Date.now().toString(16).slice(-5);
  const randomPart = Math.floor(Math.random() * (2 ** 24)).toString(16).padStart(6, '0').slice(-5);
  return timeStampPart + randomPart;
}

// this does not work. problem might be the return
// export function generateEmailTemplate(orderPlaced) {
//   const templateFile = './server/email-template/template.ejs';

//   ejs.renderFile(templateFile, orderPlaced, (err, html) => {
//     if (err) {
//       return err;
//     }

//     // console.log(html);
    
//     return html;
//   });
// }