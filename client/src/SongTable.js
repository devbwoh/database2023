import { useState, useEffect } from 'react'
import axios from 'axios'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Fab from '@mui/material/Fab';
import RefreshIcon from '@mui/icons-material/Refresh';


// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://db2023.run.goorm.site'

function SongTable() {
  const [items, setItems] = useState([])
  useEffect(() => {
    refresh()
  }, [])
  
  async function refresh() {
    const res = await axios.get(EXPRESS_URL + '/song')
    console.log(res.data)
    setItems(res.data)
  }
  
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <Fab color="primary"
        sx={{
          position: "fixed",
          top: (theme) => theme.spacing(2),
          right: (theme) => theme.spacing(2)
        }}
        onClick={() => { refresh() }}>
        <RefreshIcon />
      </Fab>
      <TableContainer sx={{ maxHeight: 545 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>리스트</TableCell>
              <TableCell>제목</TableCell>
              <TableCell>가수</TableCell>
              <TableCell>선호도</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            { items.map( (song, i) => <TableRow hover role="checkbox" key={i}>
                <TableCell>{song.name}</TableCell>
                <TableCell>{song.title}</TableCell>
                <TableCell>{song.singer}</TableCell>
                { 
                  song.rating == null
                  ? <TableCell/>
                  : <TableCell><img src={process.env.PUBLIC_URL + `/images/${song.rating}.jpg`} alt='선호도'/></TableCell>
                }
                </TableRow>) }
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  )
}

export default SongTable