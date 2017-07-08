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
    score = 0;/////分数一直累加没有意义？？？？？？？？？？？？？？？？？？？？？？？？？？？？
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

//实现交互

$(document).keydown(function (event) {
    console.log(event.keyCode);
    switch( event.keyCode ){
        case 37:
            if ( MoveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38:
            if ( MoveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39:
            if ( MoveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40:
            if ( MoveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
})

///////////////////////////////////////////??????
function isGameOver() {
    if(nospace(board) && noMove(board)){
        gameOver();
    }///////////没有考虑2048的情况
}

function gameOver(){
    alert("gameover!");
}

///////////////////////////////////////////////
function MoveLeft(){
    //?canMoveLeft
    if( !canMoveLeft(board) ){
        return false;
    }

    //moveLeft
    for( var i = 0; i<4; i++){
        for( var j = 1;j<4; j++){
            if( board[i][j] !=0 ){
                for( var k = 0; k<j; k++){
                    if( board[i][k] == 0&& noBlockHorizontal(i, k, j, board) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board)){
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        continue;
                    }

                }
            }
        }
    }
    //更新board
    setTimeout("updateBoardView()",200);
    return true;
}

////////////////////////////////////////////////
function MoveUp(){
    //?canMoveUp
    if( !canMoveUp(board) ){
        return false;
    }

    //moveUp
    for( var i = 1; i<4; i++){
        for( var j = 0;j<4; j++){
            if( board[i][j] !=0 ){
                for( var k = 0; k<i; k++){
                    if( board[k][j] == 0 && noBlockVertical(k, i, j, board) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board)){
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        continue;
                    }

                }
            }
        }
    }
    //更新board
    setTimeout("updateBoardView()",200);
    return true;
}


////////////////////////////////////////////////////////
function MoveRight(){
    //?canMoveRight
    if( !canMoveRight(board) ){
        return false;
    }

    //MoveRight
    for( var i = 0; i<4; i++){
        for( var j = 0;j<3; j++){
            if( board[i][j] !=0 ){
                for( var k = j+1; k<4; k++){
                    if( board[i][k] == 0&& noBlockHorizontal(i, j, k, board) ){
                        showMoveAnimation( i , j , i , k );
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board)){
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[i][k];
                        updateScore(score);

                        continue;
                    }

                }
            }
        }
    }
    //更新board
    setTimeout("updateBoardView()",200);
    return true;
}


////////////////////////////////////////////////
function MoveDown(){
    //?canMoveDown
    if( !canMoveDown(board) ){
        return false;
    }

    //MoveDown
    for( var i = 0; i<3; i++){
        for( var j = 0;j<4; j++){
            if( board[i][j] !=0 ){
                for( var k = i+1; k<4; k++){
                    if( board[k][j] == 0&& noBlockVertical(i, k, j, board) ){
                        showMoveAnimation( i , j , k , j );
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board)){
                        board[k][j] += board[i][j];
                        board[i][j] = 0;

                        //add score
                        score += board[k][j];
                        updateScore(score);

                        continue;
                    }

                }
            }
        }
    }
    //更新board
    setTimeout("updateBoardView()",100);
    return true;
}
