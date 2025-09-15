import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from '../../../services/event.service';
import { Event } from '../../../models/event.model';
import { RouterModule } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.css'],
  imports: [CommonModule, IonicModule, RouterModule],
})
export class EventDetailPage implements OnInit {
  event?: Event;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private eventService: EventService,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.event = this.eventService.get(id);
  }

  async deleteEvent() {
    if (!this.event) return;

    const alert = await this.alertCtrl.create({
      header: 'Eliminar evento',
      message: `¿Seguro que deseas eliminar "${this.event.title}"?`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Eliminar',
          role: 'destructive',
          handler: () => {
            this.eventService.delete(this.event!.id);
            this.router.navigateByUrl('/home');
          },
        },
      ],
    });

    await alert.present();
  }
}
