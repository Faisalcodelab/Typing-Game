const sentenceElement = document.getElementById("sentence");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const tryAgainMessage = document.getElementById("try-again-message");
const sentenceModeButton = document.getElementById("sentence-mode");
const wordModeButton = document.getElementById("word-mode");
const phraseModeButton = document.getElementById("phrase-mode");

let currentMode = "sentence"; // Default mode
let currentSentence = "";
let currentWord = "";
let currentPhrase = "";
let interval;
let isTyping = false;
let startTime = 0;
let typedText = "";

// Time limits for each mode
const TIME_LIMITS = {
  sentence: 30, // 30 seconds for sentence mode
  phrase: 10, // 10 seconds for phrase mode
  word: 5, // 5 seconds for word mode
};

// Sentences, words, and phrases arrays
const sentences = [
  "The cat sleeps on the mat",
  "Birds fly high in the sky",
  "She reads a book every day",
  "He runs fast in the park",
  "The sun rises in the east",
  "I love eating pizza",
  "Dogs bark at strangers",
  "The baby smiled brightly",
  "Rain falls softly on leaves",
  "Clouds drift lazily above",
  "The quick brown fox jumps over the lazy dog",
  "A journey of a thousand miles begins with a single step",
  "She always dreams about traveling the world",
  "They decided to build a treehouse together",
  "His favorite hobby is playing chess online",
  "The teacher explained the lesson clearly today",
  "We went hiking in the mountains last weekend",
  "She bought a new dress for the party",
  "The library is open from nine to five daily",
  "He enjoys cooking meals for his family",
  "Time flies when you’re having fun",
  "The wind blew gently through the trees",
  "Learning a new language takes patience",
  "Children played happily in the garden",
  "She wrote a heartfelt letter to her friend",
  "The store was closed due to bad weather",
  "Music soothes the soul and calms the mind",
  "He fixed the broken chair with glue",
  "Books are a great source of knowledge",
  "The cake smelled delicious as it baked",
  "The little boy chased the butterfly across the meadow",
  "Despite the rain, they continued their outdoor adventure",
  "She painted a beautiful landscape of the countryside",
  "Success comes to those who work hard consistently",
  "The old man told fascinating stories by the fireplace",
  "Students prepared diligently for their upcoming exams",
  "Technology has revolutionized the way we communicate today",
  "A positive attitude can make all the difference in life",
  "The train arrived late because of heavy snowfall",
  "People gathered around to watch the fireworks display",
  "She whispered secrets into her best friend’s ear",
  "The chef prepared a mouthwatering dish for dinner",
  "Education empowers individuals to achieve their goals",
  "The athlete trained rigorously to win the competition",
  "They organized a charity event to help the less fortunate",
  "The museum showcased ancient artifacts from history",
  "Curiosity drives us to explore unknown territories",
  "Writing poetry allows one to express deep emotions",
  "As the sun set behind the mountains, the sky turned shades of orange and pink",
  "Walking along the beach, she felt the cool breeze brushing against her face",
  "He realized that true happiness lies in the small moments of everyday life",
  "Scientists discovered a rare species of bird in the dense jungle forest",
  "Traveling to new places broadens your perspective and enriches your experiences",
  "The young girl learned how to ride a bicycle without training wheels",
  "After months of preparation, the team finally completed the project successfully",
  "Kindness costs nothing but means everything to someone in need",
  "The farmer harvested fresh vegetables from his lush green fields",
  "Exploring space remains one of humanity's greatest scientific challenges",
  "The artist spent hours perfecting every detail of the masterpiece",
  "Friends share laughter, tears, and memories throughout their lives",
  "Hardships teach valuable lessons that shape our character over time",
  "The storm passed quickly, leaving behind a peaceful calm in its wake",
  "Her dedication to her craft inspired everyone around her to strive harder",
  "The city skyline glittered under the light of countless stars above",
  "Parents often sacrifice their own comfort for the sake of their children",
  "A healthy lifestyle includes regular exercise and a balanced diet",
  "Believe in yourself and all that you are capable of achieving",
  "Do not wait for opportunities; create them yourself",
  "Success is not given, it is earned through hard work",
  "Your future depends on what you do today, not tomorrow",
  "Challenges are stepping stones toward personal growth",
  "The only limit is the one you set for yourself",
  "Perseverance is the key to unlocking your full potential",
  "Dream big, work hard, and stay focused on your goals",
  "Failure is simply a detour on the road to success",
  "Keep pushing forward, even when times get tough",
];

const words = [
  "Apple",
  "Banana",
  "Cherry",
  "Dragonfruit",
  "Elderberry",
  "Fig",
  "Grape",
  "Honeydew",
  "Kiwi",
  "Lemon",
  "Mango",
  "Nectarine",
  "Orange",
  "Papaya",
  "Quince",
  "Raspberry",
  "Strawberry",
  "Tangerine",
  "Ugli",
  "Vanilla",
  "Watermelon",
  "Xylophone",
  "Yellow",
  "Zucchini",
];

