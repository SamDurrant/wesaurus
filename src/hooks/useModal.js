import { useState } from 'react'

const useModal = () => {
  const [isVisible, setIsVisible] = useState(false)

  function toggleModal(e) {
    setIsVisible((isVisible) => !isVisible)
  }

  return {
    isVisible,
    toggleModal,
  }
}

export default useModal
