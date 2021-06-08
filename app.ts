class Cell {
	cellValue: number = 0;
	htmlElement: HTMLElement;
	constructor(cell: HTMLElement) {
		this.htmlElement = cell;
	}

	setCellValue(value: number): boolean {
		if (this.cellValue !== 0) return false;

		this.cellValue = value;
		this.htmlElement.innerText = value === -1 ? 'O' : 'X';

		return true;
	}

	clear() {
		this.cellValue = 0;
		this.htmlElement.innerText = '';
	}
}

class Board {
	cells: Cell[];
	size: number;
	moves: number[] = [];
	currentSymbol: number = -1;
	backButton: HTMLButtonElement;

	constructor(size: number) {
		this.size = size;
		this.cells = new Array(size);
		let table = <HTMLTableElement>document.getElementById('tictactoe');
		for (let r = 0; r < size; r++) {
			let row = table.insertRow(r);
			for (let c = 0; c < size; c++) {
				let cell = <HTMLTableDataCellElement>row.insertCell(c);
				cell.className = 'cell';
				const newCell = new Cell(cell);
				this.cells[r * size + c] = newCell;
				cell.addEventListener(
					'click',
					() => this.makeMove(newCell, true, r * size + c),
					false
				);
			}
		}

		this.backButton = <HTMLButtonElement>document.getElementById('back');
		this.backButton.addEventListener('click', () => {
			if (this.moves.length === 0) return;

			for (let i = 0; i < 2; i++) this.cells[this.moves.pop()].clear();

			if (this.moves.length === 0)
				this.backButton.style.backgroundColor = 'gray';
		});

		// Save data
		window.addEventListener('unload', () => {
			localStorage.setItem(
				'pw-tictactoe',
				JSON.stringify({
					state: this.cells.map((cell) => cell.cellValue),
					moves: this.moves,
					currentSymbol: this.currentSymbol,
				})
			);
		});

		// Load data
		const data = JSON.parse(localStorage.getItem('pw-tictactoe') || '{}');
		if (!!data?.currentSymbol) {
			this.currentSymbol = data.currentSymbol;
			this.moves = data.moves;
			for (let i = 0; i < data.state.length; i++)
				if (data.state[i] !== 0)
					this.cells[i].setCellValue(data.state[i]);

			if (this.moves.length > 0)
				this.backButton.style.backgroundColor = 'black';
		}
	}
	makeMove(cell: Cell, shouldComputerMove: boolean = true, id: number): void {
		if (cell.setCellValue(this.currentSymbol)) {
			if (!(this.checkBoard() > -2)) {
				this.moves.push(id);
				this.backButton.style.backgroundColor = 'black';
				this.currentSymbol *= -1;
				if (shouldComputerMove) this.calculateComputerMove();
			}
		}
	}
	checkBoard(dryRun: boolean = false): number {
		// Check rows
		for (let i = 0; i < this.size * this.size; i += 3)
			if (this.compareCells(i, i + 1) && this.compareCells(i + 1, i + 2))
				return this.gameFinished(this.cells[i].cellValue, dryRun);

		for (let i = 0; i < this.size; i++)
			if (this.compareCells(i, i + 3) && this.compareCells(i + 3, i + 6))
				return this.gameFinished(this.cells[i].cellValue, dryRun);

		// Check diagonals
		if (this.compareCells(0, 4) && this.compareCells(4, 8))
			return this.gameFinished(this.cells[0].cellValue, dryRun);

		if (this.compareCells(2, 4) && this.compareCells(4, 6))
			return this.gameFinished(this.cells[2].cellValue, dryRun);

		let anyCellLeft: boolean = false;
		for (let cell of this.cells)
			if (cell.cellValue === 0) anyCellLeft = true;

		if (!anyCellLeft) return this.gameFinished(0, dryRun);

		return -2;
	}
	// Compare two cells
	compareCells(c1: number, c2: number): boolean {
		const cell1 = this.cells[c1].cellValue;
		const cell2 = this.cells[c2].cellValue;
		if (cell1 === 0 || cell2 === 0) return false;
		if (cell1 === cell2) return true;
		else return false;
	}
	gameFinished(cellType: number, dryRun: boolean): number {
		if (!dryRun)
			setTimeout(() => {
				if (cellType === -1) alert('Wygrał gracz!');
				else if (cellType === 1) alert('Wygrał komputer!');
				else alert('Remis!');

				this.cells = [];
				this.moves = [];
				this.currentSymbol = -1;
				location.reload();
			}, 100);

		return cellType;
	}
	calculateComputerMove() {
		// Check if computer can win
		for (let i = 0; i < this.size * this.size; i++)
			if (this.cells[i].cellValue === 0) {
				this.cells[i].setCellValue(1);
				const canWin = this.checkBoard(true) === 1;
				this.cells[i].clear();

				if (canWin) return this.makeMove(this.cells[i], false, i);
			}

		// Check if player can win
		for (let i = 0; i < this.size * this.size; i++)
			if (this.cells[i].cellValue === 0) {
				this.cells[i].setCellValue(-1);
				const canWin = this.checkBoard(true) === -1;
				this.cells[i].clear();

				if (canWin) return this.makeMove(this.cells[i], false, i);
			}

		let index = 0;
		do {
			index = Math.floor(Math.random() * (this.size * this.size));
		} while (this.cells[index].cellValue !== 0);

		this.makeMove(this.cells[index], false, index);
	}
}

const board = new Board(3);
