import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getSchemes, createScheme, updateScheme, deleteScheme } from '../../api'
import { Plus, Edit2, Trash2, X, Gift } from 'lucide-react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

function SchemeModal({ scheme, onClose }) {
  const qc = useQueryClient()
  const { register, handleSubmit } = useForm({
    defaultValues: scheme ? {
      ...scheme,
      validTill: scheme.validTill ? new Date(scheme.validTill).toISOString().split('T')[0] : ''
    } : {}
  })

  const mutation = useMutation({
    mutationFn: (data) => scheme ? updateScheme(scheme._id, data) : createScheme(data),
    onSuccess: () => { qc.invalidateQueries(['schemes']); toast.success('Scheme saved'); onClose() },
    onError: (err) => toast.error(err.message),
  })

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-gray-800">{scheme ? 'Edit Scheme' : 'Add Scheme'}</h3>
          <button onClick={onClose}><X size={20} className="text-gray-400" /></button>
        </div>
        <form onSubmit={handleSubmit(d => mutation.mutate(d))} className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-medium text-gray-600">Brand *</label>
              <input className="input mt-1" {...register('brand', { required: true })} placeholder="Surf Excel" />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600">Valid Till *</label>
              <input className="input mt-1" type="date" {...register('validTill', { required: true })} />
            </div>
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Scheme Title *</label>
            <input className="input mt-1" {...register('title', { required: true })} placeholder="Buy 6 Get 1 Free" />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea className="input mt-1 resize-none" rows={2} {...register('description')} placeholder="Details of the scheme..." />
          </div>
          <div>
            <label className="text-xs font-medium text-gray-600">Minimum Order (₹)</label>
            <input className="input mt-1" type="number" {...register('minOrder')} placeholder="2000" />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-outline flex-1">Cancel</button>
            <button type="submit" disabled={mutation.isPending} className="btn-primary flex-1">
              {mutation.isPending ? 'Saving...' : 'Save Scheme'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default function AdminSchemes() {
  const [modal, setModal] = useState(false)
  const qc = useQueryClient()
  const { data: schemes, isLoading } = useQuery({ queryKey: ['schemes'], queryFn: getSchemes })

  const deleteMutation = useMutation({
    mutationFn: deleteScheme,
    onSuccess: () => { qc.invalidateQueries(['schemes']); toast.success('Scheme deleted') },
  })

  return (
    <div>
      {modal !== false && (
        <SchemeModal scheme={modal === true ? null : modal} onClose={() => setModal(false)} />
      )}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold text-gray-800">Schemes</h2>
        <button onClick={() => setModal(true)} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Add Scheme
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4">
          {[1,2].map(i => <div key={i} className="h-36 bg-gray-100 rounded-2xl animate-pulse" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {schemes?.map(s => (
            <div key={s._id} className="card p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-brand-50 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Gift size={18} className="text-brand-600" />
                  </div>
                  <div>
                    <span className="badge bg-brand-100 text-brand-700 text-[10px]">{s.brand}</span>
                    <p className="font-semibold text-gray-800 mt-1">{s.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{s.description}</p>
                  </div>
                </div>
                <div className="flex gap-1 flex-shrink-0">
                  <button onClick={() => setModal(s)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={() => { if (confirm('Delete?')) deleteMutation.mutate(s._id) }}
                    className="p-1.5 rounded-lg hover:bg-red-50 text-red-400">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-50 flex justify-between text-xs text-gray-400">
                {s.minOrder && <span>Min. ₹{s.minOrder}</span>}
                <span>Valid till {new Date(s.validTill).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
            </div>
          ))}
          {schemes?.length === 0 && (
            <div className="col-span-2 py-16 text-center text-gray-400">No schemes yet. Add one!</div>
          )}
        </div>
      )}
    </div>
  )
}
