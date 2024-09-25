import * as cheerio from 'cheerio'

async function getCoverImageURLFromKMOOC(url: string) {
  const response = await fetch(url)
  const html = await response.text()
  const $ = cheerio.load(html)

  const styleAttr = $('#main > div.list > div > ul > li.image > div.card_img').attr('style')
  const imageUrl = styleAttr?.match(/url\(['"]?(.*?)['"]?\)/)?.[1]
  return imageUrl
}

const kmoocURL = 'https://www.kmooc.kr/view/course/detail/10429?tm=20240827111058'

getCoverImageURLFromKMOOC(kmoocURL).then((coverImageURL) => {
  console.log('👀 ~ coverImageURL:', coverImageURL)
})
