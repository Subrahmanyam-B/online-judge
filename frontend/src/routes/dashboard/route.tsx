import instance from '@/api/axios'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect } from 'react'
// import api from "../../api/axios";

const Dashboard = () => {

  useEffect(() => {
    const fetch = async () => {
      console.log("cache")
      return await instance.get('/user').then((response) => {
        console.log(response.data)
      })
    }
    fetch();
  }, [])

  return (
    <div>
      <h1>Dashboard122</h1>

    </div>
  )
}

export const Route = createFileRoute('/dashboard')({
  component: Dashboard,
})
