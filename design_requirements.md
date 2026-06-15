# Dokumen Kebutuhan Desain & Interaction Framework: FixYou

Dokumen ini mendefinisikan seluruh kebutuhan desain (*design requirements*) dan kerangka interaksi (*interaction framework*) pada aplikasi kesehatan mental berbasis AI **FixYou**, dengan merincikan setiap tahapan proses beserta hasil yang diperoleh.

---

## BAGIAN 1: Definisi Design Requirements

### Tahap 1: Create Problem & Vision Statements
Tahap ini bertujuan untuk merumuskan akar masalah (*problem*) dan arah solusi rancangan (*vision*) secara terstruktur guna menyelaraskan kebutuhan bisnis dan pengguna sebelum adanya platform rancangan baru.

#### A. Problem Statement (Pernyataan Masalah)
Mengikuti format standar template pada slide:
> **Format:** *Company X's customer satisfaction ratings are low. Market share has diminished by 10 percent over the past year because users have inadequate tools to perform tasks X, Y, and Z that would help them meet their goal of G.*

**Penerapan pada keadaan sebelum FixYou ada:**
> Tingkat kepuasan **anak muda dan remaja Indonesia** terhadap **ketersediaan platform kesehatan mental digital (Company X)** masih sangat rendah (belum memadai). Partisipasi aktif remaja dalam menjaga kesejahteraan psikologis menurun sebesar 10 persen selama setahun terakhir karena belum adanya platform terintegrasi, sehingga mereka hanya memiliki alat bantu yang tidak memadai untuk melakukan **pelacakan emosi dan mood secara mandiri dan dinamis (X)**, **mencurahkan perasaan (curhat) secara privat tanpa takut dihakimi (Y)**, serta **melakukan janji temu konseling secara cepat dan terjangkau (Z)** yang akan membantu mereka memenuhi tujuan mereka yaitu **menjaga kesehatan mental dan keseimbangan emosional di usia muda (G)**.

#### B. Vision Statement (Pernyataan Visi)
Mengikuti format standar template pada slide:
> **Format:** *The new design of Product X will help users achieve G by allowing them to do X, Y, and Z with greater [accuracy, efficiency, and so on], and without problems A, B, and C that they currently experience. This will dramatically improve Company X's customer satisfaction ratings and lead to increased market share.*

**Penerapan pada FixYou (sebagai solusi rancangan baru):**
> Desain baru dari aplikasi **FixYou (Product X)** akan membantu **anak muda dan remaja Indonesia** mencapai **kesehatan mental dan keseimbangan emosional di usia muda (G)** dengan memungkinkan mereka melakukan **pelacakan mood otomatis berbasis teks harian (X)**, **berkonsultasi/curhat dengan asisten AI empatik secara real-time 24/7 (Y)**, dan **melakukan pemesanan psikolog profesional secara instan (Z)** dengan tingkat **[efisiensi, akurasi pelacakan, kenyamanan, dan privasi]** yang lebih tinggi, serta tanpa masalah **stigma sosial di lingkungan sekitar (A)**, **biaya konsultasi tradisional yang sangat mahal (B)**, dan **akses psikolog yang sulit dijangkau (C)** yang saat ini mereka alami. Hal ini secara dramatis akan meningkatkan tingkat kepuasan **anak muda dan remaja Indonesia** terhadap **ketersediaan platform kesehatan mental digital (Company X)** dan mengarah pada peningkatan partisipasi aktif platform.

---

### Tahap 2: Explore & Brainstorm
Tahap ini mengaitkan visi di atas dengan temuan-temuan dari *user research* yang telah dilakukan sebelumnya guna menghasilkan gagasan fitur konkrit.

