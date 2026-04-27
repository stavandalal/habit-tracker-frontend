import { useState, React} from 'react'
import axios from 'axios';

const CreateHabit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('DAILY');

    const handleSubmit = async () =>{
        try{
            const response = await axios.post(
                'http://localhost:8080/api/habits',
                {
                    name,
                    description,
                    frequency
                }
            )
            console.log("Response: ", response.data)
            alert('Habit created successfully!');

            window.location.reload();

            //reset form
            setName('');
            setDescription('');
            setFrequency('DAILY');
            

        }catch(error){
            console.error("Error creating habit: ", error);
            alert('Failed to create habit. Please try again.');
        }
    }



  return (
    <div>
        <h2>Create Habit</h2>
        <input
        placeholder='Habit Name'
        value={name}
        onChange={(e)=> setName(e.target.value)}/>

        <br />

        <input
        placeholder='Description'
        value={description}
        onChange={(e)=> setDescription(e.target.value)}/>

        <br />
       <select value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
       </select>

       <button onClick={handleSubmit}>Create</button>
    </div>
  )
}

export default CreateHabit