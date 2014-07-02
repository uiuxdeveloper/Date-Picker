'use strict';
//
//
//
//
// Date Picker
	$( "#dateSelect input" ).datepicker({ 
		minDate: "-1Y", 
		maxDate: "+1Y"
	});
// END: Date Picker
//
//
//
//
// Placeholder
	$( "#dateSelect input" ).placeholder();
// END: Placeholder
//
//
//
//
// Date Placeholder Slashes
	$( "#dateSelect input" ).on('input',function(){
		var val = $(this).val();
		if (val.length == 2){
			$(this).val(val + "/");
		}else if (val.length == 5){
			$(this).val(val + "/");
		}

	});
// END: Date Placeholder Slashes
//
//
//
//
// Fade BG Text on Focus/Unfocus
	$( "#dateSelect input" ).on("focus", function(){
		$("#desc").fadeTo( 250, .1 );
	}).on("blur", function(){
		var t = window.setInterval(function(){
			if( $("#ui-datepicker-div").is(":hidden")){
				$("#desc").fadeTo( 100, 1 );
				clearTimeout(t)
			}
		}, 150);
	});
// END: Fade BG Text on Focus
//
//
//
//
// Validate Date Picker Field
	var validateDate = {
		// params
			ele: $( "#dateSelect" ),
			
		// init
			_init: function(){
				this.bindEvents();
			},

		// methods
			getToday: function(){
				return new Date();
			},
			getConvertedInputDate: function() {
				var val = this.ele.find("input").val(),
					parts = val.split('/'),
					convertedDate = new Date(parts[2],parts[0],parts[1]),
					convertedDate = convertedDate.setDate ( convertedDate.getDate() );
					
					return convertedDate;
			},
			validateMinRange: function() {
				this.minDate = this.getToday().setDate( -333 );

				if( this.dateInput < this.minDate ) {
					this.isError = true;
					this.hideCalendar();
					this.showErrorMsg();
				}
			},
			validateMaxRange: function() {
				this.maxDate = this.getToday().setDate( 398 );
				
				if( this.dateInput > this.maxDate ) {
					this.isError = true;
					this.hideCalendar();
					this.showErrorMsg();
				}
			},
			hideCalendar: function() {
				$("#ui-datepicker-div").fadeOut( 250 );
			},
			showErrorMsg: function() {
				var err = this.ele.find("input").attr( "data-range-error" );
				this.ele.append( '<div id="err" class="err">' + err + '</div>' ).find("#err").fadeIn( 250 );
			},
			hideErrorMsg: function() {
				this.ele.find("#err").fadeOut( 250 );
			},
			

		// events
			bindEvents: function(){
				var that = this;

				this.ele.find("input").on( "change", function(){
					that.isError = false;
					that.dateInput = that.getConvertedInputDate();

					that.validateMinRange();
					that.validateMaxRange();

					if( !that.isError )
						that.hideErrorMsg();
				});
			}
	};
	validateDate._init();
// END: Validate Date Picker Field