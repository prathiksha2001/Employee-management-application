from ... import models


def check_leave_availability(emp_id,no_of_days, leave_type_id,db):
    leave_availability = db.query(models.LeaveBalance).filter(emp_id == emp_id, leave_type_id == leave_type_id).first()
    if no_of_days <= leave_availability.leave_balance:
        return True
    return False