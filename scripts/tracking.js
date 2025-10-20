import { updateCartQuantity } from "../data/cart.js";
import { getOrder } from "../data/orders.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsFetch, getProduct } from "../data/products.js";


async function loadTrackingPage(){
  const url = new URL(window.location.href);
  const productId = url.searchParams.get('productId');
  const orderId = url.searchParams.get('orderId');
  const currentOrder = getOrder(orderId);
  
  await loadProductsFetch();

  const trackingPageHtml = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    ${TrackingPageProductHtml()}
  `
  
  function TrackingPageProductHtml(){
    let productHtml = '';

    currentOrder.products.forEach((productDetails) => {
      const deliveryDate = dayjs(productDetails.estimatedDeliveryTime).format('MMMM DD');
      const product = getProduct(productDetails.productId);
      
      productHtml += `
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
          <div class="progress-label">
            Preparing
          </div>
          <div class="progress-label current-status">
            Shipped
          </div>
          <div class="progress-label">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      `
    });

    return productHtml;
  }

  document.querySelector(`.js-order-tracking`).innerHTML = trackingPageHtml;

}

updateCartQuantity();
loadTrackingPage()



