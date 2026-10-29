<div align="center">

# 🌐 Subnet Mask Calculator

### Kalkulator Subnetting & VLSM IP Address yang Powerful

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed_on-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://subnet-calculator.vercel.app)

**Kalkulator subnetting IP address modern dengan fitur VLSM, export CSV, dan visualisasi interaktif.**

[Live Demo](https://subnet-calculator.vercel.app) •
[Report Bug](https://github.com/yourusername/subnet-calculator/issues) •
[Request Feature](https://github.com/yourusername/subnet-calculator/issues)

</div>

---

## 📸 Screenshots

### Subnet Calculator
![Subnet Calculator](https://via.placeholder.com/800x450/1e293b/06b6d4?text=Subnet+Calculator+Screenshot)
*Interface kalkulator subnet dengan dark theme glassmorphism*

### VLSM Calculator
![VLSM Calculator](https://via.placeholder.com/800x450/1e293b/06b6d4?text=VLSM+Calculator+Screenshot)
*Fitur VLSM dengan visualisasi alokasi interaktif*

---

## ✨ Features

### 🌐 Subnet Calculator
- 🎯 **Dual Input Mode** - Input menggunakan CIDR prefix atau subnet mask
- 📊 **Comprehensive Results** - Network address, broadcast, usable hosts, wildcard mask
- 🔢 **Binary Representation** - Tampilan biner untuk pemahaman mendalam
- 📋 **Quick Reference Table** - Tabel referensi CIDR umum dengan highlight
- 🎨 **Visual Range Bar** - Visualisasi range IP address
- 🔍 **IP Classification** - Deteksi otomatis class dan tipe IP (Public/Private)

### 📐 VLSM Calculator
- 🏗️ **Dynamic Subnet Management** - Tambah/hapus subnet secara dinamis
- ⚡ **Auto-Calculate** - Real-time preview dengan debounce 500ms
- 🎯 **Smart Allocation** - Algoritma VLSM otomatis (largest-first)
- 📊 **Visual Allocation Bar** - Chart interaktif dengan tooltip hover
- 📈 **Efficiency Analysis** - Perhitungan efisiensi penggunaan IP
- ⚠️ **Smart Warnings** - Peringatan untuk CIDR tidak optimal dan efisiensi rendah

### 🚀 Advanced Features
- 💾 **History Tracking** - Simpan 5 perhitungan terakhir di localStorage
- 📤 **Export CSV** - Download hasil dalam format CSV
- 📋 **Copy to Clipboard** - Salin tabel hasil dengan satu klik
- 🎨 **Preset Templates** - Template siap pakai untuk kantor kecil/menengah/besar
- 🔔 **Real-time Preview** - Preview network address sebelum kalkulasi
- 📱 **Responsive Design** - Tampilan optimal di desktop dan mobile
- 🌙 **Dark Theme** - Glassmorphism design dengan dark blue gradient

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ![React](https://img.shields.io/badge/React-18.3-blue) | UI Framework |
| ![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue) | Type Safety |
| ![Vite](https://img.shields.io/badge/Vite-6.4-purple) | Build Tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-blue) | Styling |
| ![localStorage](https://img.shields.io/badge/localStorage-API-orange) | Data Persistence |

---

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm atau yarn

### Quick Start

```bash
# Clone repository
git clone https://github.com/yourusername/subnet-calculator.git

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

## 📖 Usage

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
```

---

## 🌍 Live Demo

**[🚀 Try Live Demo](https://subnet-calculator.vercel.app)**

Deployed on Vercel with automatic CI/CD from main branch.

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

### Development Workflow

1. **Fork the repository**
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

For questions, suggestions, or collaboration:

- 📧 Email: your.email@example.com
- 🐙 GitHub: [@yourusername](https://github.com/yourusername)
- 🌐 Website: [yourwebsite.com](https://yourwebsite.com)

---

<div align="center">

**⭐ If you find this project useful, consider giving it a star on GitHub! ⭐**

Made with ❤️ by [Your Name](https://github.com/yourusername)

</div>
