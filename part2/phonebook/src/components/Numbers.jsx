const Numbers = (props) => {
    return(
        <>
            <ul>
                {props.personsToShow.map((person)=> <li>{person.name} {person.number}</li>)}
            </ul>
        </>
    )
}

export default Numbers;