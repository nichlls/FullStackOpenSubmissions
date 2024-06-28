import { useState } from "react";

const ChangeAnecdote = ({ nextAnecdote }) => {
  return (
    <div>
      <button onClick={nextAnecdote}>Next anecdote</button>
    </div>
  );
};

const VoteButton = ({ increaseVoteCount, voteCount }) => {
  return (
    <div>
      <p>{voteCount}</p>
      <button onClick={increaseVoteCount}>Vote</button>
    </div>
  );
};

const HighestVoteAnecdote = ({ highestAnecdote }) => {
  // console.log("highest: ", highestAnecdote);
  return (
    <div>
      <p>
        <strong>Anecdote with most votes</strong>
      </p>
      <p>{highestAnecdote}</p>
    </div>
  );
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnecdote = () => {
    let random = Math.floor(Math.random() * anecdotes.length);
    // Prevent same number
    while (random === selected) {
      random = Math.floor(Math.random() * anecdotes.length);
    }
    setSelected(random);
  };

  const increaseVoteCount = () => {
    // copy of votes array
    const tempVotes = [...votes];
    // console.log("temp votes: ", tempVotes);
    tempVotes[selected] += 1;
    // console.log("Temp votes [selected]", tempVotes[selected]);
    setVotes(tempVotes);
  };

  const highestAnecdote = () => {
    let highestAnecdote = Math.max(...votes);
    let index = votes.indexOf(highestAnecdote);
    highestAnecdote = anecdotes[index];
    return highestAnecdote;
  };

  return (
    <div>
      {anecdotes[selected]}
      <VoteButton
        increaseVoteCount={increaseVoteCount}
        voteCount={votes[selected]}
      />
      <ChangeAnecdote nextAnecdote={nextAnecdote} />
      <HighestVoteAnecdote highestAnecdote={highestAnecdote()} />
    </div>
  );
};

export default App;
