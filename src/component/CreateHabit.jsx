import React,{ useState} from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaPlus } from 'react-icons/fa';

const CreateHabit = () => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [frequency, setFrequency] = useState('DAILY');

    const handleSubmit = async () =>{
if(!name.trim()){
    toast.error('Habit name is required!');
    return;
}

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

            toast.success('Habit created successfully!');

            setName('');
            setDescription('');
            setFrequency('DAILY');

            

        }catch(error){
            console.error("Error creating habit: ", error);
            toast.error('Failed to create habit. Please try again.');
        }
    }



  return (
    <div className='bg-gray-800 p-8 shadow-md'>
        <h2 className='text-xl text-white mb-4'>Create Habit</h2>
        <input 
        className='w-full text-white placeholder:text-gray-500 p-2 mb-3 bg-gray-700 rounded'
        placeholder='Habit Name'
        value={name}
        onChange={(e)=> setName(e.target.value)}/>

        <br />

        <input
        className='w-full text-white placeholder:text-gray-500 p-2 mb-3 bg-gray-700 rounded'
        placeholder='Description'
        value={description}
        onChange={(e)=> setDescription(e.target.value)}/>

        <br />
       <select className='w-full text-white placeholder:text-gray-500 p-2 mb-3 bg-gray-700 rounded' value={frequency} onChange={(e)=> setFrequency(e.target.value)}>
        <option value="DAILY">Daily</option>
        <option value="WEEKLY">Weekly</option>
        <option value="MONTHLY">Monthly</option>
       </select>

       <button className='flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white p-2 rounded' onClick={handleSubmit}>
        Create
       </button>


    </div>
  )
}

export default CreateHabit;