var evaluate = require('./0216010/calc');

QUnit.test("eval", function(assert){
    let data = [
        ['val', '1'],
        ['oper', 'add'],
        ['val', '2']
    ];
    let result = evaluate(data);
    assert.ok( 3 == result, "Passed!" );
});


QUnit.test("56不能亡", function(assert){
    let data = [
        ['val', '55'],
        ['oper', 'mul'],
        ['val', '100'],
        ['oper', 'add'],
        ['val', '66']
    ];
    let result = evaluate(data);
    assert.ok( 5566 == result, "Passed!" );
});

