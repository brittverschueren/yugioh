window.onload = function () {
    function random() {
        return Math.round(Math.random() * 5) + 1;
    };

    document.querySelector('.dobbelsteen>.button').addEventListener('click', function () {
        var getal = random();
        document.querySelector('.dobbelsteen>.result>p').innerHTML = getal;
    });

    var storage = window.localStorage.getItem('history-' + player);
    var state = (storage && JSON.parse(storage)) || {
        monstercards: [0, 0, 0, 0, 0],
        spell: [0, 0, 0, 0, 0],
        lifepoints: 8000
    };

    var otherPlayerStorage = window.localStorage.getItem('history-' + otherPlayer);
    var otherPlayerState = (otherPlayerStorage && JSON.parse(otherPlayerStorage)) || {
        monstercards: [0, 0, 0, 0, 0],
        spell: [0, 0, 0, 0, 0],
        lifepoints: 8000
    };

    document.getElementById('player-' + otherPlayer + '-lp').innerHTML = ' (' + otherPlayerState.lifepoints + ')';

    document.querySelectorAll('.all-counters>.counter-container:nth-of-type(1)>.counter-count').forEach(function (element, index) {
        element.querySelector('.plus').addEventListener('click', function () {
            state.monstercards[index]++;
            draw();
        });
        element.querySelector('.minus').addEventListener('click', function () {
            state.monstercards[index]--;
            draw();
        });
    });
    document.querySelectorAll('.all-counters>.counter-container:nth-of-type(2)>.counter-count').forEach(function (element, index) {
        element.querySelector('.plus').addEventListener('click', function () {
            state.spell[index]++;
            draw();
        });
        element.querySelector('.minus').addEventListener('click', function () {
            state.spell[index]--;
            draw();
        });
    });

    function draw() {
        window.localStorage.setItem('history-' + player, JSON.stringify(state));
        var monster = document.querySelectorAll('.all-counters>.counter-container:nth-of-type(1)>.counter-count>.counter-card>p');
        var spell = document.querySelectorAll('.all-counters>.counter-container:nth-of-type(2)>.counter-count>.counter-card>p');
        var total = document.querySelector('.total');
        var lp = document.getElementById('player-' + player + '-lp').innerHTML = ' (' + state.lifepoints + ')'

        monster.forEach(function (element, index) {
            element.innerHTML = state.monstercards[index];
        });

        spell.forEach(function (element, index) {
            element.innerHTML = state.spell[index];
        });

        total.innerHTML = state.lifepoints;
    }

    function KeyPad(player) {
        var self = this;

        var total = document.querySelector('.total');

        function updateTotal(value) {
            state.lifepoints = value;
            draw();
        }

        function click(value) {
            if (value === 'EXE') {
                updateTotal(eval(total.innerHTML));
                return;
            }
            if (value === 'CE') {
                updateTotal(total.innerHTML.substr(0, total.innerHTML.length - 1));
                return;
            }
            self.emitter && self.emitter(value);
            updateTotal(total.innerHTML + (value + ''));
        }

        var keypad = document.getElementsByClassName('keypad').item(0);
        keypad.querySelectorAll('.key').forEach(function (element) {
            var value = element.innerHTML;
            element.addEventListener('click', function () {
                click(value);
            });
        });
        self.onClick = function onClick(fn) {
            self.emitter = fn;
        }
        self.updateTotal = updateTotal;
    };
    var keypadOne = new KeyPad(player);
    draw();
}