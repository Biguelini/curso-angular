import { Component, OnInit } from '@angular/core'
import { UploadFileService } from '../upload-file.service'
import { environment } from 'src/environments/environments'
import { filterResponse, uploadProgress } from 'src/app/shared/rxjs-operators'


@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.css']
})
export class UploadFileComponent implements OnInit {

  files!: Set<File>
  progress = 0

  constructor(private service: UploadFileService) { }

  ngOnInit() { }

  onChange(event: any) {
    console.log(event)

    const selectedFiles = <FileList>event.srcElement.files

    const fileNames = []
    this.files = new Set()
    for (let i = 0; i < selectedFiles.length; i++) {
      fileNames.push(selectedFiles[i].name)
      this.files.add(selectedFiles[i])
    }
    document.getElementById('customFileLabel')!.innerHTML = fileNames.join(', ')

    this.progress = 0
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service.upload(this.files, environment.BASE_URL + '/upload')
        .pipe(
          uploadProgress((progress: any) => {
            console.log(progress)
            this.progress = progress
          }),
          filterResponse()
        )
        .subscribe(response => console.log('Upload Concluído'))

    }
  }

  onDownloadExcel() {
    this.service.download(environment.BASE_URL + '/downloadExcel')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.xlsx')
      })
  }

  onDownloadPDF() {
    this.service.download(environment.BASE_URL + '/downloadPDF')
      .subscribe((res: any) => {
        this.service.handleFile(res, 'report.pdf')
      })
  }
}
