import { updateCartQuantity } from "../data/cart.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsFetch, getProduct } from "../data/products.js";
import { progress } from "../data/orders.js";
import { searchingProduct } from "./amazon/search.js";

async function loadTrackingPage(){
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId');
  const orderId = url.searchParams.get('orderId');
  const product = getProduct(productId);
  const order = getOrder(orderId);

  let productDetails = '';
  order.products.forEach((details) => {
    if(productId === product.id){
      productDetails = details;
    }
  })
  
  const deliveryDate = dayjs(productDetails.
    estimatedDeliveryTime).format('MMMM DD');

  const progressTime = progress(order, productDetails);
  const trackingPageHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date js-arriving-date">
    Arriving on ${deliveryDate}
    </div>  
  
    <div class="product-info">
    ${product.name}
    </div>

    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>

    <img class="product-image" src="${product.image}">

    <div class="progress-labels-container">
      <div class="
        progress-label 
        ${progressTime < 50 ? 'current-status' : ''}
        ">
        Preparing
      </div>
      <div class="
        progress-label 
        ${(progressTime > 50 && progressTime < 100) ? 'current-status' : ''}
        ">
        Shipped
      </div>
      <div class="
        progress-label 
        ${progressTime >= 100 ? 'current-status' : ''}
        ">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar" style="width:${progressTime}%"></div>
    </div>
  `

  document.querySelector(`.js-order-tracking`).innerHTML = trackingPageHtml;

  updateCartQuantity();
  searchingProduct();
}


loadTrackingPage()



