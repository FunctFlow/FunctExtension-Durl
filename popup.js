document.querySelector(".data#Output").setAttribute("placeholder", "Click Browse Files\n\nDataURL Will Output Here\n\nOnce Loaded, Click This Textarea To Copy The DataURL");
document.querySelector(".data#Input").setAttribute("placeholder", "Paste DataURL Here\n\nThen Tap Download File\n\nIt Should Begin Shortly After\n\n\nTHIS IS EXPERIMENTAL\nYou need to type your own file extension below. Default is file.txt");

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
    document.execCommand('copy');
});

document.querySelector(".urlButton").addEventListener("click", (e) => {
    const el = document.createElement("a");
    el.download = "file." + document.querySelector(".fileExt").value || "txt";
    el.href = document.querySelector(".data#Input").value;
    el.style.display = "none";
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
});