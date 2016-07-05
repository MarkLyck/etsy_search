let $itemGrid = $('.item-grid')
let $searchBtn = $('.search-button')
let $searchBar = $('#search-bar')
let apiURL = 'https://api.etsy.com/v2/listings/active.js?api_key=bc7wp4hzrqhb0n0v3la55set&keywords=whiskey&includes=Images,Shop'

let settings = {
  type: 'GET',
  dataType: 'jsonp',
  url: apiURL,
  success: function(response){
    console.log('SUCCESSFUL AJAX');
    $itemGrid.empty()
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
  }
}
$.ajax(settings)

function itemHover(e) {
  $(this).children('button').toggleClass('icon-show')
}

$searchBtn.on('click', () => {
  if ($searchBar.val() !== '') {
    console.log($searchBar.val());
    console.log('making AJAX request');
    settings.url = 'https://api.etsy.com/v2/listings/active.js?api_key=bc7wp4hzrqhb0n0v3la55set&keywords=' + $searchBar.val() + '&includes=Images,Shop'
    console.log(settings.url);
    $.ajax(settings)
  }
})
