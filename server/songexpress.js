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
  const sql = 'select * from song'
  
	db.query(sql, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json(rows)
	})
})

app.post('/song', (req, res) => {
	const sql = 'insert into song (title, singer, rating, lyrics) values (?, ?, ?, ?)'
	const song = [
		req.body.title,
		req.body.singer,
		req.body.rating,
		req.body.lyrics
	]

  db.query(sql, song, (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json({result: "success"})
	})
})

app.get("/song/delete/:id", (req, res) => {
  const sql = 'delete from song where id=?'
	
  db.query(sql, [ req.params.id ], (err, rows) => {
		if (err) {
			res.json({result: "error"})
			return console.log(err)
		}
		res.json({result: "success"})
	})
})

app.listen(port, () => {
  console.log(`서버 실행됨 (port ${port})`)
})