const API = "https://music-api.gdstudio.xyz/api.php";
const SOURCE = "netease"; // 可换 kuwo / joox

async function search() {
    let kw = document.getElementById("kw").value;

    let res = await fetch(
        `${API}?types=search&source=${SOURCE}&name=${encodeURIComponent(kw)}`
    );

    let data = await res.json();

    console.log("返回数据:", data); // 调试用

    // 兼容不同结构
    let listData = data.result || data.data || [];

    let list = document.getElementById("list");
    list.innerHTML = "";

    if (!listData.length) {
        list.innerHTML = "<div>没搜到（可能API挂了）</div>";
        return;
    }

    listData.forEach(m => {
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

    // 播放
    let urlRes = await fetch(
        `${API}?types=url&source=${SOURCE}&id=${music.id}&br=320`
    );
    let urlData = await urlRes.json();

    if (!urlData.url) {
        alert("播放失败（接口限制或失效）");
        return;
    }

    let audio = document.getElementById("audio");
    audio.src = urlData.url;
    audio.play();

    // 歌词
    let lrcRes = await fetch(
        `${API}?types=lyric&source=${SOURCE}&id=${music.id}`
    );
    let lrcData = await lrcRes.json();

    document.getElementById("lyric").innerText =
        lrcData.lyric || "暂无歌词";
}
