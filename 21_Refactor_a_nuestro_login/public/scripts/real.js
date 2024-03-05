const socket = io();

socket.on("products", (data) => {
  const template = data
    .map(
      (each) => `
            <div class="card m-2" style="width: 360px">
            <img src="${each.photo}" style="height: 240px" class="card-img-top object-fit-cover" alt="${each.title}">
            <h5 class="p-2 text-center card-title">${each.title} ${each.price}</h5>
            </div>`
    )
    .join("");
  document.querySelector("#products").innerHTML = template;
});

document.querySelector("#search").addEventListener("click", (val)=>{
  val.preventDefault();
  const value = document.querySelector("#myInput").value;
  socket.emit("filterProduct", value)
})