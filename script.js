// Quiz data
const quizData = [
  { 
    question: "What does HTML stand for?", 
    options: ["Hyper Text Markup Language", "Hot Mail", "How To Make Landingpage", "Hyperlinks and Text Markup Language"], 
    answer: 0,
    funFact: "HTML was created by Tim Berners-Lee in 1991!"
  },
  { 
    question: "What does CSS stand for?", 
    options: ["Computer Style Sheets", "Cascading Style Sheets", "Creative Style Syntax", "Colorful Style Structure"], 
    answer: 1,
    funFact: "CSS was first proposed by Håkon Wium Lie in 1994 while working with Tim Berners-Lee at CERN."
  },
  { 
    question: "Inside which HTML element do we put JavaScript?", 
    options: ["<js>", "<scripting>", "<script>", "<javascript>"], 
    answer: 2,
    funFact: "The <script> tag can load both internal and external JavaScript files."
  },
  { 
    question: "Which language runs in a web browser?", 
    options: ["Java", "C", "Python", "JavaScript"], 
    answer: 3,
    funFact: "JavaScript was created in just 10 days by Brendan Eich in 1995!"
  },
  { 
    question: "What year was JavaScript launched?", 
    options: ["1996", "1995", "1994", "None of the above"], 
    answer: 1,
    funFact: "JavaScript was originally named Mocha, then LiveScript, before finally being named JavaScript."
  }
];

// Game state variables
let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];
const fruits = ['🍎', '🍊', '🍌', '🍉', '🍇', '🍓', '🍑', '🥭'];

// DOM elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const feedbackEl = document.getElementById("feedback");
const nextBtn = document.getElementById("nextBtn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");
const currentScoreEl = document.getElementById("currentScore");
const totalQuestionsEl = document.getElementById("totalQuestions");
const finalCommentEl = document.getElementById("finalComment");
const playAgainBtn = document.getElementById("playAgainBtn");

// Initialize the game
function initGame() {
  // Shuffle questions
  shuffledQuestions = [...quizData].sort(() => Math.random() - 0.5);
  
  // Reset game state
  currentQuestion = 0;
  score = 0;
  currentScoreEl.textContent = score;
  totalQuestionsEl.textContent = shuffledQuestions.length;
  
  // Show quiz and hide result
  document.getElementById("quiz").classList.remove("hidden");
  resultEl.classList.add("hidden");
  
  // Load first question
  loadQuestion();
  
  // Try to enter fullscreen
  enterFullscreen();
}

// Load current question
function loadQuestion() {
  feedbackEl.textContent = "";
  feedbackEl.className = "";
  
  const current = shuffledQuestions[currentQuestion];
  questionEl.textContent = `${currentQuestion + 1}. ${current.question}`;
  optionsEl.innerHTML = "";
  
  // Shuffle options while keeping track of correct answer
  const optionsWithIndex = current.options.map((option, index) => ({ option, originalIndex: index }));
  const shuffledOptions = [...optionsWithIndex].sort(() => Math.random() - 0.5);
  let correctIndex = shuffledOptions.findIndex(opt => opt.originalIndex === current.answer);
  
  // Create option buttons
  shuffledOptions.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.textContent = option.option;
    btn.addEventListener("click", () => checkAnswer(index, correctIndex));
    optionsEl.appendChild(btn);
  });
}

// Check selected answer
function checkAnswer(selectedIndex, correctIndex) {
  const allButtons = optionsEl.querySelectorAll("button");
  
  // Disable all buttons
  allButtons.forEach(btn => {
    btn.disabled = true;
  });
  
  if (selectedIndex === correctIndex) {
    // Correct answer
    score++;
    currentScoreEl.textContent = score;
    feedbackEl.textContent = `🎉 CORRECT! 🎉\n${shuffledQuestions[currentQuestion].funFact}`;
    feedbackEl.className = "correct";
    allButtons[selectedIndex].style.background = "#4CAF50";
    
    // Celebration effects
    createFallingFruits();
    createConfetti();
  } else {
    // Wrong answer
    feedbackEl.textContent = `❌ Incorrect! The correct answer was:\n${shuffledQuestions[currentQuestion].options[shuffledQuestions[currentQuestion].answer]}\n\n${shuffledQuestions[currentQuestion].funFact}`;
    feedbackEl.className = "incorrect";
    allButtons[selectedIndex].style.background = "#f44336";
    allButtons[correctIndex].style.background = "#4CAF50";
  }
  
  // Show next button
  nextBtn.style.display = "block";
}

// Create falling fruits animation
function createFallingFruits() {
  for (let i = 0; i < 8; i++) {
    const fruit = document.createElement("div");
    fruit.className = "fruit";
    fruit.textContent = fruits[Math.floor(Math.random() * fruits.length)];
    fruit.style.left = `${Math.random() * 100}vw`;
    fruit.style.top = "-50px";
    fruit.style.animationDuration = `${Math.random() * 2 + 1.5}s`;
    document.body.appendChild(fruit);
    
    // Remove after animation
    setTimeout(() => fruit.remove(), 3000);
  }
}

// Create confetti animation
function createConfetti() {
  const colors = ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', 
                 '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4CAF50', 
                 '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800'];
  
  for (let i = 0; i < 30; i++) {
    const confetti = document.createElement("div");
    confetti.className = "confetti";
    confetti.style.left = `${Math.random() * 100}vw`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.width = `${Math.random() * 8 + 4}px`;
    confetti.style.height = confetti.style.width;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    document.body.appendChild(confetti);
    
    // Remove after animation
    setTimeout(() => confetti.remove(), 3000);
  }
}

// Show final results
function showResult() {
  document.getElementById("quiz").classList.add("hidden");
  resultEl.classList.remove("hidden");
  scoreEl.textContent = score;
  totalQuestionsEl.textContent = shuffledQuestions.length;
  
  // Final comment based on score
  const percentage = (score / shuffledQuestions.length) * 100;
  if (percentage >= 90) {
    finalCommentEl.textContent = "🏆 Coding Master! You're amazing! 🏆";
    createConfetti();
    createFallingFruits();
  } else if (percentage >= 70) {
    finalCommentEl.textContent = "🌟 Great job! You know your stuff! 🌟";
    createConfetti();
  } else if (percentage >= 50) {
    finalCommentEl.textContent = "👍 Good effort! Keep learning! 👍";
  } else {
    finalCommentEl.textContent = "💡 Keep practicing! Every coder starts somewhere! 💡";
  }
}

// Fullscreen handling
function enterFullscreen() {
  try {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(err => {
        console.log("Fullscreen error:", err);
      });
    }
  } catch (e) {
    console.log("Fullscreen not supported:", e);
  }
}

// Event listeners
nextBtn.addEventListener("click", () => {
  currentQuestion++;
  nextBtn.style.display = "none";
  
  if (currentQuestion < shuffledQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

playAgainBtn.addEventListener("click", initGame);

// Initialize the game when page loads
window.addEventListener('DOMContentLoaded', initGame);

// Re-enter fullscreen if user exits it
document.addEventListener('fullscreenchange', () => {
  if (!document.fullscreenElement) {
    setTimeout(enterFullscreen, 1000);
  }
});
