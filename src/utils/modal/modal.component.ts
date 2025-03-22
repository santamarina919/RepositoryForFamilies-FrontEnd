import {Component, effect, HostListener, input, OnInit, signal, WritableSignal} from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone:true
})
export class ModalComponent{

  static invertModalSignal(sig :WritableSignal<boolean>){
    sig.set(!sig());
  }

  static handleModalContentClick(event :Event) {
    event.stopPropagation();
  }

  //true indicates shown false hidden
  modalState = input.required<boolean>()

  modalStyle:'hidden' | 'shown' = 'hidden'

  showState = true

  constructor() {
    effect(() => {
      this.modalStyle = this.modalState() == this.showState? 'shown' : 'hidden'
    });
  }

  hide(){
    this.modalStyle = 'hidden'
    this.invertShowState()
  }

  invertShowState(){
    this.showState = !this.showState;
  }




}
