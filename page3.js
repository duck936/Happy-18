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

// لعبة السرعة
function startReactionGame() {
    // إنشاء عنصر للعبة السرعة
    const reactionGame = document.createElement('div');
    reactionGame.id = 'reaction-game';
    reactionGame.style.position = 'relative';
    reactionGame.style.width = '100%';
    reactionGame.style.height = '300px';
    reactionGame.style.backgroundColor = '#f0f0f0';
    reactionGame.style.borderRadius = '10px';
    reactionGame.style.margin = '20px auto';
    document.body.appendChild(reactionGame);

    let startTime;
    let timeoutId;

    // بدء اللعبة
    function startRound() {
        // إخفاء الشكل القديم لو موجود
        const oldShape = document.querySelector('.shape');
        if (oldShape) oldShape.remove();

        // إنشاء شكل جديد (دائرة أو مربع)
        const shape = document.createElement('div');
        shape.classList.add('shape');
        shape.style.width = '50px';
        shape.style.height = '50px';
        shape.style.backgroundColor = '#8a2be2';
        shape.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        shape.style.position = 'absolute';
        shape.style.top = `${Math.random() * 250}px`;
        shape.style.left = `${Math.random() * (window.innerWidth - 100)}px`;
        shape.style.cursor = 'pointer';
        reactionGame.appendChild(shape);

        // بدء قياس الوقت
        startTime = new Date().getTime();

        // إضافة حدث الضغط على الشكل
        shape.addEventListener('click', () => {
            const endTime = new Date().getTime();
            const reactionTime = (endTime - startTime) / 1000; // الوقت بالثواني
            if (reactionTime < 1) {
                alert(`سرعة رهيبة! وقت رد فعلك: ${reactionTime.toFixed(2)} ثانية.`);
                keysCollected++;
                document.getElementById('key-count').textContent = keysCollected;
                checkKeys();
                reactionGame.remove(); // إزالة اللعبة بعد الانتهاء
            } else {
                alert(`حاول تاني! وقت رد فعلك: ${reactionTime.toFixed(2)} ثانية.`);
                startRound(); // إعادة اللعبة
            }
        });

        // إنهاء الجولة بعد 3 ثواني لو المستخدم ما داسش
        timeoutId = setTimeout(() => {
            alert("للأسف، الوقت خلص!");
            startRound(); // إعادة اللعبة
        }, 3000);
    }

    // بدء الجولة الأولى
    startRound();
}
