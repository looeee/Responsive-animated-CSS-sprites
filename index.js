$(document).ready(function() {
  spritesDiv = $("body"); //Add the sprites to this element
  
  poiImage = "http://i.imgur.com/iZTTPz3.png";
  poi = addSprite(spritesDiv, "poi", poiImage, "15%", "15%", 30, 30, 7, 1, "#");
  addHoverAnimToSprite("poi", "poi-anim-fwd", "poi-anim-rev")

  bucketImage = "https://minerva-looeee-1.c9.io/assets/front_page/1920/bucket-sprite-1920.png";
  bucket = addSprite(spritesDiv, "bucket", bucketImage, "45%", "15%", 30, 30, 10);
  addHoverAnimToSprite("bucket", "bucket-anim-fwd", "bucket-anim-rev")
});

// Add a responsive sprite - based on ideas from http://www.sitepoint.com/responsive-sprite-animations-imagemagick-greensock/
function addSprite(parentDiv, spriteName, spriteImageURl, spriteXPos, spriteYPos, spriteMaxH, spriteMaxW, numFrames, isLink, linkURL) {
  var height = yPercent(spriteMaxH), //The height of the sprite, initially set to the maximum desired height
    width = spriteMaxW, //The width of the sprite, initially set to the maximum desired width
    imgH, imgW, //The width and height of the original image

    spriteImage = selectImage(spriteImageURl, function(w, h) {
      imgH = h, imgW = w;
      //Calculate the width based on spriteMaxH
      width = imgW / ((imgH / numFrames) / height);
      //If the calculated width is too wide, decrease the height until the desired width is found
      while (xPxToPercent(width) > spriteMaxW) {
        height = height - 10;
        width = imgW / ((imgH / numFrames) / height);
      }
      //Set the sprites initial width and height
      $('.' + spriteName).parent().css({
        height: height + "px",
        width: width + "px"
      });
    });

  //Recalculate width and height if the browser window is resized
  $(window).resize(function() {
    //increase width if too narrow
    if (xPxToPercent(width) < spriteMaxW) {
      while (xPxToPercent(width) < spriteMaxW && height < yPercent(spriteMaxH)) {
        height = height + 10;
        width = imgW / ((imgH / numFrames) / height);
      }
    }
    //decrease width if too wide
    if (xPxToPercent(width) > spriteMaxW) {
      while (xPxToPercent(width) > spriteMaxW && height <= yPercent(spriteMaxH)) {
        height = height - 10;
        width = imgW / ((imgH / numFrames) / height);
      }
    }
    //decrease height if too tall
    if (height > yPercent(spriteMaxH)) {
      height = yPercent(spriteMaxH);
      width = imgW / ((imgH / numFrames) / height);
    }
    //Set the new width and height
    $('.' + spriteName).parent().css({
      height: height + "px",
      width: width + "px"
    });
  });

  parentDiv.append(
    '<div class="' + spriteName + '-parent sprite-parent"> </div>'
  );

  if (isLink) { //Make the sprite a link if required
    $('.' + spriteName + '-parent').append('<a class="' + spriteName + ' sprite" href="' + linkURL + '"></a>');
  } else { //Otherwise just place it in a div
    $('.' + spriteName + '-parent').append('<div class="' + spriteName + ' sprite"></div>');
  }

  $('.' + spriteName).css({
    background: 'url("' + spriteImage.src + '") no-repeat 0 0%',
    'background-size': "100%",
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
  });

  //Set the position of the sprite on screen using absolute positioning
  $('.' + spriteName).parent().css({
    position: 'absolute',
    top: spriteYPos,
    left: spriteXPos,
  });
  //Return the parent div - this can be used to add animations, reposition the sprite etc.
  return $('.' + spriteName + '-parent');
}

function addHoverAnimToSprite(spriteName, forwardAnimClass, revAnimClass) {
  $('.' + spriteName).hover(function() {
    $(this).addClass(forwardAnimClass);
    $(this).removeClass(revAnimClass);
  }, function() {
    $(this).addClass(revAnimClass);
    $(this).removeClass(forwardAnimClass);
  });
}

/* ************************************************************************

 HELPER FUNCTIONS

************************************************************************** */

//Return a window % in px 
function yPercent(y) {
  return ($(window).outerHeight(true) / 100) * y;
}

function xPercent(x) {
  return ($(window).outerWidth(true) / 100) * x;
}

//Return a pixel value in window % 
function xPxToPercent(x) {
  return x * 100 / $(window).outerWidth(true);
}

//Select an image with a callback to get the width and height after the image has loaded
function selectImage(imageURL, callback) {
  var img = new Image();
  img.onload = function() {
    if (callback) callback(img.width, img.height);
  };
  img.src = imageURL;
  return img;
}