const phrases = [
  "Keep going",
  "Never give up",
  "Stay strong",
  "Believe in yourself",
  "Take it slow",
  "Do your best",
  "One step at a time",
  "Think positive",
  "You can do it",
  "Stay focused",
  "The sky is the limit",
  "Every moment counts",
  "Dream big dreams",
  "Success is a journey",
  "Hard work pays off",
  "Learn from mistakes",
  "Stay humble",
  "Be kind always",
  "Actions speak louder",
  "Change is inevitable",
  "Embrace challenges",
  "Stay curious",
  "Find your passion",
  "Trust the process",
  "Perseverance matters",
  "Stay grounded",
  "Live in the moment",
  "Chase your goals",
  "Break barriers",
  "Stay consistent",
  "Be fearless",
  "Grow every day",
  "Celebrate small wins",
  "Push beyond limits",
  "Stay resilient",
  "Keep learning",
  "Stay open-minded",
  "Be the change",
  "Rise above doubts",
  "Focus on progress",
  "Work smarter",
  "Stay inspired",
  "Believe in miracles",
  "Create your path",
  "Stay true to yourself",
  "Balance is key",
  "Enjoy the ride",
  "Stay determined",
  "Find joy in effort",
  "Stay patient",
  "Be unstoppable",
  "Dream without limits",
  "Stay adaptable",
  "Keep improving",
  "Stay confident",
  "Make it happen",
  "Stay positive",
  "Believe in your potential",
  "Overcome obstacles",
  "Stay motivated",
  "Give it your all",
  "Stay disciplined",
  "Learn something new",
  "Stay optimistic",
  "Keep moving forward",
  "Face fears bravely",
  "Stay authentic",
  "Be grateful daily",
  "Stay committed",
  "Keep pushing boundaries",
  "Stay proactive",
  "Believe in tomorrow",
  "Stay creative",
  "Keep striving",
  "Stay ambitious",
  "Be the best version",
  "Stay persistent",
  "Challenge yourself",
  "Stay humble and hungry",
  "Keep growing",
  "Stay bold",
  "Be courageous",
  "Stay sharp",
  "Keep dreaming",
  "Stay energetic",
  "Believe in the process",
  "Stay innovative",
  "Keep exploring",
  "Stay passionate",
  "Keep shining",
  "Stay calm under pressure",
  "Keep your head up",
  "Stay loyal to your goals",
  "Keep trying",
  "Stay hopeful",
  "Be a lifelong learner",
  "Stay present",
  "Keep inspiring others",
  "Stay unique",
  "Keep believing",
  "Stay connected",
  "Be intentional",
  "Stay mindful",
  "Keep evolving",
  "Stay unstoppable",
  "Believe in your vision",
  "Stay resourceful",
  "Keep achieving",
  "Stay balanced",
  "Keep thriving",
  "Stay driven",
  "Be relentless",
  "Stay open to possibilities",
  "Keep reaching higher",
  "Stay fearless",
  "Be the light",
  "Stay grateful",
  "Keep breaking barriers",
  "Stay dedicated",
  "Keep chasing excellence",
  "Stay humble yet confident",
  "Be a problem solver",
  "Stay hungry for success",
  "Keep making progress",
  "Stay unstoppable",
];

// Start a new game
function startGame() {
  if (currentMode === "sentence") {
    currentSentence = sentences[Math.floor(Math.random() * sentences.length)];
    updateSentenceDisplay(currentSentence, "");
  } else if (currentMode === "word") {
    currentWord = words[Math.floor(Math.random() * words.length)];
    updateSentenceDisplay(currentWord, "");
  } else if (currentMode === "phrase") {
    currentPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    updateSentenceDisplay(currentPhrase, "");
  }
  inputElement.disabled = false;
  inputElement.value = "";
  typedText = "";
  inputElement.focus();
  isTyping = false;
  clearInterval(interval);
  timerElement.textContent = `Time Left: ${TIME_LIMITS[currentMode]}s`;
  wpmElement.textContent = `WPM: 0`;
  accuracyElement.textContent = `Accuracy: 0%`;
}

// Timer update
function startTimer() {
  let timeLeft = TIME_LIMITS[currentMode];
  interval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time Left: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(interval);
      inputElement.disabled = true;
      tryAgainMessage.textContent = "⏰ Time's up! Please try again.";
      setTimeout(() => {
        startGame();
      }, 2000);
    }
  }, 1000);
}

// WPM calculation
function calculateWPM(elapsedTime) {
  const targetText =
    currentMode === "sentence"
      ? currentSentence
      : currentMode === "word"
      ? currentWord
      : currentPhrase;
  if (elapsedTime <= 0) return 0;
  if (currentMode === "sentence" || currentMode === "phrase") {
    const wordsTyped = typedText.trim().split(/\s+/).length;
    return Math.floor(wordsTyped / (elapsedTime / 60));
  } else if (currentMode === "word") {
    const wordsTyped = typedText
      .split(" ")
      .filter((word) => word.length > 0).length;
    return Math.floor(wordsTyped / (elapsedTime / 60));
  }
}

