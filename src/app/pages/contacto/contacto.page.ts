import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import {
  IonHeader, IonToolbar, IonTitle, IonContent,
  IonItem, IonInput, IonTextarea, IonButton,
  IonButtons, IonBackButton, IonCard, IonCardContent
} from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.page.html',
  styleUrls: ['./contacto.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonItem, IonInput, IonTextarea, IonButton,
    IonButtons, IonBackButton, IonCard, IonCardContent
  ]
})
export class ContactoPage implements OnInit {
  correo: string = '';
  mensaje: string = '';
  enviado: boolean = false;
  ultimoMensajeGuardado: { correo: string; mensaje: string; fecha: string } | null = null;

  constructor(private cdr: ChangeDetectorRef) { }

  async ngOnInit() {
    await this.recuperarMensaje();
  }

  async enviar() {
    if (!this.correo || !this.mensaje) return;

    // Persistencia local mediante @capacitor/preferences
    await Preferences.set({
      key: 'ultimoMensaje',
      value: JSON.stringify({
        correo: this.correo,
        mensaje: this.mensaje,
        fecha: new Date().toLocaleTimeString()
      })
    });

    this.enviado = true;
    await this.recuperarMensaje();
    this.cdr.detectChanges();
  }

  async recuperarMensaje() {
    const { value } = await Preferences.get({ key: 'ultimoMensaje' });
    if (value) {
      this.ultimoMensajeGuardado = JSON.parse(value);
      this.cdr.detectChanges();
    }
  }
}
