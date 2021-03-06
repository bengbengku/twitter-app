const URL = "http://localhost:3000/tweets";
let nextPageUrl = null;


//Trik membuat tombol enter dalam pencarian melaui code key = "Enter"
const onEnter = (e) => {
  if (e.key == "Enter") {
    getTwitterData();
  }
};

/**
 * Meload data selanjutnya untuk nextPage
 */

const onNextPage = () => {
    if(nextPageUrl) {
  
      getTwitterData(true);

    }
}


/**
 * Mengambil Data Twitter dari API
 */
const getTwitterData = (nextPage=false) => {
  const query = document.getElementById("user-search-input").value;

  if (!query) return;
  const encodedQuery = encodeURIComponent(query);
  let fullUrl = `${URL}?q=${encodedQuery}&count=10`; //pencarian | const diganti let untuk beri akses nextPageUrl

  if(nextPage && nextPageUrl) {
      fullUrl = nextPageUrl;
  }

  fetch(fullUrl)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      buildTweets(data.statuses, nextPage);
      saveNextPage(data.search_metadata);
      nextPageButtonVisibility(data.search_metadata);
    });
};
getTwitterData();

/**
 * Menyimpan data page selanjutnya
 */
const saveNextPage = (metadata) => {
    if(metadata.next_results) {
        nextPageUrl = `${URL}${metadata.next_results}`;
    } else {
        nextPageUrl = null;
    }
};

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
const nextPageButtonVisibility = (metadata) => {
  if(metadata.next_results) {
    document.getElementById('next-page').style.visibility = "visible";
  } else {
    document.getElementById('next-page').style.visibility = "hidden";
  }
};

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

  if(nextPage) {
    document.querySelector('.tweets-list').insertAdjacentHTML('beforeend', twitterContent);
  } else {
    document.querySelector(".tweets-list").innerHTML = twitterContent;
  }

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
        const videoVariant = media.video_info.variants.find((variant) => variant.content_type == 'video/mp4');
          videoContent += `
              <video controls>
                <source src="${videoVariant.url}" type="video/mp4">
              </video>
          `;
      } else if (media.type == "animated_gif") {
          videoExists = true;
          const videoVariant = media.video_info.variants.find((variant) => variant.content_type == 'video/mp4');
          videoContent += `
            <video loop autoplay>
              <source src="${videoVariant.url}" type="video/mp4">
            </video>
          `;
      }
  });

  videoContent += `</div>`
  return videoExists ? videoContent : '';
};
