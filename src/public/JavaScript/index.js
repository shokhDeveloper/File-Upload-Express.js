const username = window.localStorage.getItem("username")
const handleToCheckUserName = () => {
    if(!username){
        window.location.replace("/login")
    }
}
handleToCheckUserName()
const elTemp = document.querySelector("template").content;
const elList = document.querySelector("ul")
const fileInput = document.querySelector(".file")
let result = []
const handleGetData = async () => {
    const req = await fetch("/files")
    if(req.ok){
        result = await req.json();
        handleRenderData(result)
    }
}
handleGetData();
function handleRenderData (arr) {
    for(let data of arr){
        const clone = elTemp.cloneNode(true);
        clone.querySelector("h4").textContent = data.avtor
        clone.querySelector("p").textContent = data.fileText;
        clone.querySelector("img").src = "/getFile/" + data.fileName.replaceAll(" ", "")
        clone.querySelector("a").href = "/download/" + data.fileName
        elList.append(clone)
    }
}
const handleSub = async (evt) => {
    evt.preventDefault();
    const formData = new FormData();

    formData.append("file", fileInput.files[0]);
    formData.append("title", title.value);
    formData.append("username", username)
    
    const req = await fetch("/upload", {
        method: "POST",
        body: formData
    })
    if(req.ok){
        const res = await req.json();
        handleGetData()
        handleRenderData(result)
    }
}
elList.addEventListener("click", (evt) => {
    // if(evt.target.matches(".link")){
    //     fetch("/download/")
    // }
})
form.addEventListener("submit", handleSub)