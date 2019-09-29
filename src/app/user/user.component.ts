import { Component, OnInit } from '@angular/core';
import  { UserService } from "../user.service";
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  userForm: FormGroup;
  searchStr="";
  searchStrChanged: Subject<string> = new Subject<string>();
  searchedUserList:any = [];
  userList:any = [];
  isResEmpty: boolean = false;
  fillAllField: boolean = false;
  constructor(private userService: UserService, private _formBuilder: FormBuilder) {
    this.searchStrChanged
              .asObservable()
              .pipe(debounceTime(600))
              .pipe(distinctUntilChanged())
              .subscribe(model => {
                  this.getDataFromAPI(model);
                 });
  }

  ngOnInit() {
      this.userForm = this._formBuilder.group({
        userName: ['', Validators.required],
        phoneNumber: ['', Validators.required],
        address: ['', Validators.required]
      })
      this.getUserList();
  }

  getUserList() {
    this.userService.fetchUsers()
    .subscribe(res => {
      this.userList = res;
    })
  }

  addUser(userForm) {
    let value = userForm.value;
    if(value && value.userName != "" && value.phoneNumber != "" && value.address != "") {
      this.fillAllField = false;
        this.userService.addUser(value)
        .subscribe(res => {
         this.userList.push(res);
       },
       error =>{
         console.debug("something went wrong");
       });
      }
    else {
      this.fillAllField = true;
    }
  }

  deleteUser(index, id){
    this.userService.deletehUser(id)
    .subscribe(res => {
      this.userList.splice(index, 1);
    },
    error =>{
      console.debug("something went wrong");
    })
  }

  searchUser(eve) {
    if(eve && eve.trim('').length > 2) {
      this.searchStrChanged.next(eve);
    } else {
      this.isResEmpty = false;
      this.searchedUserList = [];
    }

  }

  private getDataFromAPI(searchStr){
    this.userService.searchUser(searchStr)
    .subscribe((res)=>{
      this.searchedUserList = res;
      if(this.searchedUserList && this.searchedUserList.length > 0 ) {
          this.isResEmpty = false;
      } else {
        this.isResEmpty = true;
      }
    },
    (err)=>{

    })
  }
}
