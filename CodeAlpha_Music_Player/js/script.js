const audio = document.getElementById("audio");
const playPauseBtn = document.getElementById("playPauseBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const progressBar = document.getElementById("progressBar");
const volumeControl = document.getElementById("volumeControl");

const songTitle = document.getElementById("songTitle");
const songArtist = document.getElementById("songArtist");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

const songs = [
    { 
        title: "I Don\'t Think So", 
        artist: "The Soundlings", 
        src: "assets/audio/song1.mp3" 
    },
    { 
        title: "Straw Squeak", 
        artist: "Cartoon", 
        src: "assets/audio/song2.mp3" 
    },
    { 
        title: "Bugle Calls Mess Call", 
        artist: "USAF Heritage of America Band", 
        src: "assets/audio/song3.mp3" 
    }
];

let currentIndex = 0;
let isPlaying = false;

/* Load song */
function loadSong(index) {
    const song = songs[index];
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;

    updatePlaylistUI();
}

/* Play / Pause */
function togglePlay() {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
}

audio.addEventListener("play", () => {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

audio.addEventListener("pause", () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

/* Next / Prev */
function nextSong() {
    currentIndex = (currentIndex + 1) % songs.length;
    loadSong(currentIndex);
    audio.play();
}

function prevSong() {
    currentIndex = (currentIndex - 1 + songs.length) % songs.length;
    loadSong(currentIndex);
    audio.play();
}

/* Progress */
audio.addEventListener("timeupdate", () => {
    progressBar.value = (audio.currentTime / audio.duration) * 100 || 0;
    currentTimeEl.textContent = formatTime(audio.currentTime);
});

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});

progressBar.addEventListener("input", () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

/* Volume */
volumeControl.addEventListener("input", () => {
    audio.volume = volumeControl.value;
});

/* Autoplay next */
audio.addEventListener("ended", nextSong);

/* Playlist */
function renderPlaylist() {
    playlistEl.innerHTML = "";
    songs.forEach((song, index) => {
        const li = document.createElement("li");
        li.className = "list-group-item";
        li.textContent = `${song.title} – ${song.artist}`;
        li.onclick = () => {
            currentIndex = index;
            loadSong(index);
            audio.play();
        };
        playlistEl.appendChild(li);
    });
}

function updatePlaylistUI() {
    document.querySelectorAll(".list-group-item").forEach((item, i) => {
        item.classList.toggle("active", i === currentIndex);
    });
}

/* Helpers */
function formatTime(seconds) {
    const min = Math.floor(seconds / 60) || 0;
    const sec = Math.floor(seconds % 60) || 0;
    return `${min}:${sec.toString().padStart(2, "0")}`;
}

/* Init */
renderPlaylist();
loadSong(currentIndex);
audio.volume = volumeControl.value;

playPauseBtn.onclick = togglePlay;
nextBtn.onclick = nextSong;
prevBtn.onclick = prevSong;
