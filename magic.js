/* ==========================================================================
   Sana 終極微笑之書 - 核心魔法動效 (宇宙無敵大融合版)
   ========================================================================== */

let sakuraInterval = null;
let starInterval = null;
let currentTheme = 'light';
let isMusicPlaying = false;
let countdownTimerInterval = null; // 倒數計時器計時器

const sanaProfileData = `
    <h4 class="profile-title">🔮 湊崎紗夏 (Sana) 終極檔案</h4>
    <div class="profile-grid">
        <div class="profile-label">本名</div><div>湊崎 紗夏 (Minatozaki Sana)</div>
        <div class="profile-label">生日</div><div>1996 年 12 月 29 日 (摩羯座)</div>
        <div class="profile-label">出生地</div><div>日本大阪府大阪市天王寺區</div>
        <div class="profile-label">血型</div><div>B 型</div>
        <div class="profile-label">特點</div><div>極度溫柔、開朗熱情、充滿元氣、天生的撒嬌女王、工作時極度自律與敬業。</div>
        <div class="profile-label">座右銘</div><div>「總是看著前方！」(Always look forward)</div>
    </div>
`;

const albumDatabase = {
    osaka: { title: "大阪時光相簿", imgs: ["images/sana-smile.jpg", "images/sana-smile.jpg", "images/sana-smile.jpg"] },
    trainee: { title: "練習生孤獨與汗水", imgs: ["images/sana-smile.jpg", "images/sana-smile.jpg"] },
    sixteen: { title: "SIXTEEN 綻放時刻", imgs: ["images/sana-smile.jpg", "images/sana-smile.jpg", "images/sana-smile.jpg", "images/sana-smile.jpg"] },
    twice: { title: "TWICE 全球巔峰巨星", imgs: ["images/sana-smile.jpg", "images/sana-smile.jpg", "images/sana-smile.jpg"] },
    once: { title: "與 ONCE 的不滅羈絆", imgs: ["images/sana-smile.jpg", "images/sana-smile.jpg"] }
};

