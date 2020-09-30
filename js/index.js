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
const selectTrend = (e) => {
  const text = e.innerText;
  document.getElementById('user-search-input').value = text;
  getTwitterData();
};

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
    const createdDate = moment(tweet.created_at).fromNow();
    twitterContent += `
        <div class="tweets-container">
          <div class="tweets-user-info">
              <div class="tweets-user-profile" style="background-image: url(${tweet.user.profile_image_url_https})">
              </div>
              <div class="tweets-user-name-container">
                  <div class="tweets-user-fullname">
                      ${tweet.user.name}
                  </div>
                  <div class="tweets-user-username">
                      @${tweet.user.screen_name}
                  </div>
              </div>
          </div>
    `;
    if (tweet.extended_entities && tweet.extended_entities.media.length > 0) {
      twitterContent += buildImages(tweet.extended_entities.media);
      twitterContent += buildVideo(tweet.extended_entities.media);
    }

    twitterContent += `
          <div class="tweets-text-container">
            ${tweet.full_text}
          </div>
          <div class="tweets-date-container">
              ${createdDate}
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
const buildVideo = (mediaList) => {
  let videoContent = `<div class="tweet-video-container">`;
  let videoExists = false;
  mediaList.map((media) => {
      if(media.type == "video") {
        videoExists = true;
          videoContent += `
              <video controls>
                <source src="${media.video_info.variants[0].url}" type="video/mp4">
              </video>
          `;
      } else if (media.type == "animated_gif") {
          videoExists = true;
          videoContent += `
            <video loop autoplay>
              <source src="${media.video_info.variants[0].url}" type="video/mp4">
            </video>
          `;
      }
  });

  videoContent += `</div>`
  return videoExists ? videoContent : '';
};
