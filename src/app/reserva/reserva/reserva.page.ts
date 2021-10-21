import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarComponent, CalendarComponentOptions, CalendarModalOptions } from 'ion2-calendar';
import { AngularFirestore } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})

export class ReservaPage  {


  horaFinal :Date = new Date();
  horaInici :Date = new Date();
  dia: Date= new Date();
  
  event = {
    title:'',
    hStart:'',
    hEnd: '',
    user:'',
    day:''

  };
  
  optionsMulti: CalendarComponentOptions = {
    pickMode: 'single',
    color: 'primary',
    weekdays: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
    weekStart: 1

  };

  @ViewChild('calendar', { read: CalendarComponent }) calendarRef: CalendarComponent;
  constructor() { }

  ngOnInit() {
    

  }

  onChange($event) {
    console.log($event.format('DD-MM-YYYY'));
    this.dia = $event.format('DD-MM-YYYY');
    
  }
  addNewEvent($event){
    this.event = {
      title:'Padel',
      hStart:this.horaInici.toString(),
      hEnd: this.horaFinal.toString(),
      user:'',
      day: this.dia.toString()
    };
    console.log('k',this.event)
    
    
  }
  onSelect($event){
   
  }
  cambioFechaI(event){
    console.log('horaInici',(event.detail.value));
    this.horaInici = event.detail.value
  }

  cambioFechaF(event){
    console.log('horaFinal',(event.detail.value));
    this.horaFinal = event.detail.value
  }
  
  
  
  
  
 
  

 }


