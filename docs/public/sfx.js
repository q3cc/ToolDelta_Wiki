function play_sfx_intro() {
    try {
        const aud = new Audio("https://tdload.tblstudio.cn/raw.githubusercontent.com/ToolDelta/Wiki/main/sfx_src/sfx_intro.wav")
        aud.play()
        aud.loop = false
        alert("ok: test 6")
    } catch (e) {
        alert(e)
    }
}

play_sfx_intro()