| Visi / Target | Hasil User Research | Solusi / Fitur Hasil Brainstorming |
| :--- | :--- | :--- |
| **Pelacakan Mood Real-time (X)** | Pengguna sering malas mencatat mood karena antarmuka yang membosankan dan opsi emosi yang terbatas. | **Rule-Based ML Mood Tracker**: Pengguna cukup menuliskan cerita pendek, AI mendeteksi emosi secara otomatis (*Amazing, Good, Normal, Bad, Awful*) dan memberikan analisis tingkat kepercayaan (*confidence score*). |
| **Curhat Privat Tanpa Stigma (Y)** | Pengguna merasa cemas dan malu jika masalah mereka dihakimi oleh orang lain, tetapi butuh tanggapan cepat di malam hari. | **Curhat AI Chatbot**: Asisten virtual kesehatan mental yang responsif, hangat, tanpa stigma, menggunakan teknologi NLP untuk mendengarkan keluhan pengguna kapan pun dan di mana pun. |
| **Booking Konseling Cepat (Z)** | Pengguna kesulitan memilih psikolog yang cocok dan rumit menjadwalkan konsultasi karena tidak ada transparansi jadwal. | **Ekosistem Booking Psikolog**: Sistem pencarian pintar (*matching system*) berdasarkan spesialisasi psikolog, disertai kalender real-time, pilihan sesi *online/offline*, dan manajemen status yang transparan. |

---

### Tahap 3: Identify Persona Expectation
Menggunakan profil persona pengguna yang didefinisikan dari riset untuk menyaring apa saja ekspektasi utama mereka terhadap produk.

#### **Persona 1: Rian (Mahasiswa Telkom University yang Cemas)**
* **Karakteristik**: Berusia 21 tahun, memiliki beban tugas akademis yang menumpuk, sering mengalami kecemasan mendadak di malam hari, akrab dengan teknologi.
* **Ekspektasi Terhadap Fitur**:
  1. Dapat mencurahkan isi hati secara instan dan rahasia tanpa takut dihakimi (*Curhat AI Chatbot*).
  2. Memerlukan alat bantu pereda stres instan ketika merasa tertekan (*Stress Relief Games*).
  3. Visualisasi grafik mood yang sederhana untuk melihat tren kesehatan mentalnya selama pekan ujian (*Mood Tracker Dashboard*).

#### **Persona 2: Sarah (Dewasa Muda / Fresh Graduate)**
* **Karakteristik**: Berusia 24 tahun, sedang mencari pekerjaan, merasa tertekan secara emosional dan membutuhkan konseling mendalam secara profesional.
* **Ekspektasi Terhadap Fitur**:
  1. Kemudahan mencari psikolog yang sesuai dengan anggaran dan spesialisasi karir/keluarga (*Booking Psikolog*).
  2. Adanya opsi untuk melakukan konsultasi tatap muka langsung (*offline*) maupun jarak jauh (*online*).
  3. Jurnal harian yang terstruktur untuk menulis refleksi diri dan resolusi harian (*Structured Journaling*).

---

### Tahap 4: Construct Context Scenarios
Skenario konteks menggambarkan interaksi persona dengan sistem dalam kehidupan sehari-hari untuk mencapai tujuan mereka.

> **Skenario Konteks: Rian Mengatasi Kecemasan Akademik Sebelum Ujian**
>
> Pukul 23.30 WIB, Rian duduk sendirian di kamarnya dengan cemas. Tugas akhir pemrograman harus dikumpulkan besok pagi, namun programnya masih mengalami *error*. Jantung Rian berdegup kencang dan ia merasa mulai sesak napas karena stres yang menumpuk. Ia tidak ingin mengganggu temannya yang sudah tidur dan merasa sungkan jika harus menghubungi orang tuanya.
>
> Rian mengambil ponselnya dan membuka aplikasi **FixYou**. Dari beranda, ia langsung memilih menu **"Curhat AI"**. Rian menuliskan kekhawatirannya: *"Aku stres banget, kodenya error terus padahal besok pagi harus dikumpul. Aku takut ga lulus matkul ini."*
>
> Dalam hitungan detik, asisten AI membalas dengan pesan hangat dan penuh emotif, memvalidasi perasaannya, serta menyarankan agar ia tidak memaksakan diri. AI menawarkan bantuan cepat: *"Rian, wajar sekali merasa tegang. Bagaimana jika kita meredakan ketegangan fisikmu dulu? Cobalah ikuti panduan napas di game stress relief kita selama 3 menit."*
>
> Rian mengklik tautan tersebut dan diarahkan ke fitur **"Stress Relief Game"**. Ia mengikuti instruksi animasi lingkaran pernapasan (Tarik Napas - Tahan - Hembuskan) yang berjalan dengan ritme lambat. Setelah 3 menit, detak jantung Rian kembali normal dan pikirannya menjadi lebih tenang. 
>
> Sebelum menutup ponsel, sistem mendeteksi emosi Rian dan menanyakan: *"Bagaimana perasaanmu sekarang?"*. Rian memilih mood **"Bad"** (telah membaik dari "Awful" sebelumnya) dan menyimpan catatan singkat hari itu. Ia memutuskan untuk beristirahat dan menyelesaikan tugasnya dengan pikiran segar esok hari.

