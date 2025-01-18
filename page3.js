let keysCollected = 0;

// اللعبة الأولى: سؤال وجواب
document.getElementById('game1').addEventListener('click', () => {
    if (keysCollected >= 3) {
        showNotification();
        return;
    }
    const question = "إيه هو العمر اللي احتفل بيه النهارده؟";
    const answer = prompt(`${question}\n1. 18\n2. 20\n3. 25`);
    if (answer === "1" || answer === "18") {
        alert("صح! لقد ربحت مفتاحًا.");
        keysCollected++;
        document.getElementById('key-count').textContent = keysCollected;
        checkKeys();
    } else {
        alert("للأسف جاوبت غلط، حاول تاني!");
    }
});

// اللعبة التانية: لعبة الذاكرة
document.getElementById('game2').addEventListener('click', () => {
    if (keysCollected >= 3) {
        showNotification();
        return;
    }
    startMemoryGame();
});

// اللعبة التالتة: لعبة السرعة
document.getElementById('game3').addEventListener('click', () => {
    if (keysCollected >= 3) {
        showNotification();
        return;
    }
    startReactionGame();
});

// إشعار اللعب تاني
function showNotification() {
    const notification = document.getElementById('notification');
    notification.classList.remove('hidden');
    setTimeout(() => {
        notification.classList.add('hidden');
    }, 3000);
}

// فحص عدد المفاتيح
function checkKeys() {
    if (keysCollected >= 3) {
        document.getElementById('treasure-box').classList.add('glow');
    }
}

// فتح الصندوق
document.getElementById('treasure-box').addEventListener('click', () => {
    if (keysCollected < 3) {
        alert("جمع 3 مفاتيح علشان تفتح الصندوق!");
        return;
    }
    const treasureBox = document.getElementById('treasure-box');
    const stickMan = document.getElementById('stick-man');
    treasureBox.classList.add('hidden');
    stickMan.classList.remove('hidden');

    // Stick Man يغني ويقدم الهدية
    setTimeout(() => {
        stickMan.innerHTML = "<p>Hi!</p><p>I heard it's your birthday today.</p>";
        setTimeout(() => {
            stickMan.innerHTML += "<p>🎵 Happy Birthday to you... 🎵</p>";
            setTimeout(() => {
                stickMan.innerHTML += "<p>Take it! 🎁</p>";
                setTimeout(() => {
                    window.location.href = 'final.html';
                }, 3000);
            }, 3000);
        }, 3000);
    }, 1000);
});

// لعبة الذاكرة
function startMemoryGame() {
    // إنشاء عنصر للعبة الذاكرة
    const memoryGame = document.createElement('div');
    memoryGame.id = 'memory-game';
    memoryGame.style.display = 'grid';
    memoryGame.style.gridTemplateColumns = 'repeat(4, 100px)';
    memoryGame.style.gap = '10px';
    memoryGame.style.margin = '20px auto';
    document.body.appendChild(memoryGame);

    // الصور اللي هتستخدم في اللعبة
    const images = ['🎂', '🎁', '🎈', '🎉', '🍰', '🍫', '🍬', '🍭'];
    const cards = [...images, ...images]; // كل صورة تظهر مرتين

    // خلط الكروت
    cards.sort(() => Math.random() - 0.5);

    // إنشاء الكروت
    let flippedCards = [];
    let matchedCards = [];
    cards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.index = index;
        card.textContent = '❓'; // علامة استفهام علشان تخفي الصورة
        card.style.width = '100px';
        card.style.height = '100px';
        card.style.backgroundColor = '#8a2be2';
        card.style.color = 'white';
        card.style.display = 'flex';
        card.style.justifyContent = 'center';
        card.style.alignItems = 'center';
        card.style.fontSize = '2rem';
        card.style.cursor = 'pointer';
        card.style.borderRadius = '10px';
        card.addEventListener('click', () => flipCard(card, emoji));
        memoryGame.appendChild(card);
    });

    // قلب الكروت
    function flipCard(card, emoji) {
        if (flippedCards.length < 2 && !flippedCards.includes(card) && !matchedCards.includes(card)) {
            card.textContent = emoji;
            flippedCards.push(card);

            if (flippedCards.length === 2) {
                setTimeout(checkMatch, 1000);
            }
        }
    }

    // التأكد من تطابق الكروت
    function checkMatch() {
        const [card1, card2] = flippedCards;
        if (card1.textContent === card2.textContent) {
            matchedCards.push(card1, card2);
            if (matchedCards.length === cards.length) {
                alert("مبروك! انت كسبت في لعبة الذاكرة.");
                keysCollected++;
                document.getElementById('key-count').textContent = keysCollected;
                checkKeys();
                memoryGame.remove(); // إزالة اللعبة بعد الانتهاء
            }
        } else {
            card1.textContent = '❓';
            card2.textContent = '❓';
        }
        flippedCards = [];
    }
}

