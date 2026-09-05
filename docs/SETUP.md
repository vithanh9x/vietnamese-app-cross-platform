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
mkdir -p shared/{i18n,assets/images,assets/icons,assets/fonts,models}

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
# Mở Android Studio hoặc dùng gradle
./gradlew build

cd ..
```

---

## 💻 SETUP PC (Electron + React)

### **Bước 1: Tạo Cấu Trúc**
```bash
cd pc

mkdir -p src/{screens,components,services,styles}
mkdir -p public
mkdir -p build
```

### **Bước 2: package.json**
```json
{
  "name": "vietnamese-app-pc",
  "version": "1.0.0",
  "main": "build/main.js",
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
  }
}
```

### **Bước 3: Main Process (main.ts)**
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

### **Bước 4: i18n Setup**
```typescript
import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import vi from '../shared/i18n/vi.json';
import en from '../shared/i18n/en.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      vi: { translation: vi },
      en: { translation: en }
    },
    lng: 'vi',
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });
```

### **Bước 5: Test PC**
```bash
cd pc
npm install
npm run dev
```

---

## 📱 SETUP ANDROID

### **Bước 1: Tạo Project (Android Studio)**

1. File > New > New Project
2. Empty Activity template
3. Name: VietnameseApp
4. Package: com.example.vietnameseapp
5. Min SDK: API 21
6. Language: Kotlin

### **Bước 2: Cấu Trúc Thư Mục**
```
android/src/main/
├── java/com/example/vietnameseapp/
│   └── MainActivity.kt
└── res/
    ├── values/strings.xml
    ├── values-vi/strings.xml
    ├── layout/activity_main.xml
    └── drawable/
```

### **Bước 3: Strings Tiếng Anh**
**File: `android/src/main/res/values/strings.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Vietnamese App</string>
    <string name="app_welcome">Welcome</string>
    <string name="btn_save">Save</string>
    <string name="btn_cancel">Cancel</string>
</resources>
```

### **Bước 4: Strings Tiếng Việt**
**File: `android/src/main/res/values-vi/strings.xml`**
```xml
<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="app_name">Ứng Dụng Việt Nam</string>
    <string name="app_welcome">Chào mừng</string>
    <string name="btn_save">Lưu</string>
    <string name="btn_cancel">Hủy</string>
</resources>
```

### **Bước 5: MainActivity**
```kotlin
package com.example.vietnameseapp

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import java.util.Locale

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
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

### **Bước 6: Test Android**
```bash
cd android
./gradlew build
./gradlew installDebug
```

---

## ✅ Verification Checklist

- [ ] Node.js v16+ installed
- [ ] Android Studio installed
- [ ] Repository cloned
- [ ] PC app runs on localhost:3000
- [ ] Android app builds successfully
- [ ] Vietnamese strings display correctly
- [ ] English strings display correctly

---

**Liên hệ**: vithanh9x@gmail.com