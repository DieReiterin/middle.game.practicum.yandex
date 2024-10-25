import React, { useEffect } from 'react'
import styles from './YandexAuthButton.module.scss'
import { getServiceId, userServiceIdSelector } from '@/ducks/user'
import { useSelector } from 'react-redux'
import { authYandexURL, redirectURL } from '@/api/constants'
import { useAppDispatch } from '@/ducks/store'
import { Button } from '@mui/material'

export const YandexAuthButton = () => {
  const serviceId = useSelector(userServiceIdSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (serviceId)
      window.location.replace(
        `${authYandexURL}?response_type=code&client_id=${serviceId}&redirect_uri=${redirectURL}`
      )
  }, [serviceId])

  const handleOAuth = () => {
    dispatch(getServiceId())
  }

  return (
    <Button
      onClick={handleOAuth}
      sx={{ bgcolor: 'text.primary', marginTop: '24px' }}
      variant="contained"
      fullWidth
      type="button">
      <div className={styles.logo}></div>
      Войти с Яндекс ID
    </Button>
  )
}
