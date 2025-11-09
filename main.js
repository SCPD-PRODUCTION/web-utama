// Ambil produk dari localStorage (sinkron web admin)
let produkData = JSON.parse(localStorage.getItem("produkData")) || [];

const produkContainer = document.getElementById("produkContainer");
const searchInput = document.getElementById("searchInput");

// Bagi produk jadi baris (max 20 per baris)
function createRows(data) {
  const rows = [];
  for (let i = 0; i < data.length; i += 20) {
    rows.push(data.slice(i, i + 20));
  }
  return rows;
}

// Render produk
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
    prevBtn.classList.add("slider-btn", "prev-btn");
    prevBtn.innerHTML = "&#8592;";
    prevBtn.addEventListener("click", () => {
      rowDiv.scrollBy({ left: -220, behavior: "smooth" });
    });

    // Panah kanan
    const nextBtn = document.createElement("button");
    nextBtn.classList.add("slider-btn", "next-btn");
    nextBtn.innerHTML = "&#8594;";
    nextBtn.addEventListener("click", () => {
      rowDiv.scrollBy({ left: 220, behavior: "smooth" });
    });

    wrapper.appendChild(prevBtn);
    wrapper.appendChild(rowDiv);
    wrapper.appendChild(nextBtn);
    produkContainer.appendChild(wrapper);
  });
}

// Search fitur
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = produkData.filter((p) =>
    p.judul.toLowerCase().includes(keyword)
  );
  renderProduk(filtered);
});

// Tombol beli → WhatsApp
window.beliProduk = function (namaProduk) {
  const nomorWA = "6288976424767"; // Ganti nomor kamu
  const text = encodeURIComponent(`Halo, saya tertarik membeli produk: ${namaProduk}`);
  window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
};

// Klik logo → ke atas
document.getElementById("logo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Load awal
renderProduk();
