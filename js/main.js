let audio;

let audioElement = document.querySelector("audio");

document.querySelector("#pause").style.display = "none";

//Hide Pause Initially
// $('#pause').hide();
	
//Initializer - Play First Song
// initAudio($('#playlist li:first-child'));

let songList = [
	{
		title: "Yellow Paper Daisy",
		artCover: "",
		songURL: "/media/yellow-paper-daisy.mp3",
		artist: "",
		songSpoti: "",
		artistSpoti: "",
	},
	{
		title: "Car's Outside",
		artCover: "",
		songURL: "/media/car's-outside.mp3",
		artist: "",
		songSpoti: "",
		artistSpoti: "",
	},
	{
		title: "Daylight",
		artCover: "",
		songURL: "/media/daylight.mp3",
		artist: "",
		songSpoti: "",
		artistSpoti: "",
	},
	{
		title: "to my future wife",
		artCover: "",
		songURL: "/media/to-my-future-wife.mp3",
		artist: "",
		songSpoti: "",
		artistSpoti: "",
	}
]

let curSongIndex = 0;
let curSong = songList[curSongIndex];

function updateSong() {
	document.querySelector("#cover").setAttribute("src", curSong.artCover);
	document.querySelector("#song-name a").innerText = curSong.title;


}

function initSong() {
	audioElement.setAttribute("src", curSong.songURL);
	updateSong();

}
initSong();

function playSong(e) {
	document.querySelector("#pause").style.display = "block";
	document.querySelector("#play").style.display = "none";
	audioElement.play();
}

function pauseSong(e) {
	document.querySelector("#play").style.display = "block";
	document.querySelector("#pause").style.display = "none";
	audioElement.pause()
}
	
// function initAudio(element){
// 	let song = element.attr('song');
//     let title = element.text();
//     let cover = element.attr('cover');
//     let artist = element.attr('artist');
//     let songname = element.attr('songname');
//     let songurl = element.attr('songurl');
//     let artisturl = element.attr('artisturl');

// 	//Create a New Audio Object
// 	audio = new Audio('/media/' + song);
	
// 	if(!audio.currentTime){
// 		$('#duration').html('0:00');
// 	}

//     if(!audio.duration){
// 		$('#time-left').html('0:00');
// 	}

//     //Update song name
//     $('#song-name-url').text(songname);
//     $('#song-artist-url').text(artist);

//     //Update song/artist URL
// 	document.getElementById('song-name-url').href = songurl;
//     document.getElementById('song-artist-url').href = artisturl;

// 	//Insert Cover Image
// 	document.getElementById('cover').src = cover;
	
// 	$('#playlist li').removeClass('active');
//     element.addClass('active');
// }


// //Playlist Song Click
// $('#playlist li').click(function () {
//     audio.pause();
//     initAudio($(this));
// 	$('#play').hide();
// 	$('#pause').show();
// 	$('#duration').fadeIn(400);
// 	audio.play();
// 	showDuration();
// });

// //Play Button
// $('#play').click(function(){
// 	audio.play();
// 	$('#play').hide();
// 	$('#pause').show();
// 	$('#duration').fadeIn(400);
// 	showDuration();
// });

// //Pause Button
// $('#pause').click(function(){
// 	audio.pause();
// 	$('#pause').hide();
// 	$('#play').show();
// });
	
// //Stop Button
// $('#stop').click(function(){
// 	audio.pause();		
// 	audio.currentTime = 0;
// 	$('#pause').hide();
// 	$('#play').show();
// 	$('#duration').fadeOut(400);
// });

// //Next Button
// $('#next').click(function(){
//     audio.pause();
//     let next = $('#playlist li.active').next();
//     if (next.length == 0) {
//         next = $('#playlist li:first-child');
//     }
//     initAudio(next);
// 	audio.play();
// 	showDuration();
// });

// //Prev Button
// $('#prev').click(function(){
//     audio.pause();
//     let prev = $('#playlist li.active').prev();
//     if (prev.length == 0) {
//         prev = $('#playlist li:last-child');
//     }
//     initAudio(prev);
// 	audio.play();
// 	showDuration();
// });

// //Volume Control
// $('#volume-bar').change(function(){
// 	audio.volume = parseFloat(this.value / 10);

//     //Setting volume button according to volume-bar
//     let vol = parseInt(this.value);
//     if (vol <= 4) {
//         $('#volume-up').hide()
//         $('#volume-down').show()
//         $('#volume-mute').hide()

//     }   else {
//         $('#volume-up').show()
//         $('#volume-down').hide()
//         $('#volume-mute').hide()
//     }
    
// });
	
//Time Duration
function showDuration(){
	$(audio).bind('timeupdate', function(){
		//Get hours and minutes
		let s = parseInt(audio.currentTime % 60);
		let m = parseInt((audio.currentTime / 60) % 60);
        let ss = parseInt((audio.duration - audio.currentTime) % 60)
        let mm = parseInt(((audio.duration - audio.currentTime)/60) % 60);
		//Add 0 if seconds less than 10
		if (s < 10) {
			s = '0' + s;
		}
        if (ss < 10) {
			ss = '0' + ss;
		}
		$('#duration').html(m + ':' + s);	
        $('#time-left').html(mm + ':' + ss)
		let value = 0;
		if (audio.currentTime > 0) {
			value = Math.floor((100 / audio.duration) * audio.currentTime);
		}
		$('#progress-bar2').css('width',value+'%');
        value = Math.floor((100));
	});
}