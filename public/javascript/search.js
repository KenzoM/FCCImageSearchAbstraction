$("#search-btn").click(function(e){
  e.preventDefault();
  var search = $("#search").val();
  var count = $("#count").val();
  var offset = $("#offset").val();
  $.ajax({
    url: '/api/imagesearch',
    type: 'POST',
    dataType: 'JSON',
    data: {query: search, count: count, offset: offset}, //data sending out to server is in JSON
    success: function(data){
      console.log(data)
    }
  });
})


$("#history-btn").click(function(){
  console.log('this is history button')
})
