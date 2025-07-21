import Layout from "./Layout"

// src/pages/NoUserTypeFound.tsx
const NoUserTypeFound = () => {
  return (
    <Layout>
      <div className="text-center text-red-600 font-bold text-xl">
        No valid user type found. Please contact support.
      </div>
    </Layout>
  )
}

export default NoUserTypeFound
