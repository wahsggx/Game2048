/**
 * Created by Hokkaido on 2017/7/5.
 */
//获取board的left值
function getPosLeft(i,j){
    return 20 + j * 120;
}

//获取board的top值
function getPosTop(i,j){
    return 20 + i * 120;
}

//设置不同数字背景颜色
function getNumberBackgroundColor( number ){
        switch (number){
            case 2 : return "#eee4da";break;
            case 4 : return "#ede0c8";break;
            case 8 : return "#f2b179";break;
            case 16 : return "#f59563";break;
            case 32 : return "#f67c5f";break;
            case 64 : return "#f65e3b";break;
            case 128 : return "#edcf72";break;
            case 256 : return "#edcc61";break;
            case 512 : return "#9c0";break;
            case 1024 : return "#33b5e5";break;
            case 2048 : return "#09c";break;
            case 4096 : return "#a6c";break;
            case 8192 : return "#93c";break;
            default : return"black";break;
        }
}

//设置数字颜色
function getNumberColor(number){
    if(number <= 4){
        return "#776e65";
    }else{
        return "white";
    }
}

//检测board是否有空格
function nospace(){
    for(var i = 0; i<4; i++){
        for(var j = 0; j<4; j++){
            if(board[i][j] == 0){
                return false;
            }
        }
    }
    return true;
}