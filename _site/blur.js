// Blur canvas images (1h4nk5C0d3rw411!!)
var CanvasImage = function(el, img) {
	this.image = img;
	this.element = el;

	var iwidth = this.image.width,
			iheight = this.image.height;
	this.element.width = $(this.element.parentElement).width();
	this.element.height = $(this.element.parentElement).height();

	// // Some fix for mac chrome
	// var chrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1,
	// 		mac = navigator.appVersion.indexOf('Mac') > -1;
	// if (chrome && mac) {
	// 	width = Math.min(width, $(window).width());
	// 	height = Math.min(height, 200);
	// }

	this.context = this.element.getContext('2d');
	if (this.element.width/this.element.height > iwidth/iheight) {
		this.image.width = this.element.width;
		var newHeight = this.element.width*iheight/iwidth;
		this.context.drawImage(this.image, 0, -(newHeight-this.element.height)/2,
			this.element.width, newHeight);
	} else {
		this.image.height = this.element.height;
		var newWidth = this.element.height*iwidth/iheight;
		this.context.drawImage(this.image, -(newWidth-this.element.width)/2, 0,
			newWidth, this.element.height);
	}

};

CanvasImage.prototype = {
	blur: function(blur) {
		this.context.globalAlpha = .5;
		for (var t = -blur; blur >= t; t += 2)
		for (var n = -blur; blur >= n; n += 2) {
			this.context.drawImage(this.element, n, t);
			if (n >= 0 && t >= 0) {
				this.context.drawImage(this.element, -(n - 1), -(t - 1));
			}
		}
		this.context.globalAlpha = 1;
	},
};

function execBlur() {
	$('canvas.blur').each(function() {
		var el = this, img = new Image;
		img.onload = function () {
			var blur = el.dataset.blur?parseInt(el.dataset.blur):3;
			new CanvasImage(el, this).blur(blur);
		}
		img.src = $(this).attr('src');
	});
}


