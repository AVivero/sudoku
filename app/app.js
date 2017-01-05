$(document).ready(function() {

    (function startGame() {
        $.ajax({
            url: "http://fvi-grad.com:4004/sudoku",
            success: function(response) {
                board = response;
                setBoard();
            }
        });
    })();

    $('input').on('change', function() {
        if (['1', '2', '3', '4', '5', '6', '7', '8', '9'].indexOf($(this).val()) !== -1) {
            board[this.id.charAt(1) - 1][this.id.charAt(2) - 1] = $(this).val();
            console.log(board[this.id.charAt(1) - 1][this.id.charAt(2) - 1]);
            console.log(board);
        } else {
            $(this).val('');
        }

    });

    $('#checkSolution').on('click', function() {
        if (checkSolution(board))
            alert('Solution correct!');
        else
            alert('Solution incorrect');
    });


});

var board = [];

function setBoard() {
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board.length; j++) {
            $('#p' + (i + 1) + (j + 1)).val(board[i][j]);
        }
    }
}


function checkSolution(array) {
    return (checkRows(array) && checkColumns(array) && checkSubCuadrants(array));
}

function checkRows(array) {
    var temp = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++)
            temp.push[array[i][j]];
        if (!checkArray(temp))
            return false;
    }
    return true;
}


function checkColumns(array) {
    var temp = [];
    for (var i = 0; i < array.length; i++) {
        for (var j = 0; j < array.length; j++)
            temp.push[array[j][i]];
        if (!checkArray(temp))
            return false;
    }
    return true;
}

function checkSubCuadrants(array) {
    for (var i = 0; i < array.length; i += 3) {
        for (var j = 0; j < array.length; j += 3) {
            if (!checkArray(getSubCuadrant(array, i, j)))
                return false;
        }
    }
    return true;
}

function getSubCuadrant(array, row, col) {
    var temp = [];
    for (var i = row; i < row + 3; i++) {
        for (var j = 0; j < col + 3; j++) {
            temp.push(array[i, j])
        }
    }
    return temp;
}

function checkArray(array) {
    return JSON.stringify(array.sort()) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9])
}
