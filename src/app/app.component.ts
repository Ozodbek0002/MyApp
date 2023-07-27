import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from './services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'MyApp';



  constructor(
    private dialog: MatDialog,
    private api: ApiService

  ) { }



  displayedColumns: string[] = ['id', 'productName', 'category', 'date', 'condition', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any> | any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;





  // Avtomatic started when the page is refreshed
  ngOnInit(): void {
    this.getAllProducts();
  }



  // Open the dialog
  openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: "30%",
    }).afterClosed().subscribe(result => {
      if (result == true || result === "save") {
        this.getAllProducts();
      }
    });
  }




  // Get all products from the database
  getAllProducts() {
    this.api.getProduct()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;

        },
        error: (err) => {
          alert("Something went wrong");
        }
      })

  }




  // edit produtc 
  editProduct(product: any) {
    this.dialog.open(DialogComponent, {
      width: "30%",
      data: product,
    }).afterClosed().subscribe(result => {
      if (result == true || result === "update") {
        console.log(result);
        this.getAllProducts();
      }
    });
  }



  // Delete product
  deleteProduct(id: number) {
    if (confirm("Are you sure to delete this product?")) {
      this.api.deleteProduct(id)
        .subscribe({
          next: (res) => {
            alert("Product deleted successfully");
            this.getAllProducts();
          },
          error: (err) => {
            alert("Something went wrong while deleting the product");
          }
        })
    }
  }




  // Filter the products by category
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


}
