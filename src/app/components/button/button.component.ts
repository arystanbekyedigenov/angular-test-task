import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() color: string;
  @Input() text: string;
  @Input() margin: string;
  @Input() width: string;
  @Input() fontColor: string;
  @Input() padding: string;
  @Input() faIcon: any;
  @Output() btnClick = new EventEmitter();
  faCheckSquare = faCheckSquare;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.btnClick.emit();

  }

}
