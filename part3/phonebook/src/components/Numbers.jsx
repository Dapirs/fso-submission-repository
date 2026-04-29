const Numbers = (props) => {
    return(
        <>
            <ul>
                {props.personsToShow.map((person)=>
                    <li>
                        {person.name} {person.number}
                        <button onClick={() => props.deleteContact(person.id)}>Delete</button>
                    </li>)}
            </ul>
        </>
    )
}

export default Numbers;