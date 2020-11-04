import { ViewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { Component} from '@angular/core';
import { Message } from '../home/message';
import { DashboardService } from './dashboard.service';

  
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent { 

    @ViewChild('readOnlyTemplate', {static: false}) readOnlyTemplate: TemplateRef<any>;
    @ViewChild('create', {static: false}) create: TemplateRef<any>;

    constructor(private dashboardService: DashboardService) { }

    message: Message = new Message();
    tableMode: boolean = true;
    messages: Message[];
    isNewRecord = true;
 
    ngOnInit() {
        this.dashboardService.get().subscribe(data => {
            console.log(data);
          this.messages = data;
        });
      }

      loadTemplate(mess: Message) {
        if (this.message && this.message.id === mess.id) {
            return this.message;
        } else {
            return this.readOnlyTemplate;
        }
    }

      save() {       

        if(this.message.msg === undefined || this.message.msg === "")
        return window.confirm("The message cannot be empty!");;

        if (this.isNewRecord) {
            this.dashboardService.post(this.message.msg).subscribe(res => {
                
                this.ngOnInit();
                this.loadTemplate(new Message());
               
              });
        } else {
            this.dashboardService.update(this.message.id, this.message.msg).subscribe(res => {
               
                this.ngOnInit();
                this.loadTemplate(new Message());
               
              });;
          
        }

        this.tableMode = true;
        this.isNewRecord = false;
        this.message = new Message();
    }

    edit(mess: Message) {
        this.message.msg = mess.msg;
        this.message.id = mess.id;
        this.tableMode = false;
        this.isNewRecord = false;
    }

    cancel() {
        this.message = new Message();
        this.tableMode = true;
    }

    add() {
        this.cancel();
        this.tableMode = false;
        this.isNewRecord = true;
    }

    delete(message: Message) {
        this.dashboardService.delete(message.id).subscribe(res => {
            this.tableMode = true;
            this.ngOnInit();
            this.loadTemplate(new Message());
          });
    }
}

