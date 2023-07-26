import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {

  conditionProduct: string[]= ['New', 'Second Hand', 'B/Y'];

  productForm !: FormGroup; //formgroupdan meros oldi 
  constructor(private formBuilder: FormBuilder, private api: ApiService, private dialogRef:MatDialogRef<DialogComponent> ) { } 

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({ 
      productName: ['', Validators.required],
      category: ['', Validators.required],
      date: ['', Validators.required],
      condition: ['', Validators.required],
      price: ['', Validators.required],
      comment: ['', Validators.required],
    })

  }


    addProduct() {

      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value)
        .subscribe({

          next: (res) => {
            console.log(res);
            alert("Product added successfully");
            this.productForm.reset();
            this.dialogRef.close('save');
          },
          error: (err) => {
            console.log(err);
            alert("Something went wrong");
          }
                    
        })

      }
    }


}
