$(function(){

    $.getJSON('https://mikatuki.github.io/2020/cWord.json',function(data){
         $('.japanWord').text(data[0].japan);
         var correct = data[0].chine;
         var i = 0;
         var array = [];

         $('div').on('click',function(){
           var answer = $('#answerText').val();
           correct = data[i].chine;

           if(answer == correct){
             console.log("正解");
           }else {
             console.log("違う！");
             array.push(i);
           }
           i++;
           if(i == data.length){
            i = 0;
           }
             $('.japanWord').text(data[i].japan);
             $('#answerText').val('');

         });
      });

});
