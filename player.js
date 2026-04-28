let audio = new Audio();
let currentList = [];
let currentIndex = 0;

function playMusic(list, index) {
    currentList = list;
    currentIndex = index;

    let song = list[index];

    MusicAPI.url(song.id).then(res => {
        audio.src = res.url;
        audio.play();

        document.getElementById("title").innerText =
            song.name + " - " + song.artist;
    });

    MusicAPI.lyric(song.id).then(res => {
        document.getElementById("lyric").innerText =
            res.lyric || "暂无歌词";
    });
}

function next() {
    if (currentIndex < currentList.length - 1) {
        playMusic(currentList, currentIndex + 1);
    }
}

function prev() {
    if (currentIndex > 0) {
        playMusic(currentList, currentIndex - 1);
    }
}