// Accuracy calculation
function calculateAccuracy() {
  let correctCount = 0;
  const targetText =
    currentMode === "sentence"
      ? currentSentence
      : currentMode === "word"
      ? currentWord
      : currentPhrase;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctCount++;
    }
  }
  return ((correctCount / targetText.length) * 100).toFixed(2);
}

// Update stats display
function updateStats(elapsedTime) {
  wpmElement.textContent = `WPM: ${calculateWPM(elapsedTime)}`;
  accuracyElement.textContent = `Accuracy: ${calculateAccuracy()}%`;
}

// Highlight typed and remaining text (modified for disappearing letters)
function updateSentenceDisplay(targetText, typedText) {
  const remainingText = targetText.slice(typedText.length); // Only show remaining text
  sentenceElement.textContent = remainingText; // Update the display with remaining text
}

// Keydown-based input validation
inputElement.addEventListener("keydown", (e) => {
  const currentInput = inputElement.value;
  const nextCharIndex = currentInput.length;
  const targetText =
    currentMode === "sentence"
      ? currentSentence
      : currentMode === "word"
      ? currentWord
      : currentPhrase;
  const expectedChar = targetText[nextCharIndex];

  // If the target text is already completed, ignore further input
  if (nextCharIndex >= targetText.length) {
    e.preventDefault(); // Prevent additional input
    return;
  }

  // Allow special keys like Backspace, Shift, etc.
  if (e.ctrlKey || e.metaKey || e.altKey) return;

  // Handle Caps Lock toggling (ignore it entirely)
  if (e.getModifierState && e.getModifierState("CapsLock")) {
    // Do nothing for Caps Lock toggling
    // But don't block further validation logic!
  }

  // Handle Backspace
  if (e.key === "Backspace") {
    if (currentInput.length === 0) return; // Prevent backspacing beyond empty input
    typedText = currentInput.slice(0, -1);
    inputElement.classList.remove("incorrect-input");
    tryAgainMessage.textContent = "";
    updateSentenceDisplay(targetText, typedText);
    updateStats((Date.now() - startTime) / 1000);
    return;
  }

  // Skip CapsLock and Shift keys
  if (e.key === "CapsLock" || e.key === "Shift") {
    return;
  }

  // Validate the typed character
  if (e.key !== expectedChar) {
    // Allow special characters like apostrophes, commas, periods, and quotes
    if (
      (expectedChar === "'" && e.key === "'") || // Standard apostrophe
      (expectedChar === "’" && e.key === "'") || // Smart quote
      (expectedChar === "," && e.key === ",") ||
      (expectedChar === "." && e.key === ".") ||
      (expectedChar === '"' && e.key === '"') ||
      (expectedChar === "“" && e.key === '"') ||
      (expectedChar === "”" && e.key === '"')
    ) {
      // Allow these special characters
    } else {
      e.preventDefault(); // Prevent incorrect input
      inputElement.classList.add("incorrect-input");
      inputElement.classList.remove("correct-input");
      tryAgainMessage.textContent = `❌ Wrong letter! Expected: "${expectedChar}"`;
      setTimeout(() => {
        tryAgainMessage.textContent = ""; // Clear error message after 1 second
      }, 1000);
      return;
    }
  }

  // Handle correct character
  typedText = currentInput + e.key;
  inputElement.classList.add("correct-input");
  inputElement.classList.remove("incorrect-input");
  tryAgainMessage.textContent = "";
  updateSentenceDisplay(targetText, typedText);

  // Start the timer only after the first keypress
  if (!isTyping) {
    isTyping = true;
    startTime = Date.now();
    startTimer();
  }

  updateStats((Date.now() - startTime) / 1000);

  // When finished
  if (typedText === targetText) {
    clearInterval(interval);
    inputElement.disabled = true;
    inputElement.value = typedText; // Force-update the input value
    setTimeout(() => {
      tryAgainMessage.textContent = "🎉 Well done!";
      setTimeout(() => {
        isTyping = false;
        startGame();
      }, 1500); // 1.5 seconds delay
    }, 0); // Minimal delay to ensure the DOM updates
  }
});

// Mode selection buttons
sentenceModeButton.addEventListener("click", () => {
  currentMode = "sentence";
  sentenceModeButton.classList.add("active");
  wordModeButton.classList.remove("active");
  phraseModeButton.classList.remove("active");
  startGame();
});
wordModeButton.addEventListener("click", () => {
  currentMode = "word";
  wordModeButton.classList.add("active");
  sentenceModeButton.classList.remove("active");
  phraseModeButton.classList.remove("active");
  startGame();
});
phraseModeButton.addEventListener("click", () => {
  currentMode = "phrase";
  phraseModeButton.classList.add("active");
  sentenceModeButton.classList.remove("active");
  wordModeButton.classList.remove("active");
  startGame();
});

// Initial load
startGame();
