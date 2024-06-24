import { useState } from "react";

const Header = () => {
  return (
    <div>
      <p>
        <strong>Give Feedback</strong>
      </p>
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  let total = good + neutral + bad;

  if (total < 1) {
    return (
      <div>
        <p>
          <strong>Statistics</strong>
        </p>
        <p>No feedback given</p>
      </div>
    );
  }

  const calculateAverage = () => {
    let goodScore = good;
    let neutralScore = 0;
    let badScore = bad * -1;

    return (goodScore + neutralScore + badScore) / total;
  };

  return (
    <div>
      <p>
        <strong>Statistics</strong>
      </p>
      <p>Good: {good}</p>
      <p>Neutral: {neutral}</p>
      <p>Bad: {bad}</p>
      <p>All: {total}</p>
      <p>Average: {calculateAverage()}</p>
      <p>Positive: {(good / total) * 100}</p>
    </div>
  );
};

const GoodButton = ({ onClick }) => {
  return <button onClick={onClick}>Good</button>;
};

const NeutralButton = ({ onClick }) => {
  return <button onClick={onClick}>Neutral</button>;
};

const BadButton = ({ onClick }) => {
  return <button onClick={onClick}>Bad</button>;
};

const FeedbackButtons = ({ setGood, setNeutral, setBad }) => {
  return (
    <div>
      <GoodButton onClick={setGood} />
      <NeutralButton onClick={setNeutral} />
      <BadButton onClick={setBad} />
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGood = () => {
    setGood((good) => good + 1);
  };

  const handleNeutral = () => {
    setNeutral((neutral) => neutral + 1);
  };

  const handleBad = () => {
    setBad((bad) => bad + 1);
  };

  return (
    <div>
      <Header />
      <FeedbackButtons
        setGood={handleGood}
        setNeutral={handleNeutral}
        setBad={handleBad}
      />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
