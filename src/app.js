const path = require('path')
const express = require('express')
const fs = require('fs')
const hbs = require('hbs')

const app = express()
const PORT = process.env.port || 3000;
const publicDirectoryPath = path.join(__dirname, '../public')
app.use(express.json());

const viewsPath = path.join(__dirname, '../templates/views')

app.set('view engine', 'hbs')
app.use(express.static(publicDirectoryPath))

app.set('views', viewsPath)

app.get('', (req, res) => {
    res.render('index')
})

app.get('/getitems', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    console.log(data);
    res.json(data);

})

app.post('/setitem', (req, res) => {
    const data = JSON.parse(fs.readFileSync('db.json'));
    console.log(data.items);
    console.log(req.body.newitem);
    data.items[data.items.length] = req.body.newitem
    console.log(data)

    fs.writeFileSync('db.json', JSON.stringify(data))
    res.status(200).json({msg: "item saved"});

})

app.listen(PORT, () => {
    console.log('Server is up on port:' +3000)
}) 