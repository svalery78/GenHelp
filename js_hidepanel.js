function hideframe() {
    const contentsDiv = parent.document.getElementById("contents");
    const mainDiv = parent.document.getElementById("main");
    contentsDiv.style.display = 'none';
    mainDiv.style.width = '100%';
}

function showframe() {
    const contentsDiv = parent.document.getElementById("contents");
    const mainDiv = parent.document.getElementById("main");
    contentsDiv.style.display = 'block';
    mainDiv.style.width = '70%';
}

function hideshow() {
    const contentsDiv = parent.document.getElementById("contents");
    const opener = document.getElementById('opener');

    if (contentsDiv.style.display === 'none') {
        showframe();
        opener.className = "SystemMenuLinkOpened";
        opener.textContent = "<-";
    } else {
        hideframe();
        opener.className = "SystemMenuLinkClosed";
        opener.textContent = "->";
    }
}

// function hideframe(){parent.document.getElementsByTagName("FRAMESET").item(1).cols = '*,100%';}
// function showframe(){parent.document.getElementsByTagName("FRAMESET").item(1).cols = '30%,*';}
// function hideshow(){
// 	var showparam = parent.document.getElementsByTagName("FRAMESET").item(1).cols;
// 	var opener = document.getElementById('opener');
// 	var opened='30%,*';
// 	if (showparam == opened){
// 		hideframe();
// 		opener.className="SystemMenuLinkClosed";
// 		opener.firstChild.nodeValue = "->"
// 	} else {
// 		showframe();
// 		opener.className="SystemMenuLinkOpened";
// 		opener.firstChild.nodeValue = "<-"
// 	}
// }
// function showpanel(){
// 	var showparam = parent.document.getElementsByTagName("FRAMESET").item(1).cols;
// 	var opener = document.getElementById('opener');
// 	var closed='*,100%';
// 	if (showparam == closed){
// 		showframe();
// 		opener.className="SystemMenuLinkOpened";
// 		opener.firstChild.nodeValue = "<-"
// 	}
// }