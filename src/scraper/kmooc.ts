import * as cheerio from 'cheerio'
import * as xlsx from 'xlsx'

async function getCoverImageURLFromKMOOC(url: string) {
  const response = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)

  const styleAttr = $('#main > div.list > div > ul > li.image > div.card_img').attr('style')
  const imageUrl = styleAttr?.match(/url\(['"]?(.*?)['"]?\)/)?.[1]
  return imageUrl
}

const workbook = xlsx.readFile('./src/scraper/content.xlsx')

// 첫 번째 시트 이름
const sheetName = workbook.SheetNames[0]

// 시트 이름에 따른 정보
const sheet = workbook.Sheets[sheetName]
const data = xlsx.utils.sheet_to_json(sheet)
const urls = data.map((row: any) => {
  const url = row.kmooc
  return url?.includes('kmooc.kr') ? getCoverImageURLFromKMOOC(url) : null
})
Promise.all(urls).then((res) => {
  console.log('👀 ~ res:', res)
})
