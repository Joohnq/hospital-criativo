console.log("Rodando")
const express = require("express")//Chamei o Express
const server = express()
const db = require("./db")

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true }))

const nunjucks = require("nunjucks")
nunjucks.configure("views", {
    express: server,
    noCache: true, // Nunjuscks não irá fazer um cache, então quando reiniciarmo a página ele irá carregar com as configurações que esta setada
})

server.get("/", function(req, res){//Criando rota barra
    db.all(`SELECT * FROM ideas`, function(err, rows){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }

        const reversedIdeas = [...rows].reverse()//Aqui é um expressão para inverter a ordem das dicas, ou seja, as ideias adicionas rentemente irão ficar como as primeiras
        let lastIdeas = []
        for (idea of reversedIdeas) {//Criamos uma estrutura de repetição que irá renderizar as 2 dicas adicionadas recentemente
            if(lastIdeas.length < 2){//Se 'as ultimas dicas' forem menor que 2 ele irá adicionar um dica
                lastIdeas.push(idea)
        }
    }
        return res.render("index.html", { ideas: lastIdeas })//Criando um diretório para encontrar o index html e renderiza-lo
    })  
})

server.get("/ideias", function(req, res) {//Criando rota barra
    db.all(`SELECT * FROM ideas`, function(err, rows){
    if (err) {
        console.log(err)
        return res.send("Erro no banco de dados")
    }
    const reversedIdeas = [...rows].reverse()//Expressão para inverter a ordem das dicas
    return res.render("ideias.html", {ideas: reversedIdeas})//Criando um diretório para encontrar o index html e renderiza-lo
    })   
})

server.post("/", function(req, res){
    const query = `
        INSERT INTO ideas(
            image,
            title,
            category,
            description,
            link
        ) VALUES(?,?,?,?,?);
    `

    const values = [
        req.body.image,
        req.body.title,
        req.body.category,
        req.body.description,
        req.body.link,
    ]

    db.run(query, values, function(err){
        if (err) {
            console.log(err)
            return res.send("Erro no banco de dados")
        }
        return res.redirect("/ideias")
    })     
})

server.listen(3000)//Liguei o Servidor na porta 3000


// img: "https://image.flaticon.com/icons/png/512/3181/3181846.png",
    // title: "Use marcaras e luvas",
    // category: "Prevenção",
    // description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae deserunt, tempore incidunt maiores assumenda alias velit tenetur, a impedit, facilis obcaecati id illum quibusdam voluptate cumque provident sint! Quo, atque?",
    // url: "#"

    // img: "https://image.flaticon.com/icons/png/512/3181/3181849.png",
    // title: "Cubra o rosto ao espirrar",
    // category: "Prevenção",
    // description: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae deserunt, tempore incidunt maiores assumenda alias velit tenetur, a impedit, facilis obcaecati id illum quibusdam voluptate cumque provident sint! Quo, atque?",
    // url: "#"