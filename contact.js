let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", () => {
    const nameUser = document.getElementById("name");
    const surnameUser = document.getElementById("surname");
    const emailUser = document.getElementById("email");
    const messageUser = document.getElementById("message");
    const numberUser = document.getElementById("number");

    console.log(nameUser.value);
    console.log(surnameUser.value);
    console.log(emailUser.value);
    console.log(messageUser.value);    
    console.log(numberUser.value);    

    if (nameUser.value.trim() === "" || emailUser.value.trim() === "" || messageUser.value.trim() === "" ||surnameUser.value.trim() === "") {
      showNotification("⚠️ Merci de remplir tous les champs !");
    } else {
        alert("🍵 Merci " + `M. ${nameUser.value}`+ " ! Votre message a bien été envoyé 💚");
        nameUser.value = "";
        nameUser.value = "";
        surnameUser.value = "";
        emailUser.value = "";
        messageUser.value = "";
        numberUser.value = "";
    }

})

