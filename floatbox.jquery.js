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
			msg: null,
			ajax: false,
			page: false,
			_flb: 'floatbox',
			_flb_close: 'floatbox_close',
			_flb_frame: 'floatbox_frame',
			_flb_content: 'floatbox_content',
			_flb_frame_class: 'rounded-corners',
			_flb_overlay: false, // 'overlay',
			box: function(div, msg){
			
				if (msg===null) msg = div.html();			
				
				fHTML = '<div id="'+defaults._flb+'">'
					+ '<a id="'+defaults._flb_close+'"></a>'
					+ '<div id="'+defaults._flb_frame+'" class="'+defaults._flb_frame_class+'">'
					+ '<div id="'+defaults._flb_content+'">'+msg+'</div></div></div>';
				
				if (defaults._flb_overlay){
					if ($("."+defaults._flb_overlay).length==0) 
						fHTML = '<div class="'+defaults._flb_overlay+'"></div>' + fHTML;
				}
				
				if ($("#"+defaults._flb).length==0){
					if (msg) $("body").append(fHTML);
					else div.append(fHTML);				
				} else {
					$("#"+defaults._flb_content).html(msg);
					$("#"+defaults._flb).show();
				}
				
				if (defaults._flb_overlay) $("."+defaults._flb_overlay).fadeIn();		
				
				$("#"+defaults._flb).on("dblclick", function(){
					$(this).hide();
					if (defaults._flb_overlay) $("."+defaults._flb_overlay).fadeOut();
				});
				$("#"+defaults._flb_close).on("click", function(){
					$("#"+defaults._flb).hide();
					if (defaults._flb_overlay) $("."+defaults._flb_overlay).fadeOut();
				});	
				return true;
			},
			boxajax: function(div, url){
				$("#"+defaults._flb_content).load(url);									
			},
		
		};
		$.fn[pluginName] = function(options) {
			options = $.extend(true, {}, defaults, options);
						
			return this.each(function() {

				var elem = this, $elem = $(elem);

					if (options.page){
						options.box($elem, '');
						options.boxajax($elem, url + '?ajax=page&id='+page);
					}
					else if (options.ajax){
						options.box($elem, '');
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
