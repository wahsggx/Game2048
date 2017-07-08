/**
 * Created by Hokkaido on 2017/7/5.
 */
function showNumberWithAnimation(i, j, randNumber){
    var $Numbercell = $('#number-cell-' + i + '-'+ j);

    $Numbercell.css('background-color',getNumberBackgroundColor(randNumber));
    $Numbercell.css('color',getNumberColor(randNumber));
    $Numbercell.text(randNumber);

    $Numbercell.animate({
        width:"100px",
        height:"100px",
        left:getPosLeft(i,j),
        top:getPosTop(i,j)
        },50);

};

function showMoveAnimation( fromX , fromY , toX , toY ){
    var $theNumbercell = $("#number-cell" + fromX + '-' + fromY);
    $theNumbercell.animate({
        "left": getPosLeft(toX, toY),
        "top": getPosTop(toX, toY)
    },50);
}


function updateScore(score) {
    $("#score").text(score);
}