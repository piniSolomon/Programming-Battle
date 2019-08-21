
export class LeibnizFormula {
    constructor() {
        
    }

    async seriesCalculation(){//avg 14
        let seriesSum=0;
        let goal=Math.PI/4;
        console.log(`this is the goal: ${goal}`);
        let start = new Date();
        let n=0;
        for (; Math.abs(seriesSum-goal) > 0.000001 && n<300000; n++) {
            seriesSum+=this.liebnizOnceSync(n);
            // seriesSum+=await this.liebnizOnce(n);
        }
        let stop =new Date();
        console.log(`elapsed: ${stop.getTime()-start.getTime()} | score: ${seriesSum} (${n})`);
    }

    validateTime(){
        let start=new Date();
        setTimeout(() => {
            let stop=new Date();
            console.log(stop.getTime()-start.getTime());
        }, 2000);
    }


    liebnizOnceSync(n:number){
        return (Math.pow(-1,n))/(2*n+1);
    }

    //not sure why but this is slower
    liebnizOnce(n:number):Promise<number>{
        return new Promise((resolve,reject)=>{
            try{
                resolve((Math.pow(-1,n))/(2*n+1));

            }catch(error){
                console.error(error);
            }
        });
    }
}

let main=new LeibnizFormula();
main.seriesCalculation();