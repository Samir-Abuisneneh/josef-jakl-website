// ---------------------------------------------------------------
// EDIT ME: fill in the real content below, then everything on the
// page (track list, video player, contact links) updates itself.
// ---------------------------------------------------------------

// The 15 music videos from the DVD.
// videoFile: path to a local file in assets/videos, OR
// youtubeId: the part of a YouTube URL after "v=" (e.g. "dQw4w9WgXcQ").
// Leave both empty until the video is ready.
const TRACKS = [
  { title: "Barvy", videoFile: "assets/videos/Barvy.mp4" },
  { title: "Cesta za štěstím", videoFile: "assets/videos/Cesta za štěstím.mp4" },
  { title: "Chtěl bych se stát strojem", videoFile: "assets/videos/Chtěl bych se stát strojem.mp4" },
  { title: "Dobré slovo", videoFile: "assets/videos/Dobré slovo.mp4" },
  { title: "Hračkářský krám", videoFile: "assets/videos/Hračkářský krám.mp4" },
  { title: "Mít oči na koukání", videoFile: "assets/videos/Mít oči na koukání.mp4" },
  { title: "Nejhezčí představení", videoFile: "assets/videos/Nejhezčí představení.mp4" },
  { title: "O lidech", videoFile: "assets/videos/O lidech.mp4" },
  { title: "Patnáctiletá", videoFile: "assets/videos/Patnáctiletá.mp4" },
  { title: "Pískoviště", videoFile: "assets/videos/Pískoviště.mp4" },
  { title: "Písnička o Praze", videoFile: "assets/videos/Písnička o Praze.mp4" },
  { title: "Ráno", videoFile: "assets/videos/Ráno.mp4" },
  { title: "Svět na chodníku", videoFile: "assets/videos/Svět na chodníku.mp4" },
  { title: "Věčně zelená", videoFile: "assets/videos/Věčně zelená.mp4" },
  { title: "Zvony", videoFile: "assets/videos/Zvony.mp4" },
];

const CONTACT = {
  phone: "+420 723 667 646",
  email: "jaklkovo@tiscali.cz",
  facebookUrl: "https://www.facebook.com/share/18GeaeBQPc/",
  youtubeUrl: "https://youtu.be/KB7l2i5gRIE", // no dedicated channel yet — links to a TV rerun instead
};

// Extra performance clips filmed by TV Šlágr, not part of the DVD.
// Credited to TV Šlágr regardless of which channel currently hosts the upload.
// Click plays them right here on the page, in the same screen as the tracks.
const TV_CLIPS = [
  { title: "O lidech", source: "TV Šlágr", youtubeId: "KB7l2i5gRIE" },
  { title: "Josef Jakl a Iva Kubíčková — Závod", source: "TV Šlágr", youtubeId: "nZ01qt47G_Q" },
  { title: "Letní vítr", source: "TV Šlágr", youtubeId: "e4qRZkLAkCw" },
  { title: "Přátelství", source: "TV Šlágr", youtubeId: "je7Cd4JlebY" },
  { title: "Cesta za štěstím", source: "TV Šlágr", youtubeId: "8EpHMpHLyXc" },
  { title: "Internet", source: "TV Šlágr", youtubeId: "fYpFjRzQHJA" },
  { title: "Básník", source: "Josef Jakl a Luděk Černý", playlistId: "OLAK5uy_mnWUDqeVKzP-fOOKRl9PRuBt3bcw30VKE" },
];

// ---------------------------------------------------------------

function buildTrackList() {
  const list = document.getElementById("trackList");
  TRACKS.forEach((track, index) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "track-row";
    button.dataset.index = String(index);
    button.setAttribute("aria-pressed", "false");

    const num = document.createElement("span");
    num.className = "track-num";
    num.textContent = String(index + 1).padStart(2, "0");

    const title = document.createElement("span");
    title.className = "track-title";
    title.textContent = track.title;

    button.append(num, title);
    button.addEventListener("click", () => playTrack(index, button));
    li.appendChild(button);
    list.appendChild(li);
  });
}

