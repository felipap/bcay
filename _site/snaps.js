var player; 
function onYouTubePlayerAPIReady() {
  var width = 360, // 768/2,
      height = 1280/2;

  player = new YT.Player('player', {
    playerVars: {
      autoplay: 1,
      controls: 0,
      modestbranding: 1,
      autohide: 1,
      wmode: 'opaque',
      showinfo: 0,
      loop: true,
      mute: 1,
      shufflePlaylist: true,
    },

    width: width,
    height: height,

    events: {
      onReady: onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  // event.target.mute();
  $('#text').fadeIn(400);
  //why this? Well, if you want to overlay text on top of your video, you
  //will have to fade it in once your video has loaded in order for this
  //to work in Safari, or your will get an origin error.
  player.loadPlaylist({
    list: "PLUkHwM5w3oZOHLhsaO3AoM7Y4lh-05GV3",
    listType: "playlist",
  });
  player.mute();
  
  var firstClick = true;
  $(".SnapPlayer .overlay").click(function () {
    if (firstClick) {
      player.unMute();
    }
    firstClick = false;
    togglePlay();
  });
}

function togglePlay() {
  var state = player.getPlayerState();
  
  if (state == 1) {
    player.pauseVideo();
  } else if (state == 2) {
    player.playVideo();
  }
}

document.onkeydown = function (e) {
  e = e || window.event;
  
  if (!player) {
    return;
  }

  if (e.keyCode == '39') { // right
    player.nextVideo();
  } else if (e.keyCode == '37') { // left
    player.previousVideo();
  } else if (e.keyCode == '38') { // up
    player.setVolume(Math.min(100, player.getVolume()+20));
  } else if (e.keyCode == '40') { // down
    player.setVolume(Math.max(0, player.getVolume()-20));
  } else if (e.keyCode == '32') { // space
    togglePlay();
  } else if (e.keyCode == 77) { // m
    if (player.isMuted()) {
      player.unMute();
    } else {
      player.mute();
    }
  } else {
    return true;
  }

  e.preventDefault();
  return false;
};

//this pauses the video when it's out of view, just wrap your video in .m-//video
$(window).scroll(function() {
  var hT = $('.m-video').height(),
      wS = $(this).scrollTop();
  
  if (player == undefined || player.pauseVideo == undefined) {
    return;
  }

  if (wS > hT) {
    player.pauseVideo();
  } else {
    player.playVideo();
  }
});

$(function() {
  var mt = 610; // $(".SnapPlayer").outerHeight()/2;
  // $("section.main").css({ marginTop: (Math.max(0,$(window).height()-mt)/2) });
});
