// Typing Effect للكلام
const typedText = document.getElementById('typed-text');
const textArray = [
    "7/1/2007",
    "اليوم الي اتولد فيه اعز واقرب صاحب ليا",
    "احمد رمضان عطيه اخويا وصديقي البيست فريند كل عام وانت بألف خير وكل عام وانت دايما صديقي المقرب"
];
let index = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[index].length) {
        typedText.textContent += textArray[index].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100); // سرعة الكتابة
    } else {
        setTimeout(erase, 2000); // الانتظار قبل المسح
    }
}

function erase() {
    if (charIndex > 0) {
        typedText.textContent = textArray[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50); // سرعة المسح
    } else {
        index++;
        if (index >= textArray.length) {
            index = 0;
            showNextCard();
        } else {
            setTimeout(type, 500); // الانتظار قبل الكتابة التالية
        }
    }
}

// إظهار الكارت التالي
function showNextCard() {
    document.querySelector('.card').classList.add('hidden');
    document.querySelector('.next-card').classList.remove('hidden');
}

// الانتقال للصفحة التانية
document.getElementById('next-button').addEventListener('click', () => {
    window.location.href = 'page2.html';
});

// بدء التأثير
type();
