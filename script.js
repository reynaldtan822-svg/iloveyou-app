function showLove(){

let name=document.getElementById("name").value;
let age=document.getElementById("age").value;

if(name=="" || age==""){

alert("Please enter Name and Age");

return;

}

document.getElementById("formBox").style.display="none";
document.getElementById("loveBox").style.display="block";

document.getElementById("userInfo").innerHTML=
"Hi <b>"+name+"</b><br>Age: "+age;

createHearts();

}

function backForm(){

location.reload();

}

function createHearts(){

setInterval(function(){

let heart=document.createElement("div");

heart.className="heart";

heart.innerHTML="❤️";

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(20+Math.random()*40)+"px";

document.body.appendChild(heart);

setTimeout(function(){

heart.remove();

},5000);

},200);

}
