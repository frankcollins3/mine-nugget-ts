import React, { useEffect, useRef } from 'react';

const MineCanvas = (props) => {
const setTouchCoin = props.setTouchCoin
const canvasRef = useRef(null);

  // This useEffect hook will run once when the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = 300;
    canvas.height = 300 ;

// IMG ELEMENTS
var bgImage = new Image();
bgImage.src = "img/background.png";

var cartImage = new Image();
cartImage.src = "img/cart.png";

var coinImage = new Image();
coinImage.src = "img/coin.png";

// GAME OBJECTS
var game = {};
var cart = {
    speed: 256,
    ready: true,
    width: 31,
    height: 28
};
var coin = {
    ready: true,
    width: 32,
    height: 32
};
var keysDown = {};

// Stores the keys pressed by the player.
addEventListener("keydown", function(key) {
    keysDown[key.keyCode] = true;
});

// Delete the released keys.
addEventListener("keyup", function(key) {
    delete keysDown[key.keyCode];
});

const cartClick = (event) => {
  console.log("cart click!")
  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rect.left;
  const mouseY = event.clientY - rect.top;
  cart.x += 50; // Adjust the value as needed to control the movement distance

  // Check if the click occurred within the boundaries of the cart image
  if (
    mouseX >= cart.x &&
    mouseX <= cart.x + cart.width &&
    mouseY >= cart.y &&
    mouseY <= cart.y + cart.height
  ) {
    // Move the cart to the right
    // cart.x += 10; // Adjust the value as needed to control the movement distance
  }
};

var counterId;

/**
 * Initiates game parameters.
 */
var init = function() {
    counterId = setInterval(counter, 1000);
    game.finished = false;    

    cart.x = 50;
    cart.y = 80;

    coin.x = 280;
    coin.y = 80;

    cart.ready = true;
    coin.ready = true;
    canvas.removeEventListener("click", init);
    canvas.addEventListener("click", cartClick);
}

/**
 * Decrements game's time one by one.
 */
var counter = function() {
    game.time--;
    if (game.time <= 0) {
        clearInterval(counterId);
        game.finished = true;
        cart.ready = false;
        coin.ready = false;
    }
}

/**
 * Updates coin position randomly.
 */
var reset = function() {
    coin.x = 32 + (Math.random() * (canvas.width - 96));
    coin.y = 32 + (Math.random() * (canvas.height - 96));
}

/**
 * Updates cart's position based on a modifier.
 * @param {*} modifier 
 */
var update = function(modifier) {
  var prevX = cart.x;
  var prevY = cart.y;

  if (37 in keysDown) { // left
    if (cart.x > 15) {
      cart.x -= cart.speed * modifier;
      cart.width = 14;
    }
  }
  if (38 in keysDown) { // up
    if (cart.y > 15) {
      cart.y -= cart.speed * modifier;
      cart.width = 31;
    }
  }
  if (39 in keysDown) { // right
    if (cart.x + cart.width < canvas.width - 15) {
      cart.x += cart.speed * modifier;
      cart.width = 14;
    }
  }
  if (40 in keysDown) { // down
    // Adjust the bottom boundary check to account for the height of the cart image
    if (cart.y + cart.height < 110) {
    // if (cart.y + cart.height < canvas.height - cart.height) {
      cart.y += cart.speed * modifier;
      cart.width = 31;
    }
  }

  // Ensure cart stays within the canvas boundaries
  if (cart.x < 0) {
    cart.x = 0;
  }
  if (cart.y < 0) {
    cart.y = 0;
  }
  if (cart.x + cart.width > canvas.width) {
    cart.x = canvas.width - cart.width;
  }
  if (cart.y + cart.height > canvas.height) {
    cart.y = canvas.height - cart.height;
  }

  // check if a collision has occurred.
  if (
    cart.x <= coin.x + coin.width &&
    coin.x <= cart.x + cart.width &&
    cart.y <= coin.y + coin.height &&
    coin.y <= cart.y + cart.height
  ) {
    coin.ready = false;
    cart.ready = false;
    setTouchCoin(true)
  }
};
/**
 * Renders the game elements on canvas.
 */
var render = function() {
    ctx.drawImage(bgImage, 0, 0);

    // Calculate the vertical position adjustment for rendering the cart and coin images
    // to account for their heights
    var cartYAdjust = cart.y - cart.height;
    var coinYAdjust = coin.y - coin.height;

    ctx.drawImage(cartImage, cart.x, cartYAdjust); // Adjust the Y position for cart
    if (coin.ready) {
        ctx.drawImage(coinImage, coin.x, coinYAdjust); // Adjust the Y position for coin
    }

    ctx.font = "22px Arial";
    ctx.textBaseline = "top";
    ctx.fillStyle = "white";
    // ctx.fillText("coins caught: "+ game.coinsCaught, 20, 20);
    // ctx.fillText("Time: "+ game.time, 20, 50);

    if (game.finished) {
        // ctx.fillText("Game over!", 200, 220);
        // ctx.fillText("Click to start again!", 160, 260);
        canvas.addEventListener("click", init);
    }
}

/**
 * Main loop of game.
 */
var main = function() {
    if (game.finished == false) {
        update(0.02);
    }
    render();
    window.requestAnimationFrame(main);
}

init();
main();
    // Canvas drawing code here...
  }, []);

  const left = () => {
      if (cart.x > 15) {
        cart.x -= cart.speed * modifier;
        cart.width = 14;
      }
  }

  const right = () => {
      if (cart.x + cart.width < canvas.width - 15) {
        cart.x += cart.speed * modifier;
        cart.width = 14;
      }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh', flexDirection: 'column', border: 'none' }}>
      <canvas ref={canvasRef} />

      {/* was going to add buttons to solve issue #268 */}
      {/* <button onClick={right} style={{ backgroundColor: 'gold', margin: '0 1em', height: '25px', width: '25px' }}> R </button> */}
    </div>
  );
};

export default MineCanvas;
