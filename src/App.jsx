import CreateHabit from "./component/CreateHabit";
import HabitList from "./component/HabitList";
import { useState, useEffect } from "react";
import axios from "axios";
import { Toaster } from "react-hot-toast";


function App() {
  const [habits, setHabits] = useState([]);

  const fetchHabits = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/habits");
      setHabits(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);


  return (
    <div>
      <CreateHabit fetchHabits={fetchHabits} />
      <HabitList habits={habits} />
    </div>
  )

}

export default App;