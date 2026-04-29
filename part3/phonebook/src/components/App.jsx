import Filter from "./Filter";
import PersonForm from "./PersonForm.jsx";
import Numbers from "./Numbers.jsx";
import contactService from '../services/notes.js'
import Notification from "./Notification.jsx"

import { useState, useEffect } from 'react'

const App = () => {
    let i=0
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNumber] = useState('')
    const [filter, setFilter] = useState('')
    const [displayChange, setDisplayChange] = useState('')

    useEffect(() =>{
        contactService.getAll()
            .then(initialContact => {
                setPersons(initialContact);
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
        const newNameExists = persons.find((personName) => personName.name === person.name)
        const changedContact = {...newNameExists, number: person.number}


            if (newNameExists) {
                if (newNameExists.number !== person.number){
                    if (window.confirm("This name already exists. Are you sure you want to modify the number?")) {
                        contactService.update(newNameExists.id, changedContact).then((returnedContact) => {
                            setPersons(persons.map((p) => p.id === newNameExists.id ? returnedContact : p))
                        }).then(() => {
                            setDisplayChange(`${newNameExists.name}'s contact is updated.`)
                            setTimeout(() => {
                                setDisplayChange(null)
                            }, 5000)
                        }).catch(error => {
                            setTimeout(() => {
                                setDisplayChange(`${newNameExists.name}'s contact does not exist or is already deleted from the server.`)
                            }, 5000)
                        })
                    }
                } else {
                    alert("Name already exists! ")
                }
            }
            else{
                contactService.create(person).then(returnedContact => {
                        setPersons(persons.concat(returnedContact))
                    }).then(() => {
                    setDisplayChange(`A contact named ${person.name} is added.`)
                    setTimeout(() => {
                        setDisplayChange(null)
                    }, 5000)
                })
            }
        setNewName('')
        setNumber('')
    }

    const deleteContact = (id) =>{

            if (window.confirm('Are you sure you want to delete?')) {
                contactService.remove(id).then(() => {
                setPersons(prev => prev.filter(person => person.id !== id))
            })

        }
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
                <Notification message={displayChange}/>
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
                deleteContact = {deleteContact}
            />
        </>

    )
}

export default App