// Edit these two values before going live.
const CONFIG = {
  // Checkout link from Bandcamp, Gumroad, Stripe Payment Links, etc.
  // These services take the payment and deliver the download to the buyer.
  checkoutUrl: "https://example.com/your-checkout-link",
  price: "$10",
};

const audio = document.getElementById("audio");
const button = document.getElementById("play");
const status = document.getElementById("status");
const buyLink = document.getElementById("buy-link");

buyLink.href = CONFIG.checkoutUrl;
document.getElementById("price").textContent = CONFIG.price;

function setPlaying(playing) {
  button.classList.toggle("is-playing", playing);
  button.setAttribute("aria-label", playing ? "Pause" : "Play");
  status.textContent = playing ? "pause" : "play";
}

button.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().catch((err) => {
      console.error("Playback failed:", err);
      setPlaying(false);
    });
  } else {
    audio.pause();
  }
});

audio.addEventListener("play", () => setPlaying(true));
audio.addEventListener("pause", () => setPlaying(false));
audio.addEventListener("ended", () => setPlaying(false));
audio.addEventListener("error", () => {
  setPlaying(false);
  button.disabled = true;
  status.textContent = "audio unavailable";
});
