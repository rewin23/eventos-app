import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { EventFormComponent } from '../../../components/event-form/event-form.component';

@Component({
  selector: 'app-event-create',
  standalone: true,
  templateUrl: 'event-create.page.html',
  styleUrls: ['event-create.page.css'],
  imports: [CommonModule, IonicModule, EventFormComponent],
})
export class CreateEventPage {
  constructor(
    private eventService: EventService, 
    private router: Router, 
    private route: ActivatedRoute
  ) {}

  initialDate?: string;


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        this.initialDate = params['date'];
      }
    });
  }

  onSave(event: any) {
    this.eventService.create(event);
    this.router.navigateByUrl('/home');
  }
}
