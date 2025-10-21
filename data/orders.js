import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addToOrder(order){
  orders.unshift(order);
  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function getOrder(orderId){
  let matchingOrder

  orders.forEach((order) => {
    if(order.id === orderId){
      matchingOrder = order;
    }
  });

  return matchingOrder;
}

export function progress(order, productDetails){
  const currentTime = dayjs().unix();
  const orderTime = dayjs(order.orderTime).unix();
  const deliveryTime = dayjs(productDetails.
    estimatedDeliveryTime).unix();
  
  let progressTime = ((currentTime - orderTime) / 
    (deliveryTime - orderTime)) * 100;
  
  progressTime = Math.round(progressTime);
  return progressTime;
}

