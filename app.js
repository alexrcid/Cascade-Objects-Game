function Student() {
  this.direction = "left";
  this.body = [
    { row: 47, column: 24 }
  ];
}

// function checkScore() {
//   var number1 = this.body.row;
//
//
//   if (number1 === 49) {
//     console.log ("I'm on the bottom");
//   } else {
//     if (number1 === this.body.column) {
//       console.log("I'm scoring");
//     } else {
//       console.log("I'm falling");
//     }
//   }
// }

function Item (){
  this.body = [
    { row: 0, column: Math.floor(Math.random() * 50)}
  ];

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
  console.log('estoy moviendo el objetofg');
  var head = this.body[0];

    this.body.unshift({
      row: (head.row + 1),
      column: head.column
    });

    console.log(this.body);
    console.log('======');

  this.body.pop();
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


function Game() {
  this.student = new Student();
  this.item = new Item();
  //this.checkScore = new CheckScore();

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
 }


 Game.prototype.drawStudent = function() {
     this.student.body.forEach(function(position, index) {
       var selector = '[data-row=' + position.row + ']' +
                      '[data-col=' + position.column + ']';

      $(selector).addClass('student');
    });
  };

  Game.prototype.drawItem = function() {
    this.item.body.forEach(function(position, index) {
    var selector = '[data-row=' + position.row + ']' +
                   '[data-col=' + position.column + ']';
      console.log(selector);
      $(selector).addClass('item');
    });
  };

Game.prototype.clearStudent = function() {
   $('.student').removeClass('student'); };

Game.prototype.clearItem = function() {
      $('.item').removeClass('item'); };

 Student.prototype.collidesWith = function(pos) {
   return this.body.some(function(el) {
     return el.row == pos.row && el.column == pos.column;
   });
 };

 Game.prototype.start = function() {
    if (!this.intervalId) {
      this.intervalId = setInterval(this.update.bind(this), 100);
    }
  };



 Game.prototype.update = function() {
   console.log("ejecutando funcion update");
   this.student.move();
   this.item.move();
   this.clearStudent();
   this.clearItem();
   this.drawStudent();
   this.drawItem();
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
