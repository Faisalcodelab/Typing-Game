const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const tryAgainMessage = document.getElementById("try-again-message");

const sentences = [
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The harder you work for something, the greater you'll feel when you achieve it.",
  "Opportunities don't happen, you create them.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Don’t watch the clock; do what it does. Keep going.",
  "A journey of a thousand miles begins with a single step.",
  "Success is the sum of small efforts, repeated day in and day out.",
  "The future depends on what we do in the present.",
  "It always seems impossible until it's done.",
  "The secret of getting ahead is getting started.",
  "Your limitation—it's only your imagination.",
  "Great things never come from comfort zones.",
  "Dream it. Wish it. Do it.",
  "Success doesn’t just find you. You have to go out and get it.",
  "The harder you work, the luckier you get.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream bigger. Do bigger.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "What we think, we become.",
  "I can and I will. Watch me.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "The best way to predict the future is to create it.",
  "The mind is everything. What you think you become.",
  "The only way to do great work is to love what you do.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "You must be the change you wish to see in the world.",
  "It always seems impossible until it’s done.",
  "In the middle of every difficulty lies opportunity.",
  "The best revenge is massive success.",
  "You miss 100% of the shots you don’t take.",
  "Don’t be afraid to give up the good to go for the great.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "You are braver than you believe, stronger than you seem, and smarter than you think.",
  "Success doesn’t just find you. You have to go out and get it.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "Dream it. Wish it. Do it.",
  "Don’t wait for opportunity. Create it.",
  "Success usually comes to those who are too busy to be looking for it.",
  "If you can dream it, you can do it.",
  "Do something today that your future self will thank you for.",
  "The harder you work for something, the greater you’ll feel when you achieve it.",
  "Dream big and dare to fail.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Believe you can and you're halfway there.",
  "Don’t stop when you’re tired. Stop when you’re done.",
  "Wake up with determination. Go to bed with satisfaction.",
  "Little things make big days.",
  "It’s going to be hard, but hard does not mean impossible.",
  "Don’t wait for opportunity. Create it.",
  "Sometimes we’re tested not to show our weaknesses, but to discover our strengths.",
  "The key to success is to focus on goals, not obstacles.",
  "Dream bigger. Do bigger.",
  "You are never too old to set another goal or to dream a new dream.",
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Don’t be pushed around by the fears in your mind. Be led by the dreams in your heart.",
  "The only way to achieve the impossible is to believe it is possible.",
  "Success is not how high you have climbed, but how you make a positive difference to the world.",
  "What we think, we become.",
  "I can and I will. Watch me.",
  "Keep your face always toward the sunshine—and shadows will fall behind you.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "Hardships often prepare ordinary people for an extraordinary destiny.",
  "The best way to predict the future is to create it.",
  "The mind is everything. What you think you become.",
  "The only way to do great work is to love what you do.",
  "Believe in yourself and all that you are. Know that there is something inside you that is greater than any obstacle.",
  "Success is not the key to happiness. Happiness is the key to success.",
  "You must be the change you wish to see in the world.",
];

let currentSentence = "";
let timer = 0;
let interval;
let isTyping = false;
let startTime = 0;
let typedText = "";

// Start a new game
function startGame() {
  currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
  sentenceElement.textContent = currentSentence;
  inputElement.disabled = false;
  inputElement.value = "";
  typedText = "";
  tryAgainMessage.textContent = "";
  inputElement.focus();
  startTime = 0;
  timer = 0;
  isTyping = false;
  clearInterval(interval);
  timerElement.textContent = `Time: 0s`;
  wpmElement.textContent = `WPM: 0`;
  accuracyElement.textContent = `Accuracy: 0%`;
}

// Timer update
function updateTimer() {
  timer = Math.floor((Date.now() - startTime) / 1000);
  timerElement.textContent = `Time: ${timer}s`;
}

// WPM calculation
function calculateWPM() {
  const wordsTyped = typedText.trim().split(" ").length;
  return timer > 0 ? Math.floor((wordsTyped / timer) * 60) : 0;
}

// Accuracy calculation
function calculateAccuracy() {
  let correctCount = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === currentSentence[i]) {
      correctCount++;
    }
  }
  return ((correctCount / currentSentence.length) * 100).toFixed(2);
}

// Update stats display
function updateStats() {
  wpmElement.textContent = `WPM: ${calculateWPM()}`;
  accuracyElement.textContent = `Accuracy: ${calculateAccuracy()}%`;
}

// Keydown-based input validation
inputElement.addEventListener("keydown", (e) => {
  const currentInput = inputElement.value;
  const nextCharIndex = currentInput.length;
  const expectedChar = currentSentence[nextCharIndex];

  if (e.ctrlKey || e.metaKey || e.altKey) return;

  if (e.key === "Backspace") {
    typedText = currentInput.slice(0, -1);
    inputElement.classList.remove("incorrect-input");
    tryAgainMessage.textContent = "";
    updateStats();
    return;
  }

  // Handle incorrect character
  if (e.key !== expectedChar) {
    e.preventDefault();
    inputElement.classList.add("incorrect-input");
    inputElement.classList.remove("correct-input");
    tryAgainMessage.textContent = `❌ Wrong letter! Expected: "${expectedChar}"`;
    return;
  }

  // Handle correct character
  typedText = currentInput + e.key;
  inputElement.classList.add("correct-input");
  inputElement.classList.remove("incorrect-input");
  tryAgainMessage.textContent = "";

  if (!isTyping) {
    isTyping = true;
    startTime = Date.now();
    interval = setInterval(updateTimer, 1000);
  }

  updateStats();

  // When finished
  if (typedText === currentSentence) {
    clearInterval(interval);
    inputElement.disabled = true;
    tryAgainMessage.textContent = "🎉 Well done!";
    setTimeout(() => {
      isTyping = false;
      startGame();
    }, 1000);
  }
});

// Initial load
startGame();
