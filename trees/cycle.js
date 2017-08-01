/*jshint browser: true*/
/*global Tree: true*/
/*global Tile: true*/

(function(){
    "use strict";
    
    //-----------------------------------
    var Entities = {
        treeCollection: [],
        tileCollection: []
    };

    //-----------------------------------
    var Cycle = {
        width: 500,
        height: 500,
        fps: 10,
        rows: 4,
        columns: 4,
        gridWidth: 50,
        gridHeight: 50,

        init: function () {
            //console.log('init...');
            var len = this.rows * this.columns;

            this.canvas = document.getElementById('canvas');
            this.context = this.canvas.getContext('2d');
            this.canvas.width = this.width;
            this.canvas.height = this.height;

            for(var ii = 0; ii < len; ++ii){
                var col = ii % this.columns;
                var row = Math.floor(ii / this.rows);
                
                //create tile
                var fertility = Math.round(Math.random() * 100);
                var moisture = Math.round(Math.random() * 100);
                var temp = new Tile(row, col, fertility, moisture);
                Entities.tileCollection.push(temp);
                
                //create tree
                var age = Math.round(Math.random() * 500);
                //var age = 0;
                temp = new Tree(row, col, this.gridWidth/2, this.gridHeight/2, age);
                Entities.treeCollection.push(temp);
            }

            window.setInterval(this.onEachFrame.bind(this), 1000/this.fps);
        },

        onEachFrame: function () {
            this.update();
            this.render();
        },
        update: function () {
            //console.log('updating...');
            this.context.clearRect(0, 0, this.width, this.height);
            
            Entities.tileCollection.forEach(function (tile) {
                tile.update();
            });
            Entities.treeCollection.forEach(function (tree) {
                tree.update();
            });

            Entities.treeCollection = Entities.treeCollection.filter(function (tree) {
                return tree.active;
            });
        },
        render: function () {
            //console.log('rendering...');
            Entities.tileCollection.forEach(function (tile) {
                tile.render();
            });
            
            Entities.treeCollection.forEach(function (tree) {
                tree.render();
            });
        },
    };
    
    window.Cycle = Cycle;
})();