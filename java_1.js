document.addEventListener("DOMContentLoaded", () => {
console.log("JS MASTER RUNNING");

if ('scrollRestoration' in history) {
  history.scrollRestoration = 'manual';
}
window.addEventListener("load", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth" 
  });
});

/* ================= SLIDE 1 : GATE ================= */
(function slide1Gate() {
  const slide1 = document.querySelector("#slide-1-gate");
  const slide2 = document.querySelector("#slide-2-chronicle");
  if (!slide1 || !slide2) return;

  const startBtn = slide1.querySelector("#s1-start");
  
  startBtn.addEventListener("click", () => {
    setTimeout(() => {
      slide1.classList.add("open");
    }, 400);

    setTimeout(() => {
      slide2.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }, 1600);

      bgMusic.volume = 0.4;
      bgMusic.play();

      setTimeout(() => {
        slide1.classList.add("open");
  }, 400);
  bgMusic.volume = 0;

bgMusic.play();

let fade = setInterval(() => {
  if(bgMusic.volume < 0.4){
     bgMusic.volume += 0.02;
  }
},200);
  });
})();

/* ================= SLIDE 2 : CHRONICLE ================= */
(function slide2Chronicle() {
  const slide = document.querySelector("#slide-2-chronicle");
  if (!slide) return;

  const boards = slide.querySelectorAll(".s2-board");
  const prev = slide.querySelector(".s2-prev");
  const next = slide.querySelector(".s2-next");
  const proceed = slide.querySelector(".s2-proceed");

  let index = 0;
  let zoomed = false;

  function update() {
    boards.forEach((b, i) => {
      b.classList.toggle("active", i === index);
      b.classList.remove("zoom");
    });
    slide.classList.remove("zooming");
    zoomed = false;
  }

  prev.addEventListener("click", () => {
    if (zoomed) return;
    if (index > 0) {
      index--;
      update();
    }
  });

  next.addEventListener("click", () => {
    if (zoomed) return;
    if (index < boards.length - 1) {
      index++;
      update();
    }
  });

  boards.forEach((board, i) => {
    board.addEventListener("click", () => {
      if (zoomed) return;
      index = i;
      slide.classList.add("zooming");
      board.classList.add("zoom");
      zoomed = true;
    });
  });

  slide.addEventListener("click", e => {
    if (!zoomed) return;
    if (!e.target.closest(".s2-board")) {
      update();
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && zoomed) {
      update();
    }
  });

  proceed.addEventListener("click", () => {
  const slide3 = document.querySelector("#slide-3-gallery");
  if (!slide3) return;

  if (zoomed) {
    update();
  }

  setTimeout(() => {
    slide3.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 300);
});


  update();
})();
});

/* ================= SLIDE 3 : BOARD INTERACTION ================= */
(function slide3Gallery() {
  const slide = document.querySelector("#slide-3-gallery");
  if (!slide) return;

  const board  = slide.querySelector(".s3-main-board");
  const modal  = slide.querySelector(".s3-modal");
  const viewer = slide.querySelector(".s3-photo-viewer");
  const img   = slide.querySelector("#s3ViewerImg");
  const desc  = slide.querySelector("#s3ViewerDesc");
  const inner = slide.querySelector(".s3-photo-inner");
  const flip  = slide.querySelector(".s3-flip-btn");
  const descendBtn = slide.querySelector(".s3-descent");
  const slide4 = document.querySelector("#slide-4-projector");

  board.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  modal.addEventListener("click", e => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  slide.querySelectorAll(".s3-photo").forEach(photo => {
    photo.addEventListener("click", () => {
      img.src = photo.dataset.full;
      desc.textContent = photo.dataset.desc || "";
      inner.classList.remove("flipped");
      viewer.classList.add("active");   
    });
  });

  flip.addEventListener("click", e => {
    e.stopPropagation();
    inner.classList.toggle("flipped");
  });

  viewer.addEventListener("click", e => {
    if (e.target === viewer) {
      viewer.classList.remove("active"); 
      inner.classList.remove("flipped");
    }
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      modal.classList.add("hidden");
      viewer.classList.remove("active");
      inner.classList.remove("flipped");
    }
  });

if (descendBtn && slide4) {

  descendBtn.addEventListener("click", () => {

    slide.classList.add("s3-fade-out");
    setTimeout(() => {
      slide4.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

      slide4.classList.add("s4-reveal");
    }, 800);
  });

}

})();

