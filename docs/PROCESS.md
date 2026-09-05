# 📋 QUY TRÌNH PHÁT TRIỂN CHUNG (PROCESS)

Tài liệu này mô tả quy trình phát triển ứng dụng cross-platform với Việt hóa cho cả PC và Android.

---

## 🎯 Các Giai Đoạn Phát Triển

### **PHASE 1: Chuẩn Bị Ban Đầu (1-2 tuần)**

#### 1.1 Cài đặt Môi Trường
```bash
# Clone repository
git clone https://github.com/vithanh9x/vietnamese-app-cross-platform.git
cd vietnamese-app-cross-platform

# Cài Node.js (v16+)
# Cài Android Studio
# Cài Gradle
# Cài Kotlin
```

#### 1.2 Setup Shared Resources (Chung)
```bash
# Tạo thư mục shared
mkdir -p shared/{i18n,assets,models}

# Cài npm packages cho shared
cd shared
npm init -y
npm install typescript ts-node
```

#### 1.3 Tạo File Việt hóa
**File: `shared/i18n/vi.json`**
```json
{
  "app": {
    "name": "Ứng Dụng của Tôi",
    "welcome": "Chào mừng đến với ứng dụng"
  },
  "menu": {
    "home": "Trang Chủ",
    "settings": "Cài Đặt",
    "about": "Về Ứng Dụng",
    "exit": "Thoát"
  },
  "buttons": {
    "save": "Lưu",
    "cancel": "Hủy",
    "delete": "Xóa",
    "edit": "Chỉnh Sửa"
  }
}
```

**File: `shared/i18n/en.json`**
```json
{
  "app": {
    "name": "My Application",
    "welcome": "Welcome to the application"
  },
  "menu": {
    "home": "Home",
    "settings": "Settings",
    "about": "About",
    "exit": "Exit"
  },
  "buttons": {
    "save": "Save",
    "cancel": "Cancel",
    "delete": "Delete",
    "edit": "Edit"
  }
}
```

---

### **PHASE 2: Phát Triển PC (Electron) (2-3 tuần)**

#### 2.1 Setup Electron Project
```bash
cd pc
npm init -y
npm install electron electron-builder
npm install react react-dom    # Hoặc Vue.js
npm install i18next i18next-browser-languagedetector
npm install typescript @types/node --save-dev
```

#### 2.2 Tạo Cấu Trúc Thư Mục PC
```
pc/
├── src/
│   ├── main.ts                 # Main process
│   ├── preload.ts             # Preload script
│   ├── screens/
│   │   ├── Home.tsx
│   │   ├── Settings.tsx
│   │   └── About.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── services/
│   │   ├── api.ts
│   │   └── storage.ts
│   └── styles/
│       └── App.css
├── public/
│   └── index.html
├── package.json
└── tsconfig.json
```

#### 2.3 Tạo Main Entry Point
**File: `pc/src/main.ts`**
```typescript
import { app, BrowserWindow } from 'electron';
import path from 'path';

let mainWindow: BrowserWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.ts'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  const isDev = process.env.NODE_ENV === 'development';
  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(url);
};

app.on('ready', createWindow);
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
```

#### 2.4 Setup i18n cho PC
**File: `pc/src/services/i18n.ts`**
```typescript
import i18next from 'i18next';
import vi from '../../shared/i18n/vi.json';
import en from '../../shared/i18n/en.json';

i18next.init({
  resources: {
    vi: { translation: vi },
    en: { translation: en }
  },
  lng: 'vi', // Default language
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false
  }
});

export default i18next;
```

#### 2.5 Tạo Home Screen
**File: `pc/src/screens/Home.tsx`**
```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';

export const HomeScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="home-screen">
      <h1>{t('app.welcome')}</h1>
      <button>{t('buttons.save')}</button>
      <button>{t('buttons.cancel')}</button>
    </div>
  );
};
```

#### 2.6 Build & Test PC
```bash
cd pc
npm run build
npm run start
```

---

### **PHASE 3: Phát Triển Android (2-3 tuần)**

#### 3.1 Setup Android Project
```bash
cd android

# Tạo project mới hoặc sử dụng Android Studio
# File: build.gradle
dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
}
```

#### 3.2 Tạo Cấu Trúc Thư Mục Android
```
android/
├── src/
│   ├── main/
│   │   ├── java/com/example/vietnameseapp/
│   │   │   ├── MainActivity.kt
│   │   │   ├── screens/
│   │   │   │   ├── HomeScreen.kt
│   │   │   │   ├── SettingsScreen.kt
│   │   │   │   └── AboutScreen.kt
│   │   │   ├── services/
│   │   │   │   ├── ApiService.kt
│   │   │   │   └── StorageService.kt
│   │   │   └── utils/
│   │   │       └── LocalizationUtils.kt
│   │   │
│   │   └── res/
│   │       ├── values-vi/
│   │       │   └── strings.xml       # Tiếng Việt
│   │       ├── values/
│   │       │   └── strings.xml       # Tiếng Anh (default)
│   │       ├── layout/
│   │       │   ├── activity_main.xml
│   │       │   ├── fragment_home.xml
│   │       │   └── fragment_settings.xml
│   │       └── drawable/
│   │           └── icon.png
│   │
│   └── AndroidManifest.xml
├── build.gradle
└── settings.gradle
```

