export interface ICrawledData {
  title: string
  link: string
  price: string
  crawlDate: string
  image: string
  history: {
    price: string
    crawlDate: string
  }[]
}
