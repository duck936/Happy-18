// إرسال الأمنية على الجيميل
document.getElementById('send-wish').addEventListener('click', () => {
    const wish = document.getElementById('wish-input').value;
    if (wish) {
        // هنا كود إرسال الأمنية على الجيميل باستخدام EmailJS
        alert("تم إرسال أمنيتك! أن شاء الله تتحقق.");
        document.getElementById('wish-input').value = "";
    } else {
        alert("اكتب أمنية قبل الإرسال!");
    }
});

// الانتقال للصفحة التالتة
document.getElementById('next-page-button').addEventListener('click', () => {
    window.location.href = 'page3.html';
});
