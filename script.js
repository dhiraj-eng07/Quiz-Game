* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Fira Code', 'Courier New', monospace;
  background: #121212 url('https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80') no-repeat center center;
  background-size: cover;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: #e0e0e0;
  position: relative;
  overflow: hidden;
}

body::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 0;
}

.quiz-container {
  background: rgba(30, 30, 30, 0.9);
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
  max-width: 700px;
  width: 90%;
  position: relative;
  z-index: 1;
  border: 1px solid #444;
  backdrop-filter: blur(5px);
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #4CAF50;
  font-size: 2.2rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

#question {
  font-size: 1.4rem;
  margin-bottom: 1.5rem;
  color: #f5f5f5;
  line-height: 1.5;
  background: rgba(40, 40, 40, 0.7);
  padding: 1rem;
  border-radius: 8px;
  border-left: 4px solid #4CAF50;
}

#options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

#options button {
  padding: 1rem;
  background: #2a2a2a;
  color: #e0e0e0;
  border: 1px solid #444;
  border-radius: 8px;
  transition: all 0.3s;
  cursor: pointer;
  font-family: 'Fira Code', monospace;
  font-size: 1rem;
  text-align: left;
}

#options button:hover {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

#options button:active {
  transform: translateY(0);
}

#nextBtn, #playAgainBtn {
  margin-top: 1.5rem;
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: none;
  background: #4CAF50;
  color: white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

#nextBtn:hover, #playAgainBtn:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

#nextBtn {
  display: none;
}

.hidden {
  display: none;
}

#feedback {
  font-weight: bold;
  margin-top: 1rem;
  font-size: 1.2rem;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  animation: fadeIn 0.5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.correct {
  color: #4CAF50;
  background: rgba(76, 175, 80, 0.1);
  border: 1px solid #4CAF50;
}

.incorrect {
  color: #f44336;
  background: rgba(244, 67, 54, 0.1);
  border: 1px solid #f44336;
}

.fruit {
  position: absolute;
  width: 40px;
  height: 40px;
  background-size: contain;
  background-repeat: no-repeat;
  z-index: 2;
  animation: fall linear forwards;
  pointer-events: none;
  font-size: 30px;
}

@keyframes fall {
  to {
    transform: translateY(calc(100vh + 50px));
  }
}

.score-display {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 1rem;
  z-index: 10;
}

.confetti {
  position: absolute;
  width: 10px;
  height: 10px;
  background-color: #f00;
  border-radius: 50%;
  animation: confetti-fall 3s linear forwards;
  pointer-events: none;
}

@keyframes confetti-fall {
  0% {
    transform: translateY(-100px) rotate(0deg);
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}

@media (max-width: 768px) {
  #options {
    grid-template-columns: 1fr;
  }
  
  .quiz-container {
    width: 95%;
    padding: 1.5rem;
  }
  
  h1 {
    font-size: 1.8rem;
  }
  
  #question {
    font-size: 1.2rem;
  }
}
