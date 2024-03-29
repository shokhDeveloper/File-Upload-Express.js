const handleSub = (evt) => {
    evt.preventDefault();
    if(username?.value?.length){
        window.localStorage.setItem("username", username?.value)
        window.location.replace("/")
    }else{
        alert("Name required")
    }
}
form.addEventListener("submit", handleSub)