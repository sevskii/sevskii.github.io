$(document).ready(function () {
    var Action = function (a, s, p) {
        this.act = a;
        this.symbol = s;
        this.prioritet = p;
    };

    var actionsArray = [
        new Action(function (a, b) {
            return a + b
        }, '+', 0),
        new Action(function (a, b) {
            return a - b
        }, '-', 0),
        new Action(function (a, b) {
            return a * b
        }, '×', 1),
        new Action(function (a, b) {
            return a / b
        }, '÷', 1),
        new Action(function (a, b) {
            return a * b / 100
        }, '%', 2)
    ];

    var Calculator = function () {
        this.numbers = [];
        this.actions = [];

        this.getString = function () {
            var result = "";
            for (var i = 0; i < Math.max(this.numbers.length, this.actions.length); i++) {
                if (this.numbers[i])
                    result += this.numbers[i] + ' ';
                if (this.actions[i])
                    result += this.actions[i].symbol + ' ';
            }
            return result;
        };
    };

    var history = new Calculator();
    var current = "";
    var currentIsNumber = false;

    function formatString(str) {
        if (str.length == 0)
            return '0';
        var parts = str.split('.');
        var result = '';
        var i = 1;
        while (parts[0].length - i >= 0) {
            result += parts[0][parts[0].length - i];
            if (i % 3 == 0 && parts[0].length - i > 0) {
                result += ',';
            }
            i++;
        }
        return result.split('').reverse().join('') + (parts.length == 2 ? ('.' + parts[1]) : '');
    }

    $('.btn-num').click(function () {
        if (!currentIsNumber && current != '') {
            history.actions.push(actionsArray.find(function (el) {
                return el.symbol == current;
            }));
            console.log(history.actions);
            $('.display-history').text(history.getString());
            current = '';
        }
        currentIsNumber = true;
        var myNum = $(this).text();
        if (!(myNum.indexOf('0') != -1 && current[0] == 0) || current.indexOf('.') != -1) {
            if (myNum == '.' && current.length == 0)
                current += '0.';
            else if (current.length < 13 && (myNum != '.' || current.indexOf('.') == -1)) {
                current += $(this).text();
            }
        }
        $('.display-current').text(formatString(current));
    });

    $('.display-erase').click(function () {
        if (current.length > 0)
            current = current.substr(0, current.length - 1);
        $('.display-current').text(formatString(current));
    });

    $('.btn-CE').click(function () {
        current = '';
        $('.display-current').text(formatString(current));
    });

    $('.btn-AC').click(function () {
        current = '';
        $('.display-current').text(formatString(current));
        history.numbers = [];
        history.actions = [];
        $('.display-history').text(history.getString());
    });

    $('.btn-action-math').click(function () {
        if (history.numbers.length > 0 || current.length > 0) {
            var symbol = $(this).text();
            if (currentIsNumber) {
                history.numbers.push(current);
                currentIsNumber = false;
                $('.display-history').text(history.getString());
            }
            current = symbol;
            $('.display-current').text(current);
        }
    });
});
