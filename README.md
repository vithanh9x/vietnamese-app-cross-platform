# Vietnamese App - Cross Platform (PC & Android)

## 📱 Tổng Quan Dự Án

Ứng dụng đa nền tảng được **Việt hóa hoàn toàn** với hỗ trợ cho:
- ✅ **Windows/Mac/Linux** (PC Desktop)
- ✅ **Android** (Mobile)
- ✅ **Tiếng Việt** (Vietnamese Localization)

---

## 📂 Cấu Trúc Dự Án

```
vietnamese-app-cross-platform/
│
├── 📁 docs/
│   ├── PROCESS.md              # Quy trình chung
│   ├── SETUP.md                # Hướng dẫn setup
│   └── ARCHITECTURE.md         # Kiến trúc ứng dụng
│
├── 📁 shared/
│   ├── i18n/                   # Quản lý ngôn ngữ (Chung)
│   │   ├── vi.json            # Tiếng Việt
│   │   ├── en.json            # Tiếng Anh
│   │   └── config.ts          # Config i18n
│   │
│   ├── assets/                 # Hình ảnh, font chung
│   │   ├── images/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   └── models/                 # Models/Data structures chung
│       ├── types.ts
│       ├── interfaces.ts
│       └── constants.ts
│
├── 📁 pc/
│   ├── 📄 package.json         # Dependencies PC
│   ├── 📁 src/
│   │   ├── main.ts            # Entry point
│   │   ├── preload.ts         # Electron preload
│   │   ├── screens/           # Màn hình
│   │   ├── components/        # Components tái sử dụng
│   │   ├── services/          # API calls, logic
│   │   └── styles/            # CSS/SCSS
│   │
│   └── 📁 public/
│       └── index.html
│
├── 📁 android/
│   ├── 📄 build.gradle         # Gradle config
│   ├── 📄 AndroidManifest.xml
│   ├── 📁 src/
│   │   ├── main/
│   │   │   ├── java/           # Kotlin/Java code
│   │   │   ├── res/            # Resources, strings tiếng Việt
│   │   │   └── AndroidManifest.xml
│   │   │
│   │   └── test/
│   │
│   └── 📁 app/
│       └── src/
│
├── 📄 .gitignore
├── 📄 package.json             # Scripts chung
└── 📄 README.md
```

---

## 🚀 Quy Trình Phát Triển Chung

### **Phase 1: Setup Cơ Bản**
- [ ] Cài đặt công cụ (Node.js, Android Studio, etc.)
- [ ] Setup i18n (Việt hóa)
- [ ] Tạo shared components & models

### **Phase 2: Phát Triển PC (Electron)**
- [ ] Setup Electron
- [ ] Tạo giao diện chính
- [ ] Tích hợp i18n
- [ ] Build & Test

### **Phase 3: Phát Triển Android**
- [ ] Setup Android Native
- [ ] Tạo giao diện chính
- [ ] Tích hợp i18n
- [ ] Build & Test

### **Phase 4: Tích Hợp & Deployment**
- [ ] Đồng bộ logic chung
- [ ] Testing cross-platform
- [ ] Release

---

## 🛠️ Tech Stack

| Nền Tảng | Công Nghệ | Mục Đích |
|----------|-----------|---------|
| **PC** | Electron + React/Vue | Desktop UI |
| **Android** | Kotlin/Java + Android Studio | Mobile UI |
| **Chung** | TypeScript | Type safety |
| **Việt hóa** | i18n-js | Multi-language |
| **Backend** | Node.js/Express (tùy chọn) | API |
| **Database** | SQLite/Firebase | Data storage |

---

## 📋 Bắt Đầu Nhanh

### **PC Development**
```bash
cd pc
npm install
npm start
```

### **Android Development**
```bash
cd android
./gradlew build
./gradlew installDebug
```

### **Shared Assets & i18n**
```bash
cd shared
npm install
```

---

## 🌐 Việt Hóa (Localization)

Tất cả chuỗi giao diện được quản lý tập trung:
```
shared/i18n/vi.json  # Tiếng Việt
shared/i18n/en.json  # Tiếng Anh
```

**Cách sử dụng:**
- PC: `i18n.t('key.name')`
- Android: `getString(R.string.key_name)`

---

## 📚 Tài Liệu Chi Tiết

- **[PROCESS.md](docs/PROCESS.md)** - Quy trình phát triển chi tiết
- **[SETUP.md](docs/SETUP.md)** - Hướng dẫn cài đặt từng nền tảng
- **[ARCHITECTURE.md](docs/ARCHITECTURE.md)** - Kiến trúc ứng dụng

---

## 👨‍💻 Contributor

- **vithanh9x** - Author

---

## 📝 License

MIT License - Tự do sử dụng & phân phối
