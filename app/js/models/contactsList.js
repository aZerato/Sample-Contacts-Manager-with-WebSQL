var ContactList = function()
{	
	this.list = [];
};

ContactList.prototype.Get = function() {
	return Database.Get('contacts');
};

ContactList.prototype.Add = function(contact) {
	Database.Insert('contacts', 
		['id', 'lastName', 'firstName', 'email', 'cellphone'], 
		[contact.id, contact.lastName, contact.firstName, contact.email, contact.cellphone]);
};

ContactList.prototype.Delete = function(contact) {
	Database.Delete('contacts', contact.id);
};