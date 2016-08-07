$("#search-btn").click(function(e){
  e.preventDefault();
  var search = $("#search").val();
  var count = $("#count").val();
  var offset = $("#offset").val();
  $.ajax({
    url: '/api/imagesearch',
    type: 'POST',
    dataType: 'JSON',
    beforeSend: function(){
      if(!Number.isInteger(Number(count)) || !Number.isInteger(Number(offset)) ){
        alert('Make sure Count and Offset Parameters are numbers!')
        return false
      }
    },
    data: {query: search, count: count, offset: offset}, //data sending out to server is in JSON
    success: function(data){
      console.log(data)
    }
  });
})


$("#history-btn").click(function(){
  $.ajax({
    url: '/api/gethistory',
    type: 'GET',
    success: function(data){
      console.log(data)
    }
  })
})
