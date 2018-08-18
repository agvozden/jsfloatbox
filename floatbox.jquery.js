/**
 * floatbox plugin
 * @author agvozden
 * $("#dump").floatbox(); 							// float dump div
 * $("#dump").floatbox({msg:'test'}); 				// float in dump div
 * $("body").floatbox({ajax:'http://test.com/'});	// float ajax load
 * $("#dump").floatbox({msg:'', parent($("#holder"))}); // float content from parent
 */
;(function($) {
	(function(pluginName) {
		var defaults = {
			msg: null,
			ajax: false,
			page: false,
			parent: false,
			timeout: false,
			_flb: 'floatbox',
			_flb_close: 'floatbox_close',
			_flb_frame: 'floatbox_frame',
			_flb_content: 'floatbox_content',
			_flb_frame_class: 'rounded-corners',
			_flb_overlay: false, // 'overlay',
			_dblclick: true,
			_timeout: null,
			
			box: function(div, options){

				if (options.msg===null && options.parent===false) options.msg = div.html();
				
				fHTML = '<div id="'+options._flb+'">'
					+ '<a id="'+options._flb_close+'"></a>'
					+ '<div id="'+options._flb_frame+'" class="'+options._flb_frame_class+'">'
					+ '<div id="'+options._flb_content+'">'+options.msg+'</div></div></div>';
											
				if (options._flb_overlay){
					if ($("."+options._flb_overlay).length==0) 
						fHTML = '<div class="'+options._flb_overlay+'"></div>' + fHTML;
				}
				
				if ($("#"+options._flb).length==0){
					if (options.msg || options.parent) $("body").append(fHTML);
					else div.append(fHTML);
				} else {
					$("#"+options._flb_content).html(options.msg);
					$("#"+options._flb).show();
				}
				
				if (options.parent) $(">*", options.parent).appendTo("#"+options._flb_content);
				
				if (options._flb_overlay) $("."+options._flb_overlay).fadeIn();
				
				if (options.timeout){
					defaults._timeout = setTimeout(function () {
						options.destroy(options);
					}, options.timeout);
				}
				
				if (options._dblclick){
					$("#"+options._flb).on("dblclick", function(){
						options.destroy(options);
					});					
				}
				$("#"+options._flb_close).on("click", function(){
					options.destroy(options);
				});	
				return true;
			},
			
			boxajax: function(div, options){
				$("#"+options._flb_content).load(options.url);									
			},
			
			destroy: function(options){
				$("#"+options._flb).fadeOut('slow');
				if (options.parent) $("#"+options._flb_content+" >*").appendTo(options.parent);
				if (options._flb_overlay) $("."+options._flb_overlay).fadeOut();
				clearTimeout(defaults._timeout);
				$("#"+options._flb).remove();
				return true;
			}
		
		};
		$.fn[pluginName] = function(options) {
								
			options = $.extend(true, {}, defaults, options);
			
			if ($("#"+options._flb).length) return false;
						
			return this.each(function() {

				var elem = this, $elem = $(elem);
				
					if (options.page){
						options.msg = '';
						options.box($elem, options);
						options.url = url + '?ajax=page&id='+page;
						options.boxajax($elem, options);
					}
					else if (options.ajax){
						options.msg = '';
						options.box($elem, options);
						options.boxajax($elem, options);
					}
					else {
						options.box($elem, options);
					}			
				
			});
		};
		$.fn[pluginName].defaults = defaults;
	})('floatbox');
})(jQuery);