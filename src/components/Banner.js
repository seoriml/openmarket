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
      "relative w-full h-full mx-auto bg-slate-500 max-h-[500px] overflow-hidden";

    const bannerImage = document.createElement("img");
    bannerImage.src = banners[currentIndex];
    bannerImage.alt = `배너 ${currentIndex + 1}`;
    bannerImage.className = "w-full h-auto transition-opacity duration-500";
    bannerContainer.appendChild(bannerImage);

    const buttonClass =
      "absolute top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white px-4 py-2 rounded-full focus:outline-none hover:bg-opacity-75 transition-colors";

    const prevButton = document.createElement("button");
    prevButton.textContent = "<";
    prevButton.className = `${buttonClass} left-4`;
    prevButton.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + banners.length) % banners.length;
      updateBanner();
      resetInterval();
    });

    const nextButton = document.createElement("button");
    nextButton.textContent = ">";
    nextButton.className = `${buttonClass} right-4`;
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
      dot.className = `w-3 h-3 bg-white rounded-full opacity-50 cursor-pointer transition-opacity duration-300 ${
        index === currentIndex ? "opacity-100" : ""
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
        dot.classList.toggle("opacity-100", index === currentIndex);
        dot.classList.toggle("opacity-50", index !== currentIndex);
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
