var ContactList = function()
{
	this.list = JSON.parse(localStorage.getItem("annuaire")) || [];
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