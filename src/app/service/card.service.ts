import {Injectable} from '@angular/core';
import {Card} from '../models/card';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  card: Card;
  subjectCard = new Subject<Array<Card>>();

  constructor() {
  }
  emitCard(val) {
    this.subjectCard.next(val);
  }
}
