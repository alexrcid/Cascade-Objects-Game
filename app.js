function Game() {
  this.items = [];

   for (var row = 0; row < 50; row++) {
     for (var col = 0; col < 50; col++) {
       $('#board').append($('<div>')
          .addClass('cell')
          .attr('data-row', row)
          .attr('data-col', col)
        );
     }
   }
 }

Game.prototype.createBoard = function(){
  for (var row = 0; row < 50; row++) {
    for (var col = 0; col < 50; col++) {
      $('#board').append($('<div>')
                 .addClass('cell')
                 .attr('data-row', row)
                 .attr('data-col', col)
      );
    }
  }
};

Game.prototype.start = function(){
  this.student = new Student();
  this.student.show();
  this.student.move();
  this.assignControlsToKeys();
  this.createItem();
  this.update();
};


Game.prototype.checkIfStudentCatchTheItem = function(itemCloseToTheStudent){

  if( this.student.position.row  === itemCloseToTheStudent.position.row && this.student.position.col === itemCloseToTheStudent.position.col ){
      console.log(" ================  YEAAAH   =================");
    } else if ( this.student.position.row  === itemCloseToTheStudent.position.row && this.student.position.col-1 === itemCloseToTheStudent.position.col) {
      console.log(" ================  YEAAAH   =================");
    } else if ( this.student.position.row  === itemCloseToTheStudent.position.row && this.student.position.col+1 === itemCloseToTheStudent.position.col) {
      console.log(" ================  YEAAAH   ================= ");
    } else if ( this.student.position.row-1  === itemCloseToTheStudent.position.row && this.student.position.col === itemCloseToTheStudent.position.col) {
      console.log(" ================  YEAAAH   ================= ");
    } else {
      console.log('No collision...   :( ');
  }
};
// Game.prototype.studentCollision = function(){
//
//   var a, b, c;
//   a = this.student.position[1];
//   b = col[0];
//   c = col[50];
//
//   function collisionDetection() {
//   if( a === b){
//     return alert("Its collisioning at left");
//   }else if( a === c){
//     return alert("Its collisioning at right");
//       }
//     }
//   };

Game.prototype.update = function(){
  this.itemInterval = setInterval(this.createItem.bind(this),2000); // Item generation time
  this.interval = setInterval(this.updateItem.bind(this), 80); // Item Speed
};

Game.prototype.collidesWith = function(position) {
  return el.column == position.column;
};

Game.prototype.assignControlsToKeys = function() {
  $(document).on('keydown', function(e) {
    switch (e.keyCode) {
      case 37: // arrow left
        this.student.goLeft();
        break;
      case 39: // arrow right
        this.student.goRight();
        break;
    }
  }.bind(this));
};

Game.prototype.createItem = function(){
  this.items.push(new Item());
};

Game.prototype.updateItem = function(){
  var currentItem;
  for(var i=0; i < this.items.length; i++) {
    currentItem = this.items[i];
    currentItem.move();
    if( currentItem.position.row > 44 && currentItem.position.row < 48){
      this.checkIfStudentCatchTheItem(currentItem);
    } // End if
  } // End for
};

// Student Constructor
function Student() {
  this.direction = "left";
  this.position  = { row: 47, col: 24 };
}

// Student move
Student.prototype.move = function () {
  switch (this.direction) {
    case "left":
      this.position.col -= 1;
      this.show();
      setTimeout(this.move.bind(this), 65);
      break;
    case "right":
      this.position.col += 1;
      this.show();
      setTimeout(this.move.bind(this), 65);
      break;
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

// Show Student in the browser
Student.prototype.show = function() {
  $('.student').removeClass('student');
  var selector = '[data-row=' + this.position.row + ']' +
                 '[data-col=' + this.position.col + ']';

  $(selector).addClass('student');
};

// Item Constructor
function Item (){
  this.position = {row: 0, col: Math.floor(Math.random() * 50)};
}

// Item move
Item.prototype.move = function () {
  this.selector = function(row = this.position.row) {
    return '[data-row=' + row + ']' + '[data-col=' + this.position.col + ']';
  };
  this.position.row = this.position.row + 1;
  $(this.selector(this.position.row - 1)).removeClass('item');
  $(this.selector()).addClass('item');
};


var game;
$(document).ready(function(){
  game = new Game();
  game.start();
});
