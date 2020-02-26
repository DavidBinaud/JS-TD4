class Puzzle{

	constructor(){
		this.listeCase = new Array();
		for (var i = 0; i < 16; i++) {
			let case1 = new Case(i);
			case1.img.onclick = function(){puzzle.echanger(this);};
			this.listeCase.push(case1);
		}
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
		this.coups = 0;
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
		if (this.calcul_bien_place() === 16) {
			for (var i = 0; i < this.listeCase.length; i++) {
				this.listeCase[i].disableCursor();
			}
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


	echanger(item){
		//on recupere le nombre dans la source
		let number = parseInt(item.src.split(this.theme + "_")[1].split(".jpg")[0]);
		
		//on trouve l'element Case de la liste qui correspond au nombre cliqué
		let casecliquee = this.listeCase.find(element => element.number === number);

		//s'il est deplaçable
		if(casecliquee.isMovable()){
			//on recupera la case blanche et on effectue l'echange
			let caseblanche = this.listeCase.find(element => element.number === 15);
			caseblanche.changeNumber(number);
			caseblanche.setSrc(this.theme);

			casecliquee.changeNumber(15);
			casecliquee.setSrc(this.theme);

			//on update les curseurs autour de la case dite blanche
			this.updateCursors();

			//on incremente le nb coup joué
			this.coups++;

			//on met a jour l'affichage
			this.maj_affichage();

			//on verifie que la partie ne soit pas finie
			this.hasWon();
		}
	}


	//méthode de test de fin de partie qui met le taquin dans un etat fini - 1 coup
	setToFinal(){
		//on met chaque élément à sa place
		for (var i = 0; i < this.listeCase.length; i++) {
			this.listeCase[i].changeNumber(i);
			this.listeCase[i].setSrc(this.theme);
		}
		//on échange deux cases de la fin
		this.listeCase[14].changeNumber(15);
		this.listeCase[14].setSrc(this.theme);

		this.listeCase[15].changeNumber(14);
		this.listeCase[15].setSrc(this.theme);
		this.updateCursors();
	}


}