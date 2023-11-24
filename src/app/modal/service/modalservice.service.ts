import { Injectable, ViewContainerRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import {
  ComponentFactoryResolver,
  Inject,
  Injector,
  TemplateRef,
} from '@angular/core';
import { CustomModalComponent } from '../custom-modal/custom-modal.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalserviceService {
  private modalNotifier?: Subject<string>;

  constructor(
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    // private viewContainerRef: ViewContainerRef,
    @Inject(DOCUMENT) private document: Document
  ) {}
  // open() {
  //   // Create a new instance of the CustomModalComponent using ViewContainerRef.createComponent
  //   const modalComponentRef = this.viewContainerRef.createComponent(
  //     CustomModalComponent,
  //     { injector: this.injector }
  //   );

  //   const modalComponentInstance = modalComponentRef.instance;
  //   console.log(modalComponentInstance);

  //   // Subscribe to the component's close and submit events
  //   modalComponentInstance.closeEvent.subscribe(() => this.closeModal());
  //   modalComponentInstance.submitEvent.subscribe(() => this.submitModal());

  //   // Call detectChanges to update the component's view
  //   modalComponentRef.detectChanges();

  //   // Append the component's root node to the document body
  //   this.document.body.appendChild(modalComponentRef.hostView.rootNodes[0]);

  //   // Create a new Subject for the modal notification
  //   this.modalNotifier = new Subject();

  //   // Return the modal notification observable
  //   return this.modalNotifier?.asObservable();
  // }

  open() {
    const modalComponentFactory =
      this.resolver.resolveComponentFactory(CustomModalComponent);
    const modalComponent = modalComponentFactory.create(this.injector);
    // console.log(modalComponent, modalComponentFactory);

    modalComponent.instance.closeEvent.subscribe(() => this.closeModal());
    modalComponent.instance.submitEvent.subscribe(() => this.submitModal());

    modalComponent.hostView.detectChanges();

    this.document.body.appendChild(modalComponent.location.nativeElement);
    this.modalNotifier = new Subject();
    return this.modalNotifier?.asObservable();
  }

  closeModal() {
    this.modalNotifier?.next('close');
    this.modalNotifier?.complete();
  }

  submitModal() {
    this.modalNotifier?.next('yes');
    this.closeModal();
  }
}
