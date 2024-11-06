import express from "express";
import cors from "cors";
const itens = [
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
/*app.post("/",(req,resp)=>{
    para enviar itens
})*/
app.get("/itens",(req,resp)=>{
    resp.send(itens)
})

app.get("/itens/:id",(req,resp)=>{
    const id=req.params.id;
    const itemComId=itens.find(item=>{
        return item.id===Number(id);
    })
    resp.send(itemComId)
    
})
/*app.get("/items/:id",(req,resp)=>{
    pra pegar itens especificos id 
})*/



app.listen(5000,()=>{
    console.log("rodando na porta 5000")
});