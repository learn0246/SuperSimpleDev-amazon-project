import { orders } from "../data/orders.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { loadProductsFetch, getProduct} from "../data/products.js";
import { updateCartQuantity, addToCart} from "../data/cart.js";

updateCartQuantity();

async function loadOrdersPage(){
  await loadProductsFetch();

  let ordersHtml = '';

  orders.forEach((order) => {
    const orderTime = dayjs(order.orderTime).format('MMMM DD');

    ordersHtml += `
      <div class="order-container"> 
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${orderTime}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productsListHtml(order)}
        </div>
      </div>
    `;
  });

  function productsListHtml(order){
    let productsHtml = ``
  
    order.products.forEach((productDetails) => {
      const deliveryTime = dayjs(productDetails.estimatedDeliveryTime).format('MMMM DD');
      const product = getProduct(productDetails.productId);
      
      productsHtml += `
        <div class="product-image-container">
          <img src="${product.image}">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${product.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${deliveryTime}
          </div>
          <div class="product-quantity">
            Quantity: ${productDetails.quantity}
          </div>
          <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${productDetails.productId}" 
            data-quantity="${productDetails.quantity}">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html?orderId=${order.id}&productId=${productDetails.productId}">
            <button class="track-package-button button-secondary js-track-package-button" data-product-id="${productDetails.productId}
              data-order-Id="${order.id}">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    return productsHtml;
  }
  document.querySelector('.js-orders').innerHTML = ordersHtml;

  document.querySelectorAll(`.js-buy-again-button`).forEach((button) => {
    button.addEventListener('click', () => {
      const productId = button.dataset.productId;
      const quantity = Number(button.dataset.quantity);

      addToCart(productId, quantity);
      updateCartQuantity();

      button.innerHTML = 'added';

      setTimeout(() => {
        button.innerHTML = `<img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>`;
      }, 1000);
    });
  });
}

loadOrdersPage();