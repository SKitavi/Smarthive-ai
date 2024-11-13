import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"


const useFetch = () => {
    const url = 'http://localhost:5000/api/clusters'
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(()=>{
        setLoading(true)
        axios.get(url)
        .then(res => setData(res.data))
        .catch(err => {
            setError(err?.message)
            toast.error("Failed to fetch clusters.")
        })
        .finally(() => setLoading(false))
    }, [])
  return {isLoading, data, error}
}

export default useFetch