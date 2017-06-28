function Student() {
  this.direction = "left";
  this.body = [
    { row: 47, column: 24 }
  ];
}



function Item (){
  this.position =
    {row: 0, column: Math.floor(Math.random() * 50)};
}


Student.prototype.move = function () {
  var head = this.body[0];

  switch (this.direction) {
    case "left":
    this.body.unshift({
      row: head.row,
      column: (head.column - 1 )
    });
      break;

      case "right":
      this.body.unshift({
        row: head.row,
        column: (head.column + 1)
      });
    break;
  }
  this.body.pop();
};

Item.prototype.move = function () {
  this.position.row =  this.position.row + 1;
};


Game.prototype.checkPosition = function(){
  var itemCurrentPosition = this.item.position;
  var studentCurrentPosition = this.student.body[0];

  if(itemCurrentPosition.row === studentCurrentPosition.row &&
     itemCurrentPosition.column === studentCurrentPosition.column){
    console.log("Picked");
  } else {
    console.log("Not yet");
  }

};

Student.prototype.goLeft = function() {
   if (this.direction === 'left' || this.direction === 'right') {
     this.direction = 'left';
   }
 };

 Student.prototype.goRight = function() {
   if (this.direction === 'right' || this.direction === 'left') {
     this.direction = 'right';
   }
 };

// Game.prototype.buclee = function(){
//   var i = 0;
// var intervalId = setInterval(function () {
//   console.log(i);
//   console.log("do something");
//   i++;
//
//   if (i > 10) {
//     clearInterval(intervalId);
//   }
// }.bind(this), 1000);
// };


function Game() {
  this.student = new Student();
  this.items = []
  // this.colection = [];

   for (var row = 0; row < 50; row++) {
     for (var col = 0; col < 50; col++) {
       $('.container').append($('<div>')
          .addClass('cell')
          .attr('data-row', row)
          .attr('data-col', col)
        );
     }
   }
   this.drawItem();
   this.drawStudent();
   this.assignControlsToKeys();
  //  this.buclee();
  // this.generatorItem();
 }

//  Game.prototype.generatorItem = function () {
//
//    var i = this.drawItem();
//    var intervalId = setInterval(function () {
//      console.log(i);
//
//      i++;
//
//      if (i > 10) {
//        clearInterval(intervalId);
//      }
//    }, 1000);
// };
Game.prototype.drawStudent = function() {
     this.student.body.forEach(function(position, index) {
       var selector = '[data-row=' + position.row + ']' +
                      '[data-col=' + position.column + ']';

      $(selector).addClass('student');
    });
  };

Game.prototype.drawItem = function() {




    this.items.forEach(function(item, index) {
    var selector = '[data-row=' + item.position.row + ']' +
                   '[data-col=' + item.position.column + ']';
      $(selector).addClass('item');
    });
  };

Game.prototype.clearStudent = function() {
   $('.student').removeClass('student'); };

Game.prototype.clearItem = function() {
      $('.item').removeClass('item'); };

 Game.prototype.start = function() {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.update.bind(this), 1000);
    }
  };

 Game.prototype.update = function() {
   var item = new Item();
   if(this.items.length === 0) this.items.push(item);

   var counter = 0;

   this.start = function(){
     var item = this.items[counter];
     if(item.position.row > 45){
       console.log("El item ha pasado la fila 45");
       this.checkPosition();
     }
     item.move();
     this.student.move();
     this.clearStudent();
     this.clearItem();
     this.drawStudent();
     this.drawItem();

     if (counter < this.items.length) {
       this.start();
     }

   }.bind(this);

   this.start();
 };

 Game.prototype.stop = function() {
    if (this.intervalId) {
     clearInterval(this.intervalId);
      this.intervalId = undefined;
   }
  };

 Game.prototype.assignControlsToKeys = function() {
   $('body').on('keydown', function(e) {
     switch (e.keyCode) {
       case 37: // arrow left
         this.student.goLeft();
        break;
       case 39: // arrow right
          this.student.goRight();
          break;
      case 65: // A goes left
        this.student.goLeft();
      break;
      case 68: // D goes right
        this.student.goRight();
        break;
       case 32: // p pause
            if (this.intervalId) {
            this.stop();
           } else {
            this.start();
          }
            break;
     }
   }.bind(this));
 };




var game;
 $(document).ready(function() {
   game = new Game();
   game.start();
  });
