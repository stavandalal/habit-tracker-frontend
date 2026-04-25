import { useState, React} from 'react'

const CreateHabit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('DAILY');



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

       <button>Create</button>
    </div>
  )
}

export default CreateHabit