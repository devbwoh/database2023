import express from "express"
import mysql from "mysql"
import bodyParser from "body-parser"
import cors from "cors"

import dbconf from "./conf/auth.js"

const app = express()
const port = 3010

const db = mysql.createConnection(dbconf)

db.connect()

app.use(cors())
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({result: "success"})
})

app.get('/song', (req, res) => {
  const sql = 'SELECT name, title, singer, rating FROM playlist \
  LEFT JOIN listsong ON playlist.id = listsong.listid \
  LEFT JOIN song ON listsong.songid = song.id'
  
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

app.listen(port, () => {
  console.log(`서버 실행됨 (port ${port})`)
})