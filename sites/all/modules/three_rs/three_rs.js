function on_click_three_rs_search_submit(term_id) {
	var _url = Drupal.settings.basePath+'thr_search/get_result';
	var term = jQuery("#"+term_id).val();
	if (term == '') {
		return false;
	}
	
	alert("Searching URL = "+_url);
	jQuery.ajax({
		url: 	_url,
		type: 	'POST',
		data:{'term': term},
		beforeSend: function(jqXHR, settings) {
			alert('beforeSend');
		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(textStatus);
			alert(jqXHR.status);
			alert(jqXHR.statusText);
		},
		success: function(response) {
			eval("var json=" + response + ";");
			if (json.code == "success") {
				jQuery('#thr_search_block_result_pane .overview').html(json.result_html);
				jQuery('#thr_search_block_result_wrapper').dialog('open');
				jQuery('#thr_search_block_result_pane').tinyscrollbar_update();
			}
			else {
				alert(json.msg);
			}
		}	// END OF SUCESS FUNCTION
	});	
	
	jQuery('#thr_search_block_result_pane .overview').html("Searching...");
	jQuery('#thr_search_block_result_wrapper').dialog('open');
	jQuery('#thr_search_block_result_pane').tinyscrollbar_update();
	
	return false;
}