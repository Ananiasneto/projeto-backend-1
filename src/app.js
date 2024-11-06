import express,{ json } from "express";
import cors from "cors";

const items = [
    {
        id:1,
        nome: "Maçã",
        quantidade: 10,
        tipo: "Fruta"
    },
    {
        id:2,
        nome: "Arroz",
        quantidade: 2,
        tipo: "Grão"
    },
   
    {
        id:3,
        nome: "Abobrinha",
        quantidade: 3,
        tipo: "Legume"
    },
   
];


const app =express();
app.use(cors());
app.use(json());


app.post("/items",(req,res)=>{
    const item=req.body;
    if(!item.nome || !item.quantidade || !item.tipo){
        return res.status(422).send("vc n enviou todas informacoes")
    }
    items.forEach(itemDaLista => {
        if (item.nome.toLowerCase() === itemDaLista.nome.toLowerCase()) {
            return res.status(409).send("O item já foi adicionado");
        }
    });

    items.push({
        id:items.length + 1 ,
        ...item
    });
    res.status(201).send("criado com sucesso")
})
app.get("/items",(req,res)=>{
    res.send(items)
})

app.get("/items/:id",(req,res)=>{
    const id=req.params.id;
    const itemComId=items.find(item=>{
        return item.id===Number(id);
    })
    res.send(itemComId)
    
})
/*app.get("/items/:id",(req,res)=>{
    pra pegar itens especificos por nome
})*/



app.listen(5000,()=>{
    console.log("rodando na porta 5000")
});