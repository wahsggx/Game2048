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
    generateOneNumber();
}

function init(){
    //底层网格布局
    for( var i = 0; i < 4; i++){
        for( var j = 0; j < 4; j++){
            var $gridCell = $("#grid-cell-"+i+"-"+j);//jquery对象
            $gridCell.css("left",getPosLeft(i,j));
            $gridCell.css("top",getPosTop(i,j));

        }
    }

    //board(数字块)初始化为二维数组
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

function generateOneNumber(){
    if (nospace(board)){
        return false;//board已满
    }else{
        //产生一个位置
        var randX = parseInt (Math.floor(Math.random()*4));
        var randY = parseInt (Math.floor(Math.random()*4));

        while(true){
            if(board[randX][randY] == 0){
                break;
            }

            var randX = parseInt (Math.floor(Math.random()*4));
            var randY = parseInt (Math.floor(Math.random()*4));
        }

        //产生一个随机数2or4
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //在随机位置显示随机数字
        board[randX][randY] = randNumber;
        showNumberWithAnimation(randX, randY, randNumber);
        return true;
    }

}
