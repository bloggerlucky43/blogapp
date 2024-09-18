import express from 'express';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;
let nameArray = [];
let titleArray = [];
let descArray = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './backend');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {
        titleArray: titleArray,
        descArray: descArray,
        nameArray: nameArray
    });
});

app.get('/submit-button', (req, res) => {
    res.render('create');
});

app.post('/submit', (req, res) => {
    const Name = req.body['Pname'];
    const title = req.body['Tname'];
    const desc = req.body['Dname'];

    nameArray.push(Name);
    titleArray.push(title);
    descArray.push(desc);
    console.log(nameArray);
    console.log(titleArray);
    console.log(descArray);
    res.redirect('/');
});

app.get('/delete/:id', (req, res) => {
    const index = parseInt(req.params.id, 10);

    if (index >= 0 && index < titleArray.length) {
        titleArray.splice(index, 1);
        nameArray.splice(index, 1);
        descArray.splice(index, 1);
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});
app.get('/edit/:id', (req, res) => {
    const index = parseInt(req.params.id, 10);

    if (index >= 0 && index < titleArray.length) {
        res.render('edit', {
            id: index,
            title: titleArray[index],
            desc: descArray[index],
            name: nameArray[index]
        });
    } else {
        res.status(404).send('Post not found');
    }
});

app.post('/edit/:id', (req, res) => {
    const index = parseInt(req.params.id, 10);
    const { title, desc, name } = req.body;

    if (index >= 0 && index < titleArray.length) {
        titleArray[index] = title;
        descArray[index] = desc;
        nameArray[index] = name;
        res.redirect('/');
    } else {
        res.status(404).send('Post not found');
    }
});



app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
