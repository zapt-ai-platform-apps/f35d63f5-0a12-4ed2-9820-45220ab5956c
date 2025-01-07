import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import WorkoutLog from './WorkoutLog';
import * as Sentry from '@sentry/browser';

export default function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWorkouts = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('workouts')
        .select('*')
        .order('date', { ascending: false })
        .limit(10);
      if (error) throw error;
      setWorkouts(data);
      Sentry.captureMessage('Fetched workouts successfully');
    } catch (error) {
      console.error('Error fetching workouts:', error);
      Sentry.captureException(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col h-full">
      <h1 className="text-3xl font-bold mb-4">Your Workouts</h1>
      <WorkoutLog onWorkoutAdded={fetchWorkouts} />
      {loading ? (
        <p className="mt-4">Loading workouts...</p>
      ) : (
        <ul className="mt-4 flex-1 overflow-y-auto">
          {workouts.map((workout) => (
            <li key={workout.id} className="border-b py-2">
              <p className="font-semibold">{workout.type}</p>
              <p>Duration: {workout.duration} minutes</p>
              <p>Date: {new Date(workout.date).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}