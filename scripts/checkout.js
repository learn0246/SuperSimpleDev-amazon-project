import { renderChedckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';

Promise.all([
  loadProductsFetch(),
  
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
  renderPaymentSummary();
  renderOrderSummary(); 
  renderChedckoutHeader();
})



/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve();
  });

}).then(() => {
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });
  
}).then(() => {
  renderPaymentSummary();
  renderOrderSummary(); 
  renderChedckoutHeader();
})
*/