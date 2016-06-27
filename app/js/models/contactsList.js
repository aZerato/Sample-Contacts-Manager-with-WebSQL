var ContactList = function()
{
	this.list = [];
};

ContactList.prototype.Refresh = function() {
	delete this.list;

	this.list = [];
	
	var storage = localStorage.getItem("annuaire");
	if(storage != null)
	{
		this.list = JSON.parse(storage);
	}
};

ContactList.prototype.Add = function(contact) {
	this.list.push(contact);

	this.Persist();
};

ContactList.prototype.Delete = function(contact) {
	this.list.splice(this.list.indexOf(contact), 1);

	this.Persist();
};

ContactList.prototype.Persist = function() {
	localStorage.setItem("annuaire", JSON.stringify(this.list));
};