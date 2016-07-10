/* Command Design: Construct Gui */

	/* Data Dictionary */

	var guides = {
		"IF": { name: "IF" },
		"IFELSE": { name: "IFELSE" },
		"ITERATION0": { name: "ITERASI 0" },
		"ITERATION1": { name: "ITERASI 1" },
		"ITERATION2": { name: "ITERASI 2" },
		"ITERATION3": { name: "ITERASI 3" },
		"SETVAR": { name: "SET VARIABEL" },
		"INCRVAR": { name: "INCREMENT VARIABEL" },
		"DECRVAR": { name: "DECREMENT VARIABEL" },
		"SETARRVAR": { name: "SET VARIABEL LIST" },
		"INCRARRVAR": { name: "INCREMENT VARIABEL LIST" },
		"DECRARRVAR": { name: "DECREMENT VARIABEL LIST" },
		"PRINT": { name: "CETAK" },
		"PRINTLINE": { name: "CETAK & PINDAH BARIS" },
		"INPUT": { name: "INPUT" },
		"INTEGER-BINARY-OPERATION": { name: "OPRERATOR INTEGER" },
		"INTEGER-TERNARY-OPERATION": { name: "OPRERATOR INTEGER" },
		"REAL-BINARY-OPERATION": { name: "OPRERATOR REAL" },
		"REAL-TERNARY-OPERATION": { name: "OPRERATOR REAL" },
		"LOGICAL-UNARY-OPERATION": { name: "OPRERATOR LOGICAL" },
		"LOGICAL-BINARY-OPERATION": { name: "OPRERATOR LOGICAL" },
		"LOGICAL-TERNARY-OPERATION": { name: "OPRERATOR LOGICAL" },
		"RELATIONAL-BINARY-OPERATION": { name: "OPRERATOR RELATIONAL" },
		"STRING-BINARY-OPERATION": { name: "OPRERATOR STRING" },
		"STRING-TERNARY-OPERATION": { name: "OPRERATOR STRING" },
		"INTEGER-VARIABLE": { name: "VARIABEL INTEGER" },
		"REAL-VARIABLE": { name: "VARIABEL REAL" },
		"LOGICAL-VARIABLE": { name: "VARIABEL LOGICAL" },
		"STRING-VARIABLE": { name: "VARIABEL STRING" },
		"INTEGER-ARRAY": { name: "VARIABEL LIST INTEGER" },
		"REAL-ARRAY": { name: "VARIABEL LIST REAL" },
		"LOGICAL-ARRAY": { name: "VARIABEL LIST LOGICAL" },
		"STRING-ARRAY": { name: "VARIABEL LIST STRING" }
	}
	var dict = {
		"integer" : {
			dataLabel : {
				arrName : "INTEGER-ARRAY",
				arrLabel : "AI",
				arrFullLabel : "Array Integer",
				varName : "INTEGER-VARIABLE",
				varLabel : "VI",
				varFullLabel : "Variabel Integer",
				constName : "INTEGER-CONSTANT",
				consLabel : "NI",
				consFullLabel : "Nilai Integer",
				operation : {
					1 : "INTEGER-UNARY-OPERATION",
					2 : "INTEGER-BINARY-OPERATION",
					3 : "INTEGER-TERNARY-OPERATION",
					4 : "INTEGER-NARY-OPERATION"
				},
				operator : {
					ADD : 'OP-ADD',
					SUB : 'OP-SUB',
					MUL : 'OP-MUL',
					DIV : 'OP-DIV',
					MOD : 'OP-MOD'
				},
				operatorName : {
					ADD : 'Penjumlahan',
					SUB : 'Pengurangan',
					MUL : 'Perkalian',
					DIV : 'Pembagian',
					MOD : 'Modulus'
				},
				operatorLabel : {
					ADD : '\u002B',
					SUB : '\u2212',
					MUL : '\u00D7',
					DIV : '\u2215',
					MOD : '%'
				},
				defOperator : 'ADD'
			},
			dataToken : {
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
			},
			spinner : {
				buttondown_class: "btn expr-input-btn",
				buttonup_class: "btn expr-input-btn",
				prefix_extraclass: "expr-input-prefix",
				min: -2147483648,
				max: 2147483647,
				stepinterval: 1,
				maxboostedstep: 10,
				prefix: 'integer'
			}
		},
		"real" : {
			dataLabel : {
				arrName : "REAL-ARRAY",
				arrLabel : "AR",
				arrFullLabel : "Array Real",
				varName : "REAL-VARIABLE",
				varLabel : "VR",
				varFullLabel : "Variabel Real",
				constName : "REAL-CONSTANT",
				consLabel : "NR",
				consFullLabel : "Nilai Real",
				operation : {
					1 : "REAL-UNARY-OPERATION",
					2 : "REAL-BINARY-OPERATION",
					3 : "REAL-TERNARY-OPERATION",
					4 : "REAL-NARY-OPERATION"
				},
				operator : {
					ADD : 'OP-ADD',
					SUB : 'OP-SUB',
					MUL : 'OP-MUL',
					DIV : 'OP-DIV'
				},
				operatorName : {
					ADD : 'Penjumlahan',
					SUB : 'Pengurangan',
					MUL : 'Perkalian',
					DIV : 'Pembagian'
				},
				operatorLabel : {
					ADD : '\u002B',
					SUB : '\u2212',
					MUL : '\u00D7',
					DIV : '\u2215',
				},
				defOperator : 'ADD'
			},
			dataToken : {
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
			},
			spinner : false
		},
		"logical" : {
			dataLabel : {
				arrName : "LOGICAL-ARRAY",
				arrLabel : "AL",
				arrFullLabel : "Array Logical",
				varName : "LOGICAL-VARIABLE",
				varLabel : "VL",
				varFullLabel : "Variabel Logical (Boolean)",
				constName : "LOGICAL-CONSTANT",
				consLabel : "NL",
				consFullLabel : "Nilai Logical (Boolean)",
				operation : {
					1 : "LOGICAL-UNARY-OPERATION",
					2 : "LOGICAL-BINARY-OPERATION",
					3 : "LOGICAL-TERNARY-OPERATION",
					4 : "LOGICAL-NARY-OPERATION"
				},
				operatorNot : {
					NOT : 'OP-NOT',
				},
				operator : {
					AND : 'OP-AND',
					OR : 'OP-OR',
					XOR : 'OP-XOR'
				},
				operatorName : {
					NOT : 'Negasi',
					AND : 'Logika AND',
					OR : 'Logika OR',
					XOR : 'Logika XOR'
				},
				operatorLabel : {
					NOT : '\u0021',
					AND : '\u0026',
					OR : '\u2225',
					XOR : '\u2295'
				},
				defOperator : 'AND'
			},
			dataToken : {
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
			},
			spinner : {
				buttondown_class: "btn expr-input-btn",
				buttonup_class: "btn expr-input-btn",
				prefix_extraclass: "expr-input-prefix",
				min: 0,
				max: 1,
				stepinterval: 1,
				maxboostedstep: 1,
				prefix: 'logical'
			}
		},
		"logicalrelational" : {
			dataLabel : {
				constName : "STRING-CONSTANT",
				consLabel : "NS",
				consFullLabel : "Nilai String",
				operation : {
					2 : "RELATIONAL-BINARY-OPERATION"
				},
				operator : {
					EQ : 'OP-EQ',
					NE : 'OP-NE',
					LT : 'OP-LT',
					LE : 'OP-LE',
					GT : 'OP-GT',
					GE : 'OP-GE'
				},
				operatorName : {
					EQ : 'Sama Dengan',
					NE : 'Tidak Sama Dengan',
					LT : 'Kurang Dari',
					LE : 'Kurang Dari atau Sama Dengan',
					GT : 'Lebih Dari',
					GE : 'Lebih Dari atau Sama Dengan'
				},
				operatorLabel : {
					EQ : '==',
					NE : '\u2260',
					LT : '\u003C',
					LE : '\u2264',
					GT : '\u003E',
					GE : '\u2265'
				},
				defOperator : 'EQ'
			},
			dataToken : {
				constIdentifier : "STRING-CONSTANT",
				operationIdentifier : "STRING-OPERATION",
				operation : {
					2 : "STRING-BINARY-OPERATION",
					3 : "STRING-TERNARY-OPERATION"
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
			},
		},
		"string" : {
			dataLabel : {
				arrName : "STRING-ARRAY",
				arrLabel : "AS",
				arrFullLabel : "Array String",
				varName : "STRING-VARIABLE",
				varLabel : "VS",
				varFullLabel : "Variabel String",
				constName : "STRING-CONSTANT",
				consLabel : "NS",
				consFullLabel : "Nilai String",
				operation : {
					2 : "STRING-BINARY-OPERATION",
					3 : "STRING-TERNARY-OPERATION",
					4 : "STRING-NARY-OPERATION"
				},
				operator : {
					CONCAT : 'OP-CON'
				},
				operatorName : {
					CONCAT : 'Gabung String (Concatenation)'
				},
				operatorLabel : {
					CONCAT : '\u2022'
				},
				defOperator : 'CONCAT'
			},
			dataToken : {
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
			},
			spinner : false
		}
	}
	/* Data Dictionary */


	/* Command Center */
		var commandCenter = [null];
		var commandCenter_Inverse = [null];
		var maxCommandHandle = 20;
		var commandLastIndex = -1;
		var addCommand = function(fncommand, fncommand_inverse) {
			if(commandCenter.length == 20) {
				removeCommand();
			}
			
			commandLastIndex = commandCenter.push(fncommand) - 1;
			commandCenter_Inverse.push(fncommand_inverse);
			if(commandCenter.length > 0) {
				$('.action-undo').removeClass('inactive');
			}
		}
		var checkIndex = function(forward) {
			if(forward == true && commandLastIndex == commandCenter_Inverse.length-1 || 
				forward == false && commandLastIndex == 0 ||
				commandLastIndex == -1
			) {
				return false;
			}
			return true;
		}
		var changeIndex = function(forward) {
			commandLastIndex += (forward == true ? 1 : -1);
			if(commandLastIndex == 0) {
				$('.action-undo').addClass('inactive');
				if(commandCenter.length > 1) {
					$('.action-redo').removeClass('inactive');
				}
			} else if(commandLastIndex == commandCenter.length-1) {
				$('.action-redo').addClass('inactive');
				if(commandCenter.length > 1) {
					$('.action-undo').removeClass('inactive');
				}
			}
		}
		var removeCommand = function() {
			commandCenter.pop();
			commandCenter_Inverse.pop();
		}
		var undoCommand_ = function() {
			if(checkIndex(false) == false) {
				return false;
			} else {
				if(typeof(commandCenter[commandLastIndex]) == "function") {
					(commandCenter[commandLastIndex])();
				}
				changeIndex(false);
				return true;
			}
		}
		var redoCommand_ = function() {
			if(checkIndex(true) == false) {
				return false;
			} else {
				changeIndex(true);
				if(typeof(commandCenter_Inverse[commandLastIndex]) == "function") {
					(commandCenter_Inverse[commandLastIndex])();
				}
				return true;
			}
		}
	/* Command Center */

	/* Context Menu */
		var contextmenu = $('<div id="pre_diagram_context-menu"><ul id="diagram_context-menu"></ul></div>');
		var appendDiagramContextMenu = function(elm, data, globalHandler) {
			$("body").append(contextmenu);
			$(contextmenu).children("ul").empty();
			for(var i=0;i<data.length;i++) {
				if(Object.keys(data[i]).length === 0) {
					$(contextmenu).children("ul").append('<li class="divider"></li>');
				} else {
					$(contextmenu).children("ul").append(
						$('<li/>').append(
							$('<div/>').data({'Ikey':data[i].key,'id':i}).append(
								data[i].title
							).append(
								$('<span/>').append(
									data[i].icon
								)
							).bind("click", function(e){
								if(data[$(this).data('id')].child != null && typeof(data[$(this).data('id')].child) == "object") {
									appendDiagramContextMenu(elm, data[$(this).data('id')].child, null);
									e.preventDefault();
									return false;
								} else if(typeof(data[$(this).data('id')].event) == "function") {
									data[$(this).data('id')].event($(this).data('id'));
								} else if(typeof(globalHandler) == "function") {
									globalHandler($(this).data('Ikey'));
								}
							})
						)
					);
				}
			}
			if(elm.offset().top+elm.height()+contextmenu.height() <= $(window).height()) {
				var posX = elm.offset().left + elm.width()/2;
				var posY = elm.offset().top + elm.height();
				var show = "below";
			} else {
				var posX = elm.offset().left + elm.width()/2;
				var posY = elm.offset().top - contextmenu.height();
				var show = "above";
			}
			contextmenu.attr('class',show);
			contextmenu.css({left:posX+'px',top:posY+'px'});
			contextmenu.addClass("active");
		}
		var removeDiagramContextMenu = function() {
			contextmenu.remove();
		}
		$("body").bind('click contextmenu', function() {
			removeDiagramContextMenu();
		});
	/* Context Menu */


	/* Scroll Diagram */
		jQuery.fn.scrollTo = function(elem, speed) { 
			$(this).animate({
				scrollTop:  $(this).scrollTop() - $(this).offset().top + $(elem).offset().top 
			}, speed == undefined ? 1000 : speed); 
			return this; 
		};
		var scrollToSelectedDiagram = function() {
			if($(selectedDiagram).length && hasSelectedDiagram) {
				$('.pre_startprogram').scrollTo($(selectedDiagram), 500);
			}
		}
	/* Selected Diagram */

	/* Selected Diagram */
		var selectedDiagram = null;
		var isSelectedDiagramExpr = null;
		var hasSelectedDiagram = false;
		var selectDiagram = function(item, isExpr) {
			$('.action-viewSelectedDiagram > a').removeClass('disabled').html('<i class="fa fa-hand-pointer-o"/>*');
			
			$('.action-viewSelectedDiagram #main-navigation .dropdown-submenu > a').html(
				'<label class="label label-default" title="statement">s</label> ' + guides[item.data('token')].name
			)
			//.text(guides[item.data('token')].name)
			if($(selectedDiagram).length) {
				$(selectedDiagram).removeClass('selected');
			}
			isSelectedDiagramExpr = isExpr;
			selectedDiagram = item;
			$(selectedDiagram).addClass('selected')
			hasSelectedDiagram = true;
		}
		var deleteSelectedDiagram = function() {
			if($(selectedDiagram).length && hasSelectedDiagram) {

				$('.action-viewSelectedDiagram > a').html('<i class="fa fa-hand-pointer-o"/>').addClass('disabled');

				deleteDiagram(selectedDiagram);

				selectedDiagram = null;
				isSelectedDiagramExpr = null;
				hasSelectedDiagram = false;
			}
		}
		var deleteDiagram = function(elm) {
			if($(elm).length) {
				if(isSelectedDiagramExpr == true) {
                	recover_token($('<li data-token="'+$(elm).parent('ol').data('roottoken')+'" data-arg_type="'+$(elm).parent('ol').data('roottoken').split('-')[0]+'"/>').insertAfter($item));
				}
				$(elm).remove();
			}
		}

		$('html').keyup(function(e){
			if(hasSelectedDiagram && e.keyCode == 46) {
				deleteSelectedDiagram();
				hasSelectedDiagram = false;
			}
		}) 

	/* Selected Diagram */

	/* The Invoker function */
		var GuiWorkspaceDiagramManager = function() {
			this.execute = function(command) {
				command.execute();
			}
		}
	/* [End Of] The Invoker function */


	/* The Receiver function */
		var GenerateDiagram = function() {
			var setDefaultExpression = function(type) {
				return {
					arg: dict[type].dataToken.constIdentifier,
					subarg: [
						dict[type].dataToken.defaultConstant
					]
				};
			}

			var genGroupStatement = function(token, $parent) {
				if($parent == null) {
					$parent = $('<ol/>', {
						'class':'groupstatement'
					});
				}

				if(token != null) {
					for(var i = 0; i < token.length;i++) {
						$parent.append(
							genStatement(token[i])
						)
					}
				}

				return $parent;
			}

			this.build = function(token, $interface) {
				genGroupStatement(token, $interface);
			}

			this.genStatement = function(token) {
				if(token != null && token.hasOwnProperty('token')) {
					switch(token.token) {
						case "IF": return genIf(token); break;
						case "IFELSE": return genIfElse(token); break;
						case "ITERATION0": return genIteration0(token); break;
						case "ITERATION1": return genIteration1(token); break;
						case "ITERATION2": return genIteration2(token,false); break;
						case "ITERATION3": return genIteration2(token,true);break;
						case "SETVAR": return genSetVar(token, true);break;
						case "INCRVAR": return genIncrDecrVar(token, true, true); break;
						case "DECRVAR": return genIncrDecrVar(token, false, true); break;
						case "SETARRVAR": return genSetVar(token, false); break;
						case "INCRARRVAR": return genIncrDecrVar(token, true, false); break;
						case "DECRARRVAR": return genIncrDecrVar(token, false, false); break;
						case "INPUT": return genInput(token); break;
						case "PRINT":  return genPrint(token, false); break;
						case "PRINTLINE": return genPrint(token, true); break;
						default: 
							//error --> error handler, elm: child.eq(i)
							errorHandler("gen.1",child.eq(i));
							return;
						break;
					}
				} else {
					//error --> error handler, keyword salah
				}
			}

			this.genExpression = function(token, args) {
				if(token != null && token.hasOwnProperty('arg')) {
					switch(token.arg) {
						case String(token.arg.match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi)) :
							return genAllValue(token);
						break;
						case String(token.arg.match(/^(INTEGER\-(BINARY|TERNARY)|REAL\-(BINARY|TERNARY)|LOGICAL\-(UNARY|BINARY|TERNARY)|RELATIONAL\-BINARY|STRING\-(BINARY|TERNARY))\-OPERATION$/gi)) :
							return genOperation(args.arity, args.type, token.subarg);
						break;
						case String(token.arg.match(/^((ANY|INTEGER|REAL|LOGICAL|STRING)\-VARIABLE)$/gi)) :
							return genVariable(token);
						break;
						case String(token.arg.match(/^((INTEGER|REAL|LOGICAL|STRING)\-ARRAY)$/gi)) :
							return genVariable(token);
						default: 
							//error --> error handler, elm: child.eq(i)
							errorHandler("gen.1",child.eq(i));
							return;
						break;
					}
				} else {
					//error --> error handler, keyword salah
				}
			}

			//STATAMENT : VISIBLE//
				var genStatement = function(token) {
					if(token != null && token.hasOwnProperty('token')) {
						switch(token.token) {
							case "IF": return genIf(token); break;
							case "IFELSE": return genIfElse(token); break;
							case "ITERATION0": return genIteration0(token); break;
							case "ITERATION1": return genIteration1(token); break;
							case "ITERATION2": return genIteration2(token,false); break;
							case "ITERATION3": return genIteration2(token,true);break;
							case "SETVAR": return genSetVar(token, true);break;
							case "INCRVAR": return genIncrDecrVar(token, true, true); break;
							case "DECRVAR": return genIncrDecrVar(token, false, true); break;
							case "SETARRVAR": return genSetVar(token, false); break;
							case "INCRARRVAR": return genIncrDecrVar(token, true, false); break;
							case "DECRARRVAR": return genIncrDecrVar(token, false, false); break;
							case "INPUT": return genInput(token); break;
							case "PRINT":  return genPrint(token, false); break;
							case "PRINTLINE": return genPrint(token, true); break;
							default: 
								//error --> error handler, elm: child.eq(i)
								errorHandler("gen.1",child.eq(i));
								return;
							break;
						}
					} else {
						//error --> error handler, keyword salah
					}
				}
				var genIf = function(token){
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [setDefaultExpression("logical")];
					}
					if(!token.hasOwnProperty("subtoken")) {
						token.subtoken = [];
					}

					return $("<li/>", {
						'class':'kondisi block-statement',
						'data-token':'IF'
					})
					.append(
						$('<div/>', {
							'class': 'arg'
						}).append(
							$('<span/>', {'class':'commandText'}).append(
								$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
							).append("JIKA")
						).append(
							$('<span/>').append(
								$("<ol/>", {
									'id':'wbox--expr',
									'class':'groupexpression startexpression',
								}).append(
									genPreValue(token.arg[0],"logical")
								)
							)
						)
					)
					.append(genGroupStatement(token.subtoken[0]))
					.append('<span class="block-statement-endline">akhir if <i class="fa fa-level-down"/></span>');
				};

				var genIfElse = function(token){
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [setDefaultExpression("logical")];
					}
					if(!token.hasOwnProperty("subtoken")) {
						token.subtoken = [];
					}

					return $("<li/>", {
						'class':'kondisi block-statement',
						'data-token':'IFELSE'
					})
					.append(
						$('<div/>', {
							'class': 'arg'
						}).append(
							$('<span/>', {'class':'commandText'}).append(
								$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
							).append("JIKA")
						).append(
							$('<span/>').append(
								genPreValue(token.arg[0],"logical")
							)
						)
					)
					.append(genGroupStatement(token.subtoken[0]))
					.append('<span class="block-statement-endline middle">jika tidak benar <i class="fa fa-level-down"/></span>')
					.append(genGroupStatement(token.subtoken[1]))
					.append('<span class="block-statement-endline">akhir if <i class="fa fa-level-down"/></span>');
				};

				var genIteration0 = function(token) {
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [setDefaultExpression("integer")];
					}
					if(!token.hasOwnProperty("subtoken")) {
						token.subtoken = [];
					}

					return $("<li/>", {
						'class':'block-statement perulangan',
						'data-token':'ITERATION0'
					})
					.append(
						$('<div/>', {
							'class': 'arg'
						}).append(
							$('<span/>', {'class':'commandText'}).append(
								$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
							).append("ITERASI SEBANYAK")
						).append(
							$('<span/>',{'class':'commandText'}).append(
								genPreValue(token.arg[0],"integer")
							)
						).append(
							$('<span/>',{'class':'commandText'}).text("KALI")
						)
					)
					.append(genGroupStatement(token.subtoken[0]))
					.append('<span class="block-statement-endline"><i class="fa fa-level-up"/></span>');
				}

				var genIteration1 = function(token) {
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [setDefaultExpression("logical")];
					}
					if(!token.hasOwnProperty("subtoken")) {
						token.subtoken = [];
					}

					return $("<li/>", {
						'class':'block-statement perulangan',
						'data-token':'ITERATION1'
					})
					.append(
						$('<div/>', {
							'class': 'arg'
						}).append(
							$('<span/>', {'class':'commandText'}).append(
								$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
							).append("ITERASI SELAMA KONDISI")
						).append(
							$('<span/>').append(
								genPreValue(token.arg[0],"logical")
							)
						)
					)
					.append(genGroupStatement(token.subtoken[0]))
					.append('<span class="block-statement-endline"><i class="fa fa-level-up"/></span>');
				}

				var genIteration2 = function(token, hasStep) {
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [
							{arg: "INTEGER-VARIABLE", subarg: []},
							setDefaultExpression("integer"),
							setDefaultExpression("integer")
						]
						if(hasStep) {
							token.arg.push(
								setDefaultExpression("integer")
							)
						}
					}
					if(!token.hasOwnProperty("subtoken")) {
						token.subtoken = [];
					}

					var item = $("<li/>", {
						'class':'block-statement perulangan',
						'data-token': hasStep ? 'ITERATION3' : 'ITERATION2'
					});

					//argument
					var argChild = $('<div/>', {
						'class': 'arg'
					}).append(
						$('<span/>', {'class':'commandText'}).append(
							$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
						).append("ITERASI")
					).append(
						$('<span/>').append(
							$('<ol/>', {
								'id' : 'wbox--expr',
								'class': 'groupexpression startexpression nodragexpr',
								'data-roottoken':token.arg[0].arg,
							}).append(
								genVariable(token.arg[0])
							)
						)
					).append(
						$('<span/>',{'class':'commandText'}).text("DARI")
					).append(
						$('<span/>').append(
							genPreValue(token.arg[1],"integer")
						)
					).append(
						$('<span/>',{'class':'commandText'}).text("HINGGA")
					).append(
						$('<span/>').append(
							genPreValue(token.arg[2],"integer")
						)
					);

					if(hasStep) {
						argChild.append(
							$('<span/>',{'class':'commandText'}).text("DALAM")
						).append(
							$('<span/>',{'class':'commandText'}).append(
								genPreValue(token.arg[3],"integer")
							)
						).append(
							$('<span/>',{'class':'commandText'}).text("LANGKAH")
						);
					}

					item
					.append(argChild)
					.append(genGroupStatement(token.subtoken[0]))
					.append('<span class="block-statement-endline"><i class="fa fa-level-up"/></span>');

					return item;
				}

				var genPrint = function(token, hasNLine) {
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [setDefaultExpression("string")];
					}

					var item = $("<li/>", {
						'class':'statement output',
						'data-token':hasNLine ? 'PRINTLINE' : 'PRINT',
					});

					var argChild = $('<div/>', {
						'class': 'arg'
					}).append(
						$('<span/>', {'class':'commandText'}).append(
							$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
						).append("CETAK")
					).append(
						$('<span/>').append(
							genPreValue(token.arg[0],"string")
						)
					);

					if(hasNLine) {
						argChild.append(
							$('<span/>').append(
								$('<i class="fa fa-level-down" style="-webkit-transform: rotate(90deg)"></i>')
							)
						);
					}

					//recover list element to normal form
					item.append($(argChild));

					return item;
				}

				var genInput = function(token) {
					//pre compute
					if(!token.hasOwnProperty("arg")) {
						token.arg = [
							{arg: "ANY-VARIABLE", subarg: []}
						]
					}

					var item = $("<li/>", {
						'class':'statement input',
						'data-token': 'INPUT',
					});

					var argChild = $('<div/>', {
						'class': 'arg'
					}).append(
						$('<span/>', {'class':'commandText'}).append(
							$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
						).append("INPUT")
					).append(
						$('<span/>').append(
							$('<ol/>', {
								'id':'wbox--expr', 
								'class': 'groupexpression startexpression',
								'data-roottoken' : 'ANY-VARIABLE'
							}).append(
								genVariable(token.arg[0])
							)
						)
					);

					//recover list element to normal form
					item.append($(argChild));

					return item;
				}

				var genSetVar = function(token, isOridinaryVar) {
					//pre compute
					if(!token.hasOwnProperty("arg") || token.arg[0] == null) {
						return null;
					}
					if(token.arg[1] == null) {
						token.arg[1] = setDefaultExpression(
							token.arg[0].arg.split("-")[0].toLowerCase()
						);
					}

					return $("<li/>", {
						'class':'statement variabel',
						'data-token': isOridinaryVar ? 'SETVAR' : 'SETARRVAR',
					}).append(
						$('<div/>', {
							'class': 'arg'
						}).append(
							$('<span/>', {'class':'commandText'}).append(
								$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
							).append("NILAI")
						).append(
							$('<span/>').append(
								$('<ol/>', {
									'id' : 'wbox--expr',
									'class': 'groupexpression startexpression nodragexpr'
								}).append(
									genVariable(token.arg[0], true)
								)
							)
						).append(
							$('<span/>',{'class':'commandText'}).text("=")
						).append(
							$('<span/>').append(
								genPreValue(token.arg[1])
							)
						)
					);
				}

				var genIncrDecrVar = function(token, isIncrement, isOridinaryVar) {
					//pre compute
					if(!token.hasOwnProperty("arg") || token.arg[0] == null) {
						return null;
					}
					if(token.arg[1] == null) {
						token.arg[1] = setDefaultExpression(
							token.arg[0].arg.split("-")[0].toLowerCase()
						);
					}
					
					var item = $("<li/>", {
						'class':'statement variabel',
						'data-token': isOridinaryVar ? 
							(isIncrement?'INCRVAR':'DECRVAR') : 
							(isIncrement?'INCRARRVAR':'DECRARRVAR')
					});

					var argChild = $('<div/>', {
						'class': 'arg'
					}).append(
						$('<span/>', {'class':'commandText'}).append(
							$('<span/>').html('<i class="fa fa-bars statement--handle"/>')
						).append((isIncrement?'TAMBAHKAN':'KURANGI'))
					).append(
						$('<span/>').append(
							$('<ol/>', {
								'id' : 'wbox--expr',
								'class': 'groupexpression startexpression nodragexpr'
							}).append(
								genVariable(token.arg[0], true)
							)
						)
					).append(
						$('<span/>',{'class':'commandText'}).text("SEBESAR")
					).append(
						$('<span/>').append(
							genPreValue(token.arg[1])
						)
					)

					item.append($(argChild));

					return item;
				}
			//STATEMENT//

			//EXPRESSION//
				// VISIBLE //
					//base variable
					var genVariable = function(token, nodrag) {
						//pre compute
						var isEmpty = false;
						if(token.subarg[0] == null) {
							token.arg = token.arg.split("-")[0]+"-VARIABLE";
							token.subarg[0] = "Nama Variabel";
							isEmpty = true;
						}

						return token.arg.split("-")[1] == "ARRAY" ?
							gen_ArrayVariable(isEmpty, token, nodrag) :
							gen_Variable(isEmpty, token, nodrag)
					}

					//base empty value
					var genAllValue = function(Targ) {
						switch(Targ.arg.split('-')[0]) {
							case "INTEGER" :
								return genIntegerValue(Targ);
							break;
							case "REAL" :
								return genRealValue(Targ);
							break;
							case "LOGICAL" :
							case "RELATIONAL" :
								return genLogicalValue(Targ);
							break;
							case "STRING" :
								return genStringValue(Targ)
							break;
							default: 
								//error --> error handler, elm: parent.children("li:eq("+i+")")
							break;
						}
					}

					var genOperation = function(arity, type, Targ, opt) {

						var operationType = dict[type].dataLabel.operation[arity],
						defOperator = dict[type].dataLabel.defOperator,
						defOperatorToken = dict[type].dataLabel.operator[defOperator],
						defOperatorLabel = dict[type].dataLabel.operatorLabel[defOperator];

						if(Targ == null) {
							Targ = [];
						}
						for(var i=0;i<arity*2-1;i++) {
							if(i%2 == 0 && Targ[i] == null) {
								Targ[i] = setDefaultExpression(type.toLowerCase());
							} else if(Targ[i] == null) {
								Targ[i] = dict[type].dataLabel.operator[defOperator];
							}
						}

						//required parameters
						if(arity == null || type == null || Targ.length != arity*2-1) return false;

						var itemchild = $('<ol/>', {
							'class': 'groupexpression operation',
							'data-roottoken': dict[type].dataLabel.constName
						}).append(
		                    $('<li/>', {
		                        'class': 'dummylist'
		                    })
		                ).append(
		                	arity == 1 ?
								$('<li/>', {
									'data-token': dict[type].dataLabel.operatorNot["NOT"],
									'class': 'expr exproperator sortable-exclude'
								}).html("<span>"+dict[type].dataLabel.operatorLabel["NOT"]+"</span>").bind("contextmenu",function(e){
									if(!$(this).hasClass('context')) {
										$(this).addClass('context');
									}
									var that = $(this);
									var contextdata = [];
									for(key in dict[type].dataLabel.operatorNot) {
										contextdata.push({
											key: key,
											title : dict[type].dataLabel.operatorName[key], 
											icon: dict[type].dataLabel.operatorLabel[key]
										});
									}
									var changeKey = function(key) {
										that.attr('data-token',dict[type].dataLabel.operatorNot[key]);
										that.data('token',dict[type].dataLabel.operatorNot[key]);
										that.html("<span>"+dict[type].dataLabel.operatorLabel[key]+"</span>");
									}
									appendDiagramContextMenu($(this), contextdata, changeKey);
									return false;
								}) : ""
		                ).append(
		                	genAllValue(Targ[0])
						);

						for(var i=1;i<arity;i++) {
							itemchild.append(
								addOperatorSign(type, arity)
							).append(
								genAllValue(Targ[i*2])
							);
						}
		                itemchild.append(
		                    $('<li/>', {
		                        'class': 'dummylist'
		                    })
		                );

						return $('<li/>', {
							'class': 'expr sortable drag-zone',
							'data-token': operationType,
							'data-arg_type': type,
							'data-arg_arity': arity
						}).append(itemchild);
					}

				// END OF VISIBLE //
				//operator
				function addOperatorSign(type, arity) {
					var defOperator = dict[type].dataLabel.defOperator,
					defOperatorToken = dict[type].dataLabel.operator[defOperator],
					defOperatorLabel = dict[type].dataLabel.operatorLabel[defOperator];

					return $('<li/>', {
						'data-token': defOperatorToken,
						'class': 'expr exproperator sortable-exclude'
					}).html("<span>"+defOperatorLabel+"</span>").bind("contextmenu",function(e){
						if(!$(this).hasClass('context')) {
							$(this).addClass('context');
						}
						var that = $(this);
						var contextdata = [];
						for(key in dict[type].dataLabel.operator) {
							contextdata.push({
								key: key,
								title : dict[type].dataLabel.operatorName[key], 
								icon: dict[type].dataLabel.operatorLabel[key]
							});
						}
						if(type == "logicalrelational") {
							var changeExprType = function(dtype) {
								$(that).prev().remove();
                            	genConstant(dtype).insertBefore(that)
								$(that).next().remove();
                            	genConstant(dtype).insertAfter(that);
							}
							contextdata.push({},{
								title : "Ganti tipe data", 
								icon: '<i class="diagram-sample sample-expr string"></i>',
								child: [
									{
										title : "Integer",
										icon: '<i class="diagram-sample sample-expr integer"></i>',
										event: function() {
											changeExprType("INTEGER");
										},
									},
									{
										title : "Real", 
										icon: '<i class="diagram-sample sample-expr real"></i>',
										event: function() {
											changeExprType("REAL");
										},
									},
									{
										title : "Logical",
										icon: '<i class="diagram-sample sample-expr logical"></i>',
										event: function() {
											changeExprType("LOGICAL");
										},
									},
									{
										title : "String", 
										icon: '<i class="diagram-sample sample-expr string"></i>',
										event: function() {
											changeExprType("STRING");
										},
									}
								]
							});
						} else if(arity != 1) {
							var addArity = function(dtype, arity, isBefore) {
								that.parent("ol").parent("li").data("token", dict[dtype].dataLabel.operation[4]);
								that.parent("ol").parent("li").attr("data-token", dict[dtype].dataLabel.operation[4]);
								if(isBefore) {
									addOperatorSign(dtype, arity).insertBefore(that);
									genConstant(dtype).insertBefore(that);
								} else {
									addOperatorSign(dtype, arity).insertAfter(that);
									genConstant(dtype).insertAfter(that);
								}
							}
							contextdata.push({},{
								title : "Tambahkan Operand di Kanan", 
								icon: "<i class='fa fa-arrow-right'></i>",
								event: function() {
									addArity(type, arity+1, false)
								}
							},{
								title : "Tambahkan Operand di Kiri", 
								icon: "<i class='fa fa-arrow-left'></i>",
								event: function() {
									addArity(type, arity+1, true)
								}
							});
						}
						var changeKey = function(key) {
							that.attr('data-token',dict[type].dataLabel.operator[key]);
							that.data('token',dict[type].dataLabel.operator[key]);
							that.html("<span>"+dict[type].dataLabel.operatorLabel[key]+"</span>");
						}
						appendDiagramContextMenu($(this), contextdata, changeKey);
						return false;
					});

				}


				//variable
				function gen_Variable(isEmpty, token, nodrag) {
					return $('<li/>', {
						'class': 'exprvariable drop-zone' + (!isEmpty? (!nodrag? ' drag-zone' : '') + ' nonemptyvar': ''),
						'data-token':token.arg.toString().toUpperCase(),
						'data-arg_name':token.subarg[0],
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable ' + (isEmpty?'varempty': '')
								}).text(token.subarg[0])
							)
						)
					);
				}

				function gen_ArrayVariable(isEmpty, token, nodrag) {
					return $('<li/>', {
						'class':'expr exprvariable drop-zone ' + (!isEmpty? (!nodrag? ' drag-zone' : '') + ' nonemptyvar': ''),
						'data-token':token.arg.toString().toUpperCase(),
						'data-arg_name':token.subarg[0]
					}).append(
						$('<ol/>', {
							'class': 'groupexpression variablelist',
							'data-roottoken':token.arg.toString().toUpperCase().split("-")[0]+'-CONSTANT'
						}).append(
		                    $('<li/>', {
		                        'class': 'dummylist'
		                    })
		                ).append(
		                    $('<li/>', {
		                        'class': 'expr sortable-exclude context'
		                    }).text(token.subarg[0])
		                ).append(
		                    $('<li/>', {
		                        'class': 'dummylist'
		                    }).text('(')
		                ).append(
		                    genConstant("INTEGER", 0 , 'xmin')
		                ).append(
		                    $('<li/>', {
		                        'class': 'dummylist'
		                    }).text(')')
		                )
					);
				}

				//value
				function genPreValue(Targ,type) {
					if(type == null) {
						var type = Targ.arg.split("-")[0].toLowerCase();
					}

					var root = $('<div/>', {
	                    'class': 'no-offset col-md-12'
	                }).append(
	                    $('<div/>', {
	                        'class': 'row'
	                    }).append(
							$("<ol/>", {
								'id':'wbox--expr',
								'class':'groupexpression startexpression',
								'data-roottoken': type.toUpperCase()+'-CONSTANT'
							}).append(
								type == "integer" ? genIntegerValue(Targ) :
								type == "real" ? genRealValueValue(Targ) :
								type == "logical" ? genLogicalValue(Targ) :
								type == "string" ? genStringValue(Targ) :
								""
							)
	                    )
	                );
	                return root;
				}

				function genIntegerValue(Targ,opt) {
					switch(Targ.arg) {
						case "INTEGER-CONSTANT": 
							return genConstant("INTEGER",Targ.subarg,opt);
						break;
						case "INTEGER-ARRAY": 
						case "INTEGER-VARIABLE": 
							return genVariable(Targ);
						break;
						case "INTEGER-BINARY-OPERATION": 
							return genOperation(2,"integer",Targ.subarg,"min");
						break;
						case "INTEGER-TERNARY-OPERATION": 
							return genOperation(3,"integer",Targ.subarg,opt,"min");
						break;
						default: 
							//error --> error handler, elm: parent.children("li:eq("+i+")")
						break;
					}
				}

				function genRealValue(Targ) {
					switch(Targ.arg) {
						case "REAL-CONSTANT": 
							return genConstant("REAL",Targ.subarg);
						break;
						case "REAL-ARRAY": 
						case "REAL-VARIABLE": 
							return genVariable(Targ);
						break;
						case "REAL-BINARY-OPERATION": 
							return genOperation($p,2,"real",Targ.subarg);
						break;
						case "REAL-TERNARY-OPERATION": 
							return genOperation($p,3,"real",Targ.subarg);
						break;
						default: 
							//error --> error handler, elm: parent.children("li:eq("+i+")")
						break;
					}
				}

				function genLogicalValue(Targ) {
					switch(Targ.arg) {
						case "LOGICAL-CONSTANT": 
							return genConstant("LOGICAL",Targ.subarg);
						break;
						case "LOGICAL-ARRAY": 
						case "LOGICAL-VARIABLE": 
							return genVariable(Targ);
						break;
						case "LOGICAL-UNARY-OPERATION": 
							return genOperation(1,"logical",Targ.subarg);
						break;
						case "LOGICAL-BINARY-OPERATION": 
							return genOperation(2,"logical",Targ.subarg);
						break;
						case "LOGICAL-TERNARY-OPERATION": 
							return genOperation(3,"logical",Targ.subarg);
						break;
						case "RELATIONAL-BINARY-OPERATION": 
							return genOperation(2,"logicalrelational",Targ.subarg);
						break;
						default: 
							//error --> error handler, elm: parent.children("li:eq("+i+")")
						break;
					}
				}

				function genStringValue(Targ) {
					switch(Targ.arg.split('-')[0]) {
						case "INTEGER" :
							return genIntegerValue(Targ);
						break;
						case "REAL" :
							return genRealValue(Targ);
						break;
						case "LOGICAL" :
							return genLogicalValue(Targ);
						break;
						case "STRING" :
							switch(Targ.arg) {
								case "STRING-CONSTANT": 
									return genConstant("STRING",Targ.subarg);
								break;
								case "STRING-ARRAY": 
								case "STRING-VARIABLE": 
									return genVariable(Targ);
								break;
								case "STRING-BINARY-OPERATION": 
									return buildOperation($p,2,"string",Targ.subarg);
								break;
								case "STRING-TERNARY-OPERATION": 
									return buildOperation($p,3,"string",Targ.subarg);
								break;
							}
						break;
					}
				}

				function genConstant(type, Targ, opt) {

					return $('<li/>', {
						'class': 'expr exprdefault sortable drop-zone',
						'data-token': dict[type.toLowerCase()].dataLabel.constName,
					}).append(
						inputBox(
							type.toString().toUpperCase(), 
							Targ != null && Targ[0] != null ? Targ[0] : null,
							opt
						)
					);
				}

				function inputBox(type, constantValue, opt) {
					var opt = opt;

					if(constantValue == null) {
						var constantValue = dict[type.toLowerCase()].dataToken.defaultConstant;
					}

					var input = $('<input/>', {
						'type': 'text',
						'data-token': dict[type.toLowerCase()].dataLabel.constName,
						'class':'input',
						'value': constantValue
					}).attr('size',
						constantValue.toString().length > 1 ?
						constantValue.toString().length :
						1
					);

					$(input).ready(function(e) {
						var that = this;

						window.setTimeout(function(){
							if(type != "STRING" && type != "REAL") {
								$(input).TouchSpin(dict[type.toLowerCase()].spinner);
								if(opt != null && opt == 'xmin') $(input).remove('.input-group-btn,.input-group-addon');
								else if(opt != null && opt == 'min') $(input).remove('.input-group-btn,.input-group-addon');
							}
						}, 0.1 );
					});
					$(input).on('change keydown keyup paste', function() {
						if($(this).val().length > 2){
							$(this).width('auto');
							$(this).attr('size',$(this).val().length);
						} else {
							$(this).attr('size',2);
							$(this).width('');
						}
					});
					$(input).on('click contextmenu', function(e) {
						if(!$(this).parent().hasClass("focus"))
							$(this).parent().toggleClass("focus");
						$(this).focus();
						e.preventDefault();
					});
					$(input).on('blur', function(e) {
						if($(this).parent().hasClass("focus"))
							$(this).parent().toggleClass("focus");
						$(this).html();
					});
					$(input).on('change paste', function(e) {
						$(this).parent().data("value",$(this).val());
					});

					return type == "STRING" || type == "REAL" ?
						$('<div/>', {
							'class':'input-group'
						}).append(
							$('<div/>',{
								'class': 'input-group-addon expr-input-prefix'
							}).text(type.toLowerCase())
						).append(
							$(input)
						) :
						$(input);
				}
			//EXPRESSION//
		}

		var GuiToolboxDiagram = function() {
			//PRIVATE MEMBERS//
				//condition
				var genIf = function() {
					$item = $('<li/>', {
						'data-token':'IF', 
						'class': 'block-statement kondisi statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("JIKA")
						).append(
							$("<span/>", {
								'title':'Nilai Logical (Boolean)', 
								'class': 'exprdefault',
								'data-token': 'LOGICAL-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text("NB")//-->tooltip.tooltip()
						)
					).append('<span class="block-statement-endline">akhir if <i class="fa fa-level-down"/></span>');

					return $item;
				};

				var genIfElse = function() {
					$item = $('<li/>', {
						'data-token':'IFELSE', 
						'class': 'block-statement kondisi statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("JIKA")
						).append(
							$("<span/>", {
								'title':'Nilai Logical (Boolean)', 
								'class': 'exprdefault',
								'data-token': 'LOGICAL-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict['logical'].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					)
					.append('<span class="block-statement-endline" style="margin-bottom:10px">jika tidak benar <i class="fa fa-level-down"/></span><br/>')
					.append('<span class="block-statement-endline">akhir if <i class="fa fa-level-down"/></span>');

					return $item;
				}

				//looping
				var genIteration0 = function() {
					$item = $('<li/>', {
						'data-token':'ITERATION0', 
						'class': 'block-statement perulangan statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("ITERASI SEBANYAK")
						).append(
							$("<span/>", {
								'title':'Nilai Integer', 
								'class': 'exprdefault',
								'data-token': 'INTEGER-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict['integer'].dataLabel.consLabel)//-->tooltip.tooltip()
						).append(
							$("<span/>",{'class':'commandText'}).text("KALI")
						)
					).append('<span class="block-statement-endline"><i class="fa fa-level-up"/></span>');

					return $item;
				}
				var genIteration1 = function() {
					$item = $('<li/>', {
						'data-token':'ITERATION1', 
						'class': 'block-statement perulangan statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("ITERASI SELAMA KONDISI")
						).append(
							$("<span/>", {
								'title':'Nilai Logical (Boolean)', 
								'class': 'exprdefault',
								'data-token': 'LOGICAL-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict['logical'].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					).append('<span class="block-statement-endline"><i class="fa fa-level-up"/></span>');

					return $item;
				}

				var genIteration2 = function(withStep) {
					$item = $('<li/>', {
						'data-token':withStep ? 'ITERATION3' : 'ITERATION2', 
						'class': 'block-statement perulangan statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("ITERASI")
						).append(
							$("<span/>", {
								'title':'Variabel Integer', 
								'class': 'exprdefault',
								'data-token': 'INTEGER-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict['integer'].dataLabel.varLabel)//-->tooltip.tooltip()
						).append(
							$("<span/>",{'class':'commandText'}).text("DARI")
						).append(
							$("<span/>", {
								'title':'Nilai Integer', 
								'class': 'exprdefault',
								'data-token': 'INTEGER-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict['integer'].dataLabel.consLabel)//-->tooltip.tooltip()
						).append(
							$("<span/>",{'class':'commandText'}).text("HINGGA")
						).append(
							$("<span/>", {
								'title':'Nilai Integer', 
								'class': 'exprdefault',
								'data-token': 'INTEGER-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict['integer'].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					).append('<span class="block-statement-endline"><i class="fa fa-level-up"/></span>');

					if(withStep) {
						$item.children(".arg.definition").append(
								$("<span/>",{'class':'commandText'}).text("DALAM")
							).append(
								$("<span/>", {
									'title':'Nilai Integer', 
									'class': 'exprdefault',
									'data-token': 'INTEGER-CONSTANT',
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict['integer'].dataLabel.consLabel)//-->tooltip.tooltip()
							).append(
								$("<span/>",{'class':'commandText'}).text("LANGKAH")
							)
					}

					return $item;
				}

				//variable
				var genSetVar = function(opt) {
					return $('<li/>', {
						'data-token':'SETVAR',
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'statement variabel statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("NILAI")
						).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).text(opt.name)
							)
						).append(
							$("<span/>",{'class':'commandText'}).text("=")
						).append(
							$("<span/>", {
								'title': dict[opt.type].dataLabel.consFullLabel, 
								'class': 'exprdefault',
								'data-token': opt.type.toUpperCase()+'-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					);
				}

				var genIncrDecrVar = function(isIncrement,opt) {
					return $('<li/>', {
						'data-token':(isIncrement?'INCRVAR':'DECRVAR'), 
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'statement variabel statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text((isIncrement?'TAMBAHKAN':'KURANGI'))
						).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).text(opt.name)
							)
						).append(
							$("<span/>",{'class':'commandText'}).text("SEBESAR")
						).append(
							$("<span/>", {
								'title': dict[opt.type].dataLabel.consFullLabel, 
								'class': 'exprdefault',
								'data-token': opt.type.toUpperCase()+'-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					);
				}

				var genExprVar = function(opt) {
					return $('<li/>', {
						'data-token': dict[opt.type].dataLabel.varName, 
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'sortable variable'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).text(opt.name)
							)
						)
					);
				}

				//array
				var genSetArr = function(opt) {
					$item = $('<li/>', {
						'data-token':'SETARRVAR',
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'statement variabel statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text("NILAI")
						).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).append(
									$("<span/>", {class:'varname'}).text(opt.name)
								).append(
									$("<span/>", {class:'varidx'}).append(
										$('<ol/>', {
											'id':'wbox--expr', 
											'class': 'groupexpression startexpression'
										}).append(
											$('<li/>', {
												'data-token': 'INTEGER-CONSTANT',
												'class':'expr exprdefault arridx sortable'
											}).append(
												$('<div/>', {
								                    'class': 'no-offset col-md-12'
								                }).append(
								                    $('<div/>', {
								                        'class': 'row'
								                    }).append(
														$('<div/>', {
															'class':'input-group'
														}).append(
															$('<input/>', {
																'type': 'text',
																'data-token': 'INTEGER-CONSTANT',
																'class':'input',
																'value': 0
															}).on('contextmenu', function(e) {
																if(!$(this).parent().hasClass("focus"))
																	$(this).parent().toggleClass("focus");
																$(this).focus();
																e.preventDefault();
															}).on('change keydown paste', function() {
																if($(this).val().length > 2){
																	$(this).width('auto');
																	$(this).attr('size',$(this).val().length);
																} else {
																	$(this).width('');
																}
															})
														)
								                    )
								                )
											)
										)
									)
								)
							)
						).append(
							$("<span/>",{'class':'commandText'}).text("=")
						).append(
							$("<span/>", {
								'title': dict[opt.type].dataLabel.consFullLabel, 
								'class': 'exprdefault',
								'data-token': opt.type.toUpperCase()+'-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					);

					return $item;
				}

				var genIncrDecrArr = function(isIncrement,opt) {
					$item = $('<li/>', {
						'data-token':(isIncrement?'INCRARRVAR':'DECRARRVAR'), 
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'statement variabel statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text((isIncrement?'TAMBAHKAN':'KURANGI'))
						).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).append(
									$("<span/>", {class:'varname'}).text(opt.name)
								).append(
									$("<span/>", {class:'varidx'}).append(
										$('<ol/>', {
											'id':'wbox--expr', 
											'class': 'groupexpression startexpression'
										}).append(
											$('<li/>', {
												'data-token': 'INTEGER-CONSTANT',
												'class':'expr exprdefault arridx sortable'
											}).append(
												$('<div/>', {
								                    'class': 'no-offset col-md-12'
								                }).append(
								                    $('<div/>', {
								                        'class': 'row'
								                    }).append(
														$('<div/>', {
															'class':'input-group'
														}).append(
															$('<input/>', {
																'type': 'text',
																'data-token': 'INTEGER-CONSTANT',
																'class':'input',
																'value': 0
															}).on('contextmenu', function(e) {
																if(!$(this).parent().hasClass("focus"))
																	$(this).parent().toggleClass("focus");
																$(this).focus();
																e.preventDefault();
															}).on('change keydown paste', function() {
																if($(this).val().length > 2){
																	$(this).width('auto');
																	$(this).attr('size',$(this).val().length);
																} else {
																	$(this).width('');
																}
															})
														)
								                    )
								                )
											)
										)
									)
								)
							)
						).append(
							$("<span/>",{'class':'commandText'}).text("SEBESAR")
						).append(
							$("<span/>", {
								'title': dict[opt.type].dataLabel.consFullLabel, 
								'class': 'exprdefault',
								'data-token': opt.type.toUpperCase()+'-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
						)
					);

					return $item;
				}

				var genExprArr = function(opt) {
					$item = $('<li/>', {
						'data-token': dict[opt.type].dataLabel.arrName, 
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'sortable variable'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).append(
									$("<span/>", {class:'varname'}).text(opt.name)
								).append(
									$("<span/>", {class:'varidx'}).append(
										$('<ol/>', {
											'id':'wbox--expr', 
											'class': 'groupexpression startexpression'
										}).append(
											$('<li/>', {
												'data-token': 'INTEGER-CONSTANT',
												'class':'expr exprdefault arridx sortable'
											}).append(
												$('<div/>', {
								                    'class': 'no-offset col-md-12'
								                }).append(
								                    $('<div/>', {
								                        'class': 'row'
								                    }).append(
														$('<div/>', {
															'class':'input-group'
														}).append(
															$('<input/>', {
																'type': 'text',
																'data-token': 'INTEGER-CONSTANT',
																'class':'input',
																'value': 0
															}).on('contextmenu', function(e) {
																if(!$(this).parent().hasClass("focus"))
																	$(this).parent().toggleClass("focus");
																$(this).focus();
																e.preventDefault();
															}).on('change keydown paste', function() {
																if($(this).val().length > 2){
																	$(this).width('auto');
																	$(this).attr('size',$(this).val().length);
																} else {
																	$(this).width('');
																}
															})
														)
								                    )
								                )
											)
										)
									)
								)
							)
						)
					);

					return $item;
				}

				var genExprArrLen = function(opt) {
					$item = $('<li/>', {
						'data-token': dict[opt.type].dataLabel.arrName, 
						'data-arg_name':opt.name,
						'data-arg_type':opt.type,
						'class': 'sortable variable'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>", {
								'class': 'argvariable'
							}).append(
								$("<span/>", {
									'class': 'exprvariable'
								}).append(
									$("<span/>", {class:'varname'}).text("jumlah index "+opt.name)
								).append(
									$("<span/>", {class:'varidx'}).append(
										$('<ol/>', {
											'id':'wbox--expr', 
											'class': 'groupexpression startexpression'
										}).append(
											$('<li/>', {
												'data-token': 'INTEGER-CONSTANT',
												'class':'expr exprdefault arridx sortable'
											}).append(
												$('<div/>', {
								                    'class': 'no-offset col-md-12'
								                }).append(
								                    $('<div/>', {
								                        'class': 'row'
								                    }).append(
														$('<div/>', {
															'class':'input-group'
														}).append(
															$('<input/>', {
																'type': 'text',
																'data-token': 'INTEGER-CONSTANT',
																'class':'input',
																'value': 0
															})
														)
								                    )
								                )
											)
										)
									)
								)
							)
						)
					);

					return $item;
				}

				//input/output
				var genInput = function() {
					$item = $('<li/>', {
						'data-token': 'INPUT', 
						'class': 'statement input statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text('INPUT')
						).append(
							$("<span/>", {
								'title':'Variabel', 
								'class': 'exprdefault',
								'data-token': 'ANY-VARIABLE',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text("V")//-->tooltip.tooltip()
						)
					);

					return $item;
				}

				var genPrint = function(hasNLine) {
					$item = $('<li/>', {
						'data-token': hasNLine ? 'PRINTLINE' : 'PRINT', 
						'class': 'statement output statement--handle'
					}).append(
						$('<div/>', {
							'class':'arg definition'
						}).append(
							$("<span/>",{'class':'commandText'}).text('CETAK')
						).append(
							$("<span/>", {
								'title':'Nilai String', 
								'class': 'exprdefault',
								'data-token': 'STRING-CONSTANT',
								//-->tooltip'data-toggle' : 'tooltip',
								//-->tooltip'data-placement' : 'top'
							}).text("NS")//-->tooltip.tooltip()
						).append(
							hasNLine ? 
							$('<span/>').append(
								$('<i class="fa fa-level-down" style="-webkit-transform: rotate(90deg)"></i>')
							) : ''
						)
					);

					return $item;
				}

				//operation
				var genExprOperation = function(opt) {

					var item = $('<li/>', {
						'data-token': dict[opt.type].dataLabel.operation[opt.arity], 
						'class': 'sortable operation',
						'data-arg_type': opt.type,
						'data-arg_arity': opt.arity,
					})

					if(opt.arity == 1) {
						item.append(
							$('<div/>', {
								'class':'arg definition'
							}).append(
								$("<span/>", {
									'class': 'exproperator'
								}).text("?")
							).append(
								$("<span/>", {
									'class': 'exprdefault',
									'title': dict[opt.type].dataLabel.consFullLabel,
									'data-token': dict[opt.type].dataLabel.constName,
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
							)
						);
					} else if(opt.arity == 2) {
						item.append(
							$('<div/>', {
								'class':'arg definition'
							}).append(
								$("<span/>", {
									'class': 'exprdefault',
									'title': dict[opt.type].dataLabel.consFullLabel,
									'data-token': dict[opt.type].dataLabel.constName,
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
							).append(
								$("<span/>", {
									'class': 'exproperator'
								}).text("?")
							).append(
								$("<span/>", {
									'class': 'exprdefault',
									'title': dict[opt.type].dataLabel.consFullLabel,
									'data-token': dict[opt.type].dataLabel.constName,
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
							)
						);
					} else if(opt.arity == 3) {
						item.append(
							$('<div/>', {
								'class':'arg definition'
							}).append(
								$("<span/>", {
									'class': 'exprdefault',
									'title': dict[opt.type].dataLabel.consFullLabel,
									'data-token': dict[opt.type].dataLabel.constName,
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
							).append(
								$("<span/>", {
									'class': 'exproperator'
								}).text("?")
							).append(
								$("<span/>", {
									'class': 'exprdefault',
									'title': dict[opt.type].dataLabel.consFullLabel,
									'data-token': dict[opt.type].dataLabel.constName,
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
							).append(
								$("<span/>", {
									'class': 'exproperator'
								}).text("?")
							).append(
								$("<span/>", {
									'class': 'exprdefault',
									'title': dict[opt.type].dataLabel.consFullLabel,
									'data-token': dict[opt.type].dataLabel.constName,
									//-->tooltip'data-toggle' : 'tooltip',
									//-->tooltip'data-placement' : 'top'
								}).text(dict[opt.type].dataLabel.consLabel)//-->tooltip.tooltip()
							)
						);
					}

					return item;
				}
			//[END OF] PRIVATE MEMBERS//

			//PUBLIC MEMBERS//
				this.genGroupCondition = function($item) {
					if(!$item) return false;

					if($item
						.append(genIf())
						.append(genIfElse())
					)
						return true;

					return false;
				}
				this.genGroupLooping = function($item) {
					if(!$item) return false;

					if($item
						.append(genIteration0())
						.append(genIteration1())
						.append(genIteration2())
						.append(genIteration2(true))
					)
						return true;

					return false;
				}
				this.genGroupVariable = function($item, opt) {
					if(!$item || opt.type == null || opt.name == null) return false;

					if(opt.isStatement) {

						switch(opt.type) {
							case "integer":
							case "real":
								if($item
									.append(genSetVar({name:opt.name,type:opt.type}))
									.append(genIncrDecrVar(true,{name:opt.name,type:opt.type}))
									.append(genIncrDecrVar(false,{name:opt.name,type:opt.type}))
								)
									return true;
								break;
							case "string":
							case "logical":
								if($item
									.append(genSetVar({name:opt.name,type:opt.type}))
								)
									return true;
								break;
						}

					} else {
						if($item
							.append(genExprVar({name:opt.name,type:opt.type}))
						)
							return true;
					}

					return false;
				}
				this.genGroupArray = function($item, opt) {
					if(!$item || !opt.type || !opt.name) return false;

					if(opt.isStatement) {

						switch(opt.type) {
							case "integer":
							case "real":
								if($item
									.append(genSetArr({name:opt.name,type:opt.type}))
									.append(genIncrDecrArr(true,{name:opt.name,type:opt.type}))
									.append(genIncrDecrArr(false,{name:opt.name,type:opt.type}))
								)
									return true;
								break;
							case "string":
							case "logical":
								if($item
									.append(genSetArr({name:opt.name,type:opt.type}))
								)
									return true;
								break;
						}

					} else {
						if($item
							.append(genExprArr({name:opt.name,type:opt.type}))
						)
							return true;
					}

					return false;
				}
				this.genGroupOutput = function($item) {
					if(!$item) return false;

					if($item
						.append(genInput())
						.append(genPrint(false))
						.append(genPrint(true))
					)
						return true;

					return false;
				}
				this.genGrupOperations = function($item,opt) {
					if(!$item || !opt.type || !opt.class) return false;

					switch(opt.type) {
						case "integer":
							if($item
								.append(genExprOperation({type:opt.type,arity:2}))
								.append(genExprOperation({type:opt.type,arity:3}))
							)
								return true;
						case "real":
							if($item
								.append(genExprOperation({type:opt.type,arity:2}))
								.append(genExprOperation({type:opt.type,arity:3}))
							)
								return true;
						break;
						case "logical":
							if($item
								.append(genExprOperation({type:opt.type,arity:1}))
								.append(genExprOperation({type:opt.type,arity:2}))
								.append(genExprOperation({type:opt.type,arity:3}))
							)
								return true;
						break;
						case "logicalrelational":
							if($item
								.append(genExprOperation({type:opt.type,arity:2}))
							)
								return true;
						break;
						case "string":
							if($item
								.append(genExprOperation({type:opt.type,arity:2}))
							)
								return true;
						break;
					}

					return false;
				}
			//[END OF] PUBLIC MEMBERS//
		}

	/* [End Of] The Receiver function */

	/* ConcreteCommand */
		var INIT_GUI = function(GenerateDiagram, token, $itemReference){
			this.execute = function() { GenerateDiagram.build(token, $itemReference) };
		}
	/* [End Of] ConcreteCommand */

	/* ConcreteCommand */
		var TBOX_CONDITION = function(GuiToolboxDiagram, $itemReference){
			this.execute = function() { GuiToolboxDiagram.genGroupCondition($itemReference) };
		}
		var TBOX_LOOPING = function(GuiToolboxDiagram, $itemReference){
			this.execute = function() { GuiToolboxDiagram.genGroupLooping($itemReference) };
		}
		var TBOX_VARIABLE = function(GuiToolboxDiagram, $itemReference, opt){
			this.execute = function() { GuiToolboxDiagram.genGroupVariable($itemReference, opt) };
		}
		var TBOX_ARRAY = function(GuiToolboxDiagram, $itemReference, opt){
			this.execute = function() { GuiToolboxDiagram.genGroupArray($itemReference, opt) };
		}
		var TBOX_INPUTOUTPUT = function(GuiToolboxDiagram, $itemReference){
			this.execute = function() { GuiToolboxDiagram.genGroupOutput($itemReference) };
		}
		var TBOX_OPERATIONS = function(GuiToolboxDiagram, $itemReference, opt){
			this.execute = function() { GuiToolboxDiagram.genGrupOperations($itemReference, opt) };
		}
	/* [End Of] ConcreteCommand */

	/* ConcreteCommand */
		var ADD_DIAGRAM = function(GenerateDiagram, type, token, $itemReference, args) {
			this.execute = function() {
				if(type == "statement") {
					$itemReference.replaceWith(GenerateDiagram.genStatement(token));
				} else if(type == "expression") {
					$itemReference.replaceWith(GenerateDiagram.genExpression(token, args));
				}
			}
		}
		var MOV_DIAGRAM = function(GenerateDiagram, token, $itemReferenceFrom, $itemReferenceDest) {
			this.execute = function() {
				$itemReference.replaceWith(GenerateDiagram.genStatement(token));
			}
		}
		var DEL_DIAGRAM = function(GenerateDiagram, token, $itemReference) {
			this.execute = function() {
				$itemReference.replaceWith(GenerateDiagram.genStatement(token));
			}
		}


		var IF = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIf({})) };
		}
		var IFELSE = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIfElse({})) };
		}
		var ITERATION1 = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIteration1({})) };
		}
		var ITERATION2 = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIteration2({}, false)) };
		}
		var ITERATION3 = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIteration2({}, true)) };
		}
		var SETVAR = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genSetVar({}, true)) };
		}
		var INCREMENTVAR = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIncrDecrVar({}, true, true)) };
		}
		var DECREMENTVAR = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIncrDecrVar({},false, true)) };
		}
		var SETARRVAR = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genSetVar({}, false)) };
		}
		var INCREMENTARRVAR = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIncrDecrArr({}, true, false)) };
		}
		var DECREMENTARRVAR = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIncrDecrArr({}, false, false)) };
		}
		var INPUT = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genInput({})) };
		}
		var PRINT = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genPrint({}, false)) };
		}
		var PRINTLINE = function(GenerateDiagram, $itemReference){
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genPrint({}, true)) };
		}
		var CONSTANT = function(GenerateDiagram, arg, $itemReference){
			this.execute = function() { GuiWorkspaceDiagram.genExprConstant(arg, $itemReference) };
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIf({})) };
		}
		var OPERATIONS = function(GuiWorkspaceDiagram, arg, $itemReference){
			this.execute = function() { GuiWorkspaceDiagram.genExprOperation(arg, $itemReference) };
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIf({})) };
		}
		var VARIABLE = function(GuiWorkspaceDiagram, arg, $itemReference){
			this.execute = function() { GuiWorkspaceDiagram.genExprVar(arg,$itemReference) };
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIf({})) };
		}
		var ARRAY = function(GuiWorkspaceDiagram, arg, $itemReference){
			this.execute = function() { GuiWorkspaceDiagram.genExprArr(arg,$itemReference) };
			this.execute = function() { $itemReference.replaceWith(GenerateDiagram.genIf({})) };
		}
	/* [End Of] ConcreteCommand */

	/* Client */
		var Gui = (function() {
			var 
				tboxstatement,
				startprogram,
				tboxexpression,
				initCodes;
			var selectedGroupStatementDiagram;

            var constructGuiVariable = (function() {

            	var createModalform = "#CreateVarModal #variableCreation",
            	deleteModalform = "#DeleteVarModal #variableDelete",
                select2varlist = "#toolbox_variabel .select2-varlist:eq(0)",
                IFaceVariable = {},
                IFaceVariableIndex = {},
                IFaceIsDisable;

                var htmlFormat = "<div class='varlist var'>{0} <span class='label label-primary datatype'>{1}</span></div>";

                function initialize() {
                    IFaceVariable = controlVariable.getCode().variable;

                    $(select2varlist).append([
                    	$("<optgroup/>", {'class':'varlist optgroup-integer', 'label':'Integer'}),
                    	$("<optgroup/>", {'class':'varlist optgroup-real', 'label':'Real'}),
                    	$("<optgroup/>", {'class':'varlist optgroup-string', 'label':'String'}),
                    	$("<optgroup/>", {'class':'varlist optgroup-logical', 'label':'Logical'}),
                    ])


                    if(_.size(IFaceVariable) > 0) {
	                    for(var key in IFaceVariable) {
	                    	var name = key,
	                    	type = IFaceVariable[key].type;

	                        $(select2varlist).first().children("optgroup.optgroup-"+type).append(
	                        	$("<option/>", {
	                        		"data-content" : htmlFormat.format(key,type),
	                        		"value" : key
	                        	})
	                        )
	                    }
                    	enableIface();
                    }
                    else {
                    	disableIface();
                    }

                	$(select2varlist).selectpicker();
                	afterInit();
                    //window.setTimeout( _initialize, 0.1 );
                };

                function afterInit() {
                	//create
                    $(createModalform).on("submit", function(e) {
                        e.preventDefault();
                        var varname = $(this).find("input[name=addVarname]").val(),
                        vartype = $(this).find("input[name=optVartype]:checked").val();

                        if(varname == null || vartype == null) {
                        	$(this).find(".errMessage").show().html('<b>Nama variabel</b> atau <b>tipe variabel</b> tidak boleh kosong');
                        	return;
                        } else if(!IsVariableValid({name:varname, type:vartype})) {
                        	$(this).find(".errMessage").show().html('Variabel tidak valid');
                        	return;
                        }

                        addVar({'name' : varname, 'type' : vartype});

                        $('#CreateVarModal').modal("hide");
                    });
                    $('#CreateVarModal').on('hidden.bs.modal', function () {
                        $(this).find(".btn.btn-primary").removeClass("active");
                        $(this).find("input[type=text]").val("");
                        $(this).find("input[type=radio]").removeAttr('checked');
                    });

                    //delete
                    $('#DeleteVarModal').on('show.bs.modal', function () {
	                    var selectpicker = $(select2varlist).selectpicker("val");

	                    if(IFaceVariable[selectpicker] != null) {
		                    var varname = IFaceVariable[selectpicker].type;
		                    var vartype = IFaceVariable[selectpicker].type;
	                    	$(this).find("._vname").text(varname);
	                    	$(this).find("._vtype").text(vartype);
	                    	$(this).find(".errMessage").text('');
	                    } else {
	                    	$(this).find(".errMessage").text('Gagal menghapus variabel');
	                    }
                    });
                    $(deleteModalform).on("submit", function(e) {
                        e.preventDefault();
		                var varname = $(select2varlist).selectpicker("val");
                        if(startprogram.find('li[data-arg_name="'+varname+'"]').length > 0) {
                        	$(this).find(".errMessage").show().text('Gagal menghapus variabel. Masih terdapat perintah yang berhubungan dengan variabel ini pada program utama');
                        	return;
                        } else
                        if(_.size(IFaceVariable) == 0) {
                        	$(this).find(".errMessage").text('Gagal menghapus variabel');
                        	return;
                        } else
                        if(IFaceVariable[varname] == null) {
                        	$(this).find(".errMessage").text('Gagal menghapus variabel');
                        	return;
                        }

                        deleteVar(varname);
                    	$('#DeleteVarModal').modal("hide");
                    });

                    if(_.size(IFaceVariable) > 0) {
	                    changeToolBox();
                    }
                    $(select2varlist).on("change", changeToolBox);
                }

                function addVar(objvar) {
                    $(select2varlist).first().children("optgroup.optgroup-"+objvar.type).append(
                    	$("<option/>", {
                    		"data-content" : htmlFormat.format(objvar.name,objvar.type),
                    		"value" : objvar.name
                    	})
                    );
                	$(select2varlist).selectpicker("refresh");

                    IFaceVariable[objvar.name] = controlVariable.declareVariable(objvar);

            		if(controlVariable.getLenVariable() == 1) {
            			changeToolBox();
            			enableIface();
            		}
                }

                function deleteVar(varname) {
                	if(controlVariable.delVariable(varname)) {
                		delete IFaceVariable[varname];

                        $(select2varlist).find('[value='+varname+']').remove();
                        $(select2varlist).selectpicker('refresh');
                		if(controlVariable.getLenVariable() <= 0) {
                			disableIface();
                        	$("#tbox--variabel").eq(0).empty();
                        	$("#tbox--variabel").eq(1).empty();
                		} else {
                			changeToolBox();
                		}
                	}
                }

                function destruction() {
                    IFaceVariable = {};
                    $(select2varlist).selectpicker('destroy');
                    $(select2varlist).empty();
                    controlVariable.destroy();
                    controlArray.destroy();
                }

                function disableIface() {
                    $("#toolbox_variabel #varlist").addClass("disabled");
                    IFaceIsDisable = true;
                }

                function enableIface() {
                    $("#toolbox_variabel #varlist").removeClass("disabled");
                    IFaceIsDisable = false;
                }

                function IsVariableValid(arg) {
                    //validate var name
                    if(IFaceVariable[arg.name] != null) return false;

                    //validate var type
                    if(!arg.type.match(/^(integer|real|logical|string)$/gi)) return false;

                    //passed
                    return true;
                }

                function changeToolBox() {
                    var varname = $(select2varlist).selectpicker("val"),
                    type = IFaceVariable[varname].type;

                    $("#tbox--variabel .tbx-data-variable").data({"name":varname,"type":type});
                    $("#tbox--variabel .exprvariable").text(varname);
                    $("#tbox--variabel li.sortable.variable").attr("data-token",(type+"-variable").toUpperCase());
                    constructToolBox.tboxvariable({name:varname,type:type});
                }

                return {
                    init: initialize,
                    destroy: destruction
                }
            })();

            var constructGuiArrayVariable = (function() {

                var createModalform = "#CreateArrModal #variableCreation",
                deleteModalform = "#DeleteArrModal #variableDelete",
                select2arrlist = "#toolbox_list .select2-arrlist:eq(0)",
                IFaceArray = {},
                IFaceIsDisable,
                htmlFormat = "<div class='varlist var'>{0} <span class='label label-primary datatype'>{1}</span></div>";


                function initialize() {
                    IFaceArray = controlArray.getCode().array;

                    $(select2arrlist).append([
                    	$("<optgroup/>", {'class':'varlist optgroup-integer', 'label':'Integer'}),
                    	$("<optgroup/>", {'class':'varlist optgroup-real', 'label':'Real'}),
                    	$("<optgroup/>", {'class':'varlist optgroup-string', 'label':'String'}),
                    	$("<optgroup/>", {'class':'varlist optgroup-logical', 'label':'Logical'}),
                    ])


                    if(_.size(IFaceArray) > 0) {
	                    for(var key in IFaceArray) {
	                    	var name = key,
	                    	type = IFaceArray[key].type;

	                        $(select2arrlist).first().children("optgroup.optgroup-"+type).append(
	                        	$("<option/>", {
	                        		"data-content" : htmlFormat.format(key,type),
	                        		"value" : key
	                        	})
	                        )
	                    }
                    	enableIface();
                    }
                    else {
                    	disableIface();
                    }

                	$(select2arrlist).selectpicker();
                	afterInit();
                    //window.setTimeout( _initialize, 0.1 );
                };

                function afterInit() {
                	//create
                    $(createModalform).on("submit", function(e) {
                        e.preventDefault();
                        var varname = $(this).find("input[name=addVarname]").val(),
                        vartype = $(this).find("input[name=optVartype]:checked").val();

                        if(varname == null || vartype == null) {
                        	$(this).find(".errMessage").show().html("<b>Nama variabel</b> atau <b>tipe variabel</b> tidak boleh kosong");
                        	return;
                        } else if(!IsVariableValid({name:varname, type:vartype})) {
                        	$(this).find(".errMessage").show().html('Variabel tidak valid');
                        	return;
                        }

                        addArr({'name' : varname, 'type' : vartype});

                        $('#CreateArrModal').modal("hide");
                    });
                    $('#CreateArrModal').on('hidden.bs.modal', function () {
                        $(this).find(".btn.btn-primary").removeClass("active");
                        $(this).find("input[type=text]").val("");
                        $(this).find("input[type=radio]").removeAttr('checked');
                    });

                    //delete
                    $('#DeleteArrModal').on('show.bs.modal', function () {
	                    var selectpicker = $(select2arrlist).selectpicker("val");

	                    if(IFaceArray[selectpicker] != null) {
		                    var varname = IFaceArray[selectpicker].type;
		                    var vartype = IFaceArray[selectpicker].type;
	                    	$(this).find("._vname").text(varname);
	                    	$(this).find("._vtype").text(vartype);
	                    	$(this).find(".errMessage").text('');
	                    } else {
	                    	$(this).find(".errMessage").text('Gagal menghapus variabel');
	                    }
                    });
                    $(deleteModalform).on("submit", function(e) {
                        e.preventDefault();
		                var varname = $(select2arrlist).selectpicker("val");
                        if(startprogram.find('li[data-arg_name="'+varname+'"]').length > 0) {
                        	$(this).find(".errMessage").show().text('Gagal menghapus variabel. Masih terdapat perintah yang berhubungan dengan variabel ini pada program utama');
                        	return;
                        } else
                        if(_.size(IFaceArray) == 0) {
                        	$(this).find(".errMessage").text('Gagal menghapus variabel');
                        	return;
                        } else
                        if(IFaceArray[varname] == null) {
                        	$(this).find(".errMessage").text('Gagal menghapus variabel');
                        	return;
                        }

                        deleteArr(varname);
                    	$('#DeleteArrModal').modal("hide");
                    });

                    if(_.size(IFaceArray) > 0) {
	                    changeToolBox();
                    }
                    $(select2arrlist).on("change", changeToolBox);
                }

                function addArr(objarr) {
                    $(select2arrlist).first().children("optgroup.optgroup-"+objarr.type).append(
                    	$("<option/>", {
                    		"data-content" : htmlFormat.format(objarr.name,objarr.type),
                    		"value" : objarr.name
                    	})
                    );
                	$(select2arrlist).selectpicker("refresh");

                    IFaceArray[objarr.name] = controlArray.declareArray(objarr);

            		if(controlArray.getLenArray() == 1) {
            			changeToolBox();
            			enableIface();
            		}
                }

                function deleteArr(varname) {
                	if(controlArray.delArray(varname)) {
                		//delete from iface
                		delete IFaceArray[varname];

                        $(select2arrlist).find('[value='+varname+']').remove();
                        $(select2arrlist).selectpicker('refresh');
                		if(controlArray.getLenArray() <= 0 && IFaceArray <= 0) {
                			disableIface();
                        	$("#tbox--list").eq(0).empty();
                        	$("#tbox--list").eq(1).empty();
                		} else {
                			changeToolBox();
                		}
                	}
                }

                function destruction() {
                    IFaceArray = {};
                    $(select2arrlist).selectpicker('destroy');
                    $(select2arrlist).empty();
                    controlArray.destroy();
                }

                function disableIface() {
                    $("#toolbox_list #varlist").addClass("disabled");
                    IFaceIsDisable = true;
                }

                function enableIface() {
                    $("#toolbox_list #varlist").removeClass("disabled");
                    IFaceIsDisable = false;
                }

                function IsVariableValid(arg) {
                    //validate var name
                    if(IFaceArray[arg.name] != null) return false;

                    //validate var type
                    if(!arg.type.match(/^(integer|real|logical|string)$/gi)) return false;

                    //passed
                    return true;
                }

                function changeToolBox() {
                    var varname = $(select2arrlist).selectpicker("val"),
                    type = IFaceArray[varname].type;

                    $("#tbox--list .tbx-data-variable").data({"name":varname,"type":type});
                    $("#tbox--list .exprvariable").text(varname);
                    $("#tbox--list li.sortable.variable").attr("data-token",(type+"-variable").toUpperCase());
                    constructToolBox.tboxarray({name:varname,type:type});
                }

                return {
                    init: initialize,
                    destroy: destruction
                }
            })();

			var constructToolBox = (function() {
				var invoker = new GuiWorkspaceDiagramManager();

				//simple tokens
				var helper_default = function() {
					invoker.execute(new TBOX_CONDITION(new GuiToolboxDiagram(), $('#tbox--percabangan')));
					invoker.execute(new TBOX_LOOPING(new GuiToolboxDiagram(), $('#tbox--perulangan')));
					invoker.execute(new TBOX_INPUTOUTPUT(new GuiToolboxDiagram(), $('#tbox--output')));
					helper_tboxoperator({type:'real',class:'aritmetic'});
					helper_tboxoperator({type:'logical',class:'logical'});
					helper_tboxoperator({type:'logicalrelational',class:'relational'});
					helper_tboxoperator({type:'string',class:'string'});
					helper_tboxoperator({type:'integer',class:'aritmetic'});
				}

				//dynamic tokens
				var helper_tboxarray = function(arg) {
					if(!arg || !arg.name || !arg.type) return false;
					$('#tbox--list.tboxstatement,#tbox--list.tboxexpression').html("");

					invoker.execute(new TBOX_ARRAY(new GuiToolboxDiagram(), $('#tbox--list.tboxstatement'), {isStatement:true,name:arg.name,type:arg.type}));
					invoker.execute(new TBOX_ARRAY(new GuiToolboxDiagram(), $('#tbox--list.tboxexpression'), {isStatement:false,name:arg.name,type:arg.type}));
					return true;
				}
				var helper_tboxvariable = function(arg) {
					if(!arg || !arg.name || !arg.type) return false;
					$('#tbox--variabel.tboxstatement,#tbox--variabel.tboxexpression').html("");

					invoker.execute(new TBOX_VARIABLE(new GuiToolboxDiagram(), $('#tbox--variabel.tboxstatement'), {isStatement:true,name:arg.name,type:arg.type}));
					invoker.execute(new TBOX_VARIABLE(new GuiToolboxDiagram(), $('#tbox--variabel.tboxexpression'), {isStatement:false,name:arg.name,type:arg.type}));
					return true;
				}
				var helper_tboxoperator = function(arg) {
					if(!arg || !arg.type || !arg.class) return false;
					$('#tbox--operations').html("");

					invoker.execute(new TBOX_OPERATIONS(new GuiToolboxDiagram(), $('#tbox--operations.'+arg.class+'.'+arg.type), {type:arg.type, class:arg.class}));
					return true;
				}

				return {
					default: helper_default,
					tboxvariable: helper_tboxvariable,
					tboxarray: helper_tboxarray,
					tboxoperator: helper_tboxoperator
				}
			})();

			var constructGui = function() {
				var uniqueId = new Date().getTime();
				var invoker = new GuiWorkspaceDiagramManager();
				var source = {
					STATEMENT: {
						value: 0,
						TBOX : {value: 0, DRAGGED: {value:1}, DROPPED: {value:0}},
						GROUP : {value: 1, DRAGGED: {value:1}, DROPPED: {value:0}}
					},
					EXPRESSION: {
						value: 1,
						TBOX : {value: 0, DRAGGED: {value:1}, DROPPED: {value:0}},
						GROUP : {value: 1, DRAGGED: {value:1}, DROPPED: {value:0}}
					},
					IDDLE: {
						value: -1
					}
				}
				var exprType = {
					"OPERATION": 0,
					"VARIABLE": 1,
					"ARRAY": 1,
				}
				var exprValueType = {
					"INTEGER": 0,
					"REAL": 1,
					"LOGICAL": 2,
					"RELATIONAL": 2,
					"STRING": 3
				}

				/*** [BEGIN OF] sortable options ***/
					//statemnt
					var toolboxSortableOptions = {
						'codeGuide': function(token) {
							window.dd2.changeTab("PANDUAN", function() {
								window.dd2.changeOptionalPlaceholder('PANDUAN', ' : <span class="badge">'+guides[token].name+'</span>');
								window.dd2.spesificIndex("PANDUAN").tab('show');
							});
							$('#output #guide_helper .code').removeClass('shown');
							$('#output #guide_helper .'+token).addClass('shown');
						},
						'group': 'groupstatement'+uniqueId,
						'containerSelector': 'ol',
						'pullPlaceholder': false,
						'nested': false,
						'itemSelector': 'li.statement, li.block-statement',
						'handle': '.statement--handle',
						'drop': false,
						'onMousedown': function ($item, _super, event) {
							if (source.IDDLE && !event.target.nodeName.match(/^(input|select)$/i)) {
								if($(event.delegateTarget).hasClass("groupstatement")) {
									selectDiagram($item, false);
								} else if($(event.delegateTarget).hasClass("tboxstatement")) {
									this.codeGuide($item.data("token"));
								}
								event.preventDefault()
								return true
							}
						},
						'onDragStart': function ($item, container, _super) {
							if($(container.el[0]).hasClass("tboxstatement")) {
								$item.clone().insertAfter($item);
								state = source.STATEMENT.TBOX.DRAGGED;
							}
							else if($(container.el[0]).hasClass("groupstatement")) {
								$(".statement--handle",$item).addClass("disable");
								$(".startexpression",$item).first().sortable('disable');
								state = source.STATEMENT.GROUP.DRAGGED;
							}

							$('.cd-side-navigation').addClass("temp-disabled");
							_super($item, container);
						},
						'onDrop': function ($item, container, _super) {

							if(state == source.STATEMENT.TBOX.DRAGGED) {
								if(container && $(container.el[0]).hasClass("groupstatement")) {
									//if(!recover_token($item)) $item.detach();
									recover_token($item);
								}
							} else if(state == source.STATEMENT.GROUP.DRAGGED) {
								//$exprTemp.detach();
								$(".statement--handle",$item).removeClass("disable");
								$(".startexpression",$item).first().sortable('enable');
							}
							state = source.IDDLE;
							
							$('.cd-side-navigation').removeClass("temp-disabled");
							$('.cd-side-navigation').children("ul").children("li").removeClass("hover");
							$item.removeClass("dragged").removeAttr("style");
							$("body").removeClass("dragging");
						},
						'isValidTarget': function  ($item, container) {
							if((state == source.STATEMENT.TBOX.DRAGGED || 
								state == source.STATEMENT.GROUP.DRAGGED) && 
									$(container.el[0]).hasClass("groupstatement"))
								return true;
							else
								return false;
						},
						'onCancel': function ($item, container, _super, event) {
							if($(container.el[0]).hasClass("tboxstatement")) {
								$item.remove();
							}
						}
					};
					var groupstatementSortableOptions = {
						'nested': true,
						'group': 'groupstatement'+uniqueId,
					};
				/*** [END OF] sortable options ***/

				var DefaultDragProperties = {
					// enable inertial throwing
					inertia: false,

					// enable autoScroll
					autoScroll: false,

					// call this function on every dragmove event
					onmove:  function (event) {
						var target = event.target,
							// keep the dragged position in the data-x/data-y attributes
							x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
							y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

						// translate the element
						target.style.webkitTransform =
							target.style.transform =
								'translate(' + x + 'px, ' + y + 'px)';

						// update the posiion attributes
						target.setAttribute('data-x', x);
						target.setAttribute('data-y', y);
					},
				};

				var dummyBugCheck = false;
				var DefaultDropProperties = {
					overlap: 'center',

					// listen for drop related events:
					ondropactivate: function (event) {
						// add active dropzone feedback
						event.target.classList.add('drop-active');
					},
					ondragenter: function (event) {
						$draggableElement = $(event.relatedTarget),
						$dropzoneElement = $(event.target);

						var drag_dataValueType = exprValueType[$draggableElement.data("token").split("-")[0]];
						var drop_dataValueType = exprValueType[$dropzoneElement.data("token").split("-")[0]];

						// feedback the possibility of a drop
						if(dummyBugCheck) {
							$dropzoneElement.addClass('wrong-placeholder');
						} else {
							$dropzoneElement.addClass('placeholder');
						}
					},
					ondragleave: function (event) {
						// remove the drop feedback style
						event.target.classList.remove('placeholder');
						event.target.classList.remove('wrong-placeholder');
						dummyBugCheck = false;
					},
					ondropdeactivate: function (event) {
						// remove active dropzone feedback
						event.target.classList.remove('drop-active');
						event.target.classList.remove('drop-target');
						dummyBugCheck = false;
					},
					checker: function (
						dragEvent,         // related dragmove or dragend
						event,             // Touch, Pointer or Mouse Event
						dropped,           // bool default checker result
						dropzone,          // dropzone Interactable
						dropElement,       // dropzone elemnt
						draggable,         // draggable Interactable
						draggableElement   // draggable element
					) {
						if(dropped) {
							$dropElement = $(dropElement);
							$draggableElement = $(draggableElement);

							var drag_dataType = exprType[$draggableElement.data("token").split("-").pop()];

							var drag_dataValueType = exprValueType[$draggableElement.data("token").split("-")[0]];
							var drop_dataValueType = exprValueType[$dropElement.data("token").split("-")[0]];

				            if(
				            	//spesified destination data type (constant)
				            	(drag_dataValueType == drop_dataValueType && drag_dataType == exprType["OPERATION"] &&
				            	$dropElement.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi)) ||

				            	//spesified destination data type (variable)
				            	(drag_dataValueType == drop_dataValueType && drag_dataType == exprType["VARIABLE"] &&
				            	($dropElement.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi) ||
				            	$dropElement.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-(VARIABLE|ARRAY))$/gi))) ||

				            	//un-spesified destination data type (constant)
				            	(drag_dataType == exprType["OPERATION"] &&
				            	$dropElement.data("token").match(/^(STRING\-CONSTANT)$/gi)) ||

				            	//un-spesified destination data type (variable)
				            	(drag_dataType == exprType["VARIABLE"] &&
				            	$dropElement.data("token").match(/^(STRING\-CONSTANT)$/gi)) ||

				            	((drag_dataType == exprType["VARIABLE"] || drag_dataType == exprType["OPERATION"]) &&
				            	$dropElement.data("token").match(/^(ANY\-CONSTANT)$/gi)) ||

				            	(drag_dataType == exprType["VARIABLE"] &&
				            	$dropElement.data("token").match(/^(ANY\-VARIABLE)$/gi))
				            ) {
								return true;
				            } else if(
				            	//spesified destination data type (constant)
				            	(drag_dataValueType != drop_dataValueType && drag_dataType == exprType["OPERATION"] &&
				            	$dropElement.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi)) ||

				            	//spesified destination data type (variable)
				            	(drag_dataValueType != drop_dataValueType && drag_dataType == exprType["VARIABLE"] &&
				            	($dropElement.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi) ||
				            	$dropElement.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-(VARIABLE|ARRAY))$/gi)))
				            ) {
				            	dummyBugCheck = true;
				            	return true;
				            }
						}
					}
				}

				var ToolboxDragProperties = $.extend({
					onstart: function (event) {
						var target = $(event.target),
						token = target.data("token");
						target.parent().parent().parent().parent().removeClass("hover");
						$('.cd-side-navigation').addClass("temp-disabled");

						target.clone().insertAfter(target);
						target.addClass("dragged");
					},
					onend: function (event) {
						$('.cd-side-navigation').removeClass("temp-disabled");
						$('.cd-side-navigation').children("ul").children("li").removeClass("hover");
						$(event.target).remove();
					}
				}, DefaultDragProperties);

				var MainprogramDragProperties = $.extend({
					onstart: function (event) {
						var target = $(event.target),
						token = target.data("token"),
						roottoken = target.parent('ol').data("roottoken");

                        if(target.parent().parent().data('token') == "RELATIONAL-BINARY-OPERATION") {
                        	var siblingtoken = $(target.siblings('li.expr.exprdefault')[0]).data("token");
							recover_token(
								$('<li/>', {
									'data-token' : siblingtoken,
									'data-arg_type' : siblingtoken.split('-')[0]
								}).insertAfter(target)
							);
                        } else {
							//target.clone().insertAfter(target);
							recover_token(
								$('<li/>', {
									'data-token' : roottoken,
									'data-arg_type' : roottoken.split('-')[0]
								}).insertAfter(target)
							);
                        }

						target.addClass("dragged");
						target.data("arg_type", roottoken.split('-')[0].toLowerCase());
					},
					ondragmove: function (event) {
						console.log("aaa")
					},
					onend: function (event) {
						$(event.target).remove();
					}
				}, DefaultDragProperties);

				var MainprogramDropProperties = $.extend({
					// only accept elements matching this CSS selector
					accept: '.tboxexpression > li, .groupexpression > li',
					ondrop: function (event) {
						if(dummyBugCheck) return false;

						var draggableElement = $(event.relatedTarget),
						dropzoneElement = $(event.target);

                        if(dropzoneElement.parent().parent().data('token') == "RELATIONAL-BINARY-OPERATION") {
                        	var dmmy_type = draggableElement.data('token').split('-')[0];
                        	var dummy_siblingElm = $(dropzoneElement.siblings('li.expr.exprdefault')[0]);
                        	dummy_siblingElm.data({
								'token' : dmmy_type+'-CONSTANT',
								'arg_type' : dmmy_type
                        	});
                        	recover_token(dummy_siblingElm);
                        }

						if(draggableElement.parent().hasClass("groupexpression")) {
							dropzoneElement.replaceWith(
								draggableElement.clone()
								.removeAttr('data-arg_arity data-arg_type data-x data-y style')
								.removeClass('dragged')
							);
						} else {
							$.each(draggableElement.data(), function (name, value) {
								dropzoneElement.data(name, value);
							});

							recover_token(dropzoneElement);
						}
					}
				}, DefaultDropProperties);


				function recover_token($item) {
					switch($item.data("token")) {
						case "IF": 
						case "IFELSE":
						case "ITERATION0":
						case "ITERATION1":
						case "ITERATION2":
						case "ITERATION3":
						case "PRINT":
						case "PRINTLINE":
						case "INPUT":
							var token = {token : $item.data("token")};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "statement", token, $item));
						break;
						case "SETVAR":
						case "INCRVAR":
						case "DECRVAR":
							var token = {token : $item.data("token"), arg: [{arg: dict[$item.data("arg_type")].dataLabel.varName, subarg: [$item.data("arg_name")]}]};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "statement", token, $item));
						break;
						case "SETARRVAR":
						case "INCRARRVAR":
						case "DECRARRVAR":
							var token = {token : $item.data("token"), arg: [{arg: dict[$item.data("arg_type")].dataLabel.arrName, subarg: [$item.data("arg_name")]}]};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "statement", token, $item));
						break;
						case String($item.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-CONSTANT)$/gi)) :
							var token = {arg : $item.data("token")};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "expression", token, $item));
						break;
						case String($item.data("token").match(/^(INTEGER\-(BINARY|TERNARY)|REAL\-(BINARY|TERNARY)|LOGICAL\-(UNARY|BINARY|TERNARY)|RELATIONAL\-BINARY|STRING\-(BINARY|TERNARY))\-OPERATION$/gi)) :
							var token = {arg : $item.data("token"), subarg: []};
							var args = {type:$item.data("arg_type"),arity:$item.data("arg_arity")};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "expression", token, $item, args));
						break;
						case String($item.data("token").match(/^((ANY|INTEGER|REAL|LOGICAL|STRING)\-VARIABLE)$/gi)) :
							var token = {arg : $item.data("token"), subarg: [
								$item.data("arg_name") != null ? 
								$item.data("arg_name") : null
							]};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "expression", token, $item));
						break;
						case String($item.data("token").match(/^((INTEGER|REAL|LOGICAL|STRING)\-ARRAY)$/gi)) :
							var token = {arg : $item.data("token"), subarg: [$item.data("arg_name")]};
							invoker.execute(new ADD_DIAGRAM(new GenerateDiagram(), "expression", token, $item));
						break;
						default :
							$item.remove();
							return false;
					}

					interact('li.drag-zone', {
						context: $item.parent()
					}).draggable(MainprogramDragProperties);

					interact('li.drop-zone', {
						context: $item
					}).dropzone(MainprogramDropProperties);
					return $item;
				}

				constructToolBox.default();

				tboxstatement = $(".tboxstatement");
				startprogram = $(".startprogram");
				tboxexpression = $(".tboxexpression");

				$(tboxstatement).sortable(toolboxSortableOptions);
				$(startprogram).sortable(groupstatementSortableOptions);
				//$(tboxexpression).sortable(toolboxexpressionSortableOptions);


				$('.tboxexpression > li').on("mousedown", function(event) {
					// codeguide()
						var target = $(this),
						token = target.data("token");
						window.dd2.changeTab("PANDUAN", function() {
							window.dd2.changeOptionalPlaceholder('PANDUAN', ' : <span class="badge">'+guides[token].name+'</span>');
							window.dd2.spesificIndex("PANDUAN").tab('show');
						});
						$('#output #guide_helper .code').removeClass('shown');
						$('#output #guide_helper .'+token).addClass('shown');
					// end fn codeguide()
				})

				invoker.execute(new INIT_GUI(new GenerateDiagram(), initCodes, $(startprogram)));
				//$(".startexpression", $(startprogram)).sortable(groupexpressionSortableOptions);

				interact('.tboxexpression > li', {
					context: $(tboxexpression)
				})
				.draggable(ToolboxDragProperties);

				interact('.groupexpression > li.drag-zone', {
					context: '.groupexpression'
				}).draggable(MainprogramDragProperties);

				interact('.groupexpression > li.drop-zone', {
					context: '.groupexpression'
				}).dropzone(MainprogramDropProperties);
			}

			var setInitCode = function(codes) {
				if(codes) {
					try{
						initCodes = codes;
					} catch(e) {
						
					}
				}
			}

			return {
				init : function(codes) {
					var rawCode = JSON.parse(codes);
					if(codes && 
						rawCode.hasOwnProperty('rawCode') && 
						rawCode.rawCode.hasOwnProperty('declarations') &&
						rawCode.rawCode.hasOwnProperty('main')
					) {
						controlVariable.setCode(JSON.parse(codes).rawCode.declarations.variable);
						controlArray.setCode(JSON.parse(codes).rawCode.declarations.array);
						setInitCode(JSON.parse(codes).rawCode.main);
					}
					constructGuiVariable.init();
					constructGuiArrayVariable.init();
					constructGui();
				},
                destruct: function() {
                    $(".startprogram").empty()
                },
                destroy : function() {
                    constructGuiVariable.destroy();
					constructGuiArrayVariable.destroy();
                    $(".startprogram").empty();
                    if(selectedGroupStatementDiagram != null) {
	                    selectedGroupStatementDiagram.delete();
                    }
                }
			}
		})();
	/* [End Of] Client */



/* [End Of] Command Design: Construct Gui */