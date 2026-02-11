const titleTag = document.getElementById('song-title');
const artistTag = document.getElementById('artist-name');

// Update UI from Spotify
window.electronAPI.onTrackChange((data) => {
  titleTag.innerText = data.title;
  artistTag.innerText = data.artist;
});

// Controls
document.getElementById('play-btn').onclick = () => window.electronAPI.sendControl('play-pause');
document.getElementById('next').onclick = () => window.electronAPI.sendControl('next');
document.getElementById('prev').onclick = () => window.electronAPI.sendControl('prev');
