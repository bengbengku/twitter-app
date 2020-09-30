const URL = "http://localhost:3000/tweets";


//Trik membuat tombol enter dalam pencarian melaui code key = "Enter"
const onEnter = (e) => {
    if(e.key == "Enter"){
        getTwitterData();
    }
}

/**
 * Mengambil Data Twitter dari API
 */
const getTwitterData = () => {
  const query = document.getElementById("user-search-input").value;

  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  const fullUrl = `${URL}?q=${encodedQuery}&count=10`; //pencarian

  fetch(fullUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
};
getTwitterData();

/**
 * Menyimpan data page selanjutnya
 */
const saveNextPage = (metadata) => {};

/**
 * Menghandle saat pengguna mengklik trend
 */
const selectTrend = (e) => {};

/**
 * Atur visibilitas halaman berikutnya berdasarkan jika ada data di halaman berikutnya
 */
const nextPageButtonVisibility = (metadata) => {};

/**
 * Buat HTML Tweet berdasarkan Data dari API
 */
const buildTweets = (tweets, nextPage) => {};

/**
 * Bangun HTML untuk Gambar Tweet
 */
const buildImages = (mediaList) => {};

/**
 * Bangun HTML untuk video Tweet
 */
const buildVideo = (mediaList) => {};
