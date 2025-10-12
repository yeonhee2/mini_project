import { useNavigate } from "react-router-dom"

const UseNavi = () => {
  const navigate = useNavigate()

  const goIndex = () => {
    navigate('/')
  }

  const goTo = (path, state) => {
    navigate(path, {state})
  }

  return {goIndex, goTo}
}

export default UseNavi