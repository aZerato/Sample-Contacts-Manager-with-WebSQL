var Database = function(dbName, dbVersion, dbComment, dbSize, callback) {
	this.db = null;

	if(window.openDatabase){
		this.db = openDatabase(dbName,
			dbVersion, 
			dbComment, 
			dbSize,
			callback
		);
	}

};

// tableName (string) : the table name
// tableProperties (array of string) : [name TYPE, firstname TYPE]
Database.prototype.CreateTable = function(tableName, tableProperties) {
	var self = this;

	if(self.db == null)
	{
		console.log('No Database initialized');
		return;
	}
	if (tableName == undefined || tableName == '')
	{
		console.log('No table name specified');
		return;
	}
	if (tableProperties == undefined || tableProperties == '' || tableProperties.lenght == 0)
	{
		console.log('No properties specified');
		return;
	}

	var request = 'CREATE TABLE IF NOT EXISTS ' + tableName + ' (id REAL UNIQUE, ' + tableProperties.join(',') + ')';
	console.log(request);

	self.db.transaction(function(tx) {
		tx.executeSql(
			request,
			[],
			function(tx) {
				console.log('Table ' + tableName + ' sucessfully created');
			},
			function(e) {
				console.log('Table ' + tableName + ' creation problem : ' + e.message);
			});
	});
};

// tableName (string) : the table name
Database.prototype.DropTable = function(tableName) {
	var self = this;

	if(self.db == null)
	{
		console.log('No Database initialized');
		return;
	}
	if (tableName == undefined || tableName == '')
	{
		console.log('No table name specified');
		return;
	}

	self.db.transaction(function(tx) {
		tx.executeSql(
			'DROP TABLE ' + tableName,
			[],
			function(tx) {
				console.log('Table ' + tableName + ' sucessfully droped');
			},
			function(e) {
				console.log('Table ' + tableName + ' drop problem : ' + e.message);
			}
		);
	});
};

// tableName (string) : the table name
// tableProperties (array of string) : [id, name, firstname]
Database.prototype.Get = function(tableName, tableProperties) {
	var self = this;

	if(self.db == null)
	{
		console.log('No Database initialized');
		return;
	}
	if (tableName == undefined || tableName == '')
	{
		console.log('No table name specified');
		return;
	}

	if (tableProperties == undefined || tableProperties == '' || tableProperties.lenght == 0)
	{
		var deferred = Promise.defer();

		self.db.readTransaction(function(tx) {
			tx.executeSql(
				'SELECT * FROM ' + tableName,
				[],
				function(t, data) {
					var results = [];
					for(var i = 0; i < data.rows.length; i++){ 
						results.push(data.rows[i]);
					}

					deferred.resolve(results);
				}
			);
		});

		return deferred.resolve;
	}
	else
	{
		var deferred = Promise.defer();

		self.db.transaction(function(tx) {
			tx.executeSql(
				'SELECT (' + tableProperties.join(',') + ') FROM ' + tableName,
				[],
				function(t, data) {
					var results = [];
					for(var i = 0; i < data.rows.length; i++){ 
						results.push(data.rows[i]);
					}

					deferred.resolve(results);
				}
			);
		});

		return deferred.resolve;
	}	
};

// tableName (string) : the table name
// tableProperties (array of string) : [id, name, firstname]
// tableValues (array of value) : [valueOfId, valueOfName, valueOfFirstname]
Database.prototype.Insert = function(tableName, tableProperties, tableValues) {
	var self = this;

	if(self.db == null)
	{
		console.log('No Database initialized');
		return;
	}
	if (tableName == undefined || tableName == '')
	{
		console.log('No table name specified');
		return;
	}
	if (tableProperties == undefined || tableProperties == '' || tableProperties.lenght == 0)
	{
		console.log('No properties specified');
		return;
	}
	if (tableValues == undefined || tableValues == '' || tableValues.lenght == 0)
	{
		console.log('No values specified');
		return;
	}
	if(tableProperties.lenght !== tableValues.lenght)
	{
		console.log('No missing properties or values');
		return;
	}

	var request = 'INSERT INTO ' + tableName + ' (' + tableProperties.join(',') + ') ' + 
						'VALUES (' + tableValues.join(',') + ')';
	console.log(request);

	self.db.transaction(function(tx) {
		tx.executeSql(
		request,
		[],
		function(tx) {
			console.log('Table ' + tableName + ' sucessfully inserted');
		},
		function(e) {
			console.log('Table ' + tableName + ' insert problem : ' + e.message);
		});
	});
};

// tableName (string) : the table name
// id : the id of the object
Database.prototype.Delete = function(tableName, id) {
	var self = this;

	if(self.db == null)
	{
		console.log('No Database initialized');
		return;
	}
	if (tableName == undefined || tableName == '')
	{
		console.log('No table name specified');
		return;
	}

	self.db.transaction(function(tx) {
		tx.executeSql(
		'DELECT FROM ' + tableName + ' WHERE id = ' + id,
		[],
		function(tx) {
			console.log('Table ' + tableName + ' sucessfully deleted');
		},
		function(e) {
			console.log('Table ' + tableName + ' delete problem : ' + e.message);
		});
	});		
};