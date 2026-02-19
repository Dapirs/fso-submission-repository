const PersonForm = (props) => {
    console.log(props);
    return (
        <>
            <form onSubmit={props.submitForm}>
                <div>
                    name: <input
                    value={props.newName}
                    onChange={props.addPerson}
                />
                    <br/>
                    number: <input
                    value={props.newNumber}
                    onChange={props.addNumber}
                />
                </div>
                <div>
                    <button type="submit">add</button>
                    <button onClick={props.onReset}>reset</button>
                </div>
            </form>
        </>
    )
}

export default PersonForm