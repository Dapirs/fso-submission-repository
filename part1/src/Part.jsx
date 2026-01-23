const Part =(props) => {
    console.log(props);
    return (
        <p>{props.name} {props.exercise}</p>
    )
}

export default Part