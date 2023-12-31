var audio;

//Hide Pause Initially
$('#pause').hide();
	
//Initializer - Play First Song
initAudio($('#playlist li:first-child'));
	
function initAudio(element){
	var song = element.attr('song');
    var title = element.text();
    var cover = element.attr('cover');
    var artist = element.attr('artist');
    var songname = element.attr('songname');
    var songurl = element.attr('songurl');
    var artisturl = element.attr('artisturl');

	//Create a New Audio Object
	audio = new Audio('/media/' + song);
	
	if(!audio.currentTime){
		$('#duration').html('0:00');
	}

    if(!audio.duration){
		$('#time-left').html('0:00');
	}

    //Update song name
    $('#song-name-url').text(songname);
    $('#song-artist-url').text(artist);

    //Update song/artist URL
	document.getElementById('song-name-url').href = songurl;
    document.getElementById('song-artist-url').href = artisturl;

	//Insert Cover Image
	document.getElementById('cover').src = cover;
	
	$('#playlist li').removeClass('active');
    element.addClass('active');
}


//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio($(this));
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	audio.play();
	showDuration();
});

//Play Button
$('#play').click(function(){
	audio.play();
	$('#play').hide();
	$('#pause').show();
	$('#duration').fadeIn(400);
	showDuration();
});

//Pause Button
$('#pause').click(function(){
	audio.pause();
	$('#pause').hide();
	$('#play').show();
});
	
//Stop Button
$('#stop').click(function(){
	audio.pause();		
	audio.currentTime = 0;
	$('#pause').hide();
	$('#play').show();
	$('#duration').fadeOut(400);
});

//Next Button
$('#next').click(function(){
    audio.pause();
    var next = $('#playlist li.active').next();
    if (next.length == 0) {
        next = $('#playlist li:first-child');
    }
    initAudio(next);
	audio.play();
	showDuration();
});

//Prev Button
$('#prev').click(function(){
    audio.pause();
    var prev = $('#playlist li.active').prev();
    if (prev.length == 0) {
        prev = $('#playlist li:last-child');
    }
    initAudio(prev);
	audio.play();
	showDuration();
});

//Volume Control
$('#volume-bar').change(function(){
	audio.volume = parseFloat(this.value / 10);

    //Setting volume button according to volume-bar
    var vol = parseInt(this.value);
    if (vol <= 4) {
        $('#volume-up').hide()
        $('#volume-down').show()
        $('#volume-mute').hide()

    }   else {
        $('#volume-up').show()
        $('#volume-down').hide()
        $('#volume-mute').hide()
    }
    
});
	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		var s = parseInt(audio.currentTime % 60);
		var m = parseInt((audio.currentTime / 60) % 60);
        var ss = parseInt((audio.duration - audio.currentTime) % 60)
        var mm = parseInt(((audio.duration - audio.currentTime)/60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
        if (ss < 10) {
			ss = '0' + ss;
		}
		$('#duration').html(m + ':' + s);	
        $('#time-left').html(mm + ':' + ss)
		var value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress-bar2').css('width',value+'%');
        value = Math.floor((100));
	});
}