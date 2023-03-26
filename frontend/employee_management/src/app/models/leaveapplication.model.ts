export class LeaveApplication{   
    emp_id : number    
    start_date : Date
    end_date : Date
    reason : string    
    type: { name: string };

    constructor(emp_id : number, start_date : Date, end_date : Date, reason: string, type : {name: string}){
        this.emp_id = emp_id,
        this.start_date = start_date,
        this.end_date =end_date,
        this. reason = reason,
        this.type = type
    }
}