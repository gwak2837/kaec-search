const cheerio = require('cheerio')
const xlsx = require('xlsx')
const fs = require('fs')

// Node v18 이상에서는 fetch가 내장되어 있습니다.
// 만약 사용 중인 Node 버전에서 fetch가 지원되지 않는다면,
// 아래와 같이 'node-fetch' 패키지를 사용하세요.
// const fetch = require('node-fetch');

async function getCoverImageURLFromKMOOC(url) {
  const response = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)

  const styleAttr = $('#main > div.list > div > ul > li.image > div.card_img').attr('style')
  const imageUrl =
    styleAttr && styleAttr.match(/url\(['"]?(.*?)['"]?\)/)
      ? styleAttr.match(/url\(['"]?(.*?)['"]?\)/)[1]
      : null
  return imageUrl
}

const workbook = xlsx.readFile('./content2.xlsx')
const sheetName = workbook.SheetNames[0]
const sheet = workbook.Sheets[sheetName]
const data = xlsx.utils.sheet_to_json(sheet)

const urls = data.map((row) => {
  const url = row.kmooc
  return url && url.includes('kmooc.kr') ? getCoverImageURLFromKMOOC(url) : null
})

Promise.all(urls).then((res) => {
  // 각 결과 값을 줄바꿈으로 구분하여 문자열로 만듭니다.
  // null 값은 빈 문자열로 처리합니다.
  const output = res.map((item) => item || '').join('\n')
  fs.writeFile('output.txt', output, 'utf8', (err) => {
    if (err) {
      console.error('파일 쓰기 에러:', err)
    } else {
      console.log('결과가 output.txt 파일에 저장되었습니다.')
    }
  })
})
