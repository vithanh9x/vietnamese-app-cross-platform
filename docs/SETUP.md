# 🛠️ SETUP GUIDE - Hướng Dẫn Cài Đặt

Hướng dẫn chi tiết để setup môi trường phát triển cho PC (Electron) và Android.

---

## 📋 Yêu Cầu Hệ Thống

### **Chung cho cả PC & Android**
- **Git**: v2.0+
- **Node.js**: v16+ và npm v8+
- **RAM**: 8GB trở lên
- **Disk**: 50GB trống

### **Riêng cho PC (Electron)**
- **Visual Studio Code** hoặc Editor khác
- **Windows/Mac/Linux** OS

### **Riêng cho Android**
- **Android Studio**: v2022.1+
- **JDK**: v11+
- **Android SDK**: API 21+
- **Gradle**: v7.0+

---

## 🚀 SETUP TOÀN BỘ (Bắt Đầu Từ Đầu)

### **Bước 1: Clone Repository**
```bash
git clone https://github.com/vithanh9x/vietnamese-app-cross-platform.git
cd vietnamese-app-cross-platform
```

### **Bước 2: Cài đặt Shared Resources**
```bash
# Tạo thư mục shared
mkdir -p shared/{i18n,assets/images,assets/icons,assets/fonts,models}

# Cài dependencies
cd shared
npm init -y
npm install typescript

cd ..
```

### **Bước 3: Setup PC (Electron)**
```bash
cd pc
npm install
npm install -D electron electron-builder
npm install react react-dom
npm install i18next i18next-react i18next-browser-languagedetector
npm install typescript ts-node @types/react @types/react-dom @types/node

cd ..
```

### **Bước 4: Setup Android**
```bash
cd android

# Sử dụng Android Studio hoặc tạo project mới
# Cài Android SDK, Emulator
# Sync Gradle

cd ..
```

---

## 💻 SETUP PC (Electron + React)

### **Bước 1: Tạo Cấu Trúc Thư Mục**
```bash
cd pc

mkdir -p src/{screens,components,services,styles}
mkdir -p public
mkdir -p build
```

### **Bước 2: Tạo `package.json`**
```bash
cd pc
npm init -y
```

**File: `pc/package.json`**
```json
{
  "name": "vietnamese-app-pc",
  "version": "1.0.0",
  "description": "Vietnamese App - PC Desktop",
  "main": "build/main.js",
  "homepage": "./",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "electron": "electron .",
    "dev": "concurrently \"npm start\" \"wait-on http://localhost:3000 && electron .\"",
    "electron-build": "npm run build && electron-builder"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "i18next": "^23.0.0",
    "react-i18next": "^13.0.0"
  },
  "devDependencies": {
    "electron": "^26.0.0",
    "electron-builder": "^24.0.0",
    "typescript": "^5.0.0",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  }
}
```

### **Bước 3: Tạo tsconfig.json**
**File: `pc/tsconfig.json`**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "jsx": "react-jsx",
    "module": "ESNext",
    "lib": ["ES2020", "DOM"],
    "outDir": "./build",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true
  },
  "include": ["src"],
  "exclude": ["node_modules", "build"]
}
```

### **Bước 4: Tạo Main Process**
**File: `pc/src/main.ts`**
```typescript
import { app, BrowserWindow, Menu } from 'electron';
import path from 'path';
import isDev from 'electron-is-dev';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.ts')
    }
  });

  const url = isDev
    ? 'http://localhost:3000'
    : `file://${path.join(__dirname, '../build/index.html')}`;

  mainWindow.loadURL(url);

  if (isDev) mainWindow.webDevTools.openDevTools();

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow();
  }
});
```

### **Bước 5: Setup i18n**
**File: `pc/src/i18n.ts`**
```typescript
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import vi from '../shared/i18n/vi.json';
import en from '../shared/i18n/en.json';

i18next
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en }
    },
    fallbackLng: 'vi',
    interpolation: {
      escapeValue: false
    }
  });

export default i18next;
```

### **Bước 6: Tạo App Component**
**File: `pc/src/App.tsx`**
```typescript
import React from 'react';
import { useTranslation } from 'react-i18next';
import './styles/App.css';

const App: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi');
  };

  return (
    <div className="app">
      <header>
        <h1>{t('app.name')}</h1>
        <button onClick={toggleLanguage}>
          {i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
        </button>
      </header>

      <main>
        <h2>{t('app.welcome')}</h2>
        <p>{t('menu.home')}</p>
      </main>
    </div>
  );
};

export default App;
```

### **Bước 7: Tạo index.html**
**File: `pc/public/index.html`**
```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Ứng Dụng Việt Hóa</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

### **Bước 8: Test PC**
```bash
cd pc

# Cài dependencies
npm install

# Start development mode
npm run dev

# Build for production
npm run electron-build
```

---

## 📱 SETUP ANDROID

### **Bước 1: Tạo Project mới (nếu chưa có)**

