QUnit.module('evaluate test');
QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});

QUnit.test("eval1", function(assert){
    let data = [
        ['val', '1'],
        ['oper', 'add'],
        ['val', '2']
    ];
    let result = evaluate(data);
    assert.ok( 3 == result, "Passed!" );
});

QUnit.test("eval2", function(assert){

    var $btn = $(".button[data-content='val-1']");
    $btn.on('click', function(){
        console.log("Hello");
        assert.ok(true, "Passed!");
    });
    
    $btn.trigger("click");

});