document.addEventListener('DOMContentLoaded', () => {
    const smileCard = document.querySelector('.smile-card');
    const magicIntro = document.querySelector('.magic-intro');
    const themeBtn = document.getElementById('magicThemeBtn');
    const magicEnvelope = document.getElementById('magicEnvelope');
    const magicScroll = document.getElementById('magicScroll');
    const magicModal = document.getElementById('magicModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalDynamicContent = document.getElementById('modalDynamicContent');
    const profileBtn = document.getElementById('profileBtn');
    const submitCommentBtn = document.getElementById('submitCommentBtn');
    const commenterName = document.getElementById('commenterName');
    const commentText = document.getElementById('commentText');

    // 音樂盒控制元件
    const magicMusicBox = document.getElementById('magicMusicBox');
    const musicToggleBtn = document.getElementById('musicToggleBtn');
    const audioSpring = document.getElementById('audioSpring');
    const audioMidnight = document.getElementById('audioMidnight');

    loadComments();

    // 1. 解鎖大門
    smileCard.addEventListener('click', (e) => {
        createSparkParticles(e.clientX, e.clientY);
        magicIntro.style.opacity = '0';
        magicIntro.style.transform = 'scale(1.1)';
        setTimeout(() => {
            magicIntro.style.display = 'none';
            document.body.style.overflow = 'auto';
            document.querySelector('.magic-content-wrapper').classList.add('fade-in');

            // 音樂盒平滑現形
            magicMusicBox.style.display = 'flex';
            setTimeout(() => { magicMusicBox.style.opacity = '1'; magicMusicBox.style.pointerEvents = 'auto'; }, 50);

            startSakuraRain();
            initScrollReveal();
            startBirthdayCountdown(); // 【進化3】：啟動生日倒數計時器
        }, 1500);
    });

    // 2. 雙色系切換
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const btnIcon = themeBtn.querySelector('.btn-icon');
        const btnText = themeBtn.querySelector('.btn-text');

        if (currentTheme === 'light') {
            currentTheme = 'dark';
            btnIcon.textContent = '🔮'; btnText.textContent = '切換：星夜魔法';
            stopSakuraRain(); startStarRain();

            if (isMusicPlaying) {
                audioSpring.pause();
                audioMidnight.play();
            }
        } else {
            currentTheme = 'light';
            btnIcon.textContent = '🌸'; btnText.textContent = '切換：春日仙境';
            stopStarRain(); startSakuraRain();

            if (isMusicPlaying) {
                audioMidnight.pause();
                audioSpring.play();
            }
        }
    });

    // 3. 音樂盒點擊邏輯
    musicToggleBtn.addEventListener('click', () => {
        const musicIcon = musicToggleBtn.querySelector('.music-icon');

        if (!isMusicPlaying) {
            isMusicPlaying = true;
            musicToggleBtn.classList.add('playing');
            musicIcon.textContent = '⏸';

            if (currentTheme === 'light') { audioSpring.play(); } else { audioMidnight.play(); }
        } else {
            isMusicPlaying = false;
            musicToggleBtn.classList.remove('playing');
            musicIcon.textContent = '🎵';
            audioSpring.pause();
            audioMidnight.pause();
        }
    });

    // 4. 開啟終極情書
    magicEnvelope.addEventListener('click', (e) => {
        createSparkParticles(e.clientX, e.clientY);
        magicEnvelope.style.transform = 'scale(0.8)';
        magicEnvelope.style.opacity = '0';
        setTimeout(() => {
            magicEnvelope.style.display = 'none';
            magicScroll.classList.add('open');
            magicScroll.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 600);
    });

    // 5. 檔案視窗
    profileBtn.addEventListener('click', () => {
        modalDynamicContent.innerHTML = sanaProfileData;
        magicModal.classList.add('active');
    });

    // 6. 相簿視窗
    document.querySelectorAll('.magic-photo-frame').forEach(frame => {
        frame.addEventListener('click', () => {
            const albumKey = frame.getAttribute('data-album');
            const data = albumDatabase[albumKey];
            if (data) {
                let galleryHTML = `<h4 class="album-title">📸 ${data.title}</h4><div class="modal-gallery-grid">`;
                data.imgs.forEach(src => { galleryHTML += `<img src="${src}" alt="Sana Memory">`; });
                galleryHTML += `</div>`;
                modalDynamicContent.innerHTML = galleryHTML;
                magicModal.classList.add('active');
            }
        });
    });

    modalCloseBtn.addEventListener('click', () => { magicModal.classList.remove('active'); });
    document.querySelector('.modal-bg-overlay').addEventListener('click', () => { magicModal.classList.remove('active'); });

    // 7. 留言板
    submitCommentBtn.addEventListener('click', () => {
        const name = commenterName.value.trim(); const text = commentText.value.trim();
        if (!name || !text) { alert('請填寫名字和留言內容喔！🌸'); return; }
        const timestamp = new Date().toLocaleString(); const newComment = { name, text, time: timestamp };
        let comments = JSON.parse(localStorage.getItem('sana_comments')) || [];
        comments.unshift(newComment); localStorage.setItem('sana_comments', JSON.stringify(comments));
        commenterName.value = ''; commentText.value = ''; loadComments();
    });
});

/* ==========================================================================
   核心輔助函數 (粒子、氣候、留言板、滾動立體浮現)
   ========================================================================== */
function loadComments() {
    const display = document.getElementById('commentsDisplay'); if (!display) return;
    let comments = JSON.parse(localStorage.getItem('sana_comments')) || [];
    if (comments.length === 0) {
        display.innerHTML = `<p style="text-align:center; opacity:0.6; font-style:italic;">目前還沒有人留言，快來當第一個留下祝福的人吧✨</p>`; return;
    }
    let html = '';
    comments.forEach(c => {
        html += `<div class="single-comment"><div class="comment-meta"><span class="commenter-name">👤 ${escapeHTML(c.name)}</span><span class="comment-time">⏰ ${c.time}</span></div><div class="comment-body">${escapeHTML(c.text)}</div></div>`;
    });
    display.innerHTML = html;
}
function escapeHTML(str) { return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }

