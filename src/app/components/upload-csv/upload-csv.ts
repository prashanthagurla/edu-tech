import { Component } from '@angular/core';
import { AdminService } from '../../service/admin-service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-upload-csv',
  imports: [CommonModule],
  templateUrl: './upload-csv.html',
  styleUrl: './upload-csv.css',
})
export class UploadCsv {
  selectedFile: File | null = null;
  dbName: string = '';
  tableName: string = '';
  isUploading: boolean = false;
  uploadMessage: string = '';
  uploadSuccess: boolean = false;

  constructor(private readonly adminService: AdminService) {}

  onFileSelected(event: any): void {
    const file = event.target.files[0];

    if (file) {
      if (!file.name.endsWith('.csv')) {
        this.uploadMessage = 'Please select a valid CSV file';
        this.uploadSuccess = false;
        this.selectedFile = null;
        return;
      }
      this.selectedFile = file;
      this.uploadMessage = '';
    }
  }
  onDbNameChange(event: any): void {
    this.dbName = event.target.value.trim();
  }
  onTableNameChange(event: any): void {
    this.tableName = event.target.value.trim();
  }
  onSubmit(): void {
    if (!this.selectedFile) {
      this.uploadMessage = 'Please select a CSV file';
      this.uploadSuccess = false;
      return;
    }

    if (!this.dbName) {
      this.uploadMessage = 'Please enter database name';
      this.uploadSuccess = false;
      return;
    }
    if (!this.tableName) {
      this.uploadMessage = 'Please enter table name';
      this.uploadSuccess = false;
      return;
    }
    const formData = new FormData();
    formData.append('file', this.selectedFile);
    formData.append('dbName', this.dbName);
    formData.append('tableName', this.tableName);
    this.isUploading = true;
    this.uploadMessage = 'Uploading...';

    this.adminService.uploadCsv(formData).subscribe({
      next: (response) => {
        this.isUploading = false;
        this.uploadSuccess = true;
        this.uploadMessage = 'CSV uploaded successfully';
      },
      error: (error) => {
        this.isUploading = false;
        this.uploadSuccess = false;
        this.uploadMessage = error.error?.message || 'upload failed. Please try again.';
        console.error('upload error: ', error);
      },
    });
  }
  resetForm(): void {
    this.selectedFile = null;
    this.dbName = '';
    this.tableName = '';

    const fileInput = document.getElementById('csvFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }

  onCancel(): void {
    this.resetForm();
    this.uploadMessage = '';
  }
}
