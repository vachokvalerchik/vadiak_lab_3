// Функція, яка створює та показує вікно реклами
function showAd() {
    // Створення вікна реклами
    var adWindow = document.createElement('div');
    adWindow.id = 'adWindow';
    adWindow.innerHTML = '<div style="text-align: center; font-size: 90px; color: #333; line-height: 1.2;">Тут могла бути ваша реклама</div> <div id="timer" style="position: absolute; top: 10px; left: 50%; transform: translateX(-50%); width: 40px; height: 40px; background-color: #ffc0cb; border-radius: 50%; display: flex; justify-content: center; align-items: center; font-size: 20px;"></div> <div id="closeButton" style="position: absolute; top: 10px; right: 10px; cursor: pointer; opacity: 0.5; font-size: 30px;">&times;</div>';
    adWindow.style.position = 'fixed';
    adWindow.style.top = '50%';
    adWindow.style.left = '50%';
    adWindow.style.transform = 'translate(-50%, -50%)';
    adWindow.style.backgroundColor = '#ffc0cb'; 
    adWindow.style.padding = '20px';
    adWindow.style.borderRadius = '20px'; // Закруглені кути
    adWindow.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.5)'; // Тінь
    adWindow.style.zIndex = '9999'; // Забезпечення, що вікно реклами буде поверх інших елементів

    // Функція для закриття вікна реклами
    function closeAd() {
        adWindow.remove();
    }

    // Додавання вікна реклами до тіла сторінки
    document.body.appendChild(adWindow);

    var secondsLeft = 5;
    var timerElement = document.getElementById('timer');
    var closeButton = document.getElementById('closeButton');
    closeButton.disabled = true; // блокуємо кнопку 
    var countdown = setInterval(function() {
        timerElement.innerText = secondsLeft;
        secondsLeft--;

        if (secondsLeft < 0) {
            clearInterval(countdown);
            closeButton.style.opacity = '1'; // Розблоковуємо кнопку закриття після закінчення відліку
            closeButton.style.cursor = 'pointer';
            closeButton.addEventListener('click', function() {
                closeAd();
            });
        }
    }, 1000);
}

setTimeout(showAd, 20000);
