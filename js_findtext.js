// Скрытие элементов
function hideElements() {
   document.querySelector('#HIDEPREVTOPICDIV')?.replaceWith(document.createElement("td"));
   document.querySelector('#HIDENEXTTOPICDIV')?.replaceWith(document.createElement("td"));
   document.querySelector('#HIDESEEALSODIVID')?.style.display = "none";
   
   document.querySelectorAll('.wrappable').forEach(el => el.style.display = "none");
 
   if (parent?.menu?.document?.searchform?.searchtext) {
     // searchform присутствует, никаких дополнительных действий
   } else {
     document.querySelector('#TOPIC_SYNCTOC_ID')?.style.display = "none";
   }
 }


// Переключение видимости элемента
function toggle(obj) {
   let sibling = obj.nextElementSibling;
   if (sibling) {
     sibling.style.display = (sibling.style.display === 'none') ? 'block' : 'none';
   }
 }

// Поиск и выделение текста
function findText() {
   let searchText = parent?.menu?.document?.searchform?.searchtext?.value?.trim();
   if (!searchText) return "-1";
 
   const highlightText = (text, className) => {
     document.body.innerHTML = document.body.innerHTML.replace(
       new RegExp(`(${text})`, 'gi'),
       `<span class="${className}">$1</span>`
     );
   };
 
   let words = parseExpr(searchText, "|").split("|");
   words.forEach(word => {
     if (word.startsWith("!")) {
       highlightText(word.substring(1), 'bf case-sensitive');
     } else {
       highlightText(word, 'bf');
     }
   });
 
   return "0";
 }
 
 // Функция для разбиения строки на слова
function parseExpr(expr, sep) {
   return expr.split(" ").join(sep);
 }
 
 // Удаление пробелов
 function trim(inputString) {
   return inputString?.replace(/^\s+|\s+$/g, '') || "";
 }


 



// function hide_elements() {
// $('#HIDEPREVTOPICDIV').replaceWith( "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" );
// $('#HIDENEXTTOPICDIV').replaceWith( "<td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</td>" );
// $('#HIDESEEALSODIVID').hide();
// $('.wrappable').hide();
// if( parent.menu && parent.menu.document.searchform && parent.menu.document.searchform.searchtext ) 
// { 
// }
// else
// {
// $('#TOPIC_SYNCTOC_ID').hide();
// }
// return;
// }

// function toggle(obj) {
// var sibling;
// if(obj.nextSibling.nodeType==3) {
//     sibling=obj.nextSibling.nextSibling;
//     }
// else {
//     sibling=obj.nextSibling;
//     }
// sibling.style.display=(sibling.style.display=='none')? 'block' : 'none';
// }

// function find_text() {
// //--------------------------------------------------------------------------------------------------------------------*
// // This function performs search of the text specified in input field of the parent form
// // The text (if found) is highlighted. The highlight style is '.bf' (see the chm.css file)
// // Works in IE4 (yellow or other specified highlight - see the code), 
// //          Netscape 4+ (highlights only first found text),
// //          and DOM browsers: IE5+, Mozilla 1+, Netscape 6+, Opera 7+ (may be, also 5 or 6 - not tested), 
// //
// // the text of the function for creating a .chm file should be:
// //
// // function find_text() {return ("-1");}
// //--------------------------------------------------------------------------------------------------------------------*
// //

// var txt, i, t, found;
// var str, sep, exprstr;

// //browser definitions
// var isDOM=document.getElementById;
// var win = parent.main;
// str=""; //search string

// if( parent.menu && parent.menu.document.searchform && parent.menu.document.searchform.searchtext ) 
// { 
//    	//shall work only in HTML
//    	str = parent.menu.document.searchform.searchtext.value; 

// 	//process help-based cookie history
// 	processHistoryCookies();
// }
// else
// {
//    //shall work only in CHM
//    return ("-1");
// }



// if (trim(str) == "")
//    return ("-1");

// sep = "|";

// exprstr = parseexpr(trim(str),sep);
// var word_array = exprstr.split(sep);
// var iword;
// var nextword;
// var nwords = word_array.length;



// if (isDOM)
//    {
//    element = document.body;
//    for(iword = 0;iword < word_array.length;iword++)    
//       {
//       str = word_array[iword];
//       //spanAllTextNodes (str, 'bf', element); //old solution
//       if (str.length > 1)
//          {
//          if (str.charAt(0) == "!" )
//             {
//             str = str.substring(1, str.length);
//             $('body').highlight(str, { element: 'span', className: 'bf', caseSensitive: true });
//             }
//          else
//             {
//             $('body').highlight(str, { element: 'span', className: 'bf' });
//             }
//          }
//       else
//          {
//          $('body').highlight(str, { element: 'span', className: 'bf' });
//          }
//       }
//    return ("0");
//    }
// }

