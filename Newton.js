const Newton = (func_dif, func_sec_dif, init)=>{
    let x = init, x_ = 0;
    const delta = 0.0000001
    do{
        console.log(x);
        x_ = x;
        x = x_ - func_dif(x)/func_sec_dif(x);
    }while(Math.abs(x - x_) >= delta);
    return x;
};

Newton((x)=>{
	return 6*x**2-14*x+3;
},(x)=>{
	return 12*x-14;
}, 3);