var GameBoard = {};

GameBoard.Boot = function(game) {};

GameBoard.Boot.prototype = {
    preload: function() {
        //this.load.image('background', 'images/stars.png');
        //this.load.image('title', 'images/title_circle.png');
    },
    
    create: function() {
        this.input.maxPointers = 1; // only one cursor
		this.stage.disableVisibilityChange = false; // pause game on tab change
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.scale.minWidth = 350;//270;
		this.scale.minHeight = 450;//480;
		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;
		this.stage.forcePortrait = true;
		this.scale.setScreenSize(true); // true will force screen resize no matter what

		this.input.addPointer(); // cooresponding to the one cursor we defined above
		this.stage.backgroundColor = '#171642';
        
        this.state.start('Preloader');
    }
}