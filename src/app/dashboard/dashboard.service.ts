import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Message } from '../home/message';


@Injectable({
    providedIn: 'root'
  })
  export class DashboardService {
  
    constructor(private httpClient: HttpClient) { }
  
    url: string = "http://localhost:44444/api/values/";
  
    get(): Observable<Message[]> {
      return this.httpClient.get<Message[]>(this.url);      
    }

    post(str:string) {
      const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
      return this.httpClient.post(this.url, JSON.stringify({msg:str}),{headers: myHeaders});
    }

    delete(id:number)
    {
      return this.httpClient.delete(this.url + id);
    }

    update(id:number, str:string)
    {
      const myHeaders = new HttpHeaders().set("Content-Type", "application/json");
      return this.httpClient.put(this.url + id, JSON.stringify({msg:str}),{headers: myHeaders});
    }
}