"use strict"
$("#search-btn").click(function(e){
  e.preventDefault();
  var search = $("#search").val();
  var count = $("#count").val();
  var offset = $("#offset").val();
  $.ajax({
    url: "/api/imagesearch",
    type: "POST",
    dataType: "JSON",
    beforeSend: function(){
      if(!Number.isInteger(Number(count)) || !Number.isInteger(Number(offset)) ){
        $("#hyperlink").empty();
        $("#hyperlink").append("<h4>Make sure Count and Offset are numbers</h4>");
        return false;
      }
      if(search === "" || count === "" || offset === ""){
        $("#hyperlink").empty();
        $("#hyperlink").append("<h4>Fill out all the form</h4>");
        return false;
      }
      if(count <= 0 || offset < 0){
        $("#hyperlink").empty();
        $("#hyperlink").append("<h4>Are the values correct?</h4>");
        return false;
      }
    },
    data: {query: search, count: count, offset: offset}, //data sending out to server is in JSON
    success: function(data){
      $("#hyperlink").empty();
      $("#hyperlink").append("<h4><a href="+ data.link +">"+ data.link +"</a></h4>");
    }
  });
})

$("#history-btn").click(function(){
  $.ajax({
    url: "/api/gethistory",
    type: "GET",
    success: function(data){
      $("#hyperlink").empty();
      $("#hyperlink").append("<h4><a href="+ data.link +">"+ data.link +"</a></h4>")
    }
  })
})
