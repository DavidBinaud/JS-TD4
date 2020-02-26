class Case{

	constructor(id){
		this.id = id;
		this.img = document.getElementById("photo" + id);
		this.number = id;
		this.img.onclick = function(){
			puzzle.echanger(this);
		}
		this.disableCursor();
	}

	setSrc(folder){
		this.img.src = "img/" + folder + "/" + folder + "_" + this.number + ".jpg";
	}

	changeNumber(n){
		this.number = n;
	}

	enableCursor(){
		this.img.style.cursor = "pointer";
		this.img.style.filter = "brightness(1.2)";
		this.img.style.tran
		this.canMove = true;
	}

	disableCursor(){
		this.img.style.cursor = "not-allowed";
		this.img.style.filter = "brightness(1)";
		this.canMove = false;
	}

	isMovable(){
		return this.canMove === true;
	}

}