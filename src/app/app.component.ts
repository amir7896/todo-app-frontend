import { Component ,OnInit} from '@angular/core';
import { TodoService } from './app.service' ;
import { FormBuilder , FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Todo} from './app.model';

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
  task: any;
  constructor(private todoService : TodoService, 
    private formBuilder : FormBuilder, 
    private router:Router, 
    private toastr: ToastrService,
    private route: ActivatedRoute
    ) { }

  createForm(){
    this.form = this.formBuilder.group({
      title: [''],
      isDone: [false]
    })
  }


  ngOnInit(): void {
    this.getTodosData();
    this.createForm();
  }

  getTodosData(){
    this.todoService.getData().subscribe(res => {
      console.log(res);
      this.tasks = res;
    })
  }

  insertData(){
    this.todoService.insertData(this.form.value).subscribe(res => {
      this.data = res;
      this.getTodosData();
      this.todoclear='';
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
        timeOut:2000,
        progressBar:true
      });
      this.router.navigateByUrl('/');
    });
  }

  deleteData(id: string){
    this.todoService.deleteData(id).subscribe(res =>{
      this.data= res;
      this.getTodosData();
      this.toastr.error(JSON.stringify(this.data.code), JSON.stringify(this.data.message),{
        timeOut:2000,
        progressBar:true
      });
      this.router.navigateByUrl('/');
    })
  }

  updateTodo(task: any){
    console.log('task:', task);
    this.todoService.updateData(task._id, task).subscribe(res => {
      this.data= res
      this.toastr.success(JSON.stringify(this.data.code), JSON.stringify(this.data.message), {
        timeOut: 3000,
        progressBar: true
      });
    })
    
  }
  
}
