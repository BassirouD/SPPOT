import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //host:String="https://orbus-preprod.gainde2000.sn:8080/apisppot/"
  host=environment.api;
  constructor(private http:HttpClient) { }

  login(data){
    if((data.login==="user")&&(data.motdepasse==="passer123")){
      return true;
    }else{
      return false;
    }
  }

  login1(data):Observable<any>{
    return this.http.post(this.host+'ConnectUserByCredential',data)
  }

  changePassword(data):Observable<any>{
    return this.http.post(this.host+'ChangeUserPwdByLogin',data)
  }

  getUser(login){
    return this.http.get(this.host+'GetUserByLogin/'+login)
  }

  updateUser(data){
    //const headers= new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded'})
    return this.http.post(this.host+'UpdateUser',data)
  }
}

