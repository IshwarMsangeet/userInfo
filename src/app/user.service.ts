import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Observable } from 'rxjs/Observable'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  public addUser(userInfo: any) {
    let url = this.baseUrl + '/user/create';
    return this.http.post(url, userInfo);
  }

  public fetchUsers() {
    let url = this.baseUrl + '/user/list';
    return this.http.get(url);
  }

  public deletehUser(id: string) {
    let url = this.baseUrl + '/user/delete/'+id;
    return this.http.delete(url);
  }


  public searchUser(str) {
    let url = this.baseUrl + '/user/search?item='+ str;
    return this.http.get(url);
  }
}
