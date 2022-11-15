import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, Subject, of, throwError, EMPTY, BehaviorSubject } from 'rxjs';
import { catchError, isEmpty, map, tap } from 'rxjs/operators';
import { SequenceMasters, MajorGroupMasters, Pricelevelmasters, PriceNumbermasters,
  Countries, ConceptMasters, RevenueMasters
} from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MasterDataService {

  masterData = environment.masterData;
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  private masterUrl = new BehaviorSubject<string>('');
  currentMasterUrl = this.masterUrl.asObservable();

  private reloadUrl = new BehaviorSubject<boolean>(false);
  reloadValue = this.reloadUrl.asObservable();

  // private childUrl = new BehaviorSubject<string>('');
  // currentChildUrl = this.childUrl.asObservable();

  changeMasterUrlName(urlName: string) {
    this.masterUrl.next(urlName);
  }

  reloadUrlData(val: boolean) {
    this.reloadUrl.next(val);
  }

  // changeChildUrlName(urlName: string) {
  //   this.childUrl.next(urlName);
  // }

  doGet(endPointName): Observable<any> {
    return this.http.get(environment.baseUrl + endPointName)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  // same for post & update

  doPost(endPointName, objData) {
    return this.http.post(environment.baseUrl + endPointName, objData)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  doDelete(endPointName) {
    return this.http.get(environment.baseUrl + endPointName)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  getMasterData(): Observable<any> {
    return this.http.get<any>(this.masterData);
  }

  uploadMasterDoc(data: any): Observable<any> {
    return this.http.post<any>(environment.baseUrl + 'conceptmasters/uploadexcel', data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  getCountiesData(): Observable<any> {
    return this.http.get(environment.baseUrl + 'countries/' + 'list')
      .pipe(
        catchError(this.errorHandler)
      )
  }
  addCountry(data: Countries): Observable<Countries> {
    return this.http.post<Countries>(environment.baseUrl + 'countries/add', data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  modifyCountry(data: Countries): Observable<Countries> {
    return this.http.post<Countries>(environment.baseUrl + 'countries/edit/' + data.Country_ID, data).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
  deleteCountry(countryId): Observable<any> {
    return this.http.get(environment.baseUrl + 'countries/delete/' + countryId).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }

// conceptMasters Apis
getConceptMatersData(): Observable<any> {
  return this.http.get(environment.baseUrl+'conceptmasters/'+'list')
  .pipe(
    catchError(this.errorHandler)
  )
}
addConceptMaster(data: ConceptMasters): Observable<ConceptMasters> {
  return this.http.post<ConceptMasters>(environment.baseUrl+'conceptmasters/add', data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
modifyConceptMaster(data: ConceptMasters): Observable<ConceptMasters> {
  return this.http.post<ConceptMasters>(environment.baseUrl+'conceptmasters/edit/'+data.Concept_ID, data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
deleteConceptMaster(id): Observable<any> {
  return this.http.get(environment.baseUrl+'conceptmasters/delete/'+id).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}


// Revenue Apis
getRevenueMatersData(): Observable<any> {
  return this.http.get(environment.baseUrl+'revenuetypemasters/'+'list')
  .pipe(
    catchError(this.errorHandler)
  )
}
addRevenueMaster(data: RevenueMasters): Observable<RevenueMasters> {
  return this.http.post<RevenueMasters>(environment.baseUrl+'revenuetypemasters/add', data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
modifyRevenueMaster(data: RevenueMasters): Observable<RevenueMasters> {
  return this.http.post<RevenueMasters>(environment.baseUrl+'revenuetypemasters/edit/'+data.Revenue_Type_ID, data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
deleteRevenueMaster(id): Observable<any> {
  return this.http.get(environment.baseUrl+'revenuetypemasters/delete/'+id).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

//sequence maste apis
getSequenceMatersData(): Observable<any> {
  return this.http.get(environment.baseUrl+'defseqmasters/'+'list')
  .pipe(
    catchError(this.errorHandler)
  )
}
addSequenceMaster(data: SequenceMasters): Observable<SequenceMasters> {
  return this.http.post<SequenceMasters>(environment.baseUrl+'defseqmasters/add', data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
modifySequenceMaster(data: SequenceMasters): Observable<SequenceMasters> {
  return this.http.post<SequenceMasters>(environment.baseUrl+'defseqmasters/edit/'+data.Def_Sequence_ID, data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
deleteSequenceMaster(id): Observable<any> {
  return this.http.get(environment.baseUrl+'defseqmasters/delete/'+id).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

//Major group master apis
getMajorGroupMatersData(): Observable<any> {
  return this.http.get(environment.baseUrl+'majorgroupmasters/'+'list')
  .pipe(
    catchError(this.errorHandler)
  )
}
addMajorGroupMaster(data: MajorGroupMasters): Observable<MajorGroupMasters> {
  return this.http.post<MajorGroupMasters>(environment.baseUrl+'majorgroupmasters/add', data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
modifyMajorGroupMaster(data: MajorGroupMasters): Observable<MajorGroupMasters> {
  return this.http.post<MajorGroupMasters>(environment.baseUrl+'majorgroupmasters/edit/'+data.Major_Group_ID, data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
deleteMajorGroupMaster(id): Observable<any> {
  return this.http.get(environment.baseUrl+'majorgroupmasters/delete/'+id).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

//Price level apis
getPriceLevelData(): Observable<any> {
  return this.http.get(environment.baseUrl+'pricelevelmasters/'+'list')
  .pipe(
    catchError(this.errorHandler)
  )
}
addPriceLevel(data: Pricelevelmasters): Observable<Pricelevelmasters> {
  return this.http.post<Pricelevelmasters>(environment.baseUrl+'pricelevelmasters/add', data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
modifyPriceLevel(data: Pricelevelmasters): Observable<Pricelevelmasters> {
  return this.http.post<Pricelevelmasters>(environment.baseUrl+'pricelevelmasters/edit/'+data.Price_Level_ID, data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
deletePriceLevel(id): Observable<any> {
  return this.http.get(environment.baseUrl+'pricelevelmasters/delete/'+id).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

//Price Number Api

getPriceNumberData(): Observable<any> {
  return this.http.get(environment.baseUrl+'pricenumbermasters/'+'list')
  .pipe(
    catchError(this.errorHandler)
  )
}
addPriceNumber(data: PriceNumbermasters): Observable<PriceNumbermasters> {
  return this.http.post<PriceNumbermasters>(environment.baseUrl+'pricenumbermasters/add', data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
modifyPriceNumber(data: PriceNumbermasters): Observable<PriceNumbermasters> {
  return this.http.post<PriceNumbermasters>(environment.baseUrl+'pricenumbermasters/edit/'+data.Price_Number_ID, data).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}
deletePriceNumber(id): Observable<any> {
  return this.http.get(environment.baseUrl+'pricenumbermasters/delete/'+id).pipe(
    catchError((error) => {
      return throwError(error);
    })
  );
}

  //error handler code
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}

