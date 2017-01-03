class ClickTrigger {

    static datasetTest(data, ans, assert){
        let done = assert.async(data.length);
        assert.expect(data.length);
        this.eval(data[0]);
        for(let i =0; i < data.length; i++){
            setTimeout(()=>{
                let result = $('.display .value').html();
                assert.ok(result == ans[i], `Passed! ${data[i]} = ${ans[i]}`);
                if(i != data.length-1){
                    this.eval(data[i+1]);
                }
                done();
            }, (i+1) * 100);
        }
        
    }

    static eval(str){
        str.split(" ").map((op)=>{
            let act = '';
            switch(op){
                case '+':
                    act = "oper-add";
                    break;
                case '-':
                    act = "oper-sub";
                    break;
                case '*':
                    act = "oper-mul";
                    break;
                case '/':
                    act = "oper-div";
                    break;
                case '%':
                    act = "oper-mod";
                    break;
                case 'c':
                    act = "c";
                    break;
                case 'ce':
                    act = "ce";
                    break;
                case 'bs':
                    act = "bs";
                    break;
                default:
                    for(let i in op){
                        if(op[i] == '-') continue;
                        act = `val-${op[i]}`;
                        $(`.button[data-content='${act}']`).trigger('click');
                    }
                    if(op[0] == '-')
                        $(".button[data-content='neg']").trigger('click');
                    return;
                    break;
            }
            $(`.button[data-content='${act}']`).trigger('click');
        });
        
        $(".button[data-content='calc']").trigger('click');
    }
}

