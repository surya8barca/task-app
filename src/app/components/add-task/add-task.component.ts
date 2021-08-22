import { Component, OnInit,EventEmitter,Output } from '@angular/core';
import { Task } from 'src/app/task';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css']
})
export class AddTaskComponent implements OnInit {

  text!:string;
  day!:string;
  reminder:boolean=false;
  showAddTask:boolean=false;
  subscription:Subscription;

  @Output() addTask:EventEmitter<Task> = new EventEmitter();

  constructor(private uiService:UiService) {

    this.subscription=this.uiService.onToggle().subscribe(
      (value)=> this.showAddTask=value
    )
   }

  ngOnInit(): void {
  }


  onSubmit(){
    const newTask={
      text:this.text,
      day:this.day,
      reminder:this.reminder
    }

    this.addTask.emit(newTask);

    this.text='';
    this.day='';
    this.reminder=false;

    this.uiService.toggleAddTask();

  }
}
