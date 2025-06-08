'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { User, ExerciseSummary, ExerciseData } from '@/types/training';

interface Props { initialUsers: User[] }
export default function TrainingHistory({ initialUsers }: Props) {
  const [step, setStep] = useState(1);
  const [users] = useState(initialUsers);
  const [selectedUser, setSelectedUser] = useState<number | null>(null);
  const [exercises, setExercises] = useState<ExerciseSummary[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [data, setData] = useState<ExerciseData[]>([]);

  useEffect(() => {
    if (step === 2 && selectedUser) {
      fetch(`/api/training/items?user=${selectedUser}`, { cache: 'no-store' })
        .then(r => r.json()).then(setExercises);
    }
  }, [step, selectedUser]);

  useEffect(() => {
    if (step === 3 && selectedUser && selectedExercise) {
      fetch(
        `/api/training/data?user=${selectedUser}&exercise=${encodeURIComponent(selectedExercise)}`,
        { cache: 'no-store' }
      ).then(r => r.json()).then(setData);
    }
  }, [step, selectedUser, selectedExercise]);

  return (
    <div className="max-w-md mx-auto p-4">
      {step === 1 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">사용자 선택</h2>
          <select className="border p-2 rounded" defaultValue="" onChange={e => setSelectedUser(+e.target.value)}>
            <option value="" disabled>선택하세요</option>
            {users.map(u => <option key={u.id} value={u.id}>{u.name}</option>)}
          </select>
          <button className="py-2 bg-blue-500 text-white rounded" disabled={!selectedUser} onClick={() => setStep(2)}>다음</button>
        </div>
      )}
      {step === 2 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">훈련 항목 선택</h2>
          <ul className="space-y-2">
            {exercises.map(ex => (
              <li key={ex.name}>
                <button className="w-full text-left border p-2 rounded" onClick={() => { setSelectedExercise(ex.name); setStep(3); }}>{ex.name}</button>
              </li>
            ))}
          </ul>
          <button className="py-2 border rounded" onClick={() => setStep(1)}>이전</button>
        </div>
      )}
      {step === 3 && (
        <div className="flex flex-col space-y-4">
          <h2 className="text-xl font-semibold">시각화 자료</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <button className="py-2 border rounded" onClick={() => setStep(2)}>이전</button>
        </div>
      )}
    </div>
  );
}