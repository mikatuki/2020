$(loaded);  //loaded関数が実行

function loaded(){
  console.log(1111);
  $.getJSON('cWord.json',function(data){
    console.log(111);
    console.log(data);
     // $('.japanWord').append(data[0].jpan);
  });
}
