

// textarea functions
	function clearTxt() {
		document.getElementById("output").innerHTML = '';
	}

	function copy() {
		var copyText = document.getElementById("output");
		copyText.select();
		document.execCommand("copy");
	}
//

// Point constructor, defaults to 0.
function Point(x = 0, y = 0, z = 0) {
	this.x = x;
	this.y = y;
	this.z = z;
}

function getLength(p1, p2) {
	return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function Rectangle(p1, p2) {
	this.pA = new Point(Math.min(p1.x, p2.x), Math.min(p1.y, p2.y), Math.min(p1.z, p2.z));
	this.pG = new Point(Math.max(p1.x, p2.x), Math.max(p1.y, p2.y), Math.max(p1.z, p2.z));
	this.pB = new Point(p1.x, p2.y, p1.z);
	this.pC = new Point(p2.x, p2.y, p1.z);
	this.pD = new Point(p2.x, p1.y, p1.z);
	this.pE = new Point(p1.x, p1.y, p2.z);
	this.pF = new Point(p1.x, p2.y, p2.z);
	this.pH = new Point(p2.x, p1.y, p2.z);
}

function main(t) {
// declaring variables
	var pArr = [];

	var p1 = new Point(parseInt(document.getElementById('x1').value) || 0, 
					   parseInt(document.getElementById('y1').value) || 0,
					   parseInt(document.getElementById('z1').value) || 0);

	var p2 = new Point(parseInt(document.getElementById('x2').value) || 0, 
					   parseInt(document.getElementById('y2').value) || 0,
					   parseInt(document.getElementById('z2').value) || 0);

	var rect = new Rectangle(p1, p2);

	var ax = parseInt(document.getElementById('ax').value) || 0;
	var ay = parseInt(document.getElementById('ay').value) || 0;
	var az = parseInt(document.getElementById('az').value) || 0;

	var ox = Math.abs(parseInt(document.getElementById('ox').value)) || 0;
	var oy = Math.abs(parseInt(document.getElementById('oy').value)) || 0;
	var oz = Math.abs(parseInt(document.getElementById('oz').value)) || 0;

	var team = parseInt(document.getElementById('inputGroupSelect01').value);
	var instance = document.getElementById("instancesList").value || document.getElementById("instanceText").value || 'colombia/npc_jump1';
	var staticModel = document.getElementById("static-modelsList").value || document.getElementById("static-modelsText").value || 'objects/airport/box_cart.md3';
	var target = document.getElementById("target").value || 't1';
	var targetname = document.getElementById("target").value || 't1';
	var modelNum = parseInt(document.getElementById("modelNum").value) || 0;
	var speed = parseInt(document.getElementById("speed").value) || 200;
	var lip = parseInt(document.getElementById("lip").value) || 450;
	var wait = parseInt(document.getElementById("wait").value) || 0;
	var hp = parseInt(document.getElementById("hp").value) || 0;
	var dmg = parseInt(document.getElementById("dmg").value) || 0;

	function addPoint(x,y,z) {
		var p = new Point(x,y,z);
		if (p.z == rect.pA.z || p.z >= rect.pG.z - oz) {
			pArr.push(p);
		}
		else if (p.x == rect.pA.x || p.x >= rect.pG.x - ox) {
			pArr.push(p);
		}
		else if (p.y == rect.pA.y || p.y >= rect.pG.y - oy) {
			pArr.push(p);
		}
	}


	// Stores the generated code
	var result = "";

	// A loop that does the calculations and add it to the result
	let contX = true;
	let contY = true;
	let contZ = true;
	for (var i = rect.pA.x; i <= rect.pG.x && contX; i += ox) {
		contX = ox !== 0;
		contY = true;
		for (var j = rect.pA.y; j <= rect.pG.y && contY; j += oy) {
			contY = oy !== 0;
			contZ = true;
			for (var k = rect.pA.z; k <= rect.pG.z && contZ; k += oz) {
				contZ = oz !== 0;
				addPoint(i, j, k);
			}
		}
	}
// to text function
	function toTxt(p) {
		if (t == 'spawns') {
			return (`\n{\n"classname" "gametype_player"\n"spawnflags" "${team}"\n"count" "0"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n}`)
		}
		else if (t == 'button') {
			return (`\n{\n"model" "*${modelNum}"\n"classname" "func_button"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n"target" "${target}"\n"speed" "${speed}"\n"lip" "${lip}"\n"wait" "${wait}"\n"health" "${hp}"\n"dmg" "${dmg}"\n}`)
		}
		else if (t == 'door') {
			return (`\n{\n"model" "*${modelNum}"\n"classname" "func_door"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n"targetname" "${target}"\n"speed" "${speed}"\n"lip" "${lip}"\n"wait" "${wait}"\n"health" "${hp}"\n"dmg" "${dmg}"\n}`)
		}
		else if (t == 'static') {
			return (`\n{\n"model" "*${modelNum}"\n"classname" "func_static"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n}`)
		}
		else if (t == 'glass') {
			return (`\n{\n"model" "*${modelNum}"\n"classname" "func_glass"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n}`)
		}
		else if (t == 'static-models') {
			return (`\n{\n"model" "models/${staticModel}" \n"classname" "model_static"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n}`)
		}
		else {
			return (`\n{\n"classname" "misc_bsp"\n"bspmodel" "instances/${instance}"\n"origin" "${p.x} ${p.y} ${p.z}"\n"angles" "${ax} ${ay} ${az}"\n}`)
		}
	}

// Stairs section
	var direction = document.getElementById('inputSelect').value || 'x';
	var amount = parseInt(document.getElementById('amount').value) || 2;
	var forward = parseInt(document.getElementById('forward').value) || 160;
	var up = parseInt(document.getElementById('up').value) || 80;
	let len = pArr.length;

	function stairs() {
		var tempArr = pArr;
		var arr2 = [];
		for (var i = 0; i < amount - 1; i++) {
			for (var j = 0; j < len; j++) {
				if (direction == 'x') {
					let p = new Point(tempArr[j].x + forward, tempArr[j].y, tempArr[j].z + up);
					arr2.push(p);
				}
				else {
					let p = new Point(tempArr[j].x, tempArr[j].y + forward, tempArr[j].z + up);
					arr2.push(p);
				}
			}
			pArr = pArr.concat(arr2);
			tempArr = arr2;
			arr2 = [];
		}
		return pArr;
	}

	if ($('#stairs').is(":visible")) {
		stairs();
	}

// applying the points array to variable "result" and outputting it.
	for (var c = 0; c < pArr.length; c++) {
		result += (toTxt(pArr[c]));
	}

	document.getElementById("output").innerHTML += (result);

	if (pArr.length > 255) {
		alert('More than 255 of the same entity may not register or result in server crashing!');
	}
}