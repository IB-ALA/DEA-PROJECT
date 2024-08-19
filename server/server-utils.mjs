

export function createOrderId() {
  const timeStampPart = Date.now().toString(16).slice(-5);
  const randomPart = Math.floor(Math.random() * (2 ** 24)).toString(16).padStart(6, '0');
  return timeStampPart + randomPart;
}

console.log(createOrderId());