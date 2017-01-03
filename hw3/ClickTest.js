QUnit.module('button click simple eval test');

QUnit.test("simple add test", function(assert){

    let data = ["12 + 23", "12 + 45", "12 + 67"];
    let ans  = [35, 57, 79];
    ClickTrigger.datasetTest(data, ans, assert);
});

QUnit.test("simple sub test", function(assert){
    let data = ["2016 - 2017", "1 - 2 - 3", "22 - 11", "88 - 87"];
    let ans  = [-1, -4, 11, 1];
    ClickTrigger.datasetTest(data, ans, assert);
});

QUnit.test("simple mul test", function(assert){
    let data = ["9 * 4 * 8 * 7", "1 * 1 * -1", "2 * 2 * 512", "11 * 123"];
    let ans  = [2016, -1, 2048, 1353];
    ClickTrigger.datasetTest(data, ans, assert);
});

QUnit.test("simple div test", function(assert){
    let data = ["999 / 111 / 3", "2048 / 2", "512 / 2", "256 / 2"];
    let ans  = [3, 1024, 256, 128];
    ClickTrigger.datasetTest(data, ans, assert);
});

QUnit.test("simple mod test", function(assert){
    let done = assert.async();
    ClickTrigger.eval("5566 % 3");
    setTimeout(()=>{
        let result = $('.display .value').html();
        assert.ok(result == 1, "Passed!");
        done();
    });
});

