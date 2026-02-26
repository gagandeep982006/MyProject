//writing the code for the navbar expension is here
function nav_expand(){
    if(document.querySelector(".division-2").firstElementChild.children[0].style.display == "block"){
        document.querySelector(".division-2").firstElementChild.children[0].style.display = "none";
        document.querySelector(".division-2").firstElementChild.children[1].style.display = "none";

        document.querySelector(".navbar").style.padding = "15px 20px"

        document.querySelector(".navbar-body").style.flexDirection = "row";
        document.querySelector(".navbar-body").style.gap = "0px";

        document.querySelector(".division-2").firstElementChild.style.gap = "20px";
    }
    
    else {
        document.querySelector(".division-2").firstElementChild.children[0].style.display = "block";
        document.querySelector(".division-2").firstElementChild.children[1].style.display = "block";
        document.querySelector(".division-2").firstElementChild.children[2].style.display = "block";
    
        document.querySelector(".navbar").style.padding = "15px 0px"
    
        document.querySelector(".navbar-body").style.flexDirection = "column";
        document.querySelector(".navbar-body").style.gap = "10px";
    
        document.querySelector(".division-2").firstElementChild.style.gap = "5px";
    }

}

// writing the code for the searching box is here
function search_node(){
    let target = document.getElementById("search");
    let target_value = target.value.toLowerCase().trim();

    let localcount = localStorage.length;

    for (let i = 1; i <= localcount; i++) {
        let item = localStorage.getItem(`card-${i}`);
        //for the safty 
        if (!item) continue;

        let parsed = JSON.parse(item);
        let localstring = parsed.heading.toLowerCase();

        if (localstring.includes(target_value)) {
            let doc = document.getElementById(`card-${i}`);
            doc.scrollIntoView({behavior:"smooth",top:"103px"});
            doc.style.animation = "scroll_animation 2s ease 100ms 1";
            doc.addEventListener("animationend", () => {
                doc.style.animation = "";  
            });
            target.value = "";
            break;
        }
    }

}

//writing a code which insert the all card first when we load the site from the local storage let do it
function load_card(){
    //if localstorage is 0 then a dummy card added
    let localstorage_length = localStorage.length;
    if(localstorage_length == 0){
        let nth = "Note Heading";
        let nt = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos magni eius quaerat tempora consectetur necessitatibus dolor labore eum, maxime praesentium."
        make_note(-1,nth,nt)
    }

    for(let i =0; i<localstorage_length;i++){
        let card_note = localStorage.getItem(`card-${i+1}`);

        //converting back to the object here
        let obj_card = JSON.parse(card_note);
        make_note(i,obj_card.heading,obj_card.note);
    }

}
load_card();


/*
writiing a code to add the notes is here
*/

// make a object to store the card heading and the note
let card_object = {
    heading:"",
    note:""
};

//function to make the note is here
function make_note(cardlen,nht,nt){
    let new_card = document.createElement("div");
    new_card.setAttribute("class","card")
    new_card.setAttribute("id",`card-${cardlen+1}`)
    new_card.innerHTML = `
        <header>
            <h2>${nht}</h2>
            <button onclick="delete_note()" id="close-${cardlen+1}"><img id="close-${cardlen+1}" src="icons/close.png" width="30px" height="30px" alt="close"></button>
        </header>

        <div class="line"></div>

        <main>
            <p>${nt}</p>
            <button id="work-${cardlen+1}" onclick="work_done()" class="btn">Work Done</button>
        </main>

        <div class="line"></div>

        <footer>
            <p>Powered by gagan</p>
        </footer>
    `

    document.querySelector(".main-cards-container").append(new_card);
}


//function to change the text of the card 
function change_note_text(change_note,note_heading_text,note_text){
    card_object.heading = note_heading_text;
    card_object.note = note_text;
    
    document.getElementById(`card-${change_note}`).innerHTML = `
    <header>
        <h2>${note_heading_text}</h2>
        <button onclick="delete_note()" id="close-${change_note}"><img id="close-${change_note}" src="icons/close.png" width="30px" height="30px" alt="close"></button>
    </header>

    <div class="line"></div>

    <main>
        <p>${note_text}</p>
        <button id="work-${change_note}" onclick="work_done()" class="btn">Work Done</button>
    </main>

    <div class="line"></div>

    <footer>
        <p>Powered by gagan</p>
    </footer>
    `;

    localStorage.setItem(`card-${change_note}`,JSON.stringify(card_object))
}

