//SKETCH 8
//COMPLETED BY: marcos m sierra
///DATE: 11.16.26

nn.on("load", () => {

  // KAPLAY SETUP

  kaplay({

    // button setup

    buttons: {
      moveUp: {
        keyboard: ["up", "w"],
        gamepad: ["dpad-up"],
      },
      moveDown: {
        keyboard: ["down", "s"],
        gamepad: ["dpad-down"],
      },
      moveLeft: {
        keyboard: ["left", "a"],
        gamepad: ["dpad-left"],
      },
      moveRight: {
        keyboard: ["right", "d"],
        gamepad: ["dpad-right"],
      },
    },

    background:[211,211,211]

    // background settings

  });



  // GLOBAL VARIABLES


  const SPEED = 120;
  const JUMP_FORCE = 500;
  const DEADZONE = 0.15;

  let soundEffect;
  let isPlaying = false;
  let bgm;

  let timeLeft = 30;
  let gameScore = 0;

  let spawnSide = "left";




  // SPRITES

  // player sprite

  loadSprite(
    "red", "waste-bin/Red.png"

    // sprite file

    {
    sliceX: 4,
    sliceY: 4,
      anims: {
    forward: {
    from: 6,
    to: 13,
    speed: 10,
    loop: true,
    },
      "left":{
      from: 6,
      to: 13,
      speed: 10,
      loop: true,
      },
     "right":{
      from: 6,
      to: 13,
      speed: 10,
      loop: true,
      },
        back:{
          from: 6,
          to: 13, 
          speed: 10,
          loop: true,
        },
        }
    }

    }
  );

  // idle sprite

  loadSprite(
    "name"

    // sprite file

    {

      // frame animation

    }
  );

  // enemy sprite

  loadSprite("avoid", "waste-bin/avoid.png");

    // enemy file
  );

  // collectible sprite

  loadSprite("collect", "waste-bin/collect.png"); 

    // collectible file
  );



  // AUDIO ASSETS

  loadSound("no", "waste-bin/no.mp3");

    // sound file
  );

  loadSound("yes", "waste-bin/yes.mp3");

    // sound file
  );

  loadMusic("bg", "waste-bin/musics.mp3");

    // music file
  );



  // HELPERS

  function playSoundEffect () {

    if(!isPlaying){
      isPlaying = true;
      
      soundEffect = play ("yes", {volume:0.05,});
      
      soundEffect.onEnd(() => {
        isPlaying = false;
      });
    }// sound logic

  }



  function makePlatform (x, y, w, colorValue) {

    add([
      rect(w, 40),
      area(),
      outline(6),
      pos(x,y),
      body({
        isStatic: true
      }),
      color(colorValue),
      "platform"
      // platform setup

    ]);

  }



  function spawnCollectible () {

    add([
      sprite("collect"),
      pos(rand(0,width()), rand(0,height())),
      scale(rand(0.5, 1.5)),
      rotate(rand(0,65)),
      area(),
      anchor("center"),
      "collect"
      
      // collectible setup

    ]);

  }



  function spawnEnemy () {

    const enemy = add([

      sprite("avoid"),
      pos(rand(100,width()-100),
         rand(100,height()-100)),
      area(),
      anchor("center")
      "avoid"
    ]);

    wait(rand(3,30), () => {
      if(enemy.exist()){
        destroy(enemy);
      }
    })
    // enemy timer

  }



  function spawnEnemyWave () {
const amount = randi(1,4)
    // wave logic
    for(let i = 0, i < amount; i++){
      spawnEnemy();
    }
  }



  // LVL 1 SCENE

  scene("level1", () => {

    setGravity(640);

    let facing = RIGHT;

    const scoreText = add([
text(gameScore.toString(),
    {
  size:24,
}),
      pos(24,24)
      color(BLACK),// score display

    ]);

    const timer = add([
text(timeLeft.toFixed(0)),
      pos(width()-24, 24),
      anchor("topright"),
      color(BLACK)
      // timer display

    ]);



    const player = add([
    sprite("red"),
      pos(center()),
      anchor("center"),
      area(),
      body({
        jumpForce: JUMP_FORCE,
      }),
      doubleJump(), 
      // player setup

    ]);
player.play("forward");


    // LEVEL EXIT

    const levelExit = add([
    rect(10,height()),
      pos(width()-10, 0),
      area(),
      color(GREEN),
      "levelExit",
      // exit setup

    ]);



    // PLATFORMS

    makePlatform(0,height()-24,width(),MAGENTA);
    

      // floor platform

    



    for (let i = 0; i < 5; i++) {

      // random platforms
      makePlatform(
      rand(0, width()-251),
        height() - 150 - (i * 100),
        rand(50,230),
        rgb(rand(0,255),0,rand(0,255))
      );
    }



    // COLLECTIBLES

    for (let i = 0; i < 5; i++) {

      spawnCollectible();

    }

    // collectible loop

loop(5, spawnCollectible);

    // ENEMIES

    spawnEnemyWave();

    // enemy loop

loop(14, spawnEnemyWave);

    // CONTROLS

    onButtonDown("moveRight", () => {

      player.move(SPEED, 0);
      facing = RIGHT;
        playSoundEffect();
      player.play("right");
      

    });



    onButtonDown("moveLeft", () => {

      player.move(-SPEED,0);
      facing = LEFT;
      playSoundEffect();
      player.play("left");

    });



    onButtonDown("moveUp", () => {
      player.doubleJump();
      player.play("forward")

    });



    onButtonDown("moveDown", () => {
    player.move(0, -SPEED)
      player.play("back")
      // move down

    });



    // PROJECTILES

    function shoot () {

      add([

        // projectile setup

      ]);

    }

    // shoot controls



    // CAMERA

    // camera follow



    // TIMER & JOYSTICK (ANALOG) MOVEMENT

    onUpdate(() => {

      // movement logic

      // timer logic

      // win check

      // lose check

    });



    // COLLISIONS

    player.onCollide("collectible", (item) => {

      // collect logic

    });



    player.onCollide("enemy", () => {

      // lose logic

    });



    onCollide("bullet", "enemy", (bullet, enemy) => {

      // projectile collision

    });



    // TRANSITION EFFECT

    const fade = add([

      // fade overlay

    ]);



    player.onCollide("levelExit", () => {

      // level transition

    });

  });



  // LVL 2 SCENE

  scene("level2", () => {

    setGravity(640);

    let facing = RIGHT;



    const scoreText = add([

      // score display

    ]);



    const timer = add([

      // timer display

    ]);



    const player = add([

      // player setup

    ]);



    const returnExit = add([

      // return exit

    ]);



    // PLATFORMS

    makePlatform(

      // floor platform

    );



    // random platforms



    // ENEMIES

    spawnEnemyWave();



    // enemy loop



    // COLLECTIBLES

    spawnCollectible();



    // collectible loop



    // CONTROLS

    // movement controls



    // PROJECTILES

    function shoot () {

      add([

        // projectile setup

      ]);

    }



    // COLLISIONS

    player.onCollide("collectible", (item) => {

      // collect logic

    });



    player.onCollide("enemy", () => {

      // lose logic

    });



    onCollide("bullet", "enemy", (bullet, enemy) => {

      // projectile collision

    });



    // CAMERA
    // camera scale

    // camera follow



    // TIMER + ANALOG MOVEMENT

    onUpdate(() => {

      // movement logic

      // timer logic

      // win check

      // lose check

    });



    player.onCollide("returnExit", () => {

      // return transition

    });

  });



  // WIN GAME SCENE

  scene("win", () => {

    add([

      // win text

    ]);



    add([

      // restart text

    ]);



    onKeyPress("enter", () => {

      // reset variables

      // restart game

    });

  });



  //LOSE GAME SCENE

  scene("lose", () => {

    add([

      // lose text

    ]);



    add([

      // restart text

    ]);



    onKeyPress("enter", () => {

      // reset variables

      // restart game

    });

  });



  // START MUSIC ONCE LOADED

  onLoad(() => {

    // music start

  });



  onKeyPress("space", () => {

    // music toggle

  });



  // RESET GAME 

  go("level1");

});

