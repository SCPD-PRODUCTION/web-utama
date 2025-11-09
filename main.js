// Ambil produk dari localStorage (web admin)
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

const produkContainer = document.getElementById("produkContainer");

// Bagi produk menjadi baris (max 20 produk per baris)
function createRows(data) {
  const rows = [];
  for(let i=0; i<data.length; i+=20){
    rows.push(data.slice(i, i+20));
  }
  return rows;
}

// Render produk dengan slider panah
function renderProduk() {
  produkContainer.innerHTML = "";
  const rows = createRows(produkData);

  rows.forEach((rowData,rowIndex) => {
    const wrapper = document.createElement("div");
    wrapper.classList.add("produk-row-wrapper");

    const rowDiv = document.createElement("div");
    rowDiv.classList.add("produk-row");

    rowData.forEach((p,i) => {
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

    // Tombol panah kiri
    const prevBtn = document.createElement("button");
    prevBtn.classList.add("slider-btn","prev-btn");
    prevBtn.innerHTML = "&#8592;";
    prevBtn.addEventListener("click", () => {
      rowDiv.scrollBy({ left: -220, behavior: 'smooth' });
    });

    // Tombol panah kanan
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("slider-btn","next-btn");
    nextBtn.innerHTML = "&#8594;";
    nextBtn.addEventListener("click", () => {
      rowDiv.scrollBy({ left: 220, behavior: 'smooth' });
    });

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(rowDiv);
    wrapper.appendChild(nextBtn);

    produkContainer.appendChild(wrapper);
  });
}

// Tombol beli → arahkan ke WhatsApp
window.beliProduk = function(namaProduk){
  const nomorWA = "628123456789"; // ganti nomor WA kamu
  const text = encodeURIComponent(`Halo, saya ingin membeli produk: ${namaProduk}`);
  window.open(`https://wa.me/${nomorWA}?text=${text}`,"_blank");
}

// Klik logo kembali ke branda (scroll ke atas)
document.getElementById("logo").addEventListener("click", () => {
  window.scrollTo({top:0, behavior:'smooth'});
});

// Render saat load
renderProduk();
