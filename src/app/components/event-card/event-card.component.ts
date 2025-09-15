import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-card',
  standalone: true,
  templateUrl: 'event-card.component.html',
  styleUrls: ['event-card.component.css'],
  imports: [CommonModule, IonicModule],
})
export class EventCardComponent {
  @Input() event!: Event;
}