// Renders a track/clip/playlist into the shared screen. Any one item
// (DVD track, TV clip, or album) can be the active, playing thing.
function renderIntoScreen({ videoFile, youtubeId, playlistId, title }) {
  const placeholder = document.getElementById("screenPlaceholder");
  const embed = document.getElementById("videoEmbed");
  const noVideo = document.getElementById("noVideo");

  placeholder.hidden = true;

  if (videoFile) {
    embed.hidden = false;
    noVideo.hidden = true;
    embed.innerHTML = "";
    const video = document.createElement("video");
    video.src = videoFile;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("title", title);
    embed.appendChild(video);
  } else if (youtubeId) {
    embed.hidden = false;
    noVideo.hidden = true;
    embed.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(youtubeId)}?autoplay=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else if (playlistId) {
    embed.hidden = false;
    noVideo.hidden = true;
    embed.innerHTML = `<iframe src="https://www.youtube.com/embed/videoseries?list=${encodeURIComponent(playlistId)}&autoplay=1" title="${title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    embed.hidden = true;
    embed.innerHTML = "";
    noVideo.hidden = false;
  }
}

function setActiveButton(activeEl) {
  document.querySelectorAll(".track-row, .tv-clip-btn").forEach((el) => {
    const isActive = el === activeEl;
    el.classList.toggle("active", isActive);
    el.setAttribute("aria-pressed", String(isActive));
  });
}

function playTrack(index, buttonEl) {
  const track = TRACKS[index];
  setActiveButton(buttonEl);
  renderIntoScreen(track);
  document.getElementById("screenCaption").textContent =
    `— ${String(index + 1).padStart(2, "0")} · ${track.title} —`;
}

function playClip(clip, buttonEl) {
  setActiveButton(buttonEl);
  renderIntoScreen(clip);
  document.getElementById("screenCaption").textContent = `— ${clip.title} · ${clip.source} —`;
  document.getElementById("screen").scrollIntoView({ behavior: "smooth", block: "center" });
}

function buildTvClips() {
  const list = document.getElementById("tvClips");
  TV_CLIPS.forEach((clip) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tv-clip-btn";
    button.setAttribute("aria-pressed", "false");
    button.innerHTML = `${clip.title} <span class="tv-clip-source">— ${clip.source}</span>`;
    button.addEventListener("click", () => playClip(clip, button));
    li.appendChild(button);
    list.appendChild(li);
  });
}

function wireContact() {
  if (CONTACT.phone) {
    document.getElementById("phoneValue").textContent = CONTACT.phone;
    document.getElementById("phoneLink").href = `tel:${CONTACT.phone.replace(/\s+/g, "")}`;
  }
  if (CONTACT.email) {
    document.getElementById("emailValue").textContent = CONTACT.email;
    document.getElementById("emailLink").href = `mailto:${CONTACT.email}`;
  }
  if (CONTACT.facebookUrl) {
    document.getElementById("facebookLink").href = CONTACT.facebookUrl;
  }
  if (CONTACT.youtubeUrl) {
    document.getElementById("youtubeLink").href = CONTACT.youtubeUrl;
  }
}

function wireNav() {
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("primaryNav");
  toggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

function wireLightbox() {
  const photoButtons = Array.from(document.querySelectorAll(".photo-slot.photo-real"));
  if (photoButtons.length === 0) return;

  const photos = photoButtons.map((btn) => {
    const img = btn.querySelector("img");
    return { src: img.src, alt: img.alt };
  });

  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");
  const counter = document.getElementById("lightboxCounter");
  let currentIndex = 0;
  let lastFocused = null;

  function show(index) {
    currentIndex = (index + photos.length) % photos.length;
    const photo = photos[currentIndex];
    lightboxImg.src = photo.src;
    lightboxImg.alt = photo.alt;
    counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  function open(index) {
    lastFocused = document.activeElement;
    show(index);
    lightbox.hidden = false;
    document.body.style.overflow = "hidden";
    document.getElementById("lightboxClose").focus();
  }

  function close() {
    lightbox.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused) lastFocused.focus();
  }

  photoButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => open(index));
  });

  document.getElementById("lightboxClose").addEventListener("click", close);
  document.getElementById("lightboxNext").addEventListener("click", () => show(currentIndex + 1));
  document.getElementById("lightboxPrev").addEventListener("click", () => show(currentIndex - 1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  document.addEventListener("keydown", (event) => {
    if (lightbox.hidden) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowRight") show(currentIndex + 1);
    if (event.key === "ArrowLeft") show(currentIndex - 1);
  });
}

function wireReveal() {
  const targets = document.querySelectorAll(".section");
  targets.forEach((el) => el.classList.add("reveal"));

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    targets.forEach((el) => el.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((el) => observer.observe(el));
}

document.getElementById("year").textContent = String(new Date().getFullYear());

buildTrackList();
buildTvClips();
wireContact();
wireNav();
wireLightbox();
wireReveal();
