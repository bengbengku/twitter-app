const URL = "http://localhost:3000/tweets";



/**
 * Mengambil Data Twitter dari API
 */
const getTwitterData = () => {

    const query = document.getElementById('user-search-input').value;
    const url = "http://localhost:3000/tweets?q=coding&count=10";
    console.log(query);

    fetch(url).then((response) => {
        return response.json();
    }).then((data) => {
        console.log(data);
    })

}
getTwitterData();

/**
 * Menyimpan data page selanjutnya
 */
const saveNextPage = (metadata) => {
}

/**
 * Menghandle saat pengguna mengklik trend
 */
const selectTrend = (e) => {
}

/**
 * Atur visibilitas halaman berikutnya berdasarkan jika ada data di halaman berikutnya
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Buat HTML Tweet berdasarkan Data dari API
 */
const buildTweets = (tweets, nextPage) => {

}

/**
 * Bangun HTML untuk Gambar Tweet
 */
const buildImages = (mediaList) => {

}

/**
 * Bangun HTML untuk video Tweet
 */
const buildVideo = (mediaList) => {

}
