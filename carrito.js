
document.addEventListener("DOMContentLoaded", function() {
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const carritoLista = document.getElementById("carrito-lista");
  const totalSpan = document.getElementById("carrito-total");
  const contador = document.getElementById("cart-count");

  function actualizarCarrito() {
    if (carritoLista) {
      carritoLista.innerHTML = "";
      let total = 0;

      carrito.forEach((producto, index) => {
        const item = document.createElement("li");
        item.innerHTML = `
          ${producto.nombre} - ${producto.precio}
          <button data-index="${index}" style="margin-left: 10px; padding: 2px 6px; background: red; color: white; border: none; border-radius: 4px; cursor: pointer;">✕</button>
        `;
        carritoLista.appendChild(item);
      });

      // Activar botones de eliminar
      carritoLista.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", function() {
          const idx = parseInt(this.dataset.index);
          carrito.splice(idx, 1);
          guardarYActualizar();
        });
      });

      total = carrito.reduce((sum, p) => sum + parseFloat(p.precio.replace('$', '')), 0);
      if (totalSpan) totalSpan.textContent = "$" + total.toFixed(2);
    }

    if (contador) contador.textContent = carrito.length;
  }

  function guardarYActualizar() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
  }

  if (document.querySelectorAll(".comprar")) {
    document.querySelectorAll(".comprar").forEach(boton => {
      boton.addEventListener("click", function() {
        const producto = {
          nombre: this.dataset.nombre,
          precio: this.dataset.precio
        };
        carrito.push(producto);
        guardarYActualizar();
        alert(`${producto.nombre} agregado al carrito.`);
      });
    });
  }

  actualizarCarrito();
});
