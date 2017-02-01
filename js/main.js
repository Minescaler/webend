window.onload = function()
{
	function loadMenu(link) {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		 document.getElementById("contentDiv").innerHTML = this.responseText;
		 loadBills(); // DO it allways. Because YOLO.
		}
	  };
	  xhttp.open("GET", link, true);
	  xhttp.send();
	} 
	
	function loadBills() {
	  var xhttp = new XMLHttpRequest();
	  xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		 document.getElementById("bills").innerHTML = this.responseText;
		}
	  };
	  xhttp.open("GET", "getBills", true);
	  xhttp.send();
	} 
	
	document.getElementById("headerButtonFrontpageDiv").onclick = function() {loadFrontpage()};
	
	document.getElementById("headerButtonOfferDiv").onclick = function() {loadOffer()};
	
	document.getElementById("headerButtonRegisterAndAccountDiv").onclick = function() {loadRegisterAccount()};
	
	document.getElementById("headerButtonFaqDiv").onclick = function() {loadFaq()};
	
	document.getElementById("headerButtonLoginLogoutDiv").onclick = function() {loadLoginLogout()};

	function loadFrontpage() 
	{
		loadMenu('views/frontpage.html');
	}
	
	function loadOffer() 
	{
		loadMenu('views/offer.html');
	}
	
	function loadRegisterAccount() 
	{
		loadMenu('registerOrAccount');//'views/register.html';//register
	}
	
	function loadFaq() 
	{
		loadMenu('views/faq.html');
	}
	
	function loadLoginLogout() 
	{
		loadMenu('views/login.html');
	}
};