'use strict';

{
  class Panel {
    constructor(row, col, game) {
      this.game = game;
      this.row = row;
      this.col = col;
      this.el = document.createElement('li');
      this.el.classList.add('pressed');
      this.el.addEventListener('click', () => {
        this.press(this.row, this.col);
        this.press(this.row - 1, this.col);
        this.press(this.row + 1, this.col);
        this.press(this.row, this.col - 1);
        this.press(this.row, this.col + 1);
        this.check();

      });
    }
    
    getEl() {
      return this.el;
    }
    
    activate() {
      this.el.classList.remove('pressed');
    }

    press(row, col) {
      if (row < 0 || col < 0 || row > this.game.getLevel() - 1 || col > this.game.getLevel() - 1){
        return;
      }

      const ul = document.querySelectorAll('ul')[row];
      const li = ul.querySelectorAll('li')[col];
      if (li.classList.contains('pressed')) {
        li.classList.remove('pressed');
      } else {
        li.classList.add('pressed');
      }
    }

    check() {
      if (!this.game.isRunning) {
        return;
      }
      for (let row = 0; row < this.game.getLevel(); row++) {
        const ul = document.querySelectorAll('ul')[row];
        for (let col = 0; col < this.game.getLevel(); col++) {
          const li = ul.querySelectorAll('li')[col];
          if (!li.classList.contains('pressed')) {
            return;
          } 
        }
      }
      clearTimeout(this.game.getTimeoutId());
      const congratulations = document.getElementById('congratulations');
      congratulations.classList.remove('hidden');
      mask.classList.remove('hidden');
      this.game.isRunning = false;
    }
  }

  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      this.setup();
    }
    
    setup() {
      const board = document.getElementById('board');
      for (let row = 0; row < this.game.getLevel(); row++) {
        const ul = document.createElement('ul');
        board.appendChild(ul);
        for (let col = 0; col < this.game.getLevel(); col++) {
          this.panels.push(new Panel(row, col, this.game));
          board.children[row].appendChild(this.panels[row * this.game.getLevel() + col].getEl());
        }
      }
    }

    activate() {
      this.panels.forEach(panel => {
        panel.activate();
      });
      for (let i = 0; i < this.game.getLevel() ** 2; i++) {
        const row = Math.floor(Math.random() * this.game.getLevel());
        const col = Math.floor(Math.random() * this.game.getLevel());
        this.press(row, col);
        this.press(row - 1, col);
        this.press(row + 1, col);
        this.press(row, col - 1);
        this.press(row, col + 1);
      }
    }

    press(row, col) {
      if (row < 0 || col < 0 || row > this.game.getLevel() - 1 || col > this.game.getLevel() - 1){
        return;
      }

      const ul = document.querySelectorAll('ul')[row];
      const li = ul.querySelectorAll('li')[col];
      if (li.classList.contains('pressed')) {
        li.classList.remove('pressed');
      } else {
        li.classList.add('pressed');
      }
    }
  }

  class Game {
    constructor(level) {
      this.level = level;
      this.board = new Board(this);

      this.startTime = undefined;
      this.timeoutId = undefined;
      this.isRunning = false;
      
      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
      this.setup();
    }

    setup() {
      const container = document.getElementById('container');
      const PANEL_WIDTH = 50;
      const BOARD_PADDING = 10;
      container.style.width = PANEL_WIDTH * this.level + BOARD_PADDING * 2 + 'px';

      const congratulations = document.getElementById('congratulations');
      const TITLE_HIEGHT = 43;
      const CONG_HIEGHT = 109;
      congratulations.style.top = TITLE_HIEGHT + BOARD_PADDING + PANEL_WIDTH * this.level / 2 - CONG_HIEGHT / 4 + 'px';
    }

    start() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }

      this.board.activate();
      this.isRunning = true;

      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById('timer');
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);
    
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    getTimeoutId() {
      return this.timeoutId;
    }

    getLevel() {
      return this.level;
    }

  }

  const board = document.getElementById('board');

  new Game(parseInt(board.dataset.level, 10) + 3);
}