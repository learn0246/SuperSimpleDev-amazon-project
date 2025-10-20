import {deliveryOptions} from "./deliveryOptions.js"
export let cart;

loadFromStorage();

export function loadFromStorage(){
  cart = JSON.parse(localStorage.getItem('cart')) || 
    [{
      productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
      quantity: 2,
      deliveryOptionId: '1'
    },{
      productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
      quantity: 1,
      deliveryOptionId: '2'
    }];
}

export function addToCart(productId, quantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingItem = cartItem;
    }
  });

  if(matchingItem){
    matchingItem.quantity += quantity;
  }else{
    cart.push({
      productId,
      quantity: quantity,
      deliveryOptionId: '1'
    })
  }

  saveToStorage();
}

export function removeFromCart(productId){
  const newCart = [];
  cart.forEach((cartItem) => {
    if(cartItem.productId !== productId){
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  saveToStorage();
}


export function saveToStorage(){
  localStorage.setItem('cart', JSON.stringify(cart));
}


export function calculateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach((item) => {
    cartQuantity += item.quantity;
  });

  return cartQuantity;
}

export function updateQuantity(productId, newQuantity){
  let matchingItem;

  cart.forEach((cartItem) => {
    if(cartItem.productId === productId){
      matchingItem = cartItem;
    }
  });
  matchingItem.quantity = newQuantity;

  saveToStorage()
}


export function updateDeliveryOption(productId, deliveryOptionId){
  let matchingProduct;

  cart.forEach((cartItem) => {
    if(productId === cartItem.productId){
      matchingProduct = cartItem;
    }
  });

  if(!matchingProduct){
    return;
  }

  
  deliveryOptions.forEach((option) => {
    if(deliveryOptionId === option.id){
      matchingProduct.deliveryOptionId = deliveryOptionId;
      saveToStorage();
    }
  });  
}

export function loadCart(func){
  const xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    func();
  });
  
  xhr.open('GET', 'https://supersimplebackend.dev/cart');
  xhr.send();
}

export async function loadCartFetch(){
  const response = await fetch('https://supersimplebackend.dev/cart');
  const text = await response.text();
  console.log(text);
  return text;
}

export function updateCartQuantity(){
  let cartQuantity = calculateCartQuantity();

  document.querySelector('.js-cart-quantity').
    innerHTML = cartQuantity;
}