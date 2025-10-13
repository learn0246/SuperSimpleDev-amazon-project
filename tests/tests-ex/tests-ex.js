import { formatCurrency } from "../../scripts/utils/money.js";
import { loadFromStorage, cart, addToCart, saveToStorage} from "../../data/cart.js";

describe('16-a - 16-b', () => {
  //basic tests
  it('converts cnets into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });
  //edge tests
  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000)).toEqual('20.00');
  });

  it('tests negative number', () => {
    expect(formatCurrency(-1000.5)).toEqual('-10.01');
  });
});

describe('16-c', () => {
  it('use of .toHaveBeenCalledWith', () => {
    spyOn(localStorage, 'setItem').and.callFake(() => {
      return '[]';
    });
    localStorage.setItem('cart', '[]');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart', '[]');
  });
});