function spanAllTextNodes (text_tofind, styleClass, element) {
//This is the old solution to highlight text; now, the js_highlight.js JQuery plugin is used 
//span the doc node tree and highlight matching text 
  if (!element)
    element = document.body;
  for (var c = 0; c < element.childNodes.length; c++)
    if (element.childNodes[c].nodeType == 3) {
      var span = document.createElement('SPAN');
      span.className = styleClass; // see the chm.css file, '.bf' definition
      var old_node = element.childNodes[c];
      var old_node_text = old_node.data;
      var o_t = old_node_text.toUpperCase();
      var s_t = text_tofind.toUpperCase();
      if (text_tofind.length > 1)
         {
         if (text_tofind.charAt(0) == "!" )
            {
            s_t = text_tofind.substring(1, text_tofind.length);
            o_t = old_node_text;
            }
         }
      var pos_text = o_t.indexOf(s_t, 0);
      var len_text = s_t.length;
      if (pos_text >= 0)
         {           
         old_node.data = old_node.data;//without adding the blank IE5+ fails       
         var split_node = old_node.splitText(pos_text);
         var tail_node = split_node.splitText(len_text);
         var new_node = tail_node.previousSibling;      
         var textNode = element.replaceChild(span, new_node);
         span.appendChild(textNode);
         c++;
         }
    }
    else
      spanAllTextNodes(text_tofind, styleClass, element.childNodes[c]); 
}


// function parseexpr(expr,sep) {
// //parse 'expr' and make a character-delimited string (the 'sep' is the delimiter)  
// var pos_expr=0;
// var len_expr;
// var cur_subexpr = "";
// var cur_char;
// var out_expr = "";

// len_expr = expr.length;

// while (pos_expr <= len_expr-1)
//    {
//    cur_char = expr.charAt(pos_expr);
//    expr_break = 0;
//    if ((cur_char == " ") || (cur_char == "+"))
//       {
//       if (cur_subexpr != "") 
//          {
//          out_expr = out_expr + cur_subexpr + sep;
//          }
//       cur_subexpr = ""; 
//      }
//    else
//      {
//      cur_subexpr = cur_subexpr + cur_char;
//      }
//    pos_expr++;
//    }
// if (cur_subexpr != "")
//    {
//    out_expr = out_expr + cur_subexpr;
//    }

// return(out_expr);
// }

// function trim(inputString) {
// // Remove spaces from the head and tail of the string
//    if (typeof inputString != "string") { return inputString; }
//    var retValue = inputString;
//    var ch = retValue.substring(0, 1);
//    while (ch == " ") {
//       retValue = retValue.substring(1, retValue.length);
//       ch = retValue.substring(0, 1);
//    }
//    ch = retValue.substring(retValue.length-1, retValue.length);
//    while (ch == " ") {
//       retValue = retValue.substring(0, retValue.length-1);
//       ch = retValue.substring(retValue.length-1, retValue.length);
//    }
//    while (retValue.indexOf("  ") != -1) {
//       retValue = retValue.substring(0, retValue.indexOf("  ")) + retValue.substring(retValue.indexOf("  ")+1, retValue.length);
//    }
//    return retValue;
// }


function HistoryCookieStorageSize()
{
var cs_name;
var cs_size_varname;
var cs_size;

cs_name = HistoryCookieStorageName();
cs_size_varname = cs_name + "_" + "storagesize";
cs_size=jsfget(cs_size_varname);

if (cs_size == "") cs_size = 0;
return(cs_size);
}

function HistoryCookieStorageName()
{
//returns the name to store cookies.
//the Online Help title (stored in the parent.document.title)
//is taken as the name. So, it must not contain blanks, spec chars, etc and must be be unique
var cookiestoragename;
cookiestoragename = parent.document.title + "_" + "history";
//cookiestoragename = replaceSubstring(cookiestoragename," ","_");
return (cookiestoragename);
}

