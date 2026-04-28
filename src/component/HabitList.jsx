import { useState, useEffect } from "react";
import axios from "axios";
import { FaFire } from "react-icons/fa";

export default function HabitList() {
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
    <div className="bg-gray-700 p-8">
      <h2 className="text-xl text-white mb-4">All Habits</h2>
      {habits.length === 0 ? (
        <p className="text-gray-400">No habits yet</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <div key={habit.id}
            className=" p-4 mb-3">

              <h3 className="text-lg flex item-center text-white gap-2">
                <FaFire className="text-orange-500"/>
                {habit.name}
              </h3>

              <p className="text-gray-400">{habit.description}</p>
               <span className="text-gray-400">{habit.frequency}</span>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}