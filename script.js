let currentPage = 1;

// Fungsi efek ketik
function typeText(element, text, index) {
  if (index < text.length) {
    element.innerHTML += text.charAt(index);
    setTimeout(() => {
      typeText(element, text, index + 1);
    }, 50);
  }
}

// Fungsi untuk pindah ke halaman selanjutnya
function nextPage() {
  const current = document.getElementById(`page${currentPage}`);
  current.classList.remove('active');
  currentPage++;

  const next = document.getElementById(`page${currentPage}`);
  if (next) {
    next.classList.add('active');

    // Efek ketik
    const typedElement = next.querySelector('#typed-text');
    if (typedElement) {
      typedElement.innerHTML = '';
      typeText(typedElement, typedElement.dataset.text, 0);
    }

    // ⏯️ Play bg-music saat pertama kali user klik tombol
    if (currentPage === 2) {
      const bgMusic = document.getElementById('bg-music');
      if (bgMusic) {
        bgMusic.muted = false;
        bgMusic.play().catch(err => console.warn("Gagal play bg-music:", err));
      }
    }

    // 🎵 Play sound hewan pas masuk halaman 3
    if (currentPage === 3) {
      const animalSound = document.getElementById('animal-sound');
      if (animalSound) {
        animalSound.currentTime = 0;
        animalSound.play().catch(err => console.warn("Gagal play animal sound:", err));
      }
    }

    // 🚫 Sembunyikan banner di halaman 3
    const banner = document.querySelector('.banner-png');
    if (banner) {
      banner.style.display = (currentPage === 3) ? 'none' : 'block';
    }
  }
}



// Konfeti generator
function createConfetti() {
  const confetti = document.createElement('span');
  confetti.style.left = Math.random() * 100 + 'vw';
  confetti.style.backgroundColor = randomColor();
  confetti.style.animationDuration = (Math.random() * 3 + 2) + 's';
  document.getElementById('confetti').appendChild(confetti);

  setTimeout(() => {
    confetti.remove();
  }, 5000);
}

function randomColor() {
  const colors = ['#ff69b4', '#ffd700', '#87cefa', '#ffa07a', '#98fb98'];
  return colors[Math.floor(Math.random() * colors.length)];
}

setInterval(createConfetti, 200);

// Saat halaman pertama dimuat
window.onload = () => {
  const firstTyped = document.querySelector('#page1 #typed-text');
  if (firstTyped) {
    const text = firstTyped.dataset.text;
    typeText(firstTyped, text, 0);
  }
};

