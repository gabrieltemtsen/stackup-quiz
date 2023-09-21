
const questions = [
  {
  questionText: "What is StackUp?",
  options: [ "A social media platform for developers","A learn-to-earn platform for Web3", "A code repository for open source projects"],
  correctOptionIndex: 1,
  },
  {
  questionText: "What rewards can you earn on StackUp?",
  options: [ "NFTs", "Access to exclusive events","Cryptocurrency",],
  correctOptionIndex: 2,
  },
  {
  questionText: "What languages does StackUp offer courses in?",
  options: ["Ruby", "Javascript", "Golang",],
  correctOptionIndex: 1,
  },
  {
  questionText: "How can you earn experience points (EXP) on StackUp?",
  options: ["Completing courses", "Completing campaigns","Completing quests", ],
  correctOptionIndex: 2,
  },
  {
  questionText: "What are the benefits of using StackUp?",
  options: ["Connect with other developers and learn from each other","Learn from experts in the field of playing", "Earn Money for enjoyment"],
  correctOptionIndex: 0,
  },
  {
  questionText: "What is the community on StackUp like?",
  options: ["Large", "Diverse", "Active"],
  correctOptionIndex: 1,
  },
  {
  questionText: "What is the future of StackUp?",
  options: ["To be the leading learn-to-earn platform for Web3", "Not to expand the number of courses and languages offered", "only To partner with more projects and companies in the Web3 space", ],
  correctOptionIndex: 0,
  },
  {
  questionText: "What are the prerequisites for joining StackUp?",
  options: ["None, Just have a PC", "A basic understanding of programming with a PC", "A basic understanding of Web3 and a PC"],
  correctOptionIndex: 0,
  },
  {
  questionText: "What is the best way to get started on StackUp?",
  options: ["Browse the courses and choose one that interests you", "Complete the onboarding quests", "Join the community and ask questions"],
  correctOptionIndex: 2,
  },
  {
  questionText: "What are some tips for success on StackUp?",
  options: ["Be absolutely not consistent with your learning", "You be afraid to ask for help", "Participate in the community","All of the options",],
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
      this.alert = document.getElementById('alert')
      this.indicator = document.getElementById('indicator')

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
        this.indicator.textContent = 'Result'
        if(this.score / this.questions.length == 1) {
          this.alert.classList.remove('visually-hidden')
          

        }
        
        setTimeout(() => {
          this.alert.classList.add('hidden')

            

        }, 2000)
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