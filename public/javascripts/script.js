/*Navbar*/
function openCake(evt, cakeName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cakeName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  /*Default open*/
  document.getElementById("defaultOpen").click();

  /*View all button*/
  function showMore(id) {
       var more = document.getElementById(id + '-more');
      if (more.style.display === "none") {
          more.style.display = "block";
      } else {
          more.style.display = "none";
      }
  }

  /* Login page
  let signupbtn = document.getElementById("signupbtn");
  let signinbtn = document.getElementById("signinbtn");
  let nameField = document.getElementById("nameField");
  let title = document.getElementById("title");
  
  signinbtn.onclick = function(){
      nameField.style.maxHeight = "0";
      title.innerHTML = "Sign In";
      signupbtn.classList.add("disable");
      signinbtn.classList.remove("disable");
  }
  
  signupbtn.onclick = function(){
      nameField.style.maxHeight = "60px";
      title.innerHTML = "Sign Up";
      signupbtn.classList.remove("disable");
      signinbtn.classList.add("disable");
  }
  */