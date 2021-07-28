import React from 'react';

const Header = props => {
  return <h1>{props.course}</h1>;
};

const Part = props => {
  return (
    <>
      {props.parts.map(part => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Content = props => {
  return (
    <div>
      <Part parts={props.parts} />
    </div>
  );
};

const Total = props => {
  let total = props.parts[0].exercises;
  const numOfExercises = props.parts.reduce((acc, cur) => {
    total += cur.exercises;
    return total;
  });
  return <p>Number of exercises {numOfExercises}</p>;
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
      },
      {
        name: 'State of a component',
        exercises: 14,
      },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

export default App;
