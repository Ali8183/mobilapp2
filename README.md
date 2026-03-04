# MobilApp2 - Diyabet Sağlık Takip Sistemi 🩸

Diyabet hastaları için özel olarak tasarlanmış, sade, okunabilir ve modern bir sağlık takip mobil uygulaması. Kullanıcıların günlük yaşamlarında kan şekerlerini, fiziksel aktivitelerini, beslenmelerini takip etmelerine ve acil durumlarda hızlı aksiyon almalarına olanak sağlar.

![Uygulama Ekran Görüntüsü](https://via.placeholder.com/800x400.png?text=Diyabet+Saglik+Takip+Uygulamasi)

## 📌 Özellikler

Uygulama, temel olarak 6 modülden oluşan bir ana ekrana sahiptir:

1. **💧 Kan Şekeri İzlem:** 
   - Açlık ve tokluk kan şekeri ölçüm kayıtları.
   - İnsülin dozu takibi.
   - Kan şekeri < 70 olduğunda kritik uyarı modalı.
2. **🏃 Fiziksel Aktivite:** 
   - Günlük aktivite kayıtları (süre ve tür).
   - "Yapıldı" / "Yapılmadı" filtrelemesi.
3. **🍎 Beslenme Değerlendirme:** 
   - Tüketilen besinlerin kalori hesabı.
   - Günlük toplam kalori takibi.
4. **🎯 Günlük Hedefler:** 
   - Kan şekeri, su tüketimi ve egzersiz için bilgilendirici hedefler.
5. **📝 Formlar:** 
   - Tıbbi anketler ve hasta takip formları (Aylık check-up, diyabet talep formları vb.).
6. **🚑 Acil İletişim:** 
   - Kritik anlarda hızlı erişim için Ambulans (112), uzman doktor ve diyabet hattı kısayolları (uygulama içinden doğrudan arama özelliği).

## 🛠 Kullanılan Teknolojiler

- **React Native (Expo):** Çapraz platform (iOS/Android) uygulama geliştirme altyapısı (SDK 54).
- **React Navigation:**
  - `@react-navigation/native-stack` - Sayfalar arası geçiş navigasyonu.
  - `@react-navigation/bottom-tabs` - Alt sekme (Tab) navigasyonu.
- **AsyncStorage (`@react-native-async-storage/async-storage`):** Verilerin cihaz üzerinde (local storage) kalıcı olarak saklanması.
- **Vector Icons (`@expo/vector-icons`):** UI ikon setleri (MaterialCommunityIcons).

## 🎨 Tasarım Dili

- **Ana Renk Paleti:** 
  - Kırmızı tonları (Header ve uyarılar - `#E74C3C`)
  - Temiz beyaz kartlar (`#FFFFFF`)
  - Mavi, Yeşil, Mor, Turuncu tonlar (Modüllere göre özelleştirilmiş ikon arka planları)
- **Arayüz:** "Yumuşak Gölgeli" (Soft Shadow) yuvarlatılmış köşeli kartlar, kullanıcı dostu temiz (Minimalist & Medical) bir deneyim.

## 🚀 Projeyi Çalıştırma

Projeyi yerelde çalıştırmak için sisteminizde Node.js kurulu olmalıdır.

1. **Projeyi Klonlayın:**
   ```bash
   git clone https://github.com/Ali8183/mobilapp2.git
   ```
2. **Kütüphaneleri Yükleyin:**
   ```bash
   cd mobilapp2
   npm install
   ```
3. **Uygulamayı Başlatın:**
   ```bash
   npx expo start -c --tunnel
   ```
4. **Telefonunuzda Test Edin:**
   Verilen QR kodu telefonunuzdaki **Expo Go** uygulaması ile (veya iOS kamerasından) okutun.

## 📦 APK (Android Çıktısı) Alma

Projeyi doğrudan Android APK'ya dönüştürmek için Expo Uygulama Servisi (EAS) kullanabilirsiniz:

```bash
npx eas-cli build -p android --profile preview
```
*(Kurulum sırasında bilgisayarınıza Java/Android Studio yüklemenize gerek kalmadan, Expo üzerinden APK üretilir).*

## 💡 State ve Veri Yönetimi

- Uygulamadaki tüm liste verileri (`mockData.js` içinde default olarak tanımlı), `Hooks (useState, useEffect)` ile ekranlarda gösterilir.
- Kullanıcı tarafından listelere eklenen ya da silinen bilgiler, `storage.js` üzerinden cihazın belleğine yazılır. Bu sayede uygulama kapatılıp açılsa bile veriler kaybolmaz.
