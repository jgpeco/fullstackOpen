import React from 'react'

const Sum = ({parts}) => {
  const sum = parts.reduce((total, part) => total += part.exercises, 0)

  return <p>total of exercises: {sum}</p>
}

const Part = ({part}) => <p>{part.name} {part.exercises}</p>

const Content = ({courseContent}) => {
	return (
	<>
	{courseContent.map((part) => 
		<Part key={part.id} part={part} />
	)}
	</>
	)
}

const Header = ({courseName}) => <h1>{courseName}</h1>

const Course = ({course}) => {
	return (
    <div>
      <Header courseName={course.name} />
	  <Content courseContent={course.parts} />
      <Sum parts={course.parts} />
    </div>
		
	)
}

export default Course