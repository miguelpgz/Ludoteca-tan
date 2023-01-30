import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';
import { Client } from 'src/app/client/model/Client';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { elementAt } from 'rxjs';

@Component({
    selector: 'app-prestamo-edit',
    templateUrl: './prestamo-edit.component.html',
    styleUrls: ['./prestamo-edit.component.scss']
})
export class PrestamoEditComponent implements OnInit {

    prestamo: Prestamo; 
    clients: Client[];
    games: Game[];
    fechaDevolucionInvalida : Boolean;
    tiempoPrestamoExcedido: Boolean;
    gamePrested: Boolean;
    gamesExceded: Boolean;



    constructor(
        public dialogRef: MatDialogRef<PrestamoEditComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private prestamoService: PrestamoService,
        private clientService: ClientService,
        private gameService: GameService,
    ) { }

    ngOnInit(): void {
        if (this.data.prestamo != null) {
            this.prestamo = Object.assign({}, this.data.prestamo);
        }
        else {
            this.prestamo = new Prestamo();
        }

        this.clientService.getClients().subscribe(
            clients => {
                this.clients = clients;

                if (this.prestamo.client != null) {
                    let clientFilter: Client[] = clients.filter(client => client.id == this.data.prestamo.client.id);
                    if (clientFilter != null) {
                        this.prestamo.client = clientFilter[0];
                    }
                }
            }
        );

        this.gameService.getGames().subscribe(
            games => {
                this.games = games

                if (this.prestamo.game != null) {
                    let gameFilter: Game[] = games.filter(game => game.id == this.data.prestamo.game.id);
                    if (gameFilter != null) {
                        this.prestamo.game = gameFilter[0];
                    }
                }
            }
        );
    }

    validarFechaFin(){

        const fechaInicio = new Date(this.prestamo.fecha_prestamo);
        const fechaFin = new Date(this.prestamo.fecha_devolucion);
        const diffTime = fechaFin.getTime() - fechaInicio.getTime();
        const diffDays = diffTime / (1000 * 60 * 60 * 24)

        //Si fecha fin < fecha inicio
        if(diffDays < 0){
            this.fechaDevolucionInvalida = true;
            this.tiempoPrestamoExcedido = false;
            
            
        }

        //Si el prestamo excede 14 días
        else if(diffDays>14){
            this.tiempoPrestamoExcedido = true;
            this.fechaDevolucionInvalida = false;
           
            }
        
        
        //Préstamo correcto
        else{
            this.fechaDevolucionInvalida = false;
            this.tiempoPrestamoExcedido = false;
            
        }
        
    }

    isGamePrested(){
        this.prestamoService.isPrested(this.prestamo).subscribe(
            
            result =>{
            if (result){
                this.gamePrested = true;
                
            }else{
                this.gamePrested = false;
            }
          })

    }

    exceedGames(){
        this.prestamoService.exceedPrestamos(this.prestamo).subscribe(
            
            result =>{
            if (result){
                this.gamesExceded = true;
                
            }else{
                this.gamesExceded = false;
            }
          })

    }
   

    onSave() {
        if(!this.gamePrested && !this.tiempoPrestamoExcedido && !this.fechaDevolucionInvalida && !this.gamesExceded){
            this.prestamoService.savePrestamo(this.prestamo).subscribe(reult => {

                this.dialogRef.close();
            });  
        }
          
    }  

    onClose() {
        this.dialogRef.close();
    }

}