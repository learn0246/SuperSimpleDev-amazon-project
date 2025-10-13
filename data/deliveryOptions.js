import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
export const deliveryOptions = [
  {
    id: '1',
    deliveryDays: 7,
    priceCents: 0
  },
  {
    id: '2',
    deliveryDays: 3,
    priceCents: 499
  },
  {
    id: '3',
    deliveryDays: 1,
    priceCents: 999
  }
]

export function getDeliveryOption(deliveryOptionId){
  let deliveryOption;
      
  deliveryOptions.forEach((option) => {
    if(deliveryOptionId === option.id){
      deliveryOption = option;
    }
  });

  return deliveryOption || deliveryOptions[0];
}

export function calculateDeliveryDate(deliveryOption){
  let deliveryDate = dayjs();
  let deliveryDateString;
  let remainingDays = deliveryOption.deliveryDays;
  while(remainingDays > 0){
    deliveryDate = deliveryDate.add(1, 'day');
    deliveryDateString = deliveryDate.format('dddd');
    if(deliveryDateString === 'Sunday' || deliveryDateString === 'Saturday'){
      continue;
    }
    
    remainingDays --;
  }
  deliveryDateString = deliveryDate.format('dddd, MMMM D'); 
  return deliveryDateString;  
}

export function isValidDeliveryOption(deliveryOption){
  let validation = false;
  deliveryOptions.forEach((option) => {
    if(option.id === deliveryOption){
      validation = true;
    }
  return validation;
  });
}
