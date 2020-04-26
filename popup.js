const toBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
async function Main() {
    const file = document.querySelector("#myfile").files[0];
    document.querySelector("#myoutput").innerText = await toBase64(file);
}
document.querySelector("#myfile").addEventListener("change", () => {
    document.querySelector("#myoutput").innerText = "Converting...\n\r\n\rIt will take longer for larger files ;)";
    setTimeout(Main, 100);
});