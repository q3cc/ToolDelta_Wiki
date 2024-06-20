const aud = new Audio("sfx_src/sfx_intro.wav")
function play_sfx_intro() {
    alert("testing")
    aud.play()
    aud.loop = false
}

play_sfx_intro()