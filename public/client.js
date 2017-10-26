$(function(){

    $.get('/blocks', appendToList);

    function appendToList(blocks){
        var list = [];
        for(var i in blocks){
            list.push($('<li>', {text: blocks[i]}));
        }
        $('.block-list').append(list);
    };
});

// $(function(){
    
//       $.get('/cities', appendToList); 
    
//       function appendToList(cities) {
//         var list = [];
//         for(var i in cities){
//           list.push($('<li>', { text: cities[i] }));
//         }
//         $('.city-list').append(list);
//       }
//     });