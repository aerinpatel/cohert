import blessed from 'blessed';

const screen = blessed.screen({
  smartCSR: true
});

const box = blessed.box({
  top: 'center',
  left: 'center',
  width: '50%',
  height: '50%',
  content: 'Hello {bold}world{/bold}!',
  border: 'line',
  style: {
    fg: 'blue',
    border: {
      fg: '#f0f0f0'
    }
  }
});

screen.append(box);

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  process.exit(0);
});

screen.render();