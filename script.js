// Fungsi untuk memutar musik dan mulai confetti
function playMusic() {
  const music = document.getElementById('bg-music');
  music.play().then(() => {
    startConfetti();
  }).catch(() => {
    alert("Klik tombol untuk mulai musik, browser memblokir autoplay.");
  });
}

// Fungsi confetti
function startConfetti() {
  const duration = 4000; // 4 detik
  const animationEnd = Date.now() + duration;
  const defaults = {
    origin: { y: 0.6 },
    colors: ['#ff69b4', '#d63384', '#ba2d65', '#fff0f5']
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      clearInterval(interval);
      return;
    }

    const particleCount = 50 * (timeLeft / duration);

    confetti({
      particleCount,
      angle: randomInRange(60, 120),
      spread: 100,
      origin: { x: Math.random(), y: Math.random() * 0.4 },
      ...defaults
    });
  }, 250);
}

// Efek ketik
document.addEventListener("DOMContentLoaded", () => {
  const text = "Hari ini adalah hari spesialmu, dan aku ingin kamu tahu betapa luar biasanya kamu.";
  const target = document.getElementById("typingTarget");
  const hint = document.getElementById("hintText");
  let index = 0;

  function typeChar() {
    if (index < text.length) {
      target.textContent += text.charAt(index);
      index++;
      setTimeout(typeChar, 40);
    } else {
      hint.style.display = "block";
      hint.style.animation = "fadeIn 1s ease forwards";
    }
  }

  typeChar();
});

// Daftar foto slider
const photos = [
  {
    src: "foto1.jpg",
    alt: "Moment 1 - Waktu kita main bareng di taman",
    title: "Waktu kita main bareng di taman"
  },
  {
    src: "foto2.jpg",
    alt: "Moment 2 - Selfie cantik waktu acara sekolah",
    title: "Selfie cantik waktu acara sekolah"
  },
  {
    src: "foto3.jpg",
    alt: "Moment 3 - Hari ulang tahunmu tahun lalu",
    title: "Hari ulang tahunmu tahun lalu"
  }
];

// Preload semua foto
photos.forEach(photo => {
  const img = new Image();
  img.src = photo.src;
});

// Logika slider foto
let currentIndex = 0;

function changeSlide(direction) {
  const slideImage = document.getElementById("slideImage");

  // Fade out dulu
  slideImage.style.opacity = 0;

  // Setelah fade out selesai (300ms), ganti gambar & langsung fade in
  setTimeout(() => {
    // Update indeks
    currentIndex = (currentIndex + direction + photos.length) % photos.length;

    // Ganti konten gambar
    slideImage.src = photos[currentIndex].src;
    slideImage.alt = photos[currentIndex].alt;
    slideImage.title = photos[currentIndex].title;

    // Fade in
    slideImage.style.opacity = 1;
  }, 300); // Sesuai dengan CSS transition
}
