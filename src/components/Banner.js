export default function Banner() {
  const banners = [
    "https://via.placeholder.com/1200x500?text=Banner+1",
    "https://via.placeholder.com/1200x500?text=Banner+2",
    "https://via.placeholder.com/1200x500?text=Banner+3",
  ];

  let currentIndex = 0;
  let intervalId;

  function createBanner() {
    const bannerContainer = document.createElement("div");
    bannerContainer.className =
      "relative w-full h-full mx-auto bg-[#f2f2f2] max-h-[500px] overflow-hidden";

    const bannerImage = document.createElement("img");
    bannerImage.src = banners[currentIndex];
    bannerImage.alt = `배너 ${currentIndex + 1}`;
    bannerImage.className = "w-full h-auto transition-opacity duration-500";
    bannerContainer.appendChild(bannerImage);

    const buttonClass =
      "absolute top-1/2 transform -translate-y-1/2 text-white px-4 py-2 focus:outline-none w-[8px] h-[16px] bg-no-repeat bg-center";

    const prevButton = document.createElement("button");
    prevButton.className = `${buttonClass} bg-[url('/images/icon-swiper-1.svg')] left-4`;
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + banners.length) % banners.length;
      updateBanner();
      resetInterval();
    });

    const nextButton = document.createElement("button");
    nextButton.className = `${buttonClass} bg-[url('/images/icon-swiper-2.svg')] right-4`;
    nextButton.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % banners.length;
      updateBanner();
      resetInterval();
    });

    bannerContainer.appendChild(prevButton);
    bannerContainer.appendChild(nextButton);

    // 페이지네이션 (도트) 추가
    const pagination = document.createElement("div");
    pagination.className =
      "absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2";

    banners.forEach((_, index) => {
      const dot = document.createElement("span");
      dot.className = `w-[6px] h-[6px] rounded-full cursor-pointer transition-colors duration-300 ${
        index === currentIndex ? "bg-black" : "bg-white"
      }`;
      dot.addEventListener("click", () => {
        currentIndex = index;
        updateBanner();
        resetInterval();
      });
      pagination.appendChild(dot);
    });

    bannerContainer.appendChild(pagination);

    function updateBanner() {
      bannerImage.src = banners[currentIndex];
      bannerImage.alt = `배너 ${currentIndex + 1}`;
      updatePagination();
    }

    function updatePagination() {
      const dots = pagination.querySelectorAll("span");
      dots.forEach((dot, index) => {
        dot.className = `w-2 h-2 rounded-full cursor-pointer transition-colors duration-300 ${
          index === currentIndex ? "bg-black" : "bg-white"
        }`;
      });
    }

    // 자동 슬라이드 기능
    function startAutoSlide() {
      intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % banners.length;
        updateBanner();
      }, 3000);
    }

    function resetInterval() {
      clearInterval(intervalId);
      startAutoSlide();
    }

    startAutoSlide();

    return bannerContainer;
  }

  return createBanner();
}
