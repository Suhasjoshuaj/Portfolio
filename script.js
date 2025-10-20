feather.replace();

// Music player state
let currentTrackSrc = null;
let currentButton = null;
const player = document.getElementById("audioPlayer");

// Addinf focus state to the player container
const playerContainer = document.querySelector('.music-player-container') || document.body;

function handleKeyPress(e) {
  // Only handle keys if we have a current track and player has focus
  if (!currentTrackSrc) return;
  
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
    return;
  }

  switch(e.code) {
    case 'Space':
      e.preventDefault();
      togglePlayPause();
      break;
    
    case 'ArrowRight':
      e.preventDefault();
      if (e.ctrlKey) {
        player.currentTime = Math.max(0, player.duration - 10);
      } else {
        player.currentTime = Math.min(player.duration, player.currentTime + 10);
      }
      break;
    
    case 'ArrowLeft':
      e.preventDefault();
      if (e.ctrlKey) {
        player.currentTime = 0;
      } else {
        player.currentTime = Math.max(0, player.currentTime - 10);
      }
      break;
    
    case 'ArrowUp':
      e.preventDefault();
      player.volume = Math.min(1, player.volume + 0.1);
      break;
    
    case 'ArrowDown':
      e.preventDefault();
      player.volume = Math.max(0, player.volume - 0.1);
      break;
  }
}

function togglePlayPause() {
  if (!currentTrackSrc) return;

  if (player.paused) {
    player.play();
    if (currentButton) {
      currentButton.innerHTML = '<i data-feather="pause"></i>';
      feather.replace();
    }
  } else {
    player.pause();
    if (currentButton) {
      currentButton.innerHTML = '<i data-feather="play"></i>';
      feather.replace();
    }
  }
}

function playTrack(src, button) {
  const isSameTrack = currentTrackSrc === src;
  
  // Reset previous button if it's a different track
  if (currentButton && currentButton !== button) {
    currentButton.innerHTML = '<i data-feather="play"></i>';
  }

  if (isSameTrack && !player.paused) {
    player.pause();
    button.innerHTML = '<i data-feather="play"></i>';
  } else {
    if (!isSameTrack) {
      player.src = src;
    }
    player.play();
    button.innerHTML = '<i data-feather="pause"></i>';
    
    // visual focus indicator to  playing card
    document.querySelectorAll('.music-card').forEach(card => {
      card.classList.remove('playing');
    });
    button.closest('.music-card').classList.add('playing');
  }

  currentTrackSrc = src;
  currentButton = button;
  feather.replace();
}

// Adding the event listener
document.addEventListener('keydown', handleKeyPress);

// Player event listeners
player.addEventListener('ended', function() {
  if (currentButton) {
    currentButton.innerHTML = '<i data-feather="play"></i>';
    feather.replace();
  }
});

player.addEventListener('pause', function() {
  if (currentButton && player.src === currentTrackSrc) {
    currentButton.innerHTML = '<i data-feather="play"></i>';
    feather.replace();
  }
});

//  event listeners for audio player
player.addEventListener("ended", function () {
  if (currentButton) {
    currentButton.innerHTML = '<i data-feather="play"></i>';
    feather.replace();
  }
});

player.addEventListener("pause", function () {
  // update button if pause wasn't triggered by track change
  if (currentButton && player.src === currentTrackSrc) {
    currentButton.innerHTML = '<i data-feather="play"></i>';
    feather.replace();
  }
});


// Smooth mouse glow animation
const glow = document.getElementById("cursor-glow");
let targetX = 0,
  targetY = 0,
  currentX = 0,
  currentY = 0;

document.addEventListener("mousemove", (e) => {
  targetX = e.clientX;
  targetY = e.clientY;
});

function animateGlow() {
  currentX += (targetX - currentX) * 0.08;
  currentY += (targetY - currentY) * 0.08;
  glow.style.transform = `translate(${currentX - 300}px, ${currentY - 300}px)`;
  requestAnimationFrame(animateGlow);
}
animateGlow();
