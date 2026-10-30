<div align="center">

# 🌐 Subnet Mask Calculator

### Kalkulator Subnetting Modern dengan VLSM Support

Kalkulator subnetting IP address yang powerful dengan fitur VLSM, visualisasi interaktif, dan export hasil dalam berbagai format.

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./LICENSE)
[![Build](https://img.shields.io/badge/Build-Passing-success?style=for-the-badge)]()
[![Deployed](https://img.shields.io/badge/Deployed-Cloudflare_Pages-orange?style=for-the-badge&logo=cloudflare)](https://kalkulator-subnet.pages.dev)

[Live Demo](https://kalkulator-subnet.pages.dev) •
[Laporan Bug](https://github.com/sebilongx/kalkulator-subnet/issues) •
[Request Fitur](https://github.com/sebilongx/kalkulator-subnet/issues) •
[Kontribusi](#-kontribusi)

</div>

---

## 📸 Screenshot

<div align="center">

### Subnet Calculator Interface
![Subnet Calculator](https://raw.githubusercontent.com/sebilongx/kalkulator-subnet/main/{3C56968E-25B6-45B0-8464-E5E181351527}.png)
*Interface kalkulator subnet dengan dark theme glassmorphism*

### VLSM Calculator dengan Visualisasi
![VLSM Calculator](https://raw.githubusercontent.com/sebilongx/kalkulator-subnet/main/{BE89D62D-6A8D-43C7-9D74-63DDEED83C}.png)
*Fitur VLSM dengan visualisasi alokasi interaktif dan tooltip*

</div>

---

## ✨ Fitur Unggulan

### 🧮 Subnet Calculator
- **Perhitungan Real-time** - Hasil kalkulasi muncul secara instan saat mengubah input
- **Dual Input Mode** - Support input via CIDR prefix atau subnet mask
- **Comprehensive Results** - Network address, broadcast, usable hosts, wildcard mask
- **Binary Representation** - Tampilan biner untuk pemahaman mendalam
- **IP Classification** - Deteksi otomatis class dan tipe IP (Public/Private)
- **Quick Reference Table** - Tabel referensi CIDR umum dengan highlight

### 📊 VLSM Calculator
- **Dynamic Subnet Management** - Tambah/hapus subnet secara dinamis
- **Smart Allocation Algorithm** - Algoritma VLSM otomatis (largest-first)
- **Visual Allocation Bar** - Chart interaktif dengan tooltip hover
- **Efficiency Analysis** - Perhitungan efisiensi penggunaan IP
- **Real-time Preview** - Auto-calculate dengan debounce 500ms
- **Preset Templates** - Template siap pakai untuk kantor kecil/menengah/besar

### 🚀 Advanced Features
- **Smart Warnings** - Peringatan untuk CIDR tidak optimal dan efisiensi rendah (<50%)
- **Export CSV** - Download hasil dalam format CSV
- **Copy to Clipboard** - Salin tabel hasil dengan satu klik
- **History Tracking** - Simpan 5 perhitungan terakhir di localStorage
- **Responsive Design** - Tampilan optimal di desktop dan mobile
- **Dark Mode Modern** - Glassmorphism design dengan dark blue gradient

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| ![React](https://img.shields.io/badge/React-18.3-blue) | 18.3 | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) | 5.6 | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-6.4-purple) | 6.4 | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue) | 3.4 | Styling |
| ![localStorage](https://img.shields.io/badge/localStorage-API-orange) | - | Data Persistence |

---

## 🚀 Cara Menjalankan

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/sebilongx/kalkulator-subnet.git

# Navigate to project directory
cd kalkulator-subnet

# Install dependencies
npm install

# Start development server
npm run dev
