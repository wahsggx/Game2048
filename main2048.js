/**
 * Created by Hokkaido on 2017/7/5.
 */
var board = new Array();
var score = 0;
/*hasConflict变量用来表示某个位置是否发生过变化*/
var hasConflict = new Array();

//添加触控
var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
///////////////////////////////////////初始化页面//////////////////
$(document).ready(function(){
    prepareForMobile();//对底层网格grid进行设置
    newgame();
});

function prepareForMobile() {
    if(gridContainerWidth>500){
        gridContainerWidth = 500;
        cellSideLength = 100;
        cellSpace = 20;
    }


    $("#grid-container").css("width",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("height",gridContainerWidth-2*cellSpace);
    $("#grid-container").css("padding",cellSpace);
    $("#grid-container").css("border-radius",0.02*gridContainerWidth);

    $(".grid-cell").css("width",cellSideLength);
    $(".grid-cell").css("height",cellSideLength);
    $(".grid-cell").css("border-radius",0.02*gridContainerWidth);
}


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
        hasConflict[i] = new Array();
        for(var j = 0; j<4; j++){
            board[i][j] = 0;
            hasConflict[i][j] = false;
        }
    }

    //根据board值对前端进行展示
    updateBoardView();
    score = 0;/////分数一直累加没有意义？？？？？？？？？？？？？？？？？？？？？？？？？？？？
	updateScore(score);
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
                $theNumberCell.css('left',getPosLeft(i,j)+cellSideLength/2);
                $theNumberCell.css('top',getPosTop(i,j)+cellSideLength/2);
            }
            else{
                $theNumberCell.css('width',cellSideLength);
                $theNumberCell.css('height',cellSideLength);
                $theNumberCell.css('left',getPosLeft(i,j));
                $theNumberCell.css('top',getPosTop(i,j));
                $theNumberCell.css('background-color',getNumberBackgroundColor(board[i][j]));
                $theNumberCell.css('color',getNumberColor(board[i][j]));
                $theNumberCell.text(board[i][j]);
            }
            hasConflict[i][j] = false;
        }
    }
    $(".number-cell").css("line-height",cellSideLength+'px');
    $(".number-cell").css("text-align",'center');
    $(".number-cell").css("font-size",0.5*cellSideLength+'px');

}

function generateOneNumber(){
    if (nospace(board)){
        return false;//board已满
    }else{
        //产生一个位置
        var randX = parseInt (Math.floor(Math.random()*4));
        var randY = parseInt (Math.floor(Math.random()*4));

        var times = 0;
        while( times<50 ){
            if(board[randX][randY] == 0){
                break;
            }

            var randX = parseInt (Math.floor(Math.random()*4));
            var randY = parseInt (Math.floor(Math.random()*4));
        }
        if(times == 50){
            for(var i = 0;i<4; i++){
                for(var j = 0;j<4; j++){
                    if(board[i][j] == 0 ){
                        randX = i;
                        randY = j;
                    }
                }
            }
        }

        //产生一个随机数2or4
        var randNumber = Math.random() < 0.5 ? 2 : 4;

        //在随机位置显示随机数字
        board[randX][randY] = randNumber;
        showNumberWithAnimation(randX, randY, randNumber);
        return true;
    }

}

//////////////////////////////实现交互/////////////////////////////////////////
//实现交互

$(document).keydown(function (event) {
    //event.preventDefault();//会取消event事件的所有默认行为   在当前添加 可以取消按上下键的时候下拉框划动的问题
                           //但是 这样做会取消所有按键的默认行为，应该添加在每个确定的事件里
    switch( event.keyCode ){
        case 37:
            event.preventDefault();
            if ( MoveLeft() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 38:
            event.preventDefault();
            if ( MoveUp() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 39:
            event.preventDefault();
            if ( MoveRight() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case 40:
            event.preventDefault();
            if ( MoveDown() ){
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default:
            break;
    }
})

document.addEventListener("touchstart",function (event) {
     startX = event.touches[0].pageX;
     startY = event.touches[0].pageY;
})


//手指触发失效，即可能触发了安卓的"touchmove" bug,“touchevent”不会触发，下面是解决办法
document.addEventListener("touchmove",function (event) {
    event.preventDefault();

})

document.addEventListener("touchend",function (event) {
   endX = event.changedTouches[0].pageX;
   endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if (Math.abs(deltaX) < 0.1*documentWidth && Math.abs(deltaY) < 0.1*documentWidth){
        return;
    }

    //x
    if (Math.abs(deltaX) >= Math.abs(deltaY)) {

        if (deltaX > 0) {
            //MoveRight
            if (MoveRight()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        } else {
            //MoveLeft
            if (MoveLeft()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
    }
    //y
    else {

        if (deltaY > 0) {
            //MoveDown  浏览器顶点在左上角
            if (MoveDown()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }
        }
        else {

            //MoveUp
            if (MoveUp()) {
                setTimeout("generateOneNumber()", 210);
                setTimeout("isGameOver()", 300);
            }

        }
    }
});




///////////////////////////////////////////??????
function isGameOver() {
    if(nospace(board) && noMove(board)){
        gameOver();
    }///////////没有考虑2048的情况????????????????????????????
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
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflict[i][k]){
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflict[i][k] = true;

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
                    else if(board[k][j] == board[i][j] && noBlockVertical(k, i, j, board) && !hasConflict[k][j]){
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflict[k][j] = true;

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
                    else if(board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflict[i][k]){
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflict[i][k] = true;

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
                    else if(board[k][j] == board[i][j] && noBlockVertical(i, k, j, board) && !hasConflict[k][j]){
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflict[k][j] = true;

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
