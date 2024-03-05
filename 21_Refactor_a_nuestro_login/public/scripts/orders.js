const socket = io();

socket.on("orders", (data) => {
  console.log(data)
  const template = data
    .map(
      (each) => `
            <div class="card m-2" style="width: 360px">
            <img src="${each.product_photo[0]}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.title}">
            <h5 class="p-2 text-center card-title"> Precio: $${each.product_price} UDS</h5>
            <h5 class="p-2 text-center card-title"> Cantidad: ${each.quantity} piezas</h5>
            <h5 class="p-2 text-center card-title"> Creacion: ${each.orderdate}</h5>
            <h5 class="p-2 text-center card-title"> Estado: ${each.state}</h5>
            </div>`
    )
    .join("");
  document.querySelector("#orders").innerHTML = template;
});