import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent implements OnInit {
  @Input() open!: boolean;

  constructor(private render: Renderer2) {}

  ngOnInit(): void {
    const modalElement: HTMLElement = document.createElement('div');
    document.body.appendChild(modalElement);
  }
}
