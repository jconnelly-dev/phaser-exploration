GameBoard.Game = function(game) {};

GameBoard.Game.prototype = {
    
    create: function() {
        this.buildWorld();
    },
    
    buildWorld: function() {
        this.add.image(0, 0, 'landscape');
        this.add.image(35, 367, 'character');
    },
    
    update: function() {}
}