import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event-form',
  standalone: true,
  templateUrl: 'event-form.component.html',
  styleUrls: ['event-form.component.css'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class EventFormComponent {
  @Input() defaultDate?: string;
  @Input() event: Partial<Event> = {
    title: '',
    description: '',
    startAt: this.defaultDate || new Date().toISOString(),
    location: '',
    reminders: [],
  };
  @Output() save = new EventEmitter<Partial<Event>>();
  
  reminderOptions: { [minutes: number]: string } = {
    5: 'Recordarme 5 minutos antes',
    10: 'Recordarme 10 minutos antes',
    15: 'Recordarme 15 minutos antes',
    30: 'Recordarme 30 minutos antes',
    60: 'Recordarme 1 hora antes',
    120: 'Recordarme 2 horas antes',
    1440: 'Recordarme 1 día antes',
  };


  onSubmit() {
    this.save.emit(this.event);
  }
}
