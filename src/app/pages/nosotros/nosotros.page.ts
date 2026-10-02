import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonCard, IonCardHeader, IonCardTitle, IonCardContent,
  IonButtons, IonBackButton, IonSpinner
} from '@ionic/angular';
import { GeolocationService } from '../../services/geolocation.service';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonCard, IonCardHeader, IonCardTitle, IonCardContent,
    IonButtons, IonBackButton, IonSpinner
  ]
})
export class NosotrosPage implements OnInit {
  distancia: number | null = null;
  cargando: boolean = true;
  errorMsg: string = '';

  // Sede corporativa: Calle Arcos de Jalón 18, Madrid
  readonly oficinaLat = 40.4452;
  readonly oficinaLon = -3.6115;

  constructor(
    private geoService: GeolocationService,
    private cdr: ChangeDetectorRef
  ) { }

  async ngOnInit() {
    try {
      const coords = await this.geoService.getCurrentPosition();
      const d = this.calcularDistancia(
        coords.latitude, coords.longitude,
        this.oficinaLat, this.oficinaLon
      );
      this.distancia = Math.round(d * 100) / 100;
    } catch (error) {
      console.error(error);
      this.errorMsg = 'No se ha podido obtener la ubicación actual del dispositivo.';
    } finally {
      this.cargando = false;
      this.cdr.detectChanges();
    }
  }

  calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371; // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
}