function replaceSubstring(inputString, fromString, toString)
{
//replaces a substring with another one
var temp = inputString;
if (fromString == "")
   {
   return inputString;
   }
if (toString.indexOf(fromString) == -1)
   {
   while (temp.indexOf(fromString) != -1)
      {
      var toTheLeft = temp.substring(0, temp.indexOf(fromString));
      var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
      temp = toTheLeft + toString + toTheRight;
      }
   }
else
   {
   var midStrings = new Array("~", "`", "_", "^", "#");
   var midStringLen = 1;
   var midString = "";
   while (midString == "")
      {
      for (var i=0; i < midStrings.length; i++)
         {
         var tempMidString = "";
         for (var j=0; j < midStringLen; j++) 
            {
            tempMidString += midStrings[i];
            }
         if (fromString.indexOf(tempMidString) == -1)
            {
            midString = tempMidString;
            i = midStrings.length + 1;
            }
         }
      }
   while (temp.indexOf(fromString) != -1)
      {
      var toTheLeft = temp.substring(0, temp.indexOf(fromString));
      var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
      temp = toTheLeft + midString + toTheRight;
      }
   while (temp.indexOf(midString) != -1)
      {
      var toTheLeft = temp.substring(0, temp.indexOf(midString));
      var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
      temp = toTheLeft + toString + toTheRight;
      }
   }
return temp;
}

function processHistoryCookies()
   {
   var i_c = 0;
   var cs_name;
   var cs_size_varname;
   var cs_size;
   var cs_ptr;
   var cs_loadtype;
   var loadtype;
   var s_cookie_name;
   var s_cookie_value;
   var curtopic_href;
   var lasttopic_href;

   cs_name = HistoryCookieStorageName();
   cs_size = parseInt(HistoryCookieStorageSize());
   cs_ptr = cs_name + "_ptr"; 
   cs_loadtype = cs_name + "_loadtype";
   s_cookie_name = cs_loadtype;
   s_cookie_value = jsfget(s_cookie_name);
   //alert("stor hist loadtype: " + s_cookie_value);
   if (s_cookie_value == "history") 
      {}
   else
      {
      cs_size_varname = cs_name + "_" + "storagesize";
      curtopic_href = parent.main.document.location.href;
      if (cs_size == 0)
         {
         i_c = 1;
         }
      else
         { 
         i_c = cs_size + 1;
         }
      jsfset(cs_size_varname,i_c); 
      jsfset(cs_ptr,i_c);
      s_cookie_name = cs_name + "_" + String(i_c);
      s_cookie_value = curtopic_href;
      jsfset(s_cookie_name,s_cookie_value); 
      //alert("stor hist size is: " + i_c);
      //alert("stor hist ptr is: " + cs_ptr);
      //alert("stor hist topic is: " + s_cookie_value);
      }
   cs_loadtype = cs_name + "_loadtype";
   jsfset(cs_loadtype,"load");
   //alert("stor hist loadtype is: " + cs_loadtype);
   }



function ShowDTree()
{
//show_dtree = false : show Contents and Index as hyperlink lists
//show_dtree = true  : show Contents and Index as explorer-like tree structure (based on dtree.js)

var show_dtree = false;
if (document.getElementById) show_dtree = true;
//show_dtree = false;
return (show_dtree);
}

function golink(linkname)
{
var index_homepage_str_forw = "index_home.htm?forw";
var index_homepage_str_back = "index_home.htm?back";
var contents_homepage_str_forw = "home.htm?forw";
var contents_homepage_str_back = "home.htm?back";

var iques=0;
var link=linkname;
var iques = link.indexOf("?", 0);
var linkpage = linkname;

var inoprev = 0;
var inonext = 0;
var inoprev = link.indexOf("NO_PREV", 0);
var inonext = link.indexOf("NO_NEXT", 0);

//prevent to link to the out-of-scope page (GH4+)
//alert(linkname);alert(inoprev);alert(inonext);
if (inoprev != -1) 
   {
	//alert("no prev");
	return;
   }
if (inonext != -1)
   {
	//alert("no next");
	return;
   }

//prevent to link from the index page
if ((linkpage == index_homepage_str_forw) || (linkpage == index_homepage_str_back) || (linkpage == contents_homepage_str_forw) || (linkpage == contents_homepage_str_back))
   {
   return;
   }
if (iques >= 0) linkpage = link.substring(0, iques);

var show_dtree = false;

//show_dtree = false;
show_dtree = ShowDTree();

parent.menu.document.searchform.searchtext.value = "";

if (show_dtree)             
   {
	parent.main.location.href=linkname;
	if (linkpage == 'home.htm') {parent.contents.location.href="CHM_frame_toc.htm" + "?" +  linkpage;}
   }
else
   {
	parent.main.location.href=linkname;
        var lnkto="CHM_frame_toc_notree.htm" + "#toc_" + linkpage;
	parent.contents.location.href=lnkto;
   } 
return("0");
}

