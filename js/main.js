window.onload = function()
{
	
	document.getElementById("headerButtonFrontpageDiv").onclick = function() {loadFrontpage()};
	
	document.getElementById("headerButtonOfferDiv").onclick = function() {loadOffer()};
	
	document.getElementById("headerButtonRegisterAndAccountDiv").onclick = function() {loadRegisterAccount()};
	
	document.getElementById("headerButtonFaqDiv").onclick = function() {loadFaq()};
	
	document.getElementById("headerButtonLoginLogoutDiv").onclick = function() {loadLoginLogout()};

	function loadFrontpage() 
	{
		document.getElementById("iframeDiv").src='html/frontpage.html';
	}
	
	function loadOffer() 
	{
		document.getElementById("iframeDiv").src='html/offer.html';
	}
	
	function loadRegisterAccount() 
	{
		document.getElementById("iframeDiv").src='html/register.html';
	}
	
	function loadFaq() 
	{
		document.getElementById("iframeDiv").src='html/faq.html';
	}
	
	function loadLoginLogout() 
	{
		document.getElementById("iframeDiv").src='html/login.html';
	}
};