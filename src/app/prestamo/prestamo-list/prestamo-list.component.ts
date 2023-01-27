import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmationComponent } from 'src/app/core/dialog-confirmation/dialog-confirmation.component';
import { Pageable } from 'src/app/core/model/page/Pageable';
import { PrestamoEditComponent } from '../prestamo-edit/prestamo-edit.component';
import { PrestamoService } from '../prestamo.service';
import { Prestamo } from '../model/Prestamo';
import { Game } from 'src/app/game/model/Game';
import { Client } from 'src/app/client/model/Client';
import { ClientService } from 'src/app/client/client.service';
import { GameService } from 'src/app/game/game.service';


@Component({
selector: 'app-prestamo-list',
templateUrl: './prestamo-list.component.html',
styleUrls: ['./prestamo-list.component.scss']
})
export class PrestamoListComponent implements OnInit {

    pageNumber: number = 0;
    pageSize: number = 5;
    totalElements: number = 0;

    dataSource = new MatTableDataSource<Prestamo>();
    displayedColumns: string[] = ['id','gameName','clientName','fecha_prestamo','fecha_devolucion','action'];
    filterGameTitle: string;
    filterClientName: string;
    filterDate: Date;
    prestamos: Prestamo[];

    games: Game[];
    clients: Client[];

    constructor(
        private prestamoService: PrestamoService,
        private gameService: GameService,
        private clientService: ClientService,
        public dialog: MatDialog,
    ) { }

    ngOnInit(): void {

        // this.gameService.getGames().subscribe(
        //     games => this.games = games
        // );

        // this.clientService.getClients().subscribe(
        //     clients=> this.clients = clients
        // );
      this.loadPage();
    }

    loadPage(event?: PageEvent) {
        let pageable : Pageable =  {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        if (event != null) {
            pageable.pageSize = event.pageSize
            pageable.pageNumber = event.pageIndex;
        }
        
        this.prestamoService.getPrestamosIni(pageable).subscribe(data => {

            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
           

        });

    }  

    createPrestamo() {      
        const dialogRef = this.dialog.open(PrestamoEditComponent, {
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit();
        });      
    }  

    onCleanFilter(): void {
        this.filterGameTitle = null;
        this.filterClientName= null;
        this.filterDate = null;

        this.onSearch();
    }

    onSearch(): void {

        let gameTitle = this.filterGameTitle;
        let clientName = this.filterClientName;
        let fecha = this.filterDate;
        
        // console.log("gametitle:",gameTitle,"clientname",clientName,"fecha",fecha);

        // this.prestamoService.getPrestamos(gameTitle, clientName,fecha).subscribe(
        //     prestamos => this.prestamos = prestamos

        // );

        let pageable : Pageable =  {
            pageNumber: this.pageNumber,
            pageSize: this.pageSize,
            sort: [{
                property: 'id',
                direction: 'ASC'
            }]
        }

        this.prestamoService.getPrestamos(pageable,gameTitle, clientName,fecha).subscribe(data => {

            this.dataSource.data = data.content;
            this.pageNumber = data.pageable.pageNumber;
            this.pageSize = data.pageable.pageSize;
            this.totalElements = data.totalElements;
           

        });

       
       
        
    }
  

    deletePrestamo(prestamo: Prestamo) { 
        const dialogRef = this.dialog.open(DialogConfirmationComponent, {
            data: { title: "Eliminar prestamo", description: "Atención si borra el prestamo se perderán sus datos.<br> ¿Desea eliminar el prestamo?" }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.prestamoService.deletePrestamo(prestamo.id).subscribe(result =>  {
                    this.ngOnInit();
                }); 
            }
        });
    }  
}
