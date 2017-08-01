/*jshint browser: true*/

(function(){
    "use strict";

    //-----------------------------------
    var Entities = {
        treeCollection: []
    };

    //-----------------------------------
    var Tree = function (row, col, offsetX, offsetY, age) {
        this.active = true;
        this.col = col;
        this.row = row;
        this.age = age;
        this.maxAge = 500;
        this.width = 20;
        this.height = 40;
        this.offsetX = offsetX - (this.width/2);
        this.offsetY = offsetY - (this.height/2);
        this.trunkColor = '#902121';
        this.leafColor = '#2bb930';
    };

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
        
        //tile
        ctx.strokeRect(x, y, Cycle.gridWidth, Cycle.gridHeight);
        
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

    window.Tree = Tree;
    window.Cycle = Cycle;
    window.Entities = Entities;
})();