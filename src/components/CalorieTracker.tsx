import type { Activity } from '../types';
import CalorieDisplay from './CalorieDisplay';
type CalorieTrackerProps = {
  activities: Activity[];
};

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  const caloriesConsumed = activities.reduce(
    (acum, activity) =>
      activity.category === 1 ? acum + activity.calories : acum,
    0
  );
  const caloriesBurned = activities.reduce(
    (acum, activity) =>
      activity.category === 2 ? acum + activity.calories : acum,
    0
  );
  const netCalories = caloriesConsumed - caloriesBurned;
  return (
    <>
      <h2 className='text-4xl font-black text-whit text-center'>
        Resumen de Calorias
      </h2>
      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
        <CalorieDisplay calories={caloriesConsumed} text='consumidas' />
        <CalorieDisplay calories={caloriesBurned} text='quemadas' />
        <CalorieDisplay calories={netCalories} text='diferencia' />
      </div>
    </>
  );
}
