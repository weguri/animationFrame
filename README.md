AnimationFrameJS
=======================

This is a plugin written by @donlion (Leo Ørsnes).
Start using animation frames for webanimations and math-transitions!

Depends on **jQuery**

##Install
Either run
```
bower install animationframe
```
or download the js files from this repository

##Example:
```
$(".dom").animationFrame({
  "duration": 1000,
  "easing": "linear|ease|cubicBezier",
  "from": {
    "left": "0px",
    "top": "0px",
    "height": "100%"
  },
  "to": {
    "left": "100px",
    "top": "60px",
    "height": "50%"
  },
  "finish": function(dom) {
    $(dom).hide(200).show(200);
  }
});
```


##Math example:
```
$(".dom").animationFrame({
  "duration": 1000,
  "easing": "ease",
  "from": {
    "height": function() {
    	return $(window).height+"px";
  	}
  },
  "to": {
    "height": "50%"
  }
});
```
