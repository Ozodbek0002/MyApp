import { Component, Inject, inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  conditionProduct: string[]= ['New', 'Second Hand', 'B/Y'];

  productForm !: FormGroup; //formgroupdan meros oldi 
  actionBtn: string = 'Save';

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any,

    ) { } 

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({ 
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    })


    if (this.editData) {
      // this.productForm.patchValue(this.editData);
      // this.productForm.setValue(this.editData);
      this.productForm = this.formBuilder.group({
        productName: [this.editData.productName, Validators.required],
        category: [this.editData.category, Validators.required],
        date: [this.editData.date, Validators.required],
        condition: [this.editData.condition, Validators.required],
        price: [this.editData.price, Validators.required],
        comment: [this.editData.comment, Validators.required],
      })
      this.actionBtn = 'Update';

    
    }

  }


  // Product qo`shish uchun funksiya

  addProduct() {

    if(!this.editData) {
      if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
      .subscribe({
        next: (res) => {
          alert("Product added successfully");
          this.productForm.reset();
          this.dialogRef.close('save');
        },
        error: (err) => {
          alert("Something went wrong while adding");
        }
                  
      })

      }
    } else {
      this.updateProduct();
    }

  } 
  


  // Productni yangilash uchun funksiya

  updateProduct() {
    this.api.putProduct( this.productForm.value, this.editData.id )
    .subscribe({
      next: (res) => {
        alert("Product updated successfully");
        this.productForm.reset();
        this.dialogRef.close('update');
      },
      error: (err) => {
        alert("Something went wrong while updating ");
      }
                
    })
  }
  

}
