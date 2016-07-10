var RatingCore = function() {
	this.addCategoryScore = function(cat) {
		switch(cat) {
			case "tour-basic-operation" :
				if(localStorage.getItem('rated-tour1') == "null") {
					localStorage.setItem('rated-tour1', true);
					this.addScore(30);
				}
			break;
			case "tour-using-variable" :
				if(localStorage.getItem('rated-tour2') == "null") {
					localStorage.setItem('rated-tour2', true);
					this.addScore(40);
				}
			break;
			case "tour-using-operator" :
				if(localStorage.getItem('rated-tour3') == "null") {
					localStorage.setItem('rated-tour3', true);
					this.addScore(70);
				}
			break;
			case "tour-using-condition" :
				if(localStorage.getItem('rated-tour4') == "null") {
					localStorage.setItem('rated-tour4', true);
					this.addScore(90);
				}
			break;
		}
	}

	this.lastScore = 0;

	// LOCAL STORAGE
		this.addScore = function(score) {
			if(score > 0) {
				$(".programmerRating > #scoreplus2").text("+"+score);
				$(".programmerRating > #scoreplus2").show().delay(2000).fadeOut();
			}
			this.lastScore = score;
			localStorage.setItem('programmer-score', this.getScore() + score);
			this.getStarsElmUpdate($('.programmerRating'));
		}

		this.restoreScore = function() {
			if(this.lastScore>0) {
				$(".programmerRating > #scoreplus1").text("-"+this.lastScore);
				$(".programmerRating > #scoreplus1").show().delay(2000).fadeOut();
			}
			localStorage.setItem('programmer-score', this.getScore() - this.lastScore);
			this.getStarsElmUpdate($('.programmerRating'));			
		}

		this.resetScore = function(score) {
			localStorage.setItem('programmer-score', 0);
			localStorage.setItem('rated-tour1', null);
			localStorage.setItem('rated-tour2', null);
			localStorage.setItem('rated-tour3', null);
			localStorage.setItem('rated-tour4', null);
			this.getStarsElmUpdate($('.programmerRating'));
		}

		this.getScore = function() {
			return localStorage.getItem('programmer-score') != null ? parseInt(localStorage.getItem('programmer-score')) : 0;
		}
	// [END OF] LOCAL STORAGE

	this.getStars = function() {
		var score = this.getScore();
		if(score < 100) {
			return 0;
		} else if(score < 200) {
			return 1;
		} else if(score < 300) {
			return 2;
		} else if(score < 400) {
			return 3;
		} else if(score < 600) {
			return 4;
		} else if(score < 1000) {
			return 5;
		} else {
			return 6;
		}
	}

	this.getStarsElmUpdate = function(selector) {
		var stars = this.getStars();
		var a = $(selector).children('a');
		var ul = $(selector).children('ul');

		a.children("i").each(function(){ 
			$(this).attr("class","fa fa-star-o")}
		);
		a.children("i:lt("+stars+")").each(function(){ 
			$(this).attr("class","fa fa-star")}
		);
		ul.children().first().children('span').text(stars);
		ul.children("li:eq(1)").find('span').text(this.getScore());

	}
};