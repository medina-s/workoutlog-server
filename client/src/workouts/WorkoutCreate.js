import React, { useEffect, useState } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';


const WorkoutCreate = (props) => {
    const [description, setDescription] = useState('');
    const [definition, setDefinition] = useState('');
    const [result, setResult] = useState ('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3000/workout/create`, {
            method: 'POST',
            body: JSON.stringify({workout: {description: description, definition: definition, result: result}}),
            headers: new Headers({
                'Content-type': 'application/json',
                'Authorization': `Bearer ${props.token}`
            })
        }).then((res)=> res.json())
        .then((logData) => {
            console.log(logData);
            setDescription('');
            setDefinition('');
            setResult('');
            props.fetchWorkouts();
        })
    }

    return(
        <>
        <h3>Log a Workout</h3>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="description"/>
                <Input name="description" value={description} onChange={(e)=> setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="definition"/>
                <Input name="definition" value={definition} onChange={(e)=> setDefinition(e.target.value)}>
                    <option value="Time">Time</option>
                    <option value="Weight">Weight</option>
                    <option value="Distance">Distance</option>
                </Input>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="result"/>
                <Input name="result" value={result} onChange={(e)=> setResult(e.target.value)}/>
            </FormGroup>
            <button type="submit">Click to submit</button>
        </Form>
        </>
    )
}

export default WorkoutCreate;