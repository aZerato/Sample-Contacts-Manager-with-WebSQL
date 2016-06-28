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

Core.prototype.http = function(type, url, async, data)
{
	// ECMA 6 PROMISE !!
	return new Promise(function(resolve, reject) {
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open(type, url, async);
		xmlHttp.send(data);

		xmlHttp.onload = function() {
			if(xmlHttp.status >= 200 && this.status < 300)
			{
				resolve(xmlHttp.response);
			}
			else
			{
				reject(xmlHttp.statusText);
			}
		};

		xmlHttp.onerror = function () {
          reject(this.statusText);
        };
	});
};