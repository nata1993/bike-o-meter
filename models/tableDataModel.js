import fs from 'fs';

export default class Entry {
    constructor(date, odo, work, cost, time, next){
        this.date = date;
        this.odo = odo;
        this.work = work;
        this.cost = cost;
        this.time = time;
        this.next = next;
    }

    // refactor to use sqlite database instead of json file
    insertData(){
        let oldData = fs.readFileSync('data.json', 'utf-8', (err, jsonFileData) => {
            if (err) {
                throw err;
            }

            return jsonFileData;
        });

        let newData = JSON.parse(oldData);
        newData.push(this);

        let updatedData = JSON.stringify(newData);

        fs.writeFileSync('data.json', updatedData, (err) => {
            if(err){
                throw err;
            }
            console.log("New table data is inserted.");
        });
    }

    // refactor to use sqlite database instead of json file
    static readData(){
        return fs.readFileSync('data.json', 'utf-8', (err, jsonFileData) => {
            if (err) {
                throw err;
            }
            
            return jsonFileData;
        });
    }
}