/* ================= SLIDE 4 : PROJECTOR ================= */
(function slide4Projector() {
  const slide = document.querySelector("#slide-4-projector");
  if (!slide) return;

  const cabinet = slide.querySelector(".s4-cabinet");
  const archiveModal = slide.querySelector(".s4-archive-modal");
  const archiveBoard = slide.querySelector(".s4-archive-board");
  const cds = slide.querySelectorAll(".s4-cd");
  const playBtn  = slide.querySelector(".s4-projector-play");
  const pauseBtn = slide.querySelector(".s4-projector-pause");
  const stopBtn  = slide.querySelector(".s4-projector-stop");
  const timeLabel = slide.querySelector(".s4-projector-time");
  const screenHint = slide.querySelector(".s4-screen-hint");
  const projectorCD = slide.querySelector(".s4-projector-cd");
  const video = slide.querySelector(".s4-video");
  const videoSource = video.querySelector("source");
  const s4Next = document.querySelector(".s4-next");
  const slide4 = document.querySelector("#slide-4-projector");
  const slide5 = document.querySelector("#slide-5-ledger");

cabinet.addEventListener("click", () => {
  archiveModal.classList.remove("hidden");
});

archiveModal.addEventListener("click", (e) => {
  if (e.target === archiveModal) {
    archiveModal.classList.add("hidden");
  }
});

let currentVideo = null;
let isPaused = false;

cds.forEach(cd => {
  cd.addEventListener("click", () => {

    cds.forEach(c => c.classList.remove("active"));
    cd.classList.add("active");
    currentVideo = cd.dataset.video;
    archiveModal.classList.add("hidden");
    slide.classList.add("play-ready");
  screenHint.textContent = "MEDIA DETECTED";
  const cover = cd.dataset.cover;
  projectorCD.style.backgroundImage = `url(${cover})`;

    console.log("CD selected:", currentVideo);
    
  });
});

playBtn.addEventListener("click", () => {
  if (!currentVideo) return;

  if (videoSource.src !== currentVideo) {
    videoSource.src = currentVideo;
    video.load();
  }

  slide.classList.add("playing");
  document.querySelector(".s4-screen-inner").classList.add("screen-active");

  slide.classList.remove("paused");

  video.play();
  isPaused = false;
});

pauseBtn.addEventListener("click", () => {
  if (!slide.classList.contains("playing")) return;

  if (isPaused) {
    video.play();
    slide.classList.remove("paused");
    isPaused = false;
  } else {
    video.pause();
    slide.classList.add("paused");
    isPaused = true;
  }
});

stopBtn.addEventListener("click", () => {
  video.pause();
  video.currentTime = 0;

  videoSource.src = "";
  video.load();

  slide.classList.remove("playing", "paused", "play-ready");

  cds.forEach(cd => cd.classList.remove("active"));

  currentVideo = null;
  isPaused = false;

  console.log("Projector reset");
  screenHint.textContent = "NO MEDIA INSERTED";
  projectorCD.style.backgroundImage = "";

});

video.addEventListener("timeupdate", () => {
  const m = Math.floor(video.currentTime / 60);
  const s = Math.floor(video.currentTime % 60);
  timeLabel.textContent =
    `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
});

stopBtn.addEventListener("click", () => {

  video.pause();
  video.currentTime = 0;
  videoSource.src = "";
  video.load();
  slide.classList.remove("playing", "paused", "play-ready");
  cds.forEach(cd => cd.classList.remove("active"));
  currentVideo = "";
  console.log("Projector reset");
});

video.addEventListener("ended", () => {
  slide.classList.remove("playing");
});

if (s4Next) {
  s4Next.addEventListener("click", () => {

    slide4.classList.add("s4-fade-out");

    setTimeout(() => {
      slide5.scrollIntoView({
        behavior: "smooth"
      });

      setTimeout(() => {
        slide4.classList.remove("s4-fade-out");
      }, 1200);

    }, 600);
  });
}


})();

/* ================= SLIDE 5 : CELESTIAL LEDGER ================= */
(function slide5Ledger() {

const book = document.querySelector("#s5-book");
const pages = document.querySelectorAll("#s5-book .page");
const students = document.querySelectorAll('.s5-student, .s5-wali');
const overlay = document.getElementById('biodata-overlay');
const closeBtn = document.querySelector('.bio-close');
const bioName = document.getElementById('bio-name');
const bioImg = document.getElementById('bio-img');
const bioDesc = document.getElementById('bio-desc');
const bioRole = document.getElementById('bio-role');


let currentPage = 0;
let isAnimating = false;

function updateZIndex() {
  pages.forEach((page, i) => {
    page.style.zIndex = pages.length - i;
  });
}

updateZIndex();

pages.forEach((page, index) => {

  page.addEventListener("click", (e) => {

    if (e.target.closest(".photo")) return;

    if (isAnimating) return;

    isAnimating = true;

    if (!page.classList.contains("flipped")) {

      page.classList.add("flipped");

      setTimeout(() => {
        page.style.zIndex = currentPage + 1;
        currentPage++;
        isAnimating = false;
      }, 200);

    }
    else {

      page.classList.remove("flipped");

      setTimeout(() => {
        currentPage--;
        page.style.zIndex = pages.length - currentPage;
        isAnimating = false;
      }, 200);

    }
    
  });

});


students.forEach(person => {
  person.addEventListener('click', (e) => {
    e.stopPropagation();

    bioName.textContent = person.dataset.name;
    bioImg.src = person.dataset.img;
    bioDesc.textContent = person.dataset.desc;

    if (person.classList.contains("s5-wali")) {
      bioRole.textContent = "Wali Kelas";
      overlay.classList.add("wali-theme");
    } else {
      bioRole.textContent = "Murid";
      overlay.classList.remove("wali-theme");
    }

    overlay.classList.add('active');
  });
});

closeBtn.addEventListener('click', () => {
  overlay.classList.remove('active');
});

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});
const s5LastTrigger = document.getElementById("s5-last-trigger");

s5LastTrigger.addEventListener("click", () => {
  document.getElementById("slide-5-ledger").classList.add("s5-fade-out");

  setTimeout(() => {
    document.getElementById("slide-6-final").scrollIntoView({
      behavior: "smooth"
    });
  }, 800);
});

})();

/* ================= SLIDE 6 : Final Slide ================= */
(function () {

  const trigger = document.getElementById("s6-trigger");
  const flash = document.querySelector("#slide-6-final .s6-flash");

  if (!trigger || !flash) return;

  trigger.addEventListener("click", function(e) {

    e.preventDefault();

    flash.classList.add("active");
    setTimeout(() => {
      window.location.assign("End.html");
    }, 700);

  });

})();

/* ================= BGM SYSTEM ================= */

const bgMusic = document.getElementById("bg-music");
const toggleBtn = document.getElementById("music-toggle");

let musicPlaying = false;

// autoplay setelah user klik halaman

toggleBtn.addEventListener("click", () => {

  if (bgMusic.paused) {
    bgMusic.play();
    toggleBtn.textContent = "🔊";
  } else {
    bgMusic.pause();
    toggleBtn.textContent = "🔇";
  }

});



