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

    Tile.prototype.update = function () {
        //console.log('updating tile...');
    };

    Tile.prototype.render = function () {
        //console.log('rendering tile...');
        var ctx = Cycle.context;
        var x = this.col * Cycle.gridWidth;
        var y = this.row * Cycle.gridHeight;

        //tile
        var bgColor = Utils.hsvToRgb(0.3, (this.fertility / 100), 0.8);
        bgColor = 'rgb(' + bgColor.r + ',' + bgColor.g + ',' + bgColor.b + ')';
        
        //ctx.strokeRect(x, y, Cycle.gridWidth, Cycle.gridHeight);
        ctx.fillStyle = bgColor;
        ctx.fillRect(x, y, Cycle.gridWidth, Cycle.gridHeight);
    };

    window.Tile = Tile;
})();