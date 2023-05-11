import { useState, useEffect } from 'react'
import axios from 'axios'

// 3010 포트 도메인
// URL 맨 뒤에 / (슬래시) 없어야 하므로 주의할 것
const EXPRESS_URL = 'https://db2023.run.goorm.site'

function SongTable() {
  const [items, setItem] = useState([])
  useEffect(() => {
    (async () => {
      const res = await axios.get(EXPRESS_URL + '/song')
      setItem(res.data)
    })()
  }, [])
  
  return (
    <table>
      <thead>
        <tr><th>리스트</th><th>제목</th><th>가수</th><th>선호도</th></tr>
      </thead>
      <tbody>
        { items.map( (song, i) => <tr key={i}>
            <td>{song.name}</td>
            <td>{song.title}</td>
            <td>{song.singer}</td>
            { 
              song.rating == null
              ? <td/>
              : <td><img src={process.env.PUBLIC_URL + `/images/${song.rating}.jpg`} alt='선호도'/></td>
            }
            </tr>) }
      </tbody>
    </table>
  )
}

export default SongTable