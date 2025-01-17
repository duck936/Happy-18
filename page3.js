let keysCollected = 0;

// اللعبة الأولى: سؤال وجواب
document.getElementById('game1').addEventListener('click', () => {
    const question = "ما هو لون التفاحة؟";
    const answer = prompt(question);
    if (answer === "أحمر" || answer === "أحمر") {
        alert("صح! لقد ربحت مفتاحًا.");
        keysCollected++;
        document.getElementById('key-count').textContent = keysCollected;
        checkKeys();
    } else {
        alert("للأسف جاوبت غلط، حاول تاني!");
    }
});

// اللعبة التانية والتالتة
document.getElementById('game2').addEventListener('click', () => {
    alert("اللعبة لسه مأكتملتش، بس تقدر تاخد المفتاح.");
    keysCollected++;
    document.getElementById('key-count').textContent = keysCollected;
    checkKeys();
});

document.getElementById('game3').addEventListener('click', () => {
    alert("اللعبة لسه مأكتملتش، بس تقدر تاخد المفتاح.");
    keysCollected++;
    document.getElementById('key-count').textContent = keysCollected;
    checkKeys();
});

// فحص عدد المفاتيح
function checkKeys() {
    if (keysCollected >= 3) {
        document.getElementById('treasure-box').classList.remove('hidden');
    }
}

// فتح الصندوق
document.getElementById('treasure-box').addEventListener('click', () => {
    alert("مبروك كسبت كيكة شوكولاته 🤤");
    window.location.href = 'final.html';
});
