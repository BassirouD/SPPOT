import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageService {

  host=environment.api
  host2:String="http://orbuspoles.orbus.sn/testPhp/code1.php?filter=encours"

  constructor(private http:HttpClient) { }

  dossierparetatparpole(annee,periode):Observable<any>{
    return this.http.get(this.host+'/listetatpole/'+periode+'/'+annee);
  }

  dossierparetatparpolebycode(annee,periode,code):Observable<any>{
    return this.http.get(this.host+'listetatpolebycode/'+periode+'/'+annee+'/'+code);
  }

  tendanceMoyennebymode(annee,periode,mode):Observable<any>{
    return this.http.get(this.host+'listTmtbymode/'+periode+'/'+annee+'/'+mode);
  }

  tempsmoyentraitementbycodeAndMode(annee,periode,mode,code):Observable<any>{
    return this.http.get(this.host+'tempsmoyentraitementbycodeandmode/'+periode+'/'+annee+'/'+mode+'/'+code);
  }

  tempsDossierplusLong(annee,periode,mode,code):Observable<any>{
     return this.http.get(this.host+'tempsmoyendossierlong/'+periode+'/'+annee+'/'+mode+'/'+code);
  }

  tauxMoyenperformance(annee,periode,mode):Observable<any>{
     return this.http.get(this.host+'/listTmtperf/'+periode+'/'+annee+'/'+mode);
  }

  tempsMoyenmoins24(annee,periode,mode,code):Observable<any>{
    return this.http.get(this.host+'tempsmoyenmoins24/'+periode+'/'+annee+'/'+mode+'/'+code);
  }

  performancecompareepole(annee,periode,mode,code1,code2):Observable<any>{
    return this.http.get(this.host+'listTmtperformance1ByCode/'+periode+'/'+annee+'/'+mode+'/'+code1+'/'+code2)
  }

  listedossierandperiodecodeannee(annee,periode,code){
    return this.http.get(this.host+'listedossier/'+periode+'/'+annee+'/'+code);
  }

  listedossierperiode1(annee):Observable<any>{
    return this.http.get(this.host+'/listedossier1/'+annee);
  }

  //evolution dossier en cours

  checkDossierEvolution():Observable<any>{
    return this.http.get("http://orbuspoles.orbus.sn/testPhp/code1.php?filter=encours");
  }

  listemensuelEnsemble(annee):Observable<any>{
    return this.http.get(this.host+'listNombreTypeDossierByYearByPeriode/'+annee);
  }

  listeDossiesTwoYears(annee1,annee2):Observable<any>{
    return this.http.get(this.host+'listNombreTypeDossierByTwoYearByPeriode/'+annee1+'/'+annee2);
  }

  listeDossiersByYearMonth(annee,periode):Observable<any>{
    return this.http.get(this.host+'listNombreTypeDossierByYearByPeriode/'+annee+'/'+periode)
  }

  //liste dossier by code

  listetypedossierbycode(annee,periode,code):Observable<any>{
    return this.http.get(this.host+'listNombreTypeDossierByYearByPeriodeByCode/'+annee+'/'+periode+'/'+code);
  }

}
