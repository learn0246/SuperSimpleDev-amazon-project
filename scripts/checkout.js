import { renderChedckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch} from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js';

async function loadPage(){
  try {
    await loadProductsFetch();

    await new Promise((resolve) => {
      loadCart(() => {
        resolve();
      });
    });

    renderPaymentSummary();
    renderOrderSummary(); 
    renderChedckoutHeader();

  } catch(error){
    console.log('Unexpected error')
  }
}

loadPage();

/*
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
*/


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