var ContactController = function(partialName, formSelector)
{
	this.partialName = partialName;
	this.formSelector = formSelector;
	this.template = document.querySelector('[data-partial="' + this.partialName + '"]');
	this.model = new ContactList();
	this.elForm = undefined;
};

ContactController.prototype.Init = function() {
	var self = this;

	// render template
	Core.http(
		'GET', 
		'partials/' + self.partialName + '.html', 
		true, 
		null)
	.then(function(data) {
		self.template.innerHTML = data;
		self.elForm = document.querySelector(self.formSelector);

		// default render list function if elements in localstorage
		self.RenderList();

		// Add
		var elInputContactBtn = self.elForm.querySelector('[data-action="add"]');
		elInputContactBtn.addEventListener('click', function(event) {
			event.preventDefault();
			
			var contact = Core.map('[data-model="contact"]');

			self.model.Add(contact);

			self.RenderItem(contact);
		});

		// Refresh
		var elInputContactRefreshBtn = self.elForm.querySelector('[data-action="refresh"]');
		elInputContactRefreshBtn.addEventListener('click', function(event) {
			event.preventDefault();
			
			Core.http('GET', 
				'http://www.mocky.io/v2/576bae931100003d0666670a', 
				true, 
				null)
			.then(function(data) {
				self.model.list = JSON.parse(data);
				self.model.Persist();
				self.RenderList();
			});
		});
	});
};

ContactController.prototype.RenderList = function()
{
	var self = this;
	
	var elContactList = document.querySelector('[data-list="contact-list"]');
	var elContactListBody = elContactList.querySelector('tbody');
	elContactListBody.innerHTML = "";

	for (var i = self.model.list.length - 1; i >= 0; i--) {
		self.RenderItem(self.model.list[i]);
	}
};

ContactController.prototype.RenderItem = function(contact) 
{
	var self = this;

	var elContactList = document.querySelector('[data-list="contact-list"]');
	var elContactListBody = elContactList.querySelector('tbody');

	var row = document.createElement('tr');
	row.setAttribute('data-item', contact.id);

	var column = document.createElement('th');
	row.appendChild(column);
	column.setAttribute('scope', 'row');
	column.innerHTML = contact.lastName + ' ' + contact.firstName;

	var column2 = document.createElement('td');
	row.appendChild(column2);
	column2.innerHTML = contact.cellphone;

	var column3 = document.createElement('td');
	row.appendChild(column3);
	column3.innerHTML = contact.email;

	var column4 = document.createElement('td');
	row.appendChild(column4);

	var buttonRemove = document.createElement('button');
	column4.appendChild(buttonRemove);
	buttonRemove.setAttribute('class', 'btn btn-warning');
	buttonRemove.innerHTML = '<span class="glyphicon glyphicon-trash"></span>'

	elContactListBody.appendChild(row);

	// bind
	buttonRemove.addEventListener('click', function(event)
	{
		event.preventDefault();

		self.model.Delete(contact);

		self.Unrender(contact.id);
	});
};

ContactController.prototype.Unrender = function(id) 
{
	var self = this;

	var elContactList = document.querySelector('[data-list="contact-list"]');
	var elContactListBody = elContactList.querySelector('tbody');

	var listItem = elContactListBody.querySelector('[data-item="' + id + '"]');
	if(listItem != null)
	{
		listItem.remove();
	}
};