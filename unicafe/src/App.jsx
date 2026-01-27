import { useState } from 'react'
import Statistics from './Statistics.jsx'
import Button from './Button'

function App() {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const goodClick = () => setGood(good + 1)
    const neutralClick = () => setNeutral(neutral + 1)
    const badClick = () => setBad(bad + 1)

    const all = good + neutral + bad
    return (
        <>
            <h1>Give Feedback</h1>
            <Button onClick = {goodClick} text='good'/>
            <Button onClick = {neutralClick} text='neutral'/>
            <Button onClick = {badClick} text='bad'/>
            <h1>statistics</h1>
            {
                all === 0 ? <p>No feedback given</p> : <Statistics
                good = {good}
                neutral = {neutral}
                bad = {bad}
                all = {all}
            />
            }
        </>
    )
}

export default App
