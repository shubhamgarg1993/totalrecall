var nameState = function (game) {

};




nameState.prototype = {


    //  let count = 0;
    create: function () {

        this.click_sound = this.add.sound("click");
        this.sound.setDecodedCallback([this.click_sound], this.setScreen, this);

    },
    setScreen: function () {

        this.add.image(0, 0, "namebg");

        var button = this.add.button(this.world.centerX + 42, 812, 'start', this.onStartClick, this);
        button.anchor.set(0.5, 0.5);

        var inputStyle = {
            font: '42px Arial',
            fill: '#ffffff',
            // backgroundColor: '#1b0a2e',
            fillAlpha: 0,
            fontWeight: 'bold',
            width: 990,
            height: 93,
            marginLeft: '10px',
            borderRadius: 50,
            padding: "100px",
            placeHolderColor: '#ffffff',
            placeHolder: 'Write your name here'
        }

        // this.input = this.add.inputField(510, 475, inputStyle);
        this.input = game.add.text(510, 475, "Enter Name", inputStyle);

        var style = {
            font: "bold 30px Arial",
            fill: "#ff0000",
            boundsAlignH: "center",
            boundsAlignV: "middle"
        };

        this.warningText = game.add.text(this.world.centerX, this.world.centerY + 50, "Please enter name", style);
        this.warningText.anchor.set(0.5);
        this.warningText.visible = false;
        this.input.inputEnabled = true;
        this.input.input.useHandCursor = true;

        this.input.events.onInputDown.add(this.onInputFieldClick, this);
        this.game.inputSet = this.input;
        button.alpha = 0;

        this.addUI();

    },
    onInputFieldClick: function () {
        this.keycount = 0;
        this.game.inputName = [];

        this.keybdgroup = this.game.add.group();

        this.game.keybdgroup = this.keybdgroup;

        let kb = this.add.image(this.world.centerX, this.world._height, "keybd");
        kb.anchor.set(0.5, 1)
        this.keybdgroup.add(kb)

        // let keyWidth = game.cache.getImage('keyimg').width;
        let keySpacing = 10
        let key = this.add.image(200 + 50, this.world._height - kb.height + 40, 'keyimg')
        this.addkeyText(key, "", this.keybdgroup);
        //this.keybdgroup.add(key)

        for (let i = 0; i < 9; i++) {
            key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 40, 'keyimg')
            this.addkeyText(key, "", this.keybdgroup);
            //   this.keybdgroup.add(key)
        }

        let closeKbKey = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 40, 'closeimg')
        this.addFunctionKey(closeKbKey, 'close')

        key = this.add.image(250 + 50, this.world._height - kb.height + 140, 'keyimg')
        this.addkeyText(key, "", this.keybdgroup);
        // this.keybdgroup.add(key)

        for (let i = 0; i < 8; i++) {
            key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 140, 'keyimg')
            this.addkeyText(key, "A", this.keybdgroup);

            //  this.keybdgroup.add(key)
        }

        key = this.add.image(200 + 50, this.world._height - kb.height + 240, 'upimg')
        this.addFunctionKey(key, 'up')
        this.upKey = key;

        key = this.add.image(200 + 50, this.world._height - kb.height + 240, 'downimg')
        this.addFunctionKey(key, 'down')
        key.visble = false;
        this.downKey = key;

        for (let i = 0; i < 7; i++) {
            key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 240, 'keyimg')
            this.addkeyText(key, "", this.keybdgroup);

            //this.keybdgroup.add(key)
        }
        key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 240, 'backimg')
        this.addFunctionKey(key, 'back')

        key = this.add.image(200 + 50, this.world._height - kb.height + 340, 'numimg')
        this.addFunctionKey(key, 'num')

        //this.keybdgroup.add(key)

        key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 340, 'keyimg')
        this.addkeyText(key, "", this.keybdgroup);
        //  this.keybdgroup.add(key)

        key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 340, 'spaceimg')
        this.addFunctionKey(key, 'space')

        /*key.name = 'space';
        key.inputEnabled = true;
        key.input.useHandCursor=true
        key.events.onInputDown.add(this.onItemClick, this);

        this.keybdgroup.add(key)*/

        key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 340, 'keyimg')
        this.addkeyText(key, "", this.keybdgroup);
        //  this.keybdgroup.add(key)

        key = this.add.image(key.x + key.width + keySpacing, this.world._height - kb.height + 340, 'enterimg')
        this.addFunctionKey(key, 'enter')

        //  this.keybdgroup.add(key)


        this.warningText.visible = false;
    },
    addUI: function () {
        // this.fullScreenButton = this.add.button(1850,50,"enter_fullscreen",this.enterFullScreen,this); 
        // this.exitFullScreenButton = this.add.button(1850,50,"exit_fullscreen",this.exitFullScreen,this); 
        // this.fullScreenButton.anchor.set(0.5);
        // this.exitFullScreenButton.anchor.set(0.5);
        // this.exitFullScreenButton.visible = false;

        this.soundOnButton = this.add.button(1850, 1020, "sound_on", this.soundOn, this); //1720
        this.soundOffButton = this.add.button(1850, 1020, "sound_off", this.soundOff, this); //1720

        this.soundOnButton.anchor.set(0.5);
        this.soundOffButton.anchor.set(0.5);
        this.soundOffButton.visible = false;

        if (Global.soundOnFlag === false) {
            this.soundOffButton.visible = true;
            this.soundOnButton.visible = false;
        } else {
            this.soundOffButton.visible = false;
            this.soundOnButton.visible = true;
        }
        //      
        //    if(Global.fullScreenMode === true) {
        //      this.fullScreenButton.visible = false;
        //      this.exitFullScreenButton.visible = true;
        //    }
        //    else {
        //      this.fullScreenButton.visible = true;
        //      this.exitFullScreenButton.visible = false;
        //    }

    },
    soundOn: function () {
        this.soundOffButton.visible = true;
        this.soundOnButton.visible = false;

        Global.soundOnFlag = false;
    },
    soundOff: function () {

        this.soundOffButton.visible = false;
        this.soundOnButton.visible = true;

        Global.soundOnFlag = true;

        this.playSound("click");
    },
    enterFullScreen: function () {
        this.playSound("click");

        this.fullScreenButton.visible = false;
        this.exitFullScreenButton.visible = true;

        Global.fullScreenMode = true;

        this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        this.game.scale.startFullScreen(false);
    },
    exitFullScreen: function () {
        this.playSound("click");

        this.game.scale.stopFullScreen();

        this.fullScreenButton.visible = true;
        this.exitFullScreenButton.visible = false;

        Global.fullScreenMode = false;

    },
    onStartClick: function () {
        this.playSound("click");

        console.log(this.input)
        var str = this.input.text;

        if (str === "" || str === "Enter Name") {
            this.warningText.visible = true;
        } else {

            Global.userName = str;
            this.state.start("game"); //game
        }

    },

    playSound: function (str) {
        if (Global.soundOnFlag === false) {
            return;
        }

        if (str == "click") {
            this.click_sound.play();
        }
    },
    update: function () {
        this.input.update();
    },
    addFunctionKey(key, task) {
        key.inputEnabled = true;
        key.input.useHandCursor = true;
        key.name = task;
        key.events.onInputDown.add(this.onItemClick, this);
        this.keybdgroup.add(key)
    },

    addkeyText(key) {
        let keyAr = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
                        'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
                        'Z', 'X', 'C', 'V', 'B', 'N', 'M', ',', '.'];
        let keyArL = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p',
                        'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l',
                        'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.'];

        var style = {
            font: '42px Arial',
            fill: "#000000",
        };
        key.name = keyAr[this.keycount];
        console.log(key.name)
        let tt = game.add.text(key.x + key.width / 3, key.y + key.height / 4, this.UpperKeyboard ? keyAr[this.keycount++] : keyArL[this.keycount++], style);
        this.keybdgroup.add(key)
        this.keybdgroup.add(tt);
        key.inputEnabled = true;
        key.input.useHandCursor = true;

        key.events.onInputDown.add(this.onItemClick, key);

    },
    onItemClick(key) {


        if (key.name == 'up') {
            this.UpperKeyboard = true;
            this.downKey.visibility = true;
            this.upKey.visble = false;
            return;
        }

        if (key.name == 'down') {
            this.UpperKeyboard = false;
            this.downKey.visibility = false;
            this.upKey.visble = true;

        }

        if (key.name == 'space') {


            this.game.inputName.push(" ");
            let name = "";
            for (let i = 0; i < this.game.inputName.length; i++) {
                name += this.game.inputName[i];
            }
            this.game.inputSet.setText(name)
            return;
        }

        if (key.name == 'close') {
            this.keybdgroup.visible = false;
            return;

        }

        if (key.name == 'back') {


            this.game.inputName.pop(key.name);
            let name = "";
            for (let i = 0; i < this.game.inputName.length; i++) {
                name += this.game.inputName[i];
            }
            this.game.inputSet.setText(name)
            return;
        }

        if (key.name) {
            console.log(key.name);
            this.game.inputName.push(key.name);
            let name = "";
            for (let i = 0; i < this.game.inputName.length; i++) {
                name += this.game.inputName[i];
            }
            this.game.inputSet.setText(name)
            return;
        }
    }

};
