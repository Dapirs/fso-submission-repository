import Filter from "./Filter";
import PersonForm from "./PersonForm.jsx";
import Numbers from "./Numbers.jsx";
import axios from "axios";

import { useState, useEffect } from 'react'

const App = () => {
    let i=0
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [filter, setFilter] = useState('')

    useEffect(() =>{
        axios.get("http://localhost:3001/persons")
            .then(response => {
                setPersons(response.data);
            })
    }, [])

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
        setPersons([])
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
            <Numbers
                personsToShow={personsToShow}
            />
        </>

    )
}

export default App