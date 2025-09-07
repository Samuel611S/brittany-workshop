'use client'

import { useState, useEffect } from 'react'
import { useUser } from '@/lib/user-context'
import { useLanguage } from '@/lib/language-context'
import { useRouter } from 'next/navigation'
import { User, Mail, Phone, MapPin, Edit3, Save, X, ArrowLeft } from 'lucide-react'
import LanguageSwitcher from '@/components/LanguageSwitcher'

export default function ProfilePage() {
  const { user, updateUser } = useUser()
  const { language, t } = useLanguage()
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    bio: '',
    phone: '',
    location: '',
  })
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [showPasswordSection, setShowPasswordSection] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        bio: user.bio || '',
        phone: user.phone || '',
        location: user.location || '',
      })
    }
  }, [user])

  // Update the display name when form data changes
  const displayName = formData.firstName && formData.lastName 
    ? `${formData.firstName} ${formData.lastName}`
    : (user?.firstName && user?.lastName)
    ? `${user.firstName} ${user.lastName}`
    : user?.name || 'User'

  const handleSave = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        updateUser(data.user)
        setIsEditing(false)
      }
    } catch (error) {
      console.error('Profile update failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match')
      return
    }
    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters')
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch('/api/profile/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      })

      if (response.ok) {
        alert('Password updated successfully!')
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
        setShowPasswordSection(false)
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to update password')
      }
    } catch (error) {
      console.error('Password update failed:', error)
      alert('Failed to update password')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Please log in</h1>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gray-50">
      {/* Back Button and Title */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={() => router.back()}
                className="flex items-center text-gray-600 hover:text-gray-900 mr-3 sm:mr-4"
              >
                <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-1" />
                <span className="text-sm sm:text-base">{t.back}</span>
              </button>
              <h1 className="text-lg sm:text-xl font-semibold text-gray-900">
                {t.profile}
              </h1>
            </div>
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">{t.profile}</h1>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              {isEditing ? (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors text-sm sm:text-base"
                  >
                    <X size={14} className="sm:w-4 sm:h-4" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={isLoading}
                    className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 rounded-md transition-colors text-sm sm:text-base"
                  >
                    <Save size={14} className="sm:w-4 sm:h-4" />
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-md transition-colors text-sm sm:text-base"
                >
                  <Edit3 size={14} className="sm:w-4 sm:h-4" />
                  Edit Profile
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Profile Picture */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 bg-gray-200 rounded-full mx-auto mb-3 sm:mb-4 flex items-center justify-center">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} className="text-gray-400 sm:w-12 sm:h-12" />
                  )}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  {displayName}
                </h2>
                <p className="text-xs sm:text-sm text-gray-500">
                  {(user.firstName && user.lastName) || (formData.firstName && formData.lastName)
                    ? 'Full name set'
                    : 'Complete your profile below'
                  }
                </p>
                <p className="text-sm sm:text-base text-gray-600 break-all">{user.email}</p>
              </div>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                        placeholder="Enter your first name"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900">{user.firstName || 'Not set'}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                        placeholder="Enter your last name"
                      />
                    ) : (
                      <p className="text-sm sm:text-base text-gray-900">{user.lastName || 'Not set'}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Email
                  </label>
                  <p className="text-sm sm:text-base text-gray-900 break-all">{user.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                      placeholder="Enter your phone number"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900">{user.phone || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin size={14} className="inline mr-2 sm:w-4 sm:h-4" />
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                      placeholder="Enter your location"
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900">{user.location || 'Not set'}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <p className="text-sm sm:text-base text-gray-900">{user.bio || 'No bio provided'}</p>
                  )}
                </div>

                {/* Password Section */}
                <div className="border-t pt-4 sm:pt-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 sm:mb-4 gap-2">
                    <h3 className="text-base sm:text-lg font-medium text-gray-900">Password</h3>
                    <button
                      onClick={() => setShowPasswordSection(!showPasswordSection)}
                      className="text-blue-600 hover:text-blue-700 text-sm font-medium self-start sm:self-auto"
                    >
                      {showPasswordSection ? 'Cancel' : 'Change Password'}
                    </button>
                  </div>
                  
                  {showPasswordSection ? (
                    <div className="space-y-3 sm:space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          name="currentPassword"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                          placeholder="Enter current password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          name="newPassword"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                          placeholder="Enter new password"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          name="confirmPassword"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm sm:text-base"
                          placeholder="Confirm new password"
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                        <button
                          onClick={handlePasswordUpdate}
                          disabled={isLoading}
                          className="bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition-colors text-sm sm:text-base"
                        >
                          {isLoading ? 'Updating...' : 'Update Password'}
                        </button>
                        <button
                          onClick={() => {
                            setShowPasswordSection(false)
                            setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
                          }}
                          className="bg-gray-100 text-gray-700 px-3 sm:px-4 py-2 rounded-md hover:bg-gray-200 transition-colors text-sm sm:text-base"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-gray-600 text-sm">
                      Password: ••••••••
                      <span className="text-gray-500 ml-2">(Click "Change Password" to update)</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
