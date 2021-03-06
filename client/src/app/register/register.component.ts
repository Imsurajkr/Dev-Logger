import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from '../_services/user.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) { }
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  ngOnInit() {
   this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [ Validators.required ]],
      password: ['', [Validators.required , Validators.minLength(6), Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      confirm_password: ['', Validators.required],
  });
  }

  get fval() { return this.registerForm.controls; }

  onFormSubmit() {
    this.submitted = true;
    // return for here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(
      (data) => {
        //alert('User Registered successfully!!');
        this.router.navigate(['/login']);
     },
      (error) => {
        this.toastr.error(error.error.message, 'Error');
        this.loading = false;
      }
    );
    }

}
