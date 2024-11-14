import { removeNonNumericCharacters } from '@@/shared/utils'

/**
 * @param $ - Reference to response html
 */
export function ssResponseParser($: () => void) {
  const title = extractValues($, '.msg2')
  const prices = extractValues($, '.msga2-o.pp6')
  const links = extractValues($, '.msga2 a', 'href')
  const images = extractValues($, '.msga2 img', 'src')

  return title.map((val: string, i: number) => {
    const item = {
      title: val,
      link: links[i] ?? '',
      price: prices[i] ?? '',
      img: images[i] ?? '',
      crawlDate: new Date().toISOString(),
    }

    return {
      ...item,
      price: removeNonNumericCharacters(item.price),
      history: [
        {
          crawlDate: item.crawlDate,
          price: removeNonNumericCharacters(item.price),
        },
      ],
    }
  })
}

export function universalParser(
  $: any,
  selectors: { title: string; link: string; img: string; price: string }
) {
  const title = $(selectors.title).text()
  const prices = $(selectors.price).text()
  const img = $(selectors.img).attr('src')
  const url = $(selectors.link).attr('href')

  const item = {
    title,
    prices,
    img,
    url,
    crawlDate: new Date().toISOString(),
  }

  return {
    item,
  }
}
