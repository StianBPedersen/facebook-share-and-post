window.JulekalenderFB = (function(window, d, $) {
	"use strict";
	function Julekalender(options) {
		this.appId = options.appId;
		this.pageName = options.pageName;
					
		this.init = function() {
			FB.init({
				appId: this.appId,
				status: 0,
				xfbml: true
			});
			
			if(FB) {
				//redirect fra app.name til page tab
				if(this.getURLParameter('request_ids')) {
					//Akseptert invitasjonen
					top.location = 'http://www.facebook.com/'+this.pageName+'?sk=app_'+this.appId;	
				}else if(this.getURLParameter('fb_source') || this.getURLParameter('ref') ) {
					//trykket på link i feed, bookmark e.l og må redirectes fra app.namespace til page tab
					top.location = 'http://www.facebook.com/'+this.pageName+'?sk=app_'+this.appId;
				}
				this.addListeners();
			}else{
				return null;
			}
		};
		
		this.addListeners = function() {
			var invite = $('#'+options.buttons.invite),
				post = $('#'+options.buttons.post);
			
			if(invite) {
				invite.on('click', function() {
					FB.ui({
						method: 'apprequests',
						message: options.invite.message
					}, function(response) {
						if(response) {
							// POSTES TIL SERVER FOR LAGRING AV response.to.length
							//alert(JSON.stringify(response.to.length));
							//evt callback
						}
					});
				});
			}
			if(post) {
				post.on('click', function() {
					FB.ui({
						method: 'feed'
					}, function(response) {
						if(response) {
							//evt callback;
						}
					});
				});
			}
		};
		this.getURLParameter = function(name) {
			return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
		};
	}
	return Julekalender;
})(window, document, jQuery);