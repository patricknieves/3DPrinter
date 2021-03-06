import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { Configuration }     from './configuration';
import { DataService }     from './data.service';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CashComponent } from './Cash/Cash.component';
import { BlueprintMasterComponent } from './BlueprintMaster/BlueprintMaster.component';
import { BlueprintCopyComponent } from './BlueprintCopy/BlueprintCopy.component';
import { BuyAssetTRComponent } from 'app/BuyAssetTR/BuyAssetTR.component';
import { EnduserComponent } from 'app/Enduser/Enduser.component';
import { DesignerComponent } from 'app/Designer/Designer.component';
import { PrinterComponent } from 'app/Printer/Printer.component';
import { UsersPipe} from 'app/BluePrintCopy/Pipe';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { Ng2FileDropModule }  from 'ng2-file-drop';

// import { TransactionComponent } from './Transaction/Transaction.component'

@NgModule({
  declarations: [
    AppComponent,
		HomeComponent,
    BuyAssetTRComponent,
    CashComponent,
		BlueprintMasterComponent,
    EnduserComponent,
    DesignerComponent,
    PrinterComponent,
    BlueprintCopyComponent,
    UsersPipe,
    FileuploadComponent
		
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    Ng2FileDropModule
  ],
  providers: [
    Configuration,
    DataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
