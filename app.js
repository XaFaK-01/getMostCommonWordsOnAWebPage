const express = require("express")

const app = express()

const getMostCommonWordsPlusCount = require("./helpers/getMostCommonWordsPlusCount")

// BodyParser for parsing data in req.body
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get("/getmostcommonwords", async function (req, res) {
  const url = req.query?.url

  if (!url)
    res.status(400).json({
      msg: "Please provide a url in the query parameters! e.g. /getmostcommonwords?url=https://www.wikipedia.com",
    })
  else {
    const response = await getMostCommonWordsPlusCount(url)
    res.status(response.status).json(response.data)
  }
})

const PORT = 3000

app.listen(PORT, console.log(`Server running on port ${PORT}.`))