#### 3.3 Cấu Hình Strings Tiếng Việt
**File: `android/src/main/res/values-vi/strings.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Ứng Dụng Của Tôi</string>
    <string name="app_welcome">Chào mừng đến với ứng dụng</string>
    
    <string name="menu_home">Trang Chủ</string>
    <string name="menu_settings">Cài Đặt</string>
    <string name="menu_about">Về Ứng Dụng</string>
    <string name="menu_exit">Thoát</string>
    
    <string name="btn_save">Lưu</string>
    <string name="btn_cancel">Hủy</string>
    <string name="btn_delete">Xóa</string>
    <string name="btn_edit">Chỉnh Sửa</string>
</resources>
```

**File: `android/src/main/res/values/strings.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">My Application</string>
    <string name="app_welcome">Welcome to the application</string>
    
    <string name="menu_home">Home</string>
    <string name="menu_settings">Settings</string>
    <string name="menu_about">About</string>
    <string name="menu_exit">Exit</string>
    
    <string name="btn_save">Save</string>
    <string name="btn_cancel">Cancel</string>
    <string name="btn_delete">Delete</string>
    <string name="btn_edit">Edit</string>
</resources>
```

#### 3.4 Tạo Main Activity
**File: `android/src/main/java/com/example/vietnameseapp/MainActivity.kt`**
```kotlin
package com.example.vietnameseapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Thiết lập ngôn ngữ Việt mặc định
        setLocale("vi")
    }
    
    private fun setLocale(languageCode: String) {
        val config = resources.configuration
        config.setLocale(java.util.Locale(languageCode))
        resources.updateConfiguration(config, resources.displayMetrics)
    }
}
```

#### 3.5 Build & Test Android
```bash
cd android

# Build debug APK
./gradlew assembleDebug

# Cài trên emulator/device
./gradlew installDebug

# Chạy
./gradlew run
```

---

### **PHASE 4: Tích Hợp & Deployment (2 tuần)**

#### 4.1 Đồng Bộ Logic Chung
```bash
# Copy shared resources vào cả PC và Android
cp -r shared/i18n pc/src/shared/
cp -r shared/i18n android/src/main/res/
```

#### 4.2 Testing Cross-Platform
- [ ] Test PC version on Windows, Mac, Linux
- [ ] Test Android version on multiple devices
- [ ] Test Localization (Vietnamese & English)
- [ ] Test data synchronization
- [ ] Performance testing

#### 4.3 Build Release
```bash
# PC Release
cd pc
npm run build
npm run electron-builder

# Android Release
cd android
./gradlew assembleRelease
# Ký APK với keystore
```

#### 4.4 Deployment
- Upload PC build lên GitHub Releases
- Upload Android APK lên Play Store
- Tạo changelog

---

## 📊 Timeline Tổng Hợp

| Phase | Thời Gian | Công Việc Chính |
|-------|-----------|-----------------|
| **1. Setup** | 1-2 tuần | i18n, shared resources |
| **2. PC Development** | 2-3 tuần | Electron, UI, Services |
| **3. Android Development** | 2-3 tuần | Android Native, UI, Services |
| **4. Integration & Release** | 2 tuần | Testing, Build, Deploy |
| **TOTAL** | **7-10 tuần** | Ứng dụng hoàn chỉnh |

---

## ✅ Checklist Phát Triển

### Phase 1 Setup
- [ ] Clone repository
- [ ] Cài dependencies
- [ ] Tạo i18n files (vi.json, en.json)
- [ ] Test i18n config

### Phase 2 PC
- [ ] Setup Electron
- [ ] Tạo main.ts
- [ ] Tạo Home/Settings/About screens
- [ ] Tích hợp i18n
- [ ] Test trên Windows/Mac/Linux
- [ ] Build release

### Phase 3 Android
- [ ] Setup Android Studio
- [ ] Tạo MainActivity
- [ ] Tạo Screens/Fragments
- [ ] Tạo strings.xml tiếng Việt
- [ ] Test trên emulator + devices
- [ ] Build release

### Phase 4 Integration
- [ ] Test cross-platform
- [ ] Đồng bộ logic
- [ ] Performance testing
- [ ] Publish releases
- [ ] Tạo documentation

---

## 🚀 Lệnh Nhanh

```bash
# PC Development
cd pc && npm install && npm start

# Android Development
cd android && ./gradlew build && ./gradlew run

# Update i18n shared
cp shared/i18n/* pc/src/shared/i18n/
cp shared/i18n/* android/src/main/res/

# Build all
npm run build:pc && npm run build:android
```

---

**Liên hệ**: vithanh9x@gmail.com
