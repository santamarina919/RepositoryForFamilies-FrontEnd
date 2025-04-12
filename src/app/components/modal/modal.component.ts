import {
  Component, effect, HostListener, input, model, OnChanges, OnInit, signal, SimpleChanges,
  WritableSignal
} from '@angular/core';

export type ModalState = 'hidden' | 'shown'

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  standalone: true
})
export class ModalComponent {

  static handleContentClick(event :Event){
    event.stopPropagation()
  }

  modalState = model<ModalState>('hidden')



}
