import Filter from "./Filter";
import PersonForm from "./PersonForm.jsx";

import { useState } from 'react'

const App = () => {
    let i=0
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [filter, setFilter] = useState('')

    const addPerson = (e) => {
        setNewName(e.target.value)
    }

    const addNumber = (e) => {
        setNumber(e.target.value)
    }

    const handleFilter = (e) => {
        setFilter(e.target.value)
    }

    const submitForm = (e) => {
        e.preventDefault()
        const person = {
            name: newName,
            number: newNumber
        }
        const nameExists = persons.some((p) => p.name === person.name)
        if (nameExists){
            alert("Name already exists!")
        } else {
            setPersons(persons.concat(person))
        }
        setNewName('')
        setNumber('')
    }

    const personsToShow = filter === '' ? persons : persons.filter((person) => person.name.includes(filter))

    const onReset = () => {
        setPersons([{ name: 'Arto Hellas', number: 9066644666 }])
    }

    console.log(persons);
    return (
        <>
            <div>
                <h2>Phonebook</h2>
                <Filter
                    filter={filter}
                    handleFilter={handleFilter}
                />
                <h2>Add new contacts</h2>
                <PersonForm
                    submitForm={submitForm}
                    addPerson={addPerson}
                    addNumber={addNumber}
                    newName={newName}
                    newNumber={newNumber}
                    onReset={onReset}
                />
                <h2>Numbers</h2>
            </div>
            <ul>
                {personsToShow.map((person)=> <li>{person.name} {person.number}</li>)}
            </ul>
        </>

    )
}

export default App