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
				
				this.createNodes();
				this.addListeners();
			}else{
				return null;
			}
		};
		this.createNodes = function() {
			var butt1 = this.createButton('invite', options.buttons.invite),
				butt2 = this.createButton('post', options.buttons.post);
			
			d.body.appendChild(butt1);
			d.body.appendChild(butt2);
		};
		this.createButton = function(identifier, obj) {
			var elem = d.createElement('button');
				elem.id = identifier;
				elem.className = obj.className;
				elem.setAttribute('style', obj.pos);
				elem.setAttribute('type', 'button');
				elem.innerHTML = obj.title;
				return elem;
		};
		this.addListeners = function() {
			var invite = $("#invite"),
				post = $("#post");
			
			if(invite) {
				invite.on('click', function() {
					FB.ui({
						method: 'apprequests',
						message: options.invite.message
					}, function(response) {
						if(response) {
							// POSTES TIL SERVER FOR LAGRING AV response.to.length
							//alert(JSON.stringify(response.to.length));
							invite.html("Din invitasjon er sendt");
						}
					});
				});
			}
			if(post) {
				post.on('click', function() {
					FB.ui({
						method: 'feed',
						name: options.post.title,
						caption: options.post.caption,
						picture: options.post.picture,
						description: options.post.description
					}, function(response) {
						if(response) {
							post.html("Det ble websuccess");
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