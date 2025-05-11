'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// 운동 항목 타입 정의
export type Exercise = {
  id: number;
  name: string;
  unit: 'Reps' | 'Sec';
  value: number;
  sets: number;
  rest: number;
};

export default function TrainingRegister() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | null>(new Date());
  const [exercises, setExercises] = useState<Exercise[]>([]);

  // 신규 운동 항목 임시 상태
  const [name, setName] = useState('');
  const [unit, setUnit] = useState<'Reps' | 'Sec'>('Reps');
  const [value, setValue] = useState(0);
  const [sets, setSets] = useState(1);
  const [rest, setRest] = useState(60);

  const addExercise = () => {
    if (!name || !value || !sets) return;
    setExercises(prev => [...prev, { id: Date.now(), name, unit, value, sets, rest }]);
    setName(''); setValue(0); setSets(1); setRest(60);
  };

  const removeExercise = (id: number) => {
    setExercises(prev => prev.filter(e => e.id !== id));
  };

  const handleRegister = async () => {
    await fetch('/api/training', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ date, exercises }),
      cache: 'no-store'
    });
    router.push('/training/history');
  };

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">훈련 일자 선택</h2>
          <DatePicker
            selected={date}
            onChange={d => setDate(d)}
            inline
            className="w-full"
          />
          <button
            className="w-full py-2 rounded bg-blue-500 text-white"
            onClick={() => setStep(2)}
          >다음</button>
        </div>
      )}

      {step === 2 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">훈련 내용 등록</h2>
          <input
            list="exercise-list"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="훈련 항목 입력"
            className="border p-2 rounded"
          />
          <datalist id="exercise-list">
            <option value="Pull-up" />
            <option value="20mm Hang" />
            <option value="Push-up" />
          </datalist>

          <div className="flex space-x-2">
            <select
              value={unit}
              onChange={e => setUnit(e.target.value as any)}
              className="border p-2 rounded flex-1"
            >
              <option value="Reps">Reps</option>
              <option value="Sec">Sec</option>
            </select>
            <input
              type="number"
              value={value}
              onChange={e => setValue(+e.target.value)}
              placeholder="값"
              className="border p-2 rounded flex-1"
            />
          </div>

          <div className="flex space-x-2">
            <input
              type="number"
              value={sets}
              onChange={e => setSets(+e.target.value)}
              placeholder="세트 수"
              className="border p-2 rounded flex-1"
            />
            <input
              type="number"
              value={rest}
              onChange={e => setRest(+e.target.value)}
              placeholder="휴식(sec)"
              className="border p-2 rounded flex-1"
            />
          </div>

          <button
            className="py-1 bg-green-500 text-white rounded"
            onClick={addExercise}
          >항목 추가</button>

          {exercises.length > 0 && (
            <ul className="space-y-2">
              {exercises.map(e => (
                <li key={e.id} className="flex justify-between items-center border p-2 rounded">
                  <div>
                    {e.name} - {e.value} {e.unit} x {e.sets} sets (Rest: {e.rest}s)
                  </div>
                  <button className="text-red-500" onClick={() => removeExercise(e.id)}>삭제</button>
                </li>
              ))}
            </ul>
          )}

          <div className="flex space-x-4">
            <button className="flex-1 py-2 rounded border" onClick={() => setStep(1)}>취소</button>
            <button className="flex-1 py-2 rounded bg-blue-500 text-white" onClick={() => setStep(3)}>다음</button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">성취도 입력</h2>
          {exercises.map(e => (
            <div key={e.id} className="flex justify-between items-center">
              <span>{e.name}</span>
              <select defaultValue="100" className="border p-2 rounded">
                <option value="40">40%</option>
                <option value="60">60%</option>
                <option value="80">80%</option>
                <option value="100">100%</option>
              </select>
            </div>
          ))}
          <div className="flex space-x-4">
            <button className="flex-1 py-2 rounded border" onClick={() => setStep(2)}>취소</button>
            <button className="flex-1 py-2 rounded bg-green-600 text-white" onClick={handleRegister}>등록</button>
          </div>
        </div>
      )}
    </div>
  );
}