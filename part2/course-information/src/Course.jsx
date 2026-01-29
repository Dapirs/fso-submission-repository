import Header from './Header.jsx';
import Content from './Content.jsx'
import Total from './Total.jsx'

const Course = ({course}) => {
    console.log(course);
    return (
        <>
            <Header name={course.name}/>
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

export default Course;