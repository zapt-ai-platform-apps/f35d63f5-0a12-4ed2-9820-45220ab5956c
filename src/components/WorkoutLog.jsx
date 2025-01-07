import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import * as Sentry from '@sentry/browser';

export default function WorkoutLog({ onWorkoutAdded }) {
  const [type, setType] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!type || !duration || !date) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workouts')
        .insert([
          { type, duration: Number(duration), date }
        ]);
      if (error) throw error;
      setType('');
      setDuration('');
      setDate('');
      onWorkoutAdded();
      Sentry.captureMessage('Workout logged successfully');
    } catch (error) {
      console.error('Error adding workout:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
      <input
        type="text"
        className="box-border p-2 border rounded"
        placeholder="Workout Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        required
      />
      <input
        type="number"
        className="box-border p-2 border rounded"
        placeholder="Duration (minutes)"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        required
      />
      <input
        type="date"
        className="box-border p-2 border rounded"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button
        type="submit"
        className="cursor-pointer bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Logging...' : 'Log Workout'}
      </button>
    </form>
  );
}