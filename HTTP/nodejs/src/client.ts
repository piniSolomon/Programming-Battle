import * as http from 'http';
const Domain = "localhost";
const Port = "3000";

interface Result {
    start: Date;
    stop: Date;
    done: boolean;
}

class Client {
    options = {
        host: `${Domain}`,
        port: `${Port}`,
        path: `/showdown`,
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }
    };

    results = {
        start: "",
        stop: ""
    };

    getTiming = new Map<number, Result>();
    postTiming = new Map<number,Result>();
    constructor() {

    }

    getOnce(id: number) {
        return new Promise<number>((resolve, reject) => {
            let result = { start: new Date(), stop: new Date(), done: false };
            this.getTiming.set(id, result);
            http.get(`http://${Domain}:${Port}/showdown/${id}`, (response) => {
                let chunky = 0;
                response.on("data", (chunk) => {
                    chunky = parseInt(chunk);
                    // console.log(`get chunk: ${chunk}`);
                });
                response.on("end", () => {
                    let stop = new Date();
                    let d = this.getTiming.get(chunky) as Result;
                    // console.log(`start ${d.start}`);
                    // console.log(`stop ${stop}`);
                    d.stop = stop;
                    d.done = true;
                    resolve(stop.getTime() - d.start.getTime());
                    // console.log(`get the end`);
                });
            });
        });
    }

    async getMany() {
        let allGets = [];
        let sum = 0;
        let index=0;
        for (; index < 100; index++) {

            /////not using await is supriseingly slow
            // this.getOnce(index).then(val => {
            //     console.log(`this is val ${sum}`);
            //     sum += val;
            // });
            ////the await is much better then `then`
            let val = await this.getOnce(index);
            // console.log(`this is val ${sum}`);
            sum += val;
        }
        // console.log(`this is avg ${sum / 100}`);
        console.log(`finished GET loop index is ${index}`);
        setTimeout(() => {//make sure all the iterations will finish
            console.log(`this is GET avg ${sum / 100}`);
        }, 2000);
    }

    postOnce(id: number):Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let result={start:new Date(), stop:new Date(), done:false};
            this.postTiming.set(id,result);
            let request = http.request(this.options, response => {
                let chuncky=0;
                // console.log(`post status code : ${response.statusCode}`);
                response.on("data", (chuck) => {
                    let chunckObj=JSON.parse(chuck);
                    // console.log(`post chunk: ${chunckObj}`);
                    chuncky=parseInt(chunckObj.id);
                });
                response.on("end", () => {
                    // console.log(`post the end`);
                    let stop=new Date();
                    // console.log(chuncky);
                    let d=this.postTiming.get(chuncky) as Result;
                    //d.stop=stop
                    resolve(stop.getTime()-d.start.getTime());
                });
            });
            request.write(JSON.stringify({ 'id': id }), (error) => {
                // console.log(`post error: ${error}`);
            });
            request.end();
        });
    }

    async postMany() {
        let allPosts = [];
        let sum = 0;
        let index=0;
        for (; index < 100; index++) {
            sum+=await this.postOnce(index);
        }
        // console.log(`this is POST avg ${sum / 100}`);
        console.log(`finished POST loop index is ${index}`);
        setTimeout(() => {//make sure all the iterations will finish
            console.log(`this is POST avg ${sum / 100}`);
        }, 2000);
    }
}
let client = new Client();
client.getMany();
client.postMany();
