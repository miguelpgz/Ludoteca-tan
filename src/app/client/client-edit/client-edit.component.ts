import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from '../client.service';
import { Client } from '../model/Client';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {

  client: Client;

  nameRepeated: Boolean;

  constructor(
    public dialogRef: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) { }

  ngOnInit(): void {
    if (this.data.client != null) {
      this.client = Object.assign({}, this.data.client);
    }
    else {
      this.client= new Client();
    }
  }

  
  validarNombreCliente(){

    //Comprobamos desde el servicio si se repite el nombre en nuestra BBDD
    this.clientService.checkRepeated(this.client).subscribe(
        
        result =>{
        if (result){
            
            this.nameRepeated = true;
            console.log(this.nameRepeated);
            
        }else{

            this.nameRepeated = false;
            console.log(this.nameRepeated);
        }
      })

}

  onSave() {
    if(!this.nameRepeated){
      this.clientService.saveClient(this.client).subscribe(result => {
        this.dialogRef.close();
      });   
    }
     
  }  

  onClose() {
    this.dialogRef.close();
  }

}
