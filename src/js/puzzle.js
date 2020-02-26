class Puzzle{

	constructor(){
		this.listeCase = new Array();
		for (var i = 0; i < 16; i++) {
			let case1 = new Case(i);
			this.listeCase.push(case1);
		}
		this.coups = 0;
		this.theme = "nombres";
		this.melanger();
	}

	afficher_solution(){
		let jeu = document.getElementById("jeu");
		let modele = document.getElementById("modele");
		let buttonSol = document.getElementById("solution");
		let buttonMel = document.getElementById("melanger");

		if (buttonSol.value === "solution") {
			modele.style.display = "flex";
			jeu.style.display = "none";
			buttonSol.value = "puzzle";
			buttonMel.disabled = true;
		}else{
			modele.style.display = "none";
			jeu.style.display = "inline";
			buttonSol.value = "solution";
			buttonMel.disabled = false;
		}

	}

	changer_theme(theme){
		this.theme = theme;
		for (var i = 0; i < this.listeCase.length; i++) {
			this.listeCase[i].setSrc(theme);
		}
		let modele = document.getElementById("photo16");
		modele.src = "img/" + theme + "/" + theme + "_16.jpg";
	}

	melanger(){
		this.listeCase.sort(() => Math.random() - 0.5);
		for (var i = 0; i < this.listeCase.length; i++) {
			this.listeCase[i].changeNumber(i);
			this.listeCase[i].setSrc(this.theme);
		}
		this.listeCase.sort((a,b) => {return a.id - b.id});
		this.maj_affichage();
		this.updateCursors();
	}

	maj_affichage(){
		let divmes = document.getElementById("message");
		let nb = this.calcul_bien_place();
		divmes.innerHTML = "" + this.coups +  (this.coups > 1? " coups, " : " coup, ") + nb + (nb > 1? " bien placés": " bien placé");
	}

	calcul_bien_place(){
		let number = 0;
		for (var i = 0; i < this.listeCase.length; i++) {
			if(this.listeCase[i].id === this.listeCase[i].number){
				number++;
			}
		}
		return number;
	}

	hasWon(){
		let divmes = document.getElementById("message");
		if (calcul_bien_place() === 16) {
			divmes.innerHTML = "bravo, puzzle résolu en " + this.coups + (this.coups > 1? " coups." : " coup");
		}
	}

	updateCursors(){
		// on aurait pu utiliser puzzle.listeCase.find(element => element.number === 15); pour trouver l'element 15 et donc savoir a quel id il se trouve(blank)
		let blank = 0;
		for (var i = 0; i < this.listeCase.length; i++) {
			if (this.listeCase[i].number === 15) {
				blank = this.listeCase[i].id;
			}
			this.listeCase[i].disableCursor();
		}
		

		// x-%4 === 0 pour savoir si on est sur une bordure gauche du taquin
		if(blank%4 !== 0){
			if(blank - 1 >= 0){
				this.listeCase[blank - 1].enableCursor();
			}
		}

		// (x-3)%4 === 0 pour savoir si on est sur une bordure droite du taquin
		if((blank - 3) % 4 !== 0){
			if(blank + 1 < 16){
				this.listeCase[blank + 1].enableCursor();
			}
		}

		// bordure haute
		if(blank - 4 >= 0){
			this.listeCase[blank - 4].enableCursor();
		}

		// bordure basse
		if(blank + 4 < 16){
			this.listeCase[blank + 4].enableCursor();
		}


		console.log(blank);	
	}


}