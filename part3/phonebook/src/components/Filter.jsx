import App from "./App.jsx";

const Filter = (props) => {
    return (
        <>
            filter: <input
            value={props.filter}
            onChange={props.handleFilter}
            /><br/>
        </>
    )
}

export default Filter