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
  facebookUrl: "",   // e.g. "https://facebook.com/josefjakl"
  youtubeUrl: "https://youtu.be/KB7l2i5gRIE", // no dedicated channel yet — links to a TV rerun instead
};

// Extra performance clips filmed by TV Šlágr, not part of the DVD.
// Credited to TV Šlágr regardless of which channel currently hosts the upload.
const TV_CLIPS = [
  { title: "O lidech", source: "TV Šlágr", url: "https://youtu.be/KB7l2i5gRIE" },
  { title: "Josef Jakl a Iva Kubíčková — Závod", source: "TV Šlágr", url: "https://youtu.be/nZ01qt47G_Q" },
  { title: "Letní vítr", source: "TV Šlágr", url: "https://youtu.be/e4qRZkLAkCw" },
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
    button.addEventListener("click", () => playTrack(index));
    li.appendChild(button);
    list.appendChild(li);
  });
}

function playTrack(index) {
  const track = TRACKS[index];
  const placeholder = document.getElementById("screenPlaceholder");
  const embed = document.getElementById("videoEmbed");
  const noVideo = document.getElementById("noVideo");
  const caption = document.getElementById("screenCaption");

  document.querySelectorAll(".track-row").forEach((row) => {
    const isActive = Number(row.dataset.index) === index;
    row.classList.toggle("active", isActive);
    row.setAttribute("aria-pressed", String(isActive));
  });

  placeholder.hidden = true;

  if (track.videoFile) {
    embed.hidden = false;
    noVideo.hidden = true;
    embed.innerHTML = "";
    const video = document.createElement("video");
    video.src = track.videoFile;
    video.controls = true;
    video.autoplay = true;
    video.playsInline = true;
    video.setAttribute("title", track.title);
    embed.appendChild(video);
  } else if (track.youtubeId) {
    embed.hidden = false;
    noVideo.hidden = true;
    embed.innerHTML = `<iframe src="https://www.youtube.com/embed/${encodeURIComponent(track.youtubeId)}?autoplay=1" title="${track.title}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    embed.hidden = true;
    embed.innerHTML = "";
    noVideo.hidden = false;
  }

  caption.textContent = `— ${String(index + 1).padStart(2, "0")} · ${track.title} —`;
}

function buildTvClips() {
  const list = document.getElementById("tvClips");
  TV_CLIPS.forEach((clip) => {
    const li = document.createElement("li");
    const link = document.createElement("a");
    link.href = clip.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.innerHTML = `${clip.title} <span class="tv-clip-source">— ${clip.source}</span>`;
    li.appendChild(link);
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
wireReveal();
