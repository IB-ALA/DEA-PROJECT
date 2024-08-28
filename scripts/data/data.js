
export const discount = .1;
export const additionalCost = 200;
export const emailDetailsForBackend = {};

export function saveEmailDetailsForBackend() {
  sessionStorage.setItem('emailDetailsForBackend', JSON.stringify(emailDetailsForBackend));
}

export function retrieveEmailDetailsForBackend() {
  return JSON.parse(sessionStorage.getItem('emailDetailsForBackend'));
}

export function removeEmailDetailsForBackend() {
  sessionStorage.removeItem('emailDetailsForBackend');
}