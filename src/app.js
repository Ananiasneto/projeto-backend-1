import express,{ json, query } from "express";
import cors from "cors";

const items = [
    {
        id:1,
        name: "Maçã",
        quantify: 10,
        type: "Fruta"
    },
    {
        id:2,
        name: "Arroz",
        quantify: 2,
        type: "Grão"
    },
   
    {
        id:3,
        name: "Abobrinha",
        quantify: 3,
        type: "Legume"
    },
   
];


const app =express();
app.use(cors());
app.use(json());


app.post("/items",(req,res)=>{
    const item=req.body;
    if(!item.name || !item.quantify || !item.type){
        return res.status(422).send("vc não enviou todas informacoes")
    }
    items.forEach(itemDaLista => {
        if (item.name.toLowerCase() === itemDaLista.name.toLowerCase()) {
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
    const { type }=req.query;
    if(type){
        const itemComType=items.filter(item=>item.type.toLowerCase()===type.toLowerCase())
        if(itemComType.length
            ===0
        ){
              return res.send([]);
        }else{
         return res.send(itemComType);
        }
        
    } 
    return res.send(items)
})



app.get("/items/:id", (req, res) => {
    const id = Number(req.params.id);

    if (id <= 0) {
        return res.status(400).send("Digite um ID válido ou seja acima de 0");
    }
    const itemComId = items.find(item => item.id === id);
    if (!itemComId) {
        return res.status(404).send("Digite um ID existente na nossa aplicação");
    }
    res.send(itemComId);
});


app.listen(5000,()=>{
    console.log("rodando na porta 5000")
});