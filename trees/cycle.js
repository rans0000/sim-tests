/*jshint browser: true*/
/*global Tree: true*/

(function(){
    "use strict";
    
    //-----------------------------------
    var Entities = {
        treeCollection: []
    };

    //-----------------------------------
    var Cycle = {
        width: 500,
        height: 500,
        fps: 30,
        rows: 2,
        columns: 2,
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
                //var age = Math.round(Math.random() * 500);
                var age = 0;
                var temp = new Tree(row, col, this.gridWidth/2, this.gridHeight/2, age);
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
            Entities.treeCollection.forEach(function (tree) {
                tree.update();
            });

            Entities.treeCollection = Entities.treeCollection.filter(function (tree) {
                return tree.active;
            });
        },
        render: function () {
            //console.log('rendering...');
            Entities.treeCollection.forEach(function (tree) {
                tree.render();
            });
        },
    };
    
    window.Cycle = Cycle;
})();