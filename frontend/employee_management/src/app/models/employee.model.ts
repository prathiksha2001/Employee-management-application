export class Employee{
    id : number
    email : string    
    designation : string    
    department : string
    doj : Date
    user_type : string
    constructor(id:number, email: string, designation : string, 
        department : string, doj : Date, user_type: string){
            this.id = id,
            this.email = email,
            this.designation = designation,
            this.department = department,
            this.doj = doj,
            this.user_type = user_type
        }
}