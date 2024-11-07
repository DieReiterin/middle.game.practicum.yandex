import { FC, useEffect, useState } from 'react'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import styles from './Leaderboard.module.scss'
import { PathsRoutes } from '@/router/types'
import { ButtonLink } from '@/components/ButtonLink'
import { getLeaderboard } from '@/ducks/user'
import { useAppDispatch } from '@/ducks/store'

interface leaderboardParamsType {
  ratingFieldName: string
  cursor: number
  limit: number
}

interface LeaderboardItem {
  data: {
    myField: string
    otherField: number
  }
}

interface Meta {
  requestStatus: 'pending' | 'fulfilled' | 'rejected'
}

interface LeaderboardResponse {
  meta: Meta
  payload: LeaderboardItem[]
}

export const Leaderboard: FC = () => {
  const dispatch = useAppDispatch()
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([])

  const leaderboardParams: leaderboardParamsType = {
    ratingFieldName: 'otherField',
    cursor: 0,
    limit: 10,
  }

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const result = (await dispatch(
        getLeaderboard(leaderboardParams),
      )) as LeaderboardResponse

      if (result.meta.requestStatus === 'fulfilled') {
        setLeaderboardData(result.payload)
      }
    }

    fetchLeaderboard()
  }, [dispatch])

  return (
    <Box className={styles.wrapper}>
      <Box className={styles.main}>
        <Typography variant="h5" align="center" sx={{ marginBottom: '16px' }}>
          Лидерборд
        </Typography>
        <TableContainer
          sx={{ color: 'text.secondary' }}
          className={styles.tableContainer}>
          <Table stickyHeader className={styles.table}>
            <TableHead className={styles.tableHead}>
              <TableRow>
                <TableCell>Место</TableCell>
                <TableCell>Игрок</TableCell>
                <TableCell>Очки</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className={styles.tableBody}>
              {leaderboardData.map((row, index) => (
                <TableRow
                  key={`leaderboard-${index}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell scope="row">
                    <Box className={styles.place}>{index + 1}</Box>
                  </TableCell>
                  <TableCell>{row.data.myField}</TableCell>
                  <TableCell>{row.data.otherField}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <ButtonLink
          sx={{ marginTop: 'auto', width: '100px' }}
          disableElevation={true}
          variant="contained"
          to={PathsRoutes.Main}>
          Назад
        </ButtonLink>
      </Box>
    </Box>
  )
}
