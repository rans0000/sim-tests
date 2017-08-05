/*jshint browser: true*/
/*global Cycle: true*/
/*global Utils: true*/

(function(){
    "use strict";

    var Tile = function (row, col, fertility, moisture) {
        this.row = row;
        this.col = col;
        this.fertility = fertility;
        this.moisture = moisture;
    };
    
    Tile.prototype.maxFertility = 100;
    Tile.prototype.sandColor = '#fae592';
    Tile.prototype.fertileColor = '#59c76e';

    Tile.prototype.update = function () {
        //console.log('updating tile...');
    };

    Tile.prototype.render = function () {
        //console.log('rendering tile...');
        var ctx = Cycle.context;
        var x = this.col * Cycle.gridWidth;
        var y = this.row * Cycle.gridHeight;

        var bgColor = Utils.interpolateColor(this.sandColor, this.fertileColor, this.fertility / this.maxFertility);
        bgColor = '#' + bgColor.r + bgColor.g + bgColor.b;
        
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, Cycle.gridWidth, Cycle.gridHeight);
    };

    window.Tile = Tile;
})();