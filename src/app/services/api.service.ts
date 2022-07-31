import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postUser(data:any) {
    return this.http.post<any>("https://gorest.co.in/public/v2/users", data, {
      "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer 2eae9fdfa7d6cb47233fb499d995aacef880d3a2f9e181e18dd8061fe5e82cb1"
      }
    })
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getUser(data:any) {
    return this.http.get<any>("https://gorest.co.in/public/v2/users", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateUser(data:any) {
    console.log('data is', data);
    
    return this.http.put<any>("https://gorest.co.in/public/v2/users/" + data.id, data, {
      "headers": {
        "Authorization": "Bearer 2eae9fdfa7d6cb47233fb499d995aacef880d3a2f9e181e18dd8061fe5e82cb1"
      }
    })
    .pipe(map((res:any)=>{
      return res;
    }))
  }

    deleteUser(data:any) {
    return this.http.delete<any>("https://gorest.co.in/public/v2/users", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
