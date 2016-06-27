function Core(){};

// Map a form.
Core.prototype.map = function(selector) {
	var elForm = document.querySelector(selector);
	var inputs = elForm.querySelectorAll('[data-model-name]')
	
	var mapObject = {
		id: new Date().getTime()
	};

	for (var i = inputs.length - 1; i >= 0; i--) {
		mapObject[inputs[i].getAttribute('data-model-name')] = inputs[i].value
	};

	return mapObject;
};
