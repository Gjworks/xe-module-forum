/**
 * @file   modules/forum/js/forum_admin.js
 * @author Arnia (xe_dev@arnia.ro)
 * @brief  forum module admin javascript functions
 **/


/* function for callback on insert_forum filter */
function completeInsertForum(ret_obj) {
    var error = ret_obj['error'];
    var message = ret_obj['message'];
    var act = ret_obj['act'];
    var page = ret_obj['page'];
    var module_srl = ret_obj['module_srl'];

    alert(message);
    
    if(act) {
    	var url = current_url.setQuery('act',act);
    }
    else {
    	var url = current_url.setQuery('act','dispForumAdminForumInfo');
    }
    	
    if(module_srl) url = url.setQuery('module_srl',module_srl);
    if(page) url.setQuery('page',page);
    location.href = url;
}

/* function for callback on delete_forum filter */
function completeDeleteForum(ret_obj) {
    var error = ret_obj['error'];
    var message = ret_obj['message'];
    var page = ret_obj['page'];
    alert(message);

    var url = current_url.setQuery('act','dispForumAdminContent').setQuery('module_srl','');
    if(page) url = url.setQuery('page',page);
    location.href = url;
}

/* javascript function used to update category */
function doUpdateCategory(category_srl, mode, message) {
    if(typeof(message)!='undefined'&&!confirm(message)) return;

    var fo_obj = xGetElementById('fo_category_info');
    fo_obj.category_srl.value = category_srl;
    fo_obj.mode.value = mode;

    procFilter(fo_obj, update_category);
}

/* function for callback on update_category filter  */
function completeUpdateCategory(ret_obj) {
    var error = ret_obj['error'];
    var message = ret_obj['message'];
    var module_srl = ret_obj['module_srl'];
    var page = ret_obj['page'];
    alert(message);

    var url = current_url.setQuery('module_srl',module_srl).setQuery('act','dispForumAdminCategoryInfo');
    if(page) url.setQuery('page',page);
    location.href = url;
}

/* Cart Setup */
function doCartSetup(url) {
    var module_srl = new Array();
    jQuery('#fo_list input[name=cart]:checked').each(function() {
        module_srl[module_srl.length] = jQuery(this).val();
    });

    if(module_srl.length<1) return;

    url += "&module_srls="+module_srl.join(',');
    popopen(url,'modulesSetup');
}

/* List Item setup */
function doInsertItem() {
    var target_obj = xGetElementById('targetItem');
    var display_obj = xGetElementById('displayItem');
    if(!target_obj || !display_obj) return;

    var text = target_obj.options[target_obj.selectedIndex].text;
    var value = target_obj.options[target_obj.selectedIndex].value;

    for(var i=0;i<display_obj.options.length;i++) if(display_obj.options[i].value == value) return;

    var obj = new Option(text, value, true, true);
    display_obj.options[display_obj.options.length] = obj;

}
function doDeleteItem() {
    var sel_obj = xGetElementById('displayItem');
    var idx = sel_obj.selectedIndex;
    if(idx<0 || sel_obj.options.length<2) return;
    sel_obj.remove(idx);
    sel_obj.selectedIndex = idx-1;
}
function doMoveUpItem() {
    var sel_obj = xGetElementById('displayItem');
    var idx = sel_obj.selectedIndex;
    if(idx<1 || !idx) return;

    var text = sel_obj.options[idx].text;
    var value = sel_obj.options[idx].value;

    sel_obj.options[idx].text = sel_obj.options[idx-1].text;
    sel_obj.options[idx].value = sel_obj.options[idx-1].value;
    sel_obj.options[idx-1].text = text;
    sel_obj.options[idx-1].value = value;
    sel_obj.selectedIndex = idx-1;
}
function doMoveDownItem() {
    var sel_obj = xGetElementById('displayItem');
    var idx = sel_obj.selectedIndex;
    if(idx>=sel_obj.options.length-1) return;

    var text = sel_obj.options[idx].text;
    var value = sel_obj.options[idx].value;

    sel_obj.options[idx].text = sel_obj.options[idx+1].text;
    sel_obj.options[idx].value = sel_obj.options[idx+1].value;
    sel_obj.options[idx+1].text = text;
    sel_obj.options[idx+1].value = value;
    sel_obj.selectedIndex = idx+1;
}

function doSaveListConfig(module_srl) {
    if(!module_srl) return;
    var sel_obj = xGetElementById('displayItem');
    var idx = sel_obj.selectedIndex;

    var list = new Array();
    for(var i=0;i<sel_obj.options.length;i++) list[list.length] = sel_obj.options[i].value;
    if(list.length<1) return;
    
    var params = new Array();
    params['module_srl'] = module_srl;
    params['list'] = list.join(',');

    var response_tags = new Array('error','message');

    exec_xml('forum','procForumAdminInsertListConfig', params, function() { location.reload(); });
}

/* function to change category on admin */
function doChangeCategory(fo_obj) {
    var module_category_srl = fo_obj.module_category_srl.options[fo_obj.module_category_srl.selectedIndex].value;
    if(module_category_srl==-1) {
        location.href = current_url.setQuery('act','dispModuleAdminCategory');
        return false;
    }
    return true;
}

