import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormDebugComponent } from './form-debug/form-debug.component'
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component'
import { ErrorMsgComponent } from './error-msg/error-msg.component'
import { InputFieldComponent } from './input-field/input-field.component'
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [FormDebugComponent, CampoControlErroComponent, ErrorMsgComponent, InputFieldComponent],
  exports: [FormDebugComponent, InputFieldComponent, CampoControlErroComponent, ErrorMsgComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
})
export class SharedModule { }
