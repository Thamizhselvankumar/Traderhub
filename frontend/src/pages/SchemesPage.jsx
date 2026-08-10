import { useQuery } from '@tanstack/react-query'
import { getSchemes } from '../api'
import { Tag, Calendar, Gift } from 'lucide-react'

const COLORS = ['from-blue-500 to-blue-700', 'from-emerald-500 to-emerald-700', 'from-orange-500 to-orange-700', 'from-purple-500 to-purple-700', 'from-rose-500 to-rose-700']

export default function SchemesPage() {
  const { data: schemes, isLoading } = useQuery({ queryKey: ['schemes'], queryFn: getSchemes })

  if (isLoading) return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {[1,2,3,4].map(i => <div key={i} className="h-40 rounded-2xl bg-gray-100 animate-pulse" />)}
    </div>
  )

  return (
    <div>
      <div className="flex items-center gap-2 mb-5">
        <Tag size={20} className="text-brand-600" />
        <h2 className="text-xl font-bold text-gray-800">Active Schemes</h2>
        <span className="badge bg-brand-100 text-brand-700 ml-1">{schemes?.length || 0} active</span>
      </div>

      {schemes?.length === 0 && (
        <div className="text-center py-20 text-gray-400">
          <Gift size={48} className="mx-auto mb-3 opacity-20" />
          <p>No active schemes right now</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {schemes?.map((s, i) => (
          <div key={s._id} className={`bg-gradient-to-br ${COLORS[i % COLORS.length]} rounded-2xl p-5 text-white`}>
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wide">{s.brand}</span>
                <h3 className="font-bold text-lg mt-2">{s.title}</h3>
                <p className="text-white/85 text-sm mt-1">{s.description}</p>
              </div>
              <Gift size={28} className="opacity-40 flex-shrink-0 ml-3" />
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
              {s.minOrder && (
                <p className="text-xs text-white/70">Min. order: ₹{s.minOrder}</p>
              )}
              <div className="flex items-center gap-1 text-xs text-white/70 ml-auto">
                <Calendar size={12} />
                Valid till {new Date(s.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
