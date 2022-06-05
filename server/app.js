const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose')
const Station = require('./station')
const cors = require('cors')

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connect to MongoDB')
}).catch(error => {
  console.log(error)
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())


app.get('/', (req, res) => {
  res.render('index')
})

app.get('/total', async (req, res) => {
  const stations = await Station.find({})
  res.send(stations)
  //res.render('total', { data: stations })
})

app.post('/rent', async(req, res) => {
  const { id, number,rent } = req.body
  //number = Number(number)
  const findobj = await Station.findOne({ id })
  if (rent === "借車"){
    if (findobj) {
      if (Number(findobj.current_number) - number >= 0) {
        await Station.updateOne(findobj, { current_number: (findobj.current_number - number), returned: (findobj.returned + number) })
        res.send({ station:findobj.name, number, status: '借車成功' })
      }
      else if (Number(findobj.current_number) - number <= 0) {
        res.send({ station:findobj.name, number, status: '數量不足,無法借車' })
      }
    }
  }
  else {
    if (findobj) {
      await Station.updateOne(findobj, { current_number: (findobj.current_number + number), returned: (findobj.returned + number) })
      res.send({ station:findobj.name, number, status: '還車成功' })
    }
  }
})


app.listen(4000, () => {
  console.log('Server running on port 4000')
})