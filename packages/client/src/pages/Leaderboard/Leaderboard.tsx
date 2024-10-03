import { FC, useMemo } from 'react'

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
import { data } from './mockData'
import styles from './Leaderboard.module.scss'
import { PathsRoutes } from '../../router/types'
import { ButtonLink } from '../../components/ButtonLink'
import NoImage from './NoImage.png'

export const Leaderboard: FC = () => {
  const rows = useMemo(
    () =>
      data
        .sort((a, b) => b.points - a.points)
        .map((item, idx) => ({ ...item, place: idx + 1 })),
    [data]
  )

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
              {rows.map(row => (
                <TableRow
                  key={`leaderboard-${row.name}`}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell scope="row">
                    <Box className={styles.place}>{row.place}</Box>
                  </TableCell>
                  <TableCell>
                    <Box className={styles.nameRow}>
                      <Box
                        component="img"
                        className={styles.image}
                        src={row.avatar ?? NoImage}
                      />
                      {row.name}
                    </Box>
                  </TableCell>
                  <TableCell>{row.points} очков</TableCell>
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
