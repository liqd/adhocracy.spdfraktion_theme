jQuery(document).ready(function($){
	
	if( 'undefined' == typeof( tab_settings ) )
		return;
	
	var i;
	for( i = 1; i <= tab_settings.total; i++ ) {
		var disabled;
		var settings = { fx: { opacity: 'toggle' } };
		
		if( 'string' == typeof( tab_settings.use_cookies ) )
			if( tab_settings.use_cookies )
				settings.cookie = { expires: 30 };
		
		if( 'undefined' != typeof( tab_settings[i] ) ) {
			disabled = tab_settings[i].split(',');
			var key;
			for( key in disabled )
				disabled[key] = parseInt( disabled[key] ) - 1;
			settings.disabled = disabled;
		}
		
		$( '#tabs-'+i ).tabs(settings);
	}

	$( '.put-next' ).click(function() { 
		
		var tabset = $( 'div' + $(this).attr('href') ).tabs(); 
		
		if( 'undefined' == typeof( tabset ) )
			return false;
			
		var tabs = $( tabset.selector + ' ul' ).children();
		var next = tabset.tabs( "option", "selected" ) + 1;
		
		if( 'undefined' == typeof( tabs[next] ) ){
			if( !$( tabset.selector + ' ul li:eq(0)' ).hasClass('ui-state-disabled') )
				tabset.tabs( 'select', 0 ); 
			return false;
		}
		
		while( next < tabs.length ) {
			var next_tab_disabled = $( tabset.selector + ' ul li:eq('+next+')' ).hasClass('ui-state-disabled');
			if( next_tab_disabled ) {
				next = next + 1;
				continue;
			}
			tabset.tabs( 'select', next ); 
			break;
		}
		return false; 
	});
	
	$( '.put-prev' ).click(function() { 
		
		var tabset = $( 'div' + $(this).attr('href') ).tabs(); 
		
		if( 'undefined' == typeof( tabset ) )
			return false;
		
		var tabs = $( tabset.selector + ' ul' ).children();
		var prev = tabset.tabs( "option", "selected" ) - 1;
		
		if( 'undefined' == typeof( tabs[prev] ) ){
			if( !$( tabset.selector + ' ul li:eq('+ ( tabs.length - 1 ) +')' ).hasClass('ui-state-disabled') )
				tabset.tabs( 'select', tabs.length - 1 ); 
			return false;
		}
		
		while( prev >= 0 ) {
			var prev_tab_disabled = $( tabset.selector + ' ul li:eq('+prev+')' ).hasClass('ui-state-disabled');
			if( prev_tab_disabled ) {
				prev = prev - 1;
				continue;
			}
			tabset.tabs( 'select', prev ); 
			break;
		}
		return false; 
	});
});

