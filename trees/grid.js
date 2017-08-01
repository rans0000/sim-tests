/*jshint browser: true*/
/*global jQuery: true*/
/*global Utils: true*/

(function($){
    /*jshint validthis: true*/
    "use strict";

    //---------------------------------------------
    //Class declarations
    //---------------------
    //Class Tile
    var Tile = function (x, y, water, fertility) {
        this._id = ++Tile.count;
        this._water = water || 5;
        this._fertility = fertility || 10;
        this._x = x;
        this._y = y;
        this._element = $('<div></div>');
    };
    Tile.count = 0;

    //---------------------
    //Class Tree
    var Tree = function (x, y, age) {
        this._x = x;
        this._y = y;
        this._width = 10;
        this._height = 10;
        this._age = age || 1;
        this._element = $('<div></div>');
        this._minFertility = 40;
        this._minWater = 30;
    };
    Tree.prototype.count = 0;

    //---------------------
    //Class Grid
    var Grid = function (element) {
        this._width = 20;
        this._height = 20;
        this._hCount = 10;
        this._vCount = 10;
        this._element = $(element);
        this._tileSet = this.createGrid();
        this._treeSet = this.createTrees();
    };

    Grid.prototype.createGrid = function () {
        var grid = [];
        for(var ii = 0; ii < this._hCount; ii++){
            grid[ii] = [];
            for(var jj = 0; jj < this._vCount; jj++){
                grid[ii][jj] = new Tile(ii, jj, Utils.randomNum(100), Utils.randomNum(100));
            }
        }
        return grid;
    };

    Grid.prototype.createTrees = function () {
        var trees = [];
        for(var ii = 0; ii < this._hCount; ii++){
            trees[ii] = [];
            for(var jj = 0; jj < this._vCount; jj++){
                trees[ii][jj] = new Tree(ii, jj, Utils.randomNum(10));
            }
        }
        return trees;
    };

    Grid.prototype.drawTile = function (tileItem) {
        var item = tileItem._element;
        var bgColor = Utils.hsvToRgb(0.3, (tileItem._fertility / 100), 0.8);
        bgColor = 'rgb(' + bgColor.r + ',' + bgColor.g + ',' + bgColor.b + ')';
        item.css({
            'width': this._width + 'px',
            'height': this._height + 'px',
            'background': bgColor,
            'top': (tileItem._x * this._width),
            'left': (tileItem._y * this._height)
        })
            .addClass('tile-item')
            .data('tile-info', tileItem);
        item.on('click', clickTile);
        return item;
    };

    Grid.prototype.drawTree = function (treeItem, fertility, water) {
        var item = treeItem._element;
        if(fertility >= treeItem._minFertility && water >= treeItem._minWater){
            item.css({
                'width': '10px',
                'height': '10px',
                'background': 'yellow',
                'opacity': (treeItem._age * 0.1),
                'top': ((treeItem._x * 20) + (10 / 2)) ,
                'left':((treeItem._y * 20) + (10 / 2))
            })
                .addClass('tree-item')
                .data('tree-info', treeItem);
        }
        else{
            item.data('tree-info', treeItem);
        }
        item.on('click', clickTree);
        return item;
    };

    Grid.prototype.drawGrid = function () {
        this._element.empty();
        var gridItem = [];
        var treeItems = [];
        for(var ii = 0; ii < this._hCount; ii++){
            for(var jj = 0; jj < this._vCount; jj++){
                var currentTile = this._tileSet[ii][jj];
                var item = this.drawTile(currentTile);
                gridItem.push(item);
                item = this.drawTree(this._treeSet[ii][jj], currentTile._fertility, currentTile._water);
                treeItems.push(item);
            }
        }
        this._element.append(gridItem);
        this._element.append(treeItems);
    };

    //---------------------------------------------
    //function declarations

    function clickTile (e) {
        e.preventDefault();
        console.log($(this).data('tile-info'));        
    }
    function clickTree (e) {
        e.preventDefault();
        console.log($(this).data('tree-info'));        
    }

    //---------------------------------------------
    window.Grid = Grid;

})(jQuery);