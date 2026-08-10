export default function EmptyState({ icon: Icon, title, subtitle, action }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      {Icon && <Icon size={52} className="text-gray-200 mb-4" />}
      <h3 className="text-base font-semibold text-gray-500">{title}</h3>
      {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
