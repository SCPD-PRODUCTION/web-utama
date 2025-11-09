// ========== DATA PRODUK DARI LOCAL STORAGE ==========
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

const produkContainer = document.getElementById("produkContainer");
const searchInput = document.getElementById("searchInput");

// ========== BUAT BARIS PRODUK (MAKS 20 PER BARIS) ==========
function createRows(data) {
  const rows = [];
  for (let i = 0; i < data.length; i += 20) {
    rows.push(data.slice(i, i + 20));
  }
  return rows;
}

// ========== RENDER PRODUK ==========
function renderProduk(filtered = produkData) {
  produkContainer.innerHTML = "";
  const rows = createRows(filtered);

  rows.forEach((rowData) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("produk-row-wrapper");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("produk-row");

    rowData.forEach((p) => {
      const item = document.createElement("div");
      item.classList.add("produk-item");
      item.innerHTML = `
        <img src="${p.foto}" alt="${p.judul}">
        <h4>${p.judul}</h4>
        <p>${p.deskripsi}</p>
        <p class="harga">Rp ${p.harga}</p>
        <button onclick="beliProduk('${p.judul}')">Beli</button>
      `;
      rowDiv.appendChild(item);
    });

    // Panah kiri
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("slider-bt
