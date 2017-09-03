function get_source() {
    // var obj = Array.prototype.filter.call(document.querySelectorAll("a, button, area"), function(ele) {
    // 	return (ele.getAttribute("onclick") || (ele.getAttribute("onclick") && ele.getAttribute("onclick").indexOf("rakeLog.sendRakeLog") > -1))
    // });
    var log_layer_active = document.body.getAttribute("data-log-layer-active");
	if(!log_layer_active) {
		log_layer_active = true;
		document.body.setAttribute("data-log-layer-active",log_layer_active);
		
	    var obj = document.body.querySelectorAll("[data-log-actionid-label]");
		obj.forEach(function(item){
			var obj_id = parentNodeSearch(item, "data-log-actionid-area").getAttribute("data-log-actionid-area") + "." + item.getAttribute("data-log-actionid-label");
			addCover(item, obj_id);
		});
	}
	return log_layer_active;
}

chrome.extension.sendMessage({
    action: "getSource",
    source: get_source()
});

function addCover(element, obj_id) {
    var wrapper = document.createElement('div');
    var cover = document.createElement('div');

    wrapper.setAttribute('style', 'position: relative;');

    cover.innerText = obj_id;
    cover.setAttribute('style', 'position:absolute; top: 0; bottom:0; right: 0; left: 0; width: 100%; height: 100%; z-index:999; background:black; opacity: 0.6; pointer-events: none; color:white; font-weight:200; font-size:13px');

    element.parentElement.replaceChild(wrapper, element);

    wrapper.appendChild(element);
    wrapper.appendChild(cover);
}

function parentNodeSearch( ele, attr ) {
    if ( ele.getAttribute(attr) ) {
        return ele;
    } else {
        while ( ele.parentNode && ele.nodeName !== "HTML" ) {
            ele = ele.parentNode;
            if ( ele.getAttribute(attr) ) {
                return ele;
            }
        }
        return null;
    }
    return null;
}

// obj.forEach(function(item,index,array){
// temp[index] = parentNodeSearch(item, "data-log-actionid-area").getAttribute("data-log-actionid-area");
// });