function addnote(){
    let note_heading = document.getElementById("heading");
    let change_note = document.getElementById("change-note");
    let note = document.getElementById("note");

    if(note_heading.value.length == 0 && note.value.length == 0){
        note_heading.setAttribute("placeholder","Enter the heading first");
        note.setAttribute("placeholder","Enter the note first");
        document.getElementById("note-wr-2").style.display = "inline-block";
        document.getElementById("heading-wr-1").style.display = "inline-block";
        document.getElementById("note-wr-1").style.display = "none";
    }

    else if(note_heading.value.length == 0){
        note_heading.setAttribute("placeholder","Enter the heading first");
        document.getElementById("heading-wr-1").style.display = "inline-block";
    }
    else if(note.value.length == 0){
        note.setAttribute("placeholder","Enter the note first");
        document.getElementById("note-wr-2").style.display = "inline-block";
        document.getElementById("note-wr-1").style.display = "none";
    }

    if(note_heading.value.length >= 18){
        note_heading.setAttribute("placeholder","Note Heading is too large");
        note_heading.value = "";
        document.getElementById("heading-wr-1").style.display = "inline-block";
    }

    if(change_note.value == "" && note.value.length != 0 && note_heading.value.length != 0 && note_heading.value.length < 18 ){
        let note_heading_text = note_heading.value;
        let note_text = note.value;
        let card_length = localStorage.length;

        document.getElementById("note-wr-2").style.display = "none";
        document.getElementById("heading-wr-1").style.display = "none";
        document.getElementById("note-wr-1").style.display = "inline-block";

        if(card_length == 0){
            document.getElementById("card-0").remove();
        }

        note_heading.setAttribute("placeholder","My note heading");
        note.setAttribute("placeholder","Enter your note here");

        make_note(card_length,note_heading_text,note_text);

        card_object.heading = note_heading_text;
        card_object.note = note_text;

        //cant pass the object directly it show [object object we have to convert it into the string so use the JSON.stringify(obj)]
        localStorage.setItem(`card-${card_length+1}`,JSON.stringify(card_object));
        note_heading.value = "";
        note.value = "";
        change_note.value = "";
    }

    else if(change_note.value != "" && note.value.length != 0 && note_heading.value.length != 0 && note_heading.value.length < 18){
        if(change_note.value <= localStorage.length && change_note.value > 0){
            let note_heading_text = note_heading.value;
            let note_text = note.value;

            change_note_text(change_note.value,note_heading_text,note_text);

            note_heading.setAttribute("placeholder","My note heading");
            note.setAttribute("placeholder","Enter your note here");
            change_note.setAttribute("placeholder","Enter note no. to change it's text(optional)");
            note_heading.value = "";
            note.value = "";
            change_note.value = "";

        }
        else if(change_note.value > localStorage.length || change_note.value <= 0){
            change_note.setAttribute("placeholder","Enter a valid note number");
            change_note.value = "";
        }
    }
}


// writing the code for the form cross button let do it

function form_erase(id){
    let target = document.getElementById(id);
    target.value = "";
}

//writing code for the delete all
function delete_all_note(){
    let localstorage_length = localStorage.length;
    for(let i = 0;i<localstorage_length;i++){
        document.getElementById(`card-${i+1}`).remove();
    }
    let nth = "Note Heading";
    let nt = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos magni eius quaerat tempora consectetur necessitatibus dolor labore eum, maxime praesentium."
    make_note(-1,nth,nt)

    localStorage.clear();
}

//writing the code for the work done is here 
function work_done(){
    document.addEventListener("click",(element) =>{
        let note_no = JSON.stringify(element.target.id);
        let no = parseInt(note_no.split("-")[1].split(`"`)[0]);
        let workdone = "Great job — your effort has paid off. Time to relax and enjoy the success! 🎉";
        let heading = localStorage.getItem(`card-${no}`)
        let change_heading = JSON.parse(heading).heading;
        change_note_text(no,change_heading,workdone);
    })
}

// writing the function to delete a note is here
function delete_note(){
    document.addEventListener("click",(element) => {
        let note_no = JSON.stringify(element.target.id);
        let no = parseInt(note_no.split("-")[1].split(`"`)[0]);
        
        let locallength =localStorage.length;
        document.getElementById(`card-${no}`).style.display = "none";
        document.getElementById(`card-${no}`).remove();
        for(let i = no;i<locallength;i++){
            localStorage.setItem(`card-${i}`,localStorage.getItem(`card-${i+1}`))
        }
        localStorage.removeItem(`card-${locallength}`);
    })
}

// now let write the code to set the time and the date here let do it
function day_time(){
    let datetime = new Date();
    let day = document.getElementById("day");
    let daynames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    day.innerText = `It's ${daynames[datetime.getDay()]}`;

    //setting for the wish
    let hour = datetime.getHours();
    let wish = document.getElementById("wish");
    if(hour >= 4 && hour <= 12){
        wish.innerHTML = "Good Morning!";
    }
    else if(hour > 12 && hour <= 19){
        wish.innerHTML = "Good Evening!";
    }
    else {
        wish.innerHTML = "Good Night!";
    }

    setInterval(() =>{
        let datetime = new Date();
        let hour = datetime.getHours();
        let min = datetime.getMinutes();
        let second = datetime.getSeconds();

        let time = document.getElementById("time");
        time.innerText = `${hour} : ${min} : ${second}`;
    },1000)
}

day_time();