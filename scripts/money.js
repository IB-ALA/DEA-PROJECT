

export function formatCurrency(pricePesewas) {
  return (Math.round(pricePesewas) / 100).toFixed(2);
}

export default formatCurrency;