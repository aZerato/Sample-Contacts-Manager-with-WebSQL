var ContactList = function()
{	
	Database.Get('contacts').promise.then(function(data) { console.log(contacts);});
	this.list = [];
};

ContactList.prototype.Add = function(contact) {
	Database.Insert('contacts', 
		['lastName', 'firstName', 'email', 'cellPhone'], 
		[contact.lastName, contact.firstName, contact.email, contact.cellPhone]);
};

ContactList.prototype.Delete = function(contact) {
	Database.Delete('contacts', contact.id);
};