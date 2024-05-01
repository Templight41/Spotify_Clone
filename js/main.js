var audio;

//Hide Pause Initially
$('#pause').hide();

let songIndex = 0;
	

const songList = [
    {
        songname: "Yellow Paper Daisy",
        song: "When Chai Met Toast - Yellow Paper Daisy.mp3",
        artist: "When Chai Met Toast",
        cover: "https://i.scdn.co/image/ab67616d00001e02fc3b86df0eb110c1f0eec971",
        songurl: "https://open.spotify.com/album/13ATYLc7i4HuNbQrAEawOH",
        artisturl: "https://open.spotify.com/artist/7nZJz6f1b5gJ3jJY0b9xvN"
    },
    {
        songname: "Car's Outside",
        song: "James Arthur - Car-'s Outside.mp3",
        artist: "James Arthur",
        cover: "https://i.scdn.co/image/ab67616d00001e02dc16d839ab77c64bdbeb3660",
        songurl: "https://open.spotify.com/album/0cm9LOQUBK3JUgyoRj238z",
        artisturl: "https://open.spotify.com/artist/4IWBUUAFIplrNtaOHcJPRM"
    },
    {
        songname: "Daylight",
        song: "David Kushner - Daylight.mp3",
        artist: "David Kushner",
        cover: "https://i.scdn.co/image/ab67616d00001e0295ca6a9b4083a86c149934ae",
        songurl: "https://open.spotify.com/album/6NcI39WPu4kY6Tul11nhSv",
        artisturl: "https://open.spotify.com/artist/33NVpKoXjItPwUJTMZIOiY"
    },
    {
        songname: "to my future wife",
        song: "normal the kid - to my future wife..mp3",
        artist: "normal the kid",
        cover: "https://i.scdn.co/image/ab67616d00001e023636aa34bdf3a18bb69af514",
        songurl: "https://open.spotify.com/album/7AOX1UCmyhgyNmBu9NmB4f",
        artisturl: "https://open.spotify.com/artist/3qPVBAEhS0Rc09oB4O065V"
    }
]

//Initializer - Play First Song
initAudio(songIndex);
	
function initAudio(songIndex){

	let songObj = songList[songIndex];

	let {songname, song, artist, cover, songurl, artisturl} = songObj;

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
	
	// $('#playlist li').removeClass('active');
    // element.addClass('active');
}


//Playlist Song Click
$('#playlist li').click(function () {
    audio.pause();
    initAudio(this.getAttribute('songIndex'));
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
	console.log(songIndex)
	if(songIndex == songList.length - 1) {songIndex = 0};
	songIndex++;
    audio.pause();
    initAudio(songIndex);
	audio.play();
	showDuration();
});

//Prev Button
$('#prev').click(function(){
	console.log(songIndex)
	if(songIndex == 0) songIndex = 3;
    audio.pause();
    initAudio(songIndex);
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