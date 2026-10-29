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
[![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)](https://subnet-calculator.vercel.app)

[Live Demo](https://subnet-calculator.vercel.app) •
[Laporan Bug](https://github.com/username/subnet-calculator/issues) •
[Request Fitur](https://github.com/username/subnet-calculator/issues) •
[Kontribusi](#-kontribusi)

</div>

---

## 📸 Screenshot

<div align="center">

### Subnet Calculator Interface
![Subnet Calculator](https://via.placeholder.com/800x450/1e293b/06b6d4?text=Subnet+Calculator+Interface)
*Interface kalkulator subnet dengan dark theme glassmorphism*

### VLSM Calculator dengan Visualisasi
![VLSM Calculator](https://via.placeholder.com/800x450/1e293b/06b6d4?text=VLSM+Calculator+with+Visualization)
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
git clone https://github.com/username/subnet-calculator.git

# Navigate to project directory
cd subnet-calculator

# Install dependencies
npm install

# Start development server
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

### Build for Production

```bash
# Build production bundle
npm run build

# Preview production build
npm run preview
```

---

## 📖 Cara Penggunaan

### Subnet Calculator

1. **Masukkan IP Address** - Contoh: `192.168.1.0`
2. **Pilih Mode Input**:
   - **CIDR Mode**: Geser slider atau input angka (0-32)
   - **Subnet Mask Mode**: Input subnet mask (contoh: `255.255.255.0`)
3. **Klik "Hitung"** - Lihat hasil lengkap termasuk:
   - Network & Broadcast Address
   - Usable Hosts
   - Binary Representation
   - IP Class & Type

### VLSM Calculator

1. **Input Network Dasar** - IP address dan CIDR prefix
2. **Tambah Subnet**:
   - Klik "Tambah Subnet" untuk menambah row
   - Isi nama subnet dan jumlah host yang dibutuhkan
3. **Auto-Calculate** - Hasil otomatis muncul (atau klik "Hitung VLSM")
4. **Export/Copy** - Download CSV atau copy ke clipboard

#### Contoh Penggunaan VLSM

```
Network: 192.168.1.0/24

Subnet Requirements:
- Departemen IT: 50 hosts
- Departemen HR: 25 hosts
- Departemen Finance: 10 hosts

Result:
1. Departemen IT     → 192.168.1.0/26   (62 usable hosts)
2. Departemen HR     → 192.168.1.64/27  (30 usable hosts)
3. Departemen Finance → 192.168.1.96/28  (14 usable hosts)

Total Subnet: 3
Host Terpakai: 128
Host Tersisa: 128
Efisiensi: 50%
```

---

## 🌍 Live Demo

**[🚀 Coba Live Demo](https://subnet-calculator.vercel.app)**

Deployed on Vercel with automatic CI/CD from main branch.

---

## 🤝 Kontribusi

Kontribusi sangat diterima! Berikut cara untuk berkontribusi:

### Development Workflow

1. **Fork repository**
2. **Create feature branch**
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. **Make your changes**
   - Follow TypeScript best practices
   - Maintain consistent code style
   - Add comments for complex logic
4. **Test your changes**
   ```bash
   npm run build
   ```
5. **Commit your changes**
   ```bash
   git commit -m 'Add some AmazingFeature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/AmazingFeature
   ```
7. **Open a Pull Request**

### Contribution Guidelines

- ✅ Write clear, descriptive commit messages
- ✅ Update documentation if needed
- ✅ Add tests for new features
- ✅ Follow existing code style
- ✅ Keep PRs focused and small

### Ideas for Contributions

- [ ] Add IPv6 support
- [ ] Implement subnet visualization with D3.js
- [ ] Add more preset templates
- [ ] Internationalization (i18n) support
- [ ] PWA support for offline usage
- [ ] Dark/Light theme toggle

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Subnet Calculator

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 🙏 Acknowledgments

- Inspired by various subnetting tools and calculators
- Built with modern web technologies for optimal performance
- Designed with accessibility and user experience in mind

---

## 📞 Contact

Untuk pertanyaan, saran, atau kolaborasi:

- 📧 Email: your.email@example.com
- 🐙 GitHub: [@username](https://github.com/username)
- 🌐 Website: [yourwebsite.com](https://yourwebsite.com)

---

<div align="center">

**⭐ Jika project ini bermanfaat, berikan bintang di GitHub! ⭐**

Dibuat dengan ❤️ oleh [Your Name](https://github.com/username)

</div>
