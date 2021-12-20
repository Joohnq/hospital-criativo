function onOff(){
    document
        .querySelector("#modal")//Trazendo o id que sera modificado
        .classList
        .toggle("hide")//Chamamos essa propiedade que quando for clicada colocará e removerá a class hide
        
    document
        .querySelector("body")
        .classList
        .toggle("hideScroll")

    document
        .querySelector("#modal")
        .classList
        .toggle("addScroll")
}

function checkFields(event){
    const valuesToCheck = [
        "title",
        "image",
        "category",
        "description",
        "link",
    ]

    const isEmpty = valuesToCheck.find(function(value) {

        const checkIfIsString = typeof event.target[value].value === "string"
        const checkIfIsEmpty = !event.target[value].value.trim()
        if(checkIfIsString && checkIfIsEmpty){
            return true
        }
    })

    if(isEmpty){
        event.preventDefault()
        alert("Preencha todos os campos")
    }

}