// لعبة الصيد
function startReactionGame() {
    // إنشاء عنصر للعبة
    const reactionGame = document.createElement('div');
    reactionGame.id = 'reaction-game';
    reactionGame.style.position = 'relative';
    reactionGame.style.width = '100%';
    reactionGame.style.height = '300px';
    reactionGame.style.backgroundColor = '#f0f0f0';
    reactionGame.style.borderRadius = '10px';
    reactionGame.style.margin = '20px auto';
    document.body.appendChild(reactionGame);

    // عدد النقرات المطلوبة
    const requiredClicks = 5;
    let clickCount = 0;

    // الوقت المحدد
    const timeLimit = 10; // 10 ثواني
    let timeLeft = timeLimit;

    // إنشاء الإيموجي
    const emoji = document.createElement('div');
    emoji.textContent = '🎁';
    emoji.style.position = 'absolute';
    emoji.style.fontSize = '2rem';
    emoji.style.cursor = 'pointer';
    reactionGame.appendChild(emoji);

    // إنشاء عداد النقرات
    const clickCounter = document.createElement('div');
    clickCounter.textContent = `النقرات: ${clickCount}/${requiredClicks}`;
    clickCounter.style.marginTop = '20px';
    clickCounter.style.fontSize = '1.2rem';
    reactionGame.appendChild(clickCounter);

    // إنشاء عداد الوقت
    const timer = document.createElement('div');
    timer.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;
    timer.style.marginTop = '10px';
    timer.style.fontSize = '1.2rem';
    reactionGame.appendChild(timer);

    // تحريك الإيموجي كل ثانية
    const moveEmoji = setInterval(() => {
        const x = Math.random() * (reactionGame.offsetWidth - 50);
        const y = Math.random() * (reactionGame.offsetHeight - 50);
        emoji.style.left = `${x}px`;
        emoji.style.top = `${y}px`;
    }, 1000);

    // بدء العد التنازلي
    const countdown = setInterval(() => {
        timeLeft--;
        timer.textContent = `الوقت المتبقي: ${timeLeft} ثواني`;

        if (timeLeft <= 0) {
            clearInterval(countdown);
            clearInterval(moveEmoji);
            if (clickCount < requiredClicks) {
                alert("للأسف، الوقت خلص! حاول تاني.");
                reactionGame.remove(); // إزالة اللعبة بعد الانتهاء
            }
        }
    }, 1000);

    // إضافة حدث النقر على الإيموجي
    emoji.addEventListener('click', () => {
        clickCount++;
        clickCounter.textContent = `النقرات: ${clickCount}/${requiredClicks}`;

        if (clickCount >= requiredClicks) {
            clearInterval(countdown);
            clearInterval(moveEmoji);
            alert(`مبروك! انت كسبت في لعبة الصيد.`);
            keysCollected++;
            document.getElementById('key-count').textContent = keysCollected;
            checkKeys();
            reactionGame.remove(); // إزالة اللعبة بعد الانتهاء
        }
    });
                                  }
