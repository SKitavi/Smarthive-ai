import { useState } from "react"
import axios from "axios"


const useFetch = () => {
    const url = 'http://localhost:5000/api/hierarchial'
    const [isLoading, setLoading] = useState(false)
    const [data, setData] = useState([])

    axios.get(url)
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
  return {isLoading, data}
}

export default useFetch