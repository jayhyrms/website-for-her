// Ambil elemen button
const noButton = document.getElementById('no-button');
const yesButton = document.getElementById('yes-button');

// Inisialisasi audio
const hoverSound = new Audio('assets/sounds/hover.mp3');
const correctSound = new Audio('assets/sounds/correct.mp3');
const uncorrectSound = new Audio('assets/sounds/uncorrect.mp3');
const bgMusic = new Audio('assets/sounds/cute-bossa-nova.mp3');
bgMusic.loop = true;
bgMusic.volume = 0.4; // Set volume 40%

// Fungsi untuk memainkan suara tanpa delay
function playSound(sound) {
    const soundClone = sound.cloneNode(true);
    soundClone.play();
    
    soundClone.addEventListener('ended', () => {
        soundClone.remove();
    });
}

// Fungsi untuk membuat floating hearts
function createFloatingHearts() {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.bottom = '-20px';
    heart.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => heart.remove(), 5000);
}

// Mulai background music pada interaksi pertama
document.body.addEventListener('click', () => {
    bgMusic.play();
}, { once: true });

// Buat floating hearts setiap 300ms
setInterval(createFloatingHearts, 300);

// Event listener untuk tombol No
noButton.addEventListener('mouseover', () => {
    playSound(hoverSound);
});

noButton.addEventListener('click', () => {
    playSound(uncorrectSound);
    noButton.classList.add('no-button-moving');
    
    // Efek random rotation
    const rotation = Math.random() * 360;
    noButton.style.transform = `rotate(${rotation}deg)`;
    
    // Pindahkan tombol ke posisi random
    noButton.style.position = 'fixed';
    noButton.style.top = `${Math.random() * (window.innerHeight - 70)}px`;
    noButton.style.left = `${Math.random() * (window.innerWidth - 120)}px`;
});

// Event listener untuk tombol Yes
yesButton.addEventListener('click', () => {
    playSound(correctSound);
    createConfetti();
    
    Swal.fire({
        title: 'Yayyyy! &#x1F496;',
        text: 'Love you too! (｡♥‿♥｡)',
        imageUrl: 'assets/images/love-gif.gif',
        imageWidth: 200,
        imageHeight: 200,
        background: '#fff5f8',
        confirmButtonText: 'Close &#x2764;&#xFE0F;',
        confirmButtonColor: '#ff4d94',
        showConfirmButton: true,
        timer: 5000,
        timerProgressBar: true,
        allowOutsideClick: true,
        allowEscapeKey: true,
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
        },
        didClose: () => {
            yesButton.classList.add('yes-button-triggered');
            yesButton.innerHTML = 'Yessss! &#x2764;&#xFE0F;';
            
            setTimeout(() => {
                yesButton.classList.remove('yes-button-triggered');
                yesButton.innerHTML = 'Yes';
            }, 2500);
        }
    });
});

// Fungsi untuk membuat efek konfeti
function createConfetti() {
    for(let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        
        // Warna random untuk konfeti
        const colors = ['#ff6b9c', '#ff4d94', '#ff1a75', '#ff85b3'];
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        // Tambah efek parallax
        confetti.style.setProperty('--speed', Math.random() * 2 + 1);
        
        document.body.appendChild(confetti);
        
        // Posisi random untuk konfeti
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        
        confetti.style.left = x + 'px';
        confetti.style.top = y + 'px';
        
        // Hapus konfeti setelah animasi selesai
        setTimeout(() => {
            confetti.remove();
        }, 2000);
    }
}

// Fungsi untuk membuat efek sparkle pada tombol Yes
function createSparkle(event) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    document.body.appendChild(sparkle);
    
    sparkle.style.left = event.clientX + 'px';
    sparkle.style.top = event.clientY + 'px';
    
    setTimeout(() => sparkle.remove(), 800);
}

yesButton.addEventListener('mousemove', createSparkle);

// Event listener untuk responsif
window.addEventListener('resize', () => {
    if (noButton.classList.contains('no-button-moving')) {
        noButton.style.top = `${Math.random() * (window.innerHeight - 70)}px`;
        noButton.style.left = `${Math.random() * (window.innerWidth - 120)}px`;
    }
});

// Error handling untuk audio dan gambar
[hoverSound, correctSound, uncorrectSound, bgMusic].forEach(audio => {
    audio.addEventListener('error', () => {
        console.warn(`Error loading audio: ${audio.src}`);
    });
});

// Loading handler
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.opacity = '0';
        setTimeout(() => loading.remove(), 500);
    }
});

// Buat tombol musik yang cute
const createMusicButton = () => {
    const musicToggle = document.createElement('button');
    musicToggle.className = 'music-toggle';
    musicToggle.innerHTML = `
        <span class="music-icon">🎵</span>
        <span class="music-wave">
            <i></i><i></i><i></i><i></i>
        </span>
    `;
    document.body.appendChild(musicToggle);

    let isPlaying = false;

    // Play musik saat interaksi pertama
    document.body.addEventListener('click', () => {
        if (!isPlaying) {
            bgMusic.play().then(() => {
                isPlaying = true;
                musicToggle.classList.add('is-playing');
            }).catch(err => {
                console.warn('Audio autoplay was prevented:', err);
            });
        }
    }, { once: true });

    // Toggle musik
    musicToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            musicToggle.classList.add('is-playing');
        } else {
            bgMusic.pause();
            musicToggle.classList.remove('is-playing');
        }
    });
};

// Panggil fungsi saat halaman dimuat
window.addEventListener('load', createMusicButton);
