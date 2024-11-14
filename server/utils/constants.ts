export const SALIDZ = {
  url: 'https://www.salidzini.lv/cena?q=',
  selectors: {
    title: '.item_box_main:nth-child(4) .item_name',
    price: '.item_box_main:nth-child(4) .item_price',
    img: '.item_box_main:nth-child(4) .item_image img',
    link: '.item_box_main:nth-child(4) .item_link',
  },
  name: 'salidzini.lv',
}

export const KURPIRKT = {
  url: 'https://www.kurpirkt.lv/cena.php?q=',
  selectors: {
    title: '[itemprop="offers"].precebloks .title',
    price: '[itemprop="offers"].precebloks .price',
    img: '[itemprop="offers"].precebloks img',
    link: '[itemprop="offers"].precebloks a',
  },
  name: 'kurpirkt',
}

export const AMAZ = {
  url: 'https://www.hagglezon.com/en/s/',
  selectors: {
    title: '.product-info .card-title',
    price: '.product-info .price-item .price-value',
    img: '.product-info img',
    link: '.product-info .price-item a',
  },
  name: 'haglezon',
}

export const DATA_SOURCES = [SALIDZ, AMAZ, KURPIRKT]
