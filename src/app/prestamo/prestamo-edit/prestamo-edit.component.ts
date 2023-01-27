import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/client/client.service';
import { Game } from 'src/app/game/model/Game';
import { GameService } from 'src/app/game/game.service';
import { Client } from 'src/app/client/model/Client';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';

@Component({
    selector: 'app-prestamo-edit',
    templateUrl: './prestamo-edit.component.html',
    styleUrls: ['./prestamo-edit.component.scss']
})
export class PrestamoEditComponent implements OnInit {

    prestamo: Prestamo; 
    clients: Client[];
    games: Game[];

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

    onSave() {
        this.prestamoService.savePrestamo(this.prestamo).subscribe(result => {
            this.dialogRef.close();
        });    
    }  

    onClose() {
        this.dialogRef.close();
    }

}