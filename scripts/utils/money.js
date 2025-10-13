export function formatCurrency(priceCents){
  const sign = Math.sign(priceCents); 
  const abs = Math.abs(priceCents);
  const result = sign * (Math.round(abs) / 100)
  return (result).toFixed(2);

  //return (Math.round(priceCents) / 100).toFixed(2);
}