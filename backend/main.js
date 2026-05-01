import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
const port = 3000

app.use(cors());
app.use(express.json());


app.post('/', (req, res) => {
  console.log(req.body);
  res.send('data recived  ')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
