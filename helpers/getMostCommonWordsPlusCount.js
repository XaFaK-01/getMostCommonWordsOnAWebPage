const axios = require("axios")
const jsdom = require("jsdom")
const { JSDOM } = jsdom

// Async function for fetching, parsing and calculating number of words on a web page
const getMostCommonWordsPlusCount = async (url) => {
  try {
    const response = await axios.get(url)

    const dom = new JSDOM(response.data)

    // Only considering the data (all elements inside) in the <body></body> tag of the HTML
    let elements = dom.window.document.body.getElementsByTagName("*")

    let allWords = []

    //   Adding all words in DOM body to array
    for (let i = 0; i < elements.length; i++) {
      let current = elements[i]
      if (
        current.children.length === 0 &&
        current.textContent.replace(/ |\n/g, "") !== ""
      ) {
        //   Check the element has no children && that it is not empty
        const listOfSplittedWords = current.textContent.split(" ")

        listOfSplittedWords.forEach((word) => {
          word = word.replace(/[^a-zA-Z ]/g, "")
          if (word.length > 2) allWords.push(word)
        })
      }
    }

    const organizedWordCountData = {}

    for (const currentWord of allWords) {
      if (organizedWordCountData[currentWord]) {
        organizedWordCountData[currentWord] += 1
      } else {
        organizedWordCountData[currentWord] = 1
      }
    }

    //   Now sorting the organizedWordCountData
    let sortedAndOrganizedWordCountData = []
    for (let currentWord in organizedWordCountData) {
      sortedAndOrganizedWordCountData.push([
        currentWord,
        organizedWordCountData[currentWord],
      ])
    }

    sortedAndOrganizedWordCountData.sort(function (a, b) {
      return b[1] - a[1]
    })

    //   Only selecting the first 100 items
    sortedAndOrganizedWordCountData = sortedAndOrganizedWordCountData.splice(
      0,
      100
    )

    finalFormattedData = {}

    //   Converting the array to object
    sortedAndOrganizedWordCountData.forEach((valueSet) => {
      finalFormattedData[valueSet[0]] = valueSet[1]
    })

    return { status: 200, data: finalFormattedData }
  } catch (error) {
    return {
      status: 404,
      data: error.code,
      data: { msg: "Error fetching data!", code: error.code },
    }
  }
}

module.exports = getMostCommonWordsPlusCount
