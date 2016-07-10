//check if a .cd-tour-wrapper exists in the DOM - if yes, initialize it
var TourCore = function() {

	var isActive = false;
	var initDialog = false;

	var tourWrapper,
		tourSteps,
		stepsNumber,
		coverLayer,
		tourStepInfo,
		tourTrigger;

	var stepLabels = [
		'', 'pertama', 'kedua', 'ketiga', 'keempat', 'kelima', 'keenam', 'keenam',
		'ketujuh', 'kedelapan', 'kesembilan', 'kesepuluh', 'kesebelas', 'keduabelas',
		'ketigabelas', 'keempatbelas'
	];

	var pageChildWrapper = $('#page .main-wrap'),
	introDialog = $('<div/>',{'id':'somedialog','class':'dialog'})
		.append($('<div/>',{'class':'dialog__overlay'}))
		.append(
			$('<div/>',{'class':'dialog__content'}).append(
				$('<h2/>',{'style':'padding-bottom:1em'}).html("Ikuti <b>Tur Singkat</b> Menggunakan Freshkode")
			).append(
				$('<p/>').text('Tur singkat ini dapat membantu Anda menggunakan freshkode. Bila anda ingin mencegah pesan ini muncul di kemudian waktu, tandai centang di bawah dan pilih tombol \"Lewati Tur\"')
			).append(
				$('<p/>').html('Anda dapat membuka menu tur kembali dengan menekan ikon <i class="fa fa-question-circle" id="cd-inittour-trigger"></i> pada bagian kanan atas window ini')
			).append(
				$('<div/>').html('<button id="cd-tour-trigger" class="btn btn-primary cd-dialog-confirm">Mulai Tur</button> <button class="btn cd-dialog-close">Lewati Tur</button>')
			).append(
				$('<div style="margin-top:10px"/>').html('<input type="checkbox"> Cegah dialog ini muncul</input>')
			).append(
				$('<a/>', {'class':'cd-close cd-dialog-close'}).text('close')
			)
		),
	menu
	menuDialog = $('<div/>',{'id':'somedialog','class':'dialog'})
		.append($('<div/>',{'class':'dialog__overlay'}))
		.append(
			$('<div/>',{'class':'dialog__content'}).append(
				$('<h2/>',{'style':'padding-bottom:1em'}).html("Selamat datang di <b>Tur Singkat</b> Freshkode")
			).append(
				$('<p/>').text('Tur ini akan membantu anda untuk memahami penggunaan Freshkode. Silahkan pilih panduan yang diinginkan :')
			).append(
				$('<div/>', {'class' : 'panel panel-defaul'}).append(
					$('<ul/>', {'class' : 'list-group'})
				)
			).append(
				$('<a/>', {'class':'cd-close cd-dialog-close'}).text('close')
			)
		);
	endDialog = $('<div/>',{'id':'somedialog','class':'dialog'})
		.append($('<div/>',{'class':'dialog__overlay'}))
		.append(
			$('<div/>',{'class':'dialog__content'}).append(
				$('<h2/>',{'style':'padding-bottom:1em'}).html("Selamat, Anda sudah dapat megoperasikan perintah dasar freshkode")
			).append(
				$('<p/>').text('Anda dapat membuka menu Tur kembali untuk melihat demo-demo yang lainnya.')
			).append(
				$('<div/>').html('<button class="btn cd-dialog-close">Tutup</button>')
			).append(
				$('<a/>', {'class':'cd-close cd-dialog-close'}).text('close')
			)
		);

	function _init(initDialog) {
		tourWrapper = $('.cd-tour-wrapper:eq(0)'),
		tourSteps = tourWrapper.children('li'),
		stepsNumber = tourSteps.length,
		coverLayer = $('.cd-cover-layer'),
		tourStepInfo = $('.cd-more-info');

		createNavigation($('.cd-tour-wrapper'));

		if(tourWrapper.length) {			
			init_startSession(initDialog);
	
		}
	}

	function _destroy() {
		if($('.cd-tour-wrapper').length) {
			$('.cd-tour-wrapper').remove();
		}
	}

	function changeWrapper(WrapperID) {
		tourWrapper = $('.cd-tour-wrapper#'+WrapperID),
		tourSteps = tourWrapper.children('li'),
		stepsNummber = tourSteps.length;

		if(tourWrapper.length) {
			startSession();
			initTour();
		}
	}

	// LOCAL STORAGE
		function setLocalStorage(state) {
			localStorage.setItem('tour-skip', state == true ? true : false);
		}

		function getLocalStorage() {
			return (localStorage.getItem('tour-skip') != null && localStorage.getItem('tour-skip') == "true") ? true : false;
		}
	// [END OF] LOCAL STORAGE

	// BUTTON
		function activateButton() {
			$("#cd-inittour-trigger").addClass('clicked');
		}
		function deactivateButton() {
			$("#cd-inittour-trigger").removeClass('clicked');
		}
	// BUTTON

	// DIALOG
		function createInitDialog() {
			pageChildWrapper.append(introDialog);
			introDialog.addClass("dialog--open");
			introDialog.find('.cd-dialog-close').on("click", function() {
				setLocalStorage(introDialog.find('input[type="checkbox"]').prop("checked"));
				closeInitDialog();
			});
			introDialog.find('.cd-dialog-confirm').on("click", function() {
				setLocalStorage(introDialog.find('input[type="checkbox"]').prop("checked"));
				introDialog.removeClass("dialog--open");
				introDialog.remove();
				initTour();
			});
		}
		function closeInitDialog() {
			introDialog.removeClass("dialog--open");
			introDialog.addClass("dialog--close");
			introDialog.one('webkitAnimationEnd animationend', function() {
				introDialog.removeClass("dialog--close");
				introDialog.remove();
				endSession();
			});
		}

		function createMenuDialog() {
			pageChildWrapper.append(menuDialog);
			menuDialog.find('ul>li').remove();
			$('.cd-tour-wrapper').each(function(index) {
				menuDialog.find('ul').append(
					$('<li/>', {
						'class' : 'list-group-item',
						'data-wrapperid' : $(this).data('wrapperid')
					})
					.text($(this).data('text'))
					.on('click', function() {
						menuDialog.removeClass("dialog--open");
						menuDialog.remove();
						changeWrapper($(this).data('wrapperid'));
					})
				)
			});
			menuDialog.addClass("dialog--open");
			menuDialog.find('.cd-dialog-close').on("click", closeMenuDialog);
		}
		function closeMenuDialog() {
			menuDialog.removeClass("dialog--open");
			menuDialog.addClass("dialog--close");
			menuDialog.one('webkitAnimationEnd animationend', function() {
				menuDialog.removeClass("dialog--close");
				menuDialog.remove();
				endSession();
			});
		}

		function createEndDialog(ulInfo) {
			window.rating.addCategoryScore("tour-"+ulInfo);
			pageChildWrapper.append(endDialog);
			endDialog.addClass("dialog--open");
			endDialog.find('.cd-dialog-close').on("click", closeEndDialog);
		}
		function closeEndDialog() {
			endDialog.removeClass("dialog--open");
			endDialog.addClass("dialog--close");
			endDialog.one('webkitAnimationEnd animationend', function() {
				endDialog.removeClass("dialog--close");
				endDialog.remove();
				endSession();
			});
		}
	// DIALOG

	function init_startSession(initDialog) {
		if(isActive == false) {
			var tourSkip = getLocalStorage();
			if(initDialog == true) {
				if(!tourSkip) {
					if(startSession() == true) {
						createInitDialog();
					}
				}
				$("#cd-inittour-trigger").on('click', function() {
					if(startSession() == true) {
						createMenuDialog();
					}
				});
			} else {
				$("#cd-inittour-trigger").on('click', function() {
					if(startSession() == true) {
						initTour();
					}
				});
			}
		}
	}

	function startSession() {
		if(isActive == false) {
			isActive = true;
			$("#cd-inittour-trigger").addClass('clicked');
			return true;
		}
		return false;
	}
	function endSession() {
		isActive = false;
		$("#cd-inittour-trigger").removeClass('clicked');
	}

	function initTour() {
		//automatically call next step
		if(!tourWrapper.hasClass('active')) {
			//in that case, the tour has not been started yet
			tourWrapper.addClass('active');
			showStep(tourSteps.eq(0), coverLayer);
		}

		//change visible step
		tourStepInfo.on('click', '.cd-prev', function(event){
			//go to prev step - if available
			( !$(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'prev');
			event.preventDefault();
		});
		tourStepInfo.on('click', '.cd-next', function(event){
			//go to next step - if available
			( !$(event.target).hasClass('inactive') ) && changeStep(tourSteps, coverLayer, 'next');
			event.preventDefault();
		});

		//close tour
		tourStepInfo.on('click', '.cd-close', function(event){
			closeTour(tourSteps, tourWrapper, coverLayer);
			event.preventDefault();
		});

		//keyboard navigation
		$(document).keyup(function(event){
			if( event.which=='37' && !tourSteps.filter('.is-selected').find('.cd-prev').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'prev');
			} else if( event.which=='39' && !tourSteps.filter('.is-selected').find('.cd-next').hasClass('inactive') ) {
				changeStep(tourSteps, coverLayer, 'next');
			} else if( event.which=='27' ) {
				closeTour(tourSteps, tourWrapper, coverLayer);
			}
		});
	}

	function createNavigation(tourWrapper) {

		$(tourWrapper).each(function(i) {
			var steps = $(this).children('li');
			var n = steps.length;
			var tourNavigationHtml = '<div class="cd-nav"><span><b class="cd-actual-step">1</b>/'+n+'</span><ul class="cd-tour-nav"><li><a href="#0" class="cd-prev">&#171; Kembali</a></li><li><a href="#0" class="cd-next">Selanjutnya &#187;</a></li></ul></div><a href="#0" class="cd-close">Close</a>';

			steps.each(function(index){
				var step = $(this),
					stepNumber = index + 1,
					nextClass = ( stepNumber < n ) ? '' : 'inactive',
					prevClass = ( stepNumber == 1 ) ? 'inactive' : '';
				step.children('.cd-more-info').children('h2').text("Langkah " + stepLabels[stepNumber]);
				$(tourNavigationHtml).find('.cd-next').end().find('.cd-prev').addClass(prevClass).end().find('.cd-actual-step').html(stepNumber).end().appendTo(step.children('.cd-more-info'));
			});
		});

	}

	var activeEvent = null;

	function attachEvent(elm,event,callback) {
		activeEvent = event;
		$(elm).addClass('eventClassDemo');
		$('.eventClassDemo').on(activeEvent,callback);
	}

	function removeAttachedEvent() {
		if(activeEvent != null) {
			$(".eventClassDemo").off(activeEvent);
			$('.eventClassDemo').removeClass('eventClassDemo');
			activeEvent = null;
		}
	}

	function showStep(step, layer) {
		step.addClass('is-selected').removeClass('move-left');
		showLayer(layer);

		if(step.data('condition') == null || step.data('condition') != "disabled") {
			step.find('.cd-more-info > .cd-nav a.cd-next').addClass('inactive');
			var elm = step.data('selector');
			attachEvent(step.data('selector'), step.data('condition'), function() {
				$(step.data('selector')).off(step.data('condition'));
				changeStep(tourSteps, coverLayer, 'next');
			});
		} else if(step.data('condition') != "disabled") {
			step.find('.cd-more-info > .cd-nav a.cd-next').removeClass('inactive');
		}

	}

	function showLayer(layer) {
		layer.addClass('is-visible').on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function(){
			layer.removeClass('is-visible');
		});
	}

	function changeStep(steps, layer, bool) {
		var visibleStep = steps.filter('.is-selected');
		visibleStep.removeClass('is-selected');

		(bool == 'next') && visibleStep.addClass('move-left');

		removeAttachedEvent();

		var ulInfo = steps.parent().attr("id");

		(function(){
			( bool == 'next' )
				? (visibleStep.next().length == 0)
					? createEndDialog(ulInfo)
					: showStep(visibleStep.next(), layer)
				: showStep(visibleStep.prev(), layer);
		})();
	}

	function closeTour(steps, wrapper, layer) {
		removeAttachedEvent();
		steps.removeClass('is-selected move-left');
		wrapper.removeClass('active');
		layer.removeClass('is-visible');
		endSession();
	}

	this.init = function(_initDialog) {
		_init(_initDialog);
	}
	this.destroy = function() {
		_destroy();
	}
};