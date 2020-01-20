$(loaded);  //loaded関数が実行

function loaded(){
  $.getJSON('cWord.json',function(data){
    console.log(data);
     $('.japanWord').append(data[0].japan);
  });
}
