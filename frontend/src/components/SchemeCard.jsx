import { Calendar, Gift } from 'lucide-react'

const GRADIENTS = [
  'from-blue-500 to-blue-700',
  'from-emerald-500 to-emerald-700',
  'from-orange-500 to-orange-700',
  'from-purple-500 to-purple-700',
  'from-rose-500 to-rose-700',
]

export default function SchemeCard({ scheme, index = 0 }) {
  const gradient = GRADIENTS[index % GRADIENTS.length]
  const isExpiringSoon = new Date(scheme.validTill) - new Date() < 3 * 24 * 60 * 60 * 1000

  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 text-white`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-[10px] font-bold bg-white/20 px-2.5 py-1 rounded-full uppercase tracking-wide">
            {scheme.brand}
          </span>
          {isExpiringSoon && (
            <span className="ml-2 text-[10px] font-bold bg-yellow-400/80 text-yellow-900 px-2 py-0.5 rounded-full">
              Ending soon!
            </span>
          )}
          <h3 className="font-bold text-base mt-2">{scheme.title}</h3>
          <p className="text-white/85 text-sm mt-1">{scheme.description}</p>
        </div>
        <Gift size={26} className="opacity-40 flex-shrink-0 ml-3" />
      </div>
      <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
        {scheme.minOrder > 0 && (
          <p className="text-xs text-white/70">Min. order: ₹{scheme.minOrder}</p>
        )}
        <div className="flex items-center gap-1 text-xs text-white/70 ml-auto">
          <Calendar size={12} />
          Valid till {new Date(scheme.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
        </div>
      </div>
    </div>
  )
}
