var myigs = require('./igs.js');
var myprofiles = require('./profiles.js');

var express = require('express');
var app = express();

app.listen(3000, function () {
    console.log("Working");
});

mypage = '<!DOCTYPE HTML> \
<html> \
  <head> \
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /> \
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> \
    <title>IGS</title> \
    <style> \
	  body { \
		margin:0; \
		font-family: "Lato", sans-serif; \
	  }\
	  .stories-bar{\
		display:none;\
	  }\
	  .post { \
	  width: 300px	;\
	  }\
	  .sidenav { \
		height: 100%;\
		width: 160px;\
		position: fixed;\
		z-index: 1;\
		top: 0;\
		left: 0;\
		background-color: #111;\
		overflow-x: hidden;\
		padding-top: 20px;\
	  }\
	  .sidenav img {\
		padding: 6px 8px 6px 16px;\
		display: block;\
        transition: all 0.3s ease;\
        color: white;\
		font-size: 36px;\
		border-radius: 50%;\
	  }\
	  .sidenav img:hover {\
		color: #f1f1f1;\
	  }\
	  .main {\
		margin-left: 160px; /* Same as the width of the sidenav */\
		font-size: 28px; /* Increased text to enable scrolling */\
		padding: 0px 10px;\
	  }\
	  @media screen and (max-height: 450px) {\
		.sidenav {padding-top: 15px;}\
		.sidenav a {font-size: 18px;}\
	  }\
	</style>\
	<script>\
	function myshow(profile) {\
		x=document.getElementsByClassName("stories-bar");\
		for(i=0;i<x.length;i++){\
			x[i].style.display="none";\
		}\
		var idx = profile.id;\
		var elementshow=document.getElementById("div"+idx);\
		elementshow.style.display="block";\
	  }\
	</script>\
  </head> \
  <body>';

mypage2= ' \
  </body> \
</html>';

app.get('/', function (req, res) {
	var myhtmlpage = "";
	var profilehtml = '<div class="sidenav">';
	var storieshtml = '<div class="main">';
	var profiles=myprofiles.getProfiles();
  	if (myprofiles.length == 0){
    	myhtmlpage=mypage+"<span>Aggiungi nel file igprofiles.txt nuovi utenti da seguire</span>"+mypage2;
    	res.send(myhtmlpage);
    	return;
  	}
  
  	//GET ALL 
  	responses = [];
  	for(i = 0 ; i< profiles.length ; i++){
    	responses[responses.length]=myigs.getDescriptor(profiles[i]);
  	}
  	//console.log(responses);

	//Take profile pics and name
	for(i = 0 ; i< profiles.length ; i++){
       profilehtml+='<img onclick="myshow(this)" id="'+i+'"src="'+ myigs.getProfileImagefd(responses[i]) +'"><span>'+profiles[i]+'</span>';
	   }
	profilehtml+="</div>";

   	//Take Stories img and video 
   	for(k=0;k<profiles.length; k++){
		console.log(profiles[k]);
     	var stories = myigs.getStoriesfd(responses[k]);
		   
		if (stories.length > 0 ){
	 		storieshtml+= '<div id="div'+k+'"class="stories-bar" >';
			   
			 for(j=0; j< stories.length; j++){
				if(stories[j].mediatype == 1){
             		storieshtml+='<img class="post" src="'+stories[j].img+'">';
				}else{
            		storieshtml+='<video class="post" controls> \
                          			<source src="'+stories[j].video.url+'" type="video/mp4"></video>';
          		}
        	}
        storieshtml+="</div>";
		}
		
	   }
	   storieshtml+="</div>";


  	myhtmlpage=mypage+profilehtml+storieshtml+mypage2;
    res.send(myhtmlpage);
});