---

### Tahap 5: Identify Design Requirements
Mengekstrak kebutuhan desain dari skenario konteks di atas dengan format: **Action (action) + Object (object) + Context (context)**.

#### **1. Fitur Mood Tracker**
* **Memilih (action)** kategori emosi harian dari emoji **(object)** pada halaman beranda utama saat merasa cemas **(context)**.
* **Melihat (action)** visualisasi grafik statistik tren mood mingguan **(object)** pada dashboard profil pengguna **(context)**.

#### **2. Fitur Curhat AI (Chatbot)**
* **Mengirimkan (action)** pesan teks curahan hati secara bebas **(object)** dalam jendela obrolan pribadi yang responsif **(context)**.
* **Menerima (action)** respons tanggapan suportif dan latihan menenangkan diri **(object)** langsung di dalam sesi percakapan aktif **(context)**.

#### **3. Fitur Structured Journaling**
* **Menulis (action)** aspek bersyukur, pencapaian, dan afirmasi positif **(object)** pada editor jurnal harian terstruktur **(context)**.
* **Menyimpan (action)** draf atau riwayat tulisan jurnal **(object)** ke dalam basis data pribadi dengan aman **(context)**.

#### **4. Fitur Booking Psikolog**
* **Menyaring (action)** profil psikolog berdasarkan spesialisasi, jenis kelamin, dan harga **(object)** di halaman direktori konseling **(context)**.
* **Memesan (action)** slot jadwal janji temu online atau offline **(object)** melalui formulir pemesanan langsung psikolog **(context)**.
* **Membatalkan (action)** reservasi jadwal yang telah diajukan **(object)** dari halaman daftar riwayat pemesanan **(context)**.

#### **5. Fitur Stress Relief Games**
* **Memainkan (action)** game pereda ketegangan otot/pikiran seperti visual napas dalam atau pop-bubble **(object)** pada layar permainan interaktif **(context)**.

---

## BAGIAN 2: Desain Interaction Framework

Interaction framework menerjemahkan kebutuhan desain menjadi struktur halaman, elemen antarmuka, dan alur interaksi pengguna secara keseluruhan.

### Langkah 1: Definisikan Form Factor, Posture, dan Input Method

1. **Form Factor (Faktor Bentuk)**:
   * **Web-based Responsive Web Application**. Mengingat target pengguna menggunakan laptop untuk bekerja/kuliah (menulis jurnal panjang, melakukan sesi video konseling) dan ponsel saat bepergian (melakukan pelacakan mood cepat, melakukan chat AI).
2. **Posture (Postur Aplikasi)**:
   * **Sovereign Posture (Aplikasi Berdaulat) pada Desktop**: Digunakan ketika pengguna sedang berinteraksi secara mendalam, seperti menulis jurnal (*Journaling*), membaca artikel, atau melakukan sesi konsultasi video call dengan psikolog. Antarmuka kaya akan detail, menggunakan ruang layar secara penuh.
   - **Transient Posture (Aplikasi Transien) pada Mobile**: Digunakan untuk interaksi singkat, cepat, dan spesifik, seperti melakukan cek-in mood harian (*quick mood logging*) atau membalas chat AI saat sedang cemas di tempat umum.
