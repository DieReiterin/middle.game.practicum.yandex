import { useEffect } from 'react'

import { PageInitArgs, useAppDispatch, useStore } from '@/ducks/store'
import { PageCookies } from '@/router'

type PageProps = {
  initPage: (data: PageInitArgs) => Promise<unknown>
}

export const usePage = ({ initPage }: PageProps) => {
  const dispatch = useAppDispatch()
  const store = useStore()

  useEffect(() => {
    initPage({ dispatch, state: store.getState() })
  }, [])
}