function createSparkParticles(startX, startY) {
    const particleCount = 40;
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div'); particle.className = 'magic-particle'; document.body.appendChild(particle);
        particle.style.left = `${startX}px`; particle.style.top = `${startY}px`;
        const angle = Math.random() * Math.PI * 2; const velocity = Math.random() * 120 + 40;
        const destinationX = Math.cos(angle) * velocity; const destinationY = Math.sin(angle) * velocity;
        const size = Math.random() * 6 + 4; particle.style.width = `${size}px`; particle.style.height = `${size}px`;
        particle.style.setProperty('--x', `${destinationX}px`); particle.style.setProperty('--y', `${destinationY}px`);
        particle.style.animation = 'sparkFly 1.2s cubic-bezier(0.1, 0.8, 0.3, 1) forwards';
        setTimeout(() => { particle.remove(); }, 1200);
    }
}

function startSakuraRain() {
    if (sakuraInterval) return;
    sakuraInterval = setInterval(() => {
        const petal = document.createElement('div'); petal.className = 'sakura-petal'; document.body.appendChild(petal);
        const randomLeft = Math.random() * window.innerWidth; const randomScale = Math.random() * 0.6 + 0.4; const randomDuration = Math.random() * 5 + 4;
        petal.style.left = `${randomLeft}px`; petal.style.transform = `scale(${randomScale})`; petal.style.animation = `petalFall ${randomDuration}s linear forwards`;
        setTimeout(() => { petal.remove(); }, randomDuration * 1000);
    }, 300);
}
function stopSakuraRain() {
    clearInterval(sakuraInterval); sakuraInterval = null;
    document.querySelectorAll('.sakura-petal').forEach(p => { p.style.transition = 'opacity 1s ease'; p.style.opacity = '0'; setTimeout(() => { p.remove(); }, 1000); });
}

function startStarRain() {
    if (starInterval) return;
    starInterval = setInterval(() => {
        const star = document.createElement('div'); star.className = 'star-particle'; document.body.appendChild(star);
        const randomLeft = Math.random() * (window.innerWidth + 200); const randomDuration = Math.random() * 3 + 2;
        star.style.left = `${randomLeft}px`; star.style.animation = `starFall ${randomDuration}s cubic-bezier(0.25, 1, 0.5, 1) forwards`;
        setTimeout(() => { star.remove(); }, randomDuration * 1000);
    }, 150);
}
function stopStarRain() { clearInterval(starInterval); starInterval = null; document.querySelectorAll('.star-particle').forEach(s => { s.remove(); }); }

function initScrollReveal() {
    const revealTargets = document.querySelectorAll('.story-chapter, .quotes-section, .guestbook-section, .magic-countdown-container');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: "0px 0px -50px 0px" });
    revealTargets.forEach(target => { observer.observe(target); });
}

/* ==========================================================================
   【全新高階進化3】：Sana 的魔法生日倒數鐘引擎
   ========================================================================== */
function startBirthdayCountdown() {
    const dDays = document.getElementById('countdownDays');
    const dHours = document.getElementById('countdownHours');
    const dMins = document.getElementById('countdownMinutes');
    const dSecs = document.getElementById('countdownSeconds');

    if (!dDays) return; // 如果網頁上還沒有 HTML 容器則跳出

    function updateClock() {
        const now = new Date();
        let currentYear = now.getFullYear();
        // 設定下一次生日的時間點（12 月 29 日）
        let nextBirthday = new Date(currentYear, 11, 29, 0, 0, 0);

        // 如果今年的生日已經過了，自動將目標跳向明年的生日！
        if (now > nextBirthday) {
            nextBirthday = new Date(currentYear + 1, 11, 29, 0, 0, 0);
        }

        const timeDifference = nextBirthday - now; // 剩餘毫秒數

        // 精密時間常數換算
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // 動態注入網頁，並自動幫個位數補 0（例如 5 秒變成 05 秒，追求細節完美）
        dDays.textContent = days;
        dHours.textContent = hours.toString().padStart(2, '0');
        dMins.textContent = minutes.toString().padStart(2, '0');
        dSecs.textContent = seconds.toString().padStart(2, '0');

        // 如果剛好倒數到 0 (生日當天！)
        if (timeDifference <= 0) {
            clearInterval(countdownTimerInterval);
            document.querySelector('.countdown-label').textContent = "🌸 🎉 祝我們最愛的精靈 Sana 生日快樂！！！ 🎉 🌸";
        }
    }

    // 立刻執行一次防止初始畫面空白，接著每 1 秒精確更新一次
    updateClock();
    countdownTimerInterval = setInterval(updateClock, 1000);
}