//conditional synchronize TOC in HTML output
function synctoc(topicto)
{
if (parent.menu && parent.menu.document.searchform && parent.menu.document.searchform.searchtext) 
   {
   if (parent.menu.document.searchform.searchtext.value != "")
      {
      }
   else
      {
      parent.contents.location.href="CHM_frame_toc.htm?%sync%" + topicto;
      }
   }
}

//unconditional synchronize TOC in HTML output
function synctoc_unc(topicto)
{
if (parent.menu && parent.menu.document.searchform && parent.menu.document.searchform.searchtext) 
   {
   var show_dtree = false;
   show_dtree = ShowDTree();
   if (topicto == "home.htm") 
      {
      parent.contents.location.href="CHM_frame_toc.htm";
      parent.main.location.href="home.htm";
      }
   else
      {
      if (show_dtree)             
         {
         parent.contents.location.href="CHM_frame_toc.htm?%sync%" + topicto;
         } 
      else
         {
         var lnkto="CHM_frame_toc_notree.htm" + "#toc_" + topicto;
         parent.contents.location.href=lnkto;
         } 
      }
   parent.menu.document.searchform.searchtext.value = "";
   }
}

//unconditional synchronize TOC by other page in HTML output (may be needeed in future)
function synctoc_page(topicto)
{
if (parent.menu && parent.menu.document.searchform && parent.menu.document.searchform.searchtext) 
   {
   golink(topicto); //HTML Output
   }
else
   {
   location.href=topicto; //CHM Output
   }
}

function setpagelinks(backlink, forwlink)
//inserts link addresses to links on the "menu" frame (CHM_frame_menu.htm) 
{

if( parent.menu && parent.menu.document.searchform && parent.menu.document.searchform.searchtext ) 
{
   //shall work only in HTML
}
else
{
   //shall work only in CHM
   return ("-1");
}


var iback=0;
var iforw=0;
var lnk="";
var lnku="";
for(i=0;i<=parent.menu.document.links.length;i++)
   {
   if (parent.menu.document.links[i])
      {

      lnk = parent.menu.document.links[i].href;

      lnku = lnk.toUpperCase();
      iback = lnku.indexOf("?BACK", 0);
      if (iback >= 0)
          {
          setlink(i, backlink);
          }
      iforw = lnku.indexOf("?FORW", 0);
      if (iforw >= 0)
          {
          setlink(i, forwlink);
          }
      }
   }
return false;
}


function setlink(linknum,linkvalue)
{
parent.menu.document.links[linknum].href="javascript:golink('" + linkvalue + "');";
return false;
}


function goback() {

var cs_name = HistoryCookieStorageName();
//alert(cs_name);
var cs_size = parseInt(HistoryCookieStorageSize());
var cs_ptr = cs_name + "_ptr"; 
var cs_loadtype;
var loadtype;
cs_loadtype = cs_name + "_loadtype";
jsfset(cs_loadtype,"history");
var linkname;
s_cookie_name = cs_ptr;
//alert(s_cookie_name);
s_cookie_value = parseInt(jsfget(s_cookie_name));
//alert(s_cookie_value);
i_c = s_cookie_value;
//alert(parent.menu.document.jsf.jsfstore.value);
if (i_c > 1)
   {
   i_c--; 
   jsfset(cs_ptr,i_c);
   s_cookie_name = cs_name + "_" + String(i_c);
   s_cookie_value = jsfget(s_cookie_name); 
   linkname = s_cookie_value;
   parent.menu.document.searchform.searchtext.value = "";
   golink(linkname); 
   }   
return;
}

function goforward() {

var cs_name = HistoryCookieStorageName();
var cs_size = parseInt(HistoryCookieStorageSize());
var cs_ptr = cs_name + "_ptr"; 
var cs_loadtype;
var loadtype;
cs_loadtype = cs_name + "_loadtype";
jsfset(cs_loadtype,"history");
var linkname;
s_cookie_name = cs_ptr;
s_cookie_value = parseInt(jsfget(s_cookie_name));
i_c = s_cookie_value;
if (i_c < cs_size)
   {
   i_c++; 
   jsfset(cs_ptr,i_c);
   s_cookie_name = cs_name + "_" + String(i_c);
   s_cookie_value = jsfget(s_cookie_name); 
   linkname = s_cookie_value;
   parent.menu.document.searchform.searchtext.value = "";
   golink(linkname); 
   }   
return;
}

