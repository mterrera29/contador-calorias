import { useState, useEffect } from 'react';
import { categories } from '../data/categories';
import type { Activity } from '../types';
import { ActivityActions, ActivityState } from '../reducers/activity-reducers';
import { v4 as uuidv4 } from 'uuid';

type FormProps = {
  dispatch: React.Dispatch<ActivityActions>;
  state: ActivityState;
};

const initialState: Activity = {
  id: uuidv4(),
  category: 1,
  name: '',
  calories: 0,
};

export default function Form({ dispatch, state }: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState);

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (act) => act.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const isNumber = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumber ? +e.target.value : e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });
    setActivity({ ...initialState, id: uuidv4() });
  };
  return (
    <form
      className='space-y-5 bg-white shadow p-10 rounded-lg'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='category' className='font-bold'>
          Categoría:
        </label>
        <select
          className='border border-slate-300 p-2 rounded-lg w-full bg-white'
          name=''
          id='category'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='name' className='font-bold'>
          Actividad
        </label>
        <input
          id='name'
          type='text'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Ej. Comida, Jugo de Naranza, Ensalada'
          value={activity.name}
          onChange={handleChange}
        />
      </div>
      <div className='grid grid-cols-1 gap-3'>
        <label htmlFor='calories' className='font-bold'>
          Calorias
        </label>
        <input
          id='calories'
          type='number'
          className='border border-slate-300 p-2 rounded-lg'
          placeholder='Calorias. Ej. 300 o 500'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>
      <input
        type='submit'
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase  text-white cursor-pointer disabled:bg-gray-400'
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  );
}
