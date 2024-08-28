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

export class NewProduct {
  id;
  name;
  image;
  pricePesewas;

  constructor(productDetails) {
    this.id = productDetails.product_id;
    this.name = productDetails.name;
    this.image = productDetails.image;
    this.pricePesewas = productDetails.price_in_pesewas;
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

/*
async function getProductProducts () {
  let getProductProducts = await fetctAllProducts();
  // console.log({getProductProducts});
  if (getProductProducts.length !== 0) {
    getProductProducts = getProductProducts.map(product => new NewProduct(product));
    return getProductProducts;
  } else {
    // means there was an error

  }
  // getProductProducts = getProductProducts.map(product => new NewProduct(product));
  // return getProductProducts;
}
*/

// console.log(getProductProducts());


export async function getProduct(productId) {
  let matchingProduct;
  let products = await fetctAllProducts();
  if (products.length !== 0) {
    products = products.map(product => new NewProduct(product));
    products.forEach(product => {
      if (productId == product.id) {
        matchingProduct = product;
      }
    });
  
    if (matchingProduct) {
      return matchingProduct; 
    }
  } else {
    // means there was an error
  }
}

// getProduct(1).then(value => console.log(value));


/*
export let newProducts = JSON.parse(sessionStorage.getItem('newProducts'));

if (!newProducts) {
  console.log('no newProducts');
  // newProducts = 'hmm'
  // console.log(newProducts);
  fetctAllProducts();
} else {
  newProducts = newProducts.map(product => new NewProduct(product))
}

async function fetctAllProducts() {
  // let newProducts = [];
  try {
    const productsFetch = await fetch('http://localhost:5000/dea/products');
    const response = await productsFetch.json();
    if (response.Success) {
      newProducts = response.data;
      sessionStorage.setItem('newProducts', JSON.stringify(newProducts));
      newProducts = newProducts.map(product => new NewProduct(product));
      console.log(newProducts);
      // return newProducts;
    } else {
      throw new Error("Couldn't Get Products. Try again later");
    }
  } catch (error) {
    // try rendering the error message from here directly onto the products section.
    // result.innerHTML = `<div class="alert alert-danger">Can't Fetch Data</div>`
    console.error(error);
    newProducts = [];
  }
}

*/

/*
(async () => {
  const cachedProducts = JSON.parse(sessionStorage.getItem('newProducts'));
  if (!cachedProducts) {
    export const newProducts = await fetctAllProducts();
  } else {
    
  }
}) ();
*/



export async function fetctAllProducts() {
  let dbProducts;
  const cachedProducts = JSON.parse(sessionStorage.getItem('products'));
  if (cachedProducts) {
    // console.log({cachedProducts});
    return cachedProducts;
  }
  
  else {
  
    try {
      const productsFetch = await fetch('http://localhost:5000/dea/products');
      const response = await productsFetch.json();
      if (response.Success) {
        dbProducts = response.data;
        sessionStorage.setItem('products', JSON.stringify(dbProducts));
        console.log({dbProducts});
        return dbProducts;
        // dbProducts = dbProducts.map(product => new NewProduct(product));
        // console.log(dbProducts);
        // return newProducts;
      } else {
        // throw new Error("Couldn't Get Products. Try again later");
        return [];
      }
    } catch (error) {
      // try rendering the error message from here directly onto the products section.
      // result.innerHTML = `<div class="alert alert-danger">Can't Fetch Data</div>`
      // console.error(error);
      return [];
    }

  }

}

 
// fetctAllProducts().then(value => console.log(value));
// console.log(newProducts);
// console.log(products);

// sessionStorage.removeItem('products');