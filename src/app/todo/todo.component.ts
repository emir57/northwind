import { Component, OnInit } from '@angular/core';
import { Todo } from '../models/todo';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(
    private todoService:TodoService
  ) { }

  todos:Todo[]=[];

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos(){
    this.todoService.getTodos()
      .subscribe(data=>{
        this.todos=data;
      })
  }

}
