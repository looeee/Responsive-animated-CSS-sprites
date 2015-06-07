$(document).ready(function() {
  spritesDiv = $("body"); //Add the sprites to this element
  
  poiImage = "poi.png";
  poi = addSprite(spritesDiv, "poi", poiImage, "15%", "15%", 30, 30, 7, true, "#");
  addHoverAnimToSprite("poi", "poi-anim-fwd", "poi-anim-rev")

  bucketImage = "bucket.png";
  bucket = addSprite(spritesDiv, "bucket", bucketImage, "45%", "15%", 30, 30, 10);
  addHoverAnimToSprite("bucket", "bucket-anim-fwd", "bucket-anim-rev")
});

// Add a responsive sprite - it will grow no wider than spriteMaxW and no taller than spriteMaxH (both defined in terms of screen %)
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
      $('.' + spriteName).css({
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
    $('.' + spriteName).css({
      height: height + "px",
      width: width + "px"
    });
  });

  if (isLink) { //Make the sprite a link if required
    parentDiv.append('<a class="' + spriteName + ' sprite" href="' + linkURL + '"></a>');
  } else { //Otherwise just place it in a div
    parentDiv.append('<div class="' + spriteName + ' sprite"></div>');
  }
  
  $('.' + spriteName).css({
    background: 'url("' + spriteImage.src + '") no-repeat 0 0%',
    'background-size': "100%",
    position: 'absolute',
    top: spriteYPos,
    left: spriteXPos,
    
  });
  //Return the parent div - this can be used to add animations, reposition the sprite etc.
  return $('.' + spriteName);
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
