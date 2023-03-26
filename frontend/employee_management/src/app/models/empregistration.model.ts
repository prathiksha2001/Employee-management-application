export class EmployeeRegistration{
    email : string
    password : string    
    designation : string    
    dept_id : number
    doj : Date
    user_type : string
    constructor(email: string,password : string, designation : string, 
        dept_id : number, doj : Date, user_type: string){    
            this.email = email,
            this.password = password,
            this.designation = designation,
            this.dept_id = dept_id,
            this.doj = doj,
            this.user_type = user_type
        }
}