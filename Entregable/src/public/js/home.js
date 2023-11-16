import PM from ''
const ProductManager = new PM();

const socket = io()

function updateProductsList ( products ) {
  const productList = ProductManager.;
  console.log(productList)
  productList.innerHTML = '';

  products.forEach( ( product ) => {
    productList.innerHTML += `
          <li class='product-item' data-id='${product._id}'>
              <div class='product-item__body'>
                  <p class='ff-secondary fs-2 ls-1'>${product.title}</p>
                  <p>${product.category}</p>
                  <p>${product.Description}</p>
                  <p>Price: ${product.price}</p>
              </div>
              <div class='product-item__buttons'>
                  <button class='btn-addToCart ff-secondary fs-2'>Add to Cart</button>
              </div>
          </li>
      `;
  } );
}
socket.on( 'update-products', updateProductsList );