// Знаходимо форму для введення імені.
const setupForm = document.querySelector("#setup-form");
// Знаходимо поле введення імені гравця.
const playerInput = document.querySelector("#player-input");
// Знаходимо елемент для повідомлення про помилку.
const nameError = document.querySelector("#name-error");
// Знаходимо основну область гри.
const playArea = document.querySelector("#play-area");
// Знаходимо елемент для імені гравця.
const playerName = document.querySelector("#player-name");
// Знаходимо лічильник очок гравця.
const playerScoreLabel = document.querySelector("#player-score");
// Знаходимо лічильник очок комп’ютера.
const computerScoreLabel = document.querySelector("#computer-score");
// Знаходимо елемент для числа гравця.
const playerNumberLabel = document.querySelector("#player-number");
// Знаходимо елемент для числа комп’ютера.
const computerNumberLabel = document.querySelector("#computer-number");
// Знаходимо елемент із номером раунду.
const roundLabel = document.querySelector("#round-label");
// Знаходимо елемент для повідомлень про перебіг гри.
const resultLabel = document.querySelector("#result");
// Знаходимо кнопку запуску раунду.
const playButton = document.querySelector("#play-button");
// Знаходимо кнопку перезапуску гри.
const restartButton = document.querySelector("#restart-button");
// Встановлюємо початковий рахунок гравця.
let playerScore = 0;
// Встановлюємо початковий рахунок комп’ютера.
let computerScore = 0;
// Встановлюємо номер першого раунду.
let round = 1;
// Зберігаємо стан гри: спочатку вона ще триває.
let gameOver = false;
// Обробляємо надсилання форми з ім’ям.
setupForm.addEventListener("submit", (event) => {
  // Не дозволяємо формі перезавантажити сторінку.
  event.preventDefault();
  // Читаємо ім’я та прибираємо зайві пробіли з країв.
  const name = playerInput.value.trim();
  // Перевіряємо, чи введено ім’я.
  if (!name) {
    // Показуємо повідомлення, якщо ім’я порожнє.
    nameError.textContent = "Будь ласка, введи своє ім’я.";
    // Позначаємо поле як таке, що містить помилку.
    playerInput.setAttribute("aria-invalid", "true");
    // Повертаємо курсор у поле для введення імені.
    playerInput.focus();
    // Зупиняємо запуск гри без імені.
    return;
  // Завершуємо перевірку на порожнє ім’я.
  }
  // Очищаємо повідомлення про помилку.
  nameError.textContent = "";
  // Знімаємо позначку помилки з поля.
  playerInput.removeAttribute("aria-invalid");
  // Відображаємо ім’я гравця в ігровій області.
  playerName.textContent = name;
  // Ховаємо форму введення імені.
  setupForm.hidden = true;
  // Показуємо ігрову область.
  playArea.hidden = false;
  // Переміщуємо фокус на кнопку запуску раунду.
  playButton.focus();
// Завершуємо обробник надсилання форми.
});
// Обробляємо натискання кнопки запуску раунду.
playButton.addEventListener("click", () => {
  // Не запускаємо наступний раунд після завершення гри.
  if (gameOver) return;
  // Генеруємо випадкове ціле число гравця від 1 до 100.
  const playerNumber = Math.floor(Math.random() * 100) + 1;
  // Генеруємо випадкове ціле число комп’ютера від 1 до 100.
  const computerNumber = Math.floor(Math.random() * 100) + 1;
  // Показуємо згенероване число гравця.
  playerNumberLabel.textContent = playerNumber;
  // Показуємо згенероване число комп’ютера.
  computerNumberLabel.textContent = computerNumber;
  // Перевіряємо, чи гравець отримав більше число.
  if (playerNumber > computerNumber) {
    // Додаємо гравцеві одне очко.
    playerScore += 1;
    // Повідомляємо, що очко отримав гравець.
    resultLabel.textContent = `${playerName.textContent} отримує очко!`;
  // Перевіряємо, чи число комп’ютера більше.
  } else if (computerNumber > playerNumber) {
    // Додаємо комп’ютеру одне очко.
    computerScore += 1;
    // Повідомляємо, що очко отримав комп’ютер.
    resultLabel.textContent = "Очко комп’ютера!";
  // Якщо числа рівні, визначаємо результат як нічию.
  } else {
    // Повідомляємо про нічию без нарахування очок.
    resultLabel.textContent = "Нічия — жодного очка не нараховано.";
  // Завершуємо визначення результату раунду.
  }
  // Оновлюємо рахунок гравця на сторінці.
  playerScoreLabel.textContent = playerScore;
  // Оновлюємо рахунок комп’ютера на сторінці.
  computerScoreLabel.textContent = computerScore;
  // Перевіряємо, чи хтось набрав три очки.
  if (playerScore === 3 || computerScore === 3) {
    // Позначаємо гру як завершену.
    gameOver = true;
    // Вимикаємо кнопку запуску раунду.
    playButton.disabled = true;
    // Показуємо кнопку початку нової гри.
    restartButton.hidden = false;
    // Вибираємо повідомлення залежно від переможця.
    resultLabel.textContent = playerScore === 3
    // Вітаємо гравця, якщо він набрав три очки.
      ? `Вітаю, ${playerName.textContent}! ви перемогли!`
    // Повідомляємо про перемогу комп’ютера в іншому випадку.
      : "Комп’ютер переміг. Спробуйте ще раз";
    // Переміщуємо фокус на кнопку перезапуску.
    restartButton.focus();
    // Завершуємо обробник після закінчення гри.
    return;
  // Завершуємо перевірку завершення гри.
  }
  // Переходимо до наступного раунду.
  round += 1;
  // Показуємо номер наступного раунду.
  roundLabel.textContent = `Раунд ${round}`;
// Завершуємо обробник натискання кнопки раунду.
});
// Обробляємо натискання кнопки перезапуску.
restartButton.addEventListener("click", () => {
  // Обнуляємо рахунок гравця.
  playerScore = 0;
  // Обнуляємо рахунок комп’ютера.
  computerScore = 0;
  // Повертаємо номер раунду до першого.
  round = 1;
  // Позначаємо нову гру як незавершену.
  gameOver = false;
  // Відображаємо нуль очок гравця.
  playerScoreLabel.textContent = "0";
  // Відображаємо нуль очок комп’ютера.
  computerScoreLabel.textContent = "0";
  // Очищаємо число попереднього раунду гравця.
  playerNumberLabel.textContent = "—";
  // Очищаємо число попереднього раунду комп’ютера.
  computerNumberLabel.textContent = "—";
  // Повертаємо відображення до першого раунду.
  roundLabel.textContent = "Раунд 1";
  // Показуємо початкове повідомлення перед грою.
  resultLabel.textContent = "Натисни кнопку, щоб зіграти!";
  // Знову вмикаємо кнопку запуску раунду.
  playButton.disabled = false;
  // Ховаємо кнопку перезапуску.
  restartButton.hidden = true;
  // Переміщуємо фокус на кнопку запуску раунду.
  playButton.focus();
// Завершуємо обробник перезапуску гри.
});
