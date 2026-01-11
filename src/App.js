import { useEffect, useState } from "react";
import "./styles.css";

const PASSWORD = "protik+arpa";

export default function App() {
  const [authorized, setAuthorized] = useState(false);
  const [input, setInput] = useState("");
  const [page, setPage] = useState("home");
  const [musicOn, setMusicOn] = useState(true);
  const toggleMusic = () => {
    const iframe = document.getElementById("yt-player");
    if (!iframe) return;

    iframe.contentWindow.postMessage(
      JSON.stringify({
        event: "command",
        func: musicOn ? "mute" : "unMute",
        args: [],
      }),
      "*"
    );

    setMusicOn(!musicOn);
  };

  const startDate = new Date("2025-04-11T00:00:00");
  const now = new Date();

  const [timeTogether, setTimeTogether] = useState({
    days: 0,
    hours: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const current = new Date();
      const diff = current - startDate;
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      setTimeTogether({ days, hours });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  /* 🗓️ SPECIAL DATES LOGIC */

  // 9 months completion (April 11 → January 11)
  const nineMonthDate = new Date("2026-01-11T00:00:00");
  const showNineMonth =
    now >= nineMonthDate && now <= new Date("2026-01-12T23:59:59");

  // First anniversary (April 12)
  const firstAnniversaryDate = new Date("2026-04-12T00:00:00");
  const isFirstAnniversary =
    now.toDateString() === firstAnniversaryDate.toDateString();

  /* 🔒 PASSWORD SCREEN */
  if (!authorized) {
    return (
      <div className="container">
        <h1>Private Space 🔒</h1>
        <p>Only for Protik & Arpa</p>

        <input
          type="password"
          placeholder="Enter password"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <br />

        <button
          onClick={() => {
            if (input === PASSWORD) setAuthorized(true);
            else alert("Wrong password");
          }}
        >
          Enter
        </button>
      </div>
    );
  }

  /* ❤️ MAIN WEBSITE */
  return (
    <div className="container">
      {/* 🎵 Background Music */}
      <iframe
        id="yt-player"
        width="0"
        height="0"
        src="https://www.youtube.com/embed/rOUuGvJkBrQ?autoplay=1&loop=1&playlist=rOUuGvJkBrQ&enablejsapi=1"
        frameBorder="0"
        allow="autoplay"
        title="background-music"
      />

      <nav className="nav">
        <button onClick={() => setPage("home")}>Home</button>
        <button onClick={() => setPage("timeline")}>Timeline</button>
        <button onClick={() => setPage("letter")}>Love Letter</button>
        <button onClick={() => setPage("recap")}>Yearly Recap</button>
        <button onClick={() => setPage("goals")}>Future Goals</button>
        <button onClick={toggleMusic}>
          {musicOn ? "⏸ Stop Music" : "▶ Play Music"}
        </button>
      </nav>

      {/* 🏠 HOME */}
      {page === "home" && (
        <>
          <h1>Protik ❤️ Arpa</h1>
          <p>Together since April 11, 2025</p>

          <div className="card">
            <h2>{timeTogether.days} days</h2>
            <p>{timeTogether.hours} hours</p>
          </div>

          {showNineMonth && (
            <div className="card">
              <h2>💖 9 Months Complete</h2>
              <p>Today we complete 9 beautiful months together</p>
            </div>
          )}
        </>
      )}

      {/* 🧭 TIMELINE */}
      {page === "timeline" && (
        <section>
          <h2>Our Timeline</h2>
          <ul className="timeline">
            <li>
              💬 <b>April 11, 2025</b> — Our first long conversation
            </li>
            <li>
              💍 <b>April 11, 2025 · 1:00 AM</b> — Protik proposed to Arpa
            </li>
            <li>
              🤍 <b>April 11, 2025</b> — We met for the first time
            </li>
          </ul>
        </section>
      )}

      {/* 💌 LOVE LETTER */}
      {page === "letter" && (
        <section>
          <h2>Love Letter</h2>
          <p className="letter">
            Dear Arpa,
            <br />
            <br />
            প্রিয় আর্পা, ১১ই এপ্রিল, ২০২৫ — এই তারিখটা শুধু একটা দিন না, এই
            দিনটাই আমার জীবনের সবচেয়ে সুন্দর শুরু। সেই প্রথম লম্বা কথা বলা, রাত
            ১টার সময় তোমাকে নিজের মনের কথা বলা, আর একই দিনে তোমার সামনে প্রথমবার
            দাঁড়িয়ে থাকা — সবকিছু যেন স্বপ্নের মতো ছিল। তুমি আমার জীবনে আসার পর
            সবকিছু একটু বেশি শান্ত, একটু বেশি সুন্দর, আর অনেক বেশি অর্থপূর্ণ হয়ে
            গেছে। তোমার হাসি আমার ক্লান্তি দূর করে, তোমার কণ্ঠ আমার অস্থিরতা
            থামিয়ে দেয়। তোমার হাতটা ধরে থাকলে ভবিষ্যৎ নিয়ে কোনো ভয় আর থাকে না।
            এই ওয়েবসাইটটা শুধু কোড না, এটা আমাদের স্মৃতি, আমাদের ভালোবাসা, আর
            আমাদের ভবিষ্যতের প্রতি একটা নীরব প্রতিশ্রুতি। আজ, কাল, আর যত দিন
            আসবে — আমি তোমার পাশেই থাকতে চাই, একইভাবে, একই ভালোবাসায়। ভালোবাসি
            তোমাকে, আজ, আগামীকাল, সবসময়। — ❤️
            <br />
            <br />— Protik ❤️
          </p>
        </section>
      )}

      {/* 📅 YEARLY RECAP */}
      {page === "recap" && (
        <section>
          <h2>Yearly Recap</h2>
          <p>2025 — The year our forever started ✨</p>
          {page === "recap" && (
            <section>
              <h2>Yearly Recap</h2>
              <p>2025 — The year our forever started ✨</p>

              <div className="memory-box">
                <video
                  src="/memory.mp4"
                  controls
                  autoPlay
                  loop
                  muted
                  className="memory-video"
                />
              </div>

              <p style={{ marginTop: "15px", color: "#aaa" }}>
                A moment we lived, now a memory forever 🤍
              </p>
            </section>
          )}

          {isFirstAnniversary && (
            <div className="card">
              <h2>🎉 First Anniversary</h2>
              <p>April 12 — One year of us ❤️</p>
            </div>
          )}
        </section>
      )}

      {/* 🌱 FUTURE GOALS */}
      {page === "goals" && (
        <section>
          <h2>Future Goals</h2>
          <ul>
            <li>🌍 Travel together</li>
            <li>🏡 Build a home</li>
            <li>💍 Forever</li>
          </ul>
        </section>
      )}

      <footer>Private website for Protik & Arpa</footer>
    </div>
  );
}
