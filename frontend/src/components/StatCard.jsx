export default function StatCard({ label, value, icon: Icon, colorClass = 'bg-blue-50 text-blue-600', trend }) {
  return (
    <div className="card p-5">
      <div className={`w-10 h-10 rounded-xl ${colorClass} flex items-center justify-center mb-3`}>
        <Icon size={20} />
      </div>
      <p className="text-2xl font-extrabold text-gray-800">{value}</p>
      <p className="text-xs text-gray-500 mt-0.5">{label}</p>
      {trend !== undefined && (
        <p className={`text-xs font-medium mt-2 ${trend >= 0 ? 'text-green-600' : 'text-red-500'}`}>
          {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}% vs last month
        </p>
      )}
    </div>
  )
}
