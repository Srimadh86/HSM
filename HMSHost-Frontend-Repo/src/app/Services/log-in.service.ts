import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError, EMPTY } from 'rxjs';
import { catchError, isEmpty, map, tap } from 'rxjs/operators';
import {
  User,
  LoginModel,
  UserInfo,
  Countries,
} from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
  usersUrl = environment.users;
  serverUrl = environment.baseUrl;
  baseUrl = environment.recognition;
  categoriesUrl = environment.categoryList;
  masterData = environment.masterData;

  userProfile = new Subject<UserInfo>();

  users = new Subject<UserInfo[]>();

  constructor(private http: HttpClient) {}

  getUserData(): Observable<UserInfo[]> {
    return this.http.get<UserInfo[]>(this.usersUrl);
  }

  userLogin(data: LoginModel): Observable<User> {
    const user = this.login(data);
    this.getUserData().subscribe((users) => {
      const userInfo = users?.find((u) => u.lanId === data.userId);
      this.userProfile.next(userInfo);
      this.users.next(users);
    });
    return user;
  }

  login(data: LoginModel): Observable<any> {
    return this.http.post(this.usersUrl, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getUsers(): Subject<UserInfo[]> {
    let isUser: boolean;
    let isUserProfile: boolean;
    this.users.subscribe((users) => {
      if (users) {
        isUser = true;
      }
      isUser = false;
    });
    this.userProfile.subscribe((users) => {
      if (users) {
        isUserProfile = true;
      }
      isUserProfile = false;
    });
    if (!isUser || !isUserProfile) {
      this.getUserData().subscribe((res) => {
        this.users.next(res);
        const landId = sessionStorage.getItem('lanId');
        const user = res?.find((user) => user.lanId === landId);
        this.userProfile.next(user);
        return res;
      });
    }
    return this.users;
  }

  getUser(): Subject<UserInfo> {
    const landId = sessionStorage.getItem('lanId');

    const userProfile = this.userProfile.asObservable().pipe(isEmpty());
    if (!userProfile) {
      this.getUsers();
      return this.userProfile;
    }
    return this.userProfile;
  }
 
  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}
