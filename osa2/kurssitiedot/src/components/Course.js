import React from 'react';

const Header = ({ course }) => {
  return <h2>{course}</h2>;
};

const Part = ({ parts }) => {
  return (
    <>
      {parts.map(part => (
        <p key={part.name}>
          {part.name} {part.exercises}
        </p>
      ))}
    </>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      <Part parts={parts} />
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((acc, cur) => acc + cur.exercises, 0);
  return <b>Total of {total} exercises</b>;
};

const Course = ({ courses }) => {
  return courses.map(course => (
    <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  ));
};

export default Course;
