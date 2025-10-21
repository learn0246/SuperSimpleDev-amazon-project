import {cart, addToCart, calculateCartQuantity, updateCartQuantity} from '../data/cart.js';
import {products, loadProducts, loadProductsFetch} from '../data/products.js';
import {formatCurrency} from './utils/money.js';

loadProducts(renderProductsGrid);

export function renderProductsGrid(){
  let productsHTML = '';
  let filteredProduct = SearchingProduct();

  filteredProduct.forEach((product) => {
    productsHTML += `
      <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${product.image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${product.name}
        </div>

        <div class="product-rating-container">
          <img class="product-rating-stars"
            src=${product.getStarsUrl()}>
          <div class="product-rating-count link-primary">
            ${product.rating.count}
          </div>
        </div>

        <div class="product-price">
          ${product.getPrice()}
        </div>

        <div class="product-quantity-container">
          <select class="js-selector-quantity-${product.id}">
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>
        
        ${product.extraInfoHTML() }
        
        <div class="product-spacer"></div>

        <div class="added-to-cart">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart"
        data-product-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `
  });

  
  document.querySelector('.js-products-grid').
    innerHTML = productsHTML;

  updateCartQuantity();

  document.querySelectorAll('.js-add-to-cart').
    forEach((button) => {
      button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        let quantity = Number(document.querySelector(`.js-selector-quantity-${productId}`).value);
        
        addToCart(productId, quantity);
        updateCartQuantity();
      });
    });
}
  
function SearchingProduct(){
  let filteredProduct = products;
  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
      document.querySelector('.js-search-button').click();
    }  
  });

  document.querySelector('.js-search-button').addEventListener('click', () => {
    const searchValue = document.querySelector('.js-search-bar').value
    window.location.href = `amazon.html?search=${searchValue}`;
  });

  const url = new URL(window.location);
  const search  = url.searchParams.get('search');
  const keyword = search != null 
    ? String(search.toLowerCase()) 
    : '';

  if(keyword){
    filteredProduct = products.filter((product) => {
      return product.name.toLowerCase().includes(keyword);
    });
  }

  if(!filteredProduct[0]){
    document.querySelector('.js-display-message').innerHTML = `
      <p style="text-align: center; width:100%;">Sorry. there is no products match your search : '${url.searchParams.get('search')}'</p>
    ` 
  }

  return filteredProduct;
}