/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ (() => {

eval("var Cell = /** @class */ (function () {\n    function Cell(cell) {\n        this.cellValue = 0;\n        this.htmlElement = cell;\n    }\n    Cell.prototype.setCellValue = function (value) {\n        if (this.cellValue !== 0)\n            return false;\n        this.cellValue = value;\n        this.htmlElement.innerText = value === -1 ? 'O' : 'X';\n        return true;\n    };\n    Cell.prototype.clear = function () {\n        this.cellValue = 0;\n        this.htmlElement.innerText = '';\n    };\n    return Cell;\n}());\nvar Board = /** @class */ (function () {\n    function Board(size) {\n        var _this = this;\n        this.moves = [];\n        this.currentSymbol = -1;\n        this.size = size;\n        this.cells = new Array(size);\n        var table = document.getElementById('tictactoe');\n        var _loop_1 = function (r) {\n            var row = table.insertRow(r);\n            var _loop_2 = function (c) {\n                var cell = row.insertCell(c);\n                cell.className = 'cell';\n                var newCell = new Cell(cell);\n                this_1.cells[r * size + c] = newCell;\n                cell.addEventListener('click', function () { return _this.makeMove(newCell, true, r * size + c); }, false);\n            };\n            for (var c = 0; c < size; c++) {\n                _loop_2(c);\n            }\n        };\n        var this_1 = this;\n        for (var r = 0; r < size; r++) {\n            _loop_1(r);\n        }\n        this.backButton = document.getElementById('back');\n        this.backButton.addEventListener('click', function () {\n            if (_this.moves.length === 0)\n                return;\n            for (var i = 0; i < 2; i++)\n                _this.cells[_this.moves.pop()].clear();\n            if (_this.moves.length === 0)\n                _this.backButton.style.backgroundColor = 'gray';\n        });\n        // Save data\n        window.addEventListener('unload', function () {\n            localStorage.setItem('pw-tictactoe', JSON.stringify({\n                state: _this.cells.map(function (cell) { return cell.cellValue; }),\n                moves: _this.moves,\n                currentSymbol: _this.currentSymbol,\n            }));\n        });\n        // Load data\n        var data = JSON.parse(localStorage.getItem('pw-tictactoe') || '{}');\n        if (!!(data === null || data === void 0 ? void 0 : data.currentSymbol)) {\n            this.currentSymbol = data.currentSymbol;\n            this.moves = data.moves;\n            for (var i = 0; i < data.state.length; i++)\n                if (data.state[i] !== 0)\n                    this.cells[i].setCellValue(data.state[i]);\n            if (this.moves.length > 0)\n                this.backButton.style.backgroundColor = 'black';\n        }\n    }\n    Board.prototype.makeMove = function (cell, shouldComputerMove, id) {\n        if (shouldComputerMove === void 0) { shouldComputerMove = true; }\n        if (cell.setCellValue(this.currentSymbol)) {\n            if (!(this.checkBoard() > -2)) {\n                this.moves.push(id);\n                this.backButton.style.backgroundColor = 'black';\n                this.currentSymbol *= -1;\n                if (shouldComputerMove)\n                    this.calculateComputerMove();\n            }\n        }\n    };\n    Board.prototype.checkBoard = function (dryRun) {\n        if (dryRun === void 0) { dryRun = false; }\n        // Check rows\n        for (var i = 0; i < this.size * this.size; i += 3)\n            if (this.compareCells(i, i + 1) && this.compareCells(i + 1, i + 2))\n                return this.gameFinished(this.cells[i].cellValue, dryRun);\n        for (var i = 0; i < this.size; i++)\n            if (this.compareCells(i, i + 3) && this.compareCells(i + 3, i + 6))\n                return this.gameFinished(this.cells[i].cellValue, dryRun);\n        // Check diagonals\n        if (this.compareCells(0, 4) && this.compareCells(4, 8))\n            return this.gameFinished(this.cells[0].cellValue, dryRun);\n        if (this.compareCells(2, 4) && this.compareCells(4, 6))\n            return this.gameFinished(this.cells[2].cellValue, dryRun);\n        var anyCellLeft = false;\n        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {\n            var cell = _a[_i];\n            if (cell.cellValue === 0)\n                anyCellLeft = true;\n        }\n        if (!anyCellLeft)\n            return this.gameFinished(0, dryRun);\n        return -2;\n    };\n    // Compare two cells\n    Board.prototype.compareCells = function (c1, c2) {\n        var cell1 = this.cells[c1].cellValue;\n        var cell2 = this.cells[c2].cellValue;\n        if (cell1 === 0 || cell2 === 0)\n            return false;\n        if (cell1 === cell2)\n            return true;\n        else\n            return false;\n    };\n    Board.prototype.gameFinished = function (cellType, dryRun) {\n        var _this = this;\n        if (!dryRun)\n            setTimeout(function () {\n                if (cellType === -1)\n                    alert('Wygrał gracz!');\n                else if (cellType === 1)\n                    alert('Wygrał komputer!');\n                else\n                    alert('Remis!');\n                _this.cells = [];\n                _this.moves = [];\n                _this.currentSymbol = -1;\n                location.reload();\n            }, 100);\n        return cellType;\n    };\n    Board.prototype.calculateComputerMove = function () {\n        // Check if computer can win\n        for (var i = 0; i < this.size * this.size; i++)\n            if (this.cells[i].cellValue === 0) {\n                this.cells[i].setCellValue(1);\n                var canWin = this.checkBoard(true) === 1;\n                this.cells[i].clear();\n                if (canWin)\n                    return this.makeMove(this.cells[i], false, i);\n            }\n        // Check if player can win\n        for (var i = 0; i < this.size * this.size; i++)\n            if (this.cells[i].cellValue === 0) {\n                this.cells[i].setCellValue(-1);\n                var canWin = this.checkBoard(true) === -1;\n                this.cells[i].clear();\n                if (canWin)\n                    return this.makeMove(this.cells[i], false, i);\n            }\n        var index = 0;\n        do {\n            index = Math.floor(Math.random() * (this.size * this.size));\n        } while (this.cells[index].cellValue !== 0);\n        this.makeMove(this.cells[index], false, index);\n    };\n    return Board;\n}());\nvar board = new Board(3);\n\n\n//# sourceURL=webpack://tictactoe/./src/app.ts?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/app.ts"]();
/******/ 	
/******/ })()
;