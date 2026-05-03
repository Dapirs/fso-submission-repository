import express from 'express'
import {nanoid} from 'nanoid'
import morgan from 'morgan'
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors());

let persons=[
    {
        "id": "1",
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": "2",
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": "3",
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": "4",
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
]

const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)
app.use(morgan('dev'));

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const contact = persons.find(person => person.id=== id)
    if (contact) {
        res.send(contact)
    }else{
        res.statusMessage = "Contact not found"
        res.status(404).end()
    }
})

app.get('/info', (req, res) => {
    res.send(`
            <p>Phonebook has info for ${persons.length} people </p>
            <p>${new Date().toString()}</p>
    `)

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const contact = persons.filter(person => person.id !== id)
    persons=contact
    res.send(persons)
})

app.post('/api/persons', (req, res) => {
    const body = req.body;
    let newNameExists = persons.find(person => person.name === body.name);
    if (!body.name || !body.number) {
        return res.status(400).json({error: 'Content not found'});
    }
    if (newNameExists) {
        return res.status(409).json({error: 'Name already exists'});
    }

    const person = {
        id: nanoid(),
        ...body
    }
    persons=persons.concat(person)
    res.json(person)
})

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})

