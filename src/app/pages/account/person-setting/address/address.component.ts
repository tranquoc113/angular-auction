import {Component, EventEmitter, Input, OnChanges, OnInit, Output, TemplateRef} from '@angular/core';
import {User} from '../../../../models/user';
import {AuthenticationService} from '../../../../service/authentication.service';
import {UserService} from '../../../../service/user.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {Address} from '../../../../models/address';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit, OnChanges {
  listAddress = true;
  mobNumberPattern = '^((\\+91-?)|0)?[0-9]{10}$';
  showSpinner = false;
  @Input() addressArr = new Array<Address>();
  address = new Address();
  user: User;
  modalRef: BsModalRef;
  @Output() emitServiceAddress = new EventEmitter<any>();
  @Output() emitAddressStatus = new EventEmitter<any>();
  @Input() cards: Array<any>;

  constructor(private authenticationService: AuthenticationService,
              private userService: UserService,
              private modalService: BsModalService) {
    const user = authenticationService.getUser();
    if (user.email) {
      this.user = user;
      this.address.personName = user.fullName;
    }
  }

  ngOnInit() {
  }

  ngOnChanges() {
  }

  addAddress() {
    this.address = new Address();
    this.address.personName = this.user.fullName;
    this.listAddress = false;
    this.emitServiceAddress.emit({type: true, remove: true});
  }

  changeLayoutFromParent() {
    this.listAddress = true;
  }

  updateAddress() {
    this.showSpinner = true;
    this.address.email = this.user.email;
    this.userService.updateAddress(this.address, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.emitAddressStatus.emit({update: true, delete: false});
        this.listAddress = true;
      } else {
        this.emitAddressStatus.emit({update: false, delete: false});
      }
    }, err => {
      this.showSpinner = false;
    });
  }

  openModaldeleteAddress(template: TemplateRef<any>, data: Address) {
    this.address = data;
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }

  confirmDelete(id) {
    this.showSpinner = true;
    this.userService.deleteAddress(id, this.authenticationService.getUser().token).subscribe(data => {
      this.showSpinner = false;
      if (data.type) {
        this.emitAddressStatus.emit({delete: true, update: false});
        this.modalRef.hide();
      } else {
        this.emitAddressStatus.emit({delete: false, update: false});
        this.modalRef.hide();
      }
    }, err => {
      this.showSpinner = false;
    });
  }

  editAddress(address: Address) {
    this.address = address;
    this.listAddress = false;
  }
}

