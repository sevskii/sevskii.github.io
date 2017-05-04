$(document).ready(function () {
    var Action = function (a, s, p) {
        this.act = a;
        this.symbol = s;
        this.prioritet = p;
    };

    var actionsArray = [
        new Action(function (a, b) {
            return a + b;
        }, '+', 0),
        new Action(function (a, b) {
            return a - b;
        }, '-', 0),
        new Action(function (a, b) {
            return a * b;
        }, '×', 1),
        new Action(function (a, b) {
            return a / b;
        }, '÷', 1)
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

        this.solve = function () {
            return solveThis(this.numbers, this.actions);
        };

        function solveThis(numbers, actions) {
            if (actions.length == 0)
                return numbers[0];
            var actionInd = 0;
            for (var i = 1; i < actions.length; i++) {
                if (actions[i].prioritet > actions[actionInd].prioritet)
                    actionInd = i;
            }
            var actionResult = actions[actionInd].act(Number.parseFloat(numbers[actionInd]), Number.parseFloat(numbers[actionInd + 1]));

            if (numbers.length == 2)
                return actionResult;

            var newNumbers = numbers.slice(0, actionInd);
            newNumbers.push(actionResult);
            var newActions = actions.slice(0, actionInd);

            if (actionInd + 2 < numbers.length) {
                newNumbers = newNumbers.concat(numbers.slice(actionInd + 2));
                newActions = newActions.concat(actions.slice(actionInd + 1));
            }


            return solveThis(newNumbers, newActions);
        }
        //1+2*3
    };

    var history = new Calculator();
    var current = "0";
    var currentIsNumber = true;

    function formatString(str) {
        str = str.substr(0, 13);
        var parts = str.split('.');
        var result = '';
        var i = 1;
        while (parts[0].length - i >= 0) {
            result += parts[0][parts[0].length - i];
            var symbCode = parts[0].charCodeAt(parts[0].length - i - 1);
            if (i % 3 == 0 && parts[0].length - i > 0 && (symbCode >= '0'.charCodeAt(0) && symbCode <= '9'.charCodeAt(0))) {
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
            $('.display-history').text(history.getString());
            current = '0';
        }
        currentIsNumber = true;
        var myNum = $(this).text();
        if ((current.length == 0 || current == '0') && myNum == '00')
            current = '0';
        else if (current == '0' && myNum != '.')
            current = myNum;
        else if (!(myNum.indexOf('0') != -1 && current[0] == '0') || current.indexOf('.') != -1) {
            if (myNum == '.' && current == '0')
                current = '0.';
            else if (current.length < 13 && (myNum != '.' || current.indexOf('.') == -1)) {
                current += myNum;
            }
        }
        $('.display-current').text(formatString(current));
    });

    $('.display-erase').click(function () {
        if (current.length > 0) {
            current = current.substr(0, current.length - 1);
            currentIsNumber = true;
        }
        if (current.length == 0)
            current = '0'
        if ($('.display-current').text() == 'Infinity' || $('.display-current').text() == 'NaN')
            current = '0';
        $('.display-current').text(formatString(current));
    });

    $('.btn-CE').click(function () {
        current = '0';
        currentIsNumber = true;
        $('.display-current').text(formatString(current));
    });

    $('.btn-AC').click(function () {
        current = '0';
        currentIsNumber = true;
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

    $('.btn-solve').click(function () {
        if (currentIsNumber)
            history.numbers.push(current);
        currentIsNumber = true;
        current = history.solve().toString();

        $('.display-current').text(formatString(current));

        history.numbers = [];
        history.actions = [];
        $('.display-history').text(history.getString());
    });
});
