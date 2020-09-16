document
	.querySelector(".data#Output")
	.setAttribute(
		"placeholder",
		"DataURL will be placed here\n\nClick to copy afterwards"
	);

const toBase64 = (file) =>
	new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
async function Main() {
	const file = document.querySelector("#fileInput").files[0];
	document.querySelector(".data#Output").innerText = await toBase64(file);
}

document.querySelector("#fileInput").addEventListener("change", () => {
	document.querySelector(".data#Output").innerText = "Converting...";
	setTimeout(Main, 100);
});

document.querySelector(".data#Output").addEventListener("click", (e) => {
	e.target.select();
	document.execCommand("copy");
});

document.querySelector(".baseLeft").addEventListener("click", () => {
	var base64el = document.querySelector("#Input");
	var base64output = window.btoa(base64el.value);
	document.querySelector("#Input").value = base64output;
});

document.querySelector(".baseRight").addEventListener("click", () => {
	var base64el = document.querySelector("#Input");
	var asciiOutput = base64el.value;
	if (isBase64(base64el.value)) {
		asciiOutput = window.atob(base64el.value);
	}
	document.querySelector("#Input").value = asciiOutput;
});

function isBase64(str) {
    if (str ==='' || str.trim() ===''){ return false; }
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
}