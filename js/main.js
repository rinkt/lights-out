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
      if (row < 0 || col < 0 || row > 3 || col > 3){
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
      for (let row = 0; row < 4; row++) {
        const ul = document.querySelectorAll('ul')[row];
        for (let col = 0; col < 4; col++) {
          const li = ul.querySelectorAll('li')[col];
          if (!li.classList.contains('pressed')) {
            return;
          } 
        }
      }
      clearTimeout(this.game.getTimeoutId());
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
      for (let row = 0; row < 4; row++) {
        const ul = document.createElement('ul');
        board.appendChild(ul);
        for (let col = 0; col < 4; col++) {
          this.panels.push(new Panel(row, col, this.game));
          board.children[row].appendChild(this.panels[row * 4 + col].getEl());
        }
      }
    }

    activate() {
      this.panels.forEach(panel => {
        panel.activate();
      });
      for (let i = 0; i < 20; i++) {
        const row = Math.floor(Math.random() * 4);
        const col = Math.floor(Math.random() * 4);
        this.press(row, col);
        this.press(row - 1, col);
        this.press(row + 1, col);
        this.press(row, col - 1);
        this.press(row, col + 1);
      }
    }

    press(row, col) {
      if (row < 0 || col < 0 || row > 3 || col > 3){
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
    constructor() {
      this.board = new Board(this);

      this.startTime = undefined;
      this.timeoutId = undefined;
      
      const btn = document.getElementById('btn');
      btn.addEventListener('click', () => {
        this.start();
      });
    }

    start() {
      if (typeof this.timeoutId !== 'undefined') {
        clearTimeout(this.timeoutId);
      }

      this.board.activate();

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

  }

  new Game();
}