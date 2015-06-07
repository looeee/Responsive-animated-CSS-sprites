$( document ).ready(function() { 
    init = function() {
        spritesDiv = $("body"); //Add the sprite to this div
        poiImage = "http://i.imgur.com/iZTTPz3.png";
        bucketImage = "https://minerva-looeee-1.c9.io/assets/front_page/1920/bucket-sprite-1920.png";
        poi = addSprite(spritesDiv, "poi", poiImage, "25%", "25%", 60, 40, 7, 1, "#");
        addHoverAnimToSprite("poi")
    }; 
    init();
});

// Add a responsive sprite - based on ideas from http://www.sitepoint.com/responsive-sprite-animations-imagemagick-greensock/
function addSprite(parentDiv, spriteName, spriteImageURl, spriteXPos, spriteYPos, spriteMaxH, spriteMaxW, numFrames, isLink, linkURL){
  var height = yPercent(spriteMaxH), //The height of the sprite, initially set to the maximum desired height
  width = spriteMaxW, //The width of the sprite, initially set to the maximum desired width
  imgH, imgW, //The width and height of the original image
      
  spriteImage = selectImage(spriteImageURl, function(w, h) {
    imgH = h, imgW = w;
    //Calculate the width based on spriteMaxH
    width = imgW/((imgH/numFrames)/height);
    
    //If the calculated width is too wide, decrease the height until the desired width is found
    while(xPxToPercent(width) > spriteMaxW){
      height = height - 10;
      width = imgW/((imgH/numFrames)/height);
    }
    
    $('.' + spriteName).parent().css({
      height: height + "px",
      width:  width + "px"
    }); 
  });  
 
  $( window ).resize(function() {
    //increase width if too narrow
    if(xPxToPercent(width) < spriteMaxW ){
      while(xPxToPercent(width)<spriteMaxW && height < yPercent(spriteMaxH)){
        height = height + 10;
        width = imgW/((imgH/numFrames)/height);
      }
    }    
    //decrease width if too wide
    if(xPxToPercent(width) > spriteMaxW){
      while(xPxToPercent(width)>spriteMaxW && height <= yPercent(spriteMaxH) ){
        height = height - 10;
        width = imgW/((imgH/numFrames)/height);
      }
    }    
    //decrease height if too tall (not neccessary?)
    if(height > yPercent(spriteMaxH)){
      height = yPercent(spriteMaxH);
      width = imgW/((imgH/numFrames)/height);
    }
    $('.' + spriteName).parent().css({
      height: height + "px",
      width:  width + "px"
    });  
  });
  
  parentDiv.append(
    '<div class="'+ spriteName + '-parent sprite-parent"> </div>'
  );
  
  if(isLink){
    $('.' + spriteName + '-parent').append('<a class="'+ spriteName + ' sprite" href="' + linkURL + '"></a>');
  }else{
    $('.' + spriteName + '-parent').append('<div class="'+ spriteName + ' sprite"></div>');
  }  
  
  $('.'+ spriteName).css({
    background: 'url("'+ spriteImage.src + '") no-repeat 0 0%',
    'background-size':  "100%",
    position: 'absolute',
    left: '0',
    right: '0',
    top: '0',
    bottom: '0',
  });
  
  $('.'+ spriteName).parent().css({
    top: spriteYPos,
    left: spriteXPos,  
  });   
  return $('.' + spriteName + '-parent'); 
}

function addHoverAnimToSprite(spriteName){
    $('.'+ spriteName).hover(function () {       
    $(this).addClass('sprite-anim-fwd ');
    $(this).removeClass('sprite-anim-rev '); 
  },function () {
    $(this).addClass('sprite-anim-rev ');
    $(this).removeClass('sprite-anim-fwd ');      
  });
}

/* ************************************************************************

 HELPER FUNCTIONS

************************************************************************** */

//Return a window % in px 
function yPercent(y){
    return ($(window).outerHeight(true)/100) *y;
}
            
function xPercent(x){
    return ($(window).outerWidth(true)/100) *x;
}

function xPxToPercent(x){
  return x * 100/$(window).outerWidth(true);
}

function selectImage(imageURL, callback){ 
    var img = new Image();
    img.onload = function(){        
        if(callback) callback(img.width,img.height);    
    };  
    img.src = imageURL;  
    return img;
}