var Core = new Core();

var Database = new Database('annuaire', '0.1', 'nothing', 20000000000, function() {});

//Database.DropTable('contacts');

Database.CreateTable('contacts', 
	['id TEXT',
	'lastName TEXT', 
	'firstName TEXT', 
	'cellphone TEXT', 
	'email TEXT']);

var contactController = new ContactController('[data-model="contact"]');
contactController.Init();