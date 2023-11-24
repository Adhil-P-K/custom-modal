import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ModalComponent } from './shared/modal/modal.component';
import { ModalserviceService } from './modal/service/modalservice.service';
import { TemplateRef } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ModalComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'modal';
  // showModal!: boolean;
  // @ViewChild('appModal') childComponent: any;
  // ngOnInit() {
  //   // Append the child component's div to the parent component's DOM
  //   this.childComponent.nativeElement.appendTo(document.body);
  // }
  constructor(private modalService: ModalserviceService) {}

  openModal() {
    this.modalService.open().subscribe((action) => {
      console.log('modalAction', action);
    });
  }
}
