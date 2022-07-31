import { Component, OnInit } from '@angular/core';
import{ FormBuilder, FormGroup } from '@angular/forms'
import { UserModel } from '../models/user.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  formValue !:FormGroup;
  userModelObj : UserModel = new UserModel();
  userData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;
  constructor(private formbuilder: FormBuilder,
    private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      name: [''],
      email: [''],
      gender: [''],
      status: [''],
    })

    this.getAllUser();
  }

  clickAddUser() {
    this.formValue.reset()
    this.showAdd = true;
    this.showUpdate = false;
  }

  postUserDetails(){
    this.userModelObj.name = this.formValue.value.name;
    this.userModelObj.email = this.formValue.value.email;
    this.userModelObj.gender = this.formValue.value.gender;
    this.userModelObj.status = this.formValue.value.status;

    this.api.postUser(this.userModelObj)
    .subscribe(res => {
      console.log(res);
      alert("User Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllUser();
    }, 
    // err=> {
    //   alert("Something Went Wrong")
    // }
    )
  }

  getAllUser(){
    this.api.getUser(this.api)
    .subscribe(res=> {
       this.userData = res;

    })
  }

  deleteUser(row: any){
    this.api.deleteUser(row.id)
    .subscribe(res => {
      alert("User Deleted")
      this.getAllUser()
    })
  }
  
  onEdit(row:any){
    this.showAdd = false;
    this.showUpdate = true;
    this.userModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name)
    this.formValue.controls['email'].setValue(row.email)
    this.formValue.controls['gender'].setValue(row.gender)
    this.formValue.controls['status'].setValue(row.status)
}

updateUserDetails(){
  this.userModelObj.name = this.formValue.value.name;
  this.userModelObj.email = this.formValue.value.email;
  this.userModelObj.gender = this.formValue.value.gender;
  this.userModelObj.status = this.formValue.value.status;
  this.api.updateUser( this.userModelObj)
  .subscribe(res => {
    alert("Updated Successfully");
    let ref = document.getElementById('cancel')
    ref?.click();
    this.formValue.reset();
    this.getAllUser();
  })

}

}