1. Mở **Android Studio**
2. Chọn **File > New > New Project**
3. Chọn **Empty Activity** template
4. Điền thông tin:
   - **Name**: VietnameseApp
   - **Package Name**: com.example.vietnameseapp
   - **Minimum SDK**: API 21 (Android 5.0)
   - **Language**: Kotlin

### **Bước 2: Tạo Cấu Trúc Thư Mục**
```
android/src/main/
├── java/com/example/vietnameseapp/
│   ├── MainActivity.kt
│   ├── screens/
│   ├── services/
│   └── utils/
│
└── res/
    ├── values/
    │   ├── strings.xml       (Tiếng Anh)
    │   └── colors.xml
    ├── values-vi/
    │   └── strings.xml       (Tiếng Việt)
    ├── layout/
    │   ├── activity_main.xml
    │   └── fragment_home.xml
    └── drawable/
```

### **Bước 3: Tạo strings.xml (Tiếng Anh)**
**File: `android/src/main/res/values/strings.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Vietnamese App</string>
    <string name="app_welcome">Welcome to the app</string>
    
    <string name="menu_home">Home</string>
    <string name="menu_settings">Settings</string>
    <string name="menu_about">About</string>
    
    <string name="btn_save">Save</string>
    <string name="btn_cancel">Cancel</string>
</resources>
```

### **Bước 4: Tạo strings.xml (Tiếng Việt)**
**File: `android/src/main/res/values-vi/strings.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Ứng Dụng Việt Nam</string>
    <string name="app_welcome">Chào mừng đến với ứng dụng</string>
    
    <string name="menu_home">Trang Chủ</string>
    <string name="menu_settings">Cài Đặt</string>
    <string name="menu_about">Về Ứng Dụng</string>
    
    <string name="btn_save">Lưu</string>
    <string name="btn_cancel">Hủy</string>
</resources>
```

### **Bước 5: Tạo MainActivity**
**File: `android/src/main/java/com/example/vietnameseapp/MainActivity.kt`**
```kotlin
package com.example.vietnameseapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import java.util.Locale

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // Thiết lập ngôn ngữ mặc định là Tiếng Việt
        setLocale("vi")
    }
    
    private fun setLocale(languageCode: String) {
        val locale = Locale(languageCode)
        Locale.setDefault(locale)
        
        val config = resources.configuration
        config.locale = locale
        resources.updateConfiguration(config, resources.displayMetrics)
    }
}
```

### **Bước 6: Setup build.gradle**
**File: `android/build.gradle`**
```gradle
plugins {
    id 'com.android.application'
    id 'kotlin-android'
}

android {
    compileSdk 33
    
    defaultConfig {
        applicationId "com.example.vietnameseapp"
        minSdk 21
        targetSdk 33
        versionCode 1
        versionName "1.0"
    }
    
    buildTypes {
        release {
            minifyEnabled false
        }
    }
    
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_11
        targetCompatibility JavaVersion.VERSION_11
    }
}

dependencies {
    implementation 'androidx.appcompat:appcompat:1.6.1'
    implementation 'com.google.android.material:material:1.9.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
}
```

### **Bước 7: Test Android**
```bash
cd android

# Sync Gradle
./gradlew sync

# Build
./gradlew build

# Chạy trên emulator/device
./gradlew installDebug
```

---

## ✅ Verification Checklist

### **PC Setup**
- [ ] Node.js v16+ cài xong
- [ ] npm packages cài xong
- [ ] i18n config hoạt động
- [ ] Electron app chạy được
- [ ] Tiếng Việt hiển thị đúng

### **Android Setup**
- [ ] Android Studio cài xong
- [ ] Android SDK cài xong
- [ ] Project compile được
- [ ] Emulator chạy được
- [ ] strings-vi.xml dùng đúng

### **Shared Resources**
- [ ] shared/i18n/vi.json tồn tại
- [ ] shared/i18n/en.json tồn tại
- [ ] Cả PC và Android đều reference được

---

## 🔧 Troubleshooting

### **PC Issues**

**Lỗi: "Cannot find module"**
```bash
# Xóa node_modules và cài lại
cd pc
rm -rf node_modules package-lock.json
npm install
```

**Lỗi: Electron không khởi động**
```bash
# Cài lại electron
npm uninstall electron
npm install -D electron@latest
```

### **Android Issues**

**Lỗi: "Gradle sync failed"**
```bash
# Sync lại gradle
cd android
./gradlew --stop
./gradlew sync
```

**Lỗi: Emulator không khởi động**
```bash
# Tạo AVD mới hoặc dùng device thực
# Kiểm tra File > Settings > System Settings > Android SDK
```

---

## 📚 Tài Liệu Tham Khảo

- **Electron**: https://www.electronjs.org/docs
- **React**: https://react.dev
- **Android Docs**: https://developer.android.com/docs
- **i18next**: https://www.i18next.com
- **Kotlin**: https://kotlinlang.org/docs

---

**Cần help? Liên hệ: vithanh9x@gmail.com**
