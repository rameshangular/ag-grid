import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AgGridNg2 } from 'ag-grid-angular';
import { CellcustomComponent } from '../aggrid/cellcustom/cellcustom.component';
@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  name:any = "Ramesh";
  @ViewChild('agGrid') agGrid: AgGridNg2;
  constructor() { }

  ngOnInit() {
    console.log(this.primaryColorSample);
  }


  @ViewChild('primaryColorSample') primaryColorSample:ElementRef;
  columnDefs = [
      {
        headerName: 'Make', 
        field: 'make',checkboxSelection: true
        // valueGetter: function aPlusBValueGetter(params) {
        //      return params.data.make+"--"+params.data.make;
        // }
      },
      {
        headerName: 'Model', 
        field: 'model',
        
        cellRenderer: function(params){
          console.log(params.api.context);
          // return params.api.context.call.primaryColorSample;
        }
      },
      {
        headerName: 'Price', 
        field: 'price',
        // cellRendererFramework: CellcustomComponent,
        cellRenderer: function(params, $event){
            var eSpan = document.createElement('a');
            eSpan.innerHTML = "Tets a Link";
            eSpan.addEventListener('click', function() {
              console.log(params.api);
              params.api.context.call.testCall('test');
            });
            return eSpan;     
        }
      }
  ];

  rowData = [
      { make: 'Toyota', model: 'Celica', price: 35000 },
      { make: 'Ford', model: 'Mondeo', price: 32000 },
      { make: 'Porsche', model: 'Boxter', price: 72000 } 
  ];

  reference:any;
  // While Ag-grid start
    OnGridReady(params){
      console.log(params.api);
      console.log(params.columnApi);
      params.api.context  = {call: this} 

    }

    public testCall(data:any){
      console.log(data);
    }

  // temp1.setRowData([])
  // temp1.updateRowData({add: [{name: ramesh}]})
  // var two = temp1.getRowNode(2);
  // two.setData({ make: 'Toyota', model: 'Celica', price: 35000 });
  // two.setDataValue('make', "Ramesh New");

  
  getSelectedRows(){
    console.log(this.agGrid.api);
    const selectedNode = this.agGrid.api.getSelectedNodes();
    // const selectdData = selectedNode.map(node =>{
    //   console.log(node);
    // })
  }

}
