// // // // // // // // // // // // // // // // // // // // //
// this tool was developed by thirtysix						//
// discord contact: ThirtySix#7608							//
// all rights reserved to the owner of the code				//
// // // // // // // // // // // // // // // // // // // // //

var animationdelay = 300;
var loopdelay = 1000;

var name_query = "#main span[title]";
var status_query = "#main span[title~='online']";

// var name_query = document.querySelector("#main span[title]");
// var status_query = document.querySelector("#main span[title~='online']");

// -------- styleshit --------
var sheet = window.document.styleSheets[0];
sheet.insertRule('#bar { z-index: 999; font-weight: bold; box-shadow: rgb(0, 0, 0) 0px 0px 2px 0px; background-color: rgb(0, 150, 136); color: #dbdbd3; font-size: 12px; line-height: 16px; }', sheet.cssRules.length);
sheet.insertRule('#content { z-index: 999; overflow: auto; position: absolute; top: 315px; right: 10px; width: 240px; max-height: 60%; font-weight: bold; color: rgb(0, 150, 136); font-size: 12px; line-height: 12px; }', sheet.cssRules.length);
sheet.insertRule('#content_inner { margin: 10px 0px; padding: 10px; border-radius: 5px; box-shadow: rgb(0, 0, 0) 0px 0px 2px 0px; background-color: rgb(0, 150, 136); color: rgb(219, 219, 211); }', sheet.cssRules.length);
sheet.insertRule('.btns { display: inline-block; margin: 0px 10px; padding: 5px; width: 40%; border: 1px solid #dbdbd3; border-radius: 5px; box-sizing: border-box; text-align: center; background-color: #dbdbd3; color: rgb(0, 150, 136);  }', sheet.cssRules.length);
sheet.insertRule('.btns:hover { cursor: pointer; color: #dbdbd3; background-color: rgb(0, 150, 136); }', sheet.cssRules.length);
sheet.insertRule('hr { text-align: center; margin-top: 15px; border: 0px; height: 2px; background-image: linear-gradient(to right, rgba(0, 0, 0, 0), #dbdbd3, rgba(0, 0, 0, 0)); }', sheet.cssRules.length);
sheet.insertRule('hr:after { display: inline-block; position: relative; top: -7px; font-size: 10px; padding: 0 5px; color: #dbdbd3; background-color: rgb(0, 150, 136); }', sheet.cssRules.length);
// -------- -------- -------- --------

// -------- wait for whatsapp --------
var interval = setInterval(check, loopdelay); 
function check() {
	if ( document.querySelector(status_query)?.innerText ) { // check if a state can be found
		clearInterval(interval); // end this loop
		main(); // call the main function
	} else {
		console.error("whatslog: cant find whatsapp chat."); // spam log until a chat is found
	}
}
// -------- -------- -------- --------

