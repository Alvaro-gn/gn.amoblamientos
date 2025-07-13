
document.addEventListener("DOMContentLoaded", function() {
  const carrito = [];
  const carritoLista = document.getElementById("carrito-lista");
  const totalSpan = document.getElementById("carrito-total");

  // Función para actualizar el contenido del carrito
  function actualizarCarrito() {
    carritoLista.innerHTML = "";
    let total = 0;

    carrito.forEach(producto => {
      const item = document.createElement("li");
      item.textContent = `${producto.nombre} - ${producto.precio}`;
      carritoLista.appendChild(item);
      total += parseFloat(producto.precio.replace('$', ''));
    });

    totalSpan.textContent = "$" + total.toFixed(2);
  }

  // Agregar eventos a los botones "Comprar ahora"
  document.querySelectorAll(".comprar").forEach(boton => {
    boton.addEventListener("click", function() {
      const producto = {
        nombre: this.dataset.nombre,
        precio: this.dataset.precio
      };
      carrito.push(producto);
      actualizarCarrito();
      alert(`${producto.nombre} agregado al carrito.`);
    });
  });
});
