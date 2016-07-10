var parser;
var Workspace = function() {

	var messageCount = 0;

	var errorDictionary = {
		'gen' : // gen = general warning 
			[
				{ // gen.0 empty project
					errorMessage : "Program kosong",
					autoSolution : "Eksekusi Program Dihentikan",
					type : "danger"
				},
				{ // gen.1 unknown statement
					errorMessage : "Terdapat statement yang tidak dikenali",
					autoSolution : "Eksekusi Program Dihentikan",
					type : "danger"
				},
			]
		,
		'var' : // var = variable
			{
				'nul' :  // var.nul = undefined variable
					[
						{ // var.nul.0 = integer
							errorMessage : "Variabel tidak terdefinisi",
							autoSolution : "Eksekusi Program Dihentikan",
							type : "danger"
						}
					],
				'ini' :  // var.ini = uninitilized variable
					[
						{ // var.ini.0 = integer
							errorMessage : "Variabel tidak di-inisialisasi",
							autoSolution : "Nilai Variabel Integer telah diberikan: 0",
							type : "warning"
						},
						{ // var.ini.1 = real
							errorMessage : "Variabel tidak di-inisialisasi",
							autoSolution : "Nilai Real Real telah diberikan: 0.0",
							type : "warning"
						},
						{ // var.ini.2 = boolean
							errorMessage : "Variabel tidak di-inisialisasi",
							autoSolution : "Nilai Variabel Logical telah diberikan: false",
							type : "warning"
						},
						{ // var.ini.3 = string
							errorMessage : "Variabel tidak di-inisialisasi",
							autoSolution : "Nilai Variabel String telah diberikan: string kosong \' \'",
							type : "warning"
						}
					]
			}
		,
		'dat' : // dat = data type
			{
				'mis' :  // dat.mis = missmatch format
					[
						{ // dat.mis.0 = integer
							errorMessage : "Format data tidak sesuai dengan tipe Integer",
							autoSolution : "Data telah diterjemahkan menjadi nilai: 0",
							type : "warning"
						},
						{ // dat.mis.1 = real
							errorMessage : "Format data tidak sesuai dengan tipe Real",
							autoSolution : "Data telah diterjemahkan menjadi nilai: 0.0",
							type : "warning"
						},
						{ // dat.mis.2 = boolean
							errorMessage : "Format data tidak sesuai dengan tipe Logical",
							autoSolution : "Data telah diterjemahkan menjadi nilai: false",
							type : "warning"
						},
						{ // dat.mis.3 = string
							errorMessage : "Format data tidak sesuai dengan tipe String",
							autoSolution : "Data telah diterjemahkan menjadi nilai: string kosong \' \'",
							type : "warning"
						}
					]
			}
		,
		'sta' : // sta = statement 
			{
				'it0' :  // sta.it2 = iterate 2
					[
						{ // sta.it2.0 empty argument 1 (variable)
							errorMessage : "Iterasi melebihi batas (maksimal 100.000.000)",
							autoSolution : "Eksekusi Program Dihentikan",
							type : "danger"
						}
					],
				'it2' :  // sta.it2 = iterate 2
					[
						{ // sta.it2.0 empty argument 1 (variable)
							errorMessage : "Argumen variabel kounter pada statement Iterasi2 tidak diisi",
							autoSolution : "Argumen variabel kounter sementara telah ditambahkan",
							type : "warning",
						},
						{ // sta.it2.1 iteration step == 0
							errorMessage : "Langkah iterasi bernilai 0",
							autoSolution : "Eksekusi Program Dihentikan",
							type : "danger"
						}
					],
			}
		,
		'exp' : // exp = expression 
			{
				'opr' : // exp.opr = operator
					[
						{ // exp.opr.0 wrong format
							errorMessage : "Format opertator (unary/binary/ternary) tidak sesuai",
							autoSolution : "Eksekusi Program Dihentikan",
							type : "danger"
						},
					]
				,
				'arr' :  // exp.arr
					[
						{ // exp.arr.0 empty index
							errorMessage : "Nilai indeks Array tidak diisi",
							autoSolution : "Indeks Array yang diakses: Indeks 0",
							type : "warning"
						}
					],
			}
	};

	var dict = {
		"INTEGER" : {
			completeToken : {
				constIdentifier : "INTEGER-CONSTANT",
				operationIdentifier : "INTEGER-ARITHMETIC-OPERATION",
				operation : {
					2 : "INTEGER-BINARY-OPERATION",
					3 : "INTEGER-TERNARY-OPERATION",
					4 : "INTEGER-NARY-OPERATION"
				},
				parseConstant : {
					fn: function(val) {
						if(val != null && val.toString().match(/^(\-{0,1}[0-9]+)$/gi)) {
							return parseInt(val);
						} else {
							//error
							return parseInt(0);
						}
					}
				},
				validConstant : {
					fn: function(val) {
						if(val != null && val.toString().match(/^(\-{0,1}[0-9]+)$/gi)) {
							return true;
						} else {
							return false;
						}
					}
				},
				defaultConstant : 0
			}
		},
		"REAL" : {
			completeToken : {
				constIdentifier : "REAL-CONSTANT",
				operationIdentifier : "REAL-ARITHMETIC-OPERATION",
				operation : {
					2 : "REAL-BINARY-OPERATION",
					3 : "REAL-TERNARY-OPERATION",
					4 : "REAL-NARY-OPERATION"
				},
				parseConstant : {
					fn: function(val) {
						if(val != null && val.toString().match(/^(\-{0,1}[0-9]+.[0-9]+)$/gi)) {
							return val;
						} else {
							//error
							return 0.0;
						}
					}
				},
				validConstant : {
					fn: function(val) {
						if(val != null && val.toString().match(/^(\-{0,1}[0-9]+.[0-9]+)$/gi)) {
							return true;
						} else {
							//error
							return false;
						}
					}
				},
				defaultConstant : 0.0
			}
		},
		"LOGICAL" : {
			completeToken : {
				constIdentifier : "LOGICAL-CONSTANT",
				operationIdentifier : "LOGICAL-OPERATION",
				operation : {
					1 : "LOGICAL-UNARY-OPERATION",
					2 : "LOGICAL-BINARY-OPERATION",
					3 : "LOGICAL-TERNARY-OPERATION",
					4 : "LOGICAL-NARY-OPERATION"
				},
				parseConstant : {
					fn: function(val) {
						if(val != null && val.toString().match(/^(0|1|true|false)$/gi)) {
							if(val == 1 || val == "true") 		return 1;
							else if(val == 0 || val == "false")	return 0;
						} else {
							//error
							return 0;
						}
					}
				},
				validConstant : {
					fn: function(val) {
						if(val != null && val.toString().match(/^(0|1|true|false)$/gi)) {
							if(val == 1 || val == "true") 		return true;
							else if(val == 0 || val == "false")	return false;
						} else {
							//error
							return false;
						}
					}
				},
				defaultConstant : false
			}
		},
		"RELATIONAL" : {
			completeToken : {
				constIdentifier : false,
				operationIdentifier : "RELATIONAL-OPERATION",
				operation : {
					2 : "RELATIONAL-BINARY-OPERATION"
				}
			}
		},
		"STRING" : {
			completeToken : {
				constIdentifier : "STRING-CONSTANT",
				operationIdentifier : "STRING-OPERATION",
				operation : {
					2 : "STRING-BINARY-OPERATION",
					3 : "STRING-TERNARY-OPERATION",
					4 : "STRING-NARY-OPERATION"
				},
				parseConstant : {
					fn: function(val) {
						if(val) {
							return val.toString();
						} else {
							//error
							return "";
						}
					}
				},
				validConstant : {
					fn: function(val) {
						if(val) {
							return true;
						} else {
							//error
							return "";
						}
					}
				},
				defaultConstant : ""
			}
		}
	}

	var errorHandler_SelectedPointElm = null;
	var errorHandler_PointElm = function(elmRef, type) {
		errorHandler_RemovePointElm();
		errorHandler_SelectedPointElm = $(elmRef);
		$('.pre_startprogram').scrollTo($(errorHandler_SelectedPointElm), 500);
		$(errorHandler_SelectedPointElm).addClass('point-'+type);
	}
	var errorHandler_RemovePointElm = function() {
		if(errorHandler_SelectedPointElm != null) 
			errorHandler_SelectedPointElm.removeClass('point-warning').removeClass('point-danger');
	}
	var errorHandler = function(errorCode, elmRef) {
		if(!errorCode.match(/^(([a-z]|[0-9]){0,3}\.)*([a-z]|[0-9]){0,3}$/gi)) return false;
		var obj = errorDictionary;
		var arrError = errorCode.split(".");
		for(var i=0;i<arrError.length;i++) {
			if(!obj[arrError[i]]) return false
			obj = obj[arrError[i]];
		}
		if(!obj.errorMessage) return false;
		
		// if spesified error code is match
		window.dd2.changeTab("PESANCOM", function() {
			window.dd2.spesificIndex("PESANCOM").tab('show');
		});

		messageCount++;
		$('#output section.code-correction').append(
			$('<div/>', {
				class: 'subsection'
			}).append(
				$('<div/>')
					.append(
						$('<a/>', {
							"class" : "label label-"+obj.type,
							"href" : "javascript:void(0)"
						}).click(function() {
							errorHandler_PointElm($(elmRef), obj.type);
						}).text(
							obj.type == "warning" ? 'Peringatan' : 'Fatal'
						)
					)
					.append(" "+obj.errorMessage)
			).append(
				(obj.autoSolution ? 
					$('<small/>')
					.append('<span class="label label-success">solusi</span> ')
					.append(obj.autoSolution)
				: 
					''
				)
			)
		);
		$('#compilerMessage').text(messageCount);
	}

	var buildRaw = (function() {
		var CodeInterface = "#workspace ol.groupstatement.startprogram";

		function buildGroupStatement($p) {
			var completeCode = [];

			var child = $p.children('li');

			for(
				var i = 0;
				i < child.length && child.eq(i).data('token');
				i++
			) {
				switch(child.eq(i).data('token')) {
					case "IF": 
						completeCode.push(
							buildIf(child.eq(i), false)
						);
					break;
					case "IFELSE": 
						completeCode.push(
							buildIf(child.eq(i), true)
						); 
					break;
					case "ITERATION0": 
						completeCode.push(
							buildIteration0(child.eq(i))
						); 
					break;
					case "ITERATION1": 
						completeCode.push(
							buildIteration1(child.eq(i))
						); 
					break;
					case "ITERATION2": 
						completeCode.push(
							buildIteration2(child.eq(i),false)
						); 
					break;
					case "ITERATION3": 
						completeCode.push(
							buildIteration2(child.eq(i),true)
						); 
					break;
					case "SETVAR": 
						completeCode.push(
							buildSetVar(child.eq(i))
						); 
					break;
					case "INCRVAR": 
						completeCode.push(
							buildIncrDecrVar(child.eq(i), true)
						); 
					break;
					case "DECRVAR": 
						completeCode.push(
							buildIncrDecrVar(child.eq(i), false)
						); 
					break;
					case "SETARRVAR": 
						completeCode.push(
							buildSetArrVar(child.eq(i))
						); 
					break;
					case "INCRARRVAR": 
						completeCode.push(
							buildIncrDecrArrVar(child.eq(i), true)
						); 
					break;
					case "DECRARRVAR": 
						completeCode.push(
							buildIncrDecrArrVar(child.eq(i), false)
						); 
					break;
					case "INPUT": 
						completeCode.push(
							buildInput(child.eq(i))
						); 
					break;
					case "PRINT": 
						completeCode.push(
							buildPrint(child.eq(i), false)
						); 
					break;
					case "PRINTLINE": 
						completeCode.push(
							buildPrint(child.eq(i), true)
						); 
					break;
				}
			}

			return completeCode;
		}

		//GROUP STATEMENT
			function buildIf($p,hasElseBlock) {
				var child_completeCode = {token : hasElseBlock ? "IFELSE" : "IF", arg: [], subtoken: []};

				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)"),
				e_child1 = $p.children("ol.groupstatement:eq(0)"),
				e_child2 = $p.children("ol.groupstatement:eq(1)");

				//arg 1
				if(e_arg.data('token').split("-")[0] == "LOGICAL" || e_arg.data('token').split("-")[0] == "RELATIONAL") {
					child_completeCode.arg.push(
						buildLogicalValue(e_arg)
					);

					if(e_child1.children('li').length > 0) {
						child_completeCode.subtoken[0] = buildGroupStatement(e_child1);
					}

					if(e_child2 && e_child2.children('li').length > 0) {
						child_completeCode.subtoken[1] = buildGroupStatement(e_child2);
					}
				}
				e_arg = null, e_child1 = null, e_child2 = null;

				return child_completeCode;
			}

			function buildIteration0($p) {
				var child_completeCode = {token : "ITERATION0", arg: [], subtoken: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)"),
				 e_child = $p.children("ol.groupstatement:eq(0)");

				if(e_arg1.length) {
					child_completeCode.arg.push(
						buildIntegerValue(e_arg1)
					);

					if(e_child.children('li').length > 0)  {
						child_completeCode.subtoken.push(
							buildGroupStatement(e_child)
						);
					}
				}
				e_arg1 = null, e_child = null;

				return child_completeCode;
			}

			function buildIteration1($p) {
				var child_completeCode = {token : "ITERATION1", arg: [], subtoken: []};

				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)"),
				 e_child = $p.children("ol.groupstatement:eq(0)");

				//arg 1
				if(e_arg.data('token').split("-")[0] == "LOGICAL" || e_arg.data('token').split("-")[0] == "RELATIONAL") {
					child_completeCode.arg.push(
						buildLogicalValue(e_arg)
					);

					if(e_child.children('li').length > 0)  {
						child_completeCode.subtoken.push(
							buildGroupStatement(e_child)
						);       
					}
				}
				e_arg = null, e_child = null;

				return child_completeCode;
			}

			function buildIteration2($p,hasStep) {
				var child_completeCode = {token : (hasStep ? "ITERATION3" : "ITERATION2"), arg: [], subtoken: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)"),
				 e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)"),
				 e_arg3 = $p.find("ol.startexpression:eq(2) > li:eq(0)"),
				 e_arg4 = $p.find("ol.startexpression:eq(3) > li:eq(0)"),
				 e_child = $p.children("ol.groupstatement:eq(0)");

				if(e_arg1.length && e_arg2.length && e_arg3.length) {
					child_completeCode.arg.push(
						buildExprVariable(e_arg1),
						buildIntegerValue(e_arg2),
						buildIntegerValue(e_arg3)
					);
					if(hasStep && e_arg4.length) {
						child_completeCode.arg.push(
							buildIntegerValue(e_arg4)
						);
					}

					if(e_child.children('li').length > 0)  {
						child_completeCode.subtoken.push(
							buildGroupStatement(e_child)
						);
					}
				}
				e_arg1 = null, e_arg2 = null, e_arg3 = null, e_arg4 = null, e_child = null;

				return child_completeCode;
			}

			function buildInput($p) {
				var child_completeCode = {token : "INPUT", arg: []};

				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)");

				//arg 1
				child_completeCode.arg.push(
					buildExprVariable(e_arg)
				);

				return child_completeCode;
			}

			function buildPrint($p, hasNLine) {
				var child_completeCode = {token : hasNLine ? "PRINTLINE" : "PRINT", arg: []};

				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)");

				//arg1
				switch(e_arg.data('token').split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg)
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg)
						);
					break;
					case "LOGICAL" :
					case "RELATIONAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg)
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg)
						);
					break;
				}

				return child_completeCode;
			}

			function buildSetVar($p) {
				var child_completeCode = {token : "SETVAR", arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprVariable(e_arg1)
				);
				switch(e_arg2.data('token').split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2)
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2)
						);
					break;
					case "LOGICAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg2)
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg2)
						);
					break;
				}

				return child_completeCode;
			}

			function buildIncrDecrVar($p,isIncrement) {
				var child_completeCode = {token : (isIncrement ? "INCRVAR" : "DECRVAR"), arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				//arg 1
				child_completeCode.arg.push(
					buildExprVariable(e_arg1)
				);

				//arg2
				switch(e_arg2.data('token').split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2)
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2)
						);
					break;
				}

				return child_completeCode;
			}

			function buildSetArrVar($p) {
				var child_completeCode = {token : "SETARRVAR", arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprArray(e_arg1)
				);
				switch(e_arg2.data('token').split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2)
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2)
						);
					break;
					case "LOGICAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg2)
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg2)
						);
					break;
				}

				return child_completeCode;
			}

			function buildIncrDecrArrVar($p,isIncrement) {
				var child_completeCode = {token : (isIncrement ? "INCRARRVAR" : "DECRARRVAR"), arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprArray(e_arg1)
				);
				switch(e_arg2.data('token').split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2)
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2)
						);
					break;
				}

				return child_completeCode;
			}
		//[END OF] GROUP STATEMENT

		//GROUP EXPRESSION
			function buildValue($p) {
				switch($p.data('token').split('-')[0]) {
					case "INTEGER" :
						return buildIntegerValue($p);
					break;
					case "REAL" :
						return buildRealValue($p);
					break;
					case "RELATIONAL" :
					case "LOGICAL" :
						return buildLogicalValue($p);
					break;
					case "STRING" :
						return buildStringValue($p);
					break;
				}
			}

			function buildIntegerValue($p) {
				var child_completeCode = {arg : "", subarg: []};

				switch($p.data('token')) {
					case "INTEGER-CONSTANT": 
						child_completeCode = buildConstant($p,"INTEGER");
					break;
					case "INTEGER-ARRAY": 
						child_completeCode = buildExprArray($p);
					break;
					case "INTEGER-VARIABLE": 
						child_completeCode = buildExprVariable($p);
					break;
					case "INTEGER-BINARY-OPERATION": 
						child_completeCode = buildOperation($p,2,"INTEGER");
					break;
					case "INTEGER-TERNARY-OPERATION": 
						child_completeCode = buildOperation($p,3,"INTEGER");
					break;
					case "INTEGER-NARY-OPERATION": 
						child_completeCode = buildOperation($p,4,"INTEGER");
					break;
				}

				return child_completeCode;
			}

			function buildRealValue($p) {
				var child_completeCode = {arg : "", subarg: []};

				switch($p.data('token')) {
					case "REAL-CONSTANT": 
						child_completeCode = buildConstant($p,"REAL");
					break;
					case "REAL-ARRAY": 
						child_completeCode = buildExprArray($p);
					break;
					case "REAL-VARIABLE": 
						child_completeCode = buildExprVariable($p);
					break;
					case "REAL-BINARY-OPERATION": 
						child_completeCode = buildOperation($p,2,"REAL");
					break;
					case "REAL-TERNARY-OPERATION": 
						child_completeCode = buildOperation($p,3,"REAL");
					break;
					case "REAL-NARY-OPERATION": 
						child_completeCode = buildOperation($p,4,"REAL");
					break;
				}
				return child_completeCode;
			}

			function buildLogicalValue($p) {
				var child_completeCode = {arg : "", subarg: []};

				switch($p.data('token')) {
					case "LOGICAL-CONSTANT": 
						child_completeCode = buildConstant($p,"LOGICAL");
					break;
					case "LOGICAL-ARRAY": 
						child_completeCode = buildExprArray($p);
					break;
					case "LOGICAL-VARIABLE": 
						child_completeCode = buildExprVariable($p);
					break;
					case "LOGICAL-UNARY-OPERATION": 
						child_completeCode = buildOperation($p,1,"LOGICAL");
					break;
					case "LOGICAL-BINARY-OPERATION": 
						child_completeCode = buildOperation($p,2,"LOGICAL");
					break;
					case "LOGICAL-TERNARY-OPERATION": 
						child_completeCode = buildOperation($p,3,"LOGICAL");
					break;
					case "LOGICAL-NARY-OPERATION": 
						child_completeCode = buildOperation($p,4,"LOGICAL");
					break;
					case "RELATIONAL-BINARY-OPERATION": 
						child_completeCode = buildOperation($p,2,"RELATIONAL");
					break;
				}
				return child_completeCode;
			}

			function buildStringValue($p) {
				var child_completeCode = {arg : "", subarg: []};

				switch($p.data('token').split('-')[0]) {
					case "INTEGER" :
						child_completeCode = buildIntegerValue(e_arg);
					break;
					case "REAL" :
						child_completeCode = buildRealValue(e_arg);
					break;
					case "LOGICAL" :
					case "RELATIONAL" :
						child_completeCode = buildLogicalValue(e_arg);
					break;
					case "STRING" :
						switch($p.data('token')) {
							case "STRING-CONSTANT": 
								child_completeCode = buildConstant($p,"STRING");
							break;
							case "REAL-ARRAY": 
								child_completeCode = buildExprArray($p);
							break;
							case "STRING-VARIABLE": 
								child_completeCode = buildExprVariable($p);
							break;
							case "STRING-BINARY-OPERATION": 
								child_completeCode = buildOperation($p,2,"STRING");
							break;
							case "STRING-TERNARY-OPERATION": 
								child_completeCode = buildOperation($p,3,"STRING");
							break;
							case "STRING-NARY-OPERATION": 
								child_completeCode = buildOperation($p,4,"STRING");
							break;
						}
					break;
				}
				return child_completeCode;
			}

			function buildOperation($p,nary,oprType) {
				var child_completeCode = {arg : "", subarg: []};
				var child = $p.children("ol");

				switch(nary) {
					case 1: 
						child_completeCode.arg = dict[oprType].completeToken.operation[nary];
						var op1 = $(child).children("li.exproperator:eq(0)").data("token");
						var opr1 = $(child).children("li:eq(2)");

						if(opr1.length) child_completeCode.subarg.push(
							buildValue(opr1)
						);
						if(op1 != "") child_completeCode.subarg.push(op1);
					break;
					case 2:
						child_completeCode.arg = dict[oprType].completeToken.operation[nary];
						var op1 = $(child).children("li.exproperator:eq(0)").data("token");
						var opr1 = $(child).children("li:eq(1)");
						var opr2 = $(child).children("li:eq(3)");

						if(opr1.length) child_completeCode.subarg.push(
							buildValue(opr1)
						);
						if(op1 != "") child_completeCode.subarg.push(op1);
						if(opr2.length) child_completeCode.subarg.push(
							buildValue(opr2)
						);
					break; 
					case 3: 
						child_completeCode.arg = dict[oprType].completeToken.operation[nary];
						var op1 = $(child).children("li.exproperator:eq(0)").data("token");
						var op2 = $(child).children("li.exproperator:eq(1)").data("token");
						var opr1 = $(child).children("li:eq(1)");
						var opr2 = $(child).children("li:eq(3)");
						var opr3 = $(child).children("li:eq(5)");

						if(opr1.length) child_completeCode.subarg.push(
							buildValue(opr1)
						);
						if(op1 != "") child_completeCode.subarg.push(op1);
						if(opr2 != "") child_completeCode.subarg.push(
							buildValue(opr2)
						);
						if(op2 != "") child_completeCode.subarg.push(op2);
						if(opr3.length) child_completeCode.subarg.push(
							buildValue(opr3)
						);
					break;
					case 4: 
						child_completeCode.arg = dict[oprType].completeToken.operation[nary];

						var opr, op;
						for(var i=1;i<$(child).children("li").length-1;i++) {
							if(i%2!=0) {
								opr = $(child).children("li:eq({0})".format(i));
								if(opr.length) child_completeCode.subarg.push(
									buildValue(opr)
								);
							} else {
								op = $(child).children("li:eq({0})".format(i)).data("token");
								if(op.length) {
									child_completeCode.subarg.push(op);
								}
							}
						}
					break;
					default: 
						//error
					break;
				}

				if(child_completeCode.arg == "") {
					//error
				}


				return child_completeCode;
			}

			function buildExprArray($p) {
				var child_completeCode = {arg : $p.data('token'), subarg: [($p.hasClass('nonemptyvar'))?$p.data('arg_name'):null, 0]};

				var e_arg = $p.find("ol.groupexpression:eq(0) > li:eq(3)");
				var arrIndex = buildIntegerValue(e_arg);

				if(arrIndex != null) {
					child_completeCode.subarg[1] = arrIndex;
				}

				return child_completeCode;
			}

			function buildExprVariable($p) {
				var child_completeCode = {arg : $p.data('token'), subarg: [($p.hasClass('nonemptyvar'))?$p.data('arg_name'):null]};

				return child_completeCode;
			}

			function buildConstant($p, type) {
				var child_completeCode = {arg : dict[type].completeToken.constIdentifier, subarg: []};

				var e_arg = $p.find("input.input:eq(0)");

				child_completeCode.subarg.push(
					dict[type].completeToken.parseConstant.fn(e_arg.val())
				);

				e_arg = null;

				return child_completeCode;
			}
		//[END OF] GROUP EXPRESSION

		function initBuild() {
			return {
				rawCode : {
					declarations: {
						variable: controlVariable.getCode().variable, 
						array: controlArray.getCode().array
					},
					main: buildGroupStatement($(CodeInterface))
				}
			};
		}

		return {
			init: initBuild
		};
	})();

	var buildComplete = (function() {
		var CodeInterface = "#workspace ol.groupstatement.startprogram";

		function buildGroupStatement($p,tokens,root) {
			var completeCode = [];

			var child = $p.children('li');

			for(
				var i = 0;
				i < tokens.length;
				i++
			) {
				switch(tokens[i].token) {
					case "IF": 
						completeCode.push(
							buildIf(child.eq(i), tokens[i], false)
						);
					break;
					case "IFELSE": 
						completeCode.push(
							buildIf(child.eq(i), tokens[i], true)
						); 
					break;
					case "ITERATION0": 
						completeCode.push(
							buildIteration0(child.eq(i), tokens[i])
						); 
					break;
					case "ITERATION1": 
						completeCode.push(
							buildIteration1(child.eq(i), tokens[i])
						); 
					break;
					case "ITERATION2": 
						completeCode.push(
							buildIteration2(child.eq(i), tokens[i],false)
						); 
					break;
					case "ITERATION3": 
						completeCode.push(
							buildIteration2(child.eq(i), tokens[i],true)
						); 
					break;
					case "SETVAR": 
						completeCode.push(
							buildSetVar(child.eq(i), tokens[i])
						); 
					break;
					case "INCRVAR": 
						completeCode.push(
							buildIncrDecrVar(child.eq(i), tokens[i], true)
						); 
					break;
					case "DECRVAR": 
						completeCode.push(
							buildIncrDecrVar(child.eq(i), tokens[i], false)
						); 
					break;
					case "SETARRVAR": 
						completeCode.push(
							buildSetArrVar(child.eq(i), tokens[i])
						); 
					break;
					case "INCRARRVAR": 
						completeCode.push(
							buildIncrDecrArrVar(child.eq(i), tokens[i], true)
						); 
					break;
					case "DECRARRVAR": 
						completeCode.push(
							buildIncrDecrArrVar(child.eq(i), tokens[i], false)
						); 
					break;
					case "INPUT": 
						completeCode.push(
							buildInput(child.eq(i), tokens[i])
						); 
					break;
					case "PRINT": 
						completeCode.push(
							buildPrint(child.eq(i), tokens[i], false)
						); 
					break;
					case "PRINTLINE": 
						completeCode.push(
							buildPrint(child.eq(i), tokens[i], true)
						); 
					break;
					default: 
						//error --> error handler, elm: child.eq(i)
						errorHandler("gen.1",child.eq(i));
						terminateExecution();
					break;
				}
			}
			if(root) {
				completeCode.push(
					{token : "__EOF__"}
				);
			}

			return completeCode;
		}

		//GROUP STATEMENT
			function buildIf($p,token,hasElseBlock) {
				var child_completeCode = {token : hasElseBlock ? "IFELSE" : "IF", arg: [], subtoken: []};

				if(token.arg[0] != null) {
					child_completeCode.arg.push(
						buildLogicalValue($p.find("ol.startexpression:eq(0)"), token.arg[0])
					);

					if(token.subtoken[0] && token.subtoken[0].length > 0) {
						child_completeCode.subtoken[0] = buildGroupStatement($p.children(".groupstatement:eq(0)"), token.subtoken[0]);
					}

					if(hasElseBlock && token.subtoken[1] && token.subtoken[1].length > 0) {
						child_completeCode.subtoken[1] = buildGroupStatement($p.children(".groupstatement:eq(1)"), token.subtoken[1]);
					}
				} else {
					// error --> $p.find("ol.startexpression:eq(0)")
					errorHandler("gen.1",child.eq(i));
				}

				return child_completeCode;
			}

			function buildIteration0($p,token) {
				var child_completeCode = {token : "ITERATION0", arg: [], subtoken: []};

				if(token.arg[0] != null) {
					child_completeCode.arg.push(
						buildIntegerValue($p.find("ol.startexpression:eq(0)"), token.arg[0])
					);

					if(token.subtoken[0] && token.subtoken[0].length > 0)  {

						child_completeCode.subtoken.push(
							buildGroupStatement($p.children("ol.groupstatement:eq(0)"), token.subtoken[0])
						);       
					}
				}

				return child_completeCode;
			}

			function buildIteration1($p,token) {
				var child_completeCode = {token : "ITERATION1", arg: [], subtoken: []};

				if(token.arg[0] != null) {
					child_completeCode.arg.push(
						buildLogicalValue($p.find("ol.startexpression:eq(0)"), token.arg[0])
					);

					if(token.subtoken[0] && token.subtoken[0].length > 0)  {

						child_completeCode.subtoken.push(
							buildGroupStatement($p.children("ol.groupstatement:eq(0)"), token.subtoken[0])
						);       
					}
				}

				return child_completeCode;
			}

			function buildIteration2($p,token,hasStep) {
				var child_completeCode = {token : (hasStep ? "ITERATION3" : "ITERATION2"), arg: [], subtoken: []};

				if(token.arg.length > 2) {
					child_completeCode.arg.push(
						buildExprVariable($p.find("ol.startexpression:eq(0)"), token.arg[0], true),
						buildIntegerValue($p.find("ol.startexpression:eq(1)"), token.arg[1]),
						buildIntegerValue($p.find("ol.startexpression:eq(2)"), token.arg[2])
					);
					if(hasStep) {
						child_completeCode.arg.push(
							buildIntegerValue($p.find("ol.startexpression:eq(3)"), token.arg[3])
						);
					}

					if(token.subtoken[0] && token.subtoken[0].length > 0)  {
						child_completeCode.subtoken.push(
							buildGroupStatement($p.children(".groupstatement:eq(0)"), token.subtoken[0])
						);
					}

					//variable counter
					child_completeCode.subtoken[0].push(
						{token : "INCRVAR", arg: [
							buildExprVariable($p.find("ol.startexpression:eq(0)"), token.arg[0], true),
							hasStep ? 
								buildIntegerValue($p.find("ol.startexpression:eq(3)"), token.arg[3]) :
								buildIntegerValue($p.find("ol.startexpression:eq(3)"), {arg: "INTEGER-CONSTANT", subarg: [1]})
						]}
					);
				}

				return child_completeCode;
			}

			function buildInput($p,token) {
				var child_completeCode = {token : "INPUT", arg: []};

				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprVariable(e_arg,token.arg[0])
				);

				return child_completeCode;
			}

			function buildPrint($p,token, hasNLine) {
				var child_completeCode = {token : hasNLine ? "PRINTLINE" : "PRINT", arg: []};

				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)");

				switch(token.arg[0].arg.split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg,token.arg[0])
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg,token.arg[0])
						);
					break;
					case "LOGICAL" :
					case "RELATIONAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg,token.arg[0])
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg,token.arg[0])
						);
					break;
				}

				return child_completeCode;
			}

			function buildSetVar($p,token) {
				var child_completeCode = {token : "SETVAR", arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprVariable(e_arg1,token.arg[0])
				);
				switch(token.arg[1].arg.split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2,token.arg[1])
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2,token.arg[1])
						);
					break;
					case "LOGICAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg2,token.arg[1])
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg2,token.arg[1])
						);
					break;
				}

				return child_completeCode;
			}

			function buildIncrDecrVar($p,token,isIncrement) {
				var child_completeCode = {token : (isIncrement ? "INCRVAR" : "DECRVAR"), arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprVariable(e_arg1,token.arg[0])
				);
				switch(token.arg[1].arg.split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2,token.arg[1])
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2,token.arg[1])
						);
					break;
				}

				return child_completeCode;
			}

			function buildSetArrVar($p,token) {
				var child_completeCode = {token : "SETARRVAR", arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprArray(e_arg1,token.arg[0])
				);
				switch(token.arg[1].arg.split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2,token.arg[1])
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2,token.arg[1])
						);
					break;
					case "LOGICAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg2,token.arg[1])
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg2,token.arg[1])
						);
					break;
				}

				return child_completeCode;
			}

			function buildIncrDecrArrVar($p,token,isIncrement) {
				var child_completeCode = {token : (isIncrement ? "INCRARRVAR" : "DECRARRVAR"), arg: []};

				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				child_completeCode.arg.push(
					buildExprArray(e_arg1,token.arg[0])
				);
				switch(token.arg[1].arg.split("-")[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue(e_arg2,token.arg[1])
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue(e_arg2,token.arg[1])
						);
					break;
					case "LOGICAL" :
						child_completeCode.arg.push(
							buildLogicalValue(e_arg2,token.arg[1])
						);
					break;
					case "STRING" :
						child_completeCode.arg.push(
							buildStringValue(e_arg2,token.arg[1])
						);
					break;
				}

				return child_completeCode;
			}
		//[END OF] GROUP STATEMENT

		//GROUP EXPRESSION
			function buildPreValue(type,$p,Targ) {
				return (
					type == "integer" ? buildIntegerValue($p,Targ) :
					type == "real" ? buildRealValue($p,Targ) :
					type == "logical" ? buildLogicalValue($p,Targ) :
					type == "relational" ? buildLogicalValue($p,Targ) :
					type == "string" ? buildStringValue($p,Targ) :
					""
				)
			}
			function buildIntegerValue($p,Targ) {
				var child_completeCode = {arg : "INTEGER-CONSTANT", subarg: []};

				switch(Targ.arg) {
					case "INTEGER-CONSTANT": 
						child_completeCode.subarg.push(
							buildConstant($p,Targ.subarg,"INTEGER")
						); 
					break;
					case "INTEGER-VARIABLE": 
						child_completeCode.subarg.push(
							buildExprVariable($p,Targ)
						); 
					break;
					case "INTEGER-ARRAY": 
						child_completeCode.subarg.push(
							buildExprArray($p,Targ)
						); 
					break;
					case "INTEGER-BINARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,2,"INTEGER",Targ.subarg)
						); 
					break;
					case "INTEGER-TERNARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,3,"INTEGER",Targ.subarg)
						); 
					break;
					case "INTEGER-NARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,4,"INTEGER",Targ.subarg)
						); 
					break;
					default: 
						//error --> error handler, elm: parent.children("li:eq("+i+")")
					break;
				}
				return child_completeCode;
			}

			function buildRealValue($p,Targ) {
				var child_completeCode = {arg : "REAL-CONSTANT", subarg: []};

				switch(Targ.arg) {
					case "REAL-CONSTANT": 
						child_completeCode.subarg.push(
							buildConstant($p,Targ.subarg,"REAL")
						); 
					break;
					case "REAL-VARIABLE": 
						child_completeCode.subarg.push(
							buildExprVariable($p,Targ)
						); 
					break;
					case "REAL-ARRAY": 
						child_completeCode.subarg.push(
							buildExprArray($p,Targ)
						); 
					break;
					case "REAL-BINARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,2,"REAL",Targ.subarg)
						); 
					break;
					case "REAL-TERNARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,3,"REAL",Targ.subarg)
						); 
					break;
					case "REAL-NARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,4,"REAL",Targ.subarg)
						); 
					break;
					default: 
						//error --> error handler, elm: parent.children("li:eq("+i+")")
					break;
				}
				return child_completeCode;
			}

			function buildLogicalValue($p,Targ) {
				var child_completeCode = {arg : "LOGICAL-CONSTANT", subarg: []};

				switch(Targ.arg) {
					case "LOGICAL-CONSTANT": 
						child_completeCode.subarg.push(
							buildConstant($p,Targ.subarg,"LOGICAL")
						); 
					break;
					case "LOGICAL-VARIABLE": 
						child_completeCode.subarg.push(
							buildExprVariable($p,Targ)
						); 
					break;
					case "LOGICAL-ARRAY": 
						child_completeCode.subarg.push(
							buildExprArray($p,Targ)
						); 
					break;
					case "LOGICAL-UNARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,1,"LOGICAL",Targ.subarg)
						); 
					break;
					case "LOGICAL-BINARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,2,"LOGICAL",Targ.subarg)
						); 
					break;
					case "LOGICAL-TERNARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,3,"LOGICAL",Targ.subarg)
						); 
					break;
					case "LOGICAL-NARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,4,"LOGICAL",Targ.subarg)
						); 
					break;
					case "RELATIONAL-BINARY-OPERATION": 
						child_completeCode.subarg.push(
							buildOperation($p,2,"RELATIONAL",Targ.subarg)
						); 
					break;
					default: 
						//error --> error handler, elm: parent.children("li:eq("+i+")")
					break;
				}
				return child_completeCode;
			}

			function buildStringValue($p,Targ) {
				var child_completeCode = {arg : "STRING-CONSTANT", subarg: []};

				switch(Targ.arg.split('-')[0]) {
					case "INTEGER" :
						child_completeCode.arg.push(
							buildIntegerValue($p,Targ.subarg)
						);
					break;
					case "REAL" :
						child_completeCode.arg.push(
							buildRealValue($p,Targ.subarg)
						);
					break;
					case "LOGICAL" :
					case "RELATIONAL" :
						child_completeCode.arg.push(
							buildLogicalValue($p,Targ.subarg)
						);
					break;
					case "STRING" :
						switch(Targ.arg) {
							case "STRING-CONSTANT": 
								child_completeCode.subarg.push(
									buildConstant($p,Targ.subarg,"STRING")
								); 
							break;
							case "STRING-VARIABLE": 
								child_completeCode.subarg.push(
									buildExprVariable($p,Targ)
								); 
							break;
							case "STRING-ARRAY": 
								child_completeCode.subarg.push(
									buildExprArray($p,Targ)
								); 
							break;
							case "STRING-BINARY-OPERATION": 
								child_completeCode.subarg.push(
									buildOperation($p,2,"STRING",Targ.subarg)
								); 
							break;
							case "STRING-TERNARY-OPERATION": 
								child_completeCode.subarg.push(
									buildOperation($p,3,"STRING",Targ.subarg)
								); 
							break;
							case "STRING-NARY-OPERATION": 
								child_completeCode.subarg.push(
									buildOperation($p,4,"STRING",Targ.subarg)
								); 
							break;
						}
					break;
				}
				return child_completeCode;
			}

			function buildExprVariable($p,Targ,allowNull) {

				if((allowNull == false || allowNull == null) && (!Targ.subarg || Targ.subarg[0] == undefined || Targ.subarg[0] == null)) {
					errorHandler('var.nul.0');
					terminateExecution();
				}

				if(!Targ.subarg || Targ.subarg[0] == undefined || Targ.subarg[0] == null) {
					Targ.subarg[0] = '';
				}
				var child_completeCode = {arg : Targ.arg, subarg: [Targ.subarg[0]]};

				return child_completeCode;
			}

			function buildExprArray($p,Targ,allowNull) {

				if((allowNull == false || allowNull == null) && (!Targ.subarg || Targ.subarg[0] == undefined || Targ.subarg[0] == null)) {
					errorHandler('var.nul.0');
					terminateExecution();
				}

				if(!Targ.subarg || Targ.subarg[0] == undefined || Targ.subarg[0] == null) {
					Targ.subarg[0] = '';
				}
				if(!Targ.subarg || Targ.subarg[1] == undefined || Targ.subarg[1] == null) {
					Targ.subarg[1] = '';
				}
				var child_completeCode = {arg : Targ.arg, subarg: [Targ.subarg[0] , buildIntegerValue($p.find('ol > li.exprdefault'),Targ.subarg[1])]};

				return child_completeCode;
			}

			function buildConstant($p, value, type) {
				var child_completeCode = {arg : dict[type].completeToken.constIdentifier, subarg: []};

				child_completeCode.subarg.push(
					dict[type].completeToken.parseConstant.fn(value[0])
				);

				return child_completeCode;
			}

			function buildOperation($p,nary,oprType,tokens) {
				var child_completeCodeParrent = {arg : dict[oprType].completeToken.operationIdentifier, subarg: []};
				var child_completeCode = {arg : dict[oprType].completeToken.operation[nary], subarg: []};
				var child = $p.children("ol");

				if(!tokens || tokens.length != nary*2-1) {
					if(nary != 1 || nary != 4 || tokens.length != 2) {
						errorHandler('exp.opr.0');
						terminateExecution();
					}
				}

				switch(nary) {
					case 1: 
						child_completeCode.subarg.push(
							buildPreValue(oprType.toLowerCase(),child.children("li:eq(2)"),tokens[0])
						);
						child_completeCode.subarg.push(tokens[1]);
					break;
					case 2:
						child_completeCode.subarg.push(
							buildPreValue(tokens[0].arg.split('-')[0].toLowerCase(),child.children("li:eq(1)"),tokens[0])
						);
						child_completeCode.subarg.push(tokens[1]);
						child_completeCode.subarg.push(
							buildPreValue(tokens[2].arg.split('-')[0].toLowerCase(),child.children("li:eq(3)"),tokens[2])
						);
					break; 
					case 3: 
						child_completeCode.subarg.push(
							buildPreValue(oprType.toLowerCase(),child.children("li:eq(1)"),tokens[0])
						);
						child_completeCode.subarg.push(tokens[1]);
						child_completeCode.subarg.push(
							buildPreValue(oprType.toLowerCase(),child.children("li:eq(3)"),tokens[2])
						);
						child_completeCode.subarg.push(tokens[3]);
						child_completeCode.subarg.push(
							buildPreValue(oprType.toLowerCase(),child.children("li:eq(5)"),tokens[4])
						);
					break;
					case 4: 

						for(var i=0;i<tokens.length;i++) {
							if(i%2==0) {
								child_completeCode.subarg.push(
									buildPreValue(oprType.toLowerCase(),child.children("li:eq({0})".format(i+1)),tokens[i])
								);
							} else {
								child_completeCode.subarg.push(tokens[i]);
							}
						}

					break;
					default: 
						//error
					break;
				}

				if(child_completeCodeParrent.arg == "" || child_completeCode.arg == "") {
					//error
				}

				child_completeCodeParrent.subarg.push(child_completeCode);

				return child_completeCodeParrent;
			}
		//[END OF] GROUP EXPRESSION


		function initBuild() {
			$('#output section.code-correction').empty();
			var rawCode = buildRaw.init().rawCode;
			return {
				completeCode : {
					declarations: rawCode.declarations,
					main: buildGroupStatement($(CodeInterface), rawCode.main, true)
				}
			};
		}

		return {
			init: initBuild
		};
	})();

	var execute = function(callback, executionInterval) {
		var input = [], 
			output = [];
		var variableMap = {},
			arrayMap = {};
		var executionInterval = 1000;

		var CodeInterface = "#workspace > .pre_startprogram > ol";
		var InputInterface = "#output form";
		var OutputInterface = "#outp-output .outp-inner";

		var groupTokens = [];
		var groupTokensElm = [];

		// $ol == (ol.groupstatement)
		function pushTokens($ol, groupstatement) {
			for(i=groupstatement.length-1; i>=0; i--) {
				groupTokens.push(groupstatement[i]);
				groupTokensElm.push($ol.children("li:eq("+i+")"));
			}
		}

		function execNextStatement() {
			if(groupTokens.length > 0) {
				execStatement(groupTokensElm.pop(), groupTokens.pop());
			}
		}

		function execStatement($p, tokens) {
			if(tokens.token != null) {
				switch(tokens.token) {
					case "IF": execIf($p, tokens, false); break;
					case "IFELSE": execIf($p, tokens, true); break;
					case "ITERATION0": execIteration0($p, tokens); break;
					case "ITERATION1": execIteration1($p, tokens); break;
					case "ITERATION2": execIteration2($p, tokens, false); break;
					case "ITERATION3": execIteration2($p, tokens, true); break;
					case "SETVAR": execSetVar($p, tokens); break;
					case "INCRVAR": execIncrdecrVar($p, tokens, true); break;
					case "DECRVAR": execIncrdecrVar($p, tokens, false); break;
					case "SETARRVAR": execSetArr($p, tokens); break;
					case "INCRARRVAR": execIncrdecrArr($p, tokens, true); break;
					case "DECRARRVAR": execIncrdecrArr($p, tokens, false); break;
					case "PRINT": execPrint($p, tokens, false); break;
					case "INPUT": execInput($p, tokens); break;
					case "PRINTLINE": execPrint($p, tokens, true); break;
					case "__EOF__": terminateExecution(); break;
					default: break;
				}
			}
		}

		function inputHandler(token, callback) {
			var vartype = token.arg.split('-')[0],
			varname = token.subarg[0],
			isOridinaryVar = "",
			value = "",
			liveInputElm = $("<span/>", {'class':'label label-default'});

			$(InputInterface).unbind('submit keydown keyup change');
			$(OutputInterface).append(liveInputElm);

			$('#output a[data-toggle="tab"][href="#outp-output"]').tab("show");
			$(InputInterface).children('span').addClass(vartype).text('input: '+varname);
			$(InputInterface).children('input').prop('disabled', false);
			$(InputInterface).children('input').focus();
			$(InputInterface).on('keydown keyup change', function() {
				value = $(InputInterface).children('input').val();
				liveInputElm.text(value);
			});
			$(InputInterface).submit(function(e) {
				$(InputInterface).children('input').prop('disabled', true);
				value = $(InputInterface).children('input').val();
				liveInputElm.text(value);

				if(dict[vartype].completeToken.validConstant.fn(value)) {
					setVariable({name:varname,type:vartype.toLowerCase(),isOridinaryVar:true},value);
				}
				$(InputInterface).children('input').val("");
				$(InputInterface).children('span').removeClass(vartype).text('input');
				outputHandler("<br/>");
				callback();
				e.preventDefault();
			});
		}

		function outputHandler(o) {
			o = o.replace("\\n", "<br/>");
			output.push(o);
			$('#output a[data-toggle="tab"][href="#outp-output"]').tab("show");
			$(OutputInterface).append(o);
		}

		//VARIABLES&ARRAY CALL
			//validateVariable(variableData : {name,isOridinaryVar[,type,index]})
			function validateVariable(variableData) {
				//check require parameters
				if(variableData.name == null || variableData.isOridinaryVar == null) return {errorCode:1};

				//check whether oridinary variable or array/list variable
				if(variableData.isOridinaryVar) {
					if(!variableMap.hasOwnProperty(variableData.name)) return false;
					if(variableData.type) {
						if(!variableData.type.match(/^(integer|real|logical|string)$/gi)) return {errorCode:1};
						if(variableMap[variableData.name].type != variableData.type) return false;
					}
					return true;
				} else {
					if(!arrayMap.hasOwnProperty(variableData.name)) return false;
					if(variableData.type) {
						if(!variableData.type.match(/^(integer|real|logical|string)$/gi)) return {errorCode:1};
						if(arrayMap[variableData.name].type != variableData.type) return false;
					}
					return true;
				}
			}
			function setVariable(variableData, value) {
				//validate variable and check require parameters
				if(variableData.type == null || value == null || !validateVariable(variableData) || (variableData.isOridinaryVar == null && variableData.index == null)) return {errorCode:1};

				//check whether oridinary variable or array/list variable
				if(variableData.isOridinaryVar) {
					variableMap[variableData.name].value = dict[variableData.type.toUpperCase()].completeToken.parseConstant.fn(value);
					return variableMap[variableData.name].value;
				} else {
					arrayMap[variableData.name].values[variableData.index] = dict[variableData.type.toUpperCase()].completeToken.parseConstant.fn(value);
					return arrayMap[variableData.name].values[variableData.index];
				}
			}
			function incrdecrNumVariable(variableData,isIncrement,value) {
				//validate variable and check require parameters
				if(!variableData.type || isIncrement == null || value == null || !validateVariable(variableData) || (!variableData.isOridinaryVar && !variableData.index) || !variableMap[variableData.name].type.match(/^(integer|real)$/gi)) return {errorCode:1};
				if(!isIncrement) value *= -1;

				//check whether oridinary variable or array/list variable
				if(variableData.isOridinaryVar) {
					if(variableMap[variableData.name].type == "real") {
						variableMap[variableData.name].value = dict[variableData.type.toUpperCase()].completeToken.parseConstant.fn(value);
						variableMap[variableData.name].value = parseFloat(variableMap[variableData.name].value + value);
					} else
					if(variableMap[variableData.name].type == "integer") {
						variableMap[variableData.name].value = parseInt(variableMap[variableData.name].value + value);
					}
					return variableMap[variableData.name].value;
				} else {
					if(arrayMap[variableData.name].type == "real") {
						arrayMap[variableData.name].values[variableData.index] = parseFloat(arrayMap[variableData.name].value[variableData.index] + value);
					} else
					if(arrayMap[variableData.name].type == "integer") {
						arrayMap[variableData.name].values[variableData.index] = parseInt(arrayMap[variableData.name].value[variableData.index] + value);
					}
					return arrayMap[variableData.name].values[variableData.index];
				}
			}
			function getVariable(variableData) {
				if(!validateVariable(variableData)) return {errorCode:1};

				//check whether oridinary variable or array/list variable
				if(variableData.isOridinaryVar) {
					return variableMap[variableData.name].value;
				} else {
					return arrayMap[variableData.name].values[variableData.index];
				}
			}
			function switchBoolVariable(variableData) {
				if(!validateVariable(variableData) || !variableMap[variableData.name].type == 'logical') return {errorCode:1};

				//check whether oridinary variable or array/list variable
				if(variableData.isOridinaryVar) {
					variableMap[variableData.name].value = !Bool(variableMap[variableData.name].value);
					return variableMap[variableData.name].value;
				} else {
					arrayMap[variableData.name].values = !Bool(arrayMap[variableData.name].value);
					return arrayMap[variableData.name].values[variableData.index];
				}
			}
		//[ENDOF] VARIABLES&ARRAY CALL

		//GROUP STATEMENT
			function execIf($p,token,hasElseBlock) {
				var e_arg = $p.find("ol.startexpression:eq(0)");
				var e_child = $p.children(".groupstatement:eq(0)");

				if(token.arg[0] != null) {
					var condition = execLogicalValue(e_arg, token.arg[0]);

					if(token.subtoken) {
						if(condition)  {
							if(token.subtoken[0] && token.subtoken[0].length > 0) {
								pushTokens(e_child, token.subtoken[0]);
							}
						}

						if(hasElseBlock) {
							if(!condition) {
								if(token.subtoken[1] && token.subtoken[1].length > 0) {
									pushTokens(e_child, token.subtoken[1]);
								}
							}
						}
					}
				} else {
					// error --> $p.children(".groupstatement:eq(0)")
				}
				execNextStatement();
			}

			function execIteration0($p,token) {
				var MAXITERATION = 100000000;
				var e_arg = $p.find(">.arg ol.startexpression");
				var e_child = $p.children(".groupstatement:eq(0)");

				//default value
				var endIteration = 0;

				//validate arguments
				if(token.arg[0] != null && token.arg[0].arg.match(/^INTEGER\-CONSTANT$/gi)) {
					endIteration = execIntegerValue(e_arg[0], token.arg[0]);
				}

				for(
					var i=0;
					i<endIteration;
					i++,MAXITERATION--
				) {
					if(MAXITERATION<=0) {
						errorHandler('sta.it0.0',$p);
						terminateExecution();
						break;
					}
					if(token.subtoken.length > 0)  {
						pushTokens(e_child, token.subtoken[0]);
					}
				}

				execNextStatement();
			}

			function execIteration1($p,token) {
				var MAXITERATION = 100000000;
				var e_arg = $p.find("ol.startexpression:eq(0)");
				var e_child = $p.children("ol.groupstatement:eq(0)");

				if(token.arg[0] != null) {
					var condition = execLogicalValue(e_arg, token.arg[0])

					while(condition) {
						if(MAXITERATION<=0) {
							errorHandler('sta.it0.0',$p);
							terminateExecution();
							break;
						}
						if(token.subtoken[0] && token.subtoken[0].length > 0)  {
							pushTokens(e_child, token.subtoken[0]);
						}
						MAXITERATION--;
					}
				}
				execNextStatement();
			}

			function execIteration2($p,token,hasStep) {
				var MAXITERATION = 100000000;
				var e_arg = $p.find(">.arg ol.startexpression");
				var e_child = $p.children(".groupstatement:eq(0)");

				//default value
				var varReference;
				var hasVarReference = false;
				var startIteration = 0;
				var endIteration = 0;
				var step = 1;

				//validate arguments
				if(token.arg[0] != null && token.arg[0].subarg[0] &&
					(
						(token.arg[0].arg.match(/^INTEGER\-VARIABLE$/gi) && 
							validateVariable(
								{
									name:token.arg[0].subarg[0],
									isOridinaryVar:true,
									type: 'integer'
								}
							)
						) || 
						(token.arg[0].arg.match(/^INTEGER\-ARRAY$/gi) && 
							validateVariable(
								{
									name:token.arg[0].subarg[0],
									isOridinaryVar:false,
									type: 'integer',
									index: 0
								}
							)
						)
					)
				) {
					hasVarReference = true;
					varReference = token.arg[0].subarg[0];
				} else {
					errorHandler('sta.it2.0', e_arg.eq(0).children('li'));
				}
				if(token.arg[1] != null && token.arg[1].arg.match(/^INTEGER\-CONSTANT$/gi)) {
					startIteration = execIntegerValue(e_arg[1], token.arg[1]);
				}

				if(token.arg[2] != null && token.arg[2].arg.match(/^INTEGER\-CONSTANT$/gi)) {
					endIteration = execIntegerValue(e_arg[2], token.arg[2]);
				}

				//validate last argument
				if(hasStep && token.arg[3] != null) {
					step = execIntegerValue(e_arg, token.arg[3]);
					if(step == 0) {
						errorHandler('sta.it2.1', e_arg.eq(3).children('li'));
						terminateExecution();
						return;
					}
				} else {
					if(endIteration-startIteration >= 0) {
						step = 1;
					} else {
						step = -1;
					}
				}

				if(hasVarReference) {
					setVariable({name:varReference,type:'integer',isOridinaryVar:true},startIteration)
				}

				for(
					var i=startIteration;
					(i>=startIteration && i<=endIteration) || (i>=endIteration && i<=startIteration);
					i+=step,MAXITERATION--
				) {
					if(MAXITERATION<=0) {
						errorHandler('sta.it0.0',$p);
						terminateExecution();
						break;
					}
					if(token.subtoken.length > 0)  {
						pushTokens(e_child, token.subtoken[0]);
					}
				}
				execNextStatement();
			}

			function execSetVar($p,token) {
				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(0) > li:eq(0)");

				if(token.arg[0] == null || !token.arg[0].arg || !token.arg[0].subarg[0]) {
					//error varname
				}

				if(token.arg[1] == null) {
					//error value
				}

				var varname = token.arg[0].subarg[0];
				var vartype = token.arg[0].arg.split("-")[0].toLowerCase();
				var value;

				if(!validateVariable({name:varname, isOridinaryVar:true, type:vartype})) {
					//error variable
				}
				switch(vartype) {
					case "integer": value = execIntegerValue(e_arg2,token.arg[1]); break;
					case "real": value = execRealValue(e_arg2,token.arg[1]); break;
					case "logical": value = execLogicalValue(e_arg2,token.arg[1]); break;
					case "string": value = execStringValue(e_arg2,token.arg[1]); break;
					default:
						//error value
					break;
				}

				setVariable({name:varname,type:vartype,isOridinaryVar:true},value);
				execNextStatement();
			}

			function execIncrdecrVar($p,token,isIncrement) {
				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg3 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				if(token.arg[0] == null || !token.arg[0].arg || !token.arg[0].subarg[0]) {
					//error varname
				}

				if(token.arg[1] == null) {
					//error value
				}

				var varname = token.arg[0].subarg[0];
				var vartype = token.arg[0].arg.split("-")[0].toLowerCase();
				var value;

				if(!validateVariable({name:varname, isOridinaryVar:true, type:vartype})) {
					//error variable
					execNextStatement();
					return;
				}
				switch(vartype) {
					case "integer": value = execIntegerValue(e_arg3,token.arg[1]); break;
					case "real": value = execRealValue(e_arg3,token.arg[1]); break;
					case "logical": value = execLogicalValue(e_arg3,token.arg[1]); break;
					case "string": value = execStringValue(e_arg3,token.arg[1]); break;
					default:
						//error value
					break;
				}
				if(isIncrement) {
					if(value <= 0) {
						//warning value
					}
					incrdecrNumVariable({name:varname,type:vartype,isOridinaryVar:true},isIncrement,value);
				} else {
					if(value >= 0) {
						//warning value
					}
					incrdecrNumVariable({name:varname,type:vartype,isOridinaryVar:true},isIncrement,value);
				}
				execNextStatement();
			}

			function execSetArr($p,token) {
				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg3 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				if(token.arg[0] == null || !token.arg[0].arg || !token.arg[0].subarg[0]) {
					//error varname
				}

				if(token.arg[1] == null) {
					//error value
				}

				if(token.arg[1] == null) {
					//error index
				}

				var varname = token.arg[0].subarg[0];
				var vartype = token.arg[0].arg.split("-")[0].toLowerCase();
				var index = execIntegerValue(e_arg3,token.arg[0].subarg[1]);
				var value;

				if(!validateVariable({name:varname, isOridinaryVar:false, type:vartype, index: index})) {
					//error variable
				}
				switch(vartype) {
					case "integer": value = execIntegerValue(e_arg3,token.arg[1]); break;
					case "real": value = execRealValue(e_arg3,token.arg[1]); break;
					case "logical": value = execLogicalValue(e_arg3,token.arg[1]); break;
					case "string": value = execStringValue(e_arg3,token.arg[1]); break;
					default:
						//error value
					break;
				}

				setVariable({name:varname,type:vartype,isOridinaryVar:false,index:index},value);
				execNextStatement();
			}

			function execIncrdecrArr($p,token,isIncrement) {
				var e_arg1 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg2 = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var e_arg3 = $p.find("ol.startexpression:eq(1) > li:eq(0)");

				if(token.arg[0] == null || !token.arg[0].arg || !token.arg[0].subarg[0]) {
					//error varname
				}

				if(token.arg[1] == null) {
					//error value
				}

				var varname = token.arg[0].subarg[0];
				var vartype = token.arg[0].arg.split("-")[0].toLowerCase();
				var index = execIntegerValue(e_arg3,token.arg[0].subarg[1]);
				var value;

				if(!validateVariable({name:varname, isOridinaryVar:false, type:vartype, index: index})) {
					//error variable
				}
				switch(vartype) {
					case "integer": value = execIntegerValue(e_arg3,token.arg[1]); break;
					case "real": value = execRealValue(e_arg3,token.arg[1]); break;
					case "logical": value = execLogicalValue(e_arg3,token.arg[1]); break;
					case "string": value = execStringValue(e_arg3,token.arg[1]); break;
					default:
						//error value
					break;
				}
				if(isIncrement) {
					if(value <= 0) {
						//warning value
					}
					incrdecrNumVariable({name:varname,type:vartype,isOridinaryVar:false,index:0},isIncrement,value);
				} else {
					if(value >= 0) {
						//warning value
					}
					incrdecrNumVariable({name:varname,type:vartype,isOridinaryVar:false,index:0},isIncrement,value);
				}
				execNextStatement();
			}

			function execInput($p,token) {
				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)");

				inputHandler(token.arg[0], function() {
					execNextStatement()
				});
			}

			function execPrint($p,token,hasNLine) {
				var e_arg = $p.find("ol.startexpression:eq(0) > li:eq(0)");
				var output = execStringValue(e_arg,token.arg[0]) + ( (hasNLine) ? "<br/>" : "") ;

				outputHandler(output);
				execNextStatement();
			}
		//[ENDOF] GROUP STATEMENT

		//GROUP EXPRESSION
			function execIntegerValue($p,args) {
				//default value
				ret = 0;

				switch(args.subarg[0].arg) {
					case "INTEGER-CONSTANT": return ret = execConstant($p,"INTEGER",args.subarg[0].subarg); break;
					case "INTEGER-VARIABLE": return ret = execVariableConstant($p,"INTEGER",args.subarg[0].subarg); break;
					case "INTEGER-ARRAY": return ret = execArrayConstant($p,"INTEGER",args.subarg[0].subarg); break;
					case "INTEGER-ARITHMETIC-OPERATION": return ret = execOperation($p,"INTEGER","ARITHMETIC",args.subarg[0].subarg); break;
					default: 
						//error --> error handler, elm: parent.children("li:eq("+i+")")
					break;
				}

				return ret;
			}

			function execRealValue($p,args) {
				//default value
				ret = 0.0;

				switch(args.subarg[0].arg) {
					case "REAL-CONSTANT": return ret = execConstant($p,"REAL",args.subarg[0].subarg); break;
					case "REAL-VARIABLE": return ret = execVariableConstant($p,"REAL",args.subarg[0].subarg); break;
					case "REAL-ARRAY": return ret = execArrayConstant($p,"REAL",args.subarg[0].subarg); break;
					case "REAL-ARITHMETIC-OPERATION": return ret = execOperation($p,"REAL","ARITHMETIC",args.subarg[0].subarg); break;
					default: 
						//error --> error handler, elm: parent.children("li:eq("+i+")")
					break;
				}

				return ret;
			}

			function execLogicalValue($p,args) {
				//default value
				ret = false;

				switch(args.subarg[0].arg) {
					case "LOGICAL-CONSTANT": ret = execConstant($p,"LOGICAL",args.subarg[0].subarg); break;
					case "LOGICAL-VARIABLE": ret = execVariableConstant($p,"LOGICAL",args.subarg[0].subarg); break;
					case "LOGICAL-ARRAY": ret = execArrayConstant($p,"LOGICAL",args.subarg[0].subarg); break;
					case "LOGICAL-OPERATION": ret = execOperation($p,"LOGICAL","LOGICAL",args.subarg[0].subarg); break;
					case "RELATIONAL-OPERATION": ret = execRelationalOperation($p,args.subarg[0].subarg); break;
					default: 
						//error --> error handler, elm: parent.children("li:eq("+i+")")
					break;
				}

				return ret;
			}

			function execStringValue($p,args) {
				//default value
				ret = "";

				switch(args.subarg[0].arg.split("-")[0]) {
					case "INTEGER" : ret = execIntegerValue($p, args); break;
					case "REAL" : ret = execRealValue($p, args); break;
					case "RELATIONAL" : case "LOGICAL" : ret = execLogicalValue($p, args); break;
					case "STRING" :
						switch(args.subarg[0].arg) {
							case "STRING-CONSTANT": ret = execConstant($p, "STRING", args.subarg[0].subarg); break;
							case "STRING-OPERATION": ret = execOperation($p,"STRING","STRING",args.subarg[0].subarg); break;
							case "STRING-VARIABLE": ret = execVariableConstant($p, "STRING", args.subarg[0].subarg); break;
							case "STRING-ARRAY": ret = execArrayConstant($p, "STRING", args.subarg[0].subarg); break;
							default: 
								//error --> error handler, elm: parent.children("li:eq("+i+")")
							break;
						}
					break;
				}

				return ret;
			}

			function execVariableConstant($p, type, arg) {
				if(validateVariable({
					name:arg[0],
					isOridinaryVar:true,
					type:type.toLowerCase()
				})) {
					return getVariable({
						name:arg[0],
						isOridinaryVar:true,
						type:type.toLowerCase()
					});
				} else {
					return execConstant($p,type,[null]);
				}
			}

			function execArrayConstant($p, type, variable) {

				var varname = variable[0];
				var varidx = execIntegerValue($p.find("ol.groupexpression:eq(0) > li.exprdefault:eq(0)"),variable[1]);

				if(validateVariable({
					name:varname,
					index:varidx,
					isOridinaryVar:false,
					type: type.toLowerCase()
				})) {
					if(getVariable({
						name:varname,
						index:varidx,
						isOridinaryVar:false,
						type:type.toLowerCase()
					}) == undefined) {
						switch(type.toUpperCase()) {
							case "INTEGER" : 
								errorHandler("var.ini.0",$p); break;
							case "REAL" : 
								errorHandler("var.ini.1",$p); break;
							case "LOGICAL" : 
								errorHandler("var.ini.2",$p); break;
							case "STRING" : 
								errorHandler("var.ini.3",$p); break;
						}
						return dict[type.toUpperCase()].completeToken.defaultConstant;
					}
					return getVariable({
						name:varname,
						index:varidx,
						isOridinaryVar:false,
						type:type.toLowerCase()
					});
				} else {
					return execConstant($p,type,[null]);
				}
			}

			function execConstant($p, type, value) {
				var int = function(value) {
					if(dict["INTEGER"].completeToken.validConstant.fn(value)) {
						return parseInt(value);
					} else {
						//send message
						errorHandler('0.0.0');
						return parseInt(0);
					}
				}
				var real = function(value) {
					if(dict["REAL"].completeToken.validConstant.fn(value)) {
						return value;
					} else {
						//send message
						errorHandler('0.0.1');
						return 0.0;
					}
				}
				var bool = function(value) {
					if(dict["LOGICAL"].completeToken.validConstant.fn(value)) {
						return Boolean(value);
					} else {
						//send message
						errorHandler('0.0.2');
						return false;
					}
				}
				var string = function(value) {
					return value.toString();
				}
				switch(type) {
					case "LOGICAL": return bool(value[0]); break;
					case "INTEGER": return int(value[0]); break;
					case "REAL": return real(value[0]); break;
					case "STRING": return string(value[0]); break;
					default: return false; break;
				}
			}

			//build postfix expression
			function execRelationalOperation($p,args) {
				var e_arg = $p.find("ol.groupexpression:eq(0)");
				var operatorPriority = {
					//LOGICAL
					'OP-AND': {priorityLevel: 6},
					'OP-XOR': {priorityLevel: 5},
					'OP-OR': {priorityLevel: 4},

					//RELATIONAL
					'OP-LE': {priorityLevel: 3},
					'OP-LT': {priorityLevel: 3},
					'OP-GE': {priorityLevel: 3},
					'OP-GT': {priorityLevel: 3},
					'OP-EQ': {priorityLevel: 3},
					'OP-NE': {priorityLevel: 3},

					//ARITHMETIC
					'OP-MUL': {priorityLevel: 2},
					'OP-DIV': {priorityLevel: 2},
					'OP-MOD': {priorityLevel: 2},

					'OP-ADD': {priorityLevel: 1},
					'OP-SUB': {priorityLevel: 1},
				};

				var exprlen = args[0].subarg.length;

				// validation function
				var isValidOperator = function(arg) {
					return arg.match(/^(OP\-(LE|LT|GE|GT|EQ|NE))$/gi);
				}

				var isValidOperand = function(arg) {
					return arg.match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi);
				}

				var stackOpr = [];
				var postfix = [];

				// OPERATOR 
				if(isValidOperator(args[0].subarg[1].toString())) {
					obj_in = args[0].subarg[1].toString();
					if(stackOpr.length > 0) {
						var recent_op = stackOpr[stackOpr.length-1];
						if(operatorPriority[obj_in].priorityLevel > operatorPriority[recent_op].priorityLevel) {
							stackOpr.push(obj_in);
						} else {
							postfix.push(stackOpr.pop());
							stackOpr.push(obj_in);
						}
					} else {
						stackOpr.push(obj_in);
					}
				}

				// OPERAND 
				if(isValidOperand(args[0].subarg[0].arg) && isValidOperand(args[0].subarg[2].arg) && args[0].subarg[0].arg == args[0].subarg[2].arg) {
					switch(args[0].subarg[0].arg.split('-')[0]) {
						case "INTEGER" : 
							postfix.push(execIntegerValue(e_arg.children("li.expr:eq(0)"),args[0].subarg[0]));
							postfix.push(execIntegerValue(e_arg.children("li.expr:eq(2)"),args[0].subarg[2]));
						break;
						case "REAL" : 
							postfix.push(execRealValue(e_arg.children("li.expr:eq(0)"),args[0].subarg[0].subarg)); 
							postfix.push(execRealValue(e_arg.children("li.expr:eq(3)"),args[0].subarg[2].subarg)); 
						break;
						case "LOGICAL" : 
							postfix.push(execLogicalValue(e_arg.children("li.expr:eq(0)"),args[0].subarg[0]));
							postfix.push(execLogicalValue(e_arg.children("li.expr:eq(3)"),args[0].subarg[2]));
						break;
						case "STRING" : 
							postfix.push(execStringValue(e_arg.children("li.expr:eq(0)"),args[0].subarg[0]));
							postfix.push(execStringValue(e_arg.children("li.expr:eq(3)"),args[0].subarg[2]));
						break;
						default: return [];
					}
				}

				while(stackOpr.length > 0) postfix.push(stackOpr.pop());

				return evaluatePostfix(postfix,"RELATIONAL");
			}

			function execOperation($p,dataType,operationType,args) {
				var e_arg = $p.find("ol.groupexpression:eq(0)");
				var operatorPriority = {
					//ARITHMETIC
					'OP-CON': {priorityLevel: 7},
					//LOGICAL
					'OP-AND': {priorityLevel: 6},
					'OP-XOR': {priorityLevel: 5},
					'OP-OR': {priorityLevel: 4},

					//RELATIONAL
					'OP-LE': {priorityLevel: 3},
					'OP-LT': {priorityLevel: 3},
					'OP-GE': {priorityLevel: 3},
					'OP-GT': {priorityLevel: 3},
					'OP-EQ': {priorityLevel: 3},
					'OP-NE': {priorityLevel: 3},

					//ARITHMETIC
					'OP-MUL': {priorityLevel: 2},
					'OP-DIV': {priorityLevel: 2},
					'OP-MOD': {priorityLevel: 2},

					'OP-ADD': {priorityLevel: 1},
					'OP-SUB': {priorityLevel: 1},

				};

				var exprlen = args[0].subarg.length;

				// validation function
				var isValidOperator = function(arg) {
					switch(operationType) {
						case "ARITHMETIC" : return arg.match(/^(OP\-(MUL|DIV|MOD|ADD|SUB))$/gi); break;
						case "LOGICAL" : return arg.match(/^(OP\-(NOT|AND|XOR|OR))$/gi); break;
						case "STRING" : return arg.match(/^(OP\-(CON))$/gi); break;
						default: return false;
					}
				}

				var isValidOperand = function(arg) {
					switch(dataType) {
						case "INTEGER" : return arg.match(/^(INTEGER\-CONSTANT)$/gi); break;
						case "REAL" : return arg.match(/^(REAL\-CONSTANT)$/gi); break;
						case "LOGICAL" : return arg.match(/^(LOGICAL\-CONSTANT)$/gi); break;
						case "STRING" : return arg.match(/^(STRING\-CONSTANT)$/gi); break;
						default: return false;
					}
				}

				var stackOpr = [];
				var postfix = [];
				for(var i=0; i < exprlen; i++) {
					var obj_in = args[0].subarg[i].arg;

					// OPERATOR 
					if(i%2 != 0 && isValidOperator(args[0].subarg[i].toString())) {
						obj_in = args[0].subarg[i].toString();
						if(stackOpr.length > 0) {
							var recent_op = stackOpr[stackOpr.length-1];
							if(operatorPriority[obj_in].priorityLevel > operatorPriority[recent_op].priorityLevel) {
								stackOpr.push(obj_in);
							} else {
								postfix.push(stackOpr.pop());
								stackOpr.push(obj_in);
							}
						} else {
							stackOpr.push(obj_in);
						}
					} else
					// OPERAND 
					if(isValidOperand(obj_in)) {
						switch(dataType) {
							case "INTEGER" : postfix.push(execIntegerValue(e_arg.children("li.expr:eq("+i+")"),args[0].subarg[i])); break;
							case "REAL" : postfix.push(execRealValue(e_arg.children("li.expr:eq("+i+")"),args[0].subarg[i].subarg)); break;
							case "LOGICAL" : postfix.push(execLogicalValue(e_arg.children("li.expr:eq("+i+")"),args[0].subarg[i])); break;
							case "STRING" : postfix.push(execStringValue(e_arg.children("li.expr:eq("+i+")"),args[0].subarg[i])); break;
							default: return [];
						}
					} else {
						//error parsing expression: id tokens[0][i].id
						//suggestion, remove the red element and add new one
						return [];
					}
				}
				while(stackOpr.length > 0) postfix.push(stackOpr.pop());

				return evaluatePostfix(postfix,operationType);
			}

			function evaluatePostfix(postfix,operationType) {
				var perform_logical = function(opr1,op,opr2) {
					switch(op) {
						case "OP-NOT": return !opr1;
						break;
						case "OP-AND": return opr2 && opr1;
						break;
						case "OP-OR": return opr2 || opr1;
						break;
						case "OP-XOR": return (opr2 ^ opr1 == 1 ? true : false);
						break;
					}
				}
				var perform_relational = function(opr1,op,opr2) {
					switch(op) {
						case "OP-LE": return opr2 <= opr1;
						break;
						case "OP-LT": return opr2 < opr1;
						break;
						case "OP-GE": return opr2 > opr1;
						break;
						case "OP-GT": return opr2 >= opr1;
						break;
						case "OP-EQ": return opr2 == opr1;
						break;
						case "OP-NE": return opr2 != opr1;
						break;
					}
				}
				var perform_arithmetic = function(opr1,op,opr2) {
					switch(op) {
						case "OP-ADD": return opr2 + opr1;
						break;
						case "OP-SUB": return opr2 - opr1;
						break;
						case "OP-MUL": return opr2 * opr1;
						break;
						case "OP-DIV": return opr2 / opr1;
						break;
						case "OP-MOD": return opr2 % opr1;
						break;
					}
				}
				var perform_string = function(opr1,op,opr2) {
					switch(op) {
						case "OP-CON": return opr2 + opr1;
						break;
					}
				}

				var evalStack = [];
				for(var i=0;i<postfix.length;i++) {
					// OPERATOR 
					if(postfix[i] && postfix[i].toString().match(/^(OP\-[A-Z]*)$/gi)) {
						if(evalStack.length >= 1) {
							switch(operationType) {
								case "LOGICAL": evalStack.push(perform_logical(evalStack.pop(), postfix[i], evalStack.pop())); break;
								case "RELATIONAL": evalStack.push(perform_relational(evalStack.pop(), postfix[i], evalStack.pop())); break;
								case "ARITHMETIC": evalStack.push(perform_arithmetic(evalStack.pop(), postfix[i], evalStack.pop())); break;
								case "STRING": evalStack.push(perform_string(evalStack.pop(), postfix[i], evalStack.pop())); break;
								default : //parsing error;
							}
						} else {
							//parsing error
						}
					} 
					// OPERAND  
					else {
						evalStack.push(postfix[i]);
					}
				}

				if(evalStack.length == 1)
					return evalStack[0];
				else {
					//parsing error
				}
			}

		//[ENDOF] GROUP EXPRESSION

		function terminateExecution(immediate) {
			resetLocalVar();
			if(immediate) {
				callback();
			} else {
				setTimeout(function() {
					callback();
				}, 500);
			}
			return;
		}

		function initExecution() {
			var completeCode = jQuery.extend(true, {}, buildComplete.init().completeCode);
			$(OutputInterface).empty();
			$(InputInterface).val("");
			errorHandler_RemovePointElm();
			$('#compilerMessage').text(messageCount);

			if(completeCode.declarations) {
				if(completeCode.declarations.variable) {
					variableMap = completeCode.declarations.variable
				}
				if(completeCode.declarations.array) {
					arrayMap = completeCode.declarations.array
				}
			}
			if(completeCode.main) {
				pushTokens($(CodeInterface), completeCode.main);
				execNextStatement();
			}
		}

		function resetLocalVar() {
			variableMap = {},
			arrayMap = {};
			messageCount = 0;
			groupTokens = [];
			routineIndex = -1;
		}

		this.start = function() {
			initExecution();
		}

		this.stop = function(immediate) {
			terminateExecution(immediate);
		}

	};

	var buildRawCode = function() {
		return buildRaw.init();
	}

	return {
		buildRawCode: buildRawCode,
		execute: execute,
	}
}();