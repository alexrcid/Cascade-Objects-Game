function Student() {
  this.direction = "left";
  this.body = [
    { row: 47, column: 24 },

  ];
}

function Item (){

  this.bodyItem = generateItem();
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
  var head = generateItem();

    this.bodyItem.unshift({
      row: (head.row + 1),
      column: head.column
    });

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
  this.item = undefined;

   for (var row = 0; row < 50; row++) {
     for (var col = 0; col < 50; col++) {
       $('.container').append($('<div>')
          .addClass('cell')
          .attr('data-row', row)
          .attr('data-col', col)
        );
     }
   }
   this.generateItem();
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


  Game.prototype.clearStudent = function() {
   $('.student').removeClass('student');
 };

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
   this.student.move();
   this.clearStudent();
   this.drawStudent();
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

 Game.prototype.generateItem = function() {
   do {
     this.item = {
       row: [0],
       column:  Math.floor(Math.random() * 50)
     };
   } while (this.student.collidesWith(this.item));
 };

 Game.prototype.drawItem = function() {
   var selector = '[data-row=' + this.item.row + ']' +
                  '[data-col=' + this.item.column + ']';
   $(selector).addClass('item');
 };



var game;
 $(document).ready(function() {
   game = new Game();
   game.start();
  });
