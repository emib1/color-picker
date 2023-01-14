const colorPickerBtn = document.querySelector('#color-picker');
const colorList = document.querySelector(".all-colors");
const  clearAll = document.querySelector(".clear-all")
const pickedColors = JSON.parse(localStorage.getItem(".picked-colors") || "[]");



// copy colors to the clipboard and updates the element text
const copyColor = elem => {
   navigator.clipboard.writeText(elem.dataset.color);
   elem.innerText = "Copied!";
   setTimeout(() => elem.innerText = elem.dataset.color, 1000);
}



const showColors = () => {
    if (!pickedColors.length) return; // returns if no picked colors
    colorList.innerHTML= pickedColors.map(color => `
        <li class="color">
            <span class="rect" style="background: ${color};border: 1px solid ${color == "#ffffff" ? "#ccc" : color}"></span>
            <span class="value" data-color ="${color}">${color}</span>
        </li>
    `).join(''); // generates li for picked colors and adds them to the color list
    document.querySelector(".picked-colors").classList.remove("hide")
    // Add a click event listner to each color item to copy item
    document.querySelectorAll(".color").forEach(li => {
        li.addEventListener("click", e => copyColor(e.currentTarget.lastElementChild));

    });
}

showColors();

const activateEyeDropper = async () => {
    try {
        // opens eye dropper and get the selected color
        const eyeDropper = new EyeDropper();
        const { sRGBHex } = await eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex);
        // check if the color exists if not it adds it
        if (!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex)
            localStorage.setItem(".picked-colors", JSON.stringify(pickedColors));
            showColors();
        }
       
    } catch (error) {
        console.log(error);
    }
}


// clear picked  colors and updates local storage
const clearAllColors = () => {
    pickedColors.length =0;
    localStorage.setItem("picked-colors", JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}
colorPickerBtn.addEventListener("click", activateEyeDropper);
clearAll.addEventListener("click", clearAllColors)