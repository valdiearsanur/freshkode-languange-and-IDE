//ArraysAndVariables.js

//TOKEN VALIDATOR
var ValidateToken = (function() {
	return {
		matchExprValInteger: function(str) {
			return str.match(/^(\-{0,1}[0-9]+)$/gi);
		},

		matchExprValReal: function(str) {
			return str.match(/^(\-{0,1}[0-9]+.[0-9]+)$/gi);
		},

		matchExprValLogical: function(str) {
			return str.match(/^(true|false)$/gi);
		},

		matchExprValString: function(str) {
			return str.match(/^([\x00-\x7F])*$/);
		}
	}
})();

var controlVariable = (function() {
	var variables = {};
	function parseValue(v) {
		switch(v.type) {
			case "integer": return parseInt(v.value); break;
			case "real": return parseFloat(v.value); break;
			case "logical": return Boolean(v.value); break;
			case "string": return String(v.value); break;
		}
	}
	function declareVariable(v) {
		if(v.name === undefined || v.type === undefined) return undefined;
		if(variables.hasOwnProperty(v.name)) return undefined;

		var defaultValue;
		switch(v.type) {
			case "integer": defaultValue=parseInt(0); break;
			case "real": defaultValue=parseFloat(0); break;
			case "logical": defaultValue=false; break;
			case "string": defaultValue=String(""); break;
			case "default": return undefined;
		}
		variables[v.name] = {type: v.type, value: defaultValue};

		return $.extend(variables[v.name], {id:v.name,name:v.name});
	}
	function setVariable(v) {
		if(v.name === undefined || v.value === undefined) return false;
		if(variables[v.name] === undefined) return false;

		switch(variables[v.name].type) {
			case "integer": if(!ValidateToken.matchExprValInteger(v.value.toString())) return false; break;
			case "real": if(!ValidateToken.matchExprValReal(v.value.toString())) return false; break;
			case "logical": if(!ValidateToken.matchExprValLogical(v.value.toString())) return false; break;
			case "string": if(!ValidateToken.matchExprValString(v.value.toString())) return false; break;
			case "default": return false;
		}

		variables[v.name].value = parseValue({type: variables[v.name].type, value: v.value});

		return variables[v.name];
	}
	function deleteVariable(name) {
		if(name === undefined) return false;
		if(variables[name] === undefined) return false;

		delete variables[name];
		return true;
	}
	function lengthVariable() {
		return Object.keys(variables).length;
	}
	function getVariables() {
		return $.map(variables, function(value, index) {
			return [value];
		});
	}
	function getCode() {
		return {variable : variables};
	}
	function setCode(JSONCode) {
		variables = JSONCode;
	}
	function destroyCode() {
		variables = {};
	}
	return {
		declareVariable: declareVariable,
		setVariable: setVariable,
		delVariable: deleteVariable,
		getLenVariable: lengthVariable,
		setCode: setCode,
		getCode: getCode,
		destroy: destroyCode,
	}
})();

var controlArray = (function() {
	var arrays = {};

	function parseValue(a) {
		switch(a.type) {
			case "integer": return parseInt(a.value); break;
			case "real": return parseFloat(a.value); break;
			case "logical": return Boolean(a.value); break;
			case "string": return String(a.value); break;
		}
	}
	function declareArray(a) {
		if(a.name === undefined || a.type === undefined) return undefined;
		if(arrays.hasOwnProperty(a.name)) return undefined;

		arrays[a.name] = {type: a.type, values: []};

		return $.extend(arrays[a.name], {id:a.name,name:a.name});
	}
	function deleteArray(name) {
		if(name === undefined) return false;
		if(arrays[name] === undefined) return false;

		delete arrays[name];
		return true;
	}
	function setArray(a) {
		if(a.name === undefined || a.index === undefined || a.value === undefined) return undefined;
		if(arrays[a.name] === undefined) return undefined;
		if(isNaN(a.index)) return undefined;

		switch(arrays[a.name].type) {
			case "integer": if(!ValidateToken.matchExprValInteger(a.value.toString())) return undefined; break;
			case "real": if(!ValidateToken.matchExprValReal(a.value.toString())) return undefined; break;
			case "logical": if(!ValidateToken.matchExprValLogical(a.value.toString())) return undefined; break;
			case "string": if(!ValidateToken.matchExprValString(a.value.toString())) return undefined; break;
			case "default": return undefined;
		}

		arrays[a.name].values[a.index] = parseValue({type: arrays[a.name].type, value: a.value});

		return arrays[a.name];
	}
	function lengthArray() {
		return Object.keys(arrays).length;
	}

	function getCode() {
		return {array : arrays};
	}
	function setCode(JSONCode) {
		arrays = JSONCode;
	}
	function destroyCode() {
		arrays = {};
	}
	return {
		declareArray: declareArray,
		setArray: setArray,
		delArray: deleteArray,
		getLenArray: lengthArray,
		getCode: getCode,
		setCode: setCode,
		destroy: destroyCode
	}
})();