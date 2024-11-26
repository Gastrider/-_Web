// Функция для проверки полей
function validateField(field, condition, errorMessage) {
    const errorElement = field.nextElementSibling; // Элемент для отображения ошибок
    if (condition) {
        field.classList.remove('invalid');
        field.classList.add('valid');
        if (errorElement) errorElement.style.display = 'none'; // Скрываем ошибку
    } else {
        field.classList.remove('valid');
        field.classList.add('invalid');
        if (errorElement) {
            errorElement.textContent = errorMessage; // Устанавливаем сообщение об ошибке
            errorElement.style.display = 'block'; // Показываем ошибку
        }
    }
}

// Обработчики для полей формы (валидация в реальном времени)
document.querySelectorAll('#product-name, #quantity, #email, #payment-method').forEach((field) => {
    field.addEventListener('input', () => {
        switch (field.id) {
            case 'product-name':
                validateField(field, field.value.trim() !== '', 'Название продукта не может быть пустым');
                break;
            case 'quantity':
                validateField(
                    field,
                    field.value > 0 && !isNaN(field.value),
                    'Количество должно быть числом больше 0'
                );
                break;
            case 'email':
                validateField(
                    field,
                    /^\S+@\S+\.\S+$/.test(field.value.trim()),
                    'Введите корректный email'
                );
                break;
            case 'payment-method':
                validateField(field, field.value !== '', 'Выберите способ оплаты');
                break;
        }
    });

    field.addEventListener('blur', () => {
        if (!field.classList.contains('valid')) {
            field.classList.add('invalid'); // Отмечаем поле как ошибочное, если данные некорректны
        }
    });

    field.addEventListener('focus', () => {
        field.classList.remove('invalid'); // Убираем ошибку при фокусе
    });
});

// Обработчик отправки формы
document.querySelector('.form-submit-btn').addEventListener('click', function (event) {
    event.preventDefault(); // Отключаем стандартное поведение формы

    const fields = ['#product-name', '#quantity', '#email', '#payment-method'];
    let isFormValid = true;

    fields.forEach((selector) => {
        const field = document.querySelector(selector);
        if (!field.classList.contains('valid')) {
            isFormValid = false; // Если хотя бы одно поле некорректно, форма недействительна
            field.classList.add('invalid');
        }
    });

    if (isFormValid) {
        // Собираем данные из формы
        const productName = document.getElementById('product-name').value.trim();
        const quantity = document.getElementById('quantity').value.trim();
        const email = document.getElementById('email').value.trim();
        const comments = document.getElementById('comments').value.trim();
        const paymentMethod = document.getElementById('payment-method').value;

        // Создаём контейнер с данными
        const outputContainer = document.createElement('div');
        outputContainer.className = 'form-output';
        outputContainer.innerHTML = `
            <h3>Вы успешно отправили заявку!</h3>
            <p><strong>Название продукта:</strong> ${productName}</p>
            <p><strong>Количество:</strong> ${quantity}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Комментарии:</strong> ${comments || 'Нет комментариев'}</p>
            <p><strong>Способ оплаты:</strong> ${paymentMethod}</p>
        `;

        // Добавляем результат ниже формы
        document.querySelector('.product-form').appendChild(outputContainer);
    } else {
        alert('Пожалуйста, исправьте ошибки в форме.');
    }
});

// Перемещение картинки при наведении
document.querySelector('.img-phone').addEventListener('mouseenter', function () {
    this.style.transform = 'translateX(20px)'; // Сдвигаем вправо
    this.style.transition = 'transform 0.5s ease'; // Анимация сдвига
});

document.querySelector('.img-phone').addEventListener('mouseleave', function () {
    this.style.transform = 'translateX(0)'; // Возвращаем картинку на место
});

// Управление анимацией слова "желаете!"
const wordSpan = document.querySelector('.offer__span');
let isAnimationPaused = false;

wordSpan.addEventListener('click', function () {
    if (isAnimationPaused) {
        // Возобновляем анимацию
        this.style.animation = 'pulse 2s infinite';
        this.style.transform = 'none'; // Убираем трансформацию
        isAnimationPaused = false;
    } else {
        // Сбрасываем анимацию
        this.style.animation = 'none'; // Останавливаем анимацию
        this.style.transform = 'scale(1)'; // Возвращаем к исходному масштабу
        isAnimationPaused = true;
    }
});
