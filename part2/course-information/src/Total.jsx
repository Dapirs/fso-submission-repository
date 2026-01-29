const Total = ({parts}) =>{
    const total = parts.reduce((sum, exercise) => sum + exercise.exercises, 0)

    return (
        <p>Total of {total} exercises</p>
    )
}

export default Total