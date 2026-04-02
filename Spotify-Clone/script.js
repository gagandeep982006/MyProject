// writing a function to read the song name from the music folder
async function song_reader(song_names, song_url) {
    let x = await fetch("/music/");
    let y = await x.text();
    let doc = document.createElement("div");
    doc.innerHTML = y;
    let as = doc.getElementsByTagName("a");
    let len = as.length;

    for (let i = 0; i < len; i++) {
        if (as[i].href.endsWith(".mp3")) {
            song_names.push(as[i].innerText);
            song_url.push(as[i].href);
        }
    }
}

// writing the code to get the all poster image fromt the poster is here
async function get_poster(poster_arr) {
    let poster = await fetch("/images/");
    let _poster = await poster.text();
    let element = document.createElement("div");
    element.innerHTML = _poster;
    let as = element.getElementsByTagName("a");
    let len = as.length;

    for(let i = 0; i< len;i++){
        if(as[i].href.endsWith(".jpg")){
            poster_arr.push(as[i].innerText);
        }
    }
}

// here we are setting the song name to the card;
async function card_maker() {
    let song = [];
    let url = [];
    let poster_arr = [];
    await song_reader(song, url);
    await get_poster(poster_arr);

    //first setting the left side
    let len = song.length;
    let musiccard = document.getElementsByClassName("music-cards")[0];
    for (let i = 0; i < len; i++) {
        let card = document.createElement("div");
        card.setAttribute("class", "music-card flex");
        let innhtml = `
            <img id="img-1" width="32" height="32" class="invert" src="svg/music.svg" alt="music">
            <h3 class="name" title="${song[i]}">${song[i]}</h3>
            <h3 id="play-button">Play Now</h3>
            <img data-musicname = "${song[i]}" onclick="song_play('${song[i]}','${i}')" id="music-${i}" width="32" height="32" class="invert img-2" src="svg/circle-play.svg" alt="play button">
        `
        card.innerHTML = innhtml;
        musiccard.append(card);

        // making the card for the right part also
        let card_right = document.getElementsByClassName("cards")[0];
        let make_card = document.createElement("div");
        make_card.setAttribute("class", "card");
        let poster = poster_arr[i];
        let card_innhtml = `
            <img id="card-img" src="images/${poster}" alt="poster" width="180" height="150">
            <button class="flex">
                <img onclick="song_play('${song[i]}','${i}')" data-musicname="play-${song[i]}" id="play-${i}" width="32px" height="32" src="svg/play.svg" alt="play button">
            </button>
            <h3 title="${song[i]}">${song[i]}</h3>
            <p>Gagandeep Yadav.</p>
        `
        make_card.innerHTML = card_innhtml;

        card_right.append(make_card);
    }
}

card_maker();

// writing the code to play a song is here
let curr_song = new Audio;
let prev_song = "";

curr_song.addEventListener("pause", (e) => {
    let curr = e.target.src;
    let srcs = curr.split("/");
    let element_data = srcs[srcs.length - 1].replaceAll("%20", " ");
    let element = document.querySelector(`[data-musicname="${element_data}"]`);
    let right_element = document.querySelector(`[data-musicname="play-${element_data}"]`);
    element.src = "svg/circle-play.svg";

    let main_play_element = document.getElementById("main-play-button");
    main_play_element.src = "svg/song_play.svg";

    right_element.src = "svg/play.svg"
})

curr_song.addEventListener("play", (e) => {
    let curr = e.target.src;
    let srcs = curr.split("/");
    let element_data = srcs[srcs.length - 1].replaceAll("%20", " ");
    let element = document.querySelector(`[data-musicname="${element_data}"]`);
    let right_element = document.querySelector(`[data-musicname="play-${element_data}"]`);
    element.src = "svg/pause.svg";
    
    let main_play_element = document.getElementById("main-play-button");
    main_play_element.src = "svg/pause.svg";

    right_element.src = "svg/pause.svg";
})

// trying to play the next song when the one song is end code is here

async function next_prev_end(){
    let songs = [];
    let songs_url = [];
    await song_reader(songs,songs_url);

    curr_song.addEventListener("ended", () => {
        let nextsong = parseInt(curr_song.id) + 1;
        if(nextsong < songs.length){
            let viewelement =  document.getElementById(`play-${nextsong}`);
            viewelement.scrollIntoView({behavior:"smooth",block:"center"});
            song_play(songs[nextsong],nextsong);
        }
    });

    let next = document.getElementById("next");
    next.addEventListener("click",()=>{
        let nextsong = parseInt(curr_song.id) + 1;
        if(nextsong < songs.length){
            let viewelement =  document.getElementById(`play-${nextsong}`);
            viewelement.scrollIntoView({behavior:"smooth",block:"center"});
            song_play(songs[nextsong],nextsong);
        }
    })

    let prev = document.getElementById("prev");
    prev.addEventListener("click",()=>{
    let nextsong = parseInt(curr_song.id) - 1;
    if(nextsong >= 0){
        let viewelement =  document.getElementById(`play-${nextsong}`);
        viewelement.scrollIntoView({behavior:"smooth",block:"center"});
        song_play(songs[nextsong],nextsong);
    }
    })

}

