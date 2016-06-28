var Core = new Core();

var Database = new Database('annuaire', '0.1', 'nothing', 20000000000, function() {});

//Database.DropTable('contacts');

Database.CreateTable('contacts', 
	['lastName TEXT', 
	'firstName TEXT', 
	'cellPhone TEXT', 
	'email TEXT']);

var contactController = new ContactController('[data-model="contact"]');
contactController.Init();