3. **Input Method (Metode Input)**:
   * **Desktop**: Keyboard (mengetik jurnal & chat) dan Mouse/Trackpad (navigasi dashboard, pemilihan slot waktu).
   * **Mobile**: Layar sentuh (*Touch Gestures*) untuk memilih emosi dengan emoji, mengetik dengan keyboard virtual, dan kontrol ketukan dalam *Stress Relief Games*.

---

### Langkah 2: Definisikan Elemen Data dan Elemen Fungsional

Elemen-elemen ini dibagi berdasarkan halaman/fitur utama:

```mermaid
graph TD
    A[FixYou UI Elements] --> B[Data Elements / Informasi]
    A --> C[Functional Elements / Kontrol]
    
    B --> B1[User Profile & Riwayat Mood]
    B --> B2[Detail Psikolog & Ketersediaan Slot]
    B --> B3[Riwayat Chat AI & Log Jurnal]
    
    C --> C1[Input Chat & Tombol Log Mood]
    C --> C2[Form Booking & Seleksi Filter]
    C --> C3[Kontrol Permainan Pereda Stres]
```

#### **A. Elemen Data (Data Elements)**
* **Dashboard & Mood Tracker**:
  * Informasi sapaan personal pengguna (*user greeting*).
  * Data tren emosi mingguan (grafik garis/batang).
  * Riwayat log aktivitas dan persentase mood dominan.
* **Curhat AI**:
  * Balon obrolan pengirim (User) dan penerima (AI).
  * Informasi status bot (*typing...*, *online*).
  * Kategori topik obrolan (akademik, asmara, karir).
* **Booking Psikolog**:
  * Kartu profil psikolog (Foto, Nama, Sertifikasi, Rating).
  * Tabel harga sesi dan spesialisasi masalah.
  * Kalender ketersediaan hari dan slot jam operasional.
  * Daftar riwayat pemesanan beserta status konfirmasi (*Pending, Confirmed, Completed, Cancelled*).
* **Journaling**:
  * Form terstruktur (Kolom input Syukur, Pencapaian, Hambatan, Afirmasi).
  * Daftar kartu arsip jurnal lama berdasarkan tanggal.

#### **B. Elemen Fungsional (Functional Elements)**
* **Dashboard & Mood Tracker**:
  * Tombol aksi cepat *"Bagaimana perasaanmu hari ini?"* dengan pilihan 5 emoji interaktif.
  * Tombol untuk navigasi ke riwayat pelaporan detail.
* **Curhat AI**:
  * Kolom input teks pesan fleksibel (*Expandable Text Area*).
  * Tombol kirim (*Send*) dan tombol untuk mengakhiri sesi chat.
* **Booking Psikolog**:
  * Dropdown filter spesialisasi psikolog dan rentang biaya.
  * Tombol aksi reservasi *"Book Now"*.
  * Tombol pembatalan *"Cancel Booking"* untuk pemesanan berstatus pending/confirmed.
* **Journaling**:
  * Tombol *"Buat Jurnal Baru"*.
  * Formulir interaktif dengan validasi tanggal unik (tidak boleh dobel dalam satu hari).
  * Tombol aksi *"Simpan Jurnal"*, *"Edit"*, dan *"Hapus"*.
* **Stress Relief Games**:
  * Elemen visual interaktif (Canvas lingkaran pernapasan atau balon gelembung pop yang merespons ketukan jari).

---

### Langkah 3: Buat Pengelompokan dan Hierarchy (Navigasi)

Struktur hierarki antarmuka aplikasi dibagi menjadi:
1. **Navigasi Global (Sidebar Desktop / Bottom Nav Mobile)**:
   * **Beranda/Dashboard**: Menampilkan pintasan status cepat, grafik emosi, dan tombol curhat cepat.
   * **Mood & Jurnal**: Mengelompokkan riwayat pencatatan mood dan tulisan refleksi diri harian.
   * **Layanan Konseling**: Mengelompokkan pencarian direktori psikolog dan daftar janji temu.
   * **Fitur AI & Relaksasi**: Pintu masuk ke Curhat AI dan Stress Relief Games.
