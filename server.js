const express = require('express')
let budget = require('./data.js')
const bodyParser = require('body-parser')

const app = express()
const PORT = 4001;

app.listen(PORT, ()=>{
    console.log('listening on port 4001')
})

app.use(bodyParser.json())

app.use('/:id', (req, res, next)=>{
    const id = req.params.id;
    // budget = budget[id];
    const find = budget.find(item => {return item.id === Number(id)});
    console.log(find);
    req.find = find;
    next();
})

app.get('/', (req, res, next)=>{
    res.send('Hello World')
})

app.get('/:id/Budget', (req, res, next)=>{
    res.status(200).send(req.find);
})

app.put('/:id/setBudget', (req, res, next)=>{
    console.log(req.body);
    req.find = req.body;
    res.status(200).send(req.find);
});

app.put('/:id/setBudget/:type', (req, res, next)=>{
    console.log(req.body);
    const type = req.params.type;
    req.find[type] = req.body.num;

    res.status(200).send(req.find);
})

app.post('/:id/setNewBudget', (req, res, next)=>{
    const type = req.body.type;
    const num = req.body.num;
    req.find[type] = num;
    res.status(200).send(req.find);
})

app.delete('/:id/deleteWhole', (req, res, next)=>{
    const id = Number(req.params.id);
    const deleteIndex = budget.findIndex(item =>{return item.id === id});
    console.log(deleteIndex);
    budget.splice(deleteIndex, 1);
    res.status(200).send(budget);
})
