const URL = "http://localhost:3000/tweets";

//Trik membuat tombol enter dalam pencarian melaui code key = "Enter"
const onEnter = (e) => {
  if (e.key == "Enter") {
    getTwitterData();
  }
};

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
      buildTweets(data.statuses);
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
const buildTweets = (tweets, nextPage) => {
  let twitterContent = "";
  tweets.map((tweet) => {
    twitterContent += `
        <div class="tweets-container">
          <div class="tweets-user-info">
              <div class="tweets-user-profile">

              </div>
              <div class="tweets-user-name-container">
                  <div class="tweets-user-fullname">
                      Anggiat Benget
                  </div>
                  <div class="tweets-user-username">
                      @bengbengku
                  </div>
              </div>
          </div>
    `;
    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      twitterContent += buildImages(tweet.extended_entities.media);
    }

    twitterContent += `
          <div class="tweets-text-container">
            ${tweet.full_text}
          </div>
          <div class="tweets-date-container">
              20 hours ago
          </div>
      </div>
    `;
  });

  document.querySelector(".tweets-list").innerHTML = twitterContent;
};

/**
 * Bangun HTML untuk Gambar Tweet
 */
const buildImages = (mediaList) => {
  let imagesContent = `<div class="tweets-images-container">`;
  let imageExists = false;
  mediaList.map((media) => {
      if(media.type == "photo") {
        imageExists = true;
          imagesContent += `<div class="tweet-image" style="background-image: url(${media.media_url_https})"></div>`;
      }
  });

  imagesContent += `</div>`
  return imageExists ? imagesContent : '';
};

/**
 * Bangun HTML untuk video Tweet
 */
const buildVideo = (mediaList) => {};
