function on_click_three_rs_search_submit(term_id, cur_url, base_url) {
	var _url = base_url+'/thr_search/get_result';
	var term = jQuery("#"+term_id).val();
	if (term == '') {
		return false;
	}
	
	jQuery.ajax({
		url: 	_url,
		type: 	'POST',
		data:{'term': term, 'mag_q': cur_url, 'mag':'mag' },
		beforeSend: function(jqXHR, settings) {

		},
		error: function(jqXHR, textStatus, errorThrown) {
			alert(textStatus);
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

	return false;
}