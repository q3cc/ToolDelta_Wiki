function play_sfx_intro() {
    try {
        const aud = new Audio("./sfx_src/sfx_intro.mp3")
        aud.play()
        aud.loop = false
        alert("ok")
    } catch (e) {
        alert(e)
    }
}

play_sfx_intro()