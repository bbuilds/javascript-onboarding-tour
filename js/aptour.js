/**
	* Branden Builds
	* hello@brandenbuilds.com
	* https://github.com/bbuilds/
**/
	


//Defines main constructor funciton
function APTour() {
	//Get the touritmes
	this.tourItems = document.querySelectorAll('[data-aptour]');
	
	if (this.tourItems.length === 0) {
		if(console) {
			console.error('Sorry, they are no tour items');
		}
		
		return;
	}
	
	//Navigation button clicks
	
	document.body.addEventListener('click', this.handleClicks.bind(this));
	
	//Intialize tour
	
	this.initialize();
	
}

APTour.prototype.initialize = function () {
	
	var tourWindowContents = '';
	
	//Define the stops, cursor, and offset
	this.stops = [];
	this.cursor = 0;
	this.offset = 20; //distance between window and parent element
	
	//populate stops with objects - parse the JSON from data attributes
	
	for (var i = 0; i < this.tourItems.length; i++) {
		this.stops[i] = JSON.parse(this.tourItems[i].getAttribute('data-aptour'));
	}
	
	//create an overlay
	
	this.overlay = document.createElement('div');
	this.overlay.className = 'aptour-overlay';
	document.body.insertBefore(this.overlay, document.body.childNodes[0]);
	
	//Create the main tour window
	
	this.tourWindow = document.createElement('div');
	this.tourWindow.className = 'aptour-window';
	tourWindowContents += '<header></header>';
	tourWindowContents += '<div class="aptour-window-desc"></div>';
	tourWindowContents += '<footer>';
	tourWindowContents += '<button class="button" data-aptour-nav="prev">Prev</button>';
	tourWindowContents += '<button class="button" data-aptour-nav="next">Next</button>';
	tourWindowContents += '<button class="button warning" data-aptour-nav="close">Close tour</button>';
	tourWindowContents += '</footer>';
	
	this.tourWindow.innerHTML = tourWindowContents;
	document.body.insertBefore(this.tourWindow, document.body.childNodes[0]);
	
	this.moveTo(this.cursor);
	
	
}

//Shows a specific stop on the tour by index

APTour.prototype.moveTo = function (index) {
	var parent = this.tourItems[index],
	parentSpecs = parent.getBoundingClientRect(),
	bodySpecs = document.body.getBoundingClientRect(),
	tourPosition = this.stops[index].position,
	left, top, scrollPosition;
	
	
	if (parent.style.position === '') {
		parent.style.position = 'relative';
	}
	
	parent.classList.add('aptour-active');
	
	//Set the tour window content
	this.tourWindow.querySelector('header').innerHTML = this.stops[index].title;
	this.tourWindow.querySelector('.aptour-window-desc').innerHTML = this.stops[index].desc;
	
	//Set tour window cordinates
	
	switch (tourPosition) {
		case 'top' :
			left = parentSpecs.left + ((parent.offsetWidth - this.tourWindow.offsetWidth) / 2);
			top = parentSpecs.top - this.tourWindow.offsetHeight - this.offset - bodySpecs.top;
			scrollPosition = parentSpecs.top - bodySpecs.top - this.tourWindow.offsetHeight - this.offset;
		
		break;
		case 'right' :
				left = parentSpecs.right + this.offset;
				top = (parentSpecs.top + parentSpecs.bottom) / 2 - this.tourWindow.offsetHeight / 2 - bodySpecs.top;
				scrollPosition = parentSpecs.top - bodySpecs.top;
		
		break;
		case 'bottom' :
			left = parentSpecs.left + ((parent.offsetWidth - this.tourWindow.offsetWidth) / 2);
			top = parentSpecs.bottom + this.offset - bodySpecs.top;
			scrollPosition = parentSpecs.top - bodySpecs.top;
		
		break;
		case 'left' :
			left = parentSpecs.left - this.offset - this.tourWindow.offsetWidth;
			top = (parentSpecs.top + parentSpecs.bottom) / 2 - this.tourWindow.offsetHeight / 2 - bodySpecs.top;
			scrollPosition = parentSpecs.top - bodySpecs.top;
		
		break;
				
	}
	window.scrollTo(0, scrollPosition);
	this.tourWindow.style.left = left + "px";
	this.tourWindow.style.top = top + "px";
	
}


//Moving tour when butotns are clicked

APTour.prototype.handleClicks = function(event) {
	
	var targetAttr = event.target.getAttribute('data-aptour-nav');
	
	console.log(targetAttr);	
	
	if (targetAttr) {
		event.preventDefault();
		
		switch (targetAttr) {
			case 'prev' :
				if (this.cursor > 0 ) {
					this.tourItems[this.cursor].classList.remove('aptour-active');
					this.moveTo(--this.cursor);
				}
			break;
			
			case 'next' : 
				if (this.cursor < this.stops.length - 1 ) {
					this.tourItems[this.cursor].classList.remove('aptour-active');
					this.moveTo(++this.cursor);
				}
				
			break;
			
			case 'close' : 
				document.body.removeChild(this.overlay);
				document.body.removeChild(this.tourWindow);
			break;
		}
	}
	
}