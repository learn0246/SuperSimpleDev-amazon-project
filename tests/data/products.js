import {Product, Clothing, Appliance, products} from '../../data/products.js';

describe('test suite: class Product', () => {
  const product1 = new Product({
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/intermediate-composite-basketball.jpg",
    name: "Intermediate Size Basketball",
    rating: {
      stars: 4,
      count: 127
    },
    priceCents: 2095,
    keywords: [
      "sports",
      "basketballs"
    ]
  });

  it('check the product detail', () => {
    expect(product1).toEqual(products[1]);
  });

  it('check the getStarsUrl()', () => {
    expect(product1.getStarsUrl()).toEqual(`images/ratings/rating-40.png`);
  });

  it('check the getPrice()', () => {
    expect(product1.getPrice()).toEqual('$20.95');
  });

  it('check the extraInfoHTML()', () => {
    expect(product1.extraInfoHTML()).toEqual('');
  });
});

describe('test suite: class Clothing', () => {
  const product2 = new Clothing({
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56
    },
    priceCents: 799,
    keywords: [
      "tshirts",
      "apparel",
      "mens"
    ],
    type: "clothing",
    sizeChartLink: "images/clothing-size-chart.png"
  });
  
  it('check the product detail', () => {
    expect(product2).toEqual(products[2]);
  });

  it('check the getStarsUrl()', () => {
    expect(product2.getStarsUrl()).toEqual(`images/ratings/rating-45.png`);
  });

  it('check the getPrice()', () => {
    expect(product2.getPrice()).toEqual('$7.99');
  });

  it('check the extraInfoHTML()', () => {
    expect(product2.extraInfoHTML()).toEqual(`
      <a href="${product2.sizeChartLink}" target="_blank">
        Size chart
      </a>
    `);
  });
});

describe('test suite: class Appliance', () => {
  const product3 = new Appliance({
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/black-2-slot-toaster.jpg",
    name: "2 Slot Toaster - Black",
    rating: {
      stars: 5,
      count: 2197
    },
    priceCents: 1899,
    keywords: [
      "toaster",
      "kitchen",
      "appliances"
    ],
    type: "appliance",
    instructionsLink: "images/appliance-instructions.png",
    warrantyLink: "images/appliance-warranty.png"
    
  });
  
  it('check the product detail', () => {
    expect(product3).toEqual(products[3]);
  });

  it('check the getStarsUrl()', () => {
    expect(product3.getStarsUrl()).toEqual(`images/ratings/rating-50.png`);
  });

  it('check the getPrice()', () => {
    expect(product3.getPrice()).toEqual('$18.99');
  });

  it('check the extraInfoHTML()', () => {
    expect(product3.extraInfoHTML()).toEqual(`
      <a href="${product3.instructionsLink}" target="_blank">
        Instructions
      </a>
      <a href="${product3.warrantyLink}" target="_blank">
        Warranty
      </a>
    `);
  });
});