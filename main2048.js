/**
 * Created by Hokkaido on 2017/7/5.
 */
var board = new Array();
var score = 0;

$(document).ready(function(){
    newgame();
});


function newgame(){
    //初始化网格
    init();
    //在随机两个格子生成数字
    //generate();
}

function init(){
    for( var i = 0; i < 4; i++){
        for( var j = 0; j < 4; j++){
            var $gridCell = $("#grid-cell-"+i+"-"+j);//jquery对象
            $gridCell.css("left",getPosLeft(i,j));
            $gridCell.css("top",getPosTop(i,j));

        }
    }
}