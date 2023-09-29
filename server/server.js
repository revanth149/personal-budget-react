const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

const fs= require('fs');
app.use(cors());
// app.use('/', express.static('public'));

// const budget = {
//     myBudget: [
//     {
//         title: 'Eat out',
//         budget:300
//     },
//     {
//         title: 'Rent',
//         budget: 350
//     },
//     {
//         title: 'Groceries',
//         budget: 90
//     },
//     ]
// };

const budget = JSON.parse(fs.readFileSync('budget.json'));

app.get('/hello',(req,res) => {
    res.send("Hello World!");
})




app.get('/budget',(req,res) => {
    res.json(budget);
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })