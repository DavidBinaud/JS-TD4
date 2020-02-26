class Case{

	constructor(id){
		this.id = id;
		this.img = document.getElementById("photo" + id);
		this.number = id;
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
		let a = this;
		this.img.onclick = function(){
			console.log(this.src);
		}
	}

	disableCursor(){
		this.img.style.cursor = "not-allowed";
		this.img.style.filter = "brightness(1)";
		this.img.onclick = "";
	}

}