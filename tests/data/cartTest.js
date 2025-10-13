import {cart, addToCart, loadFromStorage, removeFromCart, updateDeliveryOption} from '../../data/cart.js';
const productId1 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
const productId2 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
describe('test suite: addToCart()', () => {
  beforeEach( () => {
    spyOn(localStorage, 'setItem');
  });
   
  it('adds an existing product to the cart', () => {
    
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    }) 
    
    loadFromStorage();
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(2);
    
    //16-c
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 2,
        deliveryOptionId: '1'
      }]
    ));
    
  });

  it('adds a new product to the cart', () => {
    //we don't want to change local storage after we addToCart(),
    //so we made a fake version of setItem
    //spyOn(localStorage, 'setItem');
    
    //we want localStorage is [], so when we addToCart, the cart.length would be 1
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });
    loadFromStorage();
    addToCart('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
    expect(cart[0].quantity).toEqual(1);
  
    //16-d
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', JSON.stringify(
      [{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }]
    ))
  });

  
});

describe('test suite: removeFromCart()', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadFromStorage();
  });

  it('removes item from cart', () => {
    removeFromCart(productId1);
    expect(cart.length).toEqual(0);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
  });

  it('remove item that dose not exist in the cart', () => {
    removeFromCart(productId2);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
  });

  it('called the localStorage.setItem and with the correct value', () => {
    removeFromCart(productId1);
    
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
  });
});

describe('test suite: updateDeliveryOption()', () => {
  beforeEach(() => {
    spyOn(localStorage, 'setItem');
    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    })
    loadFromStorage();
  })
  
  it('update the delivery option for item', () => {
    updateDeliveryOption(productId1, '1');
    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId1);

    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

    expect(localStorage.setItem).toHaveBeenCalledWith('cart', 
      JSON.stringify([{
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );
  });

  //edge test
  it('does nothing if the product is not in the cart', () => {
    updateDeliveryOption('123', '1');
    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId1);

    expect(cart[0].quantity).toEqual(1);
  });

  it('does nothing if the deliveryOptionId is not exist', () => {
    updateDeliveryOption(productId1, '4');

    expect(localStorage.setItem).toHaveBeenCalledTimes(0);

    expect(cart[0].deliveryOptionId).toEqual('1');

    expect(cart.length).toEqual(1);

    expect(cart[0].productId).toEqual(productId1);

    expect(cart[0].quantity).toEqual(1);
  })
});


