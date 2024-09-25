import * as cheerio from 'cheerio'

const a = await fetch('https://www.kmooc.kr/view/course/detail/10429?tm=20240827111058')
const aa = await a.text()
const $ = cheerio.load(aa)

const styleAttr = $('#main > div.list > div > ul > li.image > div.card_img').attr('style')
const imageUrl = styleAttr?.match(/url\(['"]?(.*?)['"]?\)/)?.[1]
console.log('👀 ~ imageUrl:', imageUrl)
