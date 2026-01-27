import StatisticLine from './StatisticLine'

const Statistics = ({good, neutral, bad, all}) => {
    return (
        <>
            <table>
                <StatisticLine value={good} text='good' />
                <StatisticLine value={neutral} text='neutral' />
                <StatisticLine value={bad} text='bad' />
                <StatisticLine value={all} text='all' />
                <StatisticLine value={(good - bad) / all} text='average' />
                <StatisticLine value={(good / all) * 100 + ' %'} text='positive' />
            </table>
        </>
    )
}

export default Statistics