next_prev_end();

function song_play(song_name, id_name) {;
    let element = document.getElementById(`music-${id_name}`);
    let right_element = document.getElementById(`play-${id_name}`);
    let main_play_element = document.getElementById("main-play-button");

    if (prev_song !== song_name) {

        if (prev_song !== "") {
            let _element = document.querySelector(`[data-musicname="${prev_song}"]`);
            let _right_element = document.querySelector(`[data-musicname="play-${prev_song}"]`);
            _element.parentElement.classList.remove("pop-up");
            _right_element.parentElement.classList.remove("hovered");
            _element.src = "svg/circle-play.svg";
            _right_element.src = "svg/play.svg";
        }

        curr_song.src = `music/${song_name}`;
        prev_song = song_name;
        curr_song.id = `${id_name}`;
        curr_song.play();

        element.src = "svg/pause.svg";
        main_play_element.src = "svg/pause.svg";
        right_element.src = "svg/pause.svg";
        right_element.parentElement.classList.add("hovered");
        element.parentElement.classList.add("pop-up");
    }
    else {
        if (curr_song.paused) {
            curr_song.id = `${id_name}`;
            curr_song.play();
            element.src = "svg/pause.svg";
            main_play_element.src = "svg/pause.svg";
            right_element.src = "svg/pause.svg";
            element.parentElement.classList.add("pop-up");
            right_element.parentElement.classList.add("hovered");

        } else {
            curr_song.pause();
            element.src = "svg/circle-play.svg";
            right_element.src = "svg/play.svg";
            main_play_element.src = "svg/song_play.svg";
        }
    }
}



// here we are setting the seek bar
setInterval(() => {
    let song_time = curr_song.currentTime;
    let song_duration = curr_song.duration;
    let min = Math.floor(song_time / 60);
    let sec = Math.floor(song_time % 60);
    if (song_time > 0) {
        let time_ele = document.getElementById("music-time");
        time_ele.innerText = min + " : " + sec;
    }
    if (curr_song.src) {
        let x = curr_song.src.split("/");
        let song_name = x[x.length - 1].replaceAll("%20", " ");
        document.getElementById("music-name").innerText = song_name;
        document.getElementById("music-name").title = song_name;
    }

    let seek_circle = document.getElementById("seek-circle");
    let percent = (song_time / song_duration) * 100;
    seek_circle.style.left = `${percent}%`

    let _currvol = curr_song.volume;
    let volume_element = document.getElementById("vol-circle");
    volume_element.style.left = `${_currvol * 85}%`;

}, 1000);


// writing the code for the main play button is here

function mainplaybutton(){
    let main_play_element = document.getElementById("main-play-button");
    if(curr_song.src){
        if (curr_song.paused) {
            curr_song.play();
            main_play_element.src = "svg/pause.svg";
        } else {
            curr_song.pause();
            main_play_element.src = "svg/song_play.svg";
        }
    }
}


// writing the code to move the seek bar and the volume both

let seek_bar = document.getElementById("seek_bar");
seek_bar.addEventListener("click", (e)=>{
    if(curr_song.src){
        let rec = seek_bar.getBoundingClientRect();
        
        let clickx = e.clientX;
        let left = rec.left;
        let width = rec.width;
        
        let percent = ((clickx - left)/width);
        curr_song.currentTime = curr_song.duration * percent; 
    }
})

let vol_bar = document.getElementById("vol_bar");
vol_bar.addEventListener("click",(e)=>{
    if(curr_song.src){
        let rec = vol_bar.getBoundingClientRect();
        
        let clientx = e.clientX;
        let left = rec.left;
        let width = rec.width;
        let percent = (clientx - left)/width;
        percent = Math.max(0, Math.min(1, percent));
        curr_song.volume = percent
    }
})


//writing the code for the search bar is here so let write it

async function searchbar(){
    let search_bar = document.getElementById("search_bar");
    let _songnames = [];
    let _songurl = [];
    await song_reader(_songnames,_songurl);
    let len = _songnames.length;
    search_bar.addEventListener("search",(e)=>{
        let _value  = e.target.value.toLowerCase();
        let prev_index = -1;
        let songname = "";
        let songindex = -1;
        if(_value != ""){
            for(let i = 0; i< len;i++){
                if(_songnames[i].toLowerCase().includes(_value)) {
                    let curr_index = _songnames[i].toLowerCase().search(_value);
                    if(prev_index == -1) {
                        prev_index = curr_index;
                        songname = _songnames[i];
                        songindex = i;
                    }
                    else if (prev_index != -1 && prev_index > curr_index) {
                        prev_index = curr_index;
                        songname = _songnames[i];
                        songindex = i;
                    }
                }
            }
            if(songname != "" && songindex != -1){
                let right_element = document.getElementById(`play-${songindex}`);
                right_element.scrollIntoView({behavior:"smooth",block:"center"});
                song_play(songname,songindex);
            }
        }
    })
}

searchbar();