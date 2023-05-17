const obj = {}

for (let i = 0; i <1000; i++){
    let numer = Math.floor(Math.random()*25 + 1)
    if(!obj[numer]){
        obj[numer] =1
    }else{
        obj[numer] ++
    }
}

console.log(obj)