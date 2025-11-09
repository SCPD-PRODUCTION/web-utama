// ===== Ambil produk dari GitHub (utama) atau localStorage (cadangan) =====
const GITHUB_JSON_URL = "https://raw.githubusercontent.com/SCPD-PRODUCTION/web-utama/main/produk.json";

async function loadProduk() {
  try {
    const res = await fetch(GITHUB_JSON_URL + "?t=" + new Date().getTime()); // cegah cache
    if (!res.ok) throw new Error("Gagal fetch produk.json");
    const data = await res.json();
    console.log("✅ Data produk diambil dari GitHub");
    return data;
  } catch (err) {
    console.warn("⚠️ Gagal ambil dari GitHub, pakai localStorage:", err.message);
    return JSON.parse(localStorage.getItem("produkData")) || [];
  }
}

let produkData = [];
const produkContainer = document.getElementById("produkContainer");
const searchInput = document.getElementById("searchInput");

// ===== Fungsi bantu: bagi produk jadi baris =====
function createRows(data) {
  const rows = [];
  for (let i = 0; i < data.length; i += 20) {
    rows.push(data.slice(i, i + 20));
  }
  return rows;
}

// ===== Render produk =====
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

// ===== Fitur pencarian =====
searchInput.addEventListener("input", (e) => {
  const keyword = e.target.value.toLowerCase();
  const filtered = produkData.filter((p) =>
    p.judul.toLowerCase().includes(keyword)
  );
  renderProduk(filtered);
});

// ===== Tombol beli (langsung ke WhatsApp) =====
window.beliProduk = function (namaProduk) {
  const nomorWA = "6288976424767"; // Ganti dengan nomor kamu
  const text = encodeURIComponent(`Halo, saya tertarik membeli produk: ${namaProduk}`);
  window.open(`https://wa.me/${nomorWA}?text=${text}`, "_blank");
};

// ===== Klik logo → scroll ke atas =====
document.getElementById("logo").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// ===== Muat data dari GitHub pertama kali =====
loadProduk().then((data) => {
  produkData = data;
  renderProduk();
});

// ===== Auto-refresh produk setiap 5 menit (opsional) =====
setInterval(async () => {
  const newData = await loadProduk();
  if (JSON.stringify(newData) !== JSON.stringify(produkData)) {
    produkData = newData;
    renderProduk();
    console.log("🔄 Produk diperbarui otomatis dari GitHub");
  }
}, 300000); // 300000 ms = 5 menit
