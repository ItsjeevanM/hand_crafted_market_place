async function loadProducts() {
  const res = await fetch("http://localhost:5000/api/products");
  const products = await res.json();
  const list = document.getElementById("products");
  list.innerHTML = products.map(
    p => `<div><h3>${p.title}</h3><p>₹${p.price}</p></div>`
  ).join("");
}
loadProducts();
