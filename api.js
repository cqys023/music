const API = "https://music-api.gdstudio.xyz/api.php";

const MusicAPI = {
    search(keyword, source="netease") {
        return fetch(`${API}?types=search&source=${source}&name=${encodeURIComponent(keyword)}`)
            .then(r => r.json());
    },

    url(id, source="netease") {
        return fetch(`${API}?types=url&source=${source}&id=${id}&br=320`)
            .then(r => r.json());
    },

    lyric(id, source="netease") {
        return fetch(`${API}?types=lyric&source=${source}&id=${id}`)
            .then(r => r.json());
    }
};
