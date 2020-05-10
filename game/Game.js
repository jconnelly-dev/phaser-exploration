GameBoard.Game = function(game) {
    this.walkWay;
    this.enemyMaxBoundsY;
    
    this.charStartX;
    this.charStartY;
    this.xBoaderLength;
    this.yBoaderLength;
    
    this.burst;
    this.totalBunnies;
    this.bunnyGroup;
};

GameBoard.Game.prototype = {
    
    create: function() {
        this.walkWay = 367;   
        this.enemyMaxBoundsY = 320;
        
        this.charStartX = 35;
        this.charStartY = this.walkWay;
        this.xBoaderLength = 50;
        this.yBoaderLength = 60;
        
        this.totalBunnies = 20;
        this.buildWorld();
    },
    
    buildWorld: function() {
        this.add.image(0, 0, 'landscape');
        this.add.image(this.charStartX, this.charStartY, 'character');
        this.buildBunnies();
        this.buildEmitter();
    },
    
    buildBunnies: function() {
        this.bunnygroup = this.add.group(); // define that this variable is a now a phasor group.
        this.bunnygroup.enableBody = true; // allows group to interact w/other objects using physics engine.
        for (var i = 0; i < this.totalBunnies; i++) {
            var randX = this.rnd.integerInRange(this.xBoaderLength, this.world.width - 50);
            var randY = this.rnd.integerInRange(this.yBoaderLength, this.enemyMaxBoundsY);
            var enemy = this.bunnygroup.create(randX, randY, 'bunny', 'Bunny0000');
            enemy.anchor.setTo(0.5, 0.5);
            enemy.body.moves = false; // prevent physics engine from controlling the movement.
            enemy.animations.add('Rest', this.game.math.numberArray(1, 58));
            enemy.animations.add('Walk', this.game.math.numberArray(68, 107));
            enemy.animations.play('Rest', 24, true);
            this.assignBunnyMovement(enemy);
        }
    },    
    
    assignBunnyMovement: function(enemy) {
        // Create a random location in the world were the object will move towards.
        var randDestinationX = this.rnd.realInRange(this.xBoaderLength, this.world.width - 50);
        bposition = Math.floor(randDestinationX);
        
        // Create a random delay in which the object will begin moving.
        bdelay = this.rnd.integerInRange(2000, 6000); // 2:6 seconds.
        
        // Face (flip) this object towards the direction of the position its moving towards.
        if (bposition < enemy.x){
            enemy.scale.x = 1;
        } else {
            enemy.scale.x = -1;
        }
        
        // Move along x-axis towards our defined position for 3.5 seconds w/natural movement and random delay.
        t = this.add.tween(enemy).to({ x : bposition }, 3500, Phaser.Easing.Quadratic.InOut, true, bdelay);
        
        t.onStart.add(this.startBunny, this); // NOTE: "this" is the 'enemy' object here.
        t.onComplete.add(this.stopBunny, this);
    },
    
    startBunny: function(enemy) {
        enemy.animations.stop('Rest');
        enemy.animations.play('Walk', 24, true);
    },
    
    stopBunny: function(enemy) {
        enemy.animations.stop('Walk');
        enemy.animations.play('Rest', 24, true);
        
        // Once this object has reached its destination, create a new one.
        this.assignBunnyMovement(enemy);
    },    
    
    buildEmitter:function() {
        // Use the burst image we preloaded as a phasor emitter object.
        this.burst = this.add.emitter(0, 0, 40); // # of objects to hold in emitter.
        this.burst.minParticleScale = 0.3;
        this.burst.maxParticleScale = 1.2;
        this.burst.minParticleSpeed.setTo(-30, 30); // create burst effect.
        this.burst.maxParticleSpeed.setTo(30, -30);
        this.burst.makeParticles('explosion');
        this.input.onDown.add(this.fireBurst, this); // associate click/touch with function.
    },
    
    fireBurst: function(clickLocation) {
        this.burst.emitX = clickLocation.x;
        this.burst.emitY = clickLocation.y;
        
        var numParticlesPerBurst = 20;
        var particleLifeTime = 100; // milisecond.
        
        // Explode some number of particles to the screen for some duration for every burst event.
        this.burst.start(true, particleLifeTime, null, numParticlesPerBurst);
        
        /*
         * We can think about the emitter as the number of bullets on the screen at any given time.
         *  the burst.start() will define how many bullets are release to the screen per click/fire.
         */        
    },    
    
    update: function() {}
}