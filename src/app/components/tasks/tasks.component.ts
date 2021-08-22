import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/task';
import { TaskService } from 'src/app/services/task.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @Input() task!: Task[];

  tasks: Task[] = [];



  constructor(private taskService: TaskService) { }

  ngOnInit(): void {

    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }

  deleteTask(task: Task) {

    if (confirm("Are you sure you want to Delete this task?")) {
      this.taskService.deleteTask(task).subscribe(
        () => (this.tasks = this.tasks.filter((t) => t.id !== task.id))
      );
    }
  }
  setReminder(task:Task){
    task.reminder= !task.reminder;
    this.taskService.changeReminder(task).subscribe();
  }

  addNewTask(task:Task){
    this.taskService.addNewTask(task).subscribe((tasks)=>(this.tasks.push(task)))
  }




}
