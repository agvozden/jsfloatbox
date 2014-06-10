/**
 * floatbox plugin
 * @author agvozden
 *  $("#dump").floatbox(); 							// float dump div
 *  $("#dump").floatbox({msg:'test'}); 				// float in dump div
 *	$("body").floatbox({ajax:'http://test.com/'});	// float ajax load
 */
;(function($) {
	(function(pluginName) {
		var defaults = {
			msg: '',
			ajax: false,
			page: false,
			_fb: 'floatbox',
			_fb_close: 'floatbox_close',
			_fb_frame: 'floatbox_frame',
			_fb_content: 'floatbox_content',
			_fb_frame_class: 'rounded-corners',
			_fb_overlay: 'overlay',
			box: function(div, msg){
				
				if (!msg) msg = div.html();

				fHTML = '<div class="'+defaults._fb_overlay+'"></div>'
					+ '<div id="'+defaults._fb+'">'
					+ '<a id="'+defaults._fb_close+'"></a>'
					+ '<div id="'+defaults._fb_frame+'" class="'+defaults._fb_frame_class+'">'
					+ '<div id="'+defaults._fb_content+'">'+msg+'</div></div></div>';
				
				if (msg) $("body").append(fHTML);
				else div.append(fHTML);
				
				$("#"+defaults._fb).on("dblclick", function(){
					$(this).hide();
					$("."+defaults._fb_overlay).fadeOut();
				});
				$("#"+defaults._fb_close).on("click", function(){
					$("#"+defaults._fb).hide();
					$("."+defaults._fb_overlay).fadeOut();
				});	
				return true;
			},
			boxajax: function(div, url){
				$("#"+defaults._fb_content).load(url, function(){});									
			},
		
		};
		$.fn[pluginName] = function(options) {
			options = $.extend(true, {}, defaults, options);
						
			return this.each(function() {
				var elem = this,
					$elem = $(elem);

				if (options.page){
					options.box($elem, true);
					options.boxajax($elem, url + '?ajax=page&id='+page);
				}
				else if (options.ajax){
					options.box($elem, true);
					options.boxajax($elem, options.ajax);
				}
				else {
					options.box($elem, options.msg);
				}		
				
			});
		};
		$.fn[pluginName].defaults = defaults;
	})('floatbox');
})(jQuery);
