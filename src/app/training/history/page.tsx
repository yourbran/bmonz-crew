import TrainingHistory from '@/components/TrainingHistory';

export default async function Page() {
  const res = await fetch('http://localhost:3000/api/users', { cache: 'no-store' });
  const users = await res.json();
  return <TrainingHistory initialUsers={users} />;
}