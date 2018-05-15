var panning = new Panning();
panning.to('panElm',false);

function changeInnerBoxBigger(){
    document.getElementById('panElm').style.width = '600px';
    document.getElementById('panElm').style.height = 'auto';
    //panning.to('panElm');
}
function changeInnerBoxSmaller(){
    document.getElementById('panElm').style.width = '200px';
    document.getElementById('panElm').style.height = 'auto';
    //panning.clear('panElm');
}