function jsfset(variable, value)
   {
   //storing a variable value using a hidden input on a form as a storage
   if( parent.menu && parent.menu.document.jsf && parent.menu.document.jsf.jsfstore ) 
      {
      var store = parent.menu.document.jsf.jsfstore.value;
      var sepvar = "^^";
      var sepval = "^";
      var temp = store; 
      var ivar = temp.indexOf(sepvar + variable + sepval);
      var ivarstart = 0;
      var ivalstart = 0;
      var ivarend = 0;
      var ivalend = 0;
      var temphead = "";
      var temptail = "";
      if (ivar >= 0)
         {
         ivarstart = ivar;
         temp = temp.substring(ivar + sepvar.length, temp.length);      
         ivarend = ivarstart + sepvar.length + temp.indexOf(sepvar) + sepvar.length; 
         }
      if (ivar > 0)
         {
         temphead = store.substring(0,ivarstart);
         }
      if (ivarend <= store.length)
         {
         temptail = store.substring(ivarend, store.length); 
         }
      store = temphead + temptail; 
      value = value + ""; //to conver inpit value to string
      if (value.length > 0) 
         {
         store = store + sepvar + variable + sepval + value + sepvar;
         }
      parent.menu.document.jsf.jsfstore.value = store;
      }
   }

function jsfget(variable, value)
   {
   //getting a variable value using a hidden input on a form as a storage
   if( parent.menu && parent.menu.document.jsf && parent.menu.document.jsf.jsfstore ) 
      {
     var store = parent.menu.document.jsf.jsfstore.value;
      var sepvar = "^^";
      var sepval = "^";
      var temp = store;
      var v = "";
      var ivar = temp.indexOf(sepvar + variable + sepval);
      if (ivar >= 0)
         {
         temp = temp.substring(ivar + sepvar.length, temp.length);
         var v_array=temp.split(sepval);
         v = v_array[1];               
         }
      return(v);
      }
   }

function HistoryCookieStorageSize()
{
var cs_name;
var cs_size_varname;
var cs_size;
cs_size = 0;
cs_name = HistoryCookieStorageName();
cs_size_varname = cs_name + "_" + "storagesize";
//alert(cs_size_varname);
cs_size=jsfget(cs_size_varname);
//alert("cookie size is: <" + cs_size + ">");

if ((cs_size == null) || (cs_size == "NAN") || (cs_size == "")) 
	{
	cs_size = 0;
	jsfset(cs_size_varname,cs_size);
	cs_size=jsfget(cs_size_varname);
	//alert("established cookie size is: <" + cs_size + ">");
}

return(cs_size);
}

function HistoryCookieStorageName()
{
//returns the name to store cookies.
//the Online Help title (stored in the parent.document.title)
//is taken as the name. So, it must not contain blanks, spec chars, etc and must be be unique
var cookiestoragename;
cookiestoragename = parent.document.title + "_" + "history";
cookiestoragename = replaceSubstring(cookiestoragename," ","_");
return (cookiestoragename);
}

function replaceSubstring(inputString, fromString, toString)
{
//replaces a substring with another one
var temp = inputString;
if (fromString == "")
   {
   return inputString;
   }
if (toString.indexOf(fromString) == -1)
   {
   while (temp.indexOf(fromString) != -1)
      {
      var toTheLeft = temp.substring(0, temp.indexOf(fromString));
      var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
      temp = toTheLeft + toString + toTheRight;
      }
   }
else
   {
   var midStrings = new Array("~", "`", "_", "^", "#");
   var midStringLen = 1;
   var midString = "";
   while (midString == "")
      {
      for (var i=0; i < midStrings.length; i++)
         {
         var tempMidString = "";
         for (var j=0; j < midStringLen; j++) 
            {
            tempMidString += midStrings[i];
            }
         if (fromString.indexOf(tempMidString) == -1)
            {
            midString = tempMidString;
            i = midStrings.length + 1;
            }
         }
      }
   while (temp.indexOf(fromString) != -1)
      {
      var toTheLeft = temp.substring(0, temp.indexOf(fromString));
      var toTheRight = temp.substring(temp.indexOf(fromString)+fromString.length, temp.length);
      temp = toTheLeft + midString + toTheRight;
      }
   while (temp.indexOf(midString) != -1)
      {
      var toTheLeft = temp.substring(0, temp.indexOf(midString));
      var toTheRight = temp.substring(temp.indexOf(midString)+midString.length, temp.length);
      temp = toTheLeft + toString + toTheRight;
      }
   }
return temp;
}