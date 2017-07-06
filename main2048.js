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
    //网格布局
    for( var i = 0; i < 4; i++){
        for( var j = 0; j < 4; j++){
            var $gridCell = $("#grid-cell-"+i+"-"+j);//jquery对象
            $gridCell.css("left",getPosLeft(i,j));
            $gridCell.css("top",getPosTop(i,j));

        }
    }

    //board初始化为二维数组
    for( var i = 0; i<4; i++){
        board[i] = new Array();
        for(var j = 0; j<4; j++){
            board[i][j] = 0;
        }
    }

    //根据board值对前端进行展示
    updateBoardView();





}


function updateBoardView(){
    $(".number-cell").remove();
    for( var i = 0; i<4; i++){
        for(var j = 0; j<4; j++){
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>')//?????????????????????????改进 创建元素
            var $theNumberCell = $('#number-cell-'+i+'-'+j);

            if(board[i][j] == 0){
                $theNumberCell.css('width','0px');
                $theNumberCell.css('height','0px');
                $theNumberCell.css('left',getPosLeft(i,j)+50);
                $theNumberCell.css('top',getPosTop(i,j)+50);
            }
            else{
                $theNumberCell.css('width','100px');
                $theNumberCell.css('height','100px');
                $theNumberCell.css('left',getPosLeft(i,j));
                $theNumberCell.css('top',getPosTop(i,j));
                $theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                $theNumberCell.css('color',getNumberColor(board[i][j]));
                $theNumberCell.text(board[i][j]);
            }
        }
    }
}

