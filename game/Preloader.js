GameBoard.Preloader = function(game) {
    //this.preloadBar = null;
    //this.titleText = null;
    this.ready = false;
};

GameBoard.Preloader.prototype = {
	
	preload: function () {
		//this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		//this.preloadBar.anchor.setTo(0.5, 0.5);
		//this.load.setPreloadSprite(this.preloadBar);
		
        //this.titleText = this.add.image(this.world.centerX, this.world.centerY-220, 'titleimage');
		//this.titleText.anchor.setTo(0.5, 0.5);        
        
        this.load.bitmapFont('eightbitwonder', 'fonts/eightbitwonder.png', 'fonts/eightbitwonder.fnt');
        this.load.image('background', 'images/star_background.png');
        this.load.image('title', 'images/title_circle.png');
        this.load.image('landscape', 'images/landscape-background.png');
        this.load.image('character', 'images/cyb_guy.gif');
        
        this.load.atlasXML('bunny', 'images/spritesheets/bunny.png', 'images/spritesheets/bunny.xml');
        this.load.image('explosion', 'images/explosion.png');
	},

	create: function () {
		//this.preloadBar.cropEnabled = false;
	},

	update: function () {
	   	this.ready = true;
        this.state.start('StartMenu');
	}
};