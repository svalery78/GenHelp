function hideframe(){parent.document.getElementsByTagName("FRAMESET").item(1).cols = '*,100%';}
function showframe(){parent.document.getElementsByTagName("FRAMESET").item(1).cols = '30%,*';}
function hideshow(){
	var showparam = parent.document.getElementsByTagName("FRAMESET").item(1).cols;
	var opener = document.getElementById('opener');
	var opened='30%,*';
	if (showparam == opened){
		hideframe();
		opener.className="SystemMenuLinkClosed";
		opener.firstChild.nodeValue = "->"
	} else {
		showframe();
		opener.className="SystemMenuLinkOpened";
		opener.firstChild.nodeValue = "<-"
	}
}
function showpanel(){
	var showparam = parent.document.getElementsByTagName("FRAMESET").item(1).cols;
	var opener = document.getElementById('opener');
	var closed='*,100%';
	if (showparam == closed){
		showframe();
		opener.className="SystemMenuLinkOpened";
		opener.firstChild.nodeValue = "<-"
	}
}