2. **Hierarki Konten Halaman (Visual Hierarchy)**:
   * Menggunakan ukuran teks besar untuk judul menu utama (`h1`).
   * Tombol *call-to-action* (CTA) utama menggunakan warna aksen cerah/gradient (misal: tombol *"Booking Sekarang"*, *"Mulai Napas Dalam"*).
   * Informasi status krusial (misal status booking: *Pending* - Kuning, *Confirmed* - Hijau, *Cancelled* - Merah) dibedakan dengan label berwarna kontras (*badge color-coding*).

---

### Langkah 4: Sketch Interaction Framework - Key Path Scenario & Storyboarding

Di bawah ini digambarkan alur interaksi kunci (*Key Path*) dalam bentuk skenario alur layar terstruktur (*storyboarding*) untuk seluruh 6 fitur utama pengguna pada aplikasi **FixYou**:

---

#### **Skenario A: Pelacakan Mood Harian Cepat (Mood Tracker)**
Skenario ini digunakan untuk melacak perasaan dan aktivitas pengguna secara cepat setiap harinya.
```
[Halaman Dashboard]
      │
      ├─► Klik tombol emoji emosi di widget "Bagaimana Perasaanmu?" (misal: Good).
      │
[Modal Detail Log Mood]
      │
      ├─► Pengguna mengetik deskripsi singkat tentang mengapa ia merasakan hal tersebut.
      ├─► Memilih tag aktivitas pendukung (misal: Pekerjaan, Olahraga, Istirahat).
      ├─► Menekan tombol "Simpan Mood".
      │
[Halaman Dashboard (Hasil)]
      │
      └─► Widget beranda terbarui, menampilkan grafik garis tren mingguan yang meningkat, 
          dan memberikan skor rata-rata emosi pengguna untuk minggu tersebut.
```

* **Storyboarding Penjelasan Tampilan**:
  1. **Layar 1 (Dashboard)**: Di bagian atas, terdapat barisan 5 emoji interaktif dengan efek melayang (*hover*) berkilau (Awful 😢, Bad 🙁, Normal 😐, Good 🙂, Amazing 😀).
  2. **Layar 2 (Modal Tulis Cerita)**: Setelah emoji diklik, muncul modal *glassmorphism* kecil dengan kolom teks berbunyi: *"Ada apa hari ini? Tuliskan dalam beberapa kata..."* serta tombol pilihan aktivitas berupa ikon kecil (*Work, Health, Sleep*).
  3. **Layar 3 (Grafik Tren)**: Grafik garis dinamis di dashboard beranimasi dari kiri ke kanan, menandai titik mood hari ini dengan warna yang sesuai (misal: Hijau untuk *Good*).

---

#### **Skenario B: Sesi Curhat Interaktif bersama Asisten Virtual (Curhat AI)**
Skenario ketika pengguna mengalami kecemasan mendadak dan membutuhkan dukungan emosional instan tanpa stigma.
```
[Menu Utama/Sidebar]
      │
      ├─► Memilih menu "Curhat AI".
      │
[Halaman Chat Curhat AI]
      │
      ├─► Sistem memuat sesi chat aktif (membuat baru jika belum ada).
      ├─► Pengguna mengetik keluhannya di kolom chat dan menekan tombol "Kirim".
      ├─► AI merespons dalam hitungan detik dengan respons empatik.
      ├─► AI memberikan opsi coping/teknik menenangkan (misal: link relaksasi).
      ├─► Pengguna menyelesaikan obrolan dengan mengklik "Selesaikan Sesi".
```

