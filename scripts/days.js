import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

// console.log(dayjs());

export function checkShopStatus() {
  const today = dayjs();
  const dayOfWeek = today.format('dddd');
  // console.log(dayOfWeek);
  const timeNow = Number(today.format('H'));
  let isOpened = false;

  // console.log(timeNow);

  switch (dayOfWeek) {
    case 'Monday':
      if (timeNow >= 9 && timeNow < 18) {
        isOpened = true;
      }
    break;

    case 'Tuesday':
      if (timeNow >= 9 && timeNow < 18) {
        isOpened = true;
      }
    break;

    case 'Wednesday':
      if (timeNow >= 9 && timeNow < 18) {
        isOpened = true;
      }
    break;

    case 'Thursday':
      if (timeNow >= 9 && timeNow < 18) {
        isOpened = true;
      }
    break;

    case 'Friday':
      if (timeNow >= 9 && timeNow < 17) {
        isOpened = true;
      }
    break;

    case 'Saturday':
      if (timeNow >= 9 && timeNow < 17) {
        isOpened = true;
      }
    break;
  
    default:
      isOpened = false;
    break;
  }

  return isOpened;
}