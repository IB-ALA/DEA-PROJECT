import { formatCurrency } from '../money.js';



class Product {
  id;
  name;
  image;
  pricePesewas;

  constructor(productDetails) {
    this.id = productDetails.id;
    this.name = productDetails.name;
    this.image = productDetails.image;
    this.pricePesewas = productDetails.pricePesewas;
  }

  getPrice() {
    return `₵${formatCurrency(this.pricePesewas)}`;
  }

  getImage() {
    return `images/products/${this.image}`;
  }
}


export const products = [
  {
    name: 'adults plain cotton t-shirt',
    id: 'product001',
    image: 'images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg',
    pricePesewas: 2050
  },
  {
    name: 'black 2 slot toaster',
    id: 'product002',
    image: 'images/products/black-2-slot-toaster.jpg',
    pricePesewas: 1599
  },
  {
    name: 'coffeemaker & glass carafe',
    id: 'product003',
    image: 'images/products/coffeemaker-with-glass-carafe-black.jpg',
    pricePesewas: 3000
  },
  {
    name: 'countertop blender',
    id: 'product004',
    image: 'images/products/countertop-blender-64-oz.jpg',
    pricePesewas: 1200
  },
  {
    name: 'luxury tower set, 6 piece',
    id: 'product005',
    image: 'images/products/luxury-tower-set-6-piece.jpg',
    pricePesewas: 1550
  },
  {
    name: 'round sunglasses black',
    id: 'product006',
    image: 'images/products/round-sunglasses-black.jpg',
    pricePesewas: 1000
  },
  {
    name: 'umbrella',
    id: 'product007',
    image: 'images/products/umbrella.jpg',
    pricePesewas: 3000
  },
  {
    name: 'vanity mirror, silver',
    id: 'product008',
    image: 'images/products/vanity-mirror-silver.jpg',
    pricePesewas: 2500
  },
].map(product => new Product(product));


export function getProduct(productId) {
  let matchingProduct;
  products.forEach(product => {
    if (productId === product.id) {
      matchingProduct = product
    }
  });

  if (matchingProduct) {
    return matchingProduct; 
  }
}

// console.log(products);