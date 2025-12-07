// Quiz Questions Database
const quizQuestions = [
    {
        question: "What is an algorithm?",
        answers: [
            "A series of logical instructions to solve a problem",
            "A type of medical equipment",
            "A programming language",
            "A database system"
        ],
        correct: 0
    },
    {
        question: "Which type of algorithm requires human intervention to define features?",
        answers: [
            "Deep Learning",
            "Machine Learning",
            "Both equally",
            "Neither"
        ],
        correct: 1
    },
    {
        question: "What is the main advantage of deep learning over machine learning?",
        answers: [
            "It's faster",
            "It's cheaper",
            "It autonomously extracts relevant patterns from data",
            "It requires less data"
        ],
        correct: 2
    },
    {
        question: "What can machine learning algorithms analyze to detect early signs of cancer?",
        answers: [
            "Blood samples only",
            "X-ray and MRI images",
            "Patient interviews",
            "Medical bills"
        ],
        correct: 1
    },
    {
        question: "What is Sybil?",
        answers: [
            "A type of cancer",
            "A medical device",
            "An algorithm to predict lung cancer risk",
            "A hospital name"
        ],
        correct: 2
    },
    {
        question: "What is the accuracy rate of Sybil in predicting lung cancer risk?",
        answers: [
            "Up to 75%",
            "Up to 85%",
            "Up to 94%",
            "Up to 99%"
        ],
        correct: 2
    },
    {
        question: "Who developed the Sybil algorithm?",
        answers: [
            "Stanford University",
            "Harvard Medical School",
            "Massachusetts General Hospital and MIT",
            "Johns Hopkins University"
        ],
        correct: 2
    },
    {
        question: "What type of medical data can AI analyze for cancer prevention?",
        answers: [
            "Medical records only",
            "Lifestyle habits only",
            "Genetic information only",
            "All of the above"
        ],
        correct: 3
    },
    {
        question: "What is one of the main challenges of using AI in medicine?",
        answers: [
            "It's too expensive",
            "Need for large, high-quality datasets",
            "Doctors don't want to use it",
            "It's too slow"
        ],
        correct: 1
    },
    {
        question: "How do algorithms help in cancer prevention?",
        answers: [
            "By replacing doctors",
            "By analyzing data to assess individual cancer risks",
            "By performing surgeries",
            "By creating new medications"
        ],
        correct: 1
    }
];

// Quiz State
let currentQuestionIndex = 0;
let score = 0;
let answeredQuestions = 0;

// DOM Elements
const questionText = document.getElementById('questionText');
const questionNum = document.getElementById('questionNum');
const currentQuestion = document.getElementById('currentQuestion');
const answersGrid = document.getElementById('answersGrid');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const progressFill = document.getElementById('progressFill');
const progressPercent = document.getElementById('progressPercent');
const scoreDisplay = document.getElementById('score');
const quizContent = document.getElementById('quizContent');
const resultsScreen = document.getElementById('resultsScreen');
const retryBtn = document.getElementById('retryBtn');

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answeredQuestions = 0;
    quizContent.style.display = 'block';
    resultsScreen.style.display = 'none';
    updateScore();
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];

    // Update question text and number
    questionText.textContent = question.question;
    questionNum.textContent = currentQuestionIndex + 1;
    currentQuestion.textContent = currentQuestionIndex + 1;

    // Clear previous answers
    answersGrid.innerHTML = '';
    feedback.classList.remove('show', 'correct', 'wrong');
    nextBtn.style.display = 'none';

    // Create answer options
    const letters = ['A', 'B', 'C', 'D'];
    question.answers.forEach((answer, index) => {
        const answerOption = document.createElement('div');
        answerOption.className = 'answer-option';
        answerOption.innerHTML = `
            <div class="answer-letter">${letters[index]}</div>
            <div class="answer-text">${answer}</div>
        `;
        answerOption.addEventListener('click', () => selectAnswer(index));
        answersGrid.appendChild(answerOption);
    });

    // Update progress
    updateProgress();
}

// Select Answer
function selectAnswer(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const answerOptions = document.querySelectorAll('.answer-option');

    // Disable all options
    answerOptions.forEach(option => option.classList.add('disabled'));

    // Check if correct
    const isCorrect = selectedIndex === question.correct;

    if (isCorrect) {
        score++;
        answerOptions[selectedIndex].classList.add('correct');
        feedback.textContent = '✅ Correct! Well done!';
        feedback.classList.add('show', 'correct');
    } else {
        answerOptions[selectedIndex].classList.add('wrong');
        answerOptions[question.correct].classList.add('correct');
        feedback.textContent = '❌ Wrong! The correct answer is highlighted.';
        feedback.classList.add('show', 'wrong');
    }

    answeredQuestions++;
    updateScore();
    updateProgress();

    // Show next button
    nextBtn.style.display = 'flex';
}

// Next Question
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < quizQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Update Score
function updateScore() {
    scoreDisplay.textContent = score;
}

// Update Progress
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressFill.style.width = progress + '%';
    progressPercent.textContent = Math.round(progress);
}

// Show Results
function showResults() {
    quizContent.style.display = 'none';
    resultsScreen.style.display = 'block';

    const percentage = Math.round((score / quizQuestions.length) * 100);
    const correctAnswers = score;
    const wrongAnswers = quizQuestions.length - score;

    // Update results
    document.getElementById('finalScore').textContent = score;
    document.getElementById('correctAnswers').textContent = correctAnswers;
    document.getElementById('wrongAnswers').textContent = wrongAnswers;
    document.getElementById('percentage').textContent = percentage + '%';

    // Update icon and message based on score
    const resultsIcon = document.getElementById('resultsIcon');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsMessage = document.getElementById('resultsMessage');

    if (percentage >= 90) {
        resultsIcon.textContent = '🏆';
        resultsTitle.textContent = 'Outstanding!';
        resultsMessage.textContent = 'Excellent work! You have a great understanding of algorithms in medicine. You\'re ready to explore more advanced topics!';
    } else if (percentage >= 70) {
        resultsIcon.textContent = '🎉';
        resultsTitle.textContent = 'Great Job!';
        resultsMessage.textContent = 'Well done! You have a solid grasp of the concepts. Review the articles to strengthen your knowledge even more.';
    } else if (percentage >= 50) {
        resultsIcon.textContent = '👍';
        resultsTitle.textContent = 'Good Effort!';
        resultsMessage.textContent = 'Not bad! You\'re on the right track. Take some time to review the articles and try again to improve your score.';
    } else {
        resultsIcon.textContent = '📚';
        resultsTitle.textContent = 'Keep Learning!';
        resultsMessage.textContent = 'Don\'t worry! Learning takes time. Review the articles carefully and try the quiz again. You\'ll do better next time!';
    }
}

// Event Listeners
nextBtn.addEventListener('click', nextQuestion);
retryBtn.addEventListener('click', initQuiz);

// Initialize quiz on page load
initQuiz();
