
"use client"
import React, { useState } from 'react'

interface FaultFormData {
  name: string
  machineName: string
  machineFault: string
  faultTime: string
  faultDescription: string
}

const User = () => {
  const [formData, setFormData] = useState<FaultFormData>({
    name: '',
    machineName: '',
    machineFault: '',
    faultTime: '',
    faultDescription: ''
  })

  const [errors, setErrors] = useState<Partial<FaultFormData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    if (errors[name as keyof FaultFormData]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Partial<FaultFormData> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    if (!formData.machineName.trim()) {
      newErrors.machineName = 'Machine name is required'
    }
    if (!formData.machineFault.trim()) {
      newErrors.machineFault = 'Machine fault is required'
    }
    if (!formData.faultTime) {
      newErrors.faultTime = 'Fault time is required'
    }
    if (!formData.faultDescription.trim()) {
      newErrors.faultDescription = 'Fault description is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/issue/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit fault report')
      }

      setFormData({
        name: '',
        machineName: '',
        machineFault: '',
        faultTime: '',
        faultDescription: ''
      })
      
      alert('Fault report submitted successfully!')
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(error instanceof Error ? error.message : 'Failed to submit fault report')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Machine Fault Report</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your name"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label htmlFor="machineName" className="block text-sm font-medium text-gray-700 mb-2">
                Machine Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="machineName"
                name="machineName"
                value={formData.machineName}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.machineName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter machine name"
              />
              {errors.machineName && (
                <p className="mt-1 text-sm text-red-500">{errors.machineName}</p>
              )}
            </div>

            <div>
              <label htmlFor="machineFault" className="block text-sm font-medium text-gray-700 mb-2">
                Machine Fault <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="machineFault"
                name="machineFault"
                value={formData.machineFault}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.machineFault ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter fault type"
              />
              {errors.machineFault && (
                <p className="mt-1 text-sm text-red-500">{errors.machineFault}</p>
              )}
            </div>

            <div>
              <label htmlFor="faultTime" className="block text-sm font-medium text-gray-700 mb-2">
                Fault Time <span className="text-red-500">*</span>
              </label>
              <input
                type="datetime-local"
                id="faultTime"
                name="faultTime"
                value={formData.faultTime}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition ${
                  errors.faultTime ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.faultTime && (
                <p className="mt-1 text-sm text-red-500">{errors.faultTime}</p>
              )}
            </div>

            <div>
              <label htmlFor="faultDescription" className="block text-sm font-medium text-gray-700 mb-2">
                Fault Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="faultDescription"
                name="faultDescription"
                value={formData.faultDescription}
                onChange={handleChange}
                rows={2}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none ${
                  errors.faultDescription ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe the machine fault in detail"
              />
              {errors.faultDescription && (
                <p className="mt-1 text-sm text-red-500">{errors.faultDescription}</p>
              )}
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition duration-200 ${
                  isSubmitting
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-blue-700 active:bg-blue-800'
                }`}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Fault Report'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default User