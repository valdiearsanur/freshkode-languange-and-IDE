var PageProgram = function() {
	var TableHandler = function() {
		var oTable = $("#datatable_projectlist").dataTable({
			fnDrawCallback: tableEvenHandler
		});
	};

	var tableEvenHandler = function() {
		var dataTbWrap = $('#datatable_projectlist_wrapper');
		var contextmenu = $('<ul class="context-menu"><li><a href="#" class="icon-fa-open context-open">Buka program</a></li><li><a href="#" class="icon-fa-download context-backup">Simpan ke media penyimpanan</a></li><li><a href="#" class="icon-fa-new context-new">Buat program baru</a><li class="divider"></li><li><a href="#" class="icon-fa-trash context-delete">Hapus</a></li></ul>');

		function appendContextmenu(selectorId) {
			var posX = event.pageX - dataTbWrap.offset().left;
			var posY = event.pageY - dataTbWrap.offset().top;
			contextmenu.css({left:posX+'px',top:posY+'px',});
			contextmenu.data("id", selectorId);
			dataTbWrap.append(contextmenu);
			contextmenu.addClass("active")
		}

		function removeContextmenu() {
			contextmenu.remove();
		}

		dataTbWrap.bind('click', function() {
			removeContextmenu();
		});

		//context options
		$(dataTbWrap).on('click','a.context-new', function(e) {
			var Id = $(this).parents(".context-menu").first().data("id");
			window.changeUrl('new');
			return false;
		});
		$(dataTbWrap).on('click','a.context-open', function(e) {
			var Id = $(this).parents(".context-menu").first().data("id");
			window.changeUrl('project/'+Id);
			return false;
		});
		$(dataTbWrap).on('click','a.context-delete', function(e) {
			var Id = $(this).parents(".context-menu").first().data("id");
			window.changeUrl('delete/'+Id);
			return false;
		});
		$(dataTbWrap).on('click','a.context-backup', function(e) {
			var Id = $(this).parents(".context-menu").first().data("id");
			window.changeUrl('export/'+Id);
			return false;
		});

		// row single left click -> row activated
		$('tbody tr', dataTbWrap).bind('click contextmenu', function () {
			if($(this).hasClass('info')) {
				$(this).removeClass('info');
			}
			else {
				$('tr.info', dataTbWrap).removeClass('info');
				$(this).addClass('info');
			}
		});

		// row double left click -> open action
		$('tbody tr', dataTbWrap).bind('dblclick', function () {
			window.changeUrl('project/'+$(this).data('id'));
		});

		// row right click -> context menu
		$('tbody tr', dataTbWrap).bind("contextmenu",function(e){
			if(!$(this).hasClass('info')) {
				$(this).addClass('info');
			}
			appendContextmenu($(this).data("id"));
			return false;
		});

	};

	return {
		init: function() {
			TableHandler();
		}
	}
}();