/*jshint browser: true*/
/*global Cycle: true*/

(function(){
    "use strict";

    var Tree = function (row, col, offsetX, offsetY, age) {
        this.active = true;
        this.col = col;
        this.row = row;
        this.age = age;
        //this.maxAge = 500;
        //this.width = 20;
        //this.height = 40;
        this.offsetX = offsetX - (this.width/2);
        this.offsetY = offsetY - (this.height/2);
        //this.trunkColor = '#902121';
        //this.leafColor = '#2bb930';
    };
    
    Tree.prototype.maxAge = 500;
    Tree.prototype.width = 20;
    Tree.prototype.height = 40;
    Tree.prototype.trunkColor = '#902121';
    Tree.prototype.leafColor = '#2aa32f';

    Tree.prototype.update = function () {
        //console.log('updating tree...');
        this.age++;
        if(this.age > this.maxAge){
            this.active = false;
        }
    };

    Tree.prototype.render = function () {
        //console.log('rendering tree...');
        var ctx = Cycle.context;
        var x = this.col * Cycle.gridWidth;
        var y = this.row * Cycle.gridHeight;
        var cx = x + (Cycle.gridWidth / 2);
        var cy = y + (Cycle.gridHeight / 2);
        var trunkWidth = 0.2;

        //trunk
        var trunkHeight = 0.15;
        var trunkBX = cx - (this.width * (trunkWidth / 2));
        var trunkBY = cy;
        ctx.fillStyle = this.trunkColor;
        ctx.fillRect(trunkBX, trunkBY, this.width * trunkWidth, -this.height * trunkHeight);

        //canopy
        var leafBX1 = cx - (this.width / 2);
        var leafBX2 = cx + (this.width / 2);
        var leafBY = cy - (this.height * trunkHeight);
        var ageRatio = this.age / this.maxAge;
        var leafTY = cy - (this.height * ageRatio) - (this.height * trunkHeight);

        ctx.fillStyle = this.leafColor;
        ctx.beginPath();
        ctx.moveTo(leafBX1, leafBY);
        ctx.lineTo(leafBX2, leafBY);
        ctx.lineTo(cx, leafTY);
        ctx.fill();

    };

    window.Tree = Tree;
})();