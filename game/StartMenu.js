GameBoard.StartMenu = function(game) {
    this.startBG;
    this.startTitle;
    this.startPrompt;
    this.ding;
}

GameBoard.StartMenu.prototype = {
	
	create: function () {  
        startBG = this.add.image(0, 0, 'background');
		startBG.inputEnabled = true;
		startBG.events.onInputDown.addOnce(this.startGame, this);
		
		startTitle = this.add.image(15, 0, 'title');
		startTitle.inputEnabled = true;
		startTitle.events.onInputDown.addOnce(this.startGame, this);
        
		startPrompt = this.add.bitmapText(this.world.centerX - 155, this.world.centerY + 250, 'eightbitwonder', 'Click to Start', 24);
        startPrompt.tint = 0xECEB5F;

        this.ding = this.add.audio('select_audio');
        this.ding.volume = 0.2;        
	},

	startGame: function (pointer) {
        //this.ding.resume();
        this.ding.play();
		this.state.start('Game');      
	}
};