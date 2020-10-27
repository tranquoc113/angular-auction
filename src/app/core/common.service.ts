import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public common = new Subject();
  constructor() { }
  emitData(val){
    this.common.next(true);
  }
}
