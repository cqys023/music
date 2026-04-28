const API = "https://music-api.gdstudio.xyz/api.php";

let audio = document.getElementById("audio");

document.getElementById("kw").addEventListener("keypress", function(e){
    if(e.key === "Enter") search();
});

async function search() {
    let kw = document.getElementById("kw").value;

    let res = await fetch(`${API}?types=search&source=netease&name=${kw}`);
    let data = await res.json();

    let list = document.getElementById("list");
    list.innerHTML = "";

    data.result.forEach(m => {
        let div = document.createElement("div");
        div.className = "item";

        div.innerHTML = `
            <div class="title">${m.name}</div>
            <div class="artist">${m.artist}</div>
        `;

        div.onclick = () => play(m);

        list.appendChild(div);
    });
}

async function play(music) {

    document.getElementById("title").innerText =
        music.name + " - " + music.artist;

    let urlRes = await fetch(`${API}?types=url&id=${music.id}`);
    let urlData = await urlRes.json();

    audio.src = urlData.url;
    audio.play();

    let lrcRes = await fetch(`${API}?types=lyric&id=${music.id}`);
    let lrcData = await lrcRes.json();

    document.getElementById("lyric").innerText =
        lrcData.lyric || "暂无歌词";
}
