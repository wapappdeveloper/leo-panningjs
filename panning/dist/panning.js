/**
 * developer: lional
 * mail: jpleoleo@gmail.com
 * use: pan the element using scroll
 * date: 09/07/2017
 */
(function(window){
    'use strict';
    function PanningLibrary(){
        var Panning = function(){ console.info('Panning Initilized')};
        Panning.prototype.to = function(id, scroll){
            if(id && document.getElementById(id)){
                var parentElm = document.getElementById(id).parentElement || document.getElementById(id).parentNode;
                var parentId = (parentElm)?parentElm.id || parentElm.getAttribute('id'):null;
                var scrollPresent = (parentId)?this.detectScroll(parentId):false;
                (scroll)?((scrollPresent)?this.toParentChild(parentId, id):console.log('panning not applicable')):this.toParentChild(parentId, id);
            }else{
                console.error('passed element id is not exist in document');
            }
        }
        Panning.prototype.detectScroll = function(id, option){
            var elm = document.getElementById(id);
            if(option && option==='x'){
                return (elm) ? elm.scrollWidth > parseInt(window.getComputedStyle(elm).width) : false;
            }else if(option && option==='y'){
                return (elm) ? elm.scrollHeight > parseInt(window.getComputedStyle(elm).height) : false;
            }else{
                return (elm) ? elm.scrollWidth > parseInt(window.getComputedStyle(elm).width) : ((elm) ? elm.scrollHeight > parseInt(window.getComputedStyle(elm).height) : false);
            }
        }
        Panning.prototype.toParentChild = function(parentId, panId){
            var mouseDownX = null;
            var mouseDownY = null;
            var mouseDown = null;
            var mouseMoveX = null;
            var mouseMoveY = null;
            var mouseMove = null;
            var mouseUpX = null;
            var mouseUpY = null;
            var mouseUp = null;
            var mousePreviousX = null;
            var mousePreviousY = null;
            var mouseScrollTop = null;
            var mouseScrollLeft = null;
            var mouseDownSrollTop = null;
            var mouseDownSrollLeft = null;
            var thiS = this;
            this.parentId = parentId;
            this.panId = panId;
            this.mouseDownHandler = function(event){
                mouseDownX = String(event.pageX);
                mouseDownY = String(event.pageY);
                mouseDownSrollTop = document.getElementById(parentId).scrollTop;
                mouseDownSrollLeft = document.getElementById(parentId).scrollLeft;
                mouseDown = true;
                document.getElementById(panId).setAttribute('class','mouseMove');
                document.getElementById(parentId).addEventListener('mousemove',thiS.mouseMoveHandler);
            }
            this.mouseMoveHandler = function (event){
                var heightOfMoveElem = document.getElementById(panId).offsetHeight;
                var heightOfHolderElem = parseInt(window.getComputedStyle(document.getElementById(parentId)).height);
                var widthOfMoveElem = document.getElementById(panId).offsetWidth;
                var widthOfHolderElem = parseInt(window.getComputedStyle(document.getElementById(parentId)).width);
                var verticalMoveRatio = heightOfMoveElem / heightOfHolderElem;
                var horizontalMoveRatio = widthOfMoveElem / widthOfHolderElem;
                event.preventDefault();
                mouseMoveX = String(event.pageX);
                mouseMoveY = String(event.pageY);
                mouseMove = true;
                if(mouseDown && (mouseDownX && mouseMoveX && mouseDownX != mouseMoveX && mouseMoveX != mousePreviousX) || (mouseDownY && mouseMoveY && mouseDownY != mouseMoveY && mouseMoveY != mousePreviousY)){
                    document.getElementById(panId).classList.add('mouseMove');
                    document.getElementById(panId).setAttribute('class','mouseMove');
                }
                if(mouseDown && (mouseDownX && mouseMoveX && mouseDownX != mouseMoveX && mouseMoveX != mousePreviousX) && (mouseDownY && mouseMoveY && mouseDownY != mouseMoveY && mouseMoveY != mousePreviousY)){
                    mousePreviousX = mouseMoveX;
                    mousePreviousY = mouseMoveY;
                    mouseScrollTop = mouseDownSrollTop + (verticalMoveRatio * (mouseDownY - mouseMoveY));
                    mouseScrollLeft = mouseDownSrollLeft + (horizontalMoveRatio * (mouseDownX - mouseMoveX));
                    document.getElementById(parentId).scrollTop = mouseScrollTop;
                    document.getElementById(parentId).scrollLeft = mouseScrollLeft;
                }else if(mouseDown && mouseDownY && mouseMoveY && mouseDownY != mouseMoveY && mouseMoveY != mousePreviousY){
                    mousePreviousY = mouseMoveY;
                    mouseScrollTop = mouseDownSrollTop + (verticalMoveRatio * (mouseDownY - mouseMoveY));
                    document.getElementById(parentId).scrollTop = mouseScrollTop;
                }else if(mouseDown && mouseDownX && mouseMoveX && mouseDownX != mouseDownY && mouseMoveX != mousePreviousX){
                    mousePreviousX = mouseMoveX;
                    mouseScrollLeft = mouseDownSrollLeft + (horizontalMoveRatio * (mouseDownX - mouseMoveX));
                    document.getElementById(parentId).scrollLeft = mouseScrollLeft;
                }else{
                    mouseMove = false;
                }
            }
            this.mouseUpHandler = function(event){
                mouseDown = false;
                mouseMove = false;
                document.getElementById(parentId).removeEventListener('mousemove', thiS.mouseMoveHandler);
                (document.getElementById(panId).classList.contains('mouseMove'))?document.getElementById(panId).classList.remove('mouseMove'):null;
            }
            document.getElementById(parentId).addEventListener('mousedown', this.mouseDownHandler);
            document.addEventListener('mouseup', this.mouseUpHandler);
        }
        Panning.prototype.clear = function(id){
            document.getElementById(this.parentId).removeEventListener('mousedown', this.mouseDownHandler);
            document.removeEventListener('mouseup', this.mouseUpHandler);
        }
        return Panning;
    }
    if(typeof Panning==='undefined'){
        window.Panning = PanningLibrary();
    }else{
        console.log('Panning already declared');
    }
})(window);