
const questions = [
    {
      questionText: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctOptionIndex: 2,
    },
    {
      questionText: "Which planet is known as the Red Planet?",
      options: ["Earth", "Venus", "Mars", "Jupiter"],
      correctOptionIndex: 2,
    },
    {
        questionText: "What Planet are you in",
        options: ["Earth", "Venus", "Mars", "Jupiter"],
        correctOptionIndex: 2,
      },
  ];
  
  function delay(callback, milliseconds) {
    setTimeout(callback, milliseconds);
  }

class Quiz {
    constructor() {
      this.questionTextElement = document.getElementById('question-text');
      this.answerButtons = document.querySelectorAll('.answer-option');
      this.scoreElement = document.getElementById('score');
      this.nextButton = document.getElementById('next-button');
      this.loader = document.getElementById('loader');
      this.questId = document.getElementById('quest-id');

      this.questions = [];
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.answerClicked = false; 
  
      this.loadQuestionsFromJSON();
      this.attachEventListeners();
    }
  
    async loadQuestionsFromJSON() {
      try {
        
        const response = questions
       
        const data =  response;
       
        this.questions = data;
        this.showQuestion();
      } catch (error) {
        console.error('Error loading questions:', error);
      }
    }
  //spinner-border 
    
    showQuestion() {
        switch (this.currentQuestionIndex < this.questions.length) {
          case true:
            const currentQuestion = this.questions[this.currentQuestionIndex];

            this.questionTextElement.textContent = currentQuestion.questionText;
           
            this.answerButtons.forEach((button, index) => {
                
              button.textContent = currentQuestion.options[index];
              button.disabled = false;
              this.answerClicked = false;

              
            });

            if(this.currentQuestionIndex > 0){
                this.nextButton.innerText = 'Prev'
            }
            
            this.nextButton.classList.add('hidden');
            break;
          case false:
            this.displayQuizResult();
            break;
            default:
                document.getElementById('question-text').innerHTML = ' Please restart the Quiz';
          break;
        }
      }
  
    
    checkAnswer(selectedIndex) {
        if (this.answerClicked) {
            return; // Exit if an answer was already clicked
          }
        const currentQuestion = this.questions[this.currentQuestionIndex];
        if (selectedIndex === currentQuestion.correctOptionIndex) {
          this.score++;
        }

        // Disable answer buttons while waiting
        this.answerButtons.forEach(button => {
            button.disabled = true;
        });
       
        this.answerClicked = true; // Set the flag to true
        // this.scoreElement.textContent = this.score;
        this.loader.classList.add('spinner-border');
        setTimeout(() => {
            this.currentQuestionIndex++;
            this.questId.innerText = ("Q",this.currentQuestionIndex + 1);

            this.showQuestion();
            this.loader.classList.remove('spinner-border');

          }, 2000); // Wait for 5 seconds (2000 milliseconds) before showing the next question
        
        
      }
    
      displayQuizResult() {
        this.questionTextElement.textContent = 'Quiz complete! Your score: ' + this.score + '/' + this.questions.length;
        this.answerButtons.forEach(button => button.classList.add('hidden'));
        this.nextButton.classList.remove('hidden');
        this.nextButton.textContent = 'Restart Quiz';
      }
    
      restartQuiz() {
        this.currentQuestionIndex = 0;
        this.score = 0;
        this.showQuestion();
      }
    
      attachEventListeners() {
        this.answerButtons.forEach((button, index) => {
          button.addEventListener('click', () => this.checkAnswer(index));
        });
        this.nextButton.addEventListener('click', () => this.restartQuiz());
      }
    }
    
    // Create an instance of the Quiz class when the page loads
    window.addEventListener('load', () => {
      const quiz = new Quiz();
    });