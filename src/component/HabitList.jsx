import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { FaFire, FaTrash } from "react-icons/fa";

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


  const handleDelete = async (id) => {
  const confirmDelete = window.confirm("Delete this habit?");
  if (!confirmDelete) return;

  try {
    await axios.delete(`http://localhost:8080/api/habits/${id}`);
    await fetchHabits();
    toast.success("Habit deleted");
  } catch (err) {
    console.error(err);
    toast.error("Failed to delete habit");
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
  <div
    key={habit.id}
    className="p-4 mb-3 flex justify-between items-center bg-gray-800 rounded"
  >
    <div>
      <h3 className="text-lg flex items-center text-white gap-2">
        <FaFire className="text-orange-500" />
        {habit.name}
      </h3>

      <p className="text-gray-400">{habit.description}</p>
      <span className="text-gray-400">{habit.frequency}</span>
    </div>

    <div className="flex gap-3">
      <button
        onClick={() => handleToggle(habit.id)}
        className="bg-green-500 px-3 py-1 rounded"
      >
        {habit.active ? "Complete" : "Undo"}
      </button>

      <button
        onClick={() => handleDelete(habit.id)}
        className="text-red-500 hover:text-red-600"
      >
        <FaTrash />
      </button>
    </div>
  </div>
))}

          
        </ul>
      )}
    </div>
  );
}