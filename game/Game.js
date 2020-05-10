GameBoard.Game = function(game) {
    this.walkWay;
    this.enemyMaxBoundsY;
    this.charStartX;
    this.charStartY;
    this.xBoaderLength;
    this.yBoaderLength;
    
    this.enemySpeed;
    this.burst;
    this.totalBunnies;
    this.bunnyGroup;
    this.gameOver;
    this.countDown;
    this.elapsedTime;
    this.timer;
};

GameBoard.Game.prototype = {
    
    create: function() {
        this.gameOver = false;
        this.elapsedTime = 0;
        this.enemySpeed = 3000;
        
        // Create a phasor timer and have it invoke a function every 1 milisecond.
        this.timer = this.time.create(false);
        this.timer.loop(1, this.updateGameTime, this); // "this" is a reference to the new phasor timer we just created.
        
        this.walkWay = 367;   
        this.enemyMaxBoundsY = 320;
        
        this.charStartX = 35;
        this.charStartY = this.walkWay;
        this.xBoaderLength = 50;
        this.yBoaderLength = 60;
        
        this.totalBunnies = 20;
        this.buildWorld();
    },
    
    updateGameTime: function() {
        this.elapsedTime++;
    },
    
    buildWorld: function() {
        this.add.image(0, 0, 'landscape');
        this.add.image(this.charStartX, this.charStartY, 'character');
        this.buildBunnies();
        this.buildEmitter();
        this.countDown = this.add.bitmapText(this.xBoaderLength, this.world.height - 1.5 * this.yBoaderLength, 'eightbitwonder', 'Bunnies Left ' + this.totalBunnies, 20);
        this.timer.start();
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
        bdelay = this.rnd.integerInRange(10, 500); // 10 ms : 0.5 seconds.
        
        // Face (flip) this object towards the direction of the position its moving towards.
        if (bposition < enemy.x){
            enemy.scale.x = 1;
        } else {
            enemy.scale.x = -1;
        }
        
        // Move along x-axis towards our defined position for w/natural movement and random delay.
        t = this.add.tween(enemy).to({ x : bposition }, this.enemySpeed, Phaser.Easing.Quadratic.InOut, true, bdelay);
        
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
    
    buildEmitter: function() {
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
        if (this.gameOver == false) {
            this.burst.emitX = clickLocation.x;
            this.burst.emitY = clickLocation.y;

            var numParticlesPerBurst = 20;
            var particleLifeTime = 100; // milisecond.

            // Explode some number of particles to the screen for some duration for every burst event.
            this.burst.start(true, particleLifeTime, null, numParticlesPerBurst);            
        }
        
        /*
         * We can think about the emitter as the number of bullets on the screen at any given time.
         *  the burst.start() will define how many bullets are release to the screen per click/fire.
         */        
    },
    
    enemyCollision: function(enemy, burst) {
        if (enemy != null && enemy.exists) {
            this.totalBunnies--;
            this.checkBunniesLeft();
            enemy.kill(); // remove sprite.            
        }
    },
    
    checkBunniesLeft: function() {
        this.countDown.setText('Bunnies Left ' + this.totalBunnies);
        if (this.totalBunnies <= 0) {
            this.gameOver = true;
            var miliSeconds = (this.elapsedTime / 100).toFixed(3);
            var gameOverMsg = 'GAME OVER\n\n' + miliSeconds + ' ms';
            this.overmessage = this.add.bitmapText(this.world.centerX - 150, this.walkWay - 250, 'eightbitwonder', gameOverMsg, 35);
            this.overmessage.align = "center";
            this.overmessage.inputEnabled = true; // allows users to click on text.
            this.overmessage.events.onInputDown.addOnce(this.quitGame, this); // invoke function when clicked passing in click position pointer.
        }
    },
    
    quitGame: function() {
        this.state.start('StartMenu');
    },
    
    update: function() {
        // Invoke a function when phasor physicas engine detects collisions between groups.
        this.physics.arcade.overlap(this.bunnygroup, this.burst, this.enemyCollision, null, this); // "this" callback context passes reference to groups @ time of collision.
    }
}