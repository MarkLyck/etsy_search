let $itemGrid = $('.item-grid')
let $searchBtn = $('.search-button')
let $searchBar = $('#search-bar')
let $count = $('#results')
let $categories = $('.categories').children('ul')
let $pagenation = $('#pagenation')

let $filterPrice = $('#filter-price')
let $minPriceInput = $('#min-price')
let $maxPriceInput = $('#max-price')
let minPrice = ''
let maxPrice = ''

let apiKey = 'bc7wp4hzrqhb0n0v3la55set'
let keywords = 'whiskey'
let category = ''
let baseURL = 'https://api.etsy.com/v2/listings/active.js?api_key=' + apiKey
let apiURL = baseURL + category + '&keywords=' + keywords + '&includes=Images,Shop'

let getItems = {
  type: 'GET',
  dataType: 'jsonp',
  url: apiURL,
  success: function(response){
    console.log(response);
    $itemGrid.empty()
    $count.text('(' + response.count + ' Results)') // TODO make this thousand seperated
    let item = response.results.map(result => {
      // Return array with [title, image, url, price, shop-name]
      return [result.title, result.Images[0].url_170x135, result.url, result.price, result.Shop.shop_name]
    })
    .forEach(item => {
      let $gridItem = $('<li class="grid-item"><button class="favorite-btn" type="button"><i class="fa fa-heart" aria-hidden="true"></i></button><button class="list-btn" type="button"><i class="fa fa-bars" aria-hidden="true"></i><i class="fa fa-caret-down" aria-hidden="true"></i></button><a href="' + item[2] + '"><img src="' + item[1] + '"><div class="description"><p class="item-title">' + item[0] + '</p><div class="item-shop-and-price"><p>' + item[4] + '</p><p class="price">$' + item[3] + '</p></div></div></a></li>')
      $itemGrid.append($gridItem)
      $gridItem.hover(itemHover)
      $gridItem.children('.favorite-btn').on('click', (e) => $(e.target).toggleClass('favorited'))
    })
    if (response.count/25 > 10) {
      let pageCounter = response.count
      let numberOfPages = 0
      while(pageCounter > 0) {
        pageCounter -= 25
        numberOfPages++
      }
      let $lastPage = $('<li id="last-page"><a href="#"><i class="fa fa-chevron-left" aria-hidden="true"></a></li>')
      $pagenation.append($lastPage)
      for (var i = 1; i <= 8; i++) {
        let $pageNumber = $('<li><a href="#">' + i + '</a></li>')
        $pagenation.append($pageNumber)
      }
      let $pagesBetween = $('<li id="pages-between"><a href="#">...</a></li>')
      $pagenation.append($pagesBetween)
      let $finalPage = $('<li id="final-page"><a href="#">' + numberOfPages + '</a></li>')
      $pagenation.append($finalPage)
      let $nextPage = $('<li id="next-page"><a href="#"><i class="fa fa-chevron-right" aria-hidden="true"></a></li>')
      $pagenation.append($nextPage)
    }
  }
}
$.ajax(getItems)

function itemHover(e) {
  $(this).children('button').toggleClass('icon-show')
}

$searchBtn.on('click', () => {
  if ($searchBar.val() !== '') {
    keywords = $searchBar.val()
    getItems.url = getItems.url = baseURL + category + '&keywords=' + keywords + '&includes=Images,Shop'+ minPrice + maxPrice
    $.ajax(getItems)
  }
})

$categories.children('li').on('click', function(){
  category = '&category=' + $(this).data().cat + '&'
  getItems.url = getItems.url = baseURL + category + '&keywords=' + keywords + '&includes=Images,Shop'+ minPrice + maxPrice
  $.ajax(getItems)
})

$filterPrice.on('click', function(){
  if ($minPriceInput.val() !== '') {
    minPrice = '&min_price=' + $minPriceInput.val()
  }
  if ($maxPriceInput.val() !== '') {
    maxPrice = '&max_price=' + $maxPriceInput.val()
  }
  if ($minPriceInput.val() !== '' || $maxPriceInput.val() !== '') {
    getItems.url = baseURL + category + '&keywords=' + keywords + '&includes=Images,Shop' + minPrice + maxPrice
    $.ajax(getItems)
  }
})
