$.fn.extend({

	/*
	A plugin by Leo Ørsnes, @donlion
	Free to use in any case
	*/

	animationFrame: function(args) {

		var _this = this;

		this.easings = {
			cubicBezier: function(x) {
				return (21.5)*(Math.pow(x, 2.58))*(Math.exp((-3.11)*x));
			},
			linear: function(x) {
				return x;
			},
			ease: function(x) {
				return Math.sin(1.838074738*x-3.603073937*Math.pow(10, -2));
			}
		};


		this.options = {
			'easing': 'cubicBezier',
			'duration': '400',
			'repeat': false,
			'from': {
				"height" : "0px",
				"overflow" : "hidden"
			},
			'to': {
				"height" : "100%"
			}
		};




		this.init = function(args) {
			console.log("init");
			$.extend(this.options, args);

			new animate($(this), this);

		};

		this.init(args);




		function animate(el, self) {

			console.log("animate", el);

			var args = self.options;

			console.log(args.from);

			for (var key in args.from) {
				var value = args.from[key];
				if ((key == "height" || key == "width") &&  value.indexOf("%") >= 0) {
					var styles = $(el).css(['overflow', key, 'box-sizing']);
					$(el).css("overflow", "visible").css("box-sizing", "border-box").css(key, "auto");

					var height = $(el).height();
					$(el).css(styles);

					if (height < $(el).height()) {
						height = $(el).height();
					}

					var factor = value.substr(0, value.length-1)/100;
					var height = factor*height;

					args.from[key] = height;
				}
			}



			for (var key in args.to) {
				var value = args.to[key];

				if ((key == "height" || key == "width") &&  value.indexOf("%") >= 0) {
					var styles = $(el).css(['overflow', key, 'box-sizing']);
					console.log("STYLES!", styles);
					$(el).css("overflow", "visible").css("box-sizing", "border-box").css(key, "auto");

					var height = $(el).height();
					$(el).css(styles);

					if (height < $(el).height()) {
						height = $(el).height();
					}

					var factor = value.substr(0, value.length-1)/100;
					var height = factor*height;

					args.to[key] = height;
				}
			}






			var time = null;

			var animation = function(timestamp) {

				if (!time) {
					time = timestamp;
				}

				var percent = ((timestamp - time)/args.duration),
						styles = {};

				if (percent >= 1) {
					var difObj = {};

					for (var key in args.to) {
						difObj[key] = args.to[key];
					}

					$(el).css(difObj);

					return true;
				}


				for (var key in args.from) {

					var firstVal = args.from[key],
							lastVal = args.to[key],
							valDif = lastVal-firstVal;


					if (valDif) {
						var difObj = {};
						var percentFactor = self.easings[args.easing](percent);

						difObj[key] = firstVal+(valDif*percentFactor);
						$.extend(styles, difObj)
						//styles.push(key, firstVal+(valDif*percent)+"px");
						console.log(valDif);
					} else {
						if (firstVal.indexOf("px") >= 0 && lastVal.indexOf("px") >= 0) 	{
							firstVal = firstVal.replace("px", "");
							lastVal = lastVal.replace("px", "");
							valDif = lastVal-firstVal;

							var difObj = {};
							var percentFactor = self.easings[args.easing](percent);

							difObj[key] = firstVal+(valDif*percentFactor)+"px";
							$.extend(styles, difObj)
						}
					}

					if (!lastVal && lastVal != 0) {
						throw new Error("Mising last value to key '"+key+"'!");
					}

				}


				$(el).css(styles);
				console.log("HERE GOES!", styles);

				return window.requestAnimationFrame(animation);

			};

			window.requestAnimationFrame(animation);



			console.log(args);

		}

	}

});