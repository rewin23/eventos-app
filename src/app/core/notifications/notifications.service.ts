import { Injectable } from '@angular/core';
import { LocalNotifications } from '@capacitor/local-notifications';
import { Event } from '../../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  async requestPermissions() {
    const { display } = await LocalNotifications.requestPermissions();
    if (display === 'denied') {
      console.warn('Notificaciones no permitidas');
    }
  }

  async scheduleEventReminders(event: Event) {
    if (!event.reminders) return;

    const notifications = event.reminders.map((minutes, index) => {
      const remindAt = new Date(new Date(event.startAt).getTime() - minutes * 60000);

      return {
        id: Number(`${event.id.replace(/\D/g, '').slice(0, 6)}${index}`), // id numérico
        title: `Recordatorio: ${event.title}`,
        body: event.description || 'No olvides este evento',
        schedule: { at: remindAt },
        sound: undefined,
        extra: { eventId: event.id },
      };
    });

    await LocalNotifications.schedule({ notifications });
  }

  async cancelAll() {
    await LocalNotifications.cancel({ notifications: [] });
  }
}
