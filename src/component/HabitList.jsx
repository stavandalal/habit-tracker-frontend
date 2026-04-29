import { useState, useEffect } from "react";
import axios from "axios";
import { FaFire } from "react-icons/fa";
import toast from "react-hot-toast";

export default function HabitList({ habits, fetchHabits }) {

  const handleToggle = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/habits/${id}/toggle`);
      await fetchHabits();
      toast.success("Habit toggled successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle habit");
    }
  };  

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

                 <button
              onClick={() => handleToggle(habit.id)}
              className="bg-green-500 px-3 py-1 rounded mt-2"
            >
              {habit.active ? "Mark Complete" : "Undo"}
            </button>
            </div>

          
          ))}

          
        </ul>
      )}
    </div>
  );
}