* **Storyboarding Penjelasan Tampilan**:
  1. **Layar 1 (Halaman Chat)**: Desain menyerupai antarmuka *instant messaging* yang modern dengan nuansa gelap. Balon obrolan pengguna berwarna indigo gelap, sedangkan balon obrolan AI berwarna abu-abu kehijauan lembut untuk kenyamanan mata.
  2. **Layar 2 (Widget Coping AI)**: Saat AI mendeteksi tingkat stres tinggi dari kata kunci obrolan, di bawah balon chat AI muncul tombol opsi dinamis: *"Butuh bantuan cepat? [Mulai Latihan Napas]"*.
  3. **Layar 3 (Riwayat Sesi)**: Menampilkan daftar riwayat percakapan lama di panel kiri yang dikelompokkan berdasarkan tanggal dan emosi sesi tersebut.

---

#### **Skenario C: Menulis Jurnal Terstruktur & Refleksi Diri (Structured Journaling)**
Skenario untuk menuangkan emosi secara mendalam melalui petunjuk jurnal harian terstruktur.
```
[Halaman Dashboard Jurnal]
      │
      ├─► Klik tombol "+ Tulis Jurnal Hari Ini".
      │
[Halaman Editor Jurnal]
      │
      ├─► Memilih tanggal (sistem memvalidasi agar tidak ada tanggal ganda).
      ├─► Mengetik judul jurnal.
      ├─► Memilih emoji mood dasar.
      ├─► Mengisi kolom refleksi: Gratitude (syukur), Challenge (tantangan), Affirmation (afirmasi).
      ├─► Menekan tombol "Simpan Jurnal".
      │
[Halaman Daftar Jurnal]
      │
      └─► Menampilkan kartu jurnal baru di bagian atas daftar arsip jurnal dengan 
          layout estetik, lengkap dengan ringkasan poin bersyukur dan mood hari itu.
```

* **Storyboarding Penjelasan Tampilan**:
  1. **Layar 1 (Daftar Arsip Jurnal)**: Layout grid yang menampilkan kartu-kartu jurnal lama seperti lembaran *scrapbook* digital yang rapi, berurut dari yang terbaru.
  2. **Layar 2 (Form Editor)**: Terdiri atas beberapa bagian terpisah (*sections*) dengan judul yang inspiratif (contoh: *"3 Hal yang Saya Syukuri Hari Ini"*).
  3. **Layar 3 (Detail View)**: Halaman detail jurnal yang menampilkan seluruh isi tulisan dengan tipografi bergaya serif yang elegan dan opsi tombol untuk mengedit (`Edit`) atau menghapus (`Delete`) jurnal.

---

#### **Skenario D: Pemesanan Sesi Konseling Psikolog Profesional (Booking Psikolog)**
Skenario bagi pengguna yang ingin menjadwalkan konseling profesional secara mandiri baik tatap muka maupun jarak jauh.
```
[Halaman Layanan Konseling]
      │
      ├─► Menggunakan dropdown filter untuk memilih spesialisasi (misal: "Academic Stress").
      ├─► Melihat daftar kartu profil psikolog berlisensi.
      ├─► Klik tombol "Book Appointment" pada psikolog terpilih.
      │
[Form Janji Temu]
      │
      ├─► Memilih jenis konsultasi: "Online" (Video Call) / "Offline" (Klinik).
      ├─► Memilih slot tanggal pada kalender interaktif (slot penuh akan berwarna abu-abu).
      ├─► Memilih slot waktu jam (misal: 10:00 - 11:00).
      ├─► Menuliskan catatan/keluhan awal yang ingin disampaikan.
      ├─► Klik "Konfirmasi Pemesanan".
      │
[Halaman Riwayat Booking]
      │
      └─► Menampilkan status pesanan sebagai "Pending" (menunggu persetujuan psikolog). 
          Pengguna dapat membatalkan pesanan lewat tombol "Cancel" sebelum dikonfirmasi.
```

