import React, { useEffect } from 'react'
import styles from './YandexAuthButton.module.scss'
import { getOauthServiceId, userServiceIdSelector } from '@/ducks/user'
import { useSelector } from 'react-redux'
import { authYandexURL, redirectURL } from '@/api/constants'
import { useAppDispatch } from '@/ducks/store'
import { Button } from '@mui/material'
import { queryStringify } from '@/utils'

export const YandexAuthButton = () => {
  const serviceId = useSelector(userServiceIdSelector)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (serviceId) {
      const urlParams = queryStringify({
        response_type: 'code',
        client_id: serviceId,
        redirect_uri: redirectURL,
      })

      window.location.replace(`${authYandexURL}?${urlParams}`)
    }
  }, [serviceId])

  const handleOAuth = () => {
    dispatch(getOauthServiceId())
  }

  return (
    <Button
      onClick={handleOAuth}
      sx={{
        marginTop: '24px',
      }}
      variant="contained"
      fullWidth
      type="button">
      <div className={styles.logo}></div>
      Войти с Яндекс ID
    </Button>
  )
}
