import React from 'react'

interface Props {
  name?: string;
}

const WelcomeCard: React.FC<Props> = ({ name }) => {
  return (
     <div className="mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {name}!
          </h1>
          <p className="text-gray-600">Manage your platform and oversee all activities</p>
        </div>
      </div>
  )
}

export default WelcomeCard
