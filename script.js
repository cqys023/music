const API = "https://music-api.gdstudio.xyz/api.php";

async function search() {
    let kw = document.getElementById("kw").value;
    let res = await fetch(`${API}?types=search&source=netease&name=${kw}`);
    let data = await res.json();

    let list = document.getElementById("list");
    list.innerHTML = "";

    data.result.forEach(m => {
        let li = document.createElement("li");
        li.innerText = m.name + " - " + m.artist;
        li.onclick = () => play(m.id);
        list.appendChild(li);
    });
}

async function play(id) {
    // 播放地址
    let urlRes = await fetch(`${API}?types=url&id=${id}`);
    let urlData = await urlRes.json();

    document.getElementById("player").src = urlData.url;

    // 歌词
    let lrcRes = await fetch(`${API}?types=lyric&id=${id}`);
    let lrcData = await lrcRes.json();

    document.getElementById("lyric").innerText = lrcData.lyric || "暂无歌词";
}
