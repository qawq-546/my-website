document.addEventListener('DOMContentLoaded', () => {
    const counter = document.getElementById('counter');
    const progress = document.getElementById('progress');
    const counterRing = document.querySelector('.counter-ring');
    const container = document.querySelector('.container');
    let count = 0;
    
    // إنشاء عناصر الصوت المختلفة
    const reachTenSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3'); // صوت مميز للرقم 10
    const resetSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3'); // صوت إعادة التعيين
    const tickSound = new Audio('https://assets.mixkit.co/active_storage/sfx/2570/2570-preview.mp3'); // صوت النقرات العادية
    
    // تحديث العداد
    const updateCounter = () => {
        const oldCount = count;
        count = (count + 1) % 11;
        
        // تشغيل الأصوات المختلفة حسب الرقم
        if (count === 10) {
            // صوت خاص عند الوصول للرقم 10
            reachTenSound.currentTime = 0;
            reachTenSound.play();
            
            // تأثير وميض قوي للعداد
            counter.style.textShadow = '0 0 50px #fff, 0 0 30px #4fc3f7';
            setTimeout(() => {
                counter.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
            }, 800);
            
            // تسريع دوران الحلقات
            counterRing.style.animationDuration = '0.5s';
        } else if (count === 0) {
            // صوت إعادة التعيين
            resetSound.currentTime = 0;
            resetSound.play();
            
            // إعادة تعيين سرعة الدوران
            counterRing.style.animationDuration = '3s';
            
            // إعادة تعيين شريط التقدم بتأثير متحرك
            progress.style.transition = 'width 0.5s ease';
            progress.style.width = '0%';
            
            // تأثير وميض للعداد
            counter.style.textShadow = '0 0 30px #fff';
            setTimeout(() => {
                counter.style.textShadow = '0 0 20px rgba(255, 255, 255, 0.5)';
            }, 500);
        } else {
            // صوت النقرة للأرقام العادية
            tickSound.currentTime = 0;
            tickSound.play();
        }
        
        // تحريك الرقم بشكل متحرك
        animateValue(oldCount, count, 200);
        
        // تحديث شريط التقدم
        updateProgress();
        
        // إضافة تأثير النبض
        counter.classList.remove('animate');
        void counter.offsetWidth;
        counter.classList.add('animate');
    };
    
    // تحديث شريط التقدم
    const updateProgress = () => {
        const percentage = (count / 10) * 100;
        progress.style.width = `${percentage}%`;
        
        // إضافة تأثير النبض للشريط
        progress.classList.remove('progress-pulse');
        void progress.offsetWidth;
        progress.classList.add('progress-pulse');
        
        // تغيير سرعة حركة الألوان حسب التقدم
        const animationDuration = 5 - (percentage / 20); // يتسارع كلما اقتربنا من النهاية
        progress.style.animationDuration = `${animationDuration}s`;
        
        // تحديث سرعة دوران الحلقات
        const ringSpeed = 3 - (percentage / 40); // تتسارع مع التقدم
        counterRing.style.animationDuration = `${ringSpeed}s`;
        counterRing.querySelector('::before').style.animationDuration = `${ringSpeed * 0.8}s`;
        counterRing.querySelector('::after').style.animationDuration = `${ringSpeed * 1.2}s`;
    };
    
    // تأثير الأرقام المتحركة
    const animateValue = (start, end, duration) => {
        const range = end - start;
        const increment = range > 0 ? 1 : -1;
        const stepTime = Math.abs(Math.floor(duration / range));
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            counter.textContent = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    };
    
    // إضافة مستمعي الأحداث
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updateCounter();
        }
    });
    
    // إضافة وظيفة النقر
    container.addEventListener('click', () => {
        updateCounter();
    });
});
