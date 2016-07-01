// POO : Object decalaration

console.log("1. Object decalaration : function / associative array")

// function

console.log("Fonction");

var Custom = function(i, j)
{
	this.attr1 = i;
	this.attr2 = j;

	this.addition = function()
	{
		return this.attr1 + this.attr2;
	}
};

var customObj = new Custom(10, 5);
console.log(customObj.attr1);
console.log(customObj.attr2);
console.log(customObj['attr1']);
console.log(customObj.addition());

// Associative array

console.log("Associative array (Json)");

var Custom2 = {
	attr1: 50,
	attr2: 49,
	addition: function()
	{
		return this.attr1 + this.attr2;
	}
};

var customObj2 = Custom2;
console.log(customObj2.attr1);
console.log(customObj2.attr2);
console.log(customObj2['attr1']);
console.log(customObj2.addition());

console.log("Associative array : edit values");

customObj2.attr1 = 10;
customObj2.attr2 = 5;
console.log(customObj2.addition());

//------------------------------------------------------------------------------------------------

// Using apply & call : play with context/scope

console.log("2. apply / call");

var test = function(p1, p2)
{
	console.log(p1 + " " + p2 + " " + this.attr);
};

// apply : use an array
var obj1 = { attr: 1 };
test.apply(obj1, ["param1", "param2"]);

// call : use with param
var obj2 = { attr: 5 };
test.call(obj2, "param1", "param2");

//------------------------------------------------------------------------------------------------

// Prototype

console.log("3. Prototype");

var Test2 = function(i, j)
{
	this.attr1 = i;
	this.attr2 = j;
};

Test2.prototype.addition = function()
{
	return this.attr1 + this.attr2;
};

var customObj3 = new Test2(42, 5);
console.log(customObj3.addition());

// Prototype & heritage

// call

console.log("4. Heritage via call");

var Test3 = function(i, j)
{
	this.attr1 = i;
	this.attr2 = j;

	this.addition = function()
	{
		return this.attr1 + this.attr2;
	};
};

var Test4 = function(i, j, k)
{
	this.attr3 = k;

	Test3.call(this, i, j);
};

var customObj4 = new Test4(12, 3, 7);
console.log(customObj4.addition());

// prototype

console.log("4. Heritage via prototype");

var Test5 = function(i, j)
{
	this.attr1 = i;
	this.attr2 = j;
};

Test5.prototype.addition = function()
{
	return this.attr1 + this.attr2;
};

var Test6 = function(i, j, k)
{
	this.attr3 = k;
};

Test6.prototype = new Test5();

var customObj5 = new Test6(12, 3, 7);
console.log(customObj5.addition());