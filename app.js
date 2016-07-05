var $itemGrid = $('.item-grid')

var settings = {
  type: 'GET',
  dataType: 'jsonp',
  url: 'https://api.etsy.com/v2/listings/active.js?api_key=bc7wp4hzrqhb0n0v3la55set&keywords=whiskey&includes=Images,Shop',
  success: function(response){
    // console.log(response.results)
    var item = response.results.map(result => {
      // Return array with title, image, url
      // console.log(result.url);
      return [result.title, result.Images[0].url_170x135, result.url]
    })
    .forEach(item => {
      var imageEl = $('<li><a href="' + item[2] + '"><img src="' + item[1] + '"><div class="title">' + item[0] + '</div></a></li>')
      $itemGrid.append(imageEl)
    })
    // console.log(images)
  }
}
$.ajax(settings)
