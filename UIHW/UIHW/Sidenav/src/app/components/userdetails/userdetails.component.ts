import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserdetailsService } from 'src/app/services/userdetails.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent {
  user_id:any;
  public Users!:any [];
   User:any ={
    username:'',
    userEmail:'',
    userPassword:'',
    city:'',
    gender:'',
    phonenumber:0,
  }
  update:any ={
    username:'',
    userEmail:'',
    userPassword:'',
    city:'',
    gender:'',
    phonenumber:0,
  };

  constructor(
    private user:UserdetailsService ,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshList();
    
  }
  refreshList(){
    this.user.GetUser().subscribe(data=>{
      this.Users=data;
      console.log(this.Users)
    });
  }
Accept(id:number){
  this.User.GetUserById(id).subscribe((data: any)=>{
    this.User=data;
    this.update.username=this.User.username;
    this.update.userEmail=this.User.userEmail;
    this.update.userPassword=this.User.userPassword;
    this.update.city=this.User.city;
    this.update.gender=this.User.gender;
    this.update.phonenumber=this.User.phonenumber;
  })
}
    


onLogout() {
 localStorage.clear();
 this.router.navigate(['/home']);
}
}
  