require('dotenv').config();
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const mongoose = require('mongoose')

const Person = require('./models/person')


app.use(express.json())

app.use(morgan('tiny'))

app.use(cors())

app.use(express.static('build'))


app.get('/api/persons', (req,res) => {
    Person.find({}.then(persons => {
        res.json(persons)
    }))
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    
    if(!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number is missing'
        })
    } else if(persons.find(person => person.name === body.name)) {
        return res.status(400).json({
            error: 'name must be unique'
        })
    } else {
        const person = {
            id: Math.floor(Math.random() * (1000 - 0)),
            name: body.name,
            number: body.number
        }

        persons = persons.concat(person)

        res.json(person)
    }
    
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