// -------- main --------
function main() {
	
	// -------- create control bar & eventhandler --------
	var btndiv = document.createElement('div'); // create div for actionbar
		document.body.appendChild(btndiv); // add div to end of body
		btndiv.id = 'bar'; // give it the id
		btndiv.setAttribute('style', ' overflow: auto; position: absolute; top: 140px; right: 10px; width: 240px; border-radius: 5px;'); // add some lame css
		btndiv.innerHTML = "<div style='display: block; padding-top: 10px; text-align: center; font-size: 20px;'> <a href='https://whatsonapp.de?r=whatslog' target='_blank' style='color: orange;'> Try the new <br> WhatsOnApp </a> </div>"; // update content for div
		btndiv.innerHTML += "<div style='display: block; padding-top: 10px; text-align: center; font-size: 20px;'> WhatsLog </div>"; // update content for div
		btndiv.innerHTML += "<div style='display: block; padding-bottom: 10px; text-align: center; font-size: 10px;'> by ThirtySix </div>"; // update content for div
		btndiv.innerHTML += "<div style='margin: 0 auto; width: 100%; text-align: center;'> <div class='btns' id='btnClear'>clear</div><div class='btns' id='btnCopy'>copy</div> </div>" // update content for div
		btndiv.innerHTML += "<div style='margin: 0 auto; width: 100%; text-align: center;'> <div class='btns' id='btnFocus' style='margin: 10px auto; width: 90%;'>no focus set</div></div>"; // update content for div
		
	document.getElementById("btnClear").addEventListener("click", function(){ // add eventhandler
		div.innerHTML = ""; // clear the content
		document.getElementById("btnClear").innerHTML = "cleared"; // little fancy feedback
		setTimeout ( function(){ document.getElementById("btnClear").innerHTML = "clear" } , animationdelay ); // little fancy feedback
	});
	
	document.getElementById("btnCopy").addEventListener("click", function(){ // add eventhandler
		document.getElementById("btnCopy").innerHTML = "copied"; // little fancy feedback
		setTimeout ( function(){ document.getElementById("btnCopy").innerHTML = "copy" } , animationdelay ); // little fancy feedback
		setClipboardText(document.getElementById("content")["innerText"]);
	});
	
	document.getElementById("btnFocus").addEventListener("click", function(){ // add eventhandler
		if ( document.getElementById("btnFocus")["innerText"] != document.querySelector(name_query)?.innerText ) {
			document.getElementById("btnFocus").innerHTML = document.querySelector(name_query)?.innerText; // little fancy feedback
			name = "";
			status = "";
		} else { 
			document.getElementById("btnFocus").innerHTML = "no focus set"; // little fancy feedback
		}
	});
	// -------- -------- -------- --------
	
	// -------- create content div --------
	var name = getname(); // get name
	var status = getstatus(); // get state
	var div = document.createElement('div'); // create the div for content
		document.body.appendChild(div); // add div to end of body
		div.id = 'content'; // give it the id
	// -------- -------- -------- --------

	// -------- content loop --------
	setInterval(loop, loopdelay); 
	function loop() {
		if ( document.getElementById("btnFocus")["innerText"] == getname() || document.getElementById("btnFocus")["innerText"] == "no focus set" ) { var justgo = true; } else { var justgo = false; } // ask for focus
		if ( justgo ) { document.getElementById("bar").style.backgroundColor = "rgb(0, 150, 136)"; } else { document.getElementById("bar").style.backgroundColor = "rgb(100, 100, 100)"; }
		if ( justgo && status != getstatus() ) { // check if state change and fire if yes
			name = getname(); // set name
			status = getstatus(); // set state
			var hrid = stamp();
			sheet.insertRule('#hrid_' + hrid + ':after { content: "' + currentdate() + ' - ' + currenttime() + ':' + currentsec() + '"; }', sheet.cssRules.length); // add unique id to hr for date
			div.innerHTML += "<div id='content_inner'><div style='float: left;'>" + name + "</div><div style='float: right;'><span style='font-size: 0px;'>" + currentdate() + " - </span>" + currenttime() + "<span style='font-size: 0px;'>:" + currentsec() + "</span></div><div style='clear: both;'></div><div>" + status + "</div><p><hr id='hrid_" + hrid + "'></p> </div>"; // update content for div
			document.getElementById("content").scrollTop = document.getElementById("content").scrollHeight; // scroll div to bottom
			Object.defineProperty(document, "hidden", {value:false} ); // try to prevent losing connection
		}
		//console.log("whatslog: checking whatsapp chat for changes.."); // spam the log
	}
	// -------- -------- -------- --------
	
	// -------- some functions --------
	function getname() {
		try {
			if ( document.querySelector(name_query)?.innerText ) {
				var name = document.querySelector(name_query)?.innerText;	
			} else {
				var name = "unknown";
			}
			var name = document.querySelector(name_query)?.innerText;
		} catch (err) {
			var name = "unknown";
		}
		return name;
	}
	function getstatus() {
		try {
			if ( document.querySelector(status_query)?.innerText ) {
				var status = document.querySelector(status_query)?.innerText;	
			} else {
				var status = "status hidden";
			}
		} catch (err) {
			var status = "status hidden";
		}
		return status;
	}
	function stamp() {
		var now = new Date();
		return now.getTime();
	}
	function currentdate() {
		var now = new Date();
		if ( now.getDate() < 10 ) { var day = "0"+now.getDate(); } else { var day = now.getDate(); };
		var month = now.getMonth() + 1;
		if ( month < 10 ) { month = "0"+month; };
		var year = now.getFullYear();
		var time = day + "." + month + "." + year;
		return time;
	}
	function currenttime() {
		var now = new Date();
		if ( now.getHours() < 10 ) { var h = "0"+now.getHours(); } else { var h = now.getHours(); };
		if ( now.getMinutes() < 10 ) { var m = "0"+now.getMinutes(); } else { var m = now.getMinutes(); };
		var time = h + ":" + m;
		return time;
	}
	function currentsec() {
		var now = new Date();
		if ( now.getSeconds() < 10 ) { var s = "0"+now.getSeconds(); } else { var s = now.getSeconds(); };
		var time = s;
		return time;
	}
	// -------- -------- -------- --------
	
	// -------- clipboard function --------
	// useful copypasta from the outtaworld
	function setClipboardText(text){
		var id = "mycustom-clipboard-textarea-hidden-id";
		var existsTextarea = document.getElementById(id);

		if(!existsTextarea){
			console.log("Creating textarea");
			var textarea = document.createElement("textarea");
			textarea.id = id;
			// Place in top-left corner of screen regardless of scroll position.
			textarea.style.position = 'fixed';
			textarea.style.top = 0;
			textarea.style.left = 0;

			// Ensure it has a small width and height. Setting to 1px / 1em
			// doesn't work as this gives a negative w/h on some browsers.
			textarea.style.width = '1px';
			textarea.style.height = '1px';

			// We don't need padding, reducing the size if it does flash render.
			textarea.style.padding = 0;

			// Clean up any borders.
			textarea.style.border = 'none';
			textarea.style.outline = 'none';
			textarea.style.boxShadow = 'none';

			// Avoid flash of white box if rendered for any reason.
			textarea.style.background = 'transparent';
			document.querySelector("body").appendChild(textarea);
			console.log("The textarea now exists :)");
			existsTextarea = document.getElementById(id);
		} else {
			console.log("The textarea already exists :3")
		}

		existsTextarea.value = text;
		existsTextarea.select();

		try {
			var status = document.execCommand('copy');
			if(!status){
				console.error("Cannot copy text");
			}else{
				//alert("The text is now on the clipboard");
			}
		} catch (err) {
			console.log('Unable to copy.');
		}
	}
	// -------- -------- -------- --------
	
}