* **Storyboarding Penjelasan Tampilan**:
  1. **Layar 1 (Direktori Psikolog)**: Kartu profil psikolog yang menonjolkan foto psikolog, sertifikasi (e.g., S.Psi., M.Psi., Psikolog), rating bintang, dan harga per sesi.
  2. **Layar 2 (Kalender Booking)**: Penjadwal visual di mana slot waktu ditampilkan dalam bentuk kotak-kotak *pill* hijau jika tersedia (*available*) dan merah/abu jika sudah terisi.
  3. **Layar 3 (Riwayat Booking)**: Daftar linimasa janji temu yang dikelompokkan berdasarkan status (*Upcoming, Completed, Cancelled*) dengan lencana status berwarna-warni.

---

#### **Skenario E: Meredakan Stres Instan melalui Permainan (Stress Relief Games)**
Skenario pereda kecemasan dan pengalihan stres secara instan menggunakan permainan interaktif sederhana.
```
[Menu Pustaka Games]
      │
      ├─► Memilih game "Pernapasan Dalam" atau "Bubble Pop Relief".
      │
[Layar Area Permainan]
      │
      ├─► Pengguna mengikuti animasi lingkaran pernapasan (Tarik - Tahan - Hembuskan) 
      │   atau mengetuk gelembung di layar untuk memecahkannya dengan efek suara menenangkan.
      ├─► Permainan memberikan feedback visual yang damai.
      │
[Layar Selesai Game]
      │
      └─► Menampilkan pesan apresiasi, menanyakan kondisi mood pengguna pasca bermain, 
          dan memberikan tombol kembali ke dashboard utama.
```

* **Storyboarding Penjelasan Tampilan**:
  1. **Layar 1 (Pustaka Game)**: Antarmuka minimalis menampilkan pilihan game dengan ikon beranimasi lembut (contoh: ilustrasi paru-paru bergerak untuk latihan napas).
  2. **Layar 2 (Animasi Game Pernapasan)**: Tampilan layar penuh dengan lingkaran gradien biru-hijau yang membesar saat pengguna harus menarik napas, diam beberapa saat, dan mengecil saat harus mengembuskan napas.
  3. **Layar 3 (Animasi Bubble Pop)**: Kanvas interaktif berisi barisan gelembung transparan yang memberikan efek getar (*haptic*) dan suara letupan lembut (*soft pop sound*) ketika disentuh oleh pengguna.

---

#### **Skenario F: Analisis Sentimen & Prediksi Kondisi Mental (ML Prediction)**
Skenario untuk mendeteksi tingkat kecemasan atau stres mendalam menggunakan model deteksi emosi otomatis berbasis Machine Learning.
```
[Menu Utama]
      │
      ├─► Masuk ke halaman "ML Prediction".
      │
[Form Input ML]
      │
      ├─► Pengguna memasukkan teks cerita/curhat panjang mengenai masalahnya saat ini.
      ├─► Mengklik tombol "Analisis Kondisi Mental saya".
      │
[Layar Hasil Prediksi AI]
      │
      └─► Sistem memproses tulisan dengan API ML, menampilkan tingkat emosi dominan 
          (Amazing, Good, Normal, Bad, Awful), Confidence Score (e.g., 85%), 
          analisis jumlah aktivitas positif/negatif, serta rekomendasi penanganan yang disesuaikan.
```

* **Storyboarding Penjelasan Tampilan**:
  1. **Layar 1 (Input Prediksi)**: Textbox besar dengan batas tulisan minimal 20 kata untuk akurasi analisis, dilengkapi animasi indikator penghitung karakter di bagian pojok kanan bawah.
  2. **Layar 2 (Proses Analisis)**: Animasi pemindaian (*scanning loader*) berdesain futuristik yang melambangkan kecerdasan buatan sedang menganalisis nuansa teks masukan pengguna.
  3. **Layar 3 (Dashboard Hasil)**: Panel hasil yang menampilkan skor tingkat emosi dalam bentuk diagram lingkaran (*donut chart*), persentase kepercayaan, dan kolom rekomendasi yang menyarankan artikel relaksasi atau konsultasi psikolog jika terdeteksi indikasi depresi/stres berat.

