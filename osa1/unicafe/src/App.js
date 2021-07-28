import React, { useState } from 'react';

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
);

const StatisticLine = ({ value, text }) => (
  <tr>
    <td>{text}:</td>
    <td>{value}</td>
  </tr>
);

const Statistics = ({
  good,
  neutral,
  bad,
  allClicks,
  countAverage,
  countPositives,
}) => {
  return !allClicks.length ? (
    <p>No feedback given</p>
  ) : (
    <table>
      <tbody>
        <StatisticLine value={good} text="Good" />
        <StatisticLine value={neutral} text="Neutral" />
        <StatisticLine value={bad} text="Bad" />
        <StatisticLine value={allClicks.length} text="All" />
        <StatisticLine value={countAverage} text="Average" />
        <StatisticLine value={countPositives} text="Positive" />
      </tbody>
    </table>
  );
};

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [allClicks, setAll] = useState([]);

  const handleGood = () => {
    setGood(good + 1);
    setAll(allClicks.concat('1'));
  };
  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setAll(allClicks.concat('0'));
  };
  const handleBad = () => {
    setBad(bad + 1);
    setAll(allClicks.concat('-1'));
  };

  function countAverage() {
    return allClicks.reduce((a, b, _, arr) => a + b / arr.length, 0).toFixed(2);
  }

  function countPositives() {
    return `${(good / allClicks.length).toFixed(2)}%`;
  }

  // Anecdotes part
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
  ];
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));
  const copy = [...points];
  const [topPoints, setTopPoints] = useState(0);

  const handleAnecdote = () => {
    setSelected(Math.trunc(anecdotes.length * Math.random()));
  };

  const voteAnecdote = () => {
    copy[selected] += 1;
    // console.log(copy);
    setPoints(copy);
    setTopPoints(
      copy.reduce(
        (maxIndex, curValue, i, arr) =>
          curValue > arr[maxIndex] ? i : maxIndex,
        0
      )
    );
  };

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />

      <h1>Statistics</h1>
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        allClicks={allClicks}
        countAverage={countAverage()}
        countPositives={countPositives()}
      />

      <h1>Anecdotes</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {points[selected]} votes</p>
      <Button handleClick={voteAnecdote} text="Vote" />
      <Button handleClick={handleAnecdote} text="Next anecdote" />

      <h1>Top Anecdote</h1>
      <p>{anecdotes[topPoints]}</p>
      <p>has {points[topPoints]} votes</p>
    </div>
  );
};

export default App;
