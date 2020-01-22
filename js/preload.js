var preloadState = function (game) {

};

preloadState.prototype = {

    init: function () {
        this.add.sprite(0, 0, "preloader_bg");

        var loadingbar_bg = this.add.sprite(this.world.centerX - 347 * 0.5, this.world.centerY, "loadingbar_bg");
        loadingbar_bg.anchor.set(0, 0.5);
        loadingbar_bg.width = 347;

        this.loadingbar = this.add.sprite(this.world.centerX - 347 * 0.5, this.world.centerY, "loadingbar");
        this.loadingbar.anchor.set(0, 0.5);

        this.loadingbar.scale.x = 0;

    },
    preload: function () {
        var d = new Date();
        var t = d.getTime();


        //title screen

        this.load.image('title', 'assets/title.jpg?v=' + t);
        this.load.image('playButton', 'assets/play.png?v=' + t);
        this.load.image('tap', 'assets/tap.jpg?v=' + t);

        //instruction screen

        this.load.image('instructions', 'assets/instructions.jpg?v=' + t);
        this.load.image('start', 'assets/start.png?v=' + t);

        //name enter screen

        this.load.image('namebg', 'assets/namebg.jpg?v=' + t);

        //game screen

        this.load.image('bg', 'assets/bg.jpg?v=' + t);
        this.load.image('planet', 'assets/planet.png?v=' + t);
        this.load.image('helpbutton', 'assets/helpbutton.png?v=' + t);
        this.load.image('exit', 'assets/exit.png?v=' + t);
        this.load.atlasJSONHash('elements', 'assets/spritesheets/elements.png?v=' + t, 'assets/spritesheets/elements.json?v=' + t);

        //game over


        this.load.image('gameoverbg', 'assets/gameoverbg.jpg?v=' + t);
        this.load.image('retry', 'assets/retry.png?v=' + t);

        this.load.image('leaderboardbutton', 'assets/leaderboardbutton.png?v=' + t);

        // leaderboard screen

        this.load.image('leaderboardbg', 'assets/leaderboardbg.jpg?v=' + t);


        //common

        this.load.audio('click', 'assets/audio/cloud_click.wav?v=' + t);
        this.load.image('sound_off', 'assets/sound_off.png?v=' + t);
        this.load.image('sound_on', 'assets/sound_on.png?v=' + t);

        this.load.image('enter_fullscreen', 'assets/enter_fullscreen.png?v=' + t);
        this.load.image('exit_fullscreen', 'assets/exit_fullscreen.png?v=' + t);

        //keyboard

        this.load.image('keybd', 'images/keyboardbg_03.png');
        this.load.image('keyimg', 'images/key_06.png');
        this.load.image('upimg', 'images/up_07.png');
        this.load.image('downimg', 'images/down_07.png');

        this.load.image('backimg', 'images/backspace_09.png');
        this.load.image('numimg', 'images/123_07.png');
        this.load.image('abcimg', 'images/abc_13.png');

        this.load.image('enterimg', 'images/enter_14.png');
        this.load.image('spaceimg', 'images/space_15.png');
        this.load.image('closeimg', 'images/close_03.png');


    },
    loadUpdate() {
        var per = this.load.progress * 0.01;
        this.loadingbar.scale.x = per;
    },
    create: function () {
        this.state.start('menu'); //leaderBoard    
    }

};
