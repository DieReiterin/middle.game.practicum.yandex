import { useLocation } from 'react-router-dom'

const useTopicData = () => {
  const location = useLocation()
  const topicData = location.state

  if (!topicData) {
    throw new Error('Ошибка: Данные темы не найдены.')
  }

  return topicData
}

export default useTopicData
