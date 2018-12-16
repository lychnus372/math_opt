
// define vector
class Vector {
    constructor(x=0, y=0){
        if(typeof x === 'object'){
            this.x = x.x;
            this.y = x.y;
        }else{
            this.x = x;
            this.y = y;
        }
    }

    add(vec){
        return new Vector(vec.x + this.x, vec.y + this.y);
    }

    sub(vec){
        return new Vector(vec.x - this.x, vec.y - this.y);
    }

    mul(c){
        return new Vector(this.x*c, this.y*c);
    }

    dot(vec){
        return vec.x*this.x + vec.y*this.y;
    }

    abs(){
        return Math.sqrt(this.x**2 + this.y**2);
    }
}

// devine initial value
let x = new Vector(0, 0);

// define input function
const f = (vec)=>{
    const x = vec.x, y = vec.y;
    return -1*(2*y-x)**2 - (2-x)**2;
};

// define gradient of function
const grad_f = (vec)=>{
    const x = vec.x, y = vec.y;
    return new Vector(2*(2*y-x) + 2*(2-x), -4*(2*y-x));
};

//define F
const F = (t)=>{
    return f(x.add(grad_f(x).mul(t)));
};

// define dF/dt
const dFdt = (t)=>{
    return grad_f(x).dot(grad_f(x.add(grad_f(x).mul(t))));
};



// define sgn
const sgn = (x)=>{
    if(x>0){
        return 1;
    }else if(x<0){
        return -1;
    }else{
        return 0;
    }
};

// search
const search = (func, func_dif)=>{

    const h0 = Math.PI/3;
    const epsilon = 0.001;
    let x = 0, h = h0, X, X_;

    do{
        //2
        h = sgn(func_dif(x)) * Math.abs(h);
        X = x;
        X_ = x + h;
        
        if(func(X) < func(X_)){
            //3-a
            do{
                h *= 2;
                X = X_;
                X_ = x + h;
            }while(func(X) < func(X_));
            //3-b
            x = X;
            h /= 2;
        }else{
            //4-a
            do{
                h /= 2;
                X_ -= h;
            }while(func(X) > func(X_));
            //4-b
            x = X_;
            h *= 2;
        }
    }while(Math.abs(h) > epsilon);

    iter=0;
    return x.toPrecision(4);
};


const hill_climbing = ()=>{

    const delta = 0.01;
    let t, dx;

    do{
        console.log(x);
        t = search(F, dFdt);
        dx = new Vector(grad_f(x).mul(t));
        x = x.add(dx);
    }while(dx.abs() > delta);
    return x;
};

hill_climbing();