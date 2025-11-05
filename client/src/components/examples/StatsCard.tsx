import StatsCard from '../StatsCard'
import { Briefcase } from 'lucide-react'

export default function StatsCardExample() {
  return (
    <div className="max-w-sm">
      <StatsCard 
        title="Total Pekerjaan" 
        value={24} 
        icon={Briefcase}
        description="Pekerjaan aktif"
        trend={{ value: 12, isPositive: true }}
      />
    </div>
  );
}
