GameBoard.Game = function(game) {
    this.totalBunnies;
    this.bunnyGroup;
};

GameBoard.Game.prototype = {
    
    create: function() {
        this.totalBunnies = 20;
        this.buildWorld();
    },
    
    buildWorld: function() {
        this.add.image(0, 0, 'landscape');
        this.add.image(35, 367, 'character');
        this.buildBunnies();
    },
    
    buildBunnies: function() {
        this.bunnygroup = this.add.group();
        this.bunnygroup.enableBody = true; // allows group to interact w/other objects using physics engine.
        for (var i = 0; i < this.totalBunnies; i++) {
            var randWorldX = this.rnd.integerInRange(-10, this.world.width - 50);
            var randWorldY = this.rnd.integerInRange(this.world.height - 180, this.world.height - 60);
            var b = this.bunnygroup.create(randWorldX, randWorldY, 'bunny', 'Bunny0000');
            b.anchor.setTo(0.5, 0.5);
            b.body.moves = false; // prevent physics engine from controlling the movement.
            b.animations.add('Rest', this.game.math.numberArray(1, 58));
            b.animations.add('Walk', this.game.math.numberArray(68, 107));
            b.animations.play('Rest', 24, true);
        }
    },    
    
    update: function() {}
}