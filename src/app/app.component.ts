import { Component ,OnInit} from '@angular/core';
import { TodoService } from './app.service' ;
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  form!: FormGroup;
  tasks :any;
  title = 'frontend';
  data: any;
  todoclear :any='';
  constructor(private todoService : TodoService, private formBuilder : FormBuilder, private router:Router, private toastr: ToastrService,
    private route: ActivatedRoute) { }

  createForm(){
    this.form = this.formBuilder.group({
      todos: ['']
    })
  }

  ngOnInit(): void {
    this.getEmployeesData();
    this.createForm();
  }
  getEmployeesData(){
    this.todoService.getData().subscribe(res => {
      console.log(res);
      this.tasks = res;
    })
  }

  insertData(){
    this.todoService.insertData(this.form.value).subscribe(res => {
      this.data = res;
      this.getEmployeesData();
      this.todoclear='';
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
        timeOut:2000,
        progressBar:true
      });
      this.router.navigateByUrl('/');
    });
  }

  deleteData(id: any){
    this.todoService.deleteData(id).subscribe(res =>{
      this.data= res;
      this.getEmployeesData();
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
        timeOut:2000,
        progressBar:true
      });
      this.router.navigateByUrl('/');
    })
  }
// updateStatus(todo:any){
//   var _todo = {
//     _id: todo._id,
//     todos: todo.todos,
//     isDoen:todo.isDoen
//   }
//   this.todoService.updateData(_todo)
}



