class Quiz {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background("#FFFACC");
  
    //write code to show a heading for showing the result of Quiz
    fill("black");
    textSize(28);
    text("Result of the quiz", 350, 50)
    text(".................................", 330, 65)

    //call getContestantInfo( ) here
     Contestant.getPlayerInfo();

    //write code to add a note here
    if(allContestants !== undefined){
      var display_answers = 240;
      fill("blue");
      textSize(20);
      text("NOTE: Contestants who answered correct are highlighted in green!", 140, 240)
    }

    //write code to highlight contest who answered correctly
    for(var plr in allContestants){
      var correctAns = "2";
      if(correctAns === allContestants[plr].answer)
      fill("green")
      else
      fill("red");
      display_answers += 30;
        textSize(20);
        text(allContestants[plr].name + ": " + allContestants[plr].answer, 150, display_answers);
    }
  }

}
