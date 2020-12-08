import { useState } from 'react'

const useAlertModal = () => {
  const [isAlert, setAlert] = useState(false)

  function toggleAlert(e) {
    setAlert((isAlert) => !isAlert)
  }

  return {
    isAlert,
    toggleAlert,
  }
}

export default useAlertModal
