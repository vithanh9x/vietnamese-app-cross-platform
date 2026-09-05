# 🏗️ ARCHITECTURE - Kiến Trúc Ứng Dụng

Kiến trúc tổng thể của ứng dụng cross-platform với Việt hóa.

---

## 📐 Sơ Đồ Tổng Quan

```
┌─────────────────────────────────────────────────────────────┐
│                   SHARED RESOURCES (Chung)                  │
│                                                               │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  i18n (vi)   │  │ i18n (en)    │  │   Models     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
         ▲                     ▲                    ▲
         │                     │                    │
    ┌────┴─────┐          ┌────┴─────┐         ┌───┴────┐
    │           │          │           │         │         │
    ▼           ▼          ▼           ▼         ▼         ▼
┌────────────┐┌──────────────────────────────────────────────┐
│  PC (Electron)       │  ANDROID (Native)                     │
│                      │                                       │
│ ┌──────────────┐    │ ┌──────────────┐                      │
│ │ Main Process │    │ │ MainActivity │                      │
│ └──────────────┘    │ └──────────────┘                      │
│        │             │        │                             │
│        ▼             │        ▼                             │
│ ┌──────────────┐    │ ┌──────────────┐                      │
│ │  React UI    │    │ │ Fragment UI  │                      │
│ └──────────────┘    │ └──────────────┘                      │
│        │             │        │                             │
│        ▼             │        ▼                             │
│ ┌──────────────┐    │ ┌──────────────┐                      │
│ │  Services    │    │ │  Services    │                      │
│ └──────────────┘    │ └──────────────┘                      │
│        │             │        │                             │
│        ▼             │        ▼                             │
│ ┌──────────────┐    │ ┌──────────────┐                      │
│ │   i18n       │    │ │ Localization │                      │
│ └──────────────┘    │ └──────────────┘                      │
└──────────────────────────────────────────────────────────────┘
```

---

## 🗂️ Cấu Trúc Thư Mục Chi Tiết

### **Shared Resources** (`shared/`)
```
shared/
├── i18n/
│   ├── vi.json              # Tiếng Việt
│   ├── en.json              # Tiếng Anh
│   └── config.ts            # Config i18n
│
├── assets/
│   ├── images/
│   ├── icons/
│   └── fonts/
│
└── models/
    ├── types.ts             # TypeScript types
    ├── interfaces.ts        # Interfaces
    └── constants.ts         # Constants
```

**Mục đích**: Chia sẻ resources giữa PC và Android

---

### **PC - Electron** (`pc/`)
```
pc/
├── src/
│   ├── main.ts              # Main process (Electron)
│   ├── preload.ts          # Preload script
│   │
│   ├── screens/             # Các màn hình chính
│   │   ├── Home.tsx
│   │   ├── Settings.tsx
│   │   └── About.tsx
│   │
│   ├── components/          # Reusable components
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   └── Button.tsx
│   │
│   ├── services/            # Business logic
│   │   ├── api.ts          # API calls
│   │   ├── storage.ts      # Local storage
│   │   └── database.ts     # SQLite
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── useLocalization.ts
│   │
│   ├── styles/             # CSS/SCSS
│   │   ├── App.css
│   │   └── variables.css
│   │
│   ├── App.tsx             # Root component
│   └── index.tsx           # React entry
│
├── public/
│   └── index.html
│
├── package.json
├── tsconfig.json
└── electron.json           # Electron config
```

**Tech Stack**: Electron + React + TypeScript + i18next

---

### **Android** (`android/`)
```
android/
├── src/main/
│   ├── java/com/example/vietnameseapp/
│   │   ├── MainActivity.kt         # Entry point
│   │   │
│   │   ├── screens/
│   │   │   ├── HomeScreen.kt
│   │   │   ├── SettingsScreen.kt
│   │   │   └── AboutScreen.kt
│   │   │
│   │   ├── services/
│   │   │   ├── ApiService.kt
│   │   │   ├── StorageService.kt
│   │   │   └── DatabaseService.kt
│   │   │
│   │   ├── models/
│   │   │   └── AppData.kt
│   │   │
│   │   └── utils/
│   │       └── LocalizationUtils.kt
│   │
│   ├── res/
│   │   ├── values/
│   │   │   ├── strings.xml         # Tiếng Anh
│   │   │   ├── colors.xml
│   │   │   ├── dimens.xml
│   │   │   └── styles.xml
│   │   │
│   │   ├── values-vi/
│   │   │   └── strings.xml         # Tiếng Việt
│   │   │
│   │   ├── layout/
│   │   │   ├── activity_main.xml
│   │   │   ├── fragment_home.xml
│   │   │   └── fragment_settings.xml
│   │   │
│   │   └── drawable/
│   │       └── ic_icon.png
│   │
│   └── AndroidManifest.xml
│
├── build.gradle            # Project config
├── settings.gradle
└── local.properties       # SDK config
```

**Tech Stack**: Kotlin + Android Studio + Material Design

---

## 🔄 Data Flow

### **PC (Electron)**
```
User Input → React Component → Service → API/Storage → i18n Display
     ▲                                                      ▼
     └──────────────────────────────────────────────────────┘
```

### **Android**
```
User Input → Fragment/Activity → Service → Database/API → Display
     ▲                                                       ▼
     └───────────────────────────────────────────────────────┘
```

### **Localization Flow**
```
user_action
    ↓
set_language('vi' or 'en')
    ↓
i18n.changeLanguage()
    ↓
read_from_shared/i18n/{lang}.json
    ↓
update_ui_strings
```

---

## 🔌 Shared Components

### **i18n Configuration**

**PC** (`pc/src/i18n.ts`):
```typescript
import i18next from 'i18next';
import vi from '../shared/i18n/vi.json';
import en from '../shared/i18n/en.json';

i18next.init({
  resources: { vi: { translation: vi }, en: { translation: en } },
  lng: 'vi',
  fallbackLng: 'en'
});
```

**Android** (`android/src/main/res/values-vi/strings.xml`):
```xml
<!-- Android uses platform-specific localization -->
<!-- Resources automatically selected based on device locale -->
```

---

## 📦 Dependencies

### **Shared**
- TypeScript
- JSON for i18n

### **PC (Electron)**
- electron
- electron-builder
- react & react-dom
- i18next & react-i18next
- typescript

### **Android**
- androidx.appcompat
- androidx.constraintlayout
- com.google.android.material

---

## 🔐 Security Considerations

1. **Electron**: Enable context isolation, disable nodeIntegration
2. **Android**: Validate all user inputs, use secure storage
3. **API Calls**: Use HTTPS, validate responses
4. **Data Storage**: Encrypt sensitive data

---

## 🚀 Deployment Architecture

### **PC (Desktop)**
```
Build (npm run electron-builder)
  ↓
Create Distribution
  ├─ Windows (MSI installer)
  ├─ Mac (DMG)
  └─ Linux (AppImage)
  ↓
Publish to GitHub Releases
```

### **Android (Mobile)**
```
Build (./gradlew assembleRelease)
  ↓
Sign APK
  ↓
Publish to Play Store / F-Droid
```

---

## 📈 Performance Optimization

1. **PC**: 
   - Lazy load components
   - Code splitting with webpack
   - Minimize bundle size

2. **Android**:
   - Use ProGuard/R8 minification
   - Optimize images
   - Use coroutines for async tasks

3. **Shared**:
   - Cache i18n translations
   - Lazy load locale files

---

**Liên hệ**: vithanh9x@gmail.com