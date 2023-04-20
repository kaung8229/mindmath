// const { count } = require("console");

// GET UI
var container = document.querySelector('.container');
var progressbox = document.querySelector('.progress-box');
var shownum = document.querySelector('.shownum');
var answerbox = document.querySelector('.answerbox');

var ansright = document.querySelector('.right');
var answrong = document.querySelector('.wrong');


var digits = document.getElementById('digits');
var counts = document.getElementById('count');

var txt = document.getElementById('txt');
var voc = document.getElementById('voc');

var numui = document.querySelector('.num');

var startbtn = document.querySelector('.startbtn');


var rightnumui = document.querySelector('.rightnum');
var answernumber = document.getElementById('answernumber');

var checkbtn = document.querySelector('.checkbtn');
var restartbtn = document.querySelector('.restartbtn');

// for level
var easy = document.getElementById("easy");
var norm = document.getElementById("norm");
var hard = document.getElementById("hard");
var impo = document.getElementById("impo");

var minus = document.getElementById('minus');


startbtn.addEventListener('click',function(e){
    // e.preventDefault();
    if(digits.value != "" && counts.value != ""){
        e.preventDefault();
        progresscheck();
    }
});

checkbtn.addEventListener('click',function(e){
    if(answernumber.value != ""){
        e.preventDefault();
        checkanswer();
    }
})

restartbtn.addEventListener('click',function(){
    restarter();
    checkbtn.style.display = "block";
});

var rannum = 0;
var rightans = 0;

var levels = 0;

// const synth = window.speechSynthesis
// let textt = "Hey there";
// let utterthis = new SpeechSynthesisUtterance(textt);

// synth.speak(utterthis);


function progresscheck(){
    // console.log(digits.value);
    // console.log(counts.value);
    // console.log(txt.checked);
    // console.log(voc.checked);

    if(easy.checked){
        levels = 1300;
    }else if(norm.checked){
        levels = 1100;
    }else if(hard.checked){
        levels = 800;
    }else if(impo.checked){
        levels = 500;
    }



    var numdig = 1;
    for(var n = 1; n < (+digits.value); n++){
        numdig *= 10;
    }
    // console.log(numdig);
    
    // randomnumber();

    if(txt.checked){

        closefun();
        showprogress();

        showreadytext();
        
        for(var c=0; c<((+counts.value) + 1); c++){
            if(c <= ((+counts.value)-1)){
                setTimeout(function(){
                    // console.log("Hello");
                    if(minus.checked){
                        randomnumber(((numdig * -10) + 1),(numdig * 10) -1,numdig);
                    }else{
                        randomnumber(numdig,(numdig * 10) -1,numdig);
                    }
                    numui.innerHTML = rannum;
                },(levels * (c + 2)))
            }else{
                setTimeout(function(){
                    // console.log("finished");
                    closeshownum();
                    showanswerbox();
                },(levels * ((+counts.value)+2)))
            }
        }
    }


    if(voc.checked){

        closefun();
        showprogress();

        // console.log("listen");
        numui.innerHTML = "Listen";

        for(var c=0; c<((+counts.value) + 1); c++){
            if(c <= ((+counts.value)-1)){
                setTimeout(function(){
                    // console.log("Hello");
                    if(minus.checked){
                        randomnumber(((numdig * -10) + 1),(numdig * 10) -1,numdig);
                    }else{
                        randomnumber(numdig,(numdig * 10) -1,numdig);
                    }
                    speaknumbervoice();
                },(levels * (c + 2)))
            }else{
                setTimeout(function(){
                    // console.log("finished");
                    closeshownum();
                    showanswerbox();
                },(1900 * ((+counts.value)+(+digits.value))))
            }
        }

    }

}

var once = false;
var mi = 0;

function randomnumber(min,max,numdig){
    // console.log(digits.value);

    // console.log(min);
    // console.log(max);

    rannum = Math.floor(min + (Math.random() * (max - min)));
    // console.log(rannum);

    if(minus.checked){
        // console.log(numdig);
        if(rannum > -numdig && rannum < numdig){
            rannum = (rannum * 10) + Math.floor(Math.random() * 10);
        }else if(rannum == 0){
            rannum = rannum + numdig;
        }
        // console.log(rannum);
        if(mi < 1){
            // console.log("checked");
            rannum = rannum * checkfirstminus(rannum);
            mi++;
        }
    }
    // console.log(rannum);

    rightans += rannum;

}

function checkfirstminus(nn){
    if(!once && Math.sign(nn) == -1){
        once = true;
        return -1;
    }else{
        return 1;
    }
}

const speaker = window.speechSynthesis;

function speaknumbervoice(){
    
    const utternum = new SpeechSynthesisUtterance(rannum);

    utternum.rate = 1.6;
    utternum.lang = "en-US";

    speaker.speak(utternum);

}

function showreadytext(){

    var readytext = ["Ready","Go!"];
    var r = 0;
    for(var i=-1; i<counts.value; i++){
        setTimeout(function(){
            if(r < 2){
                // console.log(readytext[r++]);
                numui.innerHTML = readytext[r++];
                numui.style.animationName = "numani";
                numui.style.animationDuration = `${(levels/1000)}s`;
                numui.style.animationDelay = "0.01s";
            }
        },(levels * (i + 1)));
    }

}

function checkanswer(){
    // console.log(answernumber.value);
    // console.log(rightans);

    if(answernumber.value == rightans){
        showansright();
        answernumber.style.color = "green";
        answernumber.style.borderColor = "green";

        restartbtn.style.backgroundColor = "green";
        restartbtn.innerHTML = "Start again";

        checkbtn.style.display = "none";
        restartbtn.style.display = "block";
    }else{
        rightnumui.innerHTML = rightans;
        showanswrong();
        answernumber.style.color = "red";
        answernumber.style.borderColor = "red";

        restartbtn.style.backgroundColor = "red";
        restartbtn.innerHTML = "Try again";

        checkbtn.style.display = "none";
        restartbtn.style.display = "block";
    }

}


function closefun(){
    container.classList.add("close");
    ansright.classList.add("close");
    answrong.classList.add("close");
    answerbox.classList.add('close');
}


function closeshownum(){
    shownum.classList.add('close');
}
function showshownum(){
    shownum.classList.remove('close');
}


function showprogress(){
    progressbox.classList.remove("close");
}

function showanswerbox(){
    answerbox.classList.remove("close");
}

function showansright(){
    ansright.classList.remove("close");
}
function showanswrong(){
    answrong.classList.remove("close");
}

function restarter(){

    answernumber.value = "";
    answernumber.style.color = "black";
    answernumber.style.borderColor = "rgba(0,0,0,0.5)";
    checkbtn.style.backgroundColor = "royalblue";
    checkbtn.innerHTML = "Check";

    container.classList.remove("close");
    ansright.classList.remove("close");
    answrong.classList.remove("close");
    answerbox.classList.remove('close');
    progressbox.classList.add("close");
    showshownum();

    restartbtn.style.display = "none";

    rightans = 0;

}








