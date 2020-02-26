let puzzle = new Puzzle();
let th = document.getElementById("themes");
let sol = document.getElementById("solution");
let mel = document.getElementById("melanger");
let divmes = document.getElementById("message");

th.onchange = function(){ puzzle.changer_theme(this.value); };
sol.onclick = puzzle.afficher_solution;
mel.onclick = function(){  puzzle.melanger();};
