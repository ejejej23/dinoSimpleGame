
var levelParm = parseInt(getParam('level'));
var playSetting ={
    level : (levelParm && levelParm !='') ? levelParm : 1,
    stage : 1
}

$('.btn')
.on('click',moveToScr)

if(playSetting.level >1)$('#btn2').removeClass('unOpen');
if(playSetting.level >2)$('#btn3').removeClass('unOpen');
if(playSetting.level >3)$('#btn4').removeClass('unOpen');


function moveToScr(){
    if($(this).hasClass('unOpen')){
        alert('접근할 수 없는 레벨입니다');
        return false;
    }
    window.location.href = './playScreen.html?level='+playSetting.level+'&stage='+$(this).data('stage');
}
