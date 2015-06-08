Animated Sprites with CSS and JQuery
=================================


Jquery function to add a responsive animated sprite from a sprite sheet.

----------

<i class="icon-file"></i> Instructions
-------------
1. Prepare you sprite sheet. The frames must be arranged vertically  - [here is a 10 frame sprite sheet](http://i.imgur.com/xCgd2Ob.png), with frame width **200px** and frame height **300px** giving a total of **200x3000px** with a size of **296Kb**. As you can see image size will grow very quickly as you add frames so you will want to use the minimum number of frames possible. 

2. Make sure you have included the JQuery library. This was made with JQuery V1.11.3 but it should work with any recent version and was tested with V2.1.3. 

3. Include the addSprite() function from the ResponsiveSprites.js file in your Javascript however you want. 

4. Call the function like so:
	```
$(document).ready(function() {
		var parentDiv = $('body'), //Sprite will be appended to this element
		spriteImage = "sprite.png", //Direct URL to spritesheet image
		spriteName = "sprite", //The sprite will be identified by this class name
		spriteXPos = "45%", //absolute position on screen of sprite -
		spriteYPos = "15%", //use whatever units you prefer for these  
		spriteMaxH = 30, //as a percentage of screen height
		spriteMaxW = 40, //as a percentage of screen width
		numFrames = 10, //Total num frames, NOT counted from 0
		isLink = true, //Make the sprite a clickable link?
		linkURL = "example.com"
		sprite= addSprite(parentDiv, spriteName , spriteImage , spriteXPos, spriteYPos, spriteMaxH, spriteMaxW, numFrames, true, linkURL );
});
```

5.  **Adding Animation:** Provided in the style.css file are simple animations that just run forwards and backwards through all the frames, and a function addHoverAnimToSprite() is included in the ResponsiveSprites.js. You will likely need to add your own animations though.    **.poi-anim-fwd, .poi-anim-rev** are for a **7** frame sprite and **.bucket-anim-fwd, .bucket-anim-rev** are for a **10** frame sprite. Notice that the only thing that's changed is the number of steps, which is one less than the number of frames in each case. To add these animations to the sprite we created above we would call 
>addHoverAnimToSprite("sprite", "bucket-anim-fwd", "bucket-anim-rev")

	after the call to *addSprite()*.  



 ----------

<i class="icon-file"></i> Demo
-------------

[Here is a simple demo](http://codepen.io/looeee/details/XbRpOz/) on CodePen.

-----
**Notes**

- To see a pure CSS responsive animated sprite check out http://www.sitepoint.com/responsive-sprite-animations-imagemagick-greensock/

- SCSS animation mixins by http://joshbroton.com/quick-fix-sass-mixins-for-